FROM evilbeaver/onescript:dev

COPY packagedef /app/packagedef
COPY src/ /app/src/
COPY data/ /app/data/
WORKDIR /app

RUN opm install -l

ENV filesDir=/var/www/oscript.io
ENV server_root=/app/data
ENV OSCRIPT_CONFIG=lib.system=/app/oscript_modules

EXPOSE 3030
ENTRYPOINT [ "oscript", "src/main.os"]