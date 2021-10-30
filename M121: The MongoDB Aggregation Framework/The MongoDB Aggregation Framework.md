# The MongoDB Aggregation Framework

## Chapter 0: Introduction and Aggregation Concepts

### Introduction to the MongoDB Aggregation Framework

Hi, I'm Nathan. Welcome to *M121-the MongoDB Aggregation Framework*. I'll be one of your instructors for this course. Throughout this course, we're going to discuss the *aggregation framework, a key feature of MongoDB*. You'll learn about *expressive filtering, powerful data transformation, statistical utilities and data analysis*, and how to do much more work with a single operation.

This course is seven chapters long. With each chapter, there will be a new set of lesson videos. After most of these lessons, there will be a quiz to assess your learning of the material. At the end of each chapter, there will be a set of related lab exercises. Let's go over a few of the course logistics.

The target audience -- this is a beginner's course focused on developer practices. If you're coming from an operations background, fear not, young grasshopper, we have something for you too. It is expected that you are familiar with the *MongoDB query language*. If you aren't, we recommend you taking our definitive beginner course, *M001, before attempting M121*.

How does grading work? There are quizzes, labs, and a final exam. Quizzes are ungraded and exist to make sure that you're understanding the content. Your grade in the class, however, will be based on how well you do on the labs and the final exam, each of these being worth 50% of your total grade. Students with a grade of 65% or greater will receive a passing grade and will get a certificate of completion.

Finally, I'd highly encourage you to participate in the discussion forum. We have knowledgeable teaching assistants who are there to answer your questions. We also have your classmates who can also contribute to answering your questions and are often beneficial and knowledgeable resources. The labs in this course can be challenging.

Based on our experience, we've seen that students who perform best in the course are those who are most active in the discussion forum. By the end of this course, you should be familiar with how to transform data, perform data analysis, and reallocate work to the server from your client application. With all of that said, we're excited to have you as a student in this course. Best of luck.

### Atlas Requirement

Before we dive into the course, let's discuss some prerequisites and walk through connecting to the infrastructure that is going to support the class. The course prerequisites are minimal. All that is required is a modern 64-bit operating system and an internet connection and your participation. One note -- you'll also need to be able to make a TCP connection on port 27017.

This is easy to test. Visit portquiz.net:27017. You should see a page that looks a lot like this. And make sure that you see something like this here that says you've reached this page on port 27017. If you don't see this page, please contact your network administrator about opening up this port. Additionally, make sure you post in the forums so that we can help you until this issue is resolved.

As you've seen myself and other instructors use new aggregation operators throughout the course, you are highly encouraged to pause the video and follow along. All collections we perform operations on will be available to you in the *Class Atlas cluster*. So what's *Atlas? Atlas is MongoDB's cloud-hosting* service. We'll let *MongoDB* worry about optimizing *storage, security, and backing up our data* for this course.

Signing up for *Atlas* is easy and free. Visit mongodb.com/cloud/atlas and click the Get Started Free button. After clicking the button, go ahead and fill out your information and click Get Started Free again. And for now, that's it. We'll be revisiting *Atlas* later on in the course. Next, let's ensure we have MongoDB installed. Visit mongodb.com and click the Download button.

Navigate over to Enterprise and select the download that's appropriate for your operating system. Enterprise is free to test and evaluate, so we'll be using it throughout the course. While that's downloading, let's click Resources and Documentation. Click on Tutorials and click MongoDB Enterprise. Scroll down and find the tutorial for installing MongoDB Enterprise on your specific operating system.

Lastly, we need to test our connection to the class *Atlas cluster*. Open a terminal and paste the information you find below this video. Go ahead and type *show dbs* to see all of the available databases available on the *cluster*. Typing *show collections* will show collections within the *aggregations database*. And that's it for the course prerequisites in connecting to *Atlas*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc
{"t":{"$date":"2021-09-25T04:37:13.868Z"},"s":"W",  "c":"CONTROL",  "id":23321,   "ctx":"main","msg":"Option: This name is deprecated. Please use the preferred name instead.","attr":{"deprecatedName":"ssl","preferredName":"tls"}}
MongoDB shell version v4.4.8
connecting to: mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?authSource=admin&compressors=disabled&gssapiServiceName=mongodb&replicaSet=Cluster0-shard-0
{"t":{"$date":"2021-09-25T04:37:15.735Z"},"s":"W",  "c":"NETWORK",  "id":23019,   "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"DNS resolution while connecting to peer was slow","attr":{"peer":"cluster0-shard-00-02-jxeqq.mongodb.net:27017","durationMillis":1230}}
Implicit session: session { "id" : UUID("92791c78-1a73-4dbc-93ae-098ec37eceb8") }
MongoDB server version: 4.2.16
WARNING: shell and server versions do not match
MongoDB Enterprise Cluster0-shard-0:PRIMARY> show dbs
100YWeatherSmall  0.128GB
admin             0.000GB
aggregations      0.068GB
citibike          0.367GB
city              0.002GB
config            0.015GB
coursera-agg      0.083GB
feedback          0.000GB
local             0.710GB
mflix             0.449GB
results           0.000GB
ships             0.001GB
video             0.513GB
MongoDB Enterprise Cluster0-shard-0:PRIMARY> show collections
air_airlines
air_alliances
air_routes
bronze_banking
child_reference
customers
employees
exoplanets
gold_banking
icecream_data
movies
nycFacilities
parent_reference
silver_banking
solarSystem
stocks
system.profile
```

### The Concept of Pipelines

*Pipelines*. You'll hear us mention *pipelines* quite a bit throughout the course, so let's take a few minutes to discuss what they are. *Pipelines* can be thought of as a conveyor belt in a factory. Along the line, there are different assembly stations. These assembly stations are stages. Depending on what we want to accomplish, we may have only one stage, or we may have many stages.

*Pipelines* work like this. Documents, represented by these squares, enter our *pipeline* and begin to flow into our first stage. This stage is called *$match*, which you'll be introduced to very soon. We set this stage up so that only *red and blue squares* make it through. Next, they flow through our *pipeline* and enter the second stage. In this example, we'll call this stage *$project*.

We set this stage up to transform our *squares into circles*. This is a small representation of the power the *aggregation framework* offers. We can transform our data in almost any way we desire. We'll be covering the *$project stage* in great detail in later lessons. This stage represents one of the many powerful analysis stages available, and it is called *$group*. Here, we have configured the stage to gather all of the documents that are flowing into it and produce a single document that gives us the ratio of *red to blue circles*.

We'll cover *$group*, and many other powerful *data analysis* stages, later in the course. There you have it. A high-level overview of what *pipelines* are. At the most basic level, they are a *composition of stages*, from one to many, that we can arrange and configure in almost any way we like. The *aggregation framework* provides many stages to allow us to *filter and transform our data*.

All we have to do is *compose the pipeline*. Some key takeaways to remember. *Pipelines are a composition of stages. Stages are configurable to produce desired transformations*. Documents flow through the stages like parts in an assembly line or water through a pipe. Finally, with only a few exceptions, which we'll cover later, stages can be arranged in any way we like and as many as we require.

### Aggregation Structure and Syntax

Let's take a few minutes to talk about the structure and syntax of the *aggregation framework. The aggregation framework has a simple and reliable structure and repeatable syntax. Pipelines* may contain *one or more stages*. Each *stage is a JSON object of key value pairs*. With only a few exceptions, we can have as many *stages* as we like. Additionally, options may be passed in.

```javascript
// Pipeline Stages
db.userColl.aggregate([{stage 1}, {stage 2}, {...stage N}], {options})
```

For example, specifying whether to allow disk use for *large aggregations*, or to view the *explain plan of the aggregation to see whether it is using indexes*, or if the *server optimized the pipeline*. Let's take a look at a very simple, but very real *pipeline* and discuss the syntax. Here, we have a *match stage* that checks whether the *atmoshperic composition* contains *oxygen* or not.

And if the *mean temperature* falls within this range. Then, we have a *project stage* that reshapes the document and calculates the new value. More on this in a moment. Lastly, this is our *options object - {allowDiskUse: true}*. Each stage is composed of either *operators or expressions*. As we continue through the course, you'll be introduced to many of these. Make sure you bookmark the *Aggregation Pipeline* Quick Reference page that's linked below this video.

Throughout the course, we'll be using the terms *operator and expression*, and it's vital that you can quickly access the documentation for these. So what's an *operator*? For this course, when we say *operators, we mean either query operators or aggregation stages*. In this example, *$match and $project are aggregation operators, and $in, $gte, and $lte, are query operators*.

As a general rule, *operators* always appear in the key position of a document. *$match* is a little special and we'll learn about it later. What's an *expression? Expressions* act a lot like functions. We provide *arguments and they provide a computed output*. And just like *functions, expressions* can be composed to form powerful new data transformations. *MongoDB* provides expressions for working with and producing values for many types of values.

In the *project stage, $gt is an expression*. And its *arguments are supplied in this array*. This *$numberOfMoons*, surrounded by the quotes, is also an *expression* that you'll learn about in a moment. An easy way to remember how to use *expressions is that it will always appear in a value position*. Let's run this now to see the output. Here, we see the result of the calculated field.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
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
{ "name" : "Earth", "hasMoons" : true }
```

It looks like Earth isn't the only planet that has oxygen. It's a relatively comfortable temperature and it does indeed have moons. One more important thing to cover. We may encounter syntax like this.

```javascript
Field Path: "$fieldName" ("$numberOfMoons")

System Variable: "$$UPPERCASE" ("$$CURRENT")

User Variable: "$$foo"
```

The first is a *field path* expression and it's used to access the value of a *field* in the document, like number of moves in the first example. The second, with two dollar signs followed by an *uppercase* word, is a *system level variable. $$current* refers to the current document. And you can find the meaning of others on the quick reference page. The last with two dollar signs followed by a lowercase word is a *user variable*. Some expressions let us temporarily bind a value to a name, or provide us a special name, to access some data.

And there we go. The *aggregation framework structure and syntax*. We highly recommend using additive bracket matching while constructing your pipelines to make noticing errors easier. There's just a few things to remember. *Pipelines are always an array of one or more stages. Stages are composed of one or more aggregation operators or expressions. Expressions may take a single argument or an array of arguments*. See you in the next lesson.

## Chapter 1: Basic Aggregation - $match and $project

### $match: Filtering documents

Now that we've discussed the concept of what *pipelines* are, and have given you an overview of *aggregation, and structure, and syntax*, it's time we learn about one of the most important stages, *$match. The $match* stage is vital to a successful and performing *pipeline*. It should come as early as possible. And you are free to use as many *$match changes as necessary in your pipeline*.

```javascript
db.solarSystem.aggregate([{
  "$match": { }
}])
```

Here is a basic *syntax for $match*. Since it is an *aggregation operator*, we prepend a dollar sign to the name. Again, *$match* may be used multiple times. And virtually every other stage can be used after it, with a few exceptions that we'll cover later in the course. Instrumental in understanding *$match and the context of an aggregation pipeline, I invite you to think of $match as a filter, rather than a find*.

We configure the filters in our *$match stage*. And as documents flow in, only those that meet our criteria are passed further in the *pipeline. Here, our $match stage will only let circles and stars through. $match uses standard MongoDB read operation query syntax*. We can perform matches based on *comparison, logic, arrays*, and much more. The only limitations are, we can't use the *$where* operator.

And if we want to use a *$test* operator, the *$match stage* must be the first stage in a *pipeline*. If *$match* is the first stage, it can take advantage of *indexes, which increases the speed of our queries. Again, $match should come early in our pipelines*. As a reminder and for reference, you can find a link to this page just below the video. We encourage you to bookmark this page for future reference.

Here's an example of *$match* in use. If I ask you the following *aggregation*, which filters the solar system collection, allowing only documents with types that don't equal *star* through, I can see that I get the results I expected.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
...   "$match": { "type": { "$ne": "Star" } }
... }]).pretty()
{
        "_id" : ObjectId("59a06674c8df9f3cd2ee7d54"),
        "name" : "Earth",
        "type" : "Terrestrial planet",
        "orderFromSun" : 3,
        "radius" : {
            "value" : 6378.137,
            "units" : "km"
        },
        "mass" : {
            "value" : 5.9723e+24,
            "units" : "kg"
        },
        "sma" : {
            "value" : 149600000,
            "units" : "km"
        },
        "orbitalPeriod" : {
            "value" : 1,
            "units" : "years"
        },
        "eccentricity" : 0.0167,
        "meanOrbitalVelocity" : {
            "value" : 29.78,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 1,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 23.45,
            "units" : "degrees"
        },
        "meanTemperature" : 15,
        "gravity" : {
            "value" : 9.8,
            "units" : "m/s^2"
        },
        "escapeVelocity" : {
            "value" : 11.18,
            "units" : "km/sec"
        },
        "meanDensity" : 5.52,
        "atmosphericComposition" : "N2+O2",
        "numberOfMoons" : 1,
        "hasRings" : false,
        "hasMagneticField" : true
}
{
        "_id" : ObjectId("59a06674c8df9f3cd2ee7d59"),
        "name" : "Neptune",
        "type" : "Gas giant",
        "orderFromSun" : 8,
        "radius" : {
            "value" : 24765,
            "units" : "km"
        },
        "mass" : {
            "value" : 1.02413e+26,
            "units" : "kg"
        },
        "sma" : {
            "value" : 4495060000,
            "units" : "km"
        },
        "orbitalPeriod" : {
            "value" : 164.79,
            "units" : "years"
        },
        "eccentricity" : 0.0113,
        "meanOrbitalVelocity" : {
            "value" : 5.43,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 0.72,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 28.8,
            "units" : "degrees"
        },
        "meanTemperature" : -210,
        "gravity" : {
            "value" : 11.15,
            "units" : "m/s^2"
        },
        "escapeVelocity" : {
            "value" : 23.5,
            "units" : "km/sec"
        },
        "meanDensity" : 1.638,
        "atmosphericComposition" : "H2+He",
        "numberOfMoons" : 14,
        "hasRings" : true,
        "hasMagneticField" : true
} ...
```

To show that *$match uses the MongoDB query syntax*, let's use *find* to see if we get identical results. The same results.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.find({ "type": { "$ne": "Star" } }).pretty()
{
        "_id" : ObjectId("59a06674c8df9f3cd2ee7d54"),
        "name" : "Earth",
        "type" : "Terrestrial planet",
        "orderFromSun" : 3,
        "radius" : {
            "value" : 6378.137,
            "units" : "km"
        },
        "mass" : {
            "value" : 5.9723e+24,
            "units" : "kg"
        },
        "sma" : {
            "value" : 149600000,
            "units" : "km"
        },
        "orbitalPeriod" : {
            "value" : 1,
            "units" : "years"
        },
        "eccentricity" : 0.0167,
        "meanOrbitalVelocity" : {
            "value" : 29.78,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 1,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 23.45,
            "units" : "degrees"
        },
        "meanTemperature" : 15,
        "gravity" : {
            "value" : 9.8,
            "units" : "m/s^2"
        },
        "escapeVelocity" : {
            "value" : 11.18,
            "units" : "km/sec"
        },
        "meanDensity" : 5.52,
        "atmosphericComposition" : "N2+O2",
        "numberOfMoons" : 1,
        "hasRings" : false,
        "hasMagneticField" : true
}
{
        "_id" : ObjectId("59a06674c8df9f3cd2ee7d59"),
        "name" : "Neptune",
        "type" : "Gas giant",
        "orderFromSun" : 8,
        "radius" : {
            "value" : 24765,
            "units" : "km"
        },
        "mass" : {
            "value" : 1.02413e+26,
            "units" : "kg"
        },
        "sma" : {
            "value" : 4495060000,
            "units" : "km"
        },
        "orbitalPeriod" : {
            "value" : 164.79,
            "units" : "years"
        },
        "eccentricity" : 0.0113,
        "meanOrbitalVelocity" : {
            "value" : 5.43,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 0.72,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 28.8,
            "units" : "degrees"
        },
        "meanTemperature" : -210,
        "gravity" : {
            "value" : 11.15,
            "units" : "m/s^2"
        },
        "escapeVelocity" : {
            "value" : 23.5,
            "units" : "km/sec"
        },
        "meanDensity" : 1.638,
        "atmosphericComposition" : "H2+He",
        "numberOfMoons" : 14,
        "hasRings" : true,
        "hasMagneticField" : true
} ...
```

