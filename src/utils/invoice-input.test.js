import { describe, expect, it, vi } from 'vitest'

import {
  fetchLnurlJson,
  formatDisplayValue,
  interpretInput,
  lightningAddressToUrl,
} from './invoice-input'

describe('invoice input helpers', () => {
  it('converts a lightning address into its lnurlp endpoint', () => {
    expect(lightningAddressToUrl('satoshi@example.com')).toBe(
      'https://example.com/.well-known/lnurlp/satoshi',
    )
  })

  it('interprets bolt11 invoices without trying lnurl resolution', () => {
    const result = interpretInput(
      'lnbc15u1p3xnhl2pp5jptserfk3zk4qy42tlucycrfwxhydvlemu9pqr93tuzlv9cc7g3sdqsvfhkcap3xyhx7un8cqzpgxqzjcsp5f8c52y2stc300gl6s4xswtjpc37hrnnr3c9wvtgjfuvqmpm35evq9qyyssqy4lgd8tj637qcjp05rdpxxykjenthxftej7a2zzmwrmrl70fyj9hvj0rewhzj7jfyuwkwcg9g2jpwtk3wkjtwnkdks84hsnu8xps5vsq4gj5hs',
    )

    expect(result.type).toBe('bolt11')
    expect(result.parsed.sections.length).toBeGreaterThan(0)
  })

  it('falls back to the api route when direct lnurl fetch fails like a CORS/network error', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ callback: 'https://example.com/callback', tag: 'payRequest' }),
      })

    const data = await fetchLnurlJson(
      'https://example.com/.well-known/lnurlp/satoshi',
      fetchMock,
    )

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://example.com/.well-known/lnurlp/satoshi',
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/lnurl?target=https%3A%2F%2Fexample.com%2F.well-known%2Flnurlp%2Fsatoshi',
    )
    expect(data.callback).toBe('https://example.com/callback')
  })

  it('formats byte arrays as hex strings without Buffer', () => {
    expect(formatDisplayValue(new Uint8Array([222, 173, 190, 239]))).toBe('deadbeef')
  })
})
