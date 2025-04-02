import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const process = require('process');

if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0);
}

const husky = (await import('husky')).default;
console.log(husky());
