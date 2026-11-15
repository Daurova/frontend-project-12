import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://7ca23c22a38a47b8bf557a553d64a56a@frontendproject12.bugsink.com/1',
  release: 'hexlet-chat@1.0.0',
  integrations: [],
  tracesSampleRate: 0,
});