Let's observe this another way. First, let's *count the number of documents with types that don't equal star*. It should be *eight*, now let's see how many documents make it through our *$match stage*. I'm going to use the utility station in this example called *count*, that you'll learn about later. Here, we can see that *eight documents pass through our aggregation*. Sorry, *Pluto. Lastly, $match* does not have any mechanism for projection.

```javascript
// count the number of matching documents
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.count({ "type": { "$ne": "Star"} })
8

// using $count
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
...   "$match": { "type": { "$ne": "Star"} }
... }, {
...   "$count": "planets"
... }]);
{ "planets" : 8 }
```

With *find*, we can do something like this if we want to project out the (_id) field. Although this may seem like a limitation, we will soon learn about a powerful stage that allows us to do this and much, much more. And that's it for *$match*. Again, we encourage you to think of *$match* as more of a *filter than a find*.

```javascript
// matching on value, and removing ``_id`` from projected document
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.find({"name": "Earth"}, {"_id": 0}).pretty()
{
        "name" : "Earth",
        "type" : "Terrestrial planet",
        "orderFromSun" : 3,
        "radius" : {
            "value" : 6378.137,
            "units" : "km"
        },
        "mass" : {
            "value" : 5.9723e+24,
            "units" : "kg"
        },
        "sma" : {
            "value" : 149600000,
            "units" : "km"
        },
        "orbitalPeriod" : {
            "value" : 1,
            "units" : "years"
        },
        "eccentricity" : 0.0167,
        "meanOrbitalVelocity" : {
            "value" : 29.78,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 1,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 23.45,
            "units" : "degrees"
        },
        "meanTemperature" : 15,
        "gravity" : {
            "value" : 9.8,
            "units" : "m/s^2"
        },
        "escapeVelocity" : {
            "value" : 11.18,
            "units" : "km/sec"
        },
        "meanDensity" : 5.52,
        "atmosphericComposition" : "N2+O2",
        "numberOfMoons" : 1,
        "hasRings" : false,
        "hasMagneticField" : true
}
```

Once documents are in an *aggregation pipeline*, and we're shaping them with new *fields and new data*, we'll be using *$match* heavily to keep filtering documents out. Some key things to remember. A *$match stage may contain a $text query operator*, but it must be the first stage in the *pipeline. $match come early in an aggregation pipeline, you cannot use $where with match, and $match uses the same query syntax as find*.

### Lab - $match 1

For this course, you will need to create *m121* directory in your system.

Please navigate to the *m121* directory from your terminal and then connect to the class Atlas cluster through the mongo shell using the following connection string:

```javascript
mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc
```

The above connection string will connect you to the aggregations database. You can verify it by running the following command in the *mongo shell*:

```javascript
db
```

**Note**: You will have access to the **aggregations** database. The **m121** user only has permission to access this database in the cluster.

After connecting to the cluster, ensure you can see the movies collection by typing **show collections** and then run the command **db.movies.findOne()**. Take a moment to familiarize yourself with the schema.

