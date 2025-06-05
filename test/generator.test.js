import { generatePassword } from '../src/lib/generator.js';

describe('generatePassword', () => {
  it('should generate password with correct length', () => {
    const password = generatePassword(32, 'letters', 'mixed');
    expect(password.length).toBe(32);
  });

  it('should generate different passwords', () => {
    const p1 = generatePassword(64, 'alphanumeric', 'mixed');
    const p2 = generatePassword(64, 'alphanumeric', 'mixed');
    expect(p1).not.toBe(p2);
  });

  it('should respect casing', () => {
    const lower = generatePassword(10, 'letters', 'lowercase');
    expect(lower).toMatch(/^[a-z]+$/);

    const upper = generatePassword(10, 'letters', 'uppercase');
    expect(upper).toMatch(/^[A-Z]+$/);
  });
});
