// Chapter 0: Introduction and Aggregation Concepts

// Aggregation Structure and Syntax

// **m121/aggregation_structure.js**

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



  // Chapter 1: Basic Aggregation - $match and $project

// $match: Filtering documents

// **m121/match_stage.js**

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




// Shaping documents with $project

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



// Chapter 2: Basic Aggregation - Utility Stages

// $addFields and how it is similar to $project

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



// geoNear Stage

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



// Cursor-like stages: Part 1

// **m121/cursorlike_stages.js**

// project fields ``numberOfMoons`` and ``name``
db.solarSystem.find({}, {"_id": 0, "name": 1, "numberOfMoons": 1}).pretty();

// count the number of documents
db.solarSystem.find({}, {"_id": 0, "name": 1, "numberOfMoons": 1}).count();

// skip documents
db.solarSystem.find({}, {"_id": 0, "name": 1, "numberOfMoons": 1}).skip(5).pretty();

// limit documents
db.solarSystem.find({}, {"_id": 0, "name": 1, "numberOfMoons": 1}).limit(5).pretty();

// sort documents
db.solarSystem.find({}, { "_id": 0, "name": 1, "numberOfMoons": 1 }).sort( {"numberOfMoons": -1 } ).pretty();

// ``$limit`` stage
db.solarSystem.aggregate([{
  "$project": {
    "_id": 0,
    "name": 1,
    "numberOfMoons": 1
  }
},
{ "$limit": 5  }]).pretty();

// ``skip`` stage
db.solarSystem.aggregate([{
  "$project": {
    "_id": 0,
    "name": 1,
    "numberOfMoons": 1
  }
}, {
  "$skip": 1
}]).pretty();


// Cursor-like stages: Part 2

// ``$count`` stage
db.solarSystem.aggregate([{
  "$match": {
    "type": "Terrestrial planet"
  }
}, {
  "$project": {
    "_id": 0,
    "name": 1,
    "numberOfMoons": 1
  }
}, {
  "$count": "terrestrial planets"
}]).pretty();

// removing ``$project`` stage since it does not interfere with our count
db.solarSystem.aggregate([{
  "$match": {
    "type": "Terrestrial planet"
  }
}, {
  "$count": "terrestrial planets"
}]).pretty();


// ``$sort`` stage
db.solarSystem.aggregate([{
  "$project": {
    "_id": 0,
    "name": 1,
    "numberOfMoons": 1
  }
}, {
  "$sort": { "numberOfMoons": -1 }
}]).pretty();

// sorting on more than one field
db.solarSystem.aggregate([{
  "$project": {
    "_id": 0,
    "name": 1,
    "hasMagneticField": 1,
    "numberOfMoons": 1
  }
}, {
  "$sort": { "hasMagneticField": -1, "numberOfMoons": -1 }
}]).pretty();

// setting ``allowDiskUse`` option
db.solarSystem.aggregate([{
  "$project": {
    "_id": 0,
    "name": 1,
    "hasMagneticField": 1,
    "numberOfMoons": 1
  }
}, {
  "$sort": { "hasMagneticField": -1, "numberOfMoons": -1 }
}], { "allowDiskUse": true }).pretty();




// $sample Stage

// **m121/sample_stage.js**

// sampling 200 documents of collection ``nycFacilities``
db.nycFacilities.aggregate([{"$sample": { "size": 200 }}]).pretty();



// **m121/chapter2/scaling.js**

// general scaling

min + (max - min) * ((x - x_min) / (x_max - x_min));

// we will use 1 as the minimum value and 10 as the maximum value for scaling,
// so all scaled votes will fall into the range [1,10]

scaled_votes = 1 + 9 * ((x - x_min) / (x_max - x_min));

// NOTE: We CANNOT simply do 10 * ((x - x_min))..., results will be wrong
// Order of operations is important!

// use these values for scaling imdb.votes
x_max = 1521105,
x_min = 5,
min = 1,
max = 10,
x = imdb.votes;

// within a pipeline, it should look something like the following
/*
  {
    $add: [
      1,
      {
        $multiply: [
          9,
          {
            $divide: [
              { $subtract: [<x>, <x_min>] },
              { $subtract: [<x_max>, <x_min>] }
            ]
          }
        ]
      }
    ]
  }
*/