Once you have familiarized yourself with the schema, continue to the next tab.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ cd /var/m121
mukhtar@mukhtar-Aspire-ES1-431:/var/m121$ mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc
{"t":{"$date":"2021-09-28T03:47:36.391Z"},"s":"W",  "c":"CONTROL",  "id":23321,   "ctx":"main","msg":"Option: This name is deprecated. Please use the preferred name instead.","attr":{"deprecatedName":"ssl","preferredName":"tls"}}
MongoDB shell version v4.4.9
connecting to: mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?authSource=admin&compressors=disabled&gssapiServiceName=mongodb&replicaSet=Cluster0-shard-0
{"t":{"$date":"2021-09-28T03:47:37.945Z"},"s":"W",  "c":"NETWORK",  "id":23019,   "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"DNS resolution while connecting to peer was slow","attr":{"peer":"cluster0-shard-00-00-jxeqq.mongodb.net:27017","durationMillis":1027}}
Implicit session: session { "id" : UUID("7ffde0a0-ab98-4db2-85cd-8e0ae627abd9") }
MongoDB server version: 4.2.16
WARNING: shell and server versions do not match
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db
aggregations
MongoDB Enterprise Cluster0-shard-0:PRIMARY> show collections
air_airlines
air_alliances
air_routes
bronze_banking
child_reference
customers
employees
exoplanets
gold_banking
icecream_data
movies
nycFacilities
parent_reference
silver_banking
solarSystem
stocks
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.findOne()
{
        "_id" : ObjectId("573a1390f29313caabcd4192"),
        "title" : "The Conjuring of a Woman at the House of Robert Houdin",
        "year" : 1896,
        "runtime" : 1,
        "cast" : [
            "Jeanne d'Alcy",
            "Georges M�li�s"
        ],
        "plot" : "A woman disappears on stage.",
        "fullplot" : "An elegantly dressed man enters through a stage door onto a set with decorated back screen, a chair and small table. He brings a well-dressed women through the door, spreads a newspaper on the floor, and places the chair on it. She sits and fans herself; he covers her with a diaphanous cloth. She disappears; he tries to conjure her back with incomplete results. Can he go beyond the bare bones of a conjuring trick and succeed in the complete reconstitution of a the lady?",
        "lastupdated" : "2015-08-26 00:05:55.493000000",
        "type" : "movie",
        "directors" : [
            "Georges M�li�s"
        ],
        "imdb" : {
            "rating" : 6.3,
            "votes" : 759,
            "id" : 75
        },
        "countries" : [
            "France"
        ],
        "genres" : [
            "Short"
        ],
        "tomatoes" : {
            "viewer" : {
                "rating" : 3.7,
                "numReviews" : 59
            },
            "lastUpdated" : ISODate("2015-09-11T17:46:29Z")
        }
}
```

#### Problem 1

Help MongoDB pick a movie our next movie night! Based on employee polling, we've decided that potential movies must meet the following criteria.

* **imdb**.rating is at least 7
* **genres** does not contain "Crime" or "Horror"
* **rated** is either "PG" or "G"
* **languages** contains "English" and "Japanese"

Assign the aggregation to a variable named pipeline, like:

```javascript
var pipeline = [ { $match: { ... } } ]
```

* As a hint, your aggregation should return 23 documents. You can verify this by typing **db.movies.aggregate(pipeline).itcount()**

* Download the **m121/chapter1.zip** handout with this lab. Unzip the downloaded folder and copy its contents to the **m121** directory.

* Load **validateLab1.js** into **mongo** shell

```javascript
load('validateLab1.js')
```

* And run the **validateLab1** validation method

```javascript
validateLab1(pipeline)
```

What is the answer?

#### Answer 1

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> var pipeline = [{ 
...     $match: {
...         "imdb.rating" : { "$gte": 7},
...         "genres" : { "$nin": ["Crime", "Horror"] },
...         "rated" : { "$in": ["PG", "G"] },
...         "$and" : [ { "languages": "English"}, {"languages": "Japanese" } ]
...     } 
... } ]
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate(pipeline).itcount()
23
MongoDB Enterprise Cluster0-shard-0:PRIMARY> load("/home/mukhtar/Documents/validateLab1.js")
true
MongoDB Enterprise Cluster0-shard-0:PRIMARY> validateLab1(pipeline)
Answer is 15
```

### Shaping documents with $project

The next stage  we will learn about is *$project*, like *$match*, it is a vital stage to thoroughly understand to be successful with the aggregation framework. Please don't think of *$project* like the *projection* functionality available with the *find()* query operator. While it is true, *$project* is much more. Not only can we selectively remove and retain fields, we can re-assign existing field values and derive entirely new fields.

A common method or function available in many programming languages is *$map*. It is a higher order function that applies some transformation among a collection. If *$match* is like a filter method, *$project* is like *$map*. Here is the basic syntax for *$project*.

```javascript
db.solarSystem.aggregate([{ "$project": {...} }])
```

We append a *$* sign to signify that it is an *aggregation* operator, then open up with a curly brace and close with a curly brace. Between the two braces is where we use *aggregation* expressions and perform field logic. More on that soon. Here is how we'd specify values to remove and retain, just like the *projection* functionality available with the *find* query operator.

```javascript
// project ``name`` and remove ``_id``
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{ "$project": { _id: 0, name: 1 } }])
{ "name" : "Earth" }
{ "name" : "Neptune" }
{ "name" : "Uranus" }
{ "name" : "Saturn" }
{ "name" : "Jupiter" }
{ "name" : "Venus" }
{ "name" : "Mercury" }
{ "name" : "Sun" }
{ "name" : "Mars" }
```

This specifies that we wish to remove the *_id* and retain the *name* field. Notice that since we have specified a value to retain, we must specify each value we wish to retain. Let's also keep the *gravity* field so we can see some difference in real data.

```javascript
// project ``name`` and ``gravity`` fields, including default ``_id``
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{ "$project": { name: 1, gravity: 1 } }])
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d54"), "name" : "Earth", "gravity" : { "value" : 9.8, "units" : "m/s^2" } }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d59"), "name" : "Neptune", "gravity" : { "value" : 11.15, "units" : "m/s^2" } }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d58"), "name" : "Uranus", "gravity" : { "value" : 8.87, "units" : "m/s^2" } }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d57"), "name" : "Saturn", "gravity" : { "value" : 10.44, "units" : "m/s^2" } }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d56"), "name" : "Jupiter", "gravity" : { "value" : 24.79, "units" : "m/s^2" } }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d53"), "name" : "Venus", "gravity" : { "value" : 8.87, "units" : "m/s^2" } }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d52"), "name" : "Mercury", "gravity" : { "value" : 3.24, "units" : "m/s^2" } }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d51"), "name" : "Sun", "gravity" : { "value" : 274, "units" : "m/s^2" } }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d55"), "name" : "Mars", "gravity" : { "value" : 3.71, "units" : "m/s^2" } }
```

And ofcourse, an exception. Here we can say we're getting *name* and the *gravity* field, but we're also getting the *_id* field. The *_id* is the only field that we must explicitly remove. All others will be removed when we specify at least one field to retain. Also, it looks like who ever puts this data together used the international system of units, so let's also just get the value.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{ "$project": { _id: 0, name: 1, gravity.value: 1 } }])
uncaught exception: SyntaxError: missing : after property id :
@(shell):1:66
```

An error. One thing to keep in mind, once we start diving into documents selecting on subfields, we must surround our arguments with quotes.

```javascript
// using dot-notation to express the projection fields
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{ "$project": { _id: 0, name: 1, "gravity.value": 1 } }])
{ "name" : "Earth", "gravity" : { "value" : 9.8 } }
{ "name" : "Neptune", "gravity" : { "value" : 11.15 } }
{ "name" : "Uranus", "gravity" : { "value" : 8.87 } }
{ "name" : "Saturn", "gravity" : { "value" : 10.44 } }
{ "name" : "Jupiter", "gravity" : { "value" : 24.79 } }
{ "name" : "Venus", "gravity" : { "value" : 8.87 } }
{ "name" : "Mercury", "gravity" : { "value" : 3.24 } }
{ "name" : "Sun", "gravity" : { "value" : 274 } }
{ "name" : "Mars", "gravity" : { "value" : 3.71 } }
```

There, the data we wanted. *$project* is already showing to be pretty useful, but so far it appears to be identical to *projection* available with the *find* query operator. Let's start exploring what makes *$project* so powerful. Instead of just returning a subdocument with just the value field, let's directly assign the value to the *gravity* field.

```javascript
// reassing ``gravity`` field with value from ``gravity.value`` embeded field
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{ "$project": { _id: 0, name: 1, gravity: "$gravity.value" } }])
{ "name" : "Earth", "gravity" : 9.8 }
{ "name" : "Neptune", "gravity" : 11.15 }
{ "name" : "Uranus", "gravity" : 8.87 }
{ "name" : "Saturn", "gravity" : 10.44 }
{ "name" : "Jupiter", "gravity" : 24.79 }
{ "name" : "Venus", "gravity" : 8.87 }
{ "name" : "Mercury", "gravity" : 3.24 }
{ "name" : "Sun", "gravity" : 274 }
{ "name" : "Mars", "gravity" : 3.71 }
```

Here, we can see that we are indeed reassigning the gravity field to now contain the information that was available at *gravity.value*. We're prepending *gravity.value* with a dollar sign. This is one of the many *aggregation expressions*, and we're directing the *aggregation framework* to look for and fetch the information in the document at *gravity.value*, or a *field path expression*.

As discussed in the *aggregation structure and syntax* lesson, this is one of the ways we reference documents for information. We can also create a new field called *surfaceGravity*. This isn't just renaming the *gravity* field. It's creating an entirely new field. Very powerful. And we'll be using this functionality a lot through the course.

```javascript
// creating a document new field ``surfaceGravity``
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "surfaceGravity": "$gravity.value" }}])
{ "name" : "Earth", "surfaceGravity" : 9.8 }
{ "name" : "Neptune", "surfaceGravity" : 11.15 }
{ "name" : "Uranus", "surfaceGravity" : 8.87 }
{ "name" : "Saturn", "surfaceGravity" : 10.44 }
{ "name" : "Jupiter", "surfaceGravity" : 24.79 }
{ "name" : "Venus", "surfaceGravity" : 8.87 }
{ "name" : "Mercury", "surfaceGravity" : 3.24 }
{ "name" : "Sun", "surfaceGravity" : 274 }
{ "name" : "Mars", "surfaceGravity" : 3.71 }
```

Let's have a bit of fun and use the *aggregation* framework to calculate a value. I'd like to see what my weight would be on each main body in the solar system. I'm going to hava to use an expression to accomplish this.

```javascript
{ $multiply: [ gravityRatio, weightOnEarth ] }
```

We'll cover *expresions* in much greater detail shortly, but I'm going to break this down since this is our first time of seeing it, and the syntax can catch people off guard. I weigh about *86* kilograms. Looking at the previous results, it looks like I devide the gravity of a body by the gravity of Earth and then multiply that value by my weight, I can find out how much I'd weigh on every main body.

I'm going to have to use an expression to accomplish this. The first expression I'm going to use is the *$multiply* arithmetic expression. *$multiply* takes an array of values and multiplies them together. So I know, I need to multiply my weight times the ratio of a specific planet's gravity divided by the Earth's gravity. That will look something like this.

```javascript
{ $multiply: [ gravityRatio, 86] }
```

I know my weight is about *86* kilograms, so I can just hard code that for now. To calculate the gravity ratio, I 'll need to use the *$divide* arithmetic expression.

```javascript
{ $divide: [ "gravity.value", gravityOfEarth ] }
```

*$divide* takes an array of two values and divides the fisrt by the second. Within *$devide*, I 'll need to reference the information at the value subfeild within gravity. Let's see what this will look like.

```javascript
{ $divide: [ "gravity.value", 9.8 ] }
```

Here we're using a field path expression to refer to information within the document, specifically the information found at the value field within the gravity field. I know the gravity of Earth is around *9.8* meters per second-per second, so I'll just hard code that in. So putting it all together, we have the following.

```javascript
// creating a new field ``myWeight`` using expressions
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "myWeight": { "$multiply": [ { "$divide": [ "$gravity.value", 9.8 ] }, 86 ] } }}]);
```

All of this is assigned to a new field we create called *myWeight*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "myWeight": { "$multiply": [ { "$divide": [ "$gravity.value", 9.8 ] }, 86 ] } }}])
{ "name" : "Earth", "myWeight" : 86 }
{ "name" : "Neptune", "myWeight" : 97.8469387755102 }
{ "name" : "Uranus", "myWeight" : 77.83877551020407 }
{ "name" : "Saturn", "myWeight" : 91.61632653061224 }
{ "name" : "Jupiter", "myWeight" : 217.54489795918363 }
{ "name" : "Venus", "myWeight" : 77.83877551020407 }
{ "name" : "Mercury", "myWeight" : 28.432653061224492 }
{ "name" : "Sun", "myWeight" : 2404.4897959183672 }
{ "name" : "Mars", "myWeight" : 32.55714285714286 }
```

Awesome. We can see I'd weigh about *32.5* kilograms on *Mars* and *2404* kilograms on the *Sun*. We're begining to see the power of *$project*. *$project* is a powerful stage of the *aggregation framework*. Not only can we remove and retain fields, we can derive new fields and reassign existing fields. *$project* may be used as many times as desired within the *aggregation pipeline*, and it should be used aggressively to trim data out of documents, that isn't required, in order to keep our *pipelines* performant.

Some key things to remember.

* Once we specify one field to retain, we must specify all fields we want to retain. *_id* field is the exception to this.
* Beyond simple removing and retaining fields, *$project* let us add new fields.
* *$project* can be used as many times as required within an *aggregation pipeline*.
* And finally, *$project* can be used to reassign values to existing field names and to derive entirely new fields.

### Lab - Changing Document Shape with $project

#### Problem 2

Our first movie night was a success. Unfortunately, our ISP called to let us know we're close to our bandwidth quota, but we need another movie recommendation!

Using the same *$match* stage from the previous lab, add a *$project* stage to only display the title and film rating (*title* and *rated* fields).

* Assign the results to a variable called *pipeline*.

```javascript
var pipeline = [{ $match: {. . .} }, { $project: { . . . } }]
```

* Load *validateLab2.js* which was included in the same handout as *validateLab1.js* and execute *validateLab2(pipeline)*?

```javascript
load('./validateLab2.js')
```

* And run the *validateLab2* validation method

```javascript
validateLab2(pipeline)
```

What is the answer?

#### Answer 2

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> var pipeline = [{ 
...     $match: {
...         "imdb.rating" : { "$gte": 7},
...         "genres" : { "$nin": ["Crime", "Horror"] },
...         "rated" : { "$in": ["PG", "G"] },
...         "$and" : [ { "languages": "English"}, {"languages": "Japanese" } ]
...     } 
... }, { $project: { "_id": 0, "title" : 1, "rated" : 1 } }]
MongoDB Enterprise Cluster0-shard-0:PRIMARY> load("/home/mukhtar/Documents/validateLab2.js")
true
MongoDB Enterprise Cluster0-shard-0:PRIMARY> validateLab2(pipeline)
Answer is 15
```

### Lab - Computing Fields

#### Problem 3

Our movies dataset has a lot of different documents, some with more convoluted titles than others. If we'd like to analyze our collection to find movie titles that are composed of only one word, we *could* fetch all the movies in the dataset and do some processing in a client application, but the Aggregation Framework allows us to do this on the server!

Using the Aggregation Framework, find a count of the number of movies that have a title composed of one word. To clarify, "Cinderella" and "3-25" should count, where as "Cast Away" would not.

To get the count, you can append itcount() to the end of your pipeline

```javascript
db.movies.aggregate([...]).itcount()
```

#### Answer 3

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> var pipeline = [
... { $project : 
...         { "titleWords" : 
...     { $size : 
...     { $split : [ "$title" , " " ] }
... } 
... }
... },
...     { $match : { "titleWords" : 1 } }
... ];
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate(pipeline).itcount();
8066
```

