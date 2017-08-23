var generators = require('yeoman-generator');
var utils = require('../utils');

var defaults = (function(){
  return {
     scalaVersion: '2.12.3',
     springBootVersion: '1.5.6.RELEASE',
     packageName: 'com.mycompany.product'
  }
})();

module.exports = generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // // Next, add your custom code
  },
  
  initializing: function(){
    this.initialConfig = this.config.getAll();
  },
  
  prompting: function(){
    return this.prompt([
      {
        name: 'scalaVersion',
        message: 'Scala Version',
        default: defaults.scalaVersion,
        when: utils.noConfig('scalaVersion', this.initialConfig)
      },{
        name: 'springBootVersion',
        message: 'Spring Boot Version',
        default: defaults.springBootVersion,
        when: utils.noConfig('springBootVersion', this.initialConfig)
      },{
        name: 'packageName',
        message: 'Root application package',
        default: defaults.packageName,
        when: utils.noConfig('packageName', this.initialConfig),
        validate: function(value){
          var regex = /^([a-z0-9]+\.)?[a-z0-9][a-z0-9-]*(\.[a-z]+)*$/i
          if (regex.test(value)) {
            return true;
          }
          else {
              return value + " is not a domain. The convention is to use a reverse domain without www";
          }
        },
        store: true
      }
    ]).then(function(answers){
      this.config.set(answers);
      this.config.save();
    }.bind(this));
  },
  writing: function(){
    var config = this.config.getAll();
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath('server/'),
      config
    );
    var package = config.packageName.split(".").join("/");
    this.fs.copyTpl(
      this.templatePath('src/main/java/**/*'),
      this.destinationPath('server/src/main/java/' + package),
      config
    );
    this.fs.copyTpl(
      this.templatePath('src/test/scala/**/*'),
      this.destinationPath('server/src/test/scala/' + package),
      config
    );
    this.fs.copyTpl(
      this.templatePath('src/integTest/scala/**/*'),
      this.destinationPath('server/src/integTest/scala/' + package),
      config
    );
    this.fs.copyTpl(
      this.templatePath('src/integTest/resources/**/*'),
      this.destinationPath('server/src/integTest/resources/'),
      config
    );
    this.fs.copyTpl(
      this.templatePath('src/main/resources/**/*'),
      this.destinationPath('server/src/main/resources'),
      config
    );

    this.fs.copy(
      this.templatePath('../copy/**/*'),
      this.destinationPath('server/')
    );

    this.fs.copy(
      this.templatePath('../_gitignore'),
      this.destinationPath() + '/server/.gitignore'
    );
  },
 end: function () {
    console.log('server is ready on folder server');
  }
});