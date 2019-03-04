# Splay Web App (V2)

Splay is a bigger project, you can check the main repository (here)[https://github.com/splay-project-v2], and this repository contents the Web Single Page App allowing to monitor easily splay data by anyone. It is a simple (Vue)[https://vuejs.org/] project that uses the backend service (JsonAPI) to obtain data of monitoring.

This app replaces (with the backend) the rails web app from splay (version1)[https://github.com/splay-project/splay]

## Project setup
You can use the docker configurations or install manually (npm) in our machine.

### Production setup

Use the Dockerfile (same directory) or/and use with docker-compose in the main repository
(`docker-compose up web_app`). This App is useless without the backend and the rest of component monitored.

### Development setup
In our own machine : `npm install` to install modules and `npm run server` (hot-reloads) to launch the server in development mode.

### Tests setup
```
npm run test
```

### License

General Public License : check license file for more info
