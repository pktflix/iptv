const http = require('http');

exports.handler = async function(event, context) {
  const targetUrl = 'http://103.186.56.150:8088/102/tracks-v1a1/mono.m3u8?token=c23285f05b7a800fedc5c02de90c106aabefabd0-2b165b9fadc080813d6d902ff55b0ebe-1747242020-1747238420';

  return new Promise((resolve, reject) => {
    http.get(targetUrl, (response) => {
      let headers = {
        'Content-Type': response.headers['content-type'] || 'application/vnd.apple.mpegurl',
        'Access-Control-Allow-Origin': '*',
      };

      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve({
          statusCode: 200,
          headers,
          body: data,
        });
      });
    }).on('error', (e) => {
      resolve({
        statusCode: 500,
        body: 'Error: ' + e.message,
      });
    });
  });
};
