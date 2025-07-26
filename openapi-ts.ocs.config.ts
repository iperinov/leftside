import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './api/ocs/oro-config-openapi.yaml',
  output: {
    indexFile: false, 
    path: 'app/api/ocs',
  },
  plugins: [
    '@tanstack/react-query', 
  ],
});