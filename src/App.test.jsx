import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, afterEach } from 'vitest'

import App from './App'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('App', () => {
  it('renders the default bolt11 invoice decode view', () => {
    render(<App />)

    expect(screen.getByText(/enter a bolt11 invoice, lightning address, or lnurl below/i)).toBeInTheDocument()
    expect(screen.getByText(/hover over a highlighted section/i)).toBeInTheDocument()
  })

  it('resolves lightning addresses directly when the browser fetch works', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ callback: 'https://example.com/callback', tag: 'payRequest' }),
      }),
    )

    render(<App />)

    const input = screen.getByRole('textbox', { name: /invoice, lightning address, or lnurl/i })
    fireEvent.change(input, { target: { value: 'satoshi@example.com' } })

    await waitFor(() => {
      expect(screen.getByText('https://example.com/callback')).toBeInTheDocument()
    })

    expect(screen.getByText(/resolution type/i)).toBeInTheDocument()
  })

  it('falls back through /api/lnurl when direct fetch fails', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ callback: 'https://fallback.example/callback', tag: 'payRequest' }),
      })

    vi.stubGlobal('fetch', fetchMock)

    render(<App />)

    const input = screen.getByRole('textbox', { name: /invoice, lightning address, or lnurl/i })
    fireEvent.change(input, { target: { value: 'satoshi@example.com' } })

    await waitFor(() => {
      expect(screen.getByText('https://fallback.example/callback')).toBeInTheDocument()
    })

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/lnurl?target=https%3A%2F%2Fexample.com%2F.well-known%2Flnurlp%2Fsatoshi',
    )
  })
})
