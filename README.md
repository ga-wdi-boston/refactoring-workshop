![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# A demo, code along, and practice using jQuery.ajax

## Introduction

We'll use `jQuery.ajax` method to execute GET, POST, and PATCH requests against an authenticated tic-tac-toe API.  We'll use a wrapped `EventSource` to watch for updates to a tic-tac-toe game.

## Objectives

By the end of this, students should be able to:

- Use `$.ajax` to POST a request and receive a response,
- Use `$.ajax` to PATCH a request and receive a response.

## Instructions

Fork and clone.

## Using web APIs

Web APIs often require some sort of authentication.  The tic-tac-toe API requires users to register and then login to gain an authentication token.

We'll rely heavily on `curl`, `httpbin.org`, the API [documentation](https://github.com/ga-wdi-boston/rails-ttt-project-api#readme), and the `jQuery.ajax` [documentation](http://api.jquery.com/jQuery.ajax/).

I'll go over `EventSource`, `Server Sent Events` and the wrapper `resourceWatcher` at the end of the lesson.

### Registering with the API

#### Demo

First we'll test our command against an echo server to make sure we're sending the right data.  There's no need to use and actual e-mail address and don't use anything you might want to actually use as a password.

Request:

```
curl --include --request POST --header "Content-Type: application/json" -d '{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password",
    "password_confirmation": "an example password"
  }
}' http://httpbin.org/post```

```

Response:

```
HTTP/1.1 200 OK
Server: nginx
Date: Tue, 13 Oct 2015 02:12:02 GMT
Content-Type: application/json
Content-Length: 648
Connection: keep-alive
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

{
  "args": {},
  "data": "{\n  \"credentials\": {\n    \"email\": \"an@example.email\",\n    \"password\": \"an example password\",\n    \"password_confirmation\": \"an example password\"\n  }\n}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "149",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.38.0"
  },
  "json": {
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  },
  "origin": "24.63.68.250",
  "url": "http://httpbin.org/post"
}
```

If we leave out the `--include` flag we won't see the response header.  What's the benefit of using an echo server?

#### Code along

Next we'll want to actually register with the API.

Request:

```
curl --include --request POST --header "Content-Type: application/json" -d '{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password",
    "password_confirmation": "an example password"
  }
}' http://ttt.wdibos.com/users
```

Response:

```
HTTP/1.1 201 Created
Server: nginx/1.4.6 (Ubuntu)
Date: Mon, 12 Oct 2015 14:55:18 GMT
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Vary: Origin
ETag: W/"76ddd7d2e657135e3a06674a29079ff1"
Cache-Control: max-age=0, private, must-revalidate
X-Request-Id: e31b8df1-2fa9-4586-8a31-58e036d1329c
X-Runtime: 0.191512

{"user":{"id":103,"email":"an@example.email"}}
```

#### Code along again

Now let's use the template code in `index.js` to get another "e-mail" address registered with the API.

### Logging into the API

#### Demo

```
curl --request POST --header "Content-Type: application/json" -d '{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password"
  }
}' http://httpbin.org/post
```

```
curl --request POST --header "Content-Type: application/json" -d '{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password"
  }
}' http://ttt.wdibos.com/login
```

#### Practice

Modify `index.js` to login to the API.  You may want to start by using the echo service to check your request.

### Listing games

#### Demo

```
curl --header "Authorization: Token token=c017d611187e3350baffc52d35a4df69" http://ttt.wdibos.com/games
```

#### Code along

Back to `index.js`

### Creating new games

#### Demo

```
curl --request POST --header "Authorization: Token token=40d58ee9a46818cc28cc6a04a65423d5" -d '{}'  http://ttt.wdibos.com/games
```

#### Practice

Update the '#create-game' submit handler and the `createGame` method to add a new game

### Marking a cell

#### Demo

```
curl --request PATCH --header "Content-Type: application/json" --header "Authorization: Token token=d25f70868d0bebfd8746459478b431b8" -d '{
  "game": {
    "cell": {
      "index": "1",
      "value": "x"
    }
  }
}' http://ttt.wdibos.com/games/1
```

#### Practice

Fill out the rest of the needed settings to exercise the whole API.  Test your work