// given we have the numbers, this is how to calculated normalized_rating
// yes, you can use $avg in $project and $addFields!
normalized_rating = average(scaled_votes, imdb.rating);



// Chapter 3: Core Aggregation - Combining Information

// The $group Stage

// **m121/group_stage.js**

// grouping by year and getting a count per year using the { $sum: 1 } pattern
db.movies.aggregate([
  {
    "$group": {
      "_id": "$year",
      "numFilmsThisYear": { "$sum": 1 }
    }
  }
]);

// grouping as before, then sorting in descending order based on the count
db.movies.aggregate([
  {
    "$group": {
      "_id": "$year",
      "count": { "$sum": 1 }
    }
  },
  {
    "$sort": { "count": -1 }
  }
]);

// grouping on the number of directors a film has, demonstrating that we have to
// validate types to protect some expressions
db.movies.aggregate([
  {
    "$group": {
      "_id": {
        "numDirectors": {
          "$cond": [{ "$isArray": "$directors" }, { "$size": "$directors" }, 0]
        }
      },
      "numFilms": { "$sum": 1 },
      "averageMetacritic": { "$avg": "$metacritic" }
    }
  },
  {
    "$sort": { "_id.numDirectors": -1 }
  }
]);

// showing how to group all documents together. By convention, we use null or an
// empty string, ""
db.movies.aggregate([
  {
    "$group": {
      "_id": null,
      "count": { "$sum": 1 }
    }
  }
]);

// filtering results to only get documents with a numeric metacritic value
db.movies.aggregate([
  {
    "$match": { "metacritic": { "$gte": 0 } }
  },
  {
    "$group": {
      "_id": null,
      "averageMetacritic": { "$avg": "$metacritic" }
    }
  }
]);




// Accumulator Stages with $project

// **m121/accumulator_project.js**

// run to get a view of the document schema
db.icecream_data.findOne();

// using $reduce to get the highest temperature
db.icecream_data.aggregate([
  {
    "$project": {
      "_id": 0,
      "max_high": {
        "$reduce": {
          "input": "$trends",
          "initialValue": -Infinity,
          "in": {
            "$cond": [
              { "$gt": ["$$this.avg_high_tmp", "$$value"] },
              "$$this.avg_high_tmp",
              "$$value"
            ]
          }
        }
      }
    }
  }
]);

// performing the inverse, grabbing the lowest temperature
db.icecream_data.aggregate([
  {
    "$project": {
      "_id": 0,
      "min_low": {
        "$reduce": {
          "input": "$trends",
          "initialValue": Infinity,
          "in": {
            "$cond": [
              { "$lt": ["$$this.avg_low_tmp", "$$value"] },
              "$$this.avg_low_tmp",
              "$$value"
            ]
          }
        }
      }
    }
  }
]);

// note that these two operations can be done with the following operations, can
// be done more simply. The following two expressions are functionally identical

db.icecream_data.aggregate([
  { "$project": { "_id": 0, "max_high": { "$max": "$trends.avg_high_tmp" } } }
]);

db.icecream_data.aggregate([
  { "$project": { "_id": 0, "min_low": { "$min": "$trends.avg_low_tmp" } } }
]);

// getting the average and standard deviations of the consumer price index
db.icecream_data.aggregate([
  {
    "$project": {
      "_id": 0,
      "average_cpi": { "$avg": "$trends.icecream_cpi" },
      "cpi_deviation": { "$stdDevPop": "$trends.icecream_cpi" }
    }
  }
]);

// using the $sum expression to get total yearly sales
db.icecream_data.aggregate([
  {
    "$project": {
      "_id": 0,
      "yearly_sales (millions)": { "$sum": "$trends.icecream_sales_in_millions" }
    }
  }
]);



// The $unwind Stage

// **m121/unwind_stage.js**

// finding the top rated genres per year from 2010 to 2015...
db.movies.aggregate([
  {
    "$match": {
      "imdb.rating": { "$gt": 0 },
      "year": { "$gte": 2010, "$lte": 2015 },
      "runtime": { "$gte": 90 }
    }
  },
  {
    "$unwind": "$genres"
  },
  {
    "$group": {
      "_id": {
        "year": "$year",
        "genre": "$genres"
      },
      "average_rating": { "$avg": "$imdb.rating" }
    }
  },
  {
    "$sort": { "_id.year": -1, "average_rating": -1 }
  }
]);

