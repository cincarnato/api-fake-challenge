module.exports = {
	apps: [
		{
			name: 'API FAKE CHALLENGE',
			script: './index.js',
			env: {
				NODE_ENV: 'production',
				HOST: '0.0.0.0',
				PORT: '9898',
				SUCCESS_RATE: '90',

			}
		}

	]
};
