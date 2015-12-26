var expect = require("chai").expect;
//chai can use should, expect, and assert
var tools = require("../libs/tools");
// link to the file we want to test
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
      tools.loadWiki({first: "Test", last: "User"}, function(realHtml) {
        expect(realHtml).to.be.ok;
        done();
      });
    });

    //using nock, aka fake data
    it("should load based on fake data", function(done){
      tools.loadWiki({first: "Test", last: "User"}, function(html) {
        expect(html).to.be.ok;
        done();
      });
    });
  });
});
