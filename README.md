[![CircleCI](https://circleci.com/gh/sheikhshack/tap-assmnt-sheikhsalim/tree/main.svg?style=svg&circle-token=c1cf9ba25551038be21ccf5376b1c98f8b1234c4)](https://circleci.com/gh/sheikhshack/tap-assmnt-sheikhsalim/tree/main)
# TAP Shortener
Name: Sheikh Salim

Hi Govtech Team! This is a mini repository for the Shortener Assignment

## Installation instructions


### Running with Docker Compose / Docker

Install Docker Engine and Docker Compose via [here]([https://](https://docs.docker.com/get-docker/)).



On parent directory, run
```shell
$ docker-compose up -d
```

This will instantiate all containers and configure them correctly. The page will be served with love on [localhost:5000](http://localhost:5000/)

The images have also been built and published to Dockerhub via `sheikhshack/tap-assmt` for ease of usage

## The stack

The stack is as such:
- Front end is `ReactJS`, with `Bootstrap` for responsiveness
- Back end is `ExpressJS`, with `Sequelize` as ORM
- Testing is with `Jest`
- Database is `Postgres`
- CI/CD is `CircleCI`
- And to top everything off, `Docker` to manage and containerise everything

## Misc
### Deployment
The repo has an integrated CI/CD pipeline that will automatically push to an AWS instance. This AWS instance is managed by `containerrr/watchtower`, which will pull images automatically on update. The deployment version of compose can be found in `/docker-compose-aws.yaml`

The page is available here: http://13.228.24.102/

*Update: Due to the [lack of HTTPs](https://stackoverflow.com/questions/52054635/copy-clipboard-function-working-locally-but-not-working-server) and Browser security procedures, the copy button does not work on the server deployemnt. Apologies for this!*


### Tests
To run tests, a nodeJS environment will be required. Please proceed to install nodeJS via [here](https://nodejs.org/en/download/). Following which, verify that everything works correctly by running the following:

```shell=
cd /back-end && npm install && npm build:ui && npm start
```

If all has been verified to be working, we can then run tests with
```shell=
npm run test
```

Alternatively, do see the CI/CD build results on top. Each push has been configured to run the tests and output the result, before the image is published to Dockerhub. 

And lastly, thank you for the opportunity to be considered for TAP! :)