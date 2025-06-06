export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl || !targetUrl.startsWith('http://')) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');

    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }

    response.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
}
