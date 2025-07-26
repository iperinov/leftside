import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './api/sccs/openapi.yml',
  output: {
    indexFile: false, 
    path: 'app/api/sccs',
  },
  plugins: [
    '@tanstack/react-query', 
  ],
});