const http = require('http');

exports.handler = async function(event, context) {
  const targetUrl = 'http://41.205.93.154/STARSPORTS1/index.m3u8';

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
