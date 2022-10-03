pip install -r ./backend/requirements.txt && \
yarn --cwd backend-nodejs install && \
yarn --cwd frontend/learning-typescript install && \
sh -c 'export NVRPATH="$(cd "$(dirname -- "$1")" >/dev/null; pwd -P)/$(basename -- "$1")" >> /etc/profile.d/nvr-env' && \
cd RTSPtoWeb_server/; go build

