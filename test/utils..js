'use strict';
var path = require('path');
var fs = require('fs')
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var utils = require('../utils'); 
var chalk = require('chalk');
var exec = require('child_process').exec;
var chai = require('chai'), expect = chai.expect, should = chai.should();

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.use(require('chai-string'));
 

describe('utils', function () {
//   it('check a config value in object', function (done) {
//       var config = {myConf: 'exists'}
//       var expected  = utils.noConfig('myConf', config)
//       expected('any').then(function(resp){
//           console.info(resp)
//           expect(resp).to.equal(true)
//           done();
//       })
//       expected.resolve();
//   });
  it('should rewrite file with a snipe of text', function(){
      try {
            var fullPath = 'test/gradle-test.txt';
            utils.rewriteFile({
                file: fullPath,
                needle: 'generator-needle-gradle-dependency',
                splicable: [
                    `compile 'group:name:1.0.0'`
                ]
            }, this);
        } catch (e) {
            console.log(chalk.red(e))
            console.log(chalk.yellow('\nUnable to find ') + fullPath + chalk.yellow(' or missing required jhipster-needle. Reference to ') + 'compile ' + chalk.yellow(' not added.\n'));
        }

      var text = fs.readFileSync('./test/gradle-test.txt');
      expect(text.toString()).contains("compile 'group:name:1.0.0'");
      // Clean file
      exec("cp test/gradle-test.copy.txt test/gradle-test.txt")
  })

});