### Optional Lab - Expressions with $project

This lab will have you work with data within arrays, a common operation.

Specifically, one of the arrays you'll work with is *writers*, from the *movies* collection.

There are times when we want to make sure that the field is an array, and that it is not empty. We can do this within *$match*.

```javascript
{ $match: { writers: { $elemMatch: { $exists: true } } }
```

However, the entries within *writers* presents another problem. A good amount of entries in *writers* look something like the following, where the writer is attributed with their specific contribution.

```javascript
"writers" : [ "Vincenzo Cerami (story)", "Roberto Benigni (story)" ]
```

But the writer also appears in the *cast* array as "Roberto Benigni"!

Give it a look with the following query.

```javascript
db.movies.findOne({title: "Life Is Beautiful"}, { _id: 0, cast: 1, writers: 1})
```

This presents a problem, since comparing "*Roberto Benigni*" to "*Roberto Benigni (story)*" will definitely result in a difference.

Thankfully there is a powerful expression to help us, *$map*. *$map* lets us iterate over an array, element by element, performing some transformation on each element. The result of that transformation will be returned in the same place as the original element.

Within *$map*, the argument to *input* can be any expression as long as it resolves to an array. The argument to *as* is the name of the variable we want to use to refer to each element of the array when performing whatever logic we want. The field *as* is optional, and if omitted each element must be referred to as *$$this*:: The argument to *in* is the expression that is applied to each element of the *input* array, referenced with the variable name specified in *as*, and prepending two dollar signs:

```javascript
writers: {
  $map: {
    input: "$writers",
    as: "writer",
    in: "$$writer"
  }
}
```

*in* is where the work is performed. Here, we use the *$arrayElemAt* expression, which takes two arguments, the array and the index of the element we want. We use the *$split* expression, splitting the values on *" ("*.

If the string did not contain the pattern specified, the only modification is it is wrapped in an array, so *$arrayElemAt* will always work

```javascript
writers: {
  $map: {
    input: "$writers",
    as: "writer",
    in: {
      $arrayElemAt: [
        {
          $split: [ "$$writer", " (" ]
        },
        0
      ]
    }
  }
}
```

#### Problem 4

Let's find how many movies in our *movies* collection are a "labor of love", where the same person appears in *cast, directors, and writers*.

*Hint*: You will need to use *$setIntersection* operator in the aggregation pipeline to find out the result.

Note that your dataset may have duplicate entries for some films. You do not need to count the duplicate entries.

To get a count after you have defined your pipeline, there are two simple methods.

```javascript
// add the $count stage to the end of your pipeline
// you will learn about this stage shortly!
db.movies.aggregate([
  {$stage1},
  {$stage2},
  {...$stageN},
  { $count: "labors of love" }
])

// or use itcount()
db.movies.aggregate([
  {$stage1},
  {$stage2},
  {...$stageN}
]).itcount()
```

How many movies are "labors of love"?

#### Answer4

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> var pipeline = [
... { $match: { 
...     "writers" : { $elemMatch: { $exists: true } }, 
... "cast" : { $elemMatch: { $exists: true } },
... "directors" : { $elemMatch: { $exists: true } } 
... }
... },
... { $project : {
...     "writers" : {
...     $map : { 
... input: "$writers",
...                 as: "writer",
...                 in: { 
...     $arrayElemAt: [
...     { $split: [ "$$writer", " (" ] },
...                         0
...                     ]}
... }
...         },
... "cast" : 1,
...     "directors" : 1 
... }
... },
... { $project: 
...     { "laborOfLove": { $gt: [ { $size: { $setIntersection: ["$writers", "$cast", "$directors"] } }, 0 ] } }
... },
...     { $match : { "laborOfLove" : true } }
... ];
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate(pipeline).itcount();
1596
```

## Chapter 2: Basic Aggregation - Utility Stages

### $addFields and how it is similar to $project

Let's now discuss another transformative stage, *$addFields*. *$addFields* is extremely similar to *$project*, with one key difference. As the name applies, *$addFields* adds fields to a document. While with *$project*, we can selectively remove and retain fields, *$addFields* only allows you to modify the incoming pipeline documents with new computed fields or to modify existing fields.

Oftentimes, we will want to derive a new field or change existing fields, and the requirement in *$project* that once we perform a transformation or retain a field then we must specify all fields we wish to retain can become tedious. Let's look at an example. First, we'll look at *$project*. Let's just extract the data from the *gravity.value* field and reassign it to the top level, *gravity* field.

```javascript
// reassign ``gravity`` field value
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{"$project": { "gravity": "$gravity.value" } }]).pretty();
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d54"), "gravity" : 9.8 }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d59"), "gravity" : 11.15 }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d58"), "gravity" : 8.87 }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d57"), "gravity" : 10.44 }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d56"), "gravity" : 24.79 }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d53"), "gravity" : 8.87 }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d52"), "gravity" : 3.24 }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d51"), "gravity" : 274 }
{ "_id" : ObjectId("59a06674c8df9f3cd2ee7d55"), "gravity" : 3.71 }
```

As expected, we can get the results back with the *_id* field and the *gravity* field we just calculated. Now let's remove the *_id* field and add the *name* field for easier reference.

```javascript
// adding ``name`` and removing ``_id`` from projection
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "gravity": "$gravity.value" } }]).pretty();
{ "name" : "Earth", "gravity" : 9.8 }
{ "name" : "Neptune", "gravity" : 11.15 }
{ "name" : "Uranus", "gravity" : 8.87 }
{ "name" : "Saturn", "gravity" : 10.44 }
{ "name" : "Jupiter", "gravity" : 24.79 }
{ "name" : "Venus", "gravity" : 8.87 }
{ "name" : "Mercury", "gravity" : 3.24 }
{ "name" : "Sun", "gravity" : 274 }
{ "name" : "Mars", "gravity" : 3.71 }
```

All right, this is pretty good. But what if we also want to keep the *temperature, density, mass, radius, and SMA* fields?

```javascript
// adding more fields to the projected document
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([
... {"$project":{
...     "_id": 0,
...     "name": 1,
...     "gravity": "$gravity.value",
...     "meanTemperature": 1,
...     "density": 1,
...     "mass": "$mass.value",
...     "radius": "$radius.value",
...     "sma": "$sma.value" }
... }]).pretty();
{
        "name" : "Earth",
        "meanTemperature" : 15,
        "gravity" : 9.8,
        "mass" : 5.9723e+24,
        "radius" : 6378.137,
        "sma" : 149600000
    }
    {
        "name" : "Neptune",
        "meanTemperature" : -210,
        "gravity" : 11.15,
        "mass" : 1.02413e+26,
        "radius" : 24765,
        "sma" : 4495060000
    }
    {
        "name" : "Uranus",
        "meanTemperature" : -200,
        "gravity" : 8.87,
        "mass" : 8.6813e+25,
        "radius" : 25559,
        "sma" : 2872460000
    }
    {
        "name" : "Saturn",
        "meanTemperature" : -170,
        "gravity" : 10.44,
        "mass" : 5.6834e+26,
        "radius" : 60268,
        "sma" : 1433530000
    }
    {
        "name" : "Jupiter",
        "meanTemperature" : -150,
        "gravity" : 24.79,
        "mass" : 1.89819e+27,
        "radius" : 71492,
        "sma" : 778570000
    }
    {
        "name" : "Venus",
        "meanTemperature" : 465,
        "gravity" : 8.87,
        "mass" : 4.8675e+24,
        "radius" : 6051.8,
        "sma" : 108210000
    }
    {
        "name" : "Mercury",
        "meanTemperature" : 125,
        "gravity" : 3.24,
        "mass" : 3.3e+23,
        "radius" : 4879,
        "sma" : 57910000
    }
    {
        "name" : "Sun",
        "meanTemperature" : 5600,
        "gravity" : 274,
        "mass" : 1.9885e+30,
        "radius" : 695700,
        "sma" : 0
    }
    {
        "name" : "Mars",
        "meanTemperature" : -53,
        "gravity" : 3.71,
        "mass" : 6.4171e+23,
        "radius" : 3396.2,
        "sma" : 227920000
}
```

As we can see, in order to keep the information we want, we had to be explicit, specifying which fields to retain along with performing our transformations. As said, this can become tedious. In comes *$addFields*. If we substitute *$addFields* for *$project* and execute the following pipeline, we can see that we indeed performed the desired transformations.

```javascript
// using ``$addFields`` to generate the new computed field values
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([
... {"$addFields":{
...     "gravity": "$gravity.value",
...     "mass": "$mass.value",
...     "radius": "$radius.value",
...     "sma": "$sma.value"}
... }]).pretty();
    {
        "_id" : ObjectId("59a06674c8df9f3cd2ee7d54"),
        "name" : "Earth",
        "type" : "Terrestrial planet",
        "orderFromSun" : 3,
        "radius" : 6378.137,
        "mass" : 5.9723e+24,
        "sma" : 149600000,
        "orbitalPeriod" : {
            "value" : 1,
            "units" : "years"
        },
        "eccentricity" : 0.0167,
        "meanOrbitalVelocity" : {
            "value" : 29.78,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 1,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 23.45,
            "units" : "degrees"
        },
        "meanTemperature" : 15,
        "gravity" : 9.8,
        "escapeVelocity" : {
            "value" : 11.18,
            "units" : "km/sec"
        },
        "meanDensity" : 5.52,
        "atmosphericComposition" : "N2+O2",
        "numberOfMoons" : 1,
        "hasRings" : false,
        "hasMagneticField" : true
    }
    {
        "_id" : ObjectId("59a06674c8df9f3cd2ee7d59"),
        "name" : "Neptune",
        "type" : "Gas giant",
        "orderFromSun" : 8,
        "radius" : 24765,
        "mass" : 1.02413e+26,
        "sma" : 4495060000,
        "orbitalPeriod" : {
            "value" : 164.79,
            "units" : "years"
        },
        "eccentricity" : 0.0113,
        "meanOrbitalVelocity" : {
            "value" : 5.43,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 0.72,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 28.8,
            "units" : "degrees"
        },
        "meanTemperature" : -210,
        "gravity" : 11.15,
        "escapeVelocity" : {
            "value" : 23.5,
            "units" : "km/sec"
        },
        "meanDensity" : 1.638,
        "atmosphericComposition" : "H2+He",
        "numberOfMoons" : 14,
        "hasRings" : true,
        "hasMagneticField" : true
    }
    {
        "_id" : ObjectId("59a06674c8df9f3cd2ee7d58"),
        "name" : "Uranus",
        "type" : "Gas giant",
        "orderFromSun" : 7,
        "radius" : 25559,
        "mass" : 8.6813e+25,
        "sma" : 2872460000,
        "orbitalPeriod" : {
            "value" : 84.01,
            "units" : "years"
        },
        "eccentricity" : 0.0457,
        "meanOrbitalVelocity" : {
            "value" : 6.8,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 0.72,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 97.77,
            "units" : "degrees"
        },
        "meanTemperature" : -200,
        "gravity" : 8.87,
        "escapeVelocity" : {
            "value" : 21.3,
            "units" : "km/sec"
        },
        "meanDensity" : 1.271,
        "atmosphericComposition" : "H2+He",
        "numberOfMoons" : 27,
        "hasRings" : true,
        "hasMagneticField" : true
    }
    {
        "_id" : ObjectId("59a06674c8df9f3cd2ee7d57"),
        "name" : "Saturn",
        "type" : "Gas giant",
        "orderFromSun" : 6,
        "radius" : 60268,
        "mass" : 5.6834e+26,
        "sma" : 1433530000,
        "orbitalPeriod" : {
            "value" : 29.457,
            "units" : "years"
        },
        "eccentricity" : 0.0566,
        "meanOrbitalVelocity" : {
            "value" : 9.68,
            "units" : "km/sec"
        },
        "rotationPeriod" : {
            "value" : 0.445,
            "units" : "days"
        },
        "inclinationOfAxis" : {
            "value" : 26.73,
            "units" : "degrees"
        },
        "meanTemperature" : -170,
        "gravity" : 10.44,
        "escapeVelocity" : {
            "value" : 35.5,
            "units" : "km/sec"
        },
        "meanDensity" : 0.687,
        "atmosphericComposition" : "H2+He",
        "numberOfMoons" : 62,
        "hasRings" : true,
        "hasMagneticField" : true
    }

