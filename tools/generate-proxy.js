const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env first as base configuration
dotenv.config();

// Load .env.development if it exists, which will override any values from .env
const devEnvPath = path.join(__dirname, '..', '.env.development');
if (fs.existsSync(devEnvPath)) {
  dotenv.config({ path: devEnvPath, override: true });
}

const proxyConfig = {
  "/api": {
    "target": process.env.PROXY_API_URL || "http://localhost:8101",
    "secure": false,
    "changeOrigin": true
  }
};

const proxyConfigPath = path.join(__dirname, '..', 'proxy.conf.json');
fs.writeFileSync(proxyConfigPath, JSON.stringify(proxyConfig, null, 2));

console.log('Generated proxy configuration:', proxyConfig);
