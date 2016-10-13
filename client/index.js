var generators = require('yeoman-generator');
var _ = require('lodash');
var utils = require('../utils');

module.exports = generators.Base.extend({
  constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
        this.option('skip-npm')
  },

  initializing: function(){
    this.initialConfig = this.config.getAll();
  },
  prompting: function(){
    return this.prompt([
      {
        name: 'clientTech',
        message: 'Client Technology',
        type: 'list',
        default: 'angular',
        choices: ['angular', 'aurelia'],
        when: utils.noConfig('clientTech', this.initialConfig)
      }
    ]).then(function(answers){
      this.config.set(answers);
      this.config.save();
    }.bind(this));
  },

  default: {
    createClient: function(){
       var config = this.config.getAll();
       if(config.clientTech === 'aurelia'){
          this.spawnCommandSync('au', ['new', 'client'])
        }else{
          this.spawnCommandSync('ng', ['new', 'client', '--skip-npm', '--skip-bower', '--skip-git'])
        }
      },
  },
  
  writing: function(){
    var config = this.config.getAll();
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath('client/'),
      config
    )
  },
  install: function(){
    this.destinationRoot('client')
    if(!this.options['skip-npm']){
      this.npmInstall();
    }   
  },
  end: function () {
    var clientTech = _.capitalize(this.clientTech)
    console.log("Using: " + clientTech);
    console.log('Client will be created on: ' + this.destinationRoot());
  }
});