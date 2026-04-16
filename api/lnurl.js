function getTarget(query) {
  const target = query?.target
  return Array.isArray(target) ? target[0] : target
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const target = getTarget(req.query)

  if (!target) {
    return res.status(400).json({ error: 'Missing target query parameter' })
  }

  let url

  try {
    url = new URL(target)
  } catch {
    return res.status(400).json({ error: 'Target must be a valid URL' })
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    return res.status(400).json({ error: 'Only http and https targets are allowed' })
  }

  try {
    const upstream = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    })

    if (!upstream.ok) {
      return res.status(502).json({
        error: `Upstream request failed with status ${upstream.status}`,
      })
    }

    const payload = await upstream.json()

    if (payload?.status === 'ERROR') {
      return res.status(502).json(payload)
    }

    return res.status(200).json(payload)
  } catch (error) {
    return res.status(502).json({
      error: 'Failed to fetch target',
      details: error instanceof Error ? error.message : String(error),
    })
  }
}
