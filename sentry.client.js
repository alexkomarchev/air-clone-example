import * as Sentry from '@sentry/nextjs'

Sentry.init({
	dsn: 'https://977e4e013d7844c49c1c642cca0dff8f@o4505483299979264.ingest.sentry.io/4505550927691776',
	integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
	// Performance Monitoring
	tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})
