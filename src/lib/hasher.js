import crypto from 'crypto';
import base32Encode from 'base32-encode';

export function hashKey(key, algorithm) {
  return crypto.createHash(algorithm).update(key).digest('hex');
}

export function encodeKey(key, encoding) {
  if (encoding === 'base64') {
    return `base64:${Buffer.from(key).toString('base64')}`;
  } else if (encoding === 'base32') {
    const encoded = base32Encode(Buffer.from(key), 'RFC4648', { padding: false });
    return `base32:${encoded.toLowerCase()}`;
  }
  return key;
}

export function getHashes(key, algorithms = [], encoding = 'none') {
  const result = {};
  for (const algo of algorithms) {
    result[algo] = hashKey(key, algo);
  }
  const encoded = encodeKey(key, encoding);
  if (encoding !== 'none') result[encoding] = encoded;
  return result;
}
