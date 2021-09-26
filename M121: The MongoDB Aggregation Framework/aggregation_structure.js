// simple first example
db.solarSystem.aggregate([{
    "$match": {
      "atmosphericComposition": { "$in": [/O2/] },
      "meanTemperature": { $gte: -40, "$lte": 40 }
    }
  }, {
    "$project": {
      "_id": 0,
      "name": 1,
      "hasMoons": { "$gt": ["$numberOfMoons", 0] }
    }
  }], { "allowDiskUse": true});


  
  // $match all celestial bodies, not equal to Star
db.solarSystem.aggregate([{
  "$match": { "type": { "$ne": "Star" } }
}]).pretty()

// same query using find command
db.solarSystem.find({ "type": { "$ne": "Star" } }).pretty();

// count the number of matching documents
db.solarSystem.count();

// using $count
db.solarSystem.aggregate([{
  "$match": { "type": { "$ne": "Star"} }
}, {
  "$count": "planets"
}]);

// matching on value, and removing ``_id`` from projected document
db.solarSystem.find({"name": "Earth"}, {"_id": 0});