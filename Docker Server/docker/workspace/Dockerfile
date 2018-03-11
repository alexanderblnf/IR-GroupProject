FROM phusion/baseimage:0.10.0

RUN DEBIAN_FRONTEND=noninteractive
RUN locale-gen en_US.UTF-8

ENV LANGUAGE=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV LC_CTYPE=UTF-8
ENV LANG=en_US.UTF-8
ENV TERM xterm

USER root

RUN apt-get update && \
    apt-get install -y \
        curl \
        sudo \
    && apt-get clean

RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

RUN apt-get update && \
    apt-get install -y \
        nodejs \
        build-essential \
        postgresql \
        postgresql-contrib \
    && apt-get clean

RUN npm install -g pm2

RUN touch /var/log/postgres.log

##########
#Postgres config
##########

USER postgres
COPY binary_dump /tmp/binary_dump
RUN service postgresql start && createdb IR_database && pg_restore --create --exit-on-error --verbose --dbname=IR_database /tmp/binary_dump

#####################################
# Set Timezone
#####################################

USER root

ARG TZ=UTC
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set default work directory
WORKDIR /var/www

# Store all project files in the image
COPY . /var/www/

EXPOSE 8080

CMD service postgresql start && tail -F /var/log/postgres.log
