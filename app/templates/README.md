# Welcome to <%= appName %>

## Dependencies

* Node >= 5
* JDK 1.8
* Git

You need to install your client side cli globally

    npm install -g angular-cli 

Or
    
    npm install -g aurelia-cli

## Usage

You need to be on a git repo to run the project, because of spring boot actuator git env. (check http://localhost:8080/info for cool stuff)

    git init
    git add .
    git commit -m "Initial commit"

Usage:

    ./gradlew bootRun

Production Build

    ./gradlew build

Dev of client side

You need to use a proxy if you what to be productive and be close as possible to the prod env.

Otherwise you will need create a full build, which is annoying

The proxy.conf.json is configured to proxy **/api** **/rest** and **/socket** to port **8080**

For aurelia you need to edit the serve task https://github.com/aurelia/cli/issues/256

    cd client
    # angular
    ng serve --proxy proxy.conf.json
    # aurelia
    au start

Use the auto reload port

Notes: 

- Angular uses webpack and generate the dist **folder** in client only with a build and *NOT* with a serve
- Aurelia has the same problem because it do not create a **dist** folder at all
- Spring is configured to serve files from **client/dist** folder, you need a build to serve

That is why we use the client side tools to dev and create a proxy to port **8080**

# Server Tests

Server tests are separated between Integration Tests (integTest) and Unit Tests (test)

To run:

    ./gradlew integTest
    ./gradlew test

Integration tests are writen in scala for brevity, but spring has a good integration with JUnit.
Because of this, ScalaTest Run the test with JUnit4. Keep in mind you are in a JUnit env 
when writting integration test, that said, scalatest assertions are avalible

See: http://www.scalatest.org/getting_started_with_junit_4_in_scala

## What is Next?

Comming Soon:

* Keycloak authentication dev and prod flow
* Continuous integration
* Docker
* Databases: slick.lightbend.com, flywaydb
* Documentation in markdown for your project
* Serve docs on Amazon, and github pages
* More commands on the yo spring-spa:client and spring-spa:server
* Security