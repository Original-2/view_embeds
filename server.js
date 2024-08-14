const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use((req, res, next) => {
  const ext = path.extname(req.url);
  switch (ext) {
    case '.js':
      res.set('Content-Type', 'application/javascript');
      break;
    case '.wasm':
      res.set('Content-Type', 'application/wasm');
      break;
    case '.json':
      res.set('Content-Type', 'application/json');
      break;
  }
  next();
});

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
