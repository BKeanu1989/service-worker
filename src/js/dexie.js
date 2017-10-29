var Dexie = require("dexie");

var db = new Dexie("MyFriendDB");
db.version(1).stores({
	friends: '++id,name,age'
});
console.log("Using Dexie v" + Dexie.semVer);
//
// Query Database
//
db.open().then(function(){

	return db.friends.add({name: "Foo", age: 42});
  
}).then(function(){

	return db.friends
		.where('age')
		.between(40,65)
		.toArray();

}).then(function(friends){

	console.log("Found friends: " + JSON.stringify(friends, null, 2));
  
})