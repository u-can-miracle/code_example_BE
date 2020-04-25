## Starting application for development
1. ```docker-compose build```
2. ```docker-compose up```
3. It will run on `localhost:3001`

## Starting application for production
1. ```docker-compose -f docker-compose-prod.yml build```
2. ```docker-compose -f docker-compose-prod.yml up```


## Update submodule
`git submodule update --recursive --remote`

## After cloning repo
`git submodule init`
`git submodule update`
