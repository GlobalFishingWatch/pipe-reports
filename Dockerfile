FROM node:8

# Install phantomjs
COPY ./dependencies/phantomjs-1.9.8-linux-x86_64/phantomjs /usr/local/bin/phantomjs

# Setup the application directory
RUN mkdir -p /opt/project
WORKDIR /opt/project

# Setup application dependencies
copy package*.json /opt/project
RUN npm --unsafe-perm install

# Setup the application code
COPY src /opt/project/src

ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]