```

However, we do not remove any fields from the original document. Instead, we append new transformation fields to the document. OK. One last example. By combining *$project* with *$addFields*, we remove the annoyance of explicitly needing to remove or retain fields. In this example, with *$project*, we are selecting the fields that we wish to retain, and in *$addFields*, we are performing our transformation on those pre-selected fields.

There is no need to go one by one and remove or retain fields while performing our transformations. This is a style choice and can prevent having to repeatedly specify which fields to retain in larger pipelines when performing many various calculations. Let's see it in action. As we can see, we will retain the specified fields and perform the specified transformation.

```javascript
// combining ``$project`` with ``$addFields``
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([
... {"$project": {
...     "_id": 0,
...     "name": 1,
...     "gravity": 1,
...     "mass": 1,
...     "radius": 1,
...     "sma": 1}
... },
... {"$addFields": {
...     "gravity": "$gravity.value",
...     "mass": "$mass.value",
...     "radius": "$radius.value",
...     "sma": "$sma.value"
... }}]).pretty();
    {
        "name" : "Earth",
        "radius" : 6378.137,
        "mass" : 5.9723e+24,
        "sma" : 149600000,
        "gravity" : 9.8
    }
    {
        "name" : "Neptune",
        "radius" : 24765,
        "mass" : 1.02413e+26,
        "sma" : 4495060000,
        "gravity" : 11.15
    }
    {
        "name" : "Uranus",
        "radius" : 25559,
        "mass" : 8.6813e+25,
        "sma" : 2872460000,
        "gravity" : 8.87
    }
    {
        "name" : "Saturn",
        "radius" : 60268,
        "mass" : 5.6834e+26,
        "sma" : 1433530000,
        "gravity" : 10.44
    }
    {
        "name" : "Jupiter",
        "radius" : 71492,
        "mass" : 1.89819e+27,
        "sma" : 778570000,
        "gravity" : 24.79
    }
    {
        "name" : "Venus",
        "radius" : 6051.8,
        "mass" : 4.8675e+24,
        "sma" : 108210000,
        "gravity" : 8.87
    }
    {
        "name" : "Mercury",
        "radius" : 4879,
        "mass" : 3.3e+23,
        "sma" : 57910000,
        "gravity" : 3.24
    }
    {
        "name" : "Sun",
        "radius" : 695700,
        "mass" : 1.9885e+30,
        "sma" : 0,
        "gravity" : 274
    }
    {
        "name" : "Mars",
        "radius" : 3396.2,
        "mass" : 6.4171e+23,
        "sma" : 227920000,
        "gravity" : 3.71
    }
```

### geoNear Stage

Let's take a break from transformation for a moment and discuss a useful utility stage if we work would *GeoJSON* data -- *$geoNear*. *$geoNear* is the aggregation framework solution to performing *geoqueries* within the aggregation pipeline. Within a pipeline, *$geoNear* must be the first stage in a pipeline. Also of note, we cannot use the $near predicate in the query field, though it wouldn't really make much sense to do so.

So if we already have *$near* operator available for *find* operations, why do we need an aggregation stage like *$geoNear*? *$geoNear* can be used on *charted* collections, whereas *$near* can't. Additionally, any query using *$near* cannot use other special indexes, like *$text*, for example. One last thing, *$geoNear* requires that the collection we're performing our aggregations on to have one and only one *geoindex*.

```javascript
$geoNear: {
    near: <required, the location to search near>,
    distaceField: <required, field to insert in returned documents>,
    minDistance: <optional, in meters>,
    maxDistance: <optional, in meters>,
    query: <optional, allows querying source documents>,
    includeLocs: <optional, used to identify which location was used>,
    limit: <optional, the maximum number of documents to return>,
    num: <optional, same as limit>,
    spherical: <required, required to signal whether using a 2dsphere index>,
    distanceMultiplier: <optional,the factor to multiply all distance>
}
```

Here is the structuring arguments for *$geoNear*. As we can see, it can take a lot of arguments, though only if you're required. Required arguments are *near, distanceField, and spherical*. *Near* is the point we'd like to search near. Results will be ordered from closest to farthest from this location. *distanceField* is the argument we supply that will be inserted into returned documents, giving us the distance from location to the location we specified in near.

*Spherical* is the last required argument. Specify true if the index is a *2dsphere*, otherwise false. During this lesson, we'll be using a *2dsphere* index. Let's go ahead and execute a *$geoNear* aggregation. I'm going to search for locations near the *MongoDB* headquarters in New York City.

```javascript
// using ``$geoNear`` stage
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.nycFacilities.aggregate([
...   {
...     "$geoNear": {
...       "near": {
...         "type": "Point",
...         "coordinates": [-73.98769766092299, 40.757345233626594]
...       },
...       "distanceField": "distanceFromMongoDB",
...       "spherical": true
...     }
...   }
... ]).pretty();
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef39f9a"),
        "name" : "Advance Parking LLC",
        "address" : {
            "number" : "249",
            "street" : "West   43 Street",
            "city" : "New York",
            "zipcode" : "10036"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.988248,
                40.757715
            ]
        },
        "domain" : "Core Infrastructure and Transportation",
        "group" : "Transportation",
        "specialty" : "Parking Lots and Garages",
        "type" : "Commercial Garage",
        "distanceFromMongoDB" : 62.03048232300762
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef38b72"),
        "name" : "Lubovitch Dance Foundation, Inc.",
        "address" : {
            "number" : "229",
            "street" : "West   42 Street",
            "city" : "New York",
            "zipcode" : "10036"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.988077,
                40.756827
            ]
        },
        "domain" : "Libraries and Cultural Programs",
        "group" : "Cultural Institutions",
        "specialty" : "Other Cultural Institutions",
        "type" : "Dance",
        "distanceFromMongoDB" : 65.96356009175788
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3a32b"),
        "name" : "Threshold Dance Projects, Inc.",
        "address" : {
            "number" : "229",
            "street" : "West   42 Street",
            "city" : "New York",
            "zipcode" : "10036"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.988077,
                40.756827
            ]
        },
        "domain" : "Libraries and Cultural Programs",
        "group" : "Cultural Institutions",
        "specialty" : "Other Cultural Institutions",
        "type" : "Dance",
        "distanceFromMongoDB" : 65.96356009175788
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3c3da"),
        "name" : "Parsons Dance Foundation",
        "address" : {
            "number" : "229",
            "street" : "West   42 Street",
            "city" : "New York",
            "zipcode" : "10036"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.988077,
                40.756827
            ]
        },
        "domain" : "Libraries and Cultural Programs",
        "group" : "Cultural Institutions",
        "specialty" : "Other Cultural Institutions",
        "type" : "Dance",
        "distanceFromMongoDB" : 65.96356009175788
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3e222"),
        "name" : "New 42nd Street, Inc.",
        "address" : {
            "number" : "229",
            "street" : "West   42 Street",
            "city" : "New York",
            "zipcode" : "10036"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.988077,
                40.756827
            ]
        },
        "domain" : "Libraries and Cultural Programs",
        "group" : "Cultural Institutions",
        "specialty" : "Other Cultural Institutions",
        "type" : "Theater",
        "distanceFromMongoDB" : 65.96356009175788
    }
Type "it" for more
```

Here I've specified my three required arguments -- *near, distanceField, and spherical*. Well, we got a ton of results, so we can see it works. However, it's not very useful in its current state. Let's look at those optional arguments in greater detail to learn how to make this aggregation much more targeted. *minDistance and maxDistance* specify the closest and furthest results we want. Query allows us to specify conditions that each document must meet, and uses the same query operator syntax as match.

*includeLocs* would allow us to show what location was used in the document if it has more than one location. For our dataset, this isn't necessary, as each document only has one location. And remember, *$geoNear* requires that we have exactly one *2dsphere* index in the collection. *Limit and num* are functionally identical and are used to limit the number of documents returned.

Lastly, *distanceMultiplier* is used to convert distance results from radians into whatever unit we need, should we be using legacy geospatial data. So let's clean up our aggregation and fetch useful results. I'd like to find the *five* nearest hospitals to the *MongoDB* headquarters. Here I've added the optional *query* field and specified that it should be *type "Hospital"*. And here I've added the optional *limit* field and specified it as *5*. Much better.

```javascript
// include ``limit`` to results
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.nycFacilities.aggregate([{
...   $geoNear: {
...     near: {
...       type: "Point",
...         coordinates: [-73.98769766092299, 40.757345233626594]
...       },
...       distanceField: "distanceFromMongoDB",
...       spherical: true,
...       query: { type: "Hospital" },
...     }
...   },
...   { $limit: 5 }
... ]).pretty();
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef39c74"),
        "name" : "Mount Sinai West",
        "address" : {
            "number" : "1000",
            "street" : "10 Avenue",
            "city" : "New York",
            "zipcode" : "10019"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.986799,
                40.769664
            ]
        },
        "domain" : "Health and Human Services",
        "group" : "Health Care",
        "specialty" : "Hospitals and Clinics",
        "type" : "Hospital",
        "distanceFromMongoDB" : 1373.402525696724
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef37254"),
        "name" : "NYU Hospitals Center",
        "address" : {
            "number" : "550",
            "street" : "1 Avenue",
            "city" : "New York",
            "zipcode" : "10016"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.973621,
                40.741474
            ]
        },
        "domain" : "Health and Human Services",
        "group" : "Health Care",
        "specialty" : "Hospitals and Clinics",
        "type" : "Hospital",
        "distanceFromMongoDB" : 2128.5451518719083
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3cbd8"),
        "name" : "Bellevue Hospital Center",
        "address" : {
            "number" : "462",
            "street" : "1 Avenue",
            "city" : "New York",
            "zipcode" : "10016"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.975119,
                40.739106
            ]
        },
        "domain" : "Health and Human Services",
        "group" : "Health Care",
        "specialty" : "Hospitals and Clinics",
        "type" : "Hospital",
        "distanceFromMongoDB" : 2290.787247189754
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef362b6"),
        "name" : "Belvue Hosp Ctr/CUNY/Ocme/Ems",
        "address" : {
            "number" : "430",
            "street" : "1 Avenue",
            "city" : "New York",
            "zipcode" : "10016"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.975927,
                40.737953
            ]
        },
        "domain" : "Health and Human Services",
        "group" : "Health Care",
        "specialty" : "Hospitals and Clinics",
        "type" : "Hospital",
        "distanceFromMongoDB" : 2376.0197324860424
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3ca8d"),
        "name" : "Belvue Hosp Ctr/CUNY/Ocme/Ems",
        "address" : {
            "number" : "430",
            "street" : "1 Avenue",
            "city" : "New York",
            "zipcode" : "10016"
        },
        "borough" : "Manhattan",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.975927,
                40.737953
            ]
        },
        "domain" : "Health and Human Services",
        "group" : "Health Care",
        "specialty" : "Hospitals and Clinics",
        "type" : "Hospital",
        "distanceFromMongoDB" : 2376.0197324860424
    }
