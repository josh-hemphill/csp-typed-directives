import { defineConfig } from 'vitest/config';

export default defineConfig({
	mode: 'test',
	test: {
		include:[
			'**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
			'**/test*/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
		],
		coverage: {
			provider: 'c8',
			reporter: [
				'text-summary',
				'json', 'lcov', 'text', 'clover',
			],
		},
		// ...
	},
});
