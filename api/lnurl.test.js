import { describe, expect, it, vi, afterEach } from 'vitest'

import handler from './lnurl'

function createMockResponse() {
  return {
    statusCode: 200,
    jsonBody: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.jsonBody = payload
      return this
    },
    setHeader() {
      return this
    },
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('api/lnurl', () => {
  it('rejects requests without a target', async () => {
    const req = { method: 'GET', query: {} }
    const res = createMockResponse()

    await handler(req, res)

    expect(res.statusCode).toBe(400)
    expect(res.jsonBody.error).toMatch(/missing target/i)
  })

  it('rejects non-http protocols', async () => {
    const req = { method: 'GET', query: { target: 'file:///etc/passwd' } }
    const res = createMockResponse()

    await handler(req, res)

    expect(res.statusCode).toBe(400)
    expect(res.jsonBody.error).toMatch(/http/i)
  })

  it('returns upstream json for valid lnurl targets', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ callback: 'https://example.com/callback', tag: 'payRequest' }),
      }),
    )

    const req = {
      method: 'GET',
      query: { target: 'https://example.com/.well-known/lnurlp/satoshi' },
    }
    const res = createMockResponse()

    await handler(req, res)

    expect(res.statusCode).toBe(200)
    expect(res.jsonBody.callback).toBe('https://example.com/callback')
  })

  it('surfaces upstream failures as bad gateway errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('socket hang up')))

    const req = {
      method: 'GET',
      query: { target: 'https://example.com/.well-known/lnurlp/satoshi' },
    }
    const res = createMockResponse()

    await handler(req, res)

    expect(res.statusCode).toBe(502)
    expect(res.jsonBody.error).toMatch(/failed to fetch/i)
  })
})
