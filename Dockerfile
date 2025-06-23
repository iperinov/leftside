FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY vite.config.ts tsconfig.json react-router.config.ts ./
COPY public ./public
COPY app ./app
RUN npm ci && npm run build

FROM nginx:stable-alpine AS production
COPY --from=builder /app/build/client /app
COPY configs/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
