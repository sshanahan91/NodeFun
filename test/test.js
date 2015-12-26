var expect = require("chai").expect;
//chai can use should, expect, and assert
var tools = require("../libs/tools");
// link to the file we want to test
var nock = require("nock");

describe("Basic Example", function(){
  describe("printName()", function () {
    it("should print the users name", function() {
      var results = tools.printName({first: "Test", last: "User"});

      expect(results).to.equal("User, Test");
    });
  });
});

describe("Polling Webpage", function() {
  describe("loadWiki()", function(){
    //to set a timeout for a test that takes more than 2 seconds:
    //this.timeout(5000);

    it("should load an actual webpage", function(done){
      tools.loadWiki({first: "Abraham", last: "Lincoln"}, function(realHtml) {
        expect(realHtml).to.be.ok;
        done();
      });
    });
  });
});

var rewire = require("rewire");
var rewiredTools = rewire("../libs/tools");
describe("Fake Data", function(){
  describe("loadWiki() with nock (fake server)", function(){

    before(function(){
      //creating a fake webpage request:
      nock("https://en.wikipedia.org")
          .get("/wiki/Abraham_Lincoln")
          .reply(200, "Mock Data");
    });
    //using nock, aka fake website
    it("should load based on fake data", function(done){
      tools.loadWiki({first: "Abraham", last: "Lincoln"}, function(html) {
        expect(html).to.equal("Mock Data");
        done();
      });
    });
  });
  describe("using Rewire", function(){
    beforeEach(function(){
      this.testData = {title: "something", data: "123"};

      rewiredTools.__set__("inventory", this.testData);
    });

    it("should order an item", function(done){
      var results = rewiredTools.orderItem()

      //the actual data from the file should return:
      //"nothing". mock data will return "something"
      expect(results).to.equal("something");
      done();
    });    
  });
});
