FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /var/www \
  && chown -R nginx:nginx /var/www
VOLUME ["/var/www"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]