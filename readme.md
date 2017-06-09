###   To build the docker image:

```docker build -t expensey .```

### To run the docker image:

```docker run -p 8080:3000 -d --name expensey expensey```

### To see the logs:

```docker logs -f expensey```

### To get into the image:

```docker exec -it expensey /bin/bash```

### To stop:

```docker kill expensey && docker rm expensey```
