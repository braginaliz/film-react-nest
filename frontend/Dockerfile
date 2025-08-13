FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api/afisha
ARG VITE_CDN_URL=/content/afisha
ARG VITE_BASE_URL=/
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}
ENV VITE_BASE_URL=${VITE_BASE_URL}
RUN npm run build

# Сохраняем артефакты сборки отдельно, чтобы потом скопировать в примонтированный volume
RUN mkdir -p /opt/dist && cp -r dist/* /opt/dist/

# артефакты сборки будут смонтированы как volume docker-compose-ом
VOLUME ["/app/dist"]

# При запуске контейнера копируем артефакты из образа в примонтированный volume и держим контейнер живым
CMD ["sh", "-c", "mkdir -p /app/dist && cp -r /opt/dist/* /app/dist/ 2>/dev/null || true; sleep infinity"]