// unfortunately we got too many results per year back. Rather than peform some
// other complex grouping and matching, we just append a simple group and sort
// stage, taking advantage of the fact the documents are in the order we want
db.movies.aggregate([
  {
    "$match": {
      "imdb.rating": { "$gt": 0 },
      "year": { "$gte": 2010, "$lte": 2015 },
      "runtime": { "$gte": 90 }
    }
  },
  {
    "$unwind": "$genres"
  },
  {
    "$group": {
      "_id": {
        "year": "$year",
        "genre": "$genres"
      },
      "average_rating": { "$avg": "$imdb.rating" }
    }
  },
  {
    "$sort": { "_id.year": -1, "average_rating": -1 }
  },
  {
    "$group": {
      "_id": "$_id.year",
      "genre": { "$first": "$_id.genre" },
      "average_rating": { "$first": "$average_rating" }
    }
  },
  {
    "$sort": { "_id": -1 }
  }
]);



// The $lookup Stage

// **m121/lookup_stage.js**

// familiarizing with the air_alliances schema
db.air_alliances.findOne();

// familiarizing with the air_airlines schema
db.air_airlines.findOne();

// performing a lookup, joining air_alliances with air_airlines and replacing
// the current airlines information with the new values
db.air_alliances
  .aggregate([
    {
      "$lookup": {
        "from": "air_airlines",
        "localField": "airlines",
        "foreignField": "name",
        "as": "airlines"
      }
    }
  ])
  .pretty();




  // Chapter 4: Core Aggregation - Multidimensional Grouping

// Facets: Single Facet Query

// **facets/singleQueryFacets.js**

// find one company document
db.companies.findOne();

// create text index
db.companies.createIndex({"description": "text", "overview": "text"});

// find companies matching term `networking` using text search
db.companies.aggregate([ {"$match": { "$text": {"$search": "network"}  }  }] );


// $sortByCount single query facet for the previous search
db.companies.aggregate([
  {"$match": { "$text": {"$search": "network"}  }  },
 {"$sortByCount": "$category_code"} 
]);


// extend the pipeline for a more elaborate facet
db.companies.aggregate([
  {"$match": { "$text": {"$search": "network"}  }  },
  {"$unwind": "$offices"},
  {"$match": { "offices.city": {"$ne": ""}  }},
  {"$sortByCount": "$offices.city"}
]);




// Chapter 4: Core Aggregation - Multidimensional Grouping

// Facets: Single Facet Query

// **facets/manualBuckets.js**

