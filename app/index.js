var generators = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var utils = require('../utils');

var defaults = (function () {
      var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user;

      if (process.platform === 'win32') {
          homeDir = process.env.USERPROFILE;
          osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
      }
      else {
          homeDir = process.env.HOME || process.env.HOMEPATH;
          osUserName = homeDir && homeDir.split('/').pop() || 'root';
      }

      configFile = path.join(homeDir, '.gitconfig');
      user = {};

      if (require('fs').existsSync(configFile)) {
          user = require('iniparser').parseSync(configFile).user;
      }

      return {
          userName: osUserName || format(user.name || ''),
          authorName: user.name || '',
          authorEmail: user.email || ''
      };
})();

module.exports = generators.Base.extend({

  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    this.argument('appName', {type: String, required: true})
    this.appName = _.camelCase(this.appName);
  },

  initializing : function () {
    this.destinationRoot(this.destinationRoot(this.appName))
    this.initialConfig = this.config.getAll();
    utils.configInfo(this.initialConfig)

    this.composeWith('spring-spa:server', {options: this.options});
    this.composeWith('spring-spa:client', {options: this.options})
    
  },
  prompting: function () {
    return this.prompt([{
          name: 'appVersion',
          message: 'What is the version?',
          default: '0.1.0',
          when: utils.noConfig('appVersion', this.initialConfig)
      }]).then(function (answers) {
      answers.appName = this.appName;
      this.config.set(answers);
      this.config.save();
    }.bind(this));
  },
  writing: function(){
    var config = this.config.getAll();
    console.log( this.sourceRoot())
    console.log(this.destinationRoot())
    
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(''),
      config
    );
    
    this.fs.copy(
      this.templatePath('../copy/**/*'),
      this.destinationRoot()
    );
  },
  end: function(){
    console.log("Your app will be ready on " + this.destinationRoot())
  }
});