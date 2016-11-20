var generators = require('yeoman-generator');
var commandExists = require('command-exists');
var _ = require('lodash');
var utils = require('../utils');

module.exports = generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
    this.option('skip-npm',{ 
      desc: 'Skip the npm instalation of client side dependencies',
      type: Boolean
    })
  },

  initializing: function () {
    // Check angular-cli global installed
     commandExists('ng', function (err, exists) {
      if (!exists) {
        commandExists('au', function (err, exists) {
          if (!exists) {
            console.error("You need angular-cli or aurelia-cli installed. Install with npm -g")
            process.exit(1)
          }

        });
      }

    });
    this.initialConfig = this.config.getAll();
  },
  prompting: function () {
    return this.prompt([
      {
        name: 'clientTech',
        message: 'Client Technology',
        type: 'list',
        default: 'angular',
        choices: ['angular', 'aurelia'],
        when: utils.noConfig('clientTech', this.initialConfig),
        store: true
      }
    ]).then(function (answers) {
      this.config.set(answers);
      this.config.save();
    }.bind(this));
  },

  default: {
    createClient: function () {
      var config = this.config.getAll();
      if (config.clientTech === 'aurelia') {
        this.spawnCommandSync('au', ['new', 'client'])
      } else {
        this.spawnCommandSync('ng', ['new', 'client', '--skip-npm', '--skip-bower', '--skip-git'])
      }
    },
  },

  writing: function () {
    var config = this.config.getAll();
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath('client/'),
      config
    )
  },
   installingAngularSPA: function() {
    this.npmInstall(['angular-spa'], { 'save': true });
  },
  install: function () {
    this.destinationRoot('client')
    if (!this.options['skip-npm']) {
      this.npmInstall();
    }
  },
  end: function () {
    console.log('client will be ready on folder client');
  }
});