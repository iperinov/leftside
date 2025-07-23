import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './api/ocs/oro-config-openapi.yaml',
  output: {
    indexFile: false, 
    path: 'app/api/ocs',
  },
  plugins: [
    '@tanstack/react-query', 
    '@hey-api/client-fetch',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './app/lib/clients/ocs/customFetch.ts',
    },
  ],
});