'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.Base.apply(this, arguments);

    // // Next, add your custom code
  },
  initializing: function(){
    this.initialConfig = this.config.getAll();
  },
  _isObjectEmpty: function(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object
  },
  writing: function () {
    var config = this.initialConfig;
    var thePackage = config.packageName.split(".").join("/");
    this.fs.copyTpl(
      this.templatePath('src/main/scala/**/*'),
      this.destinationPath('server/src/main/scala/' + thePackage),
      config
    );
    this.fs.copyTpl(
      this.templatePath('src/integTest/scala/**/*'),
      this.destinationPath('server/src/integTest/scala/' + thePackage),
      config
    ); 
  },
  end: function(){
    this.log(chalk.green("You need the follow dependencies on " + chalk.blue.underline.bold("server/build.gradle")))
    this.log(
            'compile "org.springframework.boot:spring-boot-starter-jdbc",' + '\n' +
            '        "org.postgresql:postgresql:9.4-1202-jdbc42"' + "\n" +
            '// scala' + '\n' +
            'compile "com.typesafe.play:play-json$scalaV:2.5.9",' + '\n' +
            '        "com.typesafe.slick:slick$scalaV:3.1.1",' + '\n' +
            '        "com.github.tminglei:slick-pg$scalaV:0.14.3",' + '\n' +
            '        "com.github.tminglei:slick-pg_date2$scalaV:0.14.3",' + '\n' +
            '        "com.github.tminglei:slick-pg_play-json$scalaV:0.14.3"'
            );
            
     this.log("\n");
     this.log(chalk.green("You also need to configure "
      + chalk.blue.underline.bold("server/src/integTest/resources/application-test.properties")
      + " and " + chalk.blue.underline.bold("server/src/main/resources/application-dev.properties")))
     this.log("Files with " + chalk.blue.underline.bold(".dist") + " are examples")
  }
});
