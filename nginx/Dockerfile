# Built from the repo root so it can include both the config and the dashboard
FROM nginx:1.27-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY dashboard/ /usr/share/nginx/html/
EXPOSE 80
