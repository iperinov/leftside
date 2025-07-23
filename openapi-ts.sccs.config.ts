import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './api/sccs/openapi.yml',
  output: {
    indexFile: false, 
    path: 'app/api/sccs',
  },
  plugins: [
    '@tanstack/react-query', 
    '@hey-api/client-fetch',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './app/lib/clients/sccs/customFetch.ts',
    },
  ],
});