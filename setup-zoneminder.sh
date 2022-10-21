apt update -y; \
apt install apache2 mysql-server php -y; \
systemctl enable --now mysql && \
add-apt-repository --yes ppa:iconnor/zoneminder-1.36; \
apt update -y && apt upgrade -y; \
apt install zoneminder -y; \
rm /etc/mysql/my.cnf; \
cp /etc/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/my.cnf; \
sh -c 'echo "sql_mode = NO_ENGINE_SUBSTITUTION" >> /etc/mysql/my.cnf'; \
chmod 740 /etc/zm/zm.conf; \
chown root:www-data /etc/zm/zm.conf; \
chown -R www-data:www-data /usr/share/zoneminder/; \
a2enmod cgi rewrite expires headers; \
a2enconf zoneminder; \
service zoneminder start; \
service apache2 reload     

