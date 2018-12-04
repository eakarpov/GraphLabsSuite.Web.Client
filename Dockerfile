FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

RUN mkdir -p /frontend
WORKDIR /frontend
COPY ./ ./

RUN npm install

CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 5050; \
	else \
	npm start; \
	fi

EXPOSE 5050