import { bech32 } from 'bech32'
import { decode } from 'light-bolt11-decoder'

const LIGHTNING_PREFIX_REGEX = /^lightning:/i
const LIGHTNING_ADDRESS_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const LNURL_REGEX = /^lnurl1[02-9ac-hj-np-z]+$/i

export function normalizeInput(input) {
  return (input || '').trim()
}

export function stripLightningPrefix(input) {
  return normalizeInput(input).replace(LIGHTNING_PREFIX_REGEX, '')
}

export function lightningAddressToUrl(address) {
  const [name, domain] = address.split('@')
  return `https://${domain}/.well-known/lnurlp/${encodeURIComponent(name)}`
}

export function decodeLnurl(input) {
  const normalized = stripLightningPrefix(input).toLowerCase()
  const { words } = bech32.decode(normalized, 2000)
  return new TextDecoder().decode(Uint8Array.from(bech32.fromWords(words)))
}

export function interpretInput(input) {
  const normalized = stripLightningPrefix(input)

  if (!normalized) {
    return { type: 'empty' }
  }

  try {
    return {
      type: 'bolt11',
      parsed: decode(normalized),
    }
  } catch {
    // fall through
  }

  if (LIGHTNING_ADDRESS_REGEX.test(normalized)) {
    return {
      type: 'resolve',
      inputType: 'lightning-address',
      targetUrl: lightningAddressToUrl(normalized),
      normalized,
    }
  }

  if (LNURL_REGEX.test(normalized)) {
    return {
      type: 'resolve',
      inputType: 'lnurl',
      targetUrl: decodeLnurl(normalized),
      normalized,
    }
  }

  try {
    const url = new URL(normalized)
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return {
        type: 'resolve',
        inputType: 'lnurl-url',
        targetUrl: url.toString(),
        normalized,
      }
    }
  } catch {
    // ignore invalid URLs
  }

  return {
    type: 'invalid',
    normalized,
    error: 'Unsupported input. Enter a BOLT11 invoice, LNURL, or Lightning Address.',
  }
}

async function parseJsonResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  if (payload?.status === 'ERROR') {
    throw new Error(payload.reason || 'LNURL request failed')
  }

  return payload
}

function shouldFallback(error) {
  return error instanceof TypeError || error?.name === 'TypeError'
}

export async function fetchLnurlJson(targetUrl, fetchImpl = fetch) {
  try {
    const response = await fetchImpl(targetUrl)
    return await parseJsonResponse(response)
  } catch (error) {
    if (!shouldFallback(error)) {
      throw error
    }

    const fallbackResponse = await fetchImpl(
      `/api/lnurl?target=${encodeURIComponent(targetUrl)}`,
    )
    return parseJsonResponse(fallbackResponse)
  }
}

function isSerializedBuffer(value) {
  return Boolean(
    value
      && typeof value === 'object'
      && value.type === 'Buffer'
      && Array.isArray(value.data),
  )
}

function toHexString(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
}

export function formatDisplayValue(value) {
  if (value instanceof Uint8Array) {
    return toHexString(value)
  }

  if (isSerializedBuffer(value)) {
    return toHexString(value.data)
  }

  if (typeof value === 'string') {
    return value
  }

  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 4)
  }

  return String(value)
}

export function toInfoEntries(data, extraEntries = []) {
  return [
    ...extraEntries,
    ...Object.entries(data || {}).map(([key, value]) => ({
      label: key,
      value: formatDisplayValue(value),
    })),
  ]
}
