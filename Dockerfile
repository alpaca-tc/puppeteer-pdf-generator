# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker

FROM alpine:edge

ENV APP_DIR /usr/src/app
ENV FONT_DIR /usr/share/fonts
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

WORKDIR $APP_DIR

RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# noto font
RUN mkdir -p /tmp/noto \
    && wget https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip -O /tmp/noto/font.zip \
    && unzip /tmp/noto/font.zip -d /tmp/noto \
    && find /tmp/noto/ -type f -not -name '*otf' -and -not -name '*otc' | xargs rm -r \
    && mkdir -p $FONT_DIR/opentype/NotoSansCJKjp \
    && cp /tmp/noto/* $FONT_DIR/opentype/NotoSansCJKjp \
    && chmod 644 -R $FONT_DIR/opentype/NotoSansCJKjp

# microsoft-true-font
RUN apk --no-cache add msttcorefonts-installer fontconfig \
    && update-ms-fonts

# Google fonts
RUN mkdir -p /tmp/google-fonts \
  && wget https://github.com/google/fonts/archive/master.tar.gz -O /tmp/google-fonts/fonts.tar.gz \
  && cd /tmp/google-fonts \
  && tar -xf fonts.tar.gz \
  && mkdir -p $FONT_DIR/truetype/google-fonts \
  && find $PWD/fonts-master/ -name "*.ttf" -exec install -m644 {} $FONT_DIR/truetype/google-fonts/ \; || return 1 \
  && rm -rf /tmp/google-fonts

# IPA font
RUN mkdir -p /tmp/ipa-fonts \
  && wget https://oscdl.ipa.go.jp/IPAexfont/IPAexfont00401.zip -O /tmp/ipa-fonts/font.zip \
  && unzip /tmp/ipa-fonts/font.zip -d /tmp/ipa-fonts \
  && mkdir -p $FONT_DIR/truetype/ipa-fonts \
  && find /tmp/ipa-fonts/ -name "*.ttf" -exec install -m644 {} $FONT_DIR/truetype/ipa-fonts/ \; || return 1 \
  && rm -rf /tmp/ipa-fonts

# Reload fonts
RUN fc-cache -f && rm -rf /var/cache/*

RUN addgroup -S app && adduser -S -g app app \
    && mkdir -p /home/app/Downloads /app \
    && chown -R app:app /home/app \
    && chown -R app:app /app

COPY --chown=app:app . .

# Setup package and clean cache
RUN yarn install --frozen-lockfile --no-cache \
      && NODE_ENV=production yarn run build \
      && rm -rf node_modules src \
      && yarn install --frozen-lockfile --no-cache --production \
      && yarn cache clean

USER app:app

ENV NODE_ENV production
EXPOSE 8080

CMD ["cli.js"]
