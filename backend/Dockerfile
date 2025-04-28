FROM evilbeaver/onescript:dev

COPY packagedef /app/packagedef
COPY src /app/src
COPY data /app/data
WORKDIR /app

RUN opm install -l

ENV filesDir=/var/www/oscript.io
ENV server_root=/app/data

EXPOSE 3030
ENTRYPOINT [ "oscript", "src/main.os"]