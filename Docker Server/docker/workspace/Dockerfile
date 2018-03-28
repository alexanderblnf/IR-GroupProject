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
        python2.7 \
        python-pip \
    && apt-get clean


#############
# Python Dependencies
#############
RUN pip install --upgrade pip
RUN pip install numpy \
    scipy \
    scikit-learn \
    Flask


RUN npm install -g pm2


#####################################
# Set Timezone
#####################################
ARG TZ=UTC
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set default work directory
WORKDIR /var/www

# Store all project files in the image
COPY . /var/www/

RUN chmod a+x /var/www/startup-script.sh

EXPOSE 8080