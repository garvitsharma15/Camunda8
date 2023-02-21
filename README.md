# Ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Process to follow

1. Update url in env.ts in src folder
2. steps to create docker image
    2.1 Place dockerfile in ui/ folder
    2.2 "docker build . -t {docker_username_name}/{docker_repo_name} ." eg (docker build -t garvitsharma/fadsui:latest .)
    2.3 "docker push {docker_username_name}/{docker_repo_name}" eg (docker push garvitsharma/fadsui:latest)
    2.4 "docker run -p {outside-port}:{container-port} -d {image name}" (docker run -p 80:80 -d garvitsharma/fadsui) inside environment (azure/aws)

3. additional commands 

    3.1 list docker containers : docker container ls
    3.2 remove docker container : docker rm {container-name/ conatiner-id}
    3.3 list docker image : docker image ls
    3.4 remove docker image : docker image remove {imagename/image-id}
