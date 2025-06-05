import crypto from 'crypto';

const CHARSETS = {
  numbers: '0123456789',
  letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  symbols: '!@#$%^&*()_+[]{}|;:,.<>?/~`-=\\',
  alphanumeric: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  all: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?/~`-=\\',
};

export function generatePassword(length, type = 'alphanumeric', casing = 'mixed') {
  let charset = '';

  if (type === 'numbers') charset = CHARSETS.numbers;
  else if (type === 'letters') {
    charset = casing === 'lowercase' ? CHARSETS.lowercase
           : casing === 'uppercase' ? CHARSETS.uppercase
           : CHARSETS.letters;
  } else if (type === 'lowercase') charset = CHARSETS.lowercase;
  else if (type === 'uppercase') charset = CHARSETS.uppercase;
  else if (type === 'symbols') charset = CHARSETS.symbols;
  else if (type === 'alphanumeric') charset = CHARSETS.alphanumeric;
  else if (type === 'all') charset = CHARSETS.all;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randIndex = crypto.randomInt(0, charset.length);
    password += charset[randIndex];
  }
  return password;
}
