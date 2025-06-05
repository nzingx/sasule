import { hashKey, encodeKey } from '../src/lib/hasher.js';

describe('hashKey', () => {
  it('should return md5 hash', () => {
    const hash = hashKey('test', 'md5');
    expect(hash).toMatch(/^[a-f0-9]{32}$/);
  });

  it('should return sha256 hash', () => {
    const hash = hashKey('test', 'sha256');
    expect(hash.length).toBe(64);
  });
});

describe('encodeKey', () => {
  it('should encode in base64', () => {
    const encoded = encodeKey('hello', 'base64');
    expect(encoded).toMatch(/^base64:/);
  });

  it('should encode in base32', () => {
    const encoded = encodeKey('hello', 'base32');
    expect(encoded).toMatch(/^base32:/);
  });

  it('should return raw key if encoding is none', () => {
    const key = 'exampleKey';
    expect(encodeKey(key, 'none')).toBe(key);
  });
});
