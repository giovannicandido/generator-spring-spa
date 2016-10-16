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

What this project is not:

 - It do not try to compete with JHipster, but try to be more straight forward 
 by ofering less customizations and features and not get in your way.
 - Not magic. I recommend that you understand how it works.
 - This project try not surprise you when you must need.

 This project is kind of a evolution of https://github.com/giovannicandido/slush-spring-aurelia
 . Has less stack build in, but delegates to other projects and let you choose, 
 by example *SASS* integration can be configured in angular-cli: https://github.com/angular/angular-cli