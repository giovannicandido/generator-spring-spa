Write docs here

# Tweeks

In the client folder set

      <base href="/app">

Every request to /app is redirected to index.html making natural
html5 routes work

Edit client package.json

    "scripts": {
      "start": "ng serve --proxy proxy.conf.json",
    }

`npm run start` is now proxied to the local spring boot server