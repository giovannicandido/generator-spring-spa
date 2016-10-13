var generators = require('yeoman-generator');
var _ = require('lodash');
var utils = require('../utils');

module.exports = generators.Base.extend({
  constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
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

  install: function(){
    if(this.options['aurelia']){
      this.spawnCommand('au', ['new', 'client'])
    }else{
      this.spawnCommand('ng', ['new', 'client'])
    }
  },
  end: function () {
    var clientTech = _.capitalize(this.clientTech)
    console.log("Using: " + clientTech);
    console.log('Client will be created on: ' + this.destinationRoot() + '/client');
  }
});