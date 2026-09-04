const test = require('node:test');
const assert = require('node:assert/strict');

const { detectLocale, formatMessage, checkPassword } = require('./passoire');

test('detectLocale resolves the configured environment locale', () => {
  const previous = {
    LC_ALL: process.env.LC_ALL,
    LC_MESSAGES: process.env.LC_MESSAGES,
    LANG: process.env.LANG,
    LANGUAGE: process.env.LANGUAGE,
  };

  try {
    process.env.LC_ALL = 'fr_FR.UTF-8';
    process.env.LC_MESSAGES = 'en_US.UTF-8';
    process.env.LANG = 'de_DE.UTF-8';
    process.env.LANGUAGE = 'es_ES:fr';

    assert.equal(detectLocale(), 'fr');

    process.env.LC_ALL = 'pt_BR';
    delete process.env.LC_MESSAGES;
    delete process.env.LANG;
    delete process.env.LANGUAGE;
    assert.equal(detectLocale(), 'pt');
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
});

test('formatMessage interpolates values from the locale dictionary', () => {
  assert.equal(formatMessage('en', 'compromised', { count: 42 }), '[COMPROMISED] Appeared 42 times.');
  assert.equal(formatMessage('fr', 'safe'), '[SAIN] Aucune correspondance trouvée.');
});

test('known compromised passwords report a positive count', async () => {
  const compromised = await checkPassword('password', 'en');
  assert.equal(compromised.compromised, true);
  assert.ok(compromised.count >= 1);

  const safe = await checkPassword('M4r!n3b7#W@xV9zrD2&L5', 'en');
  assert.equal(safe.compromised, false);
  assert.equal(safe.count, 0);
});