```

We got the *five* nearest places that matched hospital. And we could see that our distance is in meters. And that's it for *$geoNear*. There's just a few things to remember. The collection can have one and only one *2dsphere* index. If using *2dsphere*, the distance is returned in meters. If using *legacy* coordinates, the distance is returned in radians. > And *$geoNear* must be the first stage in an aggregation pipeline.

### Cursor-like stages: Part 1

It is time we discuss some useful utility stages, what we call *cursor-like* stages. These stages are *sort, skip, limit, and counts*. And they have an equivalent in our query language as a *cursor* method. Let's have a look. After connecting to my aggregations database, I can express this simple query on *solarSystem*, where I am going to find all my documents. This is a full collection scan. And only projecting out the *name*, *number of Moons*, and keeping out the *_id*.

```javascript
// project fields ``numberOfMoons`` and ``name``
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.find({}, {"_id": 0, "name": 1, "numberOfMoons": 1}).pretty();
{ "name" : "Earth", "numberOfMoons" : 1 }
{ "name" : "Neptune", "numberOfMoons" : 14 }
{ "name" : "Uranus", "numberOfMoons" : 27 }
{ "name" : "Saturn", "numberOfMoons" : 62 }
{ "name" : "Jupiter", "numberOfMoons" : 67 }
{ "name" : "Venus", "numberOfMoons" : 0 }
{ "name" : "Mercury", "numberOfMoons" : 0 }
{ "name" : "Sun", "numberOfMoons" : 0 }
{ "name" : "Mars", "numberOfMoons" : 2 }
```

If I do this, I can see all the results of my collection, only exposing the *name*, *number of Moons* per each one of the documents. Sweet, this works well. The other thing I can do is basically call *count*. Now this will count the full amount of documents returned by the query.

```javascript
// count the number of documents
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.find({}, {"_id": 0, "name": 1, "numberOfMoons": 1}).count();
9
```

Here, I can see that I have on my *solar system* **nine** documents. Another thing that I can do is basically *skip* five documents.

```javascript
// skip documents
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.find({}, {"_id": 0, "name": 1, "numberOfMoons": 1}).skip(5).pretty();
{ "name" : "Venus", "numberOfMoons" : 0 }
{ "name" : "Mercury", "numberOfMoons" : 0 }
{ "name" : "Sun", "numberOfMoons" : 0 }
{ "name" : "Mars", "numberOfMoons" : 2 }
```

And if I execute this query, I can see that it skipped a few first documents. Now if you are wondering why did I get this order, why did I skip those previous five documents and not others. If I do not specify a *sorting* operation or a sorting of my *cursor*, I will get from *MongoDB* the order by which the documents are inserted in the collection, what we call the *natural order* of the collection. So in this case, I'm going to *skip* the five first elements that have been inserted into this collection.

```javascript
// limit documents
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.find({}, {"_id": 0, "name": 1, "numberOfMoons": 1}).limit(5).pretty();
{ "name" : "Earth", "numberOfMoons" : 1 }
{ "name" : "Neptune", "numberOfMoons" : 14 }
{ "name" : "Uranus", "numberOfMoons" : 27 }
{ "name" : "Saturn", "numberOfMoons" : 62 }
{ "name" : "Jupiter", "numberOfMoons" : 67 }
```

The following method will be *limit*, where I can specify the number of documents that I'm going to return. And again, following the exactly same sorting order, which in this case, is going to be my natural insert sorting order on our solar system collection. I'll get the *Sun, Mercury, Venus, Earth, and Mars*, which are the five first documents of my collection.

And lastly, I can also specify a *sort* for the result set of my collection. Here, I'm going to find everything. But instead of giving back the order by which documents are inserted in the collection, I'm going to sort the result set based on the *number of Moons* that each one of these documents contain. *Minus 1* specifies the order. And in this case, it will be descending.

```javascript
// sort documents
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.find({}, { "_id": 0, "name": 1, "numberOfMoons": 1 }).sort( {"numberOfMoons": -1 } ).pretty();
{ "name" : "Jupiter", "numberOfMoons" : 67 }
{ "name" : "Saturn", "numberOfMoons" : 62 }
{ "name" : "Uranus", "numberOfMoons" : 27 }
{ "name" : "Neptune", "numberOfMoons" : 14 }
{ "name" : "Mars", "numberOfMoons" : 2 }
{ "name" : "Earth", "numberOfMoons" : 1 }
{ "name" : "Venus", "numberOfMoons" : 0 }
{ "name" : "Mercury", "numberOfMoons" : 0 }
{ "name" : "Sun", "numberOfMoons" : 0 }
```

So as we can see, we are going to get, first, the ones that have *more Moons* to the ones that have *less Moons*. Now we've seen the *cursor* methods, but we also have stages that execute exactly the same kind of functionality. We have *$limit, $skip, $count, and $sort*.

```javascript
$limit: { <integer> }

$skip: { <integer> }

$count: { <name we want the count called> }

$sort: { <field we want to sort on>: <integer, direction to sort> }
```

They will vary a little bit on the syntax, where *limit* will take an integer, *skip* will take also an integer, specifying the number of *limit* documents and the number of *skip* documents. *Count*, on the other hand, we will need to specify a field where we want to collect the *count* value. And *sort*, we need to specify the *keys* and the order by which we want our result sets of the pipeline to be sorted.

Let's see some of this in action. Now to mimic exactly the same operation as before in our *find* command, I'm going to execute the *project* of *name* and *number of Moons*, excluding *_id*, exactly the same operation as before. And in this case, given the pipeline that I'm executing and given the documents that this aggregation pipeline will provide, I will add a *limit* stage to my pipe, saying, I only want the *first five* documents coming from this project stage. And as expected, I get the same results as I would if I would limit on a *find* operation.

```javascript
// ``$limit`` stage
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
...   "$project": {
...     "_id": 0,
...     "name": 1,
...     "numberOfMoons": 1
...   }
... },
... { "$limit": 5  }]).pretty();
{ "name" : "Earth", "numberOfMoons" : 1 }
{ "name" : "Neptune", "numberOfMoons" : 14 }
{ "name" : "Uranus", "numberOfMoons" : 27 }
{ "name" : "Saturn", "numberOfMoons" : 62 }
{ "name" : "Jupiter", "numberOfMoons" : 67 }
```

The following stage will be *skip*. And again, given the results incoming from the *project* stage, I will *skip* only one. In this case, I'm going to *skip* the *Earth*. So how do I know that I'm going to *skip* the *Earth*? Well basically, the order by which I'm going to get the results into the *project* is the natural order, exactly in the same way as we've seen before. The *project* will filter out only the fields that I'm interested on and pass along that to the *skip* stage. *Skip*, by skipping up one, I'm going to be skipping the *Earth*. As you can see here, all different *celestial* bodies will be reported back in my results, except for the *Earth*, which is the *first* element, the one that I'm skipping in the pipeline.

```javascript
// ``skip`` stage
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
...   "$project": {
...     "_id": 0,
...     "name": 1,
...     "numberOfMoons": 1
...   }
... }, {
...   "$skip": 1
... }]).pretty();
{ "name" : "Neptune", "numberOfMoons" : 14 }
{ "name" : "Uranus", "numberOfMoons" : 27 }
{ "name" : "Saturn", "numberOfMoons" : 62 }
{ "name" : "Jupiter", "numberOfMoons" : 67 }
{ "name" : "Venus", "numberOfMoons" : 0 }
{ "name" : "Mercury", "numberOfMoons" : 0 }
{ "name" : "Sun", "numberOfMoons" : 0 }
{ "name" : "Mars", "numberOfMoons" : 2 }
```

### Cursor-like stages: Part 2

We also have our *count* stage. The *count* stage counts all incoming documents. The argument to *count* is the field name on which we are going to collect that *count* value. In a document of the results. In this case, I'm going to filter our collection so we only look at documents that are in *terrestrial planets*. Here we are specifying that match where the type of the document will have the value *terrestrial planet*.

Then, from there results from *match* which are then dispatched to the *project* stage, I'm going to filter only *name* and *number of moons*, removing *ID*, as we've done before. And from all of the documents coming from the pipeline I'm then going to *count* them. The *count* will give me back a result document, which has a field that I specified here, *terrestrial planets*, which contains the value of number of documents that are of type *terrestrial planets*.

```javascript
// ``$count`` stage
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
...   "$match": {
...     "type": "Terrestrial planet"
...   }
... }, {
...   "$project": {
...     "_id": 0,
...     "name": 1,
...     "numberOfMoons": 1
...   }
... }, {
...   "$count": "terrestrial planets"
... }]).pretty();
{ "terrestrial planets" : 4 }
```

Now for this particular pipeline here, where the end result is going to be the *count* of the number of documents, which have a type of *terrestrial planet*, the *project* stage here is a little bit of an annoyance. It doesn't really interfere with the end result of the pipeline. So if we would just remove it, and we just have a match and then count, we can see that I get exactly the same execution in exactly the same results, having or not a *project* in between the *match* and the *count*.

```javascript
// removing ``$project`` stage since it does not interfere with our count
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
...   "$match": {
...     "type": "Terrestrial planet"
...   }
... }, {
...   "$count": "terrestrial planets"
... }]).pretty();
{ "terrestrial planets" : 4 }
```

Lastly, let's look at the *sort. Sort* needs to be supplied with the field we want to *sort* on. In this case, if I'm going to *project, name, and number of moons*, I can *sort* on the fields that I'm collecting from the incoming pipeline. So in this case, if I want to *sort* on the *number of moons* descending, I'll get the results as expected, where I get the planet which has more *moons* first, and on that order to till ones that have absolutely no *moons* -- like *sun, Mercury, and Venus* -- poor guys.

```javascript
// ``$sort`` stage
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
...   "$project": {
...     "_id": 0,
...     "name": 1,
...     "numberOfMoons": 1
...   }
... }, {
...   "$sort": { "numberOfMoons": -1 }
... }]).pretty();
{ "name" : "Jupiter", "numberOfMoons" : 67 }
{ "name" : "Saturn", "numberOfMoons" : 62 }
{ "name" : "Uranus", "numberOfMoons" : 27 }
{ "name" : "Neptune", "numberOfMoons" : 14 }
{ "name" : "Mars", "numberOfMoons" : 2 }
{ "name" : "Earth", "numberOfMoons" : 1 }
{ "name" : "Venus", "numberOfMoons" : 0 }
{ "name" : "Mercury", "numberOfMoons" : 0 }
{ "name" : "Sun", "numberOfMoons" : 0 }
```

An important aspect to refer to here is that the *sort* stage is not limited to just *one single* field. You will operate on multiple different fields in combination, as we would do in *normal* queries and *find* operations, if you want to *sort* first on one field and then on another, that is totally possible in the aggregation pipeline stage as well. So let's say here, for example, that I have this different *project* where I'm going to *project* as well, apart from *name* and *number of moons*, the field *hasMagneticField*, which is a *boolean* field.

In the *sort* stage, I can specify that I want to *sort* on *hasMagneticField*, descending, and *numberOfMoons* descending. By executing this specific query, we get a very similar result as before, where are we going to have *Jupiter, Saturn, Uranus*, and so on. The only difference is that, for example, *sun and Mercury* will come before *Mars*. So how is that possible? Well, the result is being *sorted* first on the field *hasMagneticField* equals *true*, and then on *numberOfMoons*. So first I'm going to have all the ones that *hasMagneticField* is equal to *true*. And then after that I'm going to *sort* on the *numberOfMoons* for the result set.

```javascript
// sorting on more than one field
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.solarSystem.aggregate([{
...   "$project": {
...     "_id": 0,
...     "name": 1,
...     "hasMagneticField": 1,
...     "numberOfMoons": 1
...   }
... }, {
...   "$sort": { "hasMagneticField": -1, "numberOfMoons": -1 }
... }]).pretty();
{ "name" : "Jupiter", "numberOfMoons" : 67, "hasMagneticField" : true }
{ "name" : "Saturn", "numberOfMoons" : 62, "hasMagneticField" : true }
{ "name" : "Uranus", "numberOfMoons" : 27, "hasMagneticField" : true }
{ "name" : "Neptune", "numberOfMoons" : 14, "hasMagneticField" : true }
{ "name" : "Earth", "numberOfMoons" : 1, "hasMagneticField" : true }
{ "name" : "Mercury", "numberOfMoons" : 0, "hasMagneticField" : true }
{ "name" : "Sun", "numberOfMoons" : 0, "hasMagneticField" : true }
{ "name" : "Mars", "numberOfMoons" : 2, "hasMagneticField" : false }
{ "name" : "Venus", "numberOfMoons" : 0, "hasMagneticField" : false }
```

Now if *sort* is near the beginning of our pipeline, in place before a *project*, and unwinds in the *group* stage, it can take advantage of *indexes*. Otherwise, this *sort* stage will perform an *in-memory sort*, which will greatly increase the *memory consumption* of our server. *Sort* operations within that vision pipeline are limited to *100 megabytes of RAM* by default. To allow handling *larger data sets*, we need to *allowDiskUse*, which is an aggregation pipeline option that we can provide to the aggregate function. By doing so, we will be performing the excess of *100 megabytes* of memory required to do a *sort* using *disk* to help us *sort* out the results.

```javascript
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
```

So in short, *$sort, $skip, $limits, and $count* are functionally equivalent to the similar *named cursor* methods. So we can take advantage of *indexes*, if it's *near the beginning* of our pipeline, and before a *project group or unwind* stages. By default, the *$sort* stage will only take up to *100 megabytes of RAM*. For more than that, we will need to provide the *allowDiskUse* option as equal *true* to our pipeline. If we do not do so, the operation will be terminated on the server. And that's all we have for you in *cursor-like stages* of the *aggregation pipeline*.

### $sample Stage

Another very useful utility stage is *$sample*. *$sample* will select a set of random documents from a collection in one of two ways. The *first method* is, if the *size* that we are specifying, the *N number* of documents that we want our sample to be looking like. If it's less than *5%* of the number of documents in our *source collection*, and the *source collection* has more than *100 documents*, and *$sample* is the *first stage*, then a *pseudo-random cursor* will select the specific number of documents to be passed on.

```javascript
// First Method
    {$sample: {size: < N, how many documents> } }
