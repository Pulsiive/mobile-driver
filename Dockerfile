FROM reactnativecommunity/react-native-android

WORKDIR /usr/share/app/mobile-driver

COPY package.json .

RUN npm install

EXPOSE 4444

COPY .  .

COPY mobile-driver-setup.sh /usr/local/bin/mobile-driver-setup.sh

RUN chmod +x /usr/local/bin/mobile-driver-setup.sh

CMD /usr/local/bin/mobile-driver-setup.sh