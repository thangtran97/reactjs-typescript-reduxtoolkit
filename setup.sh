pip install -r ./backend/requirements.txt && \
yarn --cwd backend-nodejs install && \
yarn --cwd frontend/learning-typescript install && \
yarn --cwd frontend/learning-typescript build && \
mkdir -p /usr/nvr-app; mkdir -p /usr/nvr-app/golang_app; \
mkdir -p /usr/nvr-app/python_app; mkdir -p /usr/nvr-app/nodejs_app; \
mkdir -p /usr/nvr-app/reactjs_app && \
cp -a ./backend/. /usr/nvr-app/python_app/ && \
cp -a ./RTSPtoWeb_server/. /usr/nvr-app/golang_app/ && \
cp -a ./frontend/learning-typescript/. /usr/nvr-app/reactjs_app/ && \
cp -a ./backend-nodejs/. /usr/nvr-app/nodejs_app/ && \
cp -a ./scripts/. /usr/bin/; chmod 755 /usr/bin/*-exec.sh && \
cp -a ./services/. /lib/systemd/system/ && \
unlink /etc/nginx/sites-enabled/* && \
cp -a reactjs-app /etc/nginx/sites-available/; \
ln -s /etc/nginx/sites-available/reactjs-app /etc/nginx/sites-enabled/