WHEN:
    N <= 5% of number of documents in source collection AND
    Source Collection has >= 100 documents AND $sample is the first stage
```

If all other conditions, and let's recap them very quickly, if *N* is more than *5%* or the *source collection* has less than *100 documents*, or if sample is not the *first stage*, if any of these conditions does not apply, then what is done is a *in-memory random sort* and select the specific number of documents that we specify as the *size*. Now this sort will be subjected to the same memory restrictions as the *sort stage* of our aggregation pipeline.

```javascript
// Second Method
    {$sample: {size: < N, how many documents> } }
WHEN:
    All other conditions
```

So let's see some of this in action. In my database, I will have a *NYC facilities collection*. This collection contains more than *100 documents*. The *sample size* is greater than *5%* of the *total amount* of documents. And the *sample stage* is the *first* of my pipeline. Therefore, the *pseudo-random operation* will apply. When I run this pipeline, we can see that we got *randomly selected* documents from our collection.

```javascript
// sampling 200 documents of collection ``nycFacilities``
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.nycFacilities.aggregate([{"$sample": { "size": 200 }}]).pretty();
{
        "_id" : ObjectId("59a57f72ea2da4c51ef3626a"),
        "name" : "Jamaica Gateway Park",
        "address" : {
            "number" : "137-37",
            "street" : "95 Avenue",
            "city" : "Jamaica",
            "zipcode" : "11435"
        },
        "borough" : "Queens",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.812177,
                40.696834
            ]
        },
        "domain" : "Administration of Government",
        "group" : "Other Property",
        "specialty" : "Miscellaneous Use",
        "type" : "Undeveloped"
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3cf24"),
        "name" : "USDA-CEO P371k At Sunset Park H.S",
        "address" : {
            "number" : "153",
            "street" : "35 Street",
            "city" : "Brooklyn",
            "zipcode" : "11232"
        },
        "borough" : "Brooklyn",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -74.004282,
                40.655552
            ]
        },
        "domain" : "Education, Child Welfare, and Youth",
        "group" : "Child Services and Welfare",
        "specialty" : "Child Nutrition",
        "type" : "USDA Community Eligibility Option"
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3c669"),
        "name" : "Motor Parkway",
        "address" : {
            "number" : "",
            "street" : "",
            "city" : "Oakland Gardens",
            "zipcode" : "11364"
        },
        "borough" : "Queens",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.753579,
                40.737021
            ]
        },
        "domain" : "Parks, Gardens, and Historical Sites",
        "group" : "Parks and Plazas",
        "specialty" : "Preserves and Conservation Areas",
        "type" : "Nature Area"
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3c59b"),
        "name" : "Louis Pl Friends",
        "address" : {
            "number" : "",
            "street" : "",
            "city" : "Brooklyn",
            "zipcode" : "11233"
        },
        "borough" : "Brooklyn",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.917054,
                40.677419
            ]
        },
        "domain" : "Parks, Gardens, and Historical Sites",
        "group" : "Parks and Plazas",
        "specialty" : "Gardens",
        "type" : "Garden"
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef37da6"),
        "name" : "P.S. 229 Emanuel Kaplan",
        "address" : {
            "number" : "67-25",
            "street" : "51 Road",
            "city" : "Woodside",
            "zipcode" : "11377"
        },
        "borough" : "Queens",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.897083,
                40.734631
            ]
        },
        "domain" : "Education, Child Welfare, and Youth",
        "group" : "Child Care and Pre-Kindergarten",
        "specialty" : "DOE Universal Pre-Kindergarten",
        "type" : "DOE Universal Pre-K"
    }
    {
        "_id" : ObjectId("59a57f72ea2da4c51ef3c4f3"),
        "name" : "Ould Sod Construction Corp.",
        "address" : {
            "number" : "33-13",
            "street" : "70 Street",
            "city" : "Jackson Heights",
            "zipcode" : "11372"
        },
        "borough" : "Queens",
        "location" : {
            "type" : "Point",
            "coordinates" : [
                -73.896175,
                40.753902
            ]
        },
        "domain" : "Core Infrastructure and Transportation",
        "group" : "Solid Waste",
        "specialty" : "Solid Waste Transfer and Carting",
        "type" : "Trade Waste Carter Site"
}
Type "it" for more
```

Now *$sample* is very useful when working with *large* collections. And we only want a *limited amount* of documents to operate with. They can be useful to do an *initial analysis* or to do some *sampling on the result set* that we might be interested to work with. It can be used to fetch documents in a *random fashion* for features such as *random user search* in a collection, or when we want to *seed some random object* for some computation, or when we want *aleatory data* for our data set. And this is all we have for you on *$sample*.

### Lab: Using Cursor-like Stages

#### Problem 5

*MongoDB* has another movie night scheduled. This time, we polled employees for their favorite actress or actor, and got these results.

```javascript
favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"]
```

For movies released in the **USA** with a *tomatoes.viewer.rating* greater than or equal to *3*, calculate a new field called *num_favs* that represets how many *favorites* appear in the *cast* field of the movie.

Sort your results by *num_favs, tomatoes.viewer.rating, and title*, all in descending order. What is the *title* of the *25th* film in the aggregation result?

#### Answer 5

```javascript

// Favorite actors.
var favorites = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"
];
 
// Builds the pipeline.
var pipeline = [
    { $match : { 
            "tomatoes.viewer.rating": { $gte: 3 },
            "countries": { $in: ["USA"] },
            "cast" : { $exists : true }
            } 
        },
        { $addFields : { "num_favs" : { $size : { $setIntersection : [ "$cast", favorites ] } } } },
        { $sort : {
            "num_favs" : -1,
            "tomatoes.viewer.rating" : -1,
            "title" : -1
            },
        },
        { $skip : 24 }
];

// Prints the result.
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate(pipeline, { allowDiskUse : true }).next().title;
The Heat
```

### Lab - Bringing it all together

#### Problem 6

Calculate an average rating for each movie in our collection where English is an available language, the minimum *imdb.rating* is at least 1, the minimum *imdb.votes* is at least 1, and it was released in *1990* or after. You'll be required to *rescale (or normalize) imdb.votes*. The formula to rescale imdb.votes and calculate normalized_rating is included as a handout.

What film has the lowest normalized_rating?

#### Answer 6

```javascript
// Builds the pipeline.
var pipeline = [
    { $match : { 
            "languages" : "English",
            "imdb.rating" : { $gte : 1 }, 
            "imdb.votes" : { $gte : 1 }, 
            "year" : { $gte : 1990 }
            } 
        },
        { $addFields : 
            { "scaled_votes" : 
                { $add: [
                    1,
                    { $multiply: [
                        9,
                        { $divide: [
                            { $subtract: [ "$imdb.votes" , 5] },
                            { $subtract: [1521105, 5] }
                        ]}
                    ]}
                ]}
            }
        },
        { $addFields : { "normalized_rating" : { $avg : [ "$scaled_votes", "$imdb.rating" ] } } },
        { $sort : { "normalized_rating" : 1 } }
];

// Prints the result.
MongoDB Enterprise Cluster0-shard-0:PRIMARY> var result = db.movies.aggregate(pipeline, { allowDiskUse : true }).next().title;
MongoDB Enterprise Cluster0-shard-0:PRIMARY> print("Result: " + result);
Result: The Christmas Tree
```

## Chapter 3: Core Aggregation - Combining Information

### The $group Stage

The next stage we'll learn about is the *$group stage*. Key to our comprehension of group is to understand the one required argument -- the *_id* field of this stage. The expression or expressions we specify to *_id* becomes the criteria the *group stage* uses to categorize and bundle documents together.

```javascript
{$group: { _id: <matching/grouping criteria> } }
```

![klopp-se-electric-coin-sorter-moneymachines.com](https://i2.wp.com/www.moneymachines.com/wp-content/uploads/2018/08/klopp-se-electric-coin-sorter-moneymachines.com.jpg?fit=1024%2C837&ssl=1)

```javascript
coins: [
    { denomination: 0.01},
    { denomination: 0.25},
    { denomination: 0.10},
    { denomination: 0.05},
    { denomination: 0.25},
    ...
]

{$group: { _id: "denomination" } }
```

In this picture, we're grouping *coins* based on their *denomination*, so the expression specified to *_id* would be the *denomination field path*. Let's see this in action using real data. All right, let's group documents in our *movies collection* based on the value they have in their *year field*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$group": { "_id": "$year" }
...   }
... ]);
{ "_id" : 1874 }
{ "_id" : 1880 }
{ "_id" : 1887 }
{ "_id" : 1888 }
{ "_id" : 1890 }
{ "_id" : 1891 }
{ "_id" : 1892 }
{ "_id" : 1893 }
{ "_id" : 1894 }
{ "_id" : 1895 }
{ "_id" : 1896 }
{ "_id" : 1897 }
{ "_id" : 1898 }
{ "_id" : 1899 }
{ "_id" : 1900 }
{ "_id" : 1901 }
{ "_id" : 1902 }
{ "_id" : 1903 }
{ "_id" : 1904 }
{ "_id" : 1905 }
Type "it" for more
```

By grouping, we can see, we have fundamentally changed the structure of the resulting documents. *Group* matched them based on the value of the *year field*. Documents with *identical values* got bundled together, and each unique value produced an output document that shows us the values or value we grouped on. By itself, this may or may not be useful depending on the use case, and just grouping on one expression is functionally equivalent to using the distinct command.
> Let's explore the other powerful feature of the group stage -- *the ability to use aggregation accumulator expressions*.

```javascript
{
    $group: {
        _id: <matching/grouping criteria>,
        fieldName: <accumulator expression>,
        ... <as many fieldName: expressions as required >
    }
}
```

