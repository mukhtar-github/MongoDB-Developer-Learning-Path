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
}]).pretty();

// same query using find command
db.solarSystem.find({ "type": { "$ne": "Star" } }).pretty();

// count the number of matching documents
db.solarSystem.count({ "type": { "$ne": "Star"} });

// using $count
db.solarSystem.aggregate([{
  "$match": { "type": { "$ne": "Star"} }
}, {
  "$count": "planets"
}]);

// matching on value, and removing ``_id`` from projected document
db.solarSystem.find({"name": "Earth"}, {"_id": 0});



// **m121/project_stage.js**

// project ``name`` and remove ``_id``
db.solarSystem.aggregate([{ "$project": { "_id": 0, "name": 1 } }]);

// project ``name`` and ``gravity`` fields, including default ``_id``
db.solarSystem.aggregate([{ "$project": { "name": 1, "gravity": 1 } }]);

// using dot-notation to express the projection fields
db.solarSystem.aggregate([{ "$project": { "_id": 0, "name": 1, "gravity.value": 1 } }]);

// reassing ``gravity`` field with value from ``gravity.value`` embeded field
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "gravity": "$gravity.value" }}]);

// creating a document new field ``surfaceGravity``
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "surfaceGravity": "$gravity.value" }}]);

// creating a new field ``myWeight`` using expressions
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "myWeight": { "$multiply": [ { "$divide": [ "$gravity.value", 9.8 ] }, 86 ] } }}]);



// **m121/addFields_stage.js**

// reassign ``gravity`` field value
db.solarSystem.aggregate([{"$project": { "gravity": "$gravity.value" } }]);

// adding ``name`` and removing ``_id`` from projection
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "gravity": "$gravity.value" } }]);

// adding more fields to the projected document
db.solarSystem.aggregate([
{"$project":{
    "_id": 0,
    "name": 1,
    "gravity": "$gravity.value",
    "meanTemperature": 1,
    "density": 1,
    "mass": "$mass.value",
    "radius": "$radius.value",
    "sma": "$sma.value" }
}]);

// using ``$addFields`` to generate the new computed field values
db.solarSystem.aggregate([
{"$addFields":{
    "gravity": "$gravity.value",
    "mass": "$mass.value",
    "radius": "$radius.value",
    "sma": "$sma.value"}
}]);

// combining ``$project`` with ``$addFields``
db.solarSystem.aggregate([
{"$project": {
    "_id": 0,
    "name": 1,
    "gravity": 1,
    "mass": 1,
    "radius": 1,
    "sma": 1}
},
{"$addFields": {
    "gravity": "$gravity.value",
    "mass": "$mass.value",
    "radius": "$radius.value",
    "sma": "$sma.value"
}}]);



// **m121/geoNear_stage.js**

// using ``$geoNear`` stage
db.nycFacilities.aggregate([
  {
    "$geoNear": {
      "near": {
        "type": "Point",
        "coordinates": [-73.98769766092299, 40.757345233626594]
      },
      "distanceField": "distanceFromMongoDB",
      "spherical": true
    }
  }
]).pretty();

// include ``limit`` to results
db.nycFacilities.aggregate([{
  $geoNear: {
    near: {
      type: "Point",
        coordinates: [-73.98769766092299, 40.757345233626594]
      },
      distanceField: "distanceFromMongoDB",
      spherical: true,
      query: { type: "Hospital" },
    }
  },
  { $limit: 5 }
]).pretty();
