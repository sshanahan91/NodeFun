//chai can use should, expect, and assert
var expect = require("chai").expect;
// link to the file we want to test
var tools = require("../libs/tools");

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

//require nock, spoof a server
var nock = require("nock");

//require rewire, and then use it to spoof data
var rewire = require("rewire");
var rewiredTools = rewire("../libs/tools");

//require sinon, and use it to fake a console log
//note: uses rewire to add console.log
var sinon = require("sinon");

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
  describe("using Sinon spies (console.log)", function(){
    beforeEach(function(){
      this.console = {
        log: sinon.spy()
      };
      rewiredTools.__set__("console", this.console);
    });


    it("should order an item with 1 console log", function(done){
      //keep the scope for this test
      var _this = this;
      var results = rewiredTools.orderItemWithLog()

      //the actual data from the file should return:
      //"nothing". mock data will return "something"
      //NOTE: the beforeEach has carried over...even though
      //  the data isnt referenced, the previous inventory
      //  is still seen. the results would be "something"
      //expect(results).to.equal("nothing");
  
      expect(_this.console.log.callCount).to.equal(1);
      done();
    });    
  });
  // describe("using Sinon stubs (fake callback)", function(){
  //   beforeEach(function(){
  //     this.newMethod = sinon.stub().yields(6666);
  //     this.callback = sinon.spy();
  //     rewiredTools.__set__("newObject", this.enwMethod);
  //     rewiredTools.useCallback({}, this.callback);
  //   });


  //   it("should order an item with 1 console log", function(done){
  //     //keep the scope for this test
  //     var _this = this;

  //     expect(this.callback.calledWith(6666)).to.equal(true);
  //     done();
  //   });    
  // });
});