We can specify additional fields we want to calculate in the *group stage*, and as many as were required to accomplish our goal.

Here, we are going to group on the value of *year*, as before. We also calculate a new field called *num_films_in_year* using the *$sum* accumulator expression. Each time *group* categorizes a document for us, the *sum* expression gets called. Since we specified a value of *1*, each matching document is going to *sum 1* to the value of *num_films_in_year*. Let's see it in action.

```javascript
// grouping by year and getting a count per year using the { $sum: 1 } pattern
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$group": {
...       "_id": "$year",
...       "numFilmsThisYear": { "$sum": 1 }
...     }
...   }
... ]);
{ "_id" : 1982, "numFilmsThisYear" : 361 }
{ "_id" : 1904, "numFilmsThisYear" : 9 }
{ "_id" : 1987, "numFilmsThisYear" : 460 }
{ "_id" : 1897, "numFilmsThisYear" : 8 }
{ "_id" : 1895, "numFilmsThisYear" : 7 }
{ "_id" : 1900, "numFilmsThisYear" : 13 }
{ "_id" : 1920, "numFilmsThisYear" : 30 }
{ "_id" : 1888, "numFilmsThisYear" : 2 }
{ "_id" : 1954, "numFilmsThisYear" : 189 }
{ "_id" : 1976, "numFilmsThisYear" : 332 }
{ "_id" : 1891, "numFilmsThisYear" : 5 }
{ "_id" : 2009, "numFilmsThisYear" : 1606 }
{ "_id" : 1964, "numFilmsThisYear" : 256 }
{ "_id" : 1944, "numFilmsThisYear" : 141 }
{ "_id" : "2008�", "numFilmsThisYear" : 3 }
{ "_id" : "2011�", "numFilmsThisYear" : 7 }
{ "_id" : 2001, "numFilmsThisYear" : 862 }
{ "_id" : 1947, "numFilmsThisYear" : 155 }
{ "_id" : 1932, "numFilmsThisYear" : 138 }
{ "_id" : 1929, "numFilmsThisYear" : 77 }
Type "it" for more
```

The same results as before, with the addition of the *num_films_in_year* field. We can see that there were only *two* documents with a value *1888* in the *year field*, while there were *1606* documents with the value *2009*. Quite a busy year. Let's perform the same *aggregation* with the *sort stage* appended to the end, to order our results.

```javascript
// grouping as before, then sorting in descending order based on the count
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$group": {
...       "_id": "$year",
...       "count": { "$sum": 1 }
...     }
...   },
...   {
...     "$sort": { "count": -1 }
...   }
... ]);
{ "_id" : 2015, "count" : 2079 }
{ "_id" : 2014, "count" : 2058 }
{ "_id" : 2013, "count" : 1897 }
{ "_id" : 2012, "count" : 1769 }
{ "_id" : 2011, "count" : 1665 }
{ "_id" : 2009, "count" : 1606 }
{ "_id" : 2010, "count" : 1538 }
{ "_id" : 2008, "count" : 1493 }
{ "_id" : 2007, "count" : 1327 }
{ "_id" : 2006, "count" : 1292 }
{ "_id" : 2005, "count" : 1135 }
{ "_id" : 2004, "count" : 1007 }
{ "_id" : 2002, "count" : 909 }
{ "_id" : 2003, "count" : 897 }
{ "_id" : 2001, "count" : 862 }
{ "_id" : 2000, "count" : 806 }
{ "_id" : 1999, "count" : 730 }
{ "_id" : 1998, "count" : 722 }
{ "_id" : 1997, "count" : 676 }
{ "_id" : 1996, "count" : 644 }
Type "it" for more
```

Great. We can start to get an indication that as a *year value* increases, we have more documents in our collection. This brings up an important point about the expression with specified *_id*. Document values used in the expression must resolve to the same value or combination of values in order for documents to match. Let's look at an example.

```javascript
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
```

Here we're using the *size expression* to get the value of the *directors array*. I'm wrapping it in this *$cond conditional expression* because if the value we specified as *size* doesn't evaluate to an *array* or is missing, *size* will error. So if *directors* is an array, return the *size of directors*. Otherwise, *0*. As documents flow in, this will be evaluated, and documents with the same number of *directors* will be grouped together. All documents without *director* information or with an empty array for *directors* will be grouped as well.

We call the field *numDirectors*, but could have given it any *name* we wanted. When documents are grouped together, we'll calculate a field called *numFilms* and just *count* how many documents match. We'll also *average the metacritic* information, and assign that to a field called *averageMetacritic* for all the matching documents in a group. Again, we could have specified any name for *numFilms or averageMetacritic*. Lastly, we'll just *sort* the documents in descending order. Let's see it in action.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$group": {
...       "_id": {
...         "numDirectors": {
...           "$cond": [{ "$isArray": "$directors" }, { "$size": "$directors" }, 0]
...         }
...       },
...       "numFilms": { "$sum": 1 },
...       "averageMetacritic": { "$avg": "$metacritic" }
...     }
...   },
...   {
...     "$sort": { "_id.numDirectors": -1 }
...   }
... ]);
{ "_id" : { "numDirectors" : 44 }, "numFilms" : 1, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 42 }, "numFilms" : 1, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 41 }, "numFilms" : 1, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 36 }, "numFilms" : 1, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 30 }, "numFilms" : 1, "averageMetacritic" : 53 }
{ "_id" : { "numDirectors" : 29 }, "numFilms" : 1, "averageMetacritic" : 58 }
{ "_id" : { "numDirectors" : 27 }, "numFilms" : 1, "averageMetacritic" : 43 }
{ "_id" : { "numDirectors" : 26 }, "numFilms" : 2, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 22 }, "numFilms" : 1, "averageMetacritic" : 66 }
{ "_id" : { "numDirectors" : 21 }, "numFilms" : 1, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 20 }, "numFilms" : 1, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 15 }, "numFilms" : 1, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 14 }, "numFilms" : 3, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 13 }, "numFilms" : 3, "averageMetacritic" : 18 }
{ "_id" : { "numDirectors" : 12 }, "numFilms" : 1, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 11 }, "numFilms" : 9, "averageMetacritic" : 48 }
{ "_id" : { "numDirectors" : 10 }, "numFilms" : 9, "averageMetacritic" : 58 }
{ "_id" : { "numDirectors" : 9 }, "numFilms" : 5, "averageMetacritic" : null }
{ "_id" : { "numDirectors" : 8 }, "numFilms" : 13, "averageMetacritic" : 51 }
{ "_id" : { "numDirectors" : 7 }, "numFilms" : 26, "averageMetacritic" : 49 }
Type "it" for more
```

Wow, a film with *44 directors*, but the *average metacritic is null*. Let's explore this by looking at the document.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.findOne( { directors: { $size: 44 } } );
{
        "_id" : ObjectId("573a13edf29313caabdd41f4"),
        "title" : "Our RoboCop Remake",
        "year" : 2014,
        "runtime" : 108,
        "released" : ISODate("2014-02-06T00:00:00Z"),
        "cast" : [
            "Chase Fein",
            "Nichole Bagby",
            "Willy Roberts",
            "Hank Friedmann"
        ],
        "lastupdated" : "2015-09-11 00:13:14.227000000",
        "type" : "movie",
        "languages" : [
            "English"
        ],
        "directors" : [
            "Kelsy Abbott",
            "Eric Appel",
            "James Atkinson",
            "Paul Bartunek",
            "Todd Bishop",
            "Stephen Cedars",
            "David Codeglia",
            "Casey Donahue",
            "Fatal Farm",
            "Kate Freund",
            "Matthew Freund",
            "Hank Friedmann",
            "Clint Gage",
            "Ariel Gardner",
            "Paul Isakson",
            "Tom Kauffman",
            "Alex Kavutskiy",
            "Benji Kleiman",
            "Jim Klimek",
            "Jason Makiaris",
            "Timothy Marklevitz",
            "Michael McCafferty",
            "Wendy McColm",
            "Aaron Moles",
            "Nick Mundy",
            "Dan Murrell",
            "John Olsen",
            "Ben Pluimer",
            "Wade Randolph",
            "Kyle Reiter",
            "Ryan Ridley",
            "Dan Riesser",
            "J.D. Ryznar",
            "Joshua Sasson",
            "David Seger",
            "Duncan Skiles",
            "Tyler Spiers",
            "Spencer Strauss",
            "Erni Walker",
            "Jon Watts",
            "Brian Wysol",
            "Scott Yacyshyn",
            "Zach Zdziebko",
            "Mike Manasewitsch"
        ],
        "writers" : [
            "Eric Appel",
            "James Atkinson (creator)",
            "Todd Bishop (scene)",
            "Stephen Cedars",
            "David Codeglia",
            "Paul Isakson",
            "Tom Kauffman",
            "Benji Kleiman",
            "Michael McCafferty",
            "John Olsen (creator)",
            "Ryan Ridley",
            "David Seger",
            "Tyler Spiers",
            "Spencer Strauss",
            "Michael Ryan Truly",
            "Scott Yacyshyn"
        ],
        "imdb" : {
            "rating" : 6.5,
            "votes" : 156,
            "id" : 3528906
        },
        "countries" : [
            "USA"
        ],
        "genres" : [
            "Animation",
            "Action",
            "Comedy"
        ],
        "num_mflix_comments" : 1,
        "comments" : [
            {
                "name" : "Mackenzie Bell",
                "email" : "mackenzie_bell@fakegmail.com",
                "movie_id" : ObjectId("573a13edf29313caabdd41f4"),
                "text" : "Alias veritatis quasi a et magni. Tempore ullam omnis temporibus. Eaque officia assumenda quasi vero corrupti laborum recusandae. Blanditiis sequi iusto ducimus officia nam ad.",
                "date" : ISODate("1975-04-10T19:33:13Z")
            }
        ]
}
```

All right, scanning the document, we can see that the *metacritic field* is missing entirely. This illustrates an important concept. It is crucial to understand the type of data coming in to properly interpret the results we calculate, and we may be required to sanitize our input in some way to calculate a result at all. *Accumulator expressions* will ignore documents with a *value at the specified field* that isn't of the type the expression expects, or if the value is missing.

If all documents encountered have an *incorrect data type or a missing value* for the desired field, the expression will result in null. OK, we're gaining a good understanding of how both the *expressions applied to the _id* groups documents, and how *expressions specified to our accumulators* work. But what if we wanted to group all documents, rather than just a *subset*?

```javascript
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
```

By convention, we specify *null* -- or an *empty string* -- as the argument to *_id*. Before we run this pipeline, let's set an expectation. I expect the value of *count* to be equal to the number of documents in the *movies collection*. Let's test.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$group": {
...       "_id": null,
...       "count": { "$sum": 1 }
...     }
...   }
... ]);
{ "_id" : null, "count" : 44488 }

MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.count();
44488
```

All right, *44,488*. And the total number of documents? Again 44,488. An exact match. Rather than duplicating functionality in a very unoptimized way, let's do something that is useful for all documents. Let's calculate the *average metacritic rating*.

```javascript
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
```

Here, we use a *match stage* to filter documents out with a *metacritic* that isn't *greater than or equal to 0*. Documents missing *metacritic* information, or with a *non-numeric value* at that *field* won't make it through.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$match": { "metacritic": { "$gte": 0 } }
...   },
...   {
...     "$group": {
...       "_id": null,
...       "averageMetacritic": { "$avg": "$metacritic" }
...     }
...   }
... ]);
{ "_id" : null, "averageMetacritic" : 56.931091693396745 }
```

And we can see the *average metacritic rating* among all documents that had *metacritic* information is around *56.93*. And that covers the *group stage*. Let's summarize. *_id* is where we specify what *incoming* documents should be *grouped* on. We can use all *accumulator expressions* within *group*. *Group* can be used *multiple* times within a *pipeline*, and it may be necessary to *sanitize incoming data*.
