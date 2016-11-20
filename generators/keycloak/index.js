'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var utils = require('../../utils')

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
    if(this._isObjectEmpty(this.initialConfig)){
      console.error(chalk.red('Make sure you run this in the root folder of a app generate by spring-spa'))
      process.exit(1)
    }
    var config = this.initialConfig;
    var thePackage = config.packageName.split(".").join("/");
    this.fs.copyTpl(
      this.templatePath('src/main/java/**/*'),
      this.destinationPath('server/src/main/java/' + thePackage),
      config
    );
  
  },
  addDependencies: function() {
    utils.addGradleDependency("compile", "org.keycloak","keycloak-spring-security-adapter","2.2.1.Final");
  },
  end: function(){
    this.log(chalk.green("Added gradle dependencies"));
            
     this.log(chalk.green("You will need a keycloak.json file. See examples in \n"
      + " " + chalk.blue.underline.bold("server/src/integTest/resources/application-test.properties.dist")
      + " \n " + chalk.blue.underline.bold("server/src/main/resources/application-dev.properties.dist")
      + " \n " + chalk.blue.underline.bold("server/src/main/resources/application.properties.dist")))
     this.log("I recomend: application.properties with keycloak.configurationFile=/etc/project-name-keycloak.json " 
      + ", application-dev.properties and application-test.properties with keycloak.configurationFile=classpath:/keycloak-dev.json")
     this.log("\n You can integrate your SPA client with the Cross Site Forgery Request and with AjaxTimeoutRedirect."
     + " Is also a good idea to disable csrf projection in tests (security.enable-csrf=false)" 
     + ". Run " +  chalk.blue.underline.bold("yo spring-spa:interceptor") + " to generate HttpInterceptors "  )
  }
});