// create manual buckets using $ bucket
db.companies.aggregate( [
  { "$match": {"founded_year": {"$gt": 1980}, "number_of_employees": {"$ne": null}}  },
  {"$bucket": {
     "groupBy": "$number_of_employees",
     "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ]}
}]);

// reproduce error message for non matching documents
db.coll.insert({ x: "a" });
db.coll.aggregate([{ $bucket: {groupBy: "$x", boundaries: [0, 50, 100]}}]);

// set `default` option to collect documents that do not match boundaries
db.companies.aggregate( [
  { "$match": {"founded_year": {"$gt": 1980}}},
  { "$bucket": {
    "groupBy": "$number_of_employees",
    "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
    "default": "Other" }
}]);

// reproduce error message for inconsitent boundaries datatype
db.coll.aggregate([{ $bucket: {groupBy: "$x", boundaries: ["a", "b", 100]}}]);

// set `output` option for $bucket stage
db.companies.aggregate([
  { "$match":
    {"founded_year": {"$gt": 1980}}
  },
  { "$bucket": {
      "groupBy": "$number_of_employees",
      "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
      "default": "Other",
      "output": {
        "total": {"$sum":1},
        "average": {"$avg": "$number_of_employees" },
        "categories": {"$addToSet": "$category_code"}
      }
    }
  }
]);





// Chapter 4: Core Aggregation - Multidimensional Grouping

// Facets: Auto Buckets

// **facets/autoBuckets.js**

// generate buckets automatically with $bucktAuto stage
db.companies.aggregate([
  { "$match": {"offices.city": "New York" }},
  {"$bucketAuto": {
    "groupBy": "$founded_year",
    "buckets": 5
}}]);


// set `output` option for $bucketAuto
db.companies.aggregate([
  { "$match": {"offices.city": "New York" }},
  {"$bucketAuto": {
    "groupBy": "$founded_year",
    "buckets": 5,
    "output": {
        "total": {"$sum":1},
        "average": {"$avg": "$number_of_employees" }  }}}
]);


// default $buckeAuto behaviour
for(i=1; i <= 1000; i++) {db.series.insert( {_id: i}  )}
db.series.aggregate(
  {$bucketAuto:
    {groupBy: "$_id", buckets: 5 }
});


// generate automatic buckets using granularity numerical series R20
db.series.aggregate(
  {$bucketAuto:
    {groupBy: "$_id", buckets: 5 , granularity: "R20"}
  });




// Chapter 4: Core Aggregation - Multidimensional Grouping

// Facets: Multiple Facets

// **facets/multipleFacets.js**

// render several different facets using $facet stage
db.companies.aggregate( [
    {"$match": { "$text": {"$search": "Databases"} } },
    { "$facet": {
      "Categories": [{"$sortByCount": "$category_code"}],
      "Employees": [
        { "$match": {"founded_year": {"$gt": 1980}}},
        {"$bucket": {
          "groupBy": "$number_of_employees",
          "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
          "default": "Other"
        }}],
      "Founded": [
        { "$match": {"offices.city": "New York" }},
        {"$bucketAuto": {
          "groupBy": "$founded_year",
          "buckets": 5   }
        }
      ]
  }}]).pretty();




// Chapter 4: Core Aggregation - Multidimensional Grouping

// The $sortByCount Stage

// **m121/sortByCount_stage.js**

// performing a group followed by a sort to rank occurence
db.movies.aggregate([
  {
    "$group": {
      "_id": "$imdb.rating",
      "count": { "$sum": 1 }
    }
  },
  {
    "$sort": { "count": -1 }
  }
]);

// sortByCount is equivalent to the above. In fact, if you execute this pipeline
// with { explain: true } you will see that it is transformed to the above!
db.movies.aggregate([
  {
    "$sortByCount": "$imdb.rating"
  }
]);




// Chapter 5: Miscellaneous Aggregation

// The $redact Stage

// **m121/redact_stage.js**

// creating a variable to refer against
var userAccess = "Management";

// comparing whether the value/s in the userAccess variable are in the array
// referenced by the $acl field path
db.employees.aggregate([
  {
    "$redact": {
        "$cond": [{ "$in": [userAccess, "$acl"] }, "$$DESCEND", "$$PRUNE"]
      }
    }
  ]).pretty();





// Chapter 5: Miscellaneous Aggregation

// Views

// **m121/views.js**

// this is the command we used to create the bronze_banking view in the database
// identical commands were used to create the silver and gold views, the only
// change was in the $match stage
db.createView("bronze_banking", "customers", [
  {
    "$match": { "accountType": "bronze" }
  },
  {
    "$project": {
      "_id": 0,
      "name": {
        "$concat": [
          { "$cond": [{ "$eq": ["$gender", "female"] }, "Miss", "Mr."] },
          " ",
          "$name.first",
          " ",
          "$name.last"
        ]
      },
      "phone": 1,
      "email": 1,
      "address": 1,
      "account_ending": { "$substr": ["$accountNumber", 7, -1] }
    }
  }
]);

// getting all collections in a database and seeing their information
db.getCollectionInfos();

// getting information on views only
db.system.views.find();





// Chapter 6: Aggregation Performance and Pipeline Optimization

// Pipeline Optimization - Part 1

// **m121/pipeline_optimization.js**

// an initial aggregatioin finding all movies where the title begins
// with a vowel. Notice the $project stage that will prevent a covered
// query!
db.movies.aggregate([
  {
    $match: {
      title: /^[aeiou]/i
    }
  },
  {
    $project: {
      title_size: { $size: { $split: ["$title", " "] } }
    }
  },
  {
    $group: {
      _id: "$title_size",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
]);

// showing the query isn't covered
db.movies.aggregate(
  [
    {
      $match: {
        title: /^[aeiou]/i
      }
    },
    {
      $project: {
        title_size: { $size: { $split: ["$title", " "] } }
      }
    },
    {
      $group: {
        _id: "$title_size",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ],
  { explain: true }
);

// this is better, we are projecting away the _id field. But this seems like
// a lot of manual work...
db.movies.aggregate([
  {
    $match: {
      title: /^[aeiou]/i
    }
  },
  {
    $project: {
      _id: 0,
      title_size: { $size: { $split: ["$title", " "] } }
    }
  },
  {
    $group: {
      _id: "$title_size",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
]);

// verifying that it is a covered query
db.movies.aggregate(
  [
    {
      $match: {
        title: /^[aeiou]/i
      }
    },
    {
      $project: {
        _id: 0,
        title_size: { $size: { $split: ["$title", " "] } }
      }
    },
    {
      $group: {
        _id: "$title_size",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ],
  { explain: true }
);

// can we... do this? Yes, yes we can.
db.movies.aggregate([
  {
    $match: {
      title: /^[aeiou]/i
    }
  },
  {
    $group: {
      _id: {
        $size: { $split: ["$title", " "] }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
]);

// proof
db.movies.aggregate(
  [
    {
      $match: {
        title: /^[aeiou]/i
      }
    },
    {
      $group: {
        _id: {
          $size: { $split: ["$title", " "] }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ],
  { explain: true }
);

// and a very succinct way of expressing what we wanted all along
db.movies.aggregate([
  {
    $match: {
      title: /^[aeiou]/i
    }
  },
  {
    $sortByCount: {
      $size: { $split: ["$title", " "] }
    }
  }
]);



// Pipeline Optimization - Part 2

// a naive way to get the number of trades by action. We unwind the trades
// array first thing. We get the results we want, but maybe there is a better
// way
db.stocks.aggregate([
  {
    $unwind: "$trades"
  },
  {
    $group: {
      _id: {
        time: "$id",
        action: "$trades.action"
      },
      trades: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: "$_id.time",
      actions: {
        $push: {
          type: "$_id.action",
          count: "$trades"
        }
      },
      total_trades: { $sum: "$trades" }
    }
  },
  {
    $sort: { total_trades: -1 }
  }
]);

// working within the arrays is always better if we want to do analysis within
// a document. We get the same results in a slighlty easier to work with format
// and didn't incur the cost of a $group stage
db.stocks.aggregate([
  {
    $project: {
      buy_actions: {
        $size: {
          $filter: {
            input: "$trades",
            cond: { $eq: ["$$this.action", "buy"] }
          }
        }
      },
      sell_actions: {
        $size: {
          $filter: {
            input: "$trades",
            cond: { $eq: ["$$this.action", "sell"] }
          }
        }
      },
      total_trades: { $size: "$trades" }
    }
  },
  {
    $sort: { total_trades: -1 }
  }
]);

// remember, expression composition is powerful. Be creative, and things
// that can be done inline. Notice that there is no intermediary stage to
// filter the trades array first, it's just done as part of the argument to
// the reduce expression.

db.stocks.aggregate([
  {
    $project: {
      _id: 0,
      mdb_only: {
        $reduce: {
          input: {
            $filter: {
              input: "$trades",
              cond: { $eq: ["$$this.ticker", "MDB"] }
            }
          },
          initialValue: {
            buy: { total_count: 0, total_value: 0 },
            sell: { total_count: 0, total_value: 0 }
          },
          in: {
            $cond: [
              { $eq: ["$$this.action", "buy"] },
              {
                buy: {
                  total_count: { $add: ["$$value.buy.total_count", 1] },
                  total_value: {
                    $add: ["$$value.buy.total_value", "$$this.price"]
                  }
                },
                sell: "$$value.sell"
              },
              {
                sell: {
                  total_count: { $add: ["$$value.sell.total_count", 1] },
                  total_value: {
                    $add: ["$$value.sell.total_value", "$$this.price"]
                  }
                },
                buy: "$$value.buy"
              }
            ]
          }
        }
      }
    }
  }
]);
