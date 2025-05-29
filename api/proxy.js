export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).send("Missing or invalid 'url' query parameter.");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
        'Range': req.headers['range'] || ''
      }
    });

    // Forward important headers
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');
    const acceptRanges = response.headers.get('accept-ranges');

    res.status(response.status);
    res.setHeader('Content-Type', contentType);
    if (contentLength) res.setHeader('Content-Length', contentLength);
    if (acceptRanges) res.setHeader('Accept-Ranges', acceptRanges);
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Stream body
    response.body.pipe(res);

  } catch (error) {
    res.status(500).send("Proxy Error: " + error.message);
  }
}
