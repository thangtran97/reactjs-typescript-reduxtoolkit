pip install -r ./backend/requirements.txt && \
yarn --cwd backend-nodejs install && \
yarn --cwd frontend/learning-typescript install && \
cd RTSPtoWeb_server/; go build
