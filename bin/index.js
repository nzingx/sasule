#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { generatePassword } from '../src/lib/generator.js';
import { getHashes } from '../src/lib/hasher.js';
import { initLogDir, saveLog, cleanupOldLogs } from '../src/lib/logger.js';

const run = async () => {
  console.clear();
  console.log(chalk.cyan.bold('🔐 API Key Generator CLI'));
  console.log(chalk.gray(`Generated at: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`));
  console.log('');

  const answers = await inquirer.prompt([
    {
      type: 'number',
      name: 'length',
      message: 'Password length?',
      default: 64,
      validate: val => val > 0 && val <= 2048
    },
    {
      type: 'number',
      name: 'count',
      message: 'How many API keys to generate?',
      default: 4,
      validate: val => val > 0 && val <= 500
    },
    {
      type: 'list',
      name: 'charset',
      message: 'Character set?',
      choices: ['lowercase', 'uppercase', 'numbers', 'symbols', 'letters', 'alphanumeric', 'all'],
      default: 'alphanumeric'
    },
    {
      type: 'list',
      name: 'casing',
      message: 'Character casing?',
      choices: ['lowercase', 'uppercase', 'mixed'],
      default: 'mixed'
    },
    {
      type: 'checkbox',
      name: 'algorithms',
      message: 'Hashing algorithm(s)?',
      choices: ['md5', 'sha256', 'sha512'],
      default: ['sha256', 'sha512']
    },
    {
      type: 'list',
      name: 'encoding',
      message: 'Output encoding?',
      choices: ['none', 'base64', 'base32'],
      default: 'none'
    },
    {
      type: 'input',
      name: 'prefix',
      message: 'Custom prefix (optional):',
      default: ''
    }
  ]);
  await initLogDir();
  await cleanupOldLogs();


  const results = [];
  for (let i = 0; i < answers.count; i++) {
    const raw = generatePassword(answers.length, answers.charset, answers.casing);
    const key = answers.prefix + raw;
    const hashes = getHashes(key, answers.algorithms, answers.encoding);
    results.push({ key, ...hashes });
  }

  results.forEach((item, idx) => {
    console.log(chalk.green(`\n#${idx + 1} API Key:`), item.key);
    for (const [algo, hash] of Object.entries(item)) {
      if (algo !== 'key') {
        console.log(`${chalk.gray(algo)}: ${hash}`);
      }
    }
  });
  await saveLog({
    generatedAt: new Date().toISOString(),
    answers,
    results
  });

  console.log(chalk.gray(`\n${answers.count} unique API keys generated with ${answers.algorithms.join(', ')} hash.`));
};

run();

