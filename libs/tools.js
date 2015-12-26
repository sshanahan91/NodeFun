var https = require("https");
var inventory = {title: "nothing", data: "none"};
module.exports = {
  printName(person) {
    return `${person.last}, ${person.first}`;
  },

  loadWiki(person, callback) {
    var url = `https://en.wikipedia.org/wiki/${person.first}_${person.last}`;
    https.get(url, function(res){
      var body = "";
      res.setEncoding("UTF-8");

      res.on("data", function(chunk){
        body += chunk;
      });

      res.on("end", function(chunk){
        callback(body);
      });
    });
  },
  orderItem(){
    return inventory.title;
  },
  orderItemWithLog(){
    console.log("Data that we don't want to log");
    return inventory.title;
  },  
};