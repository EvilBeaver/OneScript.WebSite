FROM evilbeaver/onescript:dev

COPY packagedef /app/packagedef
COPY src /app/src
WORKDIR /app

RUN opm install -l

ENV filesDir=/var/www/oscript.io

EXPOSE 3030
ENTRYPOINT [ "oscript", "src/main.os"]