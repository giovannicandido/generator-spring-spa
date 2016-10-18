# Spring SPA

This project is a yeoman generator that puts together best practices for single page 
apps using spring framework.

Effort's will be on Angular 2 and Aurelia SPA. You can use anything.

It generates a client and server application. The client application is a standard
node angular-cli or aurelia-cli application.

The server is a standard Spring Boot application.

The two are bridged toggether using gradle and some spring config.

On developer you use the tools from NPM (ng serve, au start) and on production,
gradle will build the client and cache everything.

It also provides more candy's like:

- Test and integrationTest setups
- Slick database setup
- Keycloak setup
- Docker
- Continuous integration with wercker
- Documentation generation from markdown

Note: Some code use Scala, it is not a requirement, you can substitute by Java. 
I highly recomment you keep at least the unit tests in scala, 
because is way more fun and less boilerplate.

What this project is not:

 - It do not try to compete with JHipster, but try to be more straight forward 
 by ofering less customizations and features and not get in your way.
 - Not magic. I recommend that you understand how it works.
 - This project try not surprise you when you must need.
 - This project is not intended to provide alternatives. If some tech is choose, 
 the other's will be ignored on the generator. It DO NOT mean you can't do it yourself, or override,
 it only means that the generator will not easy thing's for you in this cases. It can only provide
 a standard way.

 This project is kind of a evolution of https://github.com/giovannicandido/slush-spring-aurelia
 . Has less stack build in, but delegates to other projects and let you choose, 
 by example *SASS* integration can be configured in angular-cli: https://github.com/angular/angular-cli

 # Tech that compose this generator

The main technological stack is:

 - Angular cli
 - Aurelia cli
 - Spring Boot
 - Gradle
 - NPM and Node
 - Keycloak
 - Docker
 - Wercker
 - Scala and Java
 - Scalatest
 - Mkdocs
 - Slick database
 - FlywayDB

You don't need to know everything, some are just for the build, others are optional.

If you know Spring Boot, Gradle and Angular or Aurelia, you are good to go :-)

# Usage

Lets create a angular project with everything the generator provides:

Install the things:

    npm install -g yo generator-spring-spa angular-cli

Create a new project

    yo spring-spa newProject

Add to git. This is required for gradle git and spring integration. Check http://localhost:8080/config 
If you want you can disable that in build.gradle, remove **apply plugin: "com.gorylenko.gradle-git-properties"**

    cd newProject
    git init
    git add .
    git commit -m "Initial commit"

Run a build and a test (lots of things will be downloaded, good time to have a coffe ;-)

    cd newProject
    ./gradlew build

All testes should pass


Integrate slick database:

    cd newProject
    yo spring-spa:slick

Follow instructions

Run tests

    ./gradlew integTest

Integrate keycloak:

    yo spring-spa:keycloak

Follow instructions

Run tests

    ./gradlew integTest

indexHtml test should fail, you now have security enabled. Update the test, see: http://docs.spring.io/spring-security/site/docs/current/reference/html/test-method.html

Create a SPA interceptor

    cd newProject
    yo spring-spa:interceptor

Follow instructions 

You will need to fit for your needs

Cross Site Request Forgery is enabled by default in spring, but you need to 
integrate in your SPA

    cd newProject
    yo spring-spa:csrf

Follow instructions