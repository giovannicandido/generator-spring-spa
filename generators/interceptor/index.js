'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var utils = require('../../utils');

module.exports = yeoman.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.Base.apply(this, arguments);

    // // Next, add your custom code
  },
  initializing: function(){
    this.initialConfig = this.config.getAll();
  },
  
  install: function(){
      this.destinationRoot('client');
      if(this.initialConfig.clientTech == "angular"){
        this.npmInstall(['angular-http-interceptor'], { 'save': true });
      }else{
          console.log(chalk.red("This is implemented only for angular projects"))
      }
      
  },
  end: function(){
      this.log(chalk.green("NPM package installed. See the docs in https://github.com/atende/angular-http-interceptor and enable what you want"));
      this.log(chalk.green("This tool will not mess up with your code ;-)"));
  }

});