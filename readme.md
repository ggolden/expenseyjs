### To build the docker image:

```docker build -t expensey .```

### To run the docker image:

```docker run -p 80:3000 -d --name expensey expensey```

### To see the logs:

```docker logs -f expensey```

### To get into the image:

```docker exec -it expensey /bin/bash```

### To stop:

```docker kill expensey && docker rm expensey```


### To run with debug

```DEBUG=expensey:server npm start```

### To run with the Chrome debugger

```node --inspect-brk ./bin/www```

then open chrome://inspect in Chrome and pick app

### To check syntax of a .js file

```node -c <file>

### Mongo in docker

```docker run --name mongo -v /Users/ggolden/tmp/mongo:/data/db -p 27017:27017 -d mongo:3```

### run expensey, linking to the running mongo image

```docker run -p 80:3000 -d --link mongo:mongo --name expensey expensey```

### get into mongo
```docker exec -it mongo mongo admin```

use expenses

db.expenses.remove({})

db.expenses.find().pretty()
