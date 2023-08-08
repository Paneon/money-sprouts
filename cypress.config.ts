import { defineConfig } from 'cypress';
import { exec } from 'child_process';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8201',
        setupNodeEvents(on, config) {
            on('before:run', () => {
                exec(
                    'APP_ENV=test symfony server:start -d --port=8201 --no-tls'
                );
            });

            // Optionally, you can stop the server after tests are complete
            on('after:run', () => {
                exec('APP_ENV=test symfony server:stop');
            });
        },
    },
});
