FROM node:22-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./

RUN rm -rf node_modules package-lock.json && \
    npm install --frozen-lockfile && \
    npm cache clean --force


COPY vite.config.ts ./
COPY . .


RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/vite.config.ts ./

ENV NODE_ENV=production
EXPOSE 2173

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "2173"]