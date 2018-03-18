FROM mysql:5.7

ADD ./docker/mysql/my.cnf /etc/mysql/conf.d/my.cnf

ADD ./docker/mysql/database-schema.sql /docker-entrypoint-initdb.d/database-schema.sql

CMD ["mysqld"]

EXPOSE 3306
