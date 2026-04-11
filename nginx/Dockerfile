FROM nginx:alpine

# default config hata
RUN rm /etc/nginx/conf.d/default.conf

# apna config daal
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# built frontend copy
COPY ../frontend/plant-frontend/dist /usr/share/nginx/html