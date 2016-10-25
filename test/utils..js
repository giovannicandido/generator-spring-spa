'use strict';
var path = require('path');
var fs = require('fs')
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var utils = require('../utils')
var chai = require('chai'), expect = chai.expect, should = chai.should();

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.use(require('chai-string'));
 

describe('utils', function () {
  it('check a config value in object', function (done) {
      var config = {myConf: 'exists'}
      var expected  = utils.noConfig('myConf', config)
      expected('any').then(function(resp){
          console.info(resp)
          expect(resp).to.equal(true)
          done();
      })
      expected.resolve();
  });
  it('should return the dependency in the gradle text', function(){
      var text = fs.readFileSync('./test/gradle-test.txt');
      var expected = utils.addDependencyToText("dependency", text);
      expect(expected).endsWith("dependency \n }");
  })

  it('should not concat dependency', function(){
      expect(utils.addDependencyToText("d", "text")).to.not.equal("textd")
  })

});
