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

### Accumulator Stages with $project

Let's take a moment to learn about using *accumulator expressions* with the *$project stage*. Knowledge of how to use these *expressions* can greatly simplify our work. One important thing to keep in mind is that *accumulator expressions* within *$project* work over an *array* within the given document. They do not carry values forward to each document encountered. Let's suppose we have a collection named *example* with this below schema. If we perform the *aggregation*, this will be the result.

```javascript
db.example.find()

{ _id: 0, data: [ 1, 2, 3, 4, 5  ] }
{ _id: 1, data: [ 1, 3, 5, 7, 9  ] }
{ _id: 2, data: [ 2, 4, 6, 8, 10 ] }

db.example.aggregate([{
    $project: { dataAverage: { $ave: "$data" } }
}])

{ _id: 0, dataAverage: 3 }
{ _id: 1, dataAverage: 5 }
{ _id: 2, dataAverage: 6 }
```

An *output* document for every *input* document, with the average of that document's *data* field. For this lesson, we're going to explore this below *data set*.

| ave_high_temp | ave_low_temp | ice-cream_cpi | ice-cream_sales_in_millions | month    |
|---------------|--------------|---------------|-----------------------------|----------|
|       42      |      27      |     238.8     |             115             |  January |
|       44      |      28      |     225.5     |             118             | February |
|       53      |      35      |     221.9     |             121             |   March  |
|       64      |      44      |     222.6     |             125             |   April  |
|       75      |      54      |     216.7     |             140             |    May   |
|       83      |      63      |     216.6     |             155             |   June   |

It's the *average monthly low and high temperature* for the United States, as well as *monthly ice cream consumer price index and sales information*. And here's what the *data* looks like in our collection.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.icecream_data.findOne();
{
        "_id" : ObjectId("59bff494f70ff89cacc36f90"),
        "trends" : [
            {
                "month" : "January",
                "avg_high_tmp" : 42,
                "avg_low_tmp" : 27,
                "icecream_cpi" : 238.8,
                "icecream_sales_in_millions" : 115
            },
            {
                "month" : "February",
                "avg_high_tmp" : 44,
                "avg_low_tmp" : 28,
                "icecream_cpi" : 225.5,
                "icecream_sales_in_millions" : 118
            },
            {
                "month" : "March",
                "avg_high_tmp" : 53,
                "avg_low_tmp" : 35,
                "icecream_cpi" : 221.9,
                "icecream_sales_in_millions" : 121
            },
            {
                "month" : "April",
                "avg_high_tmp" : 64,
                "avg_low_tmp" : 44,
                "icecream_cpi" : 222.6,
                "icecream_sales_in_millions" : 125
            },
            {
                "month" : "May",
                "avg_high_tmp" : 75,
                "avg_low_tmp" : 54,
                "icecream_cpi" : 216.7,
                "icecream_sales_in_millions" : 140
            },
            {
                "month" : "June",
                "avg_high_tmp" : 83,
                "avg_low_tmp" : 63,
                "icecream_cpi" : 216.6,
                "icecream_sales_in_millions" : 155
            },
            {
                "month" : "July",
                "avg_high_tmp" : 87,
                "avg_low_tmp" : 68,
                "icecream_cpi" : 213.2,
                "icecream_sales_in_millions" : 163
            },
            {
                "month" : "August",
                "avg_high_tmp" : 84,
                "avg_low_tmp" : 66,
                "icecream_cpi" : 215.9,
                "icecream_sales_in_millions" : 157
            },
            {
                "month" : "September",
                "avg_high_tmp" : 78,
                "avg_low_tmp" : 59,
                "icecream_cpi" : 217.4,
                "icecream_sales_in_millions" : 140
            },
            {
                "month" : "October",
                "avg_high_tmp" : 67,
                "avg_low_tmp" : 48,
                "icecream_cpi" : 218.7,
                "icecream_sales_in_millions" : 128
            },
            {
                "month" : "November",
                "avg_high_tmp" : 55,
                "avg_low_tmp" : 38,
                "icecream_cpi" : 220.3,
                "icecream_sales_in_millions" : 122
            },
            {
                "month" : "December",
                "avg_high_tmp" : 45,
                "avg_low_tmp" : 29,
                "icecream_cpi" : 227.7,
                "icecream_sales_in_millions" : 117
            }
        ]
}

```

We can see, we have a *trends array* with documents that contain all the information we'll need. Easy enough to work with. Let's go ahead and find the *maximum and minimum* values for the *average high temperature*. We'll explore two different methods to find the *maximum*. First, we'll use the *$reduce* expression to manually find the *maximum*.

```javascript
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
```

Before I run this, let's break it down. Here, I'm specifying the *$reduce* expression. *$reduce* takes an array as its *input argument* here. For the argument to *initialValue*, the *value or accumulator* we'll begin with, we're specifying *negative infinity*. I hope we'll never have a *monthly average high temperature of negative infinity*, but in all seriousness, we're using *negative infinity* because any *reasonable value* we encounter should be greater.

Lastly, we'll specify the logic to the *in* field here. This is using the *$cond* conditional operator and saying if *$$this.avg_high_tmp* is greater than the *$$value* which is held in our accumulator, then return *this.avg_high_tmp*. Otherwise, just return the *value* back. So compare the *current value* against the *accumulator value*, and if it's greater, we'll replace it with the *value* we just encountered.

Otherwise, we'll just keep using our *current max value*. Notice the *double dollar* signs. These are *temporary variables* defined for use only within the *$reduce* expression, as we mentioned in the aggregation structure and syntax lesson. *$this* refers to the *current element* in the array. *$value* refers to the *accumulator value*. It will do this for every element in the array. OK, let's run this.

```javascript
// using $reduce to get the highest temperature
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.icecream_data.aggregate([
...   {
...     "$project": {
...       "_id": 0,
...       "max_high": {
...         "$reduce": {
...           "input": "$trends",
...           "initialValue": -Infinity,
...           "in": {
...             "$cond": [
...               { "$gt": ["$$this.avg_high_tmp", "$$value"] },
...               "$$this.avg_high_tmp",
...               "$$value"
...             ]
...           }
...         }
...       }
...     }
...   }
... ]);
{ "max_high" : 87 }
```

And we see the *max high was 87*. Wow, that was pretty complicated. Let's look at an easier way to accomplish this.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.icecream_data.aggregate([
...   { "$project": { "_id": 0, "max_high": { "$max": "$trends.avg_high_tmp" } } }
... ]);
{ "max_high" : 87 }
```

I think we can all agree that this is much simpler. We use the *$max* group accumulator expression to get the information we want. And again, we get *max high of 87*. OK, let's get the *minimum average temperature*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.icecream_data.aggregate([
...   { "$project": { "_id": 0, "min_low": { "$min": "$trends.avg_low_tmp" } } }
... ]);
{ "min_low" : 27 }
```

Here, we use the *$min* accumulator expression and we can see our *max low was 27*. All right. We now know how to use *max and min*. We can also calculate *averages and standard deviations*. Let's calculate the *average consumer price index* for ice cream, as well as the *standard deviation*.

```javascript
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
```

Here, we're calculating both in one pass. For the *average_cpi* field, we specified the *$avg* average expression, telling it to average of the values in the *icecream_cpi* field in the *trends* array. And here, the *cpi_deviation* is calculated almost identically, except we're using the *population standard deviation*. We're using *standard deviation pop* because we're looking at the entire *set of data*. However, if this was only a sample of our data, we'd use the *sample standard deviation* expression.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.icecream_data.aggregate([
...   {
...     "$project": {
...       "_id": 0,
...       "average_cpi": { "$avg": "$trends.icecream_cpi" },
...       "cpi_deviation": { "$stdDevPop": "$trends.icecream_cpi" }
...     }
...   }
... ]);
{ "average_cpi" : 221.275, "cpi_deviation" : 6.632511464998266 }
```

Great. We can see that the *average consumer price index was 221.275* and the *standard deviation was around 6.63*. We could use this information to find data that is outside norms to point to areas that might need special analysis.

The last accumulator expression I'd like to show is *$sum*. As the name implies, *$sum* sums up the values of an array. We can see that the yearly sales were *1,601 million*.

```javascript
// using the $sum expression to get total yearly sales
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.icecream_data.aggregate([
...   {
...     "$project": {
...       "_id": 0,
...       "yearly_sales (millions)": { "$sum": "$trends.icecream_sales_in_millions" }
...     }
...   }
... ]);
{ "yearly_sales (millions)" : 1601 }
```

And that covers accumulator expressions available within *$project*. Here are a few things to keep in mind. The available accumulator expressions in *$project are $sum, $avg, $max, $min, $stdDevPop, and $stdDevSamp*. Within *$project*, these expressions will not carry their value forward and operate across multiple documents. For this, we'd need to use the *unwind stage and group accumulator expressions*. For more complex calculations, it's handy to know how to use *$reduce and $map*.

### Lab - $group and Accumulators

#### Problem 7

In the last lab, we calculated a normalized rating that required us to know what the minimum and maximum values for *imdb.votes* were. These values were found using the *$group* stage!

For all films that won at least 1 Oscar, calculate the standard deviation, highest, lowest, and average *imdb.rating*. Use the *sample* standard deviation expression.

*HINT* - All movies in the collection that won an Oscar begin with a string resembling one of the following in their awards field

```javascript
Won 13 Oscars
Won 1 Oscar
```

#### Answer 7

```javascript
// Builds the pipeline.
MongoDB Enterprise Cluster0-shard-0:PRIMARY> var pipeline = [
...     { $match : { "awards" : { $regex : /Won \d+ Oscar/ } } },
... { $group : { 
...     "_id" : null,
...     "highest_rating" : { $max : "$imdb.rating" },
... "lowest_rating" : { $min : "$imdb.rating" },
... "average_rating" : { $avg : "$imdb.rating" },
... "deviation" : { $stdDevSamp : "$imdb.rating" }
... }
... }
... ];


// Prints the result.
MongoDB Enterprise Cluster0-shard-0:PRIMARY> printjson(db.movies.aggregate(pipeline).next());
{
    "_id" : null,
    "highest_rating" : 9.2,
    "lowest_rating" : 4.5,
    "average_rating" : 7.527024070021882,
    "deviation" : 0.5988145513344498
}
```

### The $unwind Stage

Let's learn about another useful aggregation stage, the *$unwind stage*. *$unwind lists unwind in an RA field*, creating a new document for every entry where the field value is now each entry. Let's visualize this with an example.

```javascript
$unwind: "$genres"

{
    "title": "The Martian",
    "genres": [ "Action", "Adventure", " Sci-Fi" ]
}

{
    "title": "The Martian",
    "genres": "Action"
}
{
    "title": "The Martian",
    "genres": "Adventure"
}
{
    "title": "The Martian",
    "genres": " Sci-Fi"
}


{
    "title": "Batman Begins",
    "likes": [ "Action", "Adventure" ]
}

{
    "title": "Batman Begins",
    "genres": "Action"
}
{
    "title": "Batman Begins",
    "genres": "Adventure"
}

```

If I had the following schema at the top, *title and genres*, and *$unwind* on the genres field, I'll get back documents at below. What? Am I saying that I'm generating a document for each array entry, when it was all tighten and well-embedded? Why might this be useful? One example is when we'd like to *group* on individual entries. In the *group* lesson, we *grouped movies* based on their *year*.

```javascript
$group: {
    _id: {
        tittle: "$tittle"
        genre: "$genres"
    }
}

// A
{
    "title": "Star Trek",
    "genre": [
    "Adventure",
    "Action"
    ]
}

// B
{
    "title": "Star Trek",
    "genres": [
    "Action",
    "Adventure"
    ]
}
A is not equal to B
```

And we tried to *group on year and genres*, we would have gotten back many distinct entries because, within *group*, arrays are mashed on pure *equality*, not *equivalents*. So this array of *Adventure & Action* would not match this array of *Action $ Adventure*.

Let's use *$unwind* for something real. Let's find the most popular *genres by year from 2010 to 2015* within the *movie's* collection. I'm going to go ahead and limit this, and say that I'm only considering entries with a *runtime of 90 minutes or greater*. And for popularity, I'll use a value in the *imdb.rating*. Let's break this down.

```javascript
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
```

Here, we begin with the *$match* stage, ensuring we have an *imdb.rating* value by specifying that it must be *greater than 0*, and filtering documents based on *year and runtime*. Then we *unwind the genres array*, creating a new document for each entry in the *original array*. Then we'll *group on the year*, and the now *single genre values field*, and use the *average expression* to calculate the *average_rating from imdb.rating*. Finally, we *sort*, first on the *year descending*, and then the *average_rating descending*. Let's test it out.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$match": {
...       "imdb.rating": { "$gt": 0 },
...       "year": { "$gte": 2010, "$lte": 2015 },
...       "runtime": { "$gte": 90 }
...     }
...   },
...   {
...     "$unwind": "$genres"
...   },
...   {
...     "$group": {
...       "_id": {
...         "year": "$year",
...         "genre": "$genres"
...       },
...       "average_rating": { "$avg": "$imdb.rating" }
...     }
...   },
...   {
...     "$sort": { "_id.year": -1, "average_rating": -1 }
...   }
... ]);
{ "_id" : { "year" : 2015, "genre" : "Biography" }, "average_rating" : 7.423404255319149 }
{ "_id" : { "year" : 2015, "genre" : "News" }, "average_rating" : 7.4 }
{ "_id" : { "year" : 2015, "genre" : "Documentary" }, "average_rating" : 7.387012987012986 }
{ "_id" : { "year" : 2015, "genre" : "Animation" }, "average_rating" : 7.107692307692308 }
{ "_id" : { "year" : 2015, "genre" : "Music" }, "average_rating" : 7.015000000000001 }
{ "_id" : { "year" : 2015, "genre" : "Sport" }, "average_rating" : 6.94 }
{ "_id" : { "year" : 2015, "genre" : "History" }, "average_rating" : 6.903571428571429 }
{ "_id" : { "year" : 2015, "genre" : "Family" }, "average_rating" : 6.864285714285714 }
{ "_id" : { "year" : 2015, "genre" : "Western" }, "average_rating" : 6.85 }
{ "_id" : { "year" : 2015, "genre" : "Drama" }, "average_rating" : 6.747838616714698 }
{ "_id" : { "year" : 2015, "genre" : "Adventure" }, "average_rating" : 6.718 }
{ "_id" : { "year" : 2015, "genre" : "Crime" }, "average_rating" : 6.591803278688525 }
{ "_id" : { "year" : 2015, "genre" : "Mystery" }, "average_rating" : 6.579411764705882 }
{ "_id" : { "year" : 2015, "genre" : "Musical" }, "average_rating" : 6.566666666666666 }
{ "_id" : { "year" : 2015, "genre" : "Comedy" }, "average_rating" : 6.508152173913044 }
{ "_id" : { "year" : 2015, "genre" : "Romance" }, "average_rating" : 6.472463768115943 }
{ "_id" : { "year" : 2015, "genre" : "War" }, "average_rating" : 6.45 }
{ "_id" : { "year" : 2015, "genre" : "Sci-Fi" }, "average_rating" : 6.3175 }
{ "_id" : { "year" : 2015, "genre" : "Thriller" }, "average_rating" : 6.279166666666667 }
{ "_id" : { "year" : 2015, "genre" : "Action" }, "average_rating" : 6.253465346534654 }
Type "it" for more
```

It's close, but not quite there yet. We can see we're getting the most popular *genre by year*, but we're getting all results back. We just want a *single document per year*, with the *highest-rated genre*. There are many ways to accomplish this. We'll just look at one of the most simple. Let's examine this new pipeline.

```javascript
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
```

It's identical to the previous one, with the addition of these *two stages*. The previous *pipeline* was returning in the format we wanted. There were just too many documents being returned. Here, in this additional *group stage*, we *group* documents together based on their *year*. And since they are already *sorted* in the order we need, we just take the *first value* we encounter for the *genre and the average rating*. Then we finish with a *$sort* to make sure that they're return in the order we want. Let's see if it works.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$match": {
...       "imdb.rating": { "$gt": 0 },
...       "year": { "$gte": 2010, "$lte": 2015 },
...       "runtime": { "$gte": 90 }
...     }
...   },
...   {
...     "$unwind": "$genres"
...   },
...   {
...     "$group": {
...       "_id": {
...         "year": "$year",
...         "genre": "$genres"
...       },
...       "average_rating": { "$avg": "$imdb.rating" }
...     }
...   },
...   {
...     "$sort": { "_id.year": -1, "average_rating": -1 }
...   },
...   {
...     "$group": {
...       "_id": "$_id.year",
...       "genre": { "$first": "$_id.genre" },
...       "average_rating": { "$first": "$average_rating" }
...     }
...   },
...   {
...     "$sort": { "_id": -1 }
...   }
... ]);
{ "_id" : 2015, "genre" : "Biography", "average_rating" : 7.423404255319149 }
{ "_id" : 2014, "genre" : "Documentary", "average_rating" : 7.212587412587413 }
{ "_id" : 2013, "genre" : "Documentary", "average_rating" : 7.158196721311475 }
{ "_id" : 2012, "genre" : "Talk-Show", "average_rating" : 8.2 }
{ "_id" : 2011, "genre" : "Documentary", "average_rating" : 7.262857142857143 }
{ "_id" : 2010, "genre" : "News", "average_rating" : 7.65 }
```

Excellent. One document *per year*, with the *highest-rated genre in that year*. We've seen how *$unwind* works. Now there's a few less things to cover. We've been using the *short form* for *$unwind*.

```javascript
// Short Form
$unwind: <field path>

// Long Form
$unwind: {
    path: <field path>,
    includeArrayIndex: <string>,
    preserveNullAndEmptyArrays: <boolean>
}
```

Here's the *long form* for contrast. In the *long form*, we specify the array we want to *unwind* by providing a *field path* expression to the *path argument*. We can provide a string to *includeArrayIndex*. This will create another field in the document with whatever name we specify, with the value to the index of the element in the original array. Lastly, we can provide a *true or false* value to *preserveNullAndEmptyArrays*.

*True* will create an entry with an *empty array*, with the value specified in the *path* as either *null, missing, or an empty array*. One more thing of note. If the documents in our collection are *very large*, and we need to use *$unwind*, we may exceed the *default memory limit of the aggregation framework*. As always, *match* early, retain only the information needed with *project*, and remember that we can specify to *allow disk use*. And that covers *$unwind*. We've learned a lot.

Let's recap on a few things. *$unwind* only works on an *array of values*. There are two forms for *unwind, the short form and long form*. Using *unwind* on large collections with big documents may lead to *performance issues*.

### Lab - $unwind

#### Problem 8

Let's use our increasing knowledge of the Aggregation Framework to explore our movies collection in more detail. We'd like to calculate how many movies every *cast* member has been in and get an average *imdb.rating* for each *cast* member.

What is the name, number of movies, and average rating (truncated to one decimal) for the cast member that has been in the most number of movies with *English* as an available language?

Provide the input in the following order and format:

```javascript
{ "_id": "First Last", "numFilms": 1, "average": 1.1 }
```

#### Answer 8

```javascript
// Builds the pipeline.
MongoDB Enterprise Cluster0-shard-0:PRIMARY> var pipeline = [
...     { $unwind : "$cast" },
... { $group: { 
...     "_id" : "$cast", 
... "numFilms" : { $sum : 1 },
... "average" : { $avg : "$imdb.rating" }
... }
... },
... { $sort : { "numFilms" : -1 } },
... { $limit : 1 }
... ];

// Prints the result.
MongoDB Enterprise Cluster0-shard-0:PRIMARY> printjson(db.movies.aggregate(pipeline).next());
{ "_id" : "John Wayne", "numFilms" : 107, "average" : 6.4 }

//University's Solution
db.movies.aggregate([
  {
    $match: {
      languages: "English"
    }
  },
  {
    $project: { _id: 0, cast: 1, "imdb.rating": 1 }
  },
  {
    $unwind: "$cast"
  },
  {
    $group: {
      _id: "$cast",
      numFilms: { $sum: 1 },
      average: { $avg: "$imdb.rating" }
    }
  },
  {
    $project: {
      numFilms: 1,
      average: {
        $divide: [{ $trunc: { $multiply: ["$average", 10] } }, 10]
      }
    }
  },
  {
    $sort: { numFilms: -1 }
  },
  {
    $limit: 1
  }
]);

// We start with a familiar $match stage, looking for movies that include "English" as a language
{
  $match: {
    languages: "English"
  }
},

// Next, we use a $project stage, keeping only the data necessary for the aggregation stages that follow
{
  $project: { _id: 0, cast: 1, "imdb.rating": 1 }
}

// $unwind follows next, extracting every entry in the cast array and creating a document for each one
{
  $unwind: "$cast"
}

// Our $group stage groups cast members together by their name, totals the number of documents, and gets the average imdb.rating
{
  $group: {
    _id: "$cast",
    numFilms: { $sum: 1 },
    average: { $avg: "$imdb.rating" }
  }
}

// We then use a $project stage to truncate the imdb.rating to one decimal. This is done by first multiplying by 10, truncating the number, then dividing by 10
{
  $project: {
    numFilms: 1,
    average: {
      $divide: [
        { $trunc: { $multiply: ["$average", 10] } }
        , 10
      ]
    }
  }
}

// Lastly, we $sort in descending order so the result with the greatest number of movies comes first, and then $limit our result to 1 document, giving the expected answer
{ "_id" : "John Wayne", "numFilms" : 107, "average" : 6.4 }
```

### The $lookup Stage

Now it's time we learned about *lookup*, a powerful stage that lets you combine information from two collections. For those with some knowledge of *SQL*, lookup is effectively a *left outer join*. If that didn't make any sense, don't worry. Let's break it down. In database terms, a *left outer join* combines all documents or entries on the *left* with matching documents or entries from the *right*. So *table 1 left outer joined with table 2* would look like this.

![B00134_07_12](https://static.packt-cdn.com/products/9781782161080/graphics/B00134_07_12.jpg)

The *lookup stage* has this form.

```javascript
$lookup: {
    from: <location to join>,
    localField: <field from the input documents>,
    foreignField: <field from the documents of the "from" collection>,
    as: <output array feild>
}
```

The *from field* here is the collection from which we want to *look up* documents. Keep in mind, the collection you specify in the *from field* cannot be *sharded* and must exist within the same database. *LocalField* here is a field in the *working collection* where we express the aggregation command that we want to *compare to*. *ForeignField* here, is the field we want to *compare from* in the collection we specified in *from*. *Lookup* will form a strict equality comparison.

And the *as field* here, is the new field name we specify, that will show up in our documents that contains any *matches* between *localField and foreignField*. All *matches* will be put in an array in this field. If there were no matches, the field will contain an *empty array*. Let's visualize this in an example.

| working documents                                                 |                             | air_alliances                                                             |
|-------------------------------------------------------------------|-----------------------------|---------------------------------------------------------------------------|
| {  name: "Penguin Air",  country: "Antarctica",  ... },           |               from          |                                                                           |
| {   name: "Delta Air Lines",   country: "United States",   ... }, | localFieild    foreignField | {   ...,  name: "Star Alliance",   airlines: [ "Lufthansa", ... ]   ... } |
| {   name: "Lufthansa",   country: "Germany",   ... }              |               as            | {   ...,  name: "SkyTeam",  airlines: [ "Delta Air Lines", ... ]  ... }   |

Suppose we're aggregating over an *airline's* collection, and we want to *fetch* which *alliance* the *airline* belongs to. As the argument *from would specify air alliances -- (from: "air_alliances")*. Next, we would specify *name as the argument to localField -- (localField: "name")*, the value we want to *compare to*. The argument to a *localField* can resolve to either *an array or a single value*. Then we specify *airlines as the argument to a foreignField -- (foreignField: "airlines")*, the value we want to *compare from*. The argument to *foreignField* can also resolve to either *an array or a single value*.

We can see that based on the argument so far, *Penguin Air* won't *match* anything. *Delta Airlines* will *match* *SkyTeam*. And *Lufthansa* will *match Star Alliance*. Those *matches* were brought into the *current document as alliance -- (as: "alliance")*. We could have given any *string value* we wanted, but keep in mind that if we specify a *name* that already exists in the *working document*, that *field will be overwritten*.

```javascript
// as: "alliance"
{
   name: "Penguin Air",
   country: "Antarctica",
   alliance: [],
   ...
}                         // from
{
    name: "Delta Air Lines",
   country: "United States",   // localFieild
   alliance: [
       { name: "SkyTeam", ... }
   ],                           // foreignField
   ...
},
{                              // as
    name: "Lufthansa",
    country: "Germany",
    alliance: [
        { name: "Star Alliance", ... }
   ],
   ... 
}
```

Notice here that because the document was named *Penguin Air* did not have any results, there is an *empty array*. Oftentimes after a *lookup*, we want to follow it with a *match stage* to *filter documents* out. Another thing to know, *lookup retrieves the entire document that matched*, not just the *field* we specified, the *foreignField*. All right, let's look at *lookup* in actual use. Let's combine information from the *air airlines collection* with the *air alliances collection*, putting all the *airline information within the alliance document*. First, let's look at the *schema in our airlines alliances collection*.

```javascript
// familiarizing with the air_alliances schema
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_alliances.findOne();
{
    "_id" : ObjectId("5980bef9a39d0ba3c650ae9d"),
    "name" : "OneWorld",
    "airlines" : [
        "Air Berlin",
        "American Airlines",
        "British Airways",
        "Cathay Pacific",
        "Finnair",
        "Iberia Airlines",
        "Japan Airlines",
        "LATAM Chile",
        "LATAM Brasil",
        "Malaysia Airlines",
        "Canadian Airlines",
        "Qantas",
        "Qatar Airways",
        "Royal Jordanian",
        "SriLankan Airlines",
        "S7 Airlines"
    ]
}
```

OK, the data we need for *localField* is in the *airline's field*. Let's look at the *airline's schema*, so we know what value to use as the *foreignField*.

```javascript
// familiarizing with the air_airlines schema
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_airlines.findOne();
{
    "_id" : ObjectId("56e9b497732b6122f8790287"),
    "airline" : 8,
    "name" : "247 Jet Ltd",
    "alias" : "",
    "iata" : "TWF",
    "icao" : "CLOUD RUNNER",
    "active" : "N",
    "country" : "United Kingdom",
    "base" : "FLS"
}
```

All right, easy enough. It looks like the information we need for *foreignField* is in the *name field*. That should be all the information we need. Let's build the *pipeline*. All right, we specify *air_airlines* to the *from field*, *airlines* as the *localField*, *name* as the *foreignField*. And here we chose to *overwrite* the *airlines field* with the information we get back. It makes sense. We'll be replacing the *names* with entire documents. Let's see the output.

```javascript
// performing a lookup, joining air_alliances with air_airlines and replacing
// the current airlines information with the new values
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_alliances.aggregate([
...     {
...       "$lookup": {
...         "from": "air_airlines",
...         "localField": "airlines",
...         "foreignField": "name",
...         "as": "airlines"
...       }
...     }
...   ]).pretty();
{
        "_id" : ObjectId("5980bef9a39d0ba3c650ae9d"),
        "name" : "OneWorld",
        "airlines" : [
            {
                "_id" : ObjectId("56e9b497732b6122f87908cd"),
                "airline" : 1615,
                "name" : "Canadian Airlines",
                "alias" : "CP",
                "iata" : "CDN",
                "icao" : "CANADIAN",
                "active" : "Y",
                "country" : "Canada",
                "base" : "LVI"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87907c8"),
                "airline" : 1355,
                "name" : "British Airways",
                "alias" : "BA",
                "iata" : "BAW",
                "icao" : "SPEEDBIRD",
                "active" : "Y",
                "country" : "United Kingdom",
                "base" : "VDA"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790297"),
                "airline" : 24,
                "name" : "American Airlines",
                "alias" : "AA",
                "iata" : "AAL",
                "icao" : "AMERICAN",
                "active" : "Y",
                "country" : "United States",
                "base" : "UEO"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87908a2"),
                "airline" : 1572,
                "name" : "British Airways",
                "alias" : "",
                "iata" : "XMS",
                "icao" : "SANTA",
                "active" : "N",
                "country" : "United Kingdom",
                "base" : "VQS"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790355"),
                "airline" : 214,
                "name" : "Air Berlin",
                "alias" : "AB",
                "iata" : "BER",
                "icao" : "AIR BERLIN",
                "active" : "Y",
                "country" : "Germany",
                "base" : "KTE"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879090e"),
                "airline" : 1680,
                "name" : "Cathay Pacific",
                "alias" : "CX",
                "iata" : "CPA",
                "icao" : "CATHAY",
                "active" : "Y",
                "country" : "Hong Kong SAR of China",
                "base" : "YQU"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790fac"),
                "airline" : 3378,
                "name" : "Malaysia Airlines",
                "alias" : "MH",
                "iata" : "MAS",
                "icao" : "MALAYSIAN",
                "active" : "Y",
                "country" : "Malaysia",
                "base" : "GPB"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790bac"),
                "airline" : 2350,
                "name" : "Finnair",
                "alias" : "AY",
                "iata" : "FIN",
                "icao" : "FINNAIR",
                "active" : "Y",
                "country" : "Finland",
                "base" : "JNZ"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790d83"),
                "airline" : 2822,
                "name" : "Iberia Airlines",
                "alias" : "IB",
                "iata" : "IBE",
                "icao" : "IBERIA",
                "active" : "Y",
                "country" : "Spain",
                "base" : "BRN"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790e28"),
                "airline" : 2987,
                "name" : "Japan Airlines",
                "alias" : "JL",
                "iata" : "JAL",
                "icao" : "JAPANAIR",
                "active" : "Y",
                "country" : "Japan",
                "base" : "TGR"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879131c"),
                "airline" : 4259,
                "name" : "Royal Jordanian",
                "alias" : "RJ",
                "iata" : "RJA",
                "icao" : "JORDANIAN",
                "active" : "Y",
                "country" : "Jordan",
                "base" : "MSJ"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8791374"),
                "airline" : 4349,
                "name" : "SriLankan Airlines",
                "alias" : "UL",
                "iata" : "ALK",
                "icao" : "SRILANKAN",
                "active" : "Y",
                "country" : "Sri Lanka",
                "base" : "PYY"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8791272"),
                "airline" : 4089,
                "name" : "Qantas",
                "alias" : "QF",
                "iata" : "QFA",
                "icao" : "QANTAS",
                "active" : "Y",
                "country" : "Australia",
                "base" : "YQX"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8791360"),
                "airline" : 4329,
                "name" : "S7 Airlines",
                "alias" : "S7",
                "iata" : "SBI",
                "icao" : "SIBERIAN AIRLINES",
                "active" : "Y",
                "country" : "Russia",
                "base" : "CED"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8791274"),
                "airline" : 4091,
                "name" : "Qatar Airways",
                "alias" : "QR",
                "iata" : "QTR",
                "icao" : "QATARI",
                "active" : "Y",
                "country" : "Qatar",
                "base" : "GCI"
            }
        ]
    }
    {
        "_id" : ObjectId("5980bef9a39d0ba3c650ae9b"),
        "name" : "Star Alliance",
        "airlines" : [
            {
                "_id" : ObjectId("56e9b497732b6122f87903ca"),
                "airline" : 330,
                "name" : "Air Canada",
                "alias" : "AC",
                "iata" : "ACA",
                "icao" : "AIR CANADA",
                "active" : "Y",
                "country" : "Canada",
                "base" : "TAL"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879056c"),
                "airline" : 751,
                "name" : "Air China",
                "alias" : "CA",
                "iata" : "CCA",
                "icao" : "AIR CHINA",
                "active" : "Y",
                "country" : "China",
                "base" : "PGV"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87909df"),
                "airline" : 1889,
                "name" : "Copa Airlines",
                "alias" : "CM",
                "iata" : "CMP",
                "icao" : "COPA",
                "active" : "Y",
                "country" : "Panama",
                "base" : "KGA"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87902d2"),
                "airline" : 83,
                "name" : "Adria Airways",
                "alias" : "JP",
                "iata" : "ADR",
                "icao" : "ADRIA",
                "active" : "Y",
                "country" : "Slovenia",
                "base" : "DHM"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879029b"),
                "airline" : 28,
                "name" : "Asiana Airlines",
                "alias" : "OZ",
                "iata" : "AAR",
                "icao" : "ASIANA",
                "active" : "Y",
                "country" : "Republic of Korea",
                "base" : "MZW"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87903c3"),
                "airline" : 324,
                "name" : "All Nippon Airways",
                "alias" : "NH",
                "iata" : "ANA",
                "icao" : "ALL NIPPON",
                "active" : "Y",
                "country" : "Japan",
                "base" : "CAL"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790a03"),
                "airline" : 1925,
                "name" : "Croatia Airlines",
                "alias" : "OU",
                "iata" : "CTN",
                "icao" : "CROATIA",
                "active" : "Y",
                "country" : "Croatia",
                "base" : "NAP"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87903d8"),
                "airline" : 345,
                "name" : "Air New Zealand",
                "alias" : "NZ",
                "iata" : "ANZ",
                "icao" : "NEW ZEALAND",
                "active" : "Y",
                "country" : "New Zealand",
                "base" : "KUL"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790879"),
                "airline" : 1531,
                "name" : "Brussels Airlines",
                "alias" : "SN",
                "iata" : "DAT",
                "icao" : "BEE-LINE",
                "active" : "Y",
                "country" : "Belgium",
                "base" : "XMS"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790f73"),
                "airline" : 3320,
                "name" : "Lufthansa",
                "alias" : "LH",
                "iata" : "DLH",
                "icao" : "LUFTHANSA",
                "active" : "Y",
                "country" : "Germany",
                "base" : "CYS"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790aa9"),
                "airline" : 2091,
                "name" : "EVA Air",
                "alias" : "BR",
                "iata" : "EVA",
                "icao" : "EVA",
                "active" : "Y",
                "country" : "Taiwan",
                "base" : "PHO"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879157b"),
                "airline" : 4869,
                "name" : "TAP Portugal",
                "alias" : "TP",
                "iata" : "TAP",
                "icao" : "AIR PORTUGAL",
                "active" : "Y",
                "country" : "Portugal",
                "base" : "OPO"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8791348"),
                "airline" : 4305,
                "name" : "South African Airways",
                "alias" : "SA",
                "iata" : "SAA",
                "icao" : "SPRINGBOK",
                "active" : "Y",
                "country" : "South Africa",
                "base" : "BDJ"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87913ca"),
                "airline" : 4435,
                "name" : "Singapore Airlines",
                "alias" : "SQ",
                "iata" : "SIA",
                "icao" : "SINGAPORE",
                "active" : "Y",
                "country" : "Singapore",
                "base" : "DGT"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8791479"),
                "airline" : 4611,
                "name" : "Shenzhen Airlines",
                "alias" : "ZH",
                "iata" : "CSZ",
                "icao" : "SHENZHEN AIR",
                "active" : "Y",
                "country" : "China",
                "base" : "AOQ"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8791446"),
                "airline" : 4559,
                "name" : "Swiss International Air Lines",
                "alias" : "LX",
                "iata" : "SWR",
                "icao" : "SWISS",
                "active" : "Y",
                "country" : "Switzerland",
                "base" : "YTS"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87915cc"),
                "airline" : 4951,
                "name" : "Turkish Airlines",
                "alias" : "TK",
                "iata" : "THY",
                "icao" : "TURKAIR",
                "active" : "Y",
                "country" : "Turkey",
                "base" : "MHG"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87916ca"),
                "airline" : 5209,
                "name" : "United Airlines",
                "alias" : "UA",
                "iata" : "UAL",
                "icao" : "UNITED",
                "active" : "Y",
                "country" : "United States",
                "base" : "ORD"
            }
        ]
    }
    {
        "_id" : ObjectId("5980bef9a39d0ba3c650ae9c"),
        "name" : "SkyTeam",
        "airlines" : [
            {
                "_id" : ObjectId("56e9b497732b6122f87902d9"),
                "airline" : 90,
                "name" : "Air Europa",
                "alias" : "UX",
                "iata" : "AEA",
                "icao" : "EUROPA",
                "active" : "Y",
                "country" : "Spain",
                "base" : "RPR"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879095a"),
                "airline" : 1756,
                "name" : "China Airlines",
                "alias" : "CI",
                "iata" : "CAL",
                "icao" : "DYNASTY",
                "active" : "Y",
                "country" : "Taiwan",
                "base" : "AGN"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879095c"),
                "airline" : 1758,
                "name" : "China Eastern Airlines",
                "alias" : "MU",
                "iata" : "CES",
                "icao" : "CHINA EASTERN",
                "active" : "Y",
                "country" : "China",
                "base" : "LUW"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87904d3"),
                "airline" : 596,
                "name" : "Alitalia",
                "alias" : "AZ",
                "iata" : "AZA",
                "icao" : "ALITALIA",
                "active" : "Y",
                "country" : "Italy",
                "base" : "TTA"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790308"),
                "airline" : 137,
                "name" : "Air France",
                "alias" : "AF",
                "iata" : "AFR",
                "icao" : "AIRFRANS",
                "active" : "Y",
                "country" : "France",
                "base" : "HDM"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790965"),
                "airline" : 1767,
                "name" : "China Southern Airlines",
                "alias" : "CZ",
                "iata" : "CSN",
                "icao" : "CHINA SOUTHERN",
                "active" : "Y",
                "country" : "China",
                "base" : "LKL"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790a18"),
                "airline" : 1946,
                "name" : "Czech Airlines",
                "alias" : "OK",
                "iata" : "CSA",
                "icao" : "CSA-LINES",
                "active" : "Y",
                "country" : "Czech Republic",
                "base" : "MXZ"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790a57"),
                "airline" : 2009,
                "name" : "Delta Air Lines",
                "alias" : "DL",
                "iata" : "DAL",
                "icao" : "DELTA",
                "active" : "Y",
                "country" : "United States",
                "base" : "RVK"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879101c"),
                "airline" : 3490,
                "name" : "Middle East Airlines",
                "alias" : "ME",
                "iata" : "MEA",
                "icao" : "CEDAR JET",
                "active" : "Y",
                "country" : "Lebanon",
                "base" : "CGK"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790eb3"),
                "airline" : 3126,
                "name" : "Kenya Airways",
                "alias" : "KQ",
                "iata" : "KQA",
                "icao" : "KENYA",
                "active" : "Y",
                "country" : "Kenya",
                "base" : "JOL"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790ed7"),
                "airline" : 3163,
                "name" : "Korean Air",
                "alias" : "KE",
                "iata" : "KAL",
                "icao" : "KOREANAIR",
                "active" : "Y",
                "country" : "Republic of Korea",
                "base" : "MEH"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f8790c56"),
                "airline" : 2520,
                "name" : "Garuda Indonesia",
                "alias" : "GA",
                "iata" : "GIA",
                "icao" : "INDONESIA",
                "active" : "Y",
                "country" : "Indonesia",
                "base" : "OGX"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f879172c"),
                "airline" : 5309,
                "name" : "Vietnam Airlines",
                "alias" : "VN",
                "iata" : "HVN",
                "icao" : "VIET NAM AIRLINES",
                "active" : "Y",
                "country" : "Vietnam",
                "base" : "JKL"
            },
            {
                "_id" : ObjectId("56e9b497732b6122f87917d8"),
                "airline" : 5484,
                "name" : "Xiamen Airlines",
                "alias" : "MF",
                "iata" : "CXA",
                "icao" : "XIAMEN AIR",
                "active" : "Y",
                "country" : "China",
                "base" : "PPQ"
            }
        ]
}
```

Pretty cool. We can see that *lookup* did just what we expected it to do. We could follow this with some projections or even another *lookup stage* to perform some powerful reshaping and analysis. But for now, that's enough. We've covered a lot of information in this lesson. *Lookup* is a powerful stage that can help help *reduce network requests* and combine information from different collections together for powerful and deep analysis.

Here are a few things to keep in mind. The *from field* cannot be sharded. The *from collection* must be in the same database. The values in *localField and foreignField* are matched on equality. And *as* can be any name, but if it exists in the working document, that *field will be overwritten*.

### Lab - Using $lookup

#### Problem 9

Which alliance from *air_alliances* flies the most *routes* with either a Boeing 747 or an Airbus A380 (abbreviated 747 and 380 in *air_routes*)?

#### Answer 9

```javascript
// University's Solution
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_routes.aggregate([
...   {
...     $match: {
...       airplane: /747|380/
...     }
...   },
...   {
...     $lookup: {
...       from: "air_alliances",
...       foreignField: "airlines",
...       localField: "airline.name",
...       as: "alliance"
...     }
...   },
...   {
...     $unwind: "$alliance"
...   },
...   {
...     $group: {
...       _id: "$alliance.name",
...       count: { $sum: 1 }
...     }
...   },
...   {
...     $sort: { count: -1 }
...   }
... ]);
{ "_id" : "SkyTeam", "count" : 16 }
{ "_id" : "OneWorld", "count" : 15 }
{ "_id" : "Star Alliance", "count" : 11 }

/*
We begin by aggregating over our air_routes collection to allow for filtering of documents containing the string "747" or "380". If we started from air_alliances we would have to do this after the lookup!
*/
{
  $match: {
    airplane: /747|380/
  }
},

/*
Next, we use the $lookup stage to match documents from air_alliances on the value of their airlines field against the current document's airline.name field
*/
{
  $lookup: {
    from: "air_alliances",
    foreignField: "airlines",
    localField: "airline.name",
    as: "alliance"
  }
},

/*
We then use $unwind on the alliance field we created in $lookup, creating a document with each entry in alliance
*/
{
  $unwind: "$alliance"
},

/*
We end with a $group and $sort stage, grouping on the name of the alliance and counting how many times it appeared
*/
{
  $group: {
    _id: "$alliance.name",
    count: { $sum: 1 }
  }
},
{
  $sort: { count: -1 }
}

/*
This produces the following output
*/
{ "_id" : "SkyTeam", "count" : 16 }
{ "_id" : "OneWorld", "count" : 15 }
{ "_id" : "Star Alliance", "count" : 11 }



// Builds the pipeline.
var pipeline = [
    { $unwind : "$airlines" },
    { $lookup: {
            from: "air_routes",
            localField: "airlines",
            foreignField: "airline.name",
            as: "routes"
        }
    },
    { $unwind : "$routes" },
    { $match : { "routes.airplane" : { $in : [ "747", "380" ] } } },
    { $group : {
        "_id" : "$name",
        "routes_count" : { $sum : 1 } 
    }
    },
    { $sort : {"routes_count" : -1 } }
];

// Prints the result.
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_alliances.aggregate(pipeline);
{ "_id" : "OneWorld", "routes_count" : 10 }
{ "_id" : "SkyTeam", "routes_count" : 8 }
{ "_id" : "Star Alliance", "routes_count" : 5 }

MongoDB Enterprise Cluster0-shard-0:PRIMARY> printjson(db.air_alliances.aggregate(pipeline).next());
{ "_id" : "OneWorld", "routes_count" : 10 }
```

### $graphLookup Introduction

By now, you've probably already realized that *MongoDB* offers a *flexible data model*. Documents can be of different *shapes and forms* and organized in such a way that it reflects both application *dynamic data structures and scalability requirements*. We can have very *flat root level only fields* on our documents.

```javascript
{
    name: 'Jose Morinho',
    employer: 'Manchester United',
    nickname: 'Special One'
}
```

Or *quite complex and deeply nested schemas* that reflect application needs for fast *operations and business logic*.

```javascript
{ "start station location" : {
    "type": "Point",
    "coordinates" : [
        -73.9535166,
        40.77140426
    ]
},
"end station location" : {
    "type": "Point",
    "coordinates" : [
        -73.95068615,
        40.77565541
    ]
}
}
```

A common set of *data structures* that require both *complex nesting levels and flexible storage layer* tends to be *graph or tree hierarchy* use cases.

![tree-vs-graph-data-structure](https://static.javatpoint.com/ds/images/tree-vs-graph-data-structure.png)

Data sets can be as simple as a *reporting chain HR data store* or complex data structures that map *airport traveling routes or even social networks*.

![binary-search-tree-example](https://www.sqlshack.com/wp-content/uploads/2020/07/binary-search-tree-example.png)

*Telcos switch, disease taxonomy, and fraud detection* are amongst several different use cases where *graph* queryability and flexible data representation go hand in hand. Unlike *graph* specific databases, *MongoDB* is designed to be a *general purpose database*, meaning that we want to provide a very good infrastructure to support *operational and analytical* use cases. We are extending furthermore the *query capabilities of MongoDB* by offering *$graphLookup*.

*graphLookup* allows developers to combine their *flexible data sets* with *graph or graph-like operations*. This enables all of those complex data sets to be *processed, analyzed, and transformed* using a single data source. When designing and implementing graph relationships and designing its queries, we generally need to think about *transitive relationships*. If *A* reports to *B*, and *B* reports to *C*, then *A* indirectly it reports to *C*.

In *standard SQL*, such hierarchical queries are implemented by way of *recursive common table expressions*. In relational ? this is called *transitive closure*. *Graph lookup* allows looking up recursively a set of documents with a defined relationship to a starting document. *Graphic lookup* is very similar to our *$lookup* operator, it's another to *lookup*, with a few important variations.

```javascript
$graphLookup: {
    from: <lookup table>,
    startWith: <expression for value to start from>,
    connectFromField: <field name to connect from>,
    connectToField: <field name to connect to>,
    as: <field name for result array>
    maxDepth: <number of iterations to perform>
    depthField: <field name for number of iterations to reach this node>,
    restrictSearchWithMatch: <match condition to apply to lookup>
}
```

We'll have a *from field* that specifies a collection, that this stage retrieves results from. A *startwith* field that specifies the *connect to field value or values* that we should start our recursive search with. We have a *connectFromField* that determines a field in each document in the *from collection* that is used to perform the next recursive query. And we have the *connectToField* that sets the field in each document in the *from collection* that is queried against each recursive query.

*As* specifies a field in the output document that will be assigned an *array of results* of the *graph lookup*. *MaxDepth*, this is an *optional* field that specifies the *maximum number of recursive depth* for the *graph lookup*. *DepthField*, also *optional*, specifies in field name in which the result document will be set to the recursive depth at which the document was retrieved. This will be *zero* for the first *lookup*.

And we also have *restrictSearchWithMatch*, another optional field that *specifies a filter to apply* when doing to *lookup* in the *from collection*. Looks great, doesn't it? In the following lesson, we are going to get ourselves busy and start experimenting with this new feature, looking to new set of different examples.

### $graphLookup: Simple Lookup

While modeling *tree structures*, there are different patterns that we can follow depending on how we want to juggle with our data. So let's have a look, for example, to an *org chart*.

|              |                 | CEO |              |     |
|--------------|-----------------|-----|--------------|-----|
|      CMO     |       CRO       | CTO | SVP Services | CFO |
|              | SVP Engineering |     |  VP Product  |     |
| VP Education |     VP Cloud    |     |    VP Core   |     |

We're going to have the different individuals in the company, like for example, we're going to have our *CEO*. And to our *CEO*, he's going to have a bunch of different reports, like the *CMO, CRO, CTO, SVP services, and CFO*. All of them reporting, obviously, to this particular individual. Then we're going to have a sublayer between this where we going to have the different individuals that report directly to the *CTO*.

In this case, we're going to be having the *SVP of Engineering* reporting directly to that *CTO* and also the *VP of Product* also to the *CTO*. And further down the line, we're going to have the different reports of the different core areas, like for example, *VP Education*, *VP Cloud*, or even *VP of Core*. So modeling such a tree in a document or a structure of documents, we might have a couple of different alternatives.

So for example, in this particular structure, we're going to have a *parent_reference*. Now a *parent_reference* means that for each single document we're going to have a particular *attribute of field* that will indicate to us, who do we report to. Who is *our parent in the tree structure*, or in this case, the *org chart* that we are defining.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.perent_reference.find();
{ "_id" : 4, "name" : "Carlos", "title" : "CRO", "reports_to" : 1 }
{ "_id" : 5, "name" : "Andrew", "title" : "VP Eng", "reports_to" : 2 }
{ "_id" : 6, "name" : "Ron", "title" : "VP PM", "reports_to" : 2 }
{ "_id" : 7, "name" : "Elyse", "title" : "COO", "reports_to" : 2 }
{ "_id" : 8, "name" : "Richard", "title" : "VP PS", "reports_to" : 1 }
{ "_id" : 9, "name" : "Shannon", "title" : "VP Education", "reports_to" : 5 }
{ "_id" : 10, "name" : "Dan", "title" : "VP Core Engineering", "reports_to" : 5 }
{ "_id" : 11, "name" : "Cailin", "title" : "VP Cloud Engineering", "reports_to" : 5 }
{ "_id" : 2, "name" : "Eliot", "title" : "CTO", "reports_to" : 1 }
{ "_id" : 3, "name" : "Meagen", "title" : "CMO", "reports_to" : 1 }
{ "_id" : 1, "name" : "Dev", "title" : "CEO" }
```

So for example, here we can see that *Carlos, our CRO, reports to 1*. And *1* referring to the *_id*, the primary key, of *Dev*, which is our *CEO*. So we're going to have a *1* to *end* relationship, where each document will point to its *reports_to*, which in turn will be then the *_id* field value of the *designated parent*. With this schema, it's quite easy to navigate between different documents.

So if I want to go from *Carlos* to his *reports_to*, or to whom he *reports to*, I just follow this and go directly to *Dev*, which is value *_id* equals *1*. So there's always a link between *reports_to* and *_id*. Now what happens if we want to know the full reporting structure of, for example, *Dev*. I want to know all of his direct reports but also his direct reports', reports. We can go and fetch, for example, *Dev's*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.perent_reference.find({ "name" : "Dev" });
{ "_id" : 1, "name" : "Dev", "title" : "CEO" }
```

And we know that he doesn't report to anyone but we have his *_id*. So if we want to know exactly who reports directly to *Dev*, we can use the reference and the value of his *_id* and find all of his direct reports.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.perent_reference.find({ "reports_to" : 1 });
{ "_id" : 4, "name" : "Carlos", "title" : "CRO", "reports_to" : 1 }
{ "_id" : 8, "name" : "Richard", "title" : "VP PS", "reports_to" : 1 }
{ "_id" : 2, "name" : "Eliot", "title" : "CTO", "reports_to" : 1 }
{ "_id" : 3, "name" : "Meagen", "title" : "CMO", "reports_to" : 1 }
```

If we want to know the full structure of reporting, well, we would just need to go back and forth to do the database to understand exactly, for each element or for each document that we find, check who *reports-to* and do the query again, based on his *_id*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.perent_reference.find({ "reports_to" : 2 });
{ "_id" : 5, "name" : "Andrew", "title" : "VP Eng", "reports_to" : 2 }
{ "_id" : 6, "name" : "Ron", "title" : "VP PM", "reports_to" : 2 }
{ "_id" : 7, "name" : "Elyse", "title" : "COO", "reports_to" : 2 }
```

Now this continuous *pinging* of the database is quite *inefficient*. For each request that we get, we need to *ping* the database again. The alternative to this operation will be to use our new operator *$graphLookup*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.perent_reference.aggregate([
    {
        $match: { name: "Eliot" }
    },
    {
        $graphLookup: {
            from: "perent_reference",
            startWith: "_id",
            connectFromField: "_id",
            connectToField: "reports_to",
            as: "all_reports"
        } 
    }
]).pretty();
```

So in this particular example here, I want to know the full reporting structure that reports to our *CTO, Eliot*. So to do this with *graphLookup*, we need to run a query similar to this. We start by matching the document that we want to start to analyze from with the *match* operator. So in this case, I want to find the reporting structure to *Eliot*, therefore, I'm going to *match* for all documents that contain this particular *name*.

And then we have the *graphLookup* operator that will retrieve all subsequent descendant documents from the *perent_reference*. So this will be a *self lookup*. Starting with the *id* value of the previous first encountered document, connecting from the field *_id*, this is the field I'm going to search on for the subsequent *graphLookups*, but we are going to be using the *reports_to* value to *match*, and use that to use for the subsequent queries. And then I'll be storing all documents that I encounter from the lockup up *as all_reports*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.perent_reference.aggregate([
    {
        $match: { name: "Eliot" }
    },
    {
        $graphLookup: {
            from: "perent_reference",
            startWith: "_id",
            connectFromField: "_id",
            connectToField: "reports_to",
            as: "all_reports"
        } 
    }
]);
{
    "_id" : 2,
    "name" : "Eliot",
    "title" : "CTO",
    "reports_to" : 1,
    "all_reports" : [
        {
            "_id" : 11,
            "name" : "Cailin",
            "title" : "VP Cloud Engineering",
            "reports_to" : 5
        },
        {
            "_id" : 10,
            "name" : "Dan",
            "title" : "VP Core Engineering",
            "reports_to" : 5
        },
        {
            "_id" : 5,
            "name" : "Andrew",
            "title" : "VP Eng",
            "reports_to" : 2
        },
        {
            "_id" : 6,
            "name" : "Ron",
            "title" : "VP PM",
            "reports_to" : 2
        },
        {
            "_id" : 9,
            "name" : "Shannon",
            "title" : "VP Education",
            "reports_to" : 5
        },
        {
            "_id" : 7,
            "name" : "Elyse",
            "title" : "COO",
            "reports_to" : 2
        },
    ]               
}
```

After I run this query, I'll find the document that I wanted, the one that *matches name equals Eliot*. I can see his *title*. And then I can find, thanks to the *graphLookup*, all his descendant *reports*. In this case, it's going to be *Cailin, Dan, Andrew, Ron, Shannon*, and *Elyse*. Now this just tells me all of the descendants beneath *Eliot*. So in this case, *graphLookup* will allow me to find all different *nodes* that are beneath a particular node that I'm finding.

We can also ask the reverse question, which is, given an element on the *org chart*, what is the hierarchy to upper levels of reporting? So for example, if I give the *VP of Education*, I want to know the full structure till I get to the top parent of our tree, root level.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.perent_reference.aggregate([
    {
        $match: { name: "Shannon" }
    },
    {
        $graphLookup: {
            from: "perent_reference",
            startWith: "$reports_to",
            connectFromField: "reports_to",
            connectToField: "_id",
            as: "bosses"
        } 
    }
]).pretty();
```

To do that, what we need to do is, again, *match* on the element that we are interested on, in this case *Shannon*, and then invert the *connectFrom* and *connectTo* fields, but also starting with the different *startWith* value. In this case, we're going to be starting with *reports_to*. *connectFrom* will be also *reports_to* but the connect field, the value that we're going to pick up to match against *reports_to* will be *_id*. And we're going to be storing that information, that chain, into a field called *bosses*. Once I run this, I can see that *Shannon* has the set of *bosses*. He has *Dev, Eliot, and, obviously, his direct boss, Andrew*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.perent_reference.aggregate([
    {
        $match: { name: "Shannon" }
    },
    {
        $graphLookup: {
            from: "perent_reference",
            startWith: "$reports_to",
            connectFromField: "reports_to",
            connectToField: "_id",
            as: "bosses"
        } 
    }
]).pretty();
{
    "_id" : 9,
    "name" : "Shannon",
    "title" : "VP Education",
    "reports_to" : 5
    "bosses" : [
        {
            "_id" : 1,
            "name" : "Dev",
            "title" : "CEO"
        },  
        {
            "_id" : 2,
            "name" : "Eliot",
            "title" : "CTO",
            "reports_to" : 1
        },
        {
            "_id" : 5,
            "name" : "Andrew",
            "title" : "VP Eng",
            "reports_to" : 2
        },
    ]               
}
```

### $graphLookup: Simple Lookup Reverse Schema

Another pattern that we can apply will be to have the reverse referencing. Let's say that in this case, we're going to have the definition of our *CEO*, but inside of that document we're going to have the reference to all his direct reports, its *children nodes*. Same thing for *CTO*, we can be referencing all of its *immediate reports*, and the same thing down the line. To do this, we just need to transform our documents. Instead of having a *reference back to its parents*, what we're going to have is each single document *referencing is direct reports*.

|              |                 | CEO |              |     |
|--------------|-----------------|-----|--------------|-----|
|      CMO     |       CRO       | CTO | SVP Services | CFO |
|              | SVP Engineering |     |  VP Product  |     |
| VP Education |     VP Cloud    |     |    VP Core   |     |

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.child_reference.findOne({ "name" : "Dev" });
{
    "_id" : 1,
    "name" : "Dev",
    "title" : "CEO"
    "direct_reports" : [
        "Eliot",
        "Meagen",
        "Carlos",
        "Richard",
        "Kristen"
    ]       
}
```

In this example here, we can see that *Dev*, with his title of *CEO*, has this list of *direct reports, Eliot, Meagan, Carlos, Richard, and Kristen*. With this structure, getting immediate children can be achieved by a single operation. If I find documents where *name equals Dev*, I immediately get its full list of direct reports. So a level down from *Dev*. But getting the full tree to its last element requires something more elaborate. And again, *$graphLookup* is here for the rescue with one single operation.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.child_reference.aggregate([
    {
        $match: { name: "Dev" }
    },
    {
        $graphLookup: {
            from: "child_reference",
            startWith: "$direct_reports",
            connectFromField: "direct_reports",
            connectToField: "name",
            as: "all_reports"
        } 
    }
]).pretty();
```

In this scenario, we changed the document schema, starting with the immediate *child_reference*, again, on *direct_reports*. And therefore, if we want to get the full list of descendants we will need to do the following. We will go through again the same *matching*, finding the *node - (name: "Dev")* where we want to begin with, expressing where are we going to fetch the information *from - (child_reference)*.

In this case, again, a self *graphLookup*, self lookup. We're going to *startWith: "$direct_reports"*, so this is the first set of values that we're going to be using to iterate from. We're going to *connectFromField: "direct_reports"*, going to be using that for the *subsequent graph queries*, but we are going to *connectToField: "name"*. So every time we *match an element of direct reports with a name*, we'll do this recursively. And we'll start this in *as: "all_reports"*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.child_reference.aggregate([
    {
        $match: { name: "Dev" }
    },
    {
        $graphLookup: {
            from: "child_reference",
            startWith: "$direct_reports",
            connectFromField: "direct_reports",
            connectToField: "name",
            as: "all_reports"
        } 
    }
]).pretty();
{
    "_id" : 1,
    "name" : "Dev",
    "title" : "CEO"
    "direct_reports" : [
        "Eliot",
        "Meagen",
        "Carlos",
        "Richard",
        "Kristen"
    ],
    "all_reports" : [
        {
            "_id" : 10,
            "name" : "Dan",
            "title" : "VP Core Engineering"
        },  
        {
            "_id" : 9,
            "name" : "Shannon",
            "title" : "VP Education"
        },
        {
            "_id" : 7,
            "name" : "Elyse",
            "title" : "COO"
        },
        {
            "_id" : 6,
            "name" : "Ron",
            "title" : "VP PM"
        },
        {
            "_id" : 5,
            "name" : "Andrew",
            "title" : "VP Eng"
        },
        {
            "_id" : 11,
            "name" : "Cailin",
            "title" : "VP Cloud Engineering"
        },
        {
            "_id" : 4,
            "name" : "Carlos",
            "title" : "CRO"
        },
        {
            "_id" : 8,
            "name" : "Richard",
            "title" : "VP PS"
        },
        {
            "_id" : 3,
            "name" : "Meagen",
            "title" : "CMO"
        },  
        {
            "_id" : 2,
            "name" : "Eliot",
            "title" : "CTO",
            "direct_reports" : [
                "Andrew",
                "Elyse",
                "Ron",
            ]       
        }
    ]      
}    
```

Once we run this, we'll have the following structure. We'll find that *Dev* has a set of *direct_reports*, but *all_reports* are going to be *matched* and found on this field. We're going to have *Dan, Shannon, Elyse, Ron, Andrew*, and so on.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> direct_reports -> name, -> direct_reports -> name ...
```

So at the very end, what we have is basically, for all different *direct reports*, we match, or are trying to find, a document in the *name field*. And for his *direct reports*, we do this recursively.

### $graphLookup: maxDepth and depthField

|  Dev |         |      |         |
|:----:|---------|------|---------|
| \|-> |  Eliot  | \|-> | Andrew  |
|      |  Meagen |      |  Elyse  |
|      | Richard |      |   Ron   |

In some situations, we might not be interested on the full list. Let's say, for example, that we only want *Dev's direct reports and their direct reports*. So let's say two levels down. Now a *single lookup* is depth zero, meaning that if we match for *Dev* and we are only interested on knowing the documents of its *direct reports*, we just need to set the *depth* of our *lookup to zero*. But if we want to do two levels down, we would need to have a *depth of one*. And therefore, we'll find a full *data structures of Andrew, Elyse, and Ron*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.child_reference.aggregate([
    {
        $match: { name: "Dev" }
    },
    {
        $graphLookup: {
            from: "child_reference",
            startWith: "$direct_reports",
            connectFromField: "direct_reports",
            connectToField: "name",
            as: "till_2_level_reports",
            maxDepth: 1
        } 
    }
]).pretty();
```

*Graph lookup* allows us to do that. Using the previous dataset, *child reference*, where we have a *direct reports* reference inside of each document. If you want to go two levels down, *till_2_level down reports*, you just specify a *maxDepth field, value equals 1*, on our *graphLookup*. After we run this, we have our matching documents.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.child_reference.aggregate([
    {
        $match: { name: "Dev" }
    },
    {
        $graphLookup: {
            from: "child_reference",
            startWith: "$direct_reports",
            connectFromField: "direct_reports",
            connectToField: "name",
            as: "till_2_level_reports",
            maxDepth: 1
        } 
    }
]).pretty();
{
    "_id" : 1,
    "name" : "Dev",
    "title" : "CEO"
    "direct_reports" : [
        "Eliot",
        "Meagen",
        "Carlos",
        "Richard",
        "Kristen"
    ],
    "till_2_level_reports" : [
        {
            "_id" : 7,
            "name" : "Elyse",
            "title" : "COO"
        },
        {
            "_id" : 6,
            "name" : "Ron",
            "title" : "VP PM"
        },
        {
            "_id" : 5,
            "name" : "Andrew",
            "title" : "VP Eng"
            "direct_reports" : [
                "Cailin",
                "Dan",
                "Shannon"
            ]       
        },
        {
            "_id" : 4,
            "name" : "Carlos",
            "title" : "CRO"
        },
        {
            "_id" : 8,
            "name" : "Richard",
            "title" : "VP PS"
        },
        {
            "_id" : 2,
            "name" : "Eliot",
            "title" : "CTO",
            "direct_reports" : [
                "Andrew",
                "Elyse",
                "Ron",
            ]       
        }
    ]      
}
```

And then the list of results of *direct reports to Dev up to two levels down*. So we can see here that, for example, *Andrew* will be listed, as well as *Ron* and *Elyse*, and obviously, all of *Dev's direct reports*. So basically, *maxDepth* will restrict how many times we want to recursively find documents that match, or they are connected using the *FromField and the connecToField*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.child_reference.aggregate([
    {
        $match: { name: "Dev" }
    },
    {
        $graphLookup: {
            from: "child_reference",
            startWith: "$direct_reports",
            connectFromField: "direct_reports",
            connectToField: "name",
            as: "descendants",
            maxDepth: 1,
            depthField: "level"
        } 
    }
]).pretty();
```

But let's say that, apart from defining a *maxDepth* field of *1*, I only want to go two levels down, I also want to know *how far away* are those elements to the first element that I find in my *lookup*. Basically, I want to know how many *recursive lookups* did I need to do to find the particular documents. For that, I have *depthField*, which I can specify a *field name* which will tell me exactly that, how many *recursive lookups* were needed to get this particular point.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.child_reference.aggregate([
...     {
...         $match: { name: "Dev" }
...     },
...     {
...         $graphLookup: {
...             from: "child_reference",
...             startWith: "$direct_reports",
...             connectFromField: "direct_reports",
...             connectToField: "name",
...             as: "descendants",
...             maxDepth: 1,
...             depthField: "level"
...         } 
...     }
... ]).pretty();
{
        "_id" : 1,
        "name" : "Dev",
        "title" : "CEO",
        "direct_reports" : [
            "Eliot",
            "Meagen",
            "Carlos",
            "Richard",
            "Kristen"
        ],
        "descendants" : [
            {
                "_id" : 7,
                "name" : "Elyse",
                "title" : "COO",
                "level" : NumberLong(1)
            },
            {
                "_id" : 5,
                "name" : "Andrew",
                "title" : "VP Eng",
                "direct_reports" : [
                    "Cailin",
                    "Dan",
                    "Shannon"
                ],
                "level" : NumberLong(1)
            },
            {
                "_id" : 8,
                "name" : "Richard",
                "title" : "VP PS",
                "level" : NumberLong(0)
            },
            {
                "_id" : 4,
                "name" : "Carlos",
                "title" : "CRO",
                "level" : NumberLong(0)
            },
            {
                "_id" : 2,
                "name" : "Eliot",
                "title" : "CTO",
                "direct_reports" : [
                    "Andrew",
                    "Elyse",
                    "Ron"
                ],
                "level" : NumberLong(0)
            },
            {
                "_id" : 3,
                "name" : "Meagen",
                "title" : "CMO",
                "level" : NumberLong(0)
            },
            {
                "_id" : 6,
                "name" : "Ron",
                "title" : "VP PM",
                "level" : NumberLong(1)
            }
        ]
}

```

When I run this I can see that *Eliot is on number zero*, meaning that I only needed *one single lookup* to find it. Then again, it's the *first base lookup*. Same thing for *Meagan*, same thing for *Richard*, same thing for *Carlos*. But for *Andrew*, I need to go *two recursive lookups down*. Same thing for *Ron* and same thing for *Elyse*. By specifying *depth field level*, I can get the information of how many *recursive lookups* were needed to find that particular element on the *descendants field* here.

### $graphLookup: Cross Collection Lookup

So far we've been analyzing *graph lookup* on *self lookups*, meaning that we find a document then we implement the *graph lookup* and then we find also subsequent documents that match what I intended. And then I do another one on the self-join, and so forth, which is nice and fun but we can do a lot more than that. As in any other ordinary *lookup*, we can start from *one initial collection* and lookup *another collections*, and doing the *recursive lookups* as we see fit. Obviously, we don't need to restrict to just *one original document*. We have multiple, that will follow always the same behavior.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> show collections
air_airlines
air_routes
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_airlines.findOne();
{
    "_id" : ObjectId("56e9b497732b6122f8790287"),
    "airline" : 8,
    "name" : "247 Jet Ltd",
    "alias" : "",
    "iata" : "TWF",
    "icao" : "CLOUD RUNNER",
    "active" : "N",
    "country" : "United Kingdom",
    "base" : "FLS"
}
```

For this particular demonstration, I'm going to use this *air_airlines database* that I have here. So in this *air_airlines database*, what I have is *two collections*, one of them is *air_airlines* and another one is *air_routes*. In a particular *air_airlines document*, it's a pretty flat document, where I have all the information I need for a *particular airline*. Its *alias*, its *iata* code, the *country*, and where the *airline itself is based*, basically saying which airport is *base* to this home airline.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_routes.findOne();
{
    "_id" : ObjectId("56e9b39b732b6122f877fa31"),
    "airline" : {
        "id" : 410,
        "name" : "Aerocondor",
        "alias" : "2B",
        "iata" : "ARD"
    },
    "src_airport" : "CEK",
    "dst_airport" : "KZN",
    "codeshare" : "",
    "stops" : 0,
    "airplane" : "CR2"
}
```

On collection *air_routes*, what I can find is information on the *airline*, where does the flight depart from, the *src_airport*, where does it reach, the *dst_airport*, and some other information, like if it's *codeshare*, its *stops*, and the *type of airplane* or the *airplane* that actually is operating this particular route. So in this scenario, I'm going to have information on *airlines* and information on *routes*.

![airport-airplane-routes-white-world-map-vector-illustration-eps-file-airport-airplane-routes-white-world-map-vector-141200753](https://thumbs.dreamstime.com/z/airport-airplane-routes-white-world-map-vector-illustration-eps-file-airport-airplane-routes-white-world-map-vector-141200753.jpg)

So if you imagine this very image of map of the world, where we have the points identifying the *airports*, and the *routes* connecting these dots, giving an *airline* that operates certain *routes*. We can try to identify that from a given *airport*, where the *airline is based out*. Where can I go with a maximum, for example, of one layover?

Say that I want to go from this particular place here, where can I go through? I have at least three different *routes* departing here. But from those *routes* I can go multiple other ways, depending on the number of layovers that I want to do. If I want a list of all connections, and by restricting, for example, the number layovers, or something like that, we can do that using *graph lookup*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_airlines.aggregate([
    {
        $match: { name: "TAP Portugal" }
    },
    {
        $graphLookup: {
            from: "air_routes",
            as: "chain",
            startWith: "$base",
            connectFromField: "dst_airport",
            connectToField: "src_airport",
            maxDepth: 1
        } 
    }
]).pretty();
```

So again, if I want to start with *TAP Portugal*, finding its own *base airport* and knowing every single *destination*, regardless of the *airline*, that I can go from its *base airport*, in this case, *Portugal* -- my home town, very lovely city -- where can I go with a maximum of one connection? The full list of connected the airports will be given by this query.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_airlines.aggregate([
    {
        $match: { name: "TAP Portugal" }
    },
    {
        $graphLookup: {
            from: "air_routes",
            as: "chain",
            startWith: "$base",
            connectFromField: "dst_airport",
            connectToField: "src_airport",
            maxDepth: 1
        } 
    }
]).pretty();
{
        "_id" : ObjectId("56e9b497732b6122f879157b"),
        "airline" : 4869,
        "name" : "TAP Portugal",
        "alias" : "TP",
        "iata" : "TAP",
        "icao" : "AIR PORTUGAL",
        "active" : "Y",
        "country" : "Portugal",
        "base" : "OPO",
        "chain" : [
            {
                "_id" : ObjectId("56e9b39c732b6122f878737c"),
                "airline" : {
                    "id" : 2684,
                    "name" : "Harmony Airways",
                    "alias" : "HQ",
                    "iata" : "HMY"
                },
                "src_airport" : "BRU",
                "dst_airport" : "PMI",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "320 319"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878c9ac"),
                "airline" : {
                    "id" : 8745,
                    "name" : "Transavia France",
                    "alias" : "TO",
                    "iata" : "TVF"
                },
                "src_airport" : "FAO",
                "dst_airport" : "EMA",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "73H"
            },
            {
                "_id" : ObjectId("56e9b39b732b6122f87833a9"),
                "airline" : {
                    "id" : 1355,
                    "name" : "British Airways",
                    "alias" : "BA",
                    "iata" : "BAW"
                },
                "src_airport" : "LHR",
                "dst_airport" : "HAJ",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "319"
            },
            {
                "_id" : ObjectId("56e9b39b732b6122f878514f"),
                "airline" : {
                    "id" : 3737,
                    "name" : "Norwegian Air Shuttle",
                    "alias" : "DY",
                    "iata" : "NAX"
                },
                "src_airport" : "BCN",
                "dst_airport" : "ARN",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "73H"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f8787885"),
                "airline" : {
                    "id" : 2822,
                    "name" : "Iberia Airlines",
                    "alias" : "IB",
                    "iata" : "IBE"
                },
                "src_airport" : "BCN",
                "dst_airport" : "SCQ",
                "codeshare" : "Y",
                "stops" : 0,
                "airplane" : "320"
            },
            {
                "_id" : ObjectId("56e9b39b732b6122f877fc30"),
                "airline" : {
                    "id" : 9818,
                    "name" : "Air Arabia Maroc",
                    "alias" : "3O",
                    "iata" : "\\N"
                },
                "src_airport" : "AMS",
                "dst_airport" : "NDR",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "320"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878b730"),
                "airline" : {
                    "id" : 4304,
                    "name" : "SATA International",
                    "alias" : "S4",
                    "iata" : "RZO"
                },
                "src_airport" : "LGW",
                "dst_airport" : "PDL",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "320"
            }
        ]
}
```

I can see from one of the results, that I am going all the way to *Athens* passing through *Gatwick Airport in London*. Now comparing *maxDepth* here, we're using *one instead of zero*, is because we are starting from *airlines* and searching on *routes*. And *maxDepth* only will restrict the number of *recursive lookups* on the *from collection*. So I started collecting the matching document that I want and then I'm going to only *graph lookup* twice, the first one and another one, on the *route's collection*. Previously, we used the same value for the *two levels down* since we were doing a *self-recursive lookup*.

But let's say that, starting from a particular *airport* and connecting to all other *airport*, regardless of the *airlines*, is not really what I was intending. Not only I want to start from the *base airport* of a given *airline*, I also want to make sure that all flights that I'm connecting with are using the exactly same *airline*. So I don't want to connect from, for example, *Porto to New York* and then the next hop to be on a different *airline*. No, not at all. I want to make sure I'm always using the same carrier all the way through its network.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_airlines.aggregate([
    {
        $match: { name: "TAP Portugal" }
    },
    {
        $graphLookup: {
            from: "air_routes",
            as: "chain",
            startWith: "$base",
            connectFromField: "dst_airport",
            connectToField: "src_airport",
            maxDepth: 1,
            restrictSearchWithMatch: { "airline.name": "TAP Portugal" }
        } 
    }
]).pretty();
```

To do that we can also restrict the search with a *match*. And in this case, I want to make sure that the only *lookups* that I'd retrieve match the *airline name* with the same one that I'm originally intending, in this case, *TAP Portugal*. So what are we doing? We're matching on *airlines*, finding the *airline document* that matches name equals *TAP Portugal*, We're going to *graphLookup* from *air_routes*, setting up the values in *chain*, using as initial value of the *base airport* of this original documents.

Connecting the *destination airport* with the *source airport*, So the value of *destination airport* will be using this *recursive query over the field source airport with a maximum of one hop*. So I only want one layover. But always using the same *airline*. Once I do this, I can have the full list of all connections that I intended, always traveling within the same *airline*.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.air_airlines.aggregate([
...     {
...         $match: { name: "TAP Portugal" }
...     },
...     {
...         $graphLookup: {
...             from: "air_routes",
...             as: "chain",
...             startWith: "$base",
...             connectFromField: "dst_airport",
...             connectToField: "src_airport",
...             maxDepth: 1,
...             restrictSearchWithMatch: { "airline.name": "TAP Portugal" }
...         } 
...     }
... ]).pretty();
{
        "_id" : ObjectId("56e9b497732b6122f879157b"),
        "airline" : 4869,
        "name" : "TAP Portugal",
        "alias" : "TP",
        "iata" : "TAP",
        "icao" : "AIR PORTUGAL",
        "active" : "Y",
        "country" : "Portugal",
        "base" : "OPO",
        "chain" : [
            {
                "_id" : ObjectId("56e9b39c732b6122f878cbae"),
                "airline" : {
                    "id" : 4869,
                    "name" : "TAP Portugal",
                    "alias" : "TP",
                    "iata" : "TAP"
                },
                "src_airport" : "BRU",
                "dst_airport" : "LIS",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "319 321 320 100"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878cbc5"),
                "airline" : {
                    "id" : 4869,
                    "name" : "TAP Portugal",
                    "alias" : "TP",
                    "iata" : "TAP"
                },
                "src_airport" : "FCO",
                "dst_airport" : "LIS",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "320 321 319"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878cbd4"),
                "airline" : {
                    "id" : 4869,
                    "name" : "TAP Portugal",
                    "alias" : "TP",
                    "iata" : "TAP"
                },
                "src_airport" : "GVA",
                "dst_airport" : "OPO",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "320 319"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878cbb3"),
                "airline" : {
                    "id" : 4869,
                    "name" : "TAP Portugal",
                    "alias" : "TP",
                    "iata" : "TAP"
                },
                "src_airport" : "CCS",
                "dst_airport" : "FNC",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "332"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878cc1d"),
                "airline" : {
                    "id" : 4869,
                    "name" : "TAP Portugal",
                    "alias" : "TP",
                    "iata" : "TAP"
                },
                "src_airport" : "LIS",
                "dst_airport" : "POA",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "332"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878cbe2"),
                "airline" : {
                    "id" : 4869,
                    "name" : "TAP Portugal",
                    "alias" : "TP",
                    "iata" : "TAP"
                },
                "src_airport" : "LIS",
                "dst_airport" : "ACC",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "320"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878cbe5"),
                "airline" : {
                    "id" : 4869,
                    "name" : "TAP Portugal",
                    "alias" : "TP",
                    "iata" : "TAP"
                },
                "src_airport" : "LIS",
                "dst_airport" : "BIO",
                "codeshare" : "Y",
                "stops" : 0,
                "airplane" : "ER4 100"
            },
            {
                "_id" : ObjectId("56e9b39c732b6122f878cbf4"),
                "airline" : {
                    "id" : 4869,
                    "name" : "TAP Portugal",
                    "alias" : "TP",
                    "iata" : "TAP"
                },
                "src_airport" : "LIS",
                "dst_airport" : "CPH",
                "codeshare" : "",
                "stops" : 0,
                "airplane" : "321 320"
            }
        ]
}
MongoDB Enterprise Cluster0-shard-0:PRIMARY>
```

### $graphLookup: General Considerations

So now don't forget about the underlying restrictions of running *aggregation pipelines*. The first thing I want to raise your attention to is the *memory allocation*. The *dollar graph lookup*, due to its *recursive nature*, and the fact that it might bring back *several thousand megabytes of memory*, just on a single query may require significant amount of memory to operate properly, not only due to the *recursiveness*, but also given the complexity of the documents and how broad your queries might be. So *allowDiskUse* will be your friend.

Another important thing to keep in mind is the use of *indexes*. Now in *MongoDB*, as in any other *database, indexes* will accelerate or might accelerate our queries. In the case of *graph lookup*, having our *connectToField*, which is the field in the *from collection* that we're going to be using on the *recursive query*. Having this particular field *indexed* will be a good, good thing.

Another important aspect to take into consideration is the fact that they our *from collection cannot be sharded*. So if you are using *graph lookup stage*, we cannot use a *shard collection in our from collection*. Also, *unrelated match stages* do not get pushed before *graph lookup in the pipeline*. Therefore, they will not be optimized if they are not related with the *dollar graph lookup operator*. So keep that in mind when building your pipeline.

Now, and last important thing is, giving its *recursive lookup* nature, *dollar graph lookup makes it allow memory usage* without *spilling to disk*. Take that into consideration. Even though that you are using *allow disk use*, this may still exceed the *100 megabytes of maximum memory allowed per aggregation pipeline*.

### Lab: $graphLookup

#### Problem 10

Now that you have been introduced to *$graphLookup*, let's use it to solve an interesting need. You are working for a travel agency and would like to find routes for a client! For this exercise, we'll be using the *air_airlines, air_alliances, and air_routes* collections in the *aggregations database*.

* The *air_airlines* collection will use the following schema:

```javascript
{
    "_id" : ObjectId("56e9b497732b6122f8790280"),
    "airline" : 4,
    "name" : "2 Sqn No 1 Elementary Flying Training School",
    "alias" : "",
    "iata" : "WYT",
    "icao" : "",
    "active" : "N",
    "country" : "United Kingdom",
    "base" : "HGH"
}
```

* The air_routes collection will use this schema:

```javascript
{
    "_id" : ObjectId("56e9b39b732b6122f877fa31"),
    "airline" : {
            "id" : 410,
            "name" : "Aerocondor",
            "alias" : "2B",
            "iata" : "ARD"
    },
    "src_airport" : "CEK",
    "dst_airport" : "KZN",
    "codeshare" : "",
    "stops" : 0,
    "airplane" : "CR2"
}
```

* Finally, the air_alliances collection will show the airlines that are in each alliance, with this schema:

```javascript
{
    "_id" : ObjectId("581288b9f374076da2e36fe5"),
    "name" : "Star Alliance",
    "airlines" : [
            "Air Canada",
            "Adria Airways",
            "Avianca",
            "Scandinavian Airlines",
            "All Nippon Airways",
            "Brussels Airlines",
            "Shenzhen Airlines",
            "Air China",
            "Air New Zealand",
            "Asiana Airlines",
            "Copa Airlines",
            "Croatia Airlines",
            "EgyptAir",
            "TAP Portugal",
            "United Airlines",
            "Turkish Airlines",
            "Swiss International Air Lines",
            "Lufthansa",
            "EVA Air",
            "South African Airways",
            "Singapore Airlines"
    ]
}
```

Determine the approach that satisfies the following question in the most efficient manner:

* Find the list of all possible distinct destinations, with at most one layover, departing from the base airports of airlines from Germany, Spain or Canada that are part of the "OneWorld" alliance. Include both the destination and which airline services that location. As a small hint, you should find 158 destinations.

Select the correct pipeline from the following set of options:

#### Answer 10

```javascript
/*
University's Solution: For this lab the correct answer would be
*/
db.air_alliances.aggregate([
  {
    $match: { name: "OneWorld" }
  },
  {
    $graphLookup: {
      startWith: "$airlines",
      from: "air_airlines",
      connectFromField: "name",
      connectToField: "name",
      as: "airlines",
      maxDepth: 0,
      restrictSearchWithMatch: {
        country: { $in: ["Germany", "Spain", "Canada"] }
      }
    }
  },
  {
    $graphLookup: {
      startWith: "$airlines.base",
      from: "air_routes",
      connectFromField: "dst_airport",
      connectToField: "src_airport",
      as: "connections",
      maxDepth: 1
    }
  },
  {
    $project: {
      validAirlines: "$airlines.name",
      "connections.dst_airport": 1,
      "connections.airline.name": 1
    }
  },
  { $unwind: "$connections" },
  {
    $project: {
      isValid: {
        $in: ["$connections.airline.name", "$validAirlines"]
      },
      "connections.dst_airport": 1
    }
  },
  { $match: { isValid: true } },
  {
    $group: {
      _id: "$connections.dst_airport"
    }
  }
])
/*
This pipeline takes the most selective collection first, air_alliances, matching the document refering to the OneWorld alliance.
*/
db.air_alliances.aggregate([
{
  $match: { name: "OneWorld" }
}
/*
It then iterates, with maxDepth 0 on the air_airlines collection to collect the details on the airlines, specially their base airport, but restricting that $lookup to airlines of the requested countries [Spain, Germany, Canada], using restrictSearchWithMatch.
*/
{
  $graphLookup: {
    startWith: "$airlines",
    from: "air_airlines",
    connectFromField: "name",
    connectToField: "name",
    as: "airlines",
    maxDepth: 0,
    restrictSearchWithMatch: {
      country: { $in: ["Germany", "Spain", "Canada"] }
    }
  }
}
/*
We then iterate over all routes up to maximum of one layover by setting our maxDepth to 1. We find all possible destinations when departing from the base airport of each carrier by specify $airlines.base in startWith
*/
{
  $graphLookup: {
    startWith: "$airlines.base",
    from: "air_routes",
    connectFromField: "dst_airport",
    connectToField: "src_airport",
    as: "connections",
    maxDepth: 1
  }
}
/*
We now have a document with a field named connections that is an array of all routes that are within 1 layover. We use a $project here to remove unnecessary information from the documents. We also need to include information about valid airlines that match our initial restriction and the name of the current airline.
*/
{
  $project: {
    validAirlines: "$airlines.name",
    "connections.dst_airport": 1,
    "connections.airline.name": 1
  }
}
/*
After this, we'll unwind our connections array, and then use $project to add a field representing whether this particular route is valid, meaning it is a route flown by one of our desired carriers.
*/
{ $unwind: "$connections" },
{
  $project: {
    isValid: {
      $in: ["$connections.airline.name", "$validAirlines"]
    },
    "connections.dst_airport": 1
  }
}
/*
Lastly, we use $match to filter out invalid routes, and then $group them on the destination.
*/
{ $match: { isValid: true } },
{
  $group: {
    _id: "$connections.dst_airport"
  }
}
/*
An important aspect to this pipeline is that the first $graphLookup will act as a regular $lookup since we are setting a maxDepth to zero. The reason why we are taking this approach is due to the match restriction that $graphLookup allows, which can make this stage more efficient. Think back to the earlier lab on $lookup, can you think of a way to simplify the aggregation using $graphLookup instead?
*/


// Builds the pipeline.
var pipeline = [{
      $match: { name: "OneWorld" }
    }, {
      $graphLookup: {
        startWith: "$airlines",
        from: "air_airlines",
        connectFromField: "name",
        connectToField: "name",
        as: "airlines",
        maxDepth: 0,
        restrictSearchWithMatch: {
          country: { $in: ["Germany", "Spain", "Canada"] }
        }
      }
    }, {
      $graphLookup: {
        startWith: "$airlines.base",
        from: "air_routes",
        connectFromField: "dst_airport",
        connectToField: "src_airport",
        as: "connections",
        maxDepth: 1
      }
    }, {
      $project: {
        validAirlines: "$airlines.name",
        "connections.dst_airport": 1,
        "connections.airline.name": 1
      }
    },
    { $unwind: "$connections" },
    {
      $project: {
        isValid: { $in: ["$connections.airline.name", "$validAirlines"] },
        "connections.dst_airport": 1
      }
    },
    { $match: { isValid: true } },
    { $group: { _id: "$connections.dst_airport" } }
];

// Prints the result.
var result = db.air_alliances.aggregate(pipeline);
print("Result: ");
while (result.hasNext()) {
    printjson(result.next());
}
```

## Chapter 4: Core Aggregation - Multidimensional Grouping

### Facets: Introduction

Many of these cases require the ability to *manipulate, inspect, and analyze, data* across multiple dimensions. Apart from this, these use cases often required that this data categorization meets strict application as well *SLAs, service level agreements*, to enable *responsive Interfaces*. In *MongoDB 3.4*, we are introducing support for *facet navigation* enabling developers to quickly *create an interface that characterizes query results across multiple dimensions or facets*.

Application users can then narrow their query results by selecting a *facet value* as a subsequent filter providing an *intuitive interface to exploring a data set*. *Faceting navigation* is heavily used for browsing data catalogs and grouping the data in analytics use cases. Combining *facet navigation* with the functionality of the *MongoDB aggregation framework* provides a powerful way to manipulate data and analyze it. Extending *MongoDB* usage to a wider range of applications with minimum overhead.

What is *faceting*? *Faceting* is a popular *analytics capability* that allows users to explore data by applying *multiple filters and characterizations*. Using this approach an application classifies each information element along multiple explicit dimensions, called *facets*, enabling the classifications to be accessed in order, in multiple ways. For example, let's consider a user catalog for a popular social media -- sites like *LinkedIn*.

In this example let's do a search on the *catalog*. This search is looking for users with the term *MongoDB* somewhere in their profile. Initial results set return is roughly *200k users*. The location and current company *facets* can be used to further narrow down the results set according to certain criteria. For example, if a user chooses to limit the result's sets to only users in the *United States*, then the result set will narrow down to near *62k users*.

*Facets in MongoDB* are implemented using the *aggregation framework* and comprehend a few different stages. We will be covering *single facet queries, manual, automatic bucketing, and rendering multiple facets*. Well let's get ourselves busy working with *facets*.

### Facets: Single Facet Query

So let's get started working with *facets* and explore this new functionality to see what it brings. Now, to get a better picture of what we are going to do, let's imagine the following scenario. Let's imagine that we have an application that has some sort of search bar where we can look for things like *MongoDB*, for example. Once we press the Enter button looking for this particular keyword or term, we are generally prompt with some list of results. We might have some attributes, some indication of things related with this term given the catalog that we are searching on.

```javascript
vagrant@vagrant:~$ mongoimport companies_1.json --port 26000 -u m103-admin -p m103-pass --authenticationDatabase admin -d m103 --collection companies
2021-11-10T15:12:07.513+0000    connected to: localhost:26000
2021-11-10T15:12:09.101+0000    imported 100 documents
vagrant@vagrant:~$ mongo --port 26000 --username m103-admin --password m103-pass --authenticationDatabase admin
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:26000/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("c3252ef7-0c1d-471a-8ee8-900d8f75a12f") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-11-10T13:43:37.841+0000 I CONTROL  [main] ** WARNING: You are running this process as the root user, which is not recommended.
2021-11-10T13:43:37.841+0000 I CONTROL  [main] 
```

But we also might have some sort of filters or characterization for this search term in combination with several different dimensions that this information that we are storing in the catalog of this application might have. So to explain this very well, we're going to be using a very dear data set to you guys that we'll be exploring throughout the course.

```javascript
mongos> use m103
switched to db m103
mongos> show collections
companies
messages
products 
```

The data set that we're going to be looking into is the *Companies data set* that you can find on our *startups (m103)database*. With this, we're going to be exploring this data set as a catalog of *companies*, and how we can *organize, search, and find information and get facets* out of the data stored in that particular collection. So let's get started by looking through *one single document inside this Companies data set*.

```javascript
// find one company document
mongos> db.companies.findOne();
{
        "_id" : ObjectId("52cdef7c4bab8bd675297d8a"),
        "name" : "Wetpaint",
        "permalink" : "abc2",
        "crunchbase_url" : "http://www.crunchbase.com/company/wetpaint",
        "homepage_url" : "http://wetpaint-inc.com",
        "blog_url" : "http://digitalquarters.net/",
        "blog_feed_url" : "http://digitalquarters.net/feed/",
        "twitter_username" : "BachelrWetpaint",
        "category_code" : "web",
        "number_of_employees" : 47,
        "founded_year" : 2005,
        "founded_month" : 10,
        "founded_day" : 17,
        "deadpooled_year" : 1,
        "tag_list" : "wiki, seattle, elowitz, media-industry, media-platform, social-distribution-system",
        "alias_list" : "",
        "email_address" : "info@wetpaint.com",
        "phone_number" : "206.859.6300",
        "description" : "Technology Platform Company",
        "created_at" : ISODate("2007-05-25T06:51:27Z"),
        "updated_at" : "Sun Dec 08 07:15:44 UTC 2013",
        "overview" : "<p>Wetpaint is a technology platform company that uses its proprietary state-of-the-art technology and expertise in social media to build and monetize audiences for digital publishers. Wetpaint’s own online property, Wetpaint Entertainment, an entertainment news site that attracts more than 12 million unique visitors monthly and has over 2 million Facebook fans, is a proof point to the company’s success in building and engaging audiences. Media companies can license Wetpaint’s platform which includes a dynamic playbook tailored to their individual needs and comprehensive training. Founded by Internet pioneer Ben Elowitz, and with offices in New York and Seattle, Wetpaint is backed by Accel Partners, the investors behind Facebook.</p>",
        "image" : {
            "available_sizes" : [
                [
                    [
                        150,
                        75
                    ],
                    "assets/images/resized/0000/3604/3604v14-max-150x150.jpg"
                ],
                [
                    [
                        250,
                        125
                    ],
                    "assets/images/resized/0000/3604/3604v14-max-250x250.jpg"
                ],
                [
                    [
                        450,
                        225
                    ],
                    "assets/images/resized/0000/3604/3604v14-max-450x450.jpg"
                ]
            ]
        },
        "products" : [
            {
                "name" : "Wikison Wetpaint",
                "permalink" : "wetpaint-wiki"
            },
            {
                "name" : "Wetpaint Social Distribution System",
                "permalink" : "wetpaint-social-distribution-system"
            }
        ],
        "relationships" : [
            {
                "is_past" : false,
                "title" : "Co-Founder and VP, Social and Audience Development",
                "person" : {
                    "first_name" : "Michael",
                    "last_name" : "Howell",
                    "permalink" : "michael-howell"
                }
            },
            {
                "is_past" : false,
                "title" : "Co-Founder/CEO/Board of Directors",
                "person" : {
                    "first_name" : "Ben",
                    "last_name" : "Elowitz",
                    "permalink" : "ben-elowitz"
                }
            },
            {
                "is_past" : false,
                "title" : "COO/Board of Directors",
                "person" : {
                    "first_name" : "Rob",
                    "last_name" : "Grady",
                    "permalink" : "rob-grady"
                }
            },
            {
                "is_past" : false,
                "title" : "SVP, Strategy and Business Development",
                "person" : {
                    "first_name" : "Chris",
                    "last_name" : "Kollas",
                    "permalink" : "chris-kollas"
                }
            },
            {
                "is_past" : false,
                "title" : "Board",
                "person" : {
                    "first_name" : "Theresia",
                    "last_name" : "Ranzetta",
                    "permalink" : "theresia-ranzetta"
                }
            },
            {
                "is_past" : false,
                "title" : "Board Member",
                "person" : {
                    "first_name" : "Gus",
                    "last_name" : "Tai",
                    "permalink" : "gus-tai"
                }
            },
            {
                "is_past" : false,
                "title" : "Board",
                "person" : {
                    "first_name" : "Len",
                    "last_name" : "Jordan",
                    "permalink" : "len-jordan"
                }
            },
            {
                "is_past" : false,
                "title" : "Head of Technology and Product",
                "person" : {
                    "first_name" : "Alex",
                    "last_name" : "Weinstein",
                    "permalink" : "alex-weinstein"
                }
            },
            {
                "is_past" : true,
                "title" : "CFO",
                "person" : {
                    "first_name" : "Bert",
                    "last_name" : "Hogue",
                    "permalink" : "bert-hogue"
                }
            },
            {
                "is_past" : true,
                "title" : "CFO/ CRO",
                "person" : {
                    "first_name" : "Brian",
                    "last_name" : "Watkins",
                    "permalink" : "brian-watkins"
                }
            },
            {
                "is_past" : true,
                "title" : "Senior Vice President, Marketing",
                "person" : {
                    "first_name" : "Rob",
                    "last_name" : "Grady",
                    "permalink" : "rob-grady"
                }
            },
            {
                "is_past" : true,
                "title" : "VP, Technology and Product",
                "person" : {
                    "first_name" : "Werner",
                    "last_name" : "Koepf",
                    "permalink" : "werner-koepf"
                }
            },
            {
                "is_past" : true,
                "title" : "VP Marketing",
                "person" : {
                    "first_name" : "Kevin",
                    "last_name" : "Flaherty",
                    "permalink" : "kevin-flaherty"
                }
            },
            {
                "is_past" : true,
                "title" : "VP User Experience",
                "person" : {
                    "first_name" : "Alex",
                    "last_name" : "Berg",
                    "permalink" : "alex-berg"
                }
            },
            {
                "is_past" : true,
                "title" : "VP Engineering",
                "person" : {
                    "first_name" : "Steve",
                    "last_name" : "McQuade",
                    "permalink" : "steve-mcquade"
                }
            },
            {
                "is_past" : true,
                "title" : "Executive Editor",
                "person" : {
                    "first_name" : "Susan",
                    "last_name" : "Mulcahy",
                    "permalink" : "susan-mulcahy"
                }
            },
            {
                "is_past" : true,
                "title" : "VP Business Development",
                "person" : {
                    "first_name" : "Chris",
                    "last_name" : "Kollas",
                    "permalink" : "chris-kollas"
                }
            }
        ],
        "competitions" : [
            {
                "competitor" : {
                    "name" : "Wikia",
                    "permalink" : "wikia"
                }
            },
            {
                "competitor" : {
                    "name" : "JotSpot",
                    "permalink" : "jotspot"
                }
            },
            {
                "competitor" : {
                    "name" : "Socialtext",
                    "permalink" : "socialtext"
                }
            },
            {
                "competitor" : {
                    "name" : "Ning by Glam Media",
                    "permalink" : "ning"
                }
            },
            {
                "competitor" : {
                    "name" : "Soceeo",
                    "permalink" : "soceeo"
                }
            },
            {
                "competitor" : {
                    "name" : "Yola",
                    "permalink" : "yola"
                }
            },
            {
                "competitor" : {
                    "name" : "SocialGO",
                    "permalink" : "socialgo"
                }
            },
            {
                "competitor" : {
                    "name" : "IslamNor",
                    "permalink" : "islamnor"
                }
            }
        ],
        "providerships" : [ ],
        "total_money_raised" : "$39.8M",
        "funding_rounds" : [
            {
                "id" : 888,
                "round_code" : "a",
                "source_url" : "http://seattlepi.nwsource.com/business/246734_wiki02.html",
                "source_description" : "",
                "raised_amount" : 5250000,
                "raised_currency_code" : "USD",
                "funded_year" : 2005,
                "funded_month" : 10,
                "funded_day" : 1,
                "investments" : [
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "Frazier Technology Ventures",
                            "permalink" : "frazier-technology-ventures"
                        },
                        "person" : null
                    },
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "Trinity Ventures",
                            "permalink" : "trinity-ventures"
                        },
                        "person" : null
                    }
                ]
            },
            {
                "id" : 889,
                "round_code" : "b",
                "source_url" : "http://pulse2.com/2007/01/09/wiki-builder-website-wetpaint-welcomes-95m-funding/",
                "source_description" : "",
                "raised_amount" : 9500000,
                "raised_currency_code" : "USD",
                "funded_year" : 2007,
                "funded_month" : 1,
                "funded_day" : 1,
                "investments" : [
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "Accel Partners",
                            "permalink" : "accel-partners"
                        },
                        "person" : null
                    },
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "Frazier Technology Ventures",
                            "permalink" : "frazier-technology-ventures"
                        },
                        "person" : null
                    },
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "Trinity Ventures",
                            "permalink" : "trinity-ventures"
                        },
                        "person" : null
                    }
                ]
            },
            {
                "id" : 2312,
                "round_code" : "c",
                "source_url" : "http://www.accel.com/news/news_one_up.php?news_id=185",
                "source_description" : "Accel",
                "raised_amount" : 25000000,
                "raised_currency_code" : "USD",
                "funded_year" : 2008,
                "funded_month" : 5,
                "funded_day" : 19,
                "investments" : [
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "DAG Ventures",
                            "permalink" : "dag-ventures"
                        },
                        "person" : null
                    },
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "Accel Partners",
                            "permalink" : "accel-partners"
                        },
                        "person" : null
                    },
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "Trinity Ventures",
                            "permalink" : "trinity-ventures"
                        },
                        "person" : null
                    },
                    {
                        "company" : null,
                        "financial_org" : {
                            "name" : "Frazier Technology Ventures",
                            "permalink" : "frazier-technology-ventures"
                        },
                        "person" : null
                    }
                ]
            }
        ],
        "investments" : [ ],
        "acquisition" : {
            "price_amount" : 30000000,
            "price_currency_code" : "USD",
            "term_code" : "cash_and_stock",
            "source_url" : "http://allthingsd.com/20131216/viggle-tries-to-bulk-up-its-social-tv-business-by-buying-wetpaint/?mod=atdtweet",
            "source_description" : " Viggle Tries to Bulk Up Its Social TV Business by Buying Wetpaint",
            "acquired_year" : 2013,
            "acquired_month" : 12,
            "acquired_day" : 16,
            "acquiring_company" : {
                "name" : "Viggle",
                "permalink" : "viggle"
            }
        },
        "acquisitions" : [ ],
        "offices" : [
            {
                "description" : "",
                "address1" : "710 - 2nd Avenue",
                "address2" : "Suite 1100",
                "zip_code" : "98104",
                "city" : "Seattle",
                "state_code" : "WA",
                "country_code" : "USA",
                "latitude" : 47.603122,
                "longitude" : -122.333253
            },
            {
                "description" : "",
                "address1" : "270 Lafayette Street",
                "address2" : "Suite 505",
                "zip_code" : "10012",
                "city" : "New York",
                "state_code" : "NY",
                "country_code" : "USA",
                "latitude" : 40.7237306,
                "longitude" : -73.9964312
            }
        ],
        "milestones" : [
            {
                "id" : 5869,
                "description" : "Wetpaint named in Lead411's Hottest Seattle Companies list",
                "stoned_year" : 2010,
                "stoned_month" : 6,
                "stoned_day" : 8,
                "source_url" : "http://www.lead411.com/seattle-companies.html",
                "source_text" : null,
                "source_description" : "LEAD411 LAUNCHES \"HOTTEST SEATTLE COMPANIES\" AWARDS",
                "stoneable_type" : "Company",
                "stoned_value" : null,
                "stoned_value_type" : null,
                "stoned_acquirer" : null,
                "stoneable" : {
                    "name" : "Wetpaint",
                    "permalink" : "wetpaint"
                }
            },
            {
                "id" : 8702,
                "description" : "Site-Builder Wetpaint Makes One For Itself, Using the Demand Media Playbook",
                "stoned_year" : 2010,
                "stoned_month" : 9,
                "stoned_day" : 6,
                "source_url" : "http://mediamemo.allthingsd.com/20100906/site-builder-wetpaint-makes-one-for-itself-using-the-demand-media-playbook/",
                "source_text" : null,
                "source_description" : "All Things D",
                "stoneable_type" : "Company",
                "stoned_value" : null,
                "stoned_value_type" : null,
                "stoned_acquirer" : null,
                "stoneable" : {
                    "name" : "Wetpaint",
                    "permalink" : "wetpaint"
                }
            }
        ],
        "video_embeds" : [ ],
        "screenshots" : [
            {
                "available_sizes" : [
                    [
                        [
                            150,
                            86
                        ],
                        "assets/images/resized/0016/0929/160929v2-max-150x150.png"
                    ],
                    [
                        [
                            250,
                            143
                        ],
                        "assets/images/resized/0016/0929/160929v2-max-250x250.png"
                    ],
                    [
                        [
                            450,
                            258
                        ],
                        "assets/images/resized/0016/0929/160929v2-max-450x450.png"
                    ]
                ],
                "attribution" : null
            }
        ],
        "external_links" : [
            {
                "external_url" : "http://www.geekwire.com/2011/rewind-ben-elowitz-wetpaint-ceo-building-type-media-company",
                "title" : "GeekWire interview: Rewind - Ben Elowitz, Wetpaint CEO, on building a new type of media company"
            },
            {
                "external_url" : "http://techcrunch.com/2012/06/17/search-and-social-how-two-will-soon-become-one/",
                "title" : "Guest post by CEO Ben Elowitz in TechCrunch"
            },
            {
                "external_url" : "http://allthingsd.com/20120516/what-to-expect-when-facebook-is-expecting-five-predictions-for-facebooks-first-public-year/",
                "title" : "Guest post by CEO Ben Elowitz in AllThingsD"
            },
            {
                "external_url" : "http://adage.com/article/digitalnext/facebook-biggest-player-advertising-s-540-billion-world/235708/",
                "title" : "Guest post by CEO Ben Elowitz in AdAge"
            },
            {
                "external_url" : "http://www.businessinsider.com/facebook-captures-14-percent-of-our-online-attention-but-only-4-percent-of-ad-spending-online-2012-6",
                "title" : "Guest post by CEO Ben Elowitz in Business Insider"
            },
            {
                "external_url" : "http://allfacebook.com/wetpaint-media-data_b75963",
                "title" : "AllFacebook coverage of Wetpaint"
            },
            {
                "external_url" : "http://adage.com/article/digital/celeb-site-wetpaint-shows-media-profit-facebook/237828/",
                "title" : "Profile of Wetpaint in Ad Age"
            },
            {
                "external_url" : "http://allthingsd.com/20121018/how-to-boost-your-facebook-traffic-tips-and-tricks-from-wetpaint/",
                "title" : "Interview with Wetpaint CEO Ben Elowitz in All Things D"
            },
            {
                "external_url" : "http://www.xconomy.com/seattle/2012/10/19/wetpaint-starts-licensing-its-facebook-based-media-distribution-tech/",
                "title" : "Profile of Wetpaint in Xconomy"
            }
        ],
    "partners" : [ ]
}
```

As usual, you can find a bunch of information from *external links* to *awards and milestones and acquisitions and a bunch of other information* related to *one single company* listed on this data set. Now, what we might have is the need for us to search on a bunch of different dimensions. And for that we're going to be using a very straightforward search terms, like for example on *description and overview for companies* which are in some way related with networking. To express such a query, we're going to be creating a *text index on description and overview*.

```javascript
// create text index
mongos> db.companies.createIndex({"description": "text", "overview": "text"});
{
    "raw" : {
        "m103-example/localhost:27011,localhost:27012,localhost:27013" : {
            "createdCollectionAutomatically" : false,
            "numIndexesBefore" : 1,
            "numIndexesAfter" : 2,
            "ok" : 1
        }
    },
    "ok" : 1,
    "operationTime" : Timestamp(1636563918, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1636563918, 1),
        "signature" : {
            "hash" : BinData(0,"/fZkH+hOnUM6EH2WENAgHWcM5WM="),
            "keyId" : NumberLong("7006634394848854025")
        }
    }
}
```

And if you want to find the companies that have the keyword *"networking"* in their field -- either in *description or overview* -- we can use it by simply issuing the query where *Companies* can *aggregate and match* on tags searching for term *"network"*. Once we do this, we get a list of results.

```javascript
// find companies matching term `networking` using text search
db.companies.aggregate([ {"$match": { "$text": {"$search": "network"}  }  }] );
{
        "_id" : ObjectId("52cdef7c4bab8bd675297dbc"),
        "name" : "Skype",
        "permalink" : "skype",
        "crunchbase_url" : "http://www.crunchbase.com/company/skype",
        "homepage_url" : "http://www.skype.com",
        "blog_url" : "http://blogs.skype.com",
        "blog_feed_url" : "http://feeds.feedburner.com/shareskypeen",
        "twitter_username" : "skype",
        "category_code" : "software",
        "number_of_employees" : 0,
        "founded_year" : 2003,
        "founded_month" : 8,
        "founded_day" : null,
        "deadpooled_year" : null,
        "deadpooled_month" : null,
        "deadpooled_day" : null,
        "deadpooled_url" : "",
        "tag_list" : "phone, voip, sweden, skype",
        "alias_list" : "",
        "email_address" : "",
        "phone_number" : "94117733",
        "description" : "VoIP Software ",
        "created_at" : "Tue Jul 03 05:20:31 UTC 2007",
        "updated_at" : "Wed Dec 11 13:03:57 UTC 2013",
        "overview" : "<p>Skype is a software application that allows users to make voice and video calls and chats over the Internet. Calls to other users within the Skype service are free, while calls to both traditional landline telephones and mobile phones can be made for a fee using a debit-based user account system.  Skype was founded by <a href=\"/person/niklas-zennstrom\" title=\"Niklas Zennstrom\" rel=\"nofollow\">Niklas Zennstrom</a> and <a href=\"/person/janus-friis\" title=\"Janus Friis\" rel=\"nofollow\">Janus Friis</a> who were also the founders of the file sharing application <a href=\"/company/kazaa\" title=\"Kazaa\" rel=\"nofollow\">Kazaa</a>.</p>\n\n<p>Skype has also become popular for its additional features which include instant messaging, file transfer, and video conferencing. Skype has 663 million registered users as of 2010. </p>\n\n<p>Unlike other VoIP services, Skype is a peer-to-peer system rather than a client-server system, and makes use of background processing on computers running Skype software; the original name proposed &#8220;Sky peer-to-peer&#8221; reflects this.</p>\n\n<p>Some network administrators have banned Skype on corporate, government, home, and education networks, citing reasons such as inappropriate usage of resources, excessive bandwidth usage, and security concerns.</p>\n\n<p>On 10 May 2011, Microsoft Corporation agreed to acquire Skype Communications, US$8.5 billion. The company is to be incorporated as a division of Microsoft, and Microsoft will acquire all of the company&#8217;s technologies, including Skype, with the purchase.</p>",
        "image" : {
            "available_sizes" : [
                [
                    [
                        150,
                        66
                    ],
                    "assets/images/resized/0000/1387/1387v12-max-150x150.jpg"
                ],
                [
                    [
                        250,
                        110
                    ],
                    "assets/images/resized/0000/1387/1387v12-max-250x250.jpg"
                ],
                [
                    [
                        315,
                        139
                    ],
                    "assets/images/resized/0000/1387/1387v12-max-450x450.jpg"
                ]
            ],
            "attribution" : null
        },...
    }
    {
        "_id" : ObjectId("52cdef7c4bab8bd675297d9f"),
        "name" : "Viacom",
        "permalink" : "viacom",
        "crunchbase_url" : "http://www.crunchbase.com/company/viacom",
        "homepage_url" : "http://www.viacom.com",
        "blog_url" : "",
        "blog_feed_url" : "",
        "twitter_username" : "viacom",
        "category_code" : "web",
        "number_of_employees" : null,
        "founded_year" : 1971,
        "founded_month" : null,
        "founded_day" : null,
        "deadpooled_year" : null,
        "deadpooled_month" : null,
        "deadpooled_day" : null,
        "deadpooled_url" : null,
        "tag_list" : null,
        "alias_list" : "CBS",
        "email_address" : "",
        "phone_number" : "(212) 258-6000",
        "description" : "TV production",
        "created_at" : "Sat Jun 09 07:30:15 UTC 2007",
        "updated_at" : "Mon Apr 15 12:51:12 UTC 2013",
        "overview" : "<p>Viacom, short for &#8220;Video &amp; Audio Communications&#8221;, is an American media conglomerate with various worldwide interests in cable and satellite television networks (<a href=\"/company/mtv-networks\" title=\"MTV Networks\" rel=\"nofollow\">MTV Networks</a> and BET), and movie production and distribution with <a href=\"/company/paramount-pictures\" title=\"Paramount Motion Pictures Group.\" rel=\"nofollow\">Paramount Motion Pictures Group.</a></p>\n\n<p>The new Viacom conglomerate was finalized in September of 2006 is considered to be the &#8220;high-growth&#8221; side of the much larger former Viacom. The former Viacom was renamed <a href=\"/company/cbs\" title=\"CBS Corporation\" rel=\"nofollow\">CBS Corporation</a>, from which this firm was split off on December 31, 2005.</p>",
        "image" : {
            "available_sizes" : [
                [
                    [
                        150,
                        34
                    ],
                    "assets/images/resized/0001/6891/16891v1-max-150x150.png"
                ],
                [
                    [
                        158,
                        36
                    ],
                    "assets/images/resized/0001/6891/16891v1-max-250x250.png"
                ],
                [
                    [
                        158,
                        36
                    ],
                    "assets/images/resized/0001/6891/16891v1-max-450x450.png"
                ]
            ],
            "attribution" : null
        },...
    }
    {
        "_id" : ObjectId("52cdef7c4bab8bd675297dcb"),
        "name" : "Revision3",
        "permalink" : "revision3",
        "crunchbase_url" : "http://www.crunchbase.com/company/revision3",
        "homepage_url" : "http://www.revision3.com",
        "blog_url" : "http://revision3.com/blog/",
        "blog_feed_url" : "http://revision3.com/blog/feed",
        "twitter_username" : "Revision3",
        "category_code" : "games_video",
        "number_of_employees" : null,
        "founded_year" : 2005,
        "founded_month" : 4,
        "founded_day" : null,
        "deadpooled_year" : null,
        "deadpooled_month" : null,
        "deadpooled_day" : null,
        "deadpooled_url" : "",
        "tag_list" : "video, digg, msn",
        "alias_list" : "revision three",
        "email_address" : "info@revision3.com",
        "phone_number" : "(415) 734-3500",
        "description" : "Web television network",
        "created_at" : "Thu Jun 28 07:19:36 UTC 2007",
        "updated_at" : "Mon Jul 15 12:57:46 UTC 2013",
        "overview" : "<p>Revision3 is a TV network for the web, which creates and produces its own original entertainment and content.</p>\n\n<p>The content is designed for an Internet-savvy audience that seeks quality content about specific, narrow and in-depth topics, but quick production time that leverages lower costs.  With the proliferation of mobile video, iPods, Tivo and other Internet-connected set-top-boxes, Revision3 believes that tailored, on-demand video will continue to increase in importance versus traditional broadcast content developed for very broad audiences.  Revision3 video content focuses on technology, comedy, music, cooking, and other niche subjects.</p>\n\n<p>Revision3 attempts to be agnostic about how its content gets distributed. The company works with multiple distribution platforms, including iTunes, Odeo, Bittorrent, and Palm.  Revision3 also supports multiple video encoding formats, including flash, to help make content broadly accessible.</p>",
        "image" : {
            "available_sizes" : [
                [
                    [
                        150,
                        40
                    ],
                    "assets/images/resized/0000/0955/955v1-max-150x150.png"
                ],
                [
                    [
                        180,
                        49
                    ],
                    "assets/images/resized/0000/0955/955v1-max-250x250.png"
                ],
                [
                    [
                        180,
                        49
                    ],
                    "assets/images/resized/0000/0955/955v1-max-450x450.png"
                ]
            ],
            "attribution" : null
    },...
Type "it" for more
```

Now, let's assume that the application we're building, -- *our corporate catalog* -- not only wants to give the *end user* the result set, but also to render a *facet* describing the *category code*. Now, this is a field that will tell us the type of *company or sector* on which this particular company is operating. So basically, for that particular functionality, we now can use *SortByCounts*. *SortByCount* will allow us to create the *facet by category* on the list of results that the previous stage, *match*, will provide.

```javascript
// $sortByCount single query facet for the previous search
db.companies.aggregate([
    {"$match": { "$text": {"$search": "network"}  }  },
    {"$sortByCount": "$category_code"} 
]);
```

So for all the companies that will include *"network"* keyword on their *description or overview*, those will be *piped* into a *SortByCount* where we're going to be grouping the *category code*. Once we run this, we have a full list with their *count and sorted* of the sectors of activity where we can *find companies*. In this case, we're going to have *web with 9 companies* listed, *software with 1*, and so forth.

```javascript
mongos> db.companies.aggregate([
...     {"$match": { "$text": {"$search": "network"}  }  },
...     {"$sortByCount": "$category_code"} 
... ]);
{ "_id" : "web", "count" : 9 }
{ "_id" : "games_video", "count" : 8 }
{ "_id" : "mobile", "count" : 5 }
{ "_id" : "enterprise", "count" : 2 }
{ "_id" : "search", "count" : 2 }
{ "_id" : "messaging", "count" : 1 }
{ "_id" : "advertising", "count" : 1 }
{ "_id" : "news", "count" : 1 }
{ "_id" : "social", "count" : 1 }
{ "_id" : "software", "count" : 1 }
{ "_id" : "network_hosting", "count" : 1 }
{ "_id" : "hardware", "count" : 1 }
```

So *SortByCount*, groups incoming documents coming from our *match query* based on their specified expression, *"search for network"*, and then *computes the count* of the documents in each distinct group, and *sort by its count*. Each group is a document with two fields -- an *_id* specifying the value by which we are grouping, and the *counts* -- determining the *number of documents that match that group*.

If we want the same result, but let's say with instead of having the breakdown per *category*, we want it for *office location, city* -- something like that -- we could run an *aggregation pipeline* that's a little more elaborate than this simple one.

```javascript
// extend the pipeline for a more elaborate facet
db.companies.aggregate([
  {"$match": { "$text": {"$search": "network"}  }  },
  {"$unwind": "$offices"},
  {"$match": { "offices.city": {"$ne": ""}  }},
  {"$sortByCount": "$offices.city"}
]);
```

Let's say, for example, what we want is still *search* for *all companies* that have *"network"* keyword on their *description or overview*, but then, given that *offices is an array of different locations* that we might have, we want to *unwind* that particular array and then *match the offices which do have a city*. So they have this *city value different than empty*. For all that, let's *SortByCount* on the different *offices.city* values that we find.

```javascript
mongos> db.companies.aggregate([
...   {"$match": { "$text": {"$search": "network"}  }  },
...   {"$unwind": "$offices"},
...   {"$match": { "offices.city": {"$ne": ""}  }},
...   {"$sortByCount": "$offices.city"}
... ]);
{ "_id" : "San Francisco", "count" : 6 }
{ "_id" : "New York", "count" : 6 }
{ "_id" : "Los Angeles", "count" : 4 }
{ "_id" : "London", "count" : 2 }
{ "_id" : "Santa Clara", "count" : 2 }
{ "_id" : "Menlo Park", "count" : 2 }
{ "_id" : "Mountain View", "count" : 1 }
{ "_id" : "Cambridge", "count" : 1 }
{ "_id" : "Boston", "count" : 1 }
{ "_id" : "Luxembourg City", "count" : 1 }
{ "_id" : "Seattle", "count" : 1 }
{ "_id" : "Palo Alto", "count" : 1 }
{ "_id" : "Pleasanton", "count" : 1 }
{ "_id" : "SCHUYLER LAKE", "count" : 1 }
{ "_id" : "Sunnyvale", "count" : 1 }
{ "_id" : "Amsterdam", "count" : 1 }
{ "_id" : "San Diego", "count" : 1 }
{ "_id" : "West Hollywood", "count" : 1 }
{ "_id" : "Dublin", "count" : 1 }
{ "_id" : "Oxford", "count" : 1 }
Type "it" for more
```

So there we go. We now have a list of documents specifying the value of the *office city* -- in this case, for example, *San Francisco* with a count of *6*. *New York* also have *6* -- *London, Los Angeles, Palo Alto*, and so on. So this is also to demonstrate that we can have *elaborate pipelines* that would filter *project, match, group*, determine the list of documents that then can use to *sort by and count* given one of the attributes that is coming with the result set to this last stage of the pipeline. In essence, with this *aggregation inquiry*, we can have the breakdown of *companies per city* that *match networking*, or in this case, *"network"*, in their *description & overview*.

#### Problem 11

Which of the following aggregation pipelines are single facet queries?

Single query facets are supported by the new aggregation pipeline stage *$sortByCount*.

As like any other aggregation pipelines, except for *$out*, we can use the output of this stage, as input for downstream stages and operators, manipulating the dataset accordingly.

The *correct* answers are:

```javascript
[
  {"$match": { "$text": {"$search": "network"}}},
  {"$sortByCount": "$offices.city"}
]

// and

[
  {"$unwind": "$offices"},
  {"$project": { "_id": "$name", "hq": "$offices.city"}},
  {"$sortByCount": "$hq"},
  {"$sort": {"_id":-1}},
  {"$limit": 100}
]

// The pipeline

[
  {"$match": { "$text": {"$search": "network"}}},
  {"$unwind": "$offices"},
  {"$sort": {"_id":-1}}
]

/*
is not a single query facet since it does not group any particular data dimension. It simply unwinds an array field and sorts that result set.
*/
```

### Facets: Manual Buckets

So now let's have a look into *buckets*, or better saying, looking to *bucketing strategies*. Now *bucketing* is a very common operation associated *facets*, where we group data by a *range of values*, as opposed for *individual values*. So basically, we group *sorts of documents* based on some specific *brackets or boundaries* where our *documents will fit in* based on a *particular value comprehended on those ranges*.

```javascript
mongos> db.companies.find({}, {number_of_employees: 1}).sort({number_of_employees: -1});
{ "_id" : ObjectId("52cdef7c4bab8bd675297dc4"), "number_of_employees" : 86300 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297da2"), "number_of_employees" : 63000 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dba"), "number_of_employees" : 28000 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d9b"), "number_of_employees" : 15000 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297da3"), "number_of_employees" : 13600 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d8e"), "number_of_employees" : 5299 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d8c"), "number_of_employees" : 1600 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d94"), "number_of_employees" : 1300 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297de0"), "number_of_employees" : 800 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297db5"), "number_of_employees" : 644 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d8b"), "number_of_employees" : 600 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297da8"), "number_of_employees" : 305 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dda"), "number_of_employees" : 300 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dc1"), "number_of_employees" : 250 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297da7"), "number_of_employees" : 120 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dc0"), "number_of_employees" : 120 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dbb"), "number_of_employees" : 110 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297db2"), "number_of_employees" : 75 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297deb"), "number_of_employees" : 75 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297db8"), "number_of_employees" : 62 }
Type "it" for more
mongos> it
{ "_id" : ObjectId("52cdef7c4bab8bd675297de1"), "number_of_employees" : 8 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297de6"), "number_of_employees" : 8 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dca"), "number_of_employees" : 6 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dc6"), "number_of_employees" : 5 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dcd"), "number_of_employees" : 4 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dc5"), "number_of_employees" : 3 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297de3"), "number_of_employees" : 3 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297de7"), "number_of_employees" : 3 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297de9"), "number_of_employees" : 2 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d93"), "number_of_employees" : 0 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d9d"), "number_of_employees" : 0 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dbc"), "number_of_employees" : 0 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dbd"), "number_of_employees" : 0 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dd2"), "number_of_employees" : 0 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dd4"), "number_of_employees" : 0 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297ddd"), "number_of_employees" : 0 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dec"), "number_of_employees" : 0 }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d8f"), "number_of_employees" : null }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d90"), "number_of_employees" : null }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d92"), "number_of_employees" : null }
Type "it" for more
```

In our example, we might want to *bucket companies* based on the size of their workforce, the *number of employees*. Now to do that, if we look into for example, the *range of values* that we have in our *data sets*, we can see that we go from the *very large workforce for companies to companies that don't even have number of employees set or are set to 0*. And this will give us the *ranges and an opportunity to establish boundaries for those buckets*, if we want to group the *different companies based on the number of employees that they have*. But then again, *not individual values, but ranges of values*.

```javascript
// create manual buckets using $ bucket
db.companies.aggregate( [
  { "$match": {"founded_year": {"$gt": 1980}, "number_of_employees": {"$ne": null}}},
  {"$bucket": {
     "groupBy": "$number_of_employees",
     "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ]}
}]);
```

So to put this in place, let's use a simple *aggregation* example. So in my particular case, for this example, we're going to have the *companies founded after 1980*. And we are going to have on the same *data set only companies that have a number of employees value sets*. Basically, not null -- *"$ne": null*. And then we are going to *bucket* those results using a *new stage of the aggregation pipeline called "$bucket"*, where are we going to be using a *"groupBy"* in *"boundaries"* fields to define exactly how our *buckets* are going to be looking like, and which field we are going to be using for our *grouping*, which in this case, is *"$number_of_employees"*.

```javascript
mongos> db.companies.aggregate( [
...   { "$match": {"founded_year": {"$gt": 1980}, "number_of_employees": {"$ne": null}}},
...   {"$bucket": {
...      "groupBy": "$number_of_employees",
...      "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ]}
... }]);
{ "_id" : 0, "count" : 20 }
{ "_id" : 20, "count" : 12 }
{ "_id" : 50, "count" : 7 }
{ "_id" : 100, "count" : 6 }
{ "_id" : 500, "count" : 3 }
{ "_id" : 1000, "count" : 7 }
```

Once we run this, we can see that we are going to have a result which contains an *_id* field pointing to the *bucket name or bucket value* in this case, where we can see a *count of the number of companies that fall into that bucket*. For the following *bucket, which is 20*, we see a different *count, 12*. Now the *boundaries define the brackets, where the lower bound in this case, here 0, is inclusive, and upper bound, 20, will be exclusive*. So meaning that there are *20 companies that have been founded after 1980, which have either 0 up to 19 employees*. In the case of from *20 to 50*, we have *12, 50 to 100, we have 7*, and so forth.

Now an important aspect to keep in mind is that, if we have documents with the field *number of employees* in this case, which we are *grouping by our boundaries array* here, these field types need to be the same. Meaning that if we have a *number of employees* that doesn't have in this case, a *numerical value*, here *infinity is a double value* that we are using to define, or even if they *fall outside the buckets*, we will have an *error generated*. Let's see an example of that.

```javascript
// reproduce error message for non matching documents
mongos> db.coll.insert({ x: "a" });
WriteResult({ "nInserted" : 1 })
mongos> db.coll.aggregate([{ $bucket: {groupBy: "$x", boundaries: [0, 50, 100]}}]);
assert: command failed: {
    "ok" : 0,
    "errmsg" : "$switch could not find a matching branch for an input, and no default was specified.",
    "code" : 40066,
    "codeName" : "Location40066",
    "operationTime" : Timestamp(1636807357, 1),
    "$clusterTime" : {
    "clusterTime" : Timestamp(1636807357, 1),
        "signature" : {
            "hash" : BinData(0,"6Zd6mvIIdaZylTw6Z1ZjvHYTMLk="),
            "keyId" : NumberLong("7006634394848854025")
        }
    }
} : aggregate failed
_getErrorWithCode@src/mongo/shell/utils.js:25:13
doassert@src/mongo/shell/assert.js:16:14
assert.commandWorked@src/mongo/shell/assert.js:403:5
DB.prototype._runAggregate@src/mongo/shell/db.js:260:9
DBCollection.prototype.aggregate@src/mongo/shell/collection.js:1224:12
@(shell):1:1
```

So let's say that we have this particular document on this *coll* collection where *x* equals a string of *a*. If we run this *aggregation pipeline* on this particular collection where we *bucket grouping by x*, and with the *boundaries of 0, 50, and 100*, we will get back an *error* saying that the *"errmsg" : "$switch could not find a matching branch for an input, and no default was specified"*. Basically what it's trying to say here is that our *boundaries do not have a place for our documents*.

```javascript
mongos> db.coll.find();
{ "_id" : ObjectId("618fb2a6bf46fd2106bd1c8c"), "x" : "a" }
```

Since our document is defined with a *value x equals a*, and our *boundaries are from 0 to 50, 50 to 100*, we do not have a place to put this particular document. Therefore, we *error* out saying that *we cannot find a place to put it inside the buckets that we are asking for*.
> At minute 4:45 we show the error message for trying to group a value that falls outside the boundaries.

```javascript
$switch could not find matching branch for an input, and no default was specified
```

> This message might be a bit confusing since we mention *switch* and *branches*. This is related with the internal *$bucket* stage implementation that uses a *$group* and *$switch* stages. We can see that in detail when running the *explain()* command.

```javascript
mongos> db.coll.explain().aggregate([{ $bucket: {groupBy: "$x", boundaries: [0, 50, 100]}}])
{
        "serverInfo" : {
            "host" : "vagrant",
            "port" : 26000,
            "version" : "3.6.23",
            "gitVersion" : "d352e6a4764659e0d0350ce77279de3c1f243e5c"
        },
        "stages" : [
            {
                "$cursor" : {
                    "query" : {
                        
                    },
                    "fields" : {
                        "x" : 1,
                        "_id" : 0
                    },
                    "queryPlanner" : {
                        "plannerVersion" : 1,
                        "namespace" : "m103.coll",
                        "indexFilterSet" : false,
                        "parsedQuery" : {
                            
                        },
                        "winningPlan" : {
                            "stage" : "COLLSCAN",
                            "direction" : "forward"
                        },
                        "rejectedPlans" : [ ]
                    }
                }
            },
            {
                "$group" : {
                    "_id" : {
                        "$switch" : {
                            "branches" : [
                                {
                                    "case" : {
                                        "$and" : [
                                            {
                                                "$gte" : [
                                                    "$x",
                                                    {
                                                        "$const" : 0
                                                    }
                                                ]
                                            },
                                            {
                                                "$lt" : [
                                                    "$x",
                                                    {
                                                        "$const" : 50
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "then" : {
                                        "$const" : 0
                                    }
                                },
                                {
                                    "case" : {
                                        "$and" : [
                                            {
                                                "$gte" : [
                                                    "$x",
                                                    {
                                                        "$const" : 50
                                                    }
                                                ]
                                            },
                                            {
                                                "$lt" : [
                                                    "$x",
                                                    {
                                                        "$const" : 100
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "then" : {
                                        "$const" : 50
                                    }
                                }
                            ]
                        }
                    },
                    "count" : {
                        "$sum" : {
                            "$const" : 1
                        }
                    }
                }
            },
            {
                "$sort" : {
                    "sortKey" : {
                        "_id" : 1
                    }
                }
            }
        ],
        "ok" : 1,
        "operationTime" : Timestamp(1636808737, 1),
        "$clusterTime" : {
            "clusterTime" : Timestamp(1636808737, 1),
            "signature" : {
                "hash" : BinData(0,"h5z32/t4TPydGl/H2h+FAoWqYzA="),
                "keyId" : NumberLong("7006634394848854025")
            }
        }
}
```

```javascript
// set `default` option to collect documents that do not match boundaries
db.companies.aggregate( [
  { "$match": {"founded_year": {"$gt": 1980}}},
  { "$bucket": {
    "groupBy": "$number_of_employees",
    "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
    "default": "Other" }
}]);
```

To avoid these scenarios, *bucket stage* contains a *default* option where we can define a field, or in this case, the *name of a bucket*, which doesn't *fit the described boundaries*. So in our *match query*, we are going to change it slightly to include again, *all founded companies after 1980*. But now let's remove the restriction on *having or not the null values* for the *number of employees*. So basically what we're saying is, if a company does not have that field particular set, and since we wouldn't find a *bucket*, a manual *bucket* to place that particular field, we will be placing it in *other*.

```javascript
mongos> db.companies.aggregate( [
...   { "$match": {"founded_year": {"$gt": 1980}}},
...   { "$bucket": {
...     "groupBy": "$number_of_employees",
...     "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
...     "default": "Other" }
... }]);
{ "_id" : 0, "count" : 20 }
{ "_id" : 20, "count" : 12 }
{ "_id" : 50, "count" : 7 }
{ "_id" : 100, "count" : 6 }
{ "_id" : 500, "count" : 3 }
{ "_id" : 1000, "count" : 7 }
{ "_id" : "Other", "count" : 32 }
```

Once we run this, we can see that the *normal buckets*, with it's *previously provided number of documents that fit those buckets*, are correctly placed. And for *all other field values* that are not contained within this *range or have a different data type*, we will place it on *other* and with its *count*.

```javascript
// reproduce error message for inconsitent boundaries datatype
mongos> db.coll.aggregate([{ $bucket: {groupBy: "$x", boundaries: ["a", "b", 100]}}]);
assert: command failed: {
    "ok" : 0,
    "errmsg" : "All values in the the 'boundaries' option to $bucket must have the same type. Found conflicting types string and double.",
    "code" : 40193,
    "codeName" : "Location40193",
    "operationTime" : Timestamp(1636810777, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1636810777, 1),
        "signature" : {
            "hash" : BinData(0,"BpVXUYkuqoN2zKUNX2rz/r+jOAQ="),
            "keyId" : NumberLong("7006634394848854025")
        }
    }
} : aggregate failed
_getErrorWithCode@src/mongo/shell/utils.js:25:13
doassert@src/mongo/shell/assert.js:16:14
assert.commandWorked@src/mongo/shell/assert.js:403:5
DB.prototype._runAggregate@src/mongo/shell/db.js:260:9
DBCollection.prototype.aggregate@src/mongo/shell/collection.js:1224:12
@(shell):1:1
```

Another important aspect of *bucket stage* and in regard to *boundaries* defined manually, is that all values inside *the array that defines our boundaries* need to have *the same data type*. In case that we do not do so, we'll get an *error* back saying that *"errmsg" : "All values in the the 'boundaries' option to $bucket must have the same type. Found conflicting types string and double"*. So young padawans, be careful about that. Once defining our *manual boundaries for our buckets*, make sure that our *boundary's array* only contains values of *the same data type*.

```javascript
mongos> db.companies.aggregate( [
...   { "$match": {"founded_year": {"$gt": 1980}}},
...   { "$bucket": {
...     "groupBy": "$number_of_employees",
...     "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
...     "default": "Other" }
... }]);
{ "_id" : 0, "count" : 20 }
{ "_id" : 20, "count" : 12 }
{ "_id" : 50, "count" : 7 }
{ "_id" : 100, "count" : 6 }
{ "_id" : 500, "count" : 3 }
{ "_id" : 1000, "count" : 7 }
{ "_id" : "Other", "count" : 32 }
```

The output result of the *bucket* stage will be this plain simple document, where we're going to have the *underscore ID and the counts*. That's pretty much straightforward. But let's say that we would like to have something a little bit more elaborate. Now the other option that *bucket* stage allows us to set is our *output field*, or how the *output* would be looking like. The *shape of our output result for this facet*.

```javascript
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
]).pretty();
```

In our case, let's assume that we don't want just the *total*. That's fine. And with *"$sum":1*, that's OK. But we also want to get back the *average value of the number of employees*, or even a set of *all categories that match that particular bucket*. That can be set through this optional field *output*, where we define exactly that. In this case, the *aggregate operators* that will give me that *particular grouping*.

```javascript
mongos> db.companies.aggregate([
...   { "$match":
...     {"founded_year": {"$gt": 1980}}
...   },
...   { "$bucket": {
...       "groupBy": "$number_of_employees",
...       "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
...       "default": "Other",
...       "output": {
...         "total": {"$sum":1},
...         "average": {"$avg": "$number_of_employees" },
...         "categories": {"$addToSet": "$category_code"}
...       }
...     }
...   }
... ]).pretty();
{
        "_id" : 0,
        "total" : 20,
        "average" : 5.25,
        "categories" : [
            "enterprise",
            "web",
            "mobile",
            "software",
            "social",
            "games_video"
        ]
}
{
        "_id" : 20,
        "total" : 12,
        "average" : 31.583333333333332,
        "categories" : [
            "search",
            "web",
            "mobile",
            "advertising",
            "games_video"
        ]
}
{
        "_id" : 50,
        "total" : 7,
        "average" : 61.714285714285715,
        "categories" : [
            "web",
            "search",
            "photo_video",
            "news"
        ]
}
{
        "_id" : 100,
        "total" : 6,
        "average" : 200.83333333333334,
        "categories" : [
            "mobile",
            "messaging",
            "games_video",
            "advertising"
        ]
}
{
        "_id" : 500,
        "total" : 3,
        "average" : 681.3333333333334,
        "categories" : [
            "search",
            "security",
            "enterprise"
        ]
}
{
        "_id" : 1000,
        "total" : 7,
        "average" : 18257,
        "categories" : [
            "search",
            "social",
            "software",
            "web",
            "network_hosting"
        ]
}
{
        "_id" : "Other",
        "total" : 32,
        "average" : null,
        "categories" : [
            "search",
            "finance",
            "news",
            "mobile",
            "web",
            "games_video",
            "travel",
            "ecommerce",
            "network_hosting",
            "music"
        ]
}
```

Once we run this particular *aggregation pipeline*, in a *pretty* fashion we will see that we will get the list, or in this case, a set of *all categories that match the other bucket with a total of 32*. *An average of null*, because *averaging null by null gives me null*. That's pretty OK. But in the case of the *bucket for companies above 1,000 employees*, we have the *total of 7*. The *average* being *18257* in all sorts of different *categories* for those companies. Same thing for the *500 buckets* and so on.

So to recap, we have a *new operator stage or new mongodb aggregation stage called dollar bucket* that we need to set the *group by elements specifying the field that we want to group by*. We need to specify the *boundaries*, which tells us the brackets in which our documents will be *grouping by*. Don't forget they need to be *the same data type*. We can specify a *default bucket* for all documents that do not *fit the boundaries* or the *buckets defined by the boundaries that we are specifying*. They are all going to be placed under the *default* with the appropriate value associated to it. And also we can define a different document shape for our *output* by specifying different operators that we might find useful, given the *bucketing* that we are doing.

### Facets: Auto Buckets

So far in *facets*, what we've been seeing in terms of *buckets* is the manual creation of these *buckets*. We have a *bucket we group by a field*, and then we specify the *boundaries* for those fields, and respectively to those *buckets*. Now, with *MongoDB*, we can also *generate automatically those buckets*. So let's have a look how to set that up.

```javascript
// generate buckets automatically with $bucktAuto stage
db.companies.aggregate([
  { "$match": {"offices.city": "New York" }},
  {"$bucketAuto": {
    "groupBy": "$founded_year",
    "buckets": 5
}}]);
```

So with *MongoDB 3.4*, we also have *$bucketAuto. $bucketAuto* is another *aggregation pipeline stage* which is very similar to the previous *$bucket* operator. We also have here the *groupBy* specifying the field on this *data set* that we want to group on. But instead of defining the *boundaries*, what we are expected to set is the *number of buckets* -- in this case, *five*. It is very similar to the previous *$bucket*, but we reversed the order by which we specify our options. Instead of defining *boundaries*, we define the *number of buckets*. So we run this.

```javascript
mongos> db.companies.aggregate([
...   { "$match": {"offices.city": "New York" }},
...   {"$bucketAuto": {
...     "groupBy": "$founded_year",
...     "buckets": 5
... }}]);
{ "_id" : { "min" : 1971, "max" : 2002 }, "count" : 2 }
{ "_id" : { "min" : 2002, "max" : 2005 }, "count" : 4 }
{ "_id" : { "min" : 2005, "max" : 2006 }, "count" : 2 }
{ "_id" : { "min" : 2006, "max" : 2007 }, "count" : 2 }
{ "_id" : { "min" : 2007, "max" : 2008 }, "count" : 2 }
```

You can see that the *output* is very similar to the *previous $bucket one* where we, again, have an ID. Instead of having now *_id* pointing to a value of one of the *boundaries* -- the inclusive one -- what we're going to have is basically a subdocument defining at the *min and max value of our bucket*, and obviously, the *count* -- the number of documents that match or fall into this *bucket*. Same thing for all different -- five different buckets. The way that the *auto bucket* generates our *buckets*, is to try to evenly balance the number of documents that will be distributed across those different *five buckets*.

Similar to *$bucket*, we can also define a different *output* by defining our fields and the accumulators that will calculate those particular fields on our *output* documents. Once we run it, you can see that we still have the same exact boundaries. But instead of having only *one field*, we're going to have the fields that we defined in our *output option* -- *total and average*, in this case. Apart from those particular options, *$bucketAuto* also has the option of defining *Granularity*. And *granularity* is basically a *numerical series* -- one that we might prefer from these different options that we have supported in *3.4* where the *boundaries of our buckets* will adhere to that specific *numerical series*.

```javascript
// set `output` option for $bucketAuto
mongos> db.companies.aggregate([
...   { "$match": {"offices.city": "New York" }},
...   {"$bucketAuto": {
...     "groupBy": "$founded_year",
...     "buckets": 5,
...     "output": {
...         "total": {"$sum":1},
...         "average": {"$avg": "$number_of_employees" }  }}}
... ]);
{ "_id" : { "min" : 1971, "max" : 2002 }, "total" : 2, "average" : 28000 }
{ "_id" : { "min" : 2002, "max" : 2005 }, "total" : 4, "average" : 1379.25 }
{ "_id" : { "min" : 2005, "max" : 2006 }, "total" : 2, "average" : 41 }
{ "_id" : { "min" : 2006, "max" : 2007 }, "total" : 2, "average" : 0 }
{ "_id" : { "min" : 2007, "max" : 2008 }, "total" : 2, "average" : 212.5 }
```

Now, we have several different ones. We have the *Renard series*. We have the *E series*, the *1-2-5 series*, and *powers of two series*, all of them well-specified on this particular page with all the supported values for the *granularity -- R5 to R20, 1-2-5, E6 to E192, and powers of two*.

```javascript
// default $buckeAuto behaviour
mongos> for(i=1; i <= 1000; i++) { db.series.insert( {_id: i} ) };
WriteResult({ "nInserted" : 1 })
mongos> db.series.aggregate(
...   {$bucketAuto:
...     {groupBy: "$_id", buckets: 5 }
... });
{ "_id" : { "min" : 1, "max" : 201 }, "count" : 200 }
{ "_id" : { "min" : 201, "max" : 401 }, "count" : 200 }
{ "_id" : { "min" : 401, "max" : 601 }, "count" : 200 }
{ "_id" : { "min" : 601, "max" : 801 }, "count" : 200 }
{ "_id" : { "min" : 801, "max" : 1000 }, "count" : 200 }
```

To better see this in action, what we can do is generate a *series collection*, where we're going to have *_id values from 1 to 1,000*. Once we generate that collection, I can just *generate my auto buckets* -- so calling my stage for *auto bucketing -- grouping by _id, and generating five buckets*. This is the *default behavior of our bucketAuto stage*. And with this, we again see that I evenly get *buckets from 1 to 201 divided*, and having around *200, or 200 in this case because it's an easy match, of 200 documents per bucket*.

```javascript
// generate automatic buckets using granularity numerical series R20
mongos> db.series.aggregate(
...   {$bucketAuto:
...     {groupBy: "$_id", buckets: 5 , granularity: "R20"}
...   });
{ "_id" : { "min" : 0.9, "max" : 224 }, "count" : 223 }
{ "_id" : { "min" : 224, "max" : 450 }, "count" : 226 }
{ "_id" : { "min" : 450, "max" : 710 }, "count" : 260 }
{ "_id" : { "min" : 710, "max" : 1000 }, "count" : 290 }
{ "_id" : { "min" : 1000, "max" : 1120 }, "count" : 1 }
```

And defining the option *granularity* here to using the *Renard series R20*, which basically takes the *20th root of 10*. We will have a slightly different *set of boundaries* where the *boundaries'* values will adhere to that particular series, but it still tried to distribute accordingly with the *number of buckets* that we requested the number of documents across those different *buckets*. And this is how *$bucketAuto* works.

### Facets: Multiple Facets

Until this point, we've been looking to how to determine individual *facets*. But as you probably already realized, when building applications, we might need *multiple different facets* to achieve the kind of filters that we want to provide to our end users. In the initial example, I've shown you that, apart from the *list of results* that's given from a particular search term or query that we might do against a *catalog*, we might have different filters to help us *trim down, narrow down the search results* that we might be more interested on, depending on the dimensions that are suited for why we want to do

And we've been exploring some of those throughout the previous lessons. When building applications, we might want to *group our data and their orthogonal properties*. And running all this individually might take *too many round trips to the database*. *Faceting support* can compute several different *facets in one single command*. To do this, we have a new operator called *facet* that allows us to do exactly that.

```javascript
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
```

So let's, basically, take all the different *facets* that we've been building throughout the course individually, let's say the *categories, the employees, the work force facet, and the founded year that companies have been created*, and let's start grouping all this into *one single command in our aggregation pipeline*. So let's start by matching all documents that have *databases on their description or overview* by specifying a *text search query*, pass along that list of results to our *facet stage*, and then generating the different *facets* that we've been looking to before, either *categories, employees, or founded dates*, to provide that *set of different facets* that we've been exploring so far. So in essence, with this command, we are collecting back all *different facets* with their *matching conditions and output variations*, bringing in documents from the *database* all at once.

```javascript
mongos> db.companies.aggregate( [
...     {"$match": { "$text": {"$search": "Databases"} } },
...     { "$facet": {
...       "Categories": [{"$sortByCount": "$category_code"}],
...       "Employees": [
...         { "$match": {"founded_year": {"$gt": 1980}}},
...         {"$bucket": {
...           "groupBy": "$number_of_employees",
...           "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
...           "default": "Other"
...         }}],
...       "Founded": [
...         { "$match": {"offices.city": "New York" }},
...         {"$bucketAuto": {
...           "groupBy": "$founded_year",
...           "buckets": 5   }
...         }
...       ]
...   }}]).pretty();
{
    "Categories" : [
        {
            "_id" : "web",
            "count" : 1
        }
    ],
    "Employees" : [
        {
            "_id" : 20,
            "count" : 1
        }
    ],
    "Founded" : [ ]
}
```

Once I run it, I'll get all sorts of *different facets, facet for founded, the facets for employees, and the facet for categories that my initial match search provided*. Each *sub-pipeline within facet* is past the exact same set of input documents that this *match stage* here generates, and they are completely independent from one another. The output of one *sub-pipeline* cannot be used by the following ones within the same *facet* command. This means that you can interpret this as *sub-pipelining* inside of our *aggregation framework pipeline*. Provided via the dollar facet stage. And this is how we can generate facets navigation using *Mongo DB 3.4*.

### Lab - $facets

#### Problem 12

How many movies are in both the top ten highest rated movies according to the *imdb.rating* and the *metacritic* fields? We should get these results with exactly one access to the database.

*Hint*: What is the intersection?

#### Answer 12

```javascript
// University's Solution

// The solution we used follows, following the requirement that we use only one database access

db.movies.aggregate([
  {
    $match: {
      metacritic: { $gte: 0 },
      "imdb.rating": { $gte: 0 }
    }
  },
  {
    $project: {
      _id: 0,
      metacritic: 1,
      imdb: 1,
      title: 1
    }
  },
  {
    $facet: {
      top_metacritic: [
        {
          $sort: {
            metacritic: -1,
            title: 1
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            title: 1
          }
        }
      ],
      top_imdb: [
        {
          $sort: {
            "imdb.rating": -1,
            title: 1
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            title: 1
          }
        }
      ]
    }
  },
  {
    $project: {
      movies_in_both: {
        $setIntersection: ["$top_metacritic", "$top_imdb"]
      }
    }
  }
])

{ "movies_in_both" : [ { "title" : "The Godfather" } ] }

// We begin with a $match and $project stage to only look at documents with the relevant fields, and project away needless information

{
  $match: {
    metacritic: { $gte: 0 },
    "imdb.rating": { $gte: 0 }
  }
},
{
  $project: {
    _id: 0,
    metacritic: 1,
    imdb: 1,
    title: 1
  }
},

// Next follows our $facet stage. Within each facet, we need sort in descending order for metacritic and imdb.ratting and ascending for title, limit to 10 documents, then only retain the title

{
  $facet: {
    top_metacritic: [
      {
        $sort: {
          metacritic: -1,
          title: 1
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          title: 1
        }
      }
    ],
    top_imdb: [
      {
        $sort: {
          "imdb.rating": -1,
          title: 1
        }
      },
      {
        $limit: 10
      },
      {
        $project: { title: 1 }
      }
    ]
  }
},

// Lastly, we use a $project stage to find the intersection of top_metacritic and top_imdb, producing the titles of movies in both categories

{
  $project: {
    movies_in_both: {
      $setIntersection: ["$top_metacritic", "$top_imdb"]
    }
  }
}

// This results in the following output

{ "movies_in_both" : [ { "title" : "The Godfather" } ] }



// Builds the pipeline.
var pipeline = [
    { $match : { 
        "imdb.rating" : { $gt : 0 },
        "metacritic" : { $gt : 0 }
        }       
    },
    { $facet : { 
        "topTenImdb" : [
            { $sort : { "imdb.rating" : -1 } },
            { $limit : 10 }
        ],
        "topTenMetacritic" : [
            { $sort : { "metacritic" : -1 } },
            { $limit : 10 }
    ]}
    },
    { $project : {
        "commonTopFilms" : {
            $size : {
                $setIntersection : [ "$topTenImdb", "$topTenMetacritic" ]
            }
        }
    }
}];

// Prints the result.
var result = db.movies.aggregate(pipeline);
print("Result: ");
while (result.hasNext()) {
    printjson(result.next());
}
{ "commonTopFilms" : 1 }
```

### The $sortByCount Stage

```javascript
{ $sortByCount: <expression> }
```

*$sortByCount* takes *one argument*, an *expression* to group documents on. It works just like a *group stage*, followed immediately by a *sort and descending direction*.

```javascript
{
    "$group": { "_id": "$imdb.rating", "count": { "$sum": 1 } }
},
{
    "$sort": { "count": -1 }
}
```

Here, we're using a *group stage*, grouping on the *$imdb.rating*, getting a *count*, and then *sorting* on that *count* in descending direction.

```javascript
// performing a group followed by a sort to rank occurence
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$group": {
...       "_id": "$imdb.rating",
...       "count": { "$sum": 1 }
...     }
...   },
...   {
...     "$sort": { "count": -1 }
...   }
... ]);
{ "_id" : 7.2, "count" : 1810 }
{ "_id" : 7.1, "count" : 1758 }
{ "_id" : 7, "count" : 1721 }
{ "_id" : "", "count" : 1705 }
{ "_id" : 6.7, "count" : 1684 }
{ "_id" : 6.8, "count" : 1636 }
{ "_id" : 7.3, "count" : 1610 }
{ "_id" : 6.9, "count" : 1605 }
{ "_id" : 6.5, "count" : 1583 }
{ "_id" : 6.4, "count" : 1554 }
{ "_id" : 6.6, "count" : 1508 }
{ "_id" : 6.3, "count" : 1438 }
{ "_id" : 6.2, "count" : 1399 }
{ "_id" : 7.4, "count" : 1281 }
{ "_id" : 6.1, "count" : 1275 }
{ "_id" : 7.5, "count" : 1172 }
{ "_id" : 6, "count" : 1124 }
{ "_id" : 5.8, "count" : 1108 }
{ "_id" : 5.9, "count" : 1071 }
{ "_id" : 7.6, "count" : 1061 }
Type "it" for more
MongoDB Enterprise Cluster0-shard-0:PRIMARY>
```

Here we're using the *$sortByCount stage*, simply specifying what value we would like to *sort by count* on.

```javascript
// sortByCount is equivalent to the above. In fact, if you execute this pipeline
// with { explain: true } you will see that it is transformed to the above!
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.movies.aggregate([
...   {
...     "$sortByCount": "$imdb.rating"
...   }
... ]);
{ "_id" : 7.2, "count" : 1810 }
{ "_id" : 7.1, "count" : 1758 }
{ "_id" : 7, "count" : 1721 }
{ "_id" : "", "count" : 1705 }
{ "_id" : 6.7, "count" : 1684 }
{ "_id" : 6.8, "count" : 1636 }
{ "_id" : 7.3, "count" : 1610 }
{ "_id" : 6.9, "count" : 1605 }
{ "_id" : 6.5, "count" : 1583 }
{ "_id" : 6.4, "count" : 1554 }
{ "_id" : 6.6, "count" : 1508 }
{ "_id" : 6.3, "count" : 1438 }
{ "_id" : 6.2, "count" : 1399 }
{ "_id" : 7.4, "count" : 1281 }
{ "_id" : 6.1, "count" : 1275 }
{ "_id" : 7.5, "count" : 1172 }
{ "_id" : 6, "count" : 1124 }
{ "_id" : 5.8, "count" : 1108 }
{ "_id" : 5.9, "count" : 1071 }
{ "_id" : 7.6, "count" : 1061 }
Type "it" for more
MongoDB Enterprise Cluster0-shard-0:PRIMARY>
```

The exact same results. We've covered a lot of information. But let's recap a few important things. In *$bucket*, we must always specify at least *two values to boundaries*. *Boundaries must be all of the same general type, either numeric, or string, or Boolean*. And *count* is inserted by default with *no output*, but removed when *output* is specified.

In *$bucketAuto*, cardinality of the *groupBy* expression may impact even distribution and *number of buckets*. Specifying a *granularity* requires the expression to *groupBy* to resolve to a numeric value. And lastly, *$sortByCount* is equivalent to a *group stage to count occurrence, and then sorting in descending order*.

## Chapter 5: Miscellaneous Aggregation

### The $redact Stage

Let's learn about one of the stages in the aggregation framework that can help us protect information from unauthorized access, the *$redact* stage. The *$redact* stage has the following form.

```javascript
{ $redact: <expression> }
```

The *expression* can be any expression or combination of expressions, but must ultimately resolve to one of three values, $$DESCEND, $$PRUNE, and $$KEEP. OK, at first these seem pretty cryptic. So let's examine what each of them does. First, let's look at $$PRUNE and $$KEEP. $$PRUNE, and $$KEEP are inverse of each other. $$PRUNE -- (Remove), will exclude all fields at the current document level without further inspection, while $$KEEP -- (Retain), will retain all fields at the current document level without further inspection. So what do we mean by *further inspection*?

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.employees.findOne()
{ // block 1
    "_id" : ObjectId("59d288690e3733b153a9397f"),
    "employee_ID" : "7d735016-4f9e-4322-87cf-54a313038caf",
    "acl" : [
        "HR",
        "Management",
        "Finance",
        "Executive"
    ],
    "employee_compensation" : { // block 2
        "acl" : [
            "Management",
            "Finance",
            "Executive"
        ],
        "salary" : 122519,
        "stock_award" : 4880,
        "programs" : { // block 3
            "acl" : [
                "Finance",
                "Executive"
            ],
            "401K_contrib" : 0,
            "health_plan" : true,
            "spp" : 0.05
        } // block 3
    }, // block 2
    "employee_grade" : 3,
    "team" : "Blue",
    "age" : 50,
    "first_name" : "Brown",
    "last_name" : "Christian",
    "gender" : "male",
    "phone" : "+1 (927) 508-3083",
    "address" : "564 Powers Street, Waumandee, Virgin Islands, 58090"
} // block 1
```

Let's look at this example document from the *employee's collection*. Each *block* represents a document level. Specifying $$PRUNE or $$KEEP at any given document level will perform the associated action and automatically apply this action to *all document levels below the level we specified*. OK, so let's look at $$DESCEND. $$DESCEND retains the field at the current document level being evaluated except for subdocuments and arrays of documents. It will instead traverse down, evaluating each level.

```javascript
{
    "$cond": [{ "$in": [userAccess, "$acl"] }, "$$DESCEND", "$$PRUNE"]
}

{ // block 1
    ...
    "acl" : [ "HR", "Management", "Finance", "Executive" ],
    "employee_compensation" : { // block 2
        "acl" : [ "Management", "Finance", "Executive" ],
        "salary" : 122519,
        "stock_award" : 4880,
        "programs" : { // block 3
            "acl" : [ "Finance", "Executive" ],
            "401K_contrib" : 0,
            "health_plan" : true,
            "spp" : 0.05
        } // block 3
    }, // block 2
    ...
} // block 1
```

Let's visualize how $$DESCEND would operate over this document, given this conditional expression, determining whether the value of userAccess is in the "$acl" array. We start with the entire document -- (block 1), and compare whether "management" is in "$acl". Since it is, it descends into the sub document at "employee compensation" -- (block 2). We now evaluate whether "management" is in "$acl", which it is. So we descend further -- (block 3). At this level, upon evaluation $$PRUNE is returned, because the "$acl" at this level does not include "management". This level -- (block 3), and any subsequent levels, if there were any, would not be returned. To the user, it's as if this field -- (block 3), doesn't exist at all.

```javascript
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
```

Let's look at this in action. We set up our *userAccess* variable and then the *pipeline*, ensuring we only have access document levels we should.

```javascript
MongoDB Enterprise Cluster0-shard-0:PRIMARY> var userAccess = "Management";
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.employees.aggregate([   {     "$redact": {         "$cond": [{ "$in": [userAccess, "$acl"] }, "$$DESCEND", "$$PRUNE"]       }     }   ]).pretty();
{
        "_id" : ObjectId("59d288690e3733b153a9397f"),
        "employee_ID" : "7d735016-4f9e-4322-87cf-54a313038caf",
        "acl" : [
            "HR",
            "Management",
            "Finance",
            "Executive"
        ],
        "employee_compensation" : {
            "acl" : [
                "Management",
                "Finance",
                "Executive"
            ],
            "salary" : 122519,
            "stock_award" : 4880
        },
        "employee_grade" : 3,
        "team" : "Blue",
        "age" : 50,
        "first_name" : "Brown",
        "last_name" : "Christian",
        "gender" : "male",
        "phone" : "+1 (927) 508-3083",
        "address" : "564 Powers Street, Waumandee, Virgin Islands, 58090"
}
{
        "_id" : ObjectId("59d288690e3733b153a93970"),
        "employee_ID" : "22d4d4a4-2003-4978-bed4-0e6e5ae4a575",
        "acl" : [
            "HR",
            "Management",
            "Finance",
            "Executive"
        ],
        "employee_compensation" : {
            "acl" : [
                "Management",
                "Finance",
                "Executive"
            ],
            "salary" : 101450,
            "stock_award" : 3835
        },
        "employee_grade" : 1,
        "team" : "Violet",
        "age" : 42,
        "first_name" : "Sonya",
        "last_name" : "Buchanan",
        "gender" : "female",
        "phone" : "+1 (822) 566-3511",
        "address" : "320 Boerum Street, Vincent, Connecticut, 10860"
}

{
        "_id" : ObjectId("59d288690e3733b153a9397c"),
        "employee_ID" : "a1bd75c5-18b3-4284-bb8e-831b5c5f5c55",
        "acl" : [
            "HR",
            "Management",
            "Finance",
            "Executive"
        ],
        "employee_compensation" : {
            "acl" : [
                "Management",
                "Finance",
                "Executive"
            ],
            "salary" : 137635,
            "stock_award" : 2052
        },
        "employee_grade" : 1,
        "team" : "Green",
        "age" : 42,
        "first_name" : "Ford",
        "last_name" : "Head",
        "gender" : "male",
        "phone" : "+1 (980) 434-3557",
        "address" : "785 Ingraham Street, Shasta, Louisiana, 97136"
}
{
        "_id" : ObjectId("59d288690e3733b153a9398b"),
        "employee_ID" : "def72b1f-0c6e-45be-87be-c8802cfd7a6c",
        "acl" : [
            "HR",
            "Management",
            "Finance",
            "Executive"
        ],
        "employee_compensation" : {
            "acl" : [
                "Management",
                "Finance",
                "Executive"
            ],
            "salary" : 118015,
            "stock_award" : 1182
        },
        "employee_grade" : 3,
        "team" : "Violet",
        "age" : 34,
        "first_name" : "Mai",
        "last_name" : "Russell",
        "gender" : "female",
        "phone" : "+1 (830) 491-2750",
        "address" : "712 Regent Place, Leyner, Wisconsin, 25356"
}
{
        "_id" : ObjectId("59d288690e3733b153a9398c"),
        "employee_ID" : "b627efe5-473d-4579-b36d-55f6dd52bf64",
        "acl" : [
            "HR",
            "Management",
            "Finance",
            "Executive"
        ],
        "employee_compensation" : {
            "acl" : [
                "Management",
                "Finance",
                "Executive"
            ],
            "salary" : 117370,
            "stock_award" : 3142
        },
        "employee_grade" : 2,
        "team" : "Green",
        "age" : 63,
        "first_name" : "Dickerson",
        "last_name" : "Buck",
        "gender" : "male",
        "phone" : "+1 (801) 469-3716",
        "address" : "623 Albemarle Road, Fresno, New Hampshire, 04729"
}
Type "it" for more
```

Excellent. We can see that we are indeed only getting back document levels where "management" was in the "acl" array -- (block 1 & block 2).

The *$redact* stage can be useful for implementing *access control lists*, though it is not the only way to *limit access to information*, as we'll learn later in the course. Any user who has access to a *collection* to perform this type of *aggregation* can also perform other *read operations*. So the *$redact* stage is not sufficient for *collection and field-level restrictions*.

Lastly, if comparing to a field in the document, the field must be present at every level of using $$DESCEND, or the expression must account for and decide what to do if the field is missing. If we don't take any of these precautions, $redact is likely to error.

Let's summarize some key points. $$PRUNE and $$KEEP automatically apply to all levels below the evaluated level. $$DESCEND retains the current level and evaluates the next level down. And $redact is not for restricting access to a collection. Remember, if a user has access to perform an aggregation on a collection, they have access to read that collection.

### The $out Stage

Let's learn about a useful stage for persisting the results of an *aggregation*, the *$out* stage. The *$out* stage has the following form.

```javascript
{ $out: "output_collection" }
```

We specify the name of the *"output_collection"* that we want.

```javascript
db.movies.aggregate([
    { $stage1 }, { $stage2 }, ..., { $stageN }, { $out: "output_collection" }
]);

// No use within $facet!
```

The *$out* stage must be the *last stage in the pipeline*. As such, it can't be used within a *facet*.

```javascript
{ $out: "output_collection" }
```

We specify the name of the *"output_collection"* that we want. *MongoDB* will create the *collection with the name specified if none exists*. Otherwise it will *overwrite an existing collection* if an *existing collection name is specified*. Now there's a few things to know. It will only *create the new collection within the same database*. If an *existing collection* is replaced, *any indexes that existed on the original collection will still be in place*. If the *pipeline errors*, it will not *create or overwrite a collection*. This also means that *the output from $out must honor index restrictions*, such as *unique indexes*, can include the *_id* field.

```javascript
// Must honor existing indexes if specifying an existing collection!

db.movies.aggregate([
    
    { $group: { _id: null, values: { $push: "$some_field" } } }, 
    
    { $unwind: "$some_field" },
    
    { $out: "output_collection" }
]);
```

So this *aggregation* here, where we match every document, perform some *grouping operation, unwind to create many documents*, and then try an *output to a new collection* would fail because it would result in *many documents with the same _id value*. And that covers the *$out* stage.

The *$out* stage is very useful for performing an *aggregation against existing data to do a migration, seed a collection with useful data, or distribute snapshots of data for analysis*. Here are a few things to remember about the *$out* stage. It will *create a new collection or overwrite an existing collection if specified*. It *honors indexes on existing collections*. It *will not create or overwrite data if pipeline errors*. And it *creates collections in the same database as the source collection*.

### $merge Overview

Hi. This is Asiya, and I'm going to talk about the new *$merge* stage in the *aggregation pipeline*. The only way of saving the *aggregation pipeline* prior to *MongoDB 4.2*, was by writing it to a *new, unsharded collection*, via the *$out* stage. If the collection you wanted to write already existed, *$out* would replace it with the *new version*, and it couldn't be *sharded*.

```javascript
// $out

db.coll.aggregate([{ pipeline }, ... 
    { $out: "new_coll" }
]);

// coll --> $out --> new_coll

// new_coll -- must be unsharded, -- overwrite existing.
```

This only supported a subset of what people want to do with the *output from an aggregation*, and so *MongoDB 4.2* introduces a new stage, which allows flexible ways of saving results of the aggregation into an already existing collection, whether or not it's *sharded or unsharded*. We called it *$merge*. Now, you'll have a *pipeline* like you normally do, and then as the last stage, you would specify *$merge* with some options, which we will review.

```javascript
// $merge
db.coll.aggregate([{ pipeline }, ... 
    { $merge: { ... } }
]);

// coll --> $merge --> coll2

// coll2 -- can exist, -- same or different 'db', -- can be sharded.
```

Now unlike *$out* stage, this new stage can output to any existing collection, whether it's *sharded or unsharded*. You're allowed to output to a collection in a different database, and you can specify exactly how you want the new documents from this *aggregation* to be merged into the existing collection. That's why we call it *$merge*.

Now, when documents from an *aggregation* are to be added to an existing collection, the question is, how should we merge them with the documents that already exist in this output collection? Since there are multiple ways you might want to handle this, *$merge* provides you with options to describe exactly what you want. Let's look at *$merge* syntax now.

```javascript
{ 
    $merge: { 
        into: <target> 
    } 
}
```

The only required argument to *$merge* is *target*. You specify *into* and then the *name of the collection* that you want to *$merge* your output with.

```javascript
{ $merge: "collection2" }
```

The simplest syntax of that is just to give it a *string*, which represents a *collection name in the same database* that you're running the *aggregation in*.

```javascript
{ $merge: { db: "db2", coll: "collection2" } }
```

But you can also specify *a full object with the name of the database and the name of the collection, if the output is supposed to go to a different database than the one that you are running the aggregate pipeline in*. Now, I said you might want to specify how to handle *matching documents*. But before we decide what to do on *$merge*, we have to understand how documents are *$merged*.

```javascript
{ 
    $merge: { 
        into: <target>
        on: <fields>
    } 
}

on: "_id"
on: [ "_id",  "shardkey(s)"]

// there must be a *unique index* present on your own *merging key*
```

You can specify the *fields on* which to *$merge* the documents. When deciding how to *merge* them, the documents that are incoming to the *target collection*, if the user doesn't specify the optional *on* argument, the *server* will use the *_id* field as the *merging* field for all unsharded *target collections*. And the combination of *_id and your shard key if the collection is sharded*. If that's how you want to *merge* documents, then you don't have to specify the *on* field at all.

But if you want to specify a different *unique key to merge* documents on, then you would specify either *a single field name or if there's multiple fields, an array of them in the on argument*. We do require that if you specify your own *merging key*, there must be a *unique index* present on it. This is of course so we can uniquely identify the document in the *target collection* to *merge* with an incoming document from the *aggregation*.

So to recap, *$merge* allows you to output results of an *aggregation pipeline* right into another *collection*, giving you options to specify whether you want to *merge or insert or how you want to merge* the results with the existing documents, allowing you to output to an existing *sharded or unsharded collection*, as well as to a *collection in a different database* than the one that you're running the *aggregation*.

### $merge Syntax

```javascript
{ 
    $merge: { 
        into: <target>
        on: <fields>
    } 
}
```

Now that we know how *new incoming documents will be matched to existing documents*, it's good to understand what happens in each case by default, and what other options are available to you.

#### Action

* nothing matched: usually insert
* document matched: overwrite? update??  ???

##### source ----> target

When documents coming from the *source* to the *target*, either each incoming document doesn't *match* anything in the *target*, or it *matches*. If nothing is *matched*, usually, you will want to *insert the new document*. If something is *matched*, you will probably want to somehow *overwrite this document*. Right? Maybe update it with new information, or completely replace it.

```javascript
{ 
    $merge: { 
        into: <target>,
        whenNotMatched: "insert" | "discard" | "fail",
        whenMatched: "merge" | "replace" | "keepExisting" | "fail" | [ ... ]
    } 
}
```

We give you two fields in *$merge* to specify what action should be taken when there *isn't a match or when there is a match*. Both of them are optional. By default, when there is *no match, we will do an insert*. When there is *a match, we will merge the new incoming document with the existing document*. Now, a *merge* here means we will add *all the top level fields of the new document to existing document*, but that will preserve all the fields in the existing document that don't exist in the new incoming document. I'll show you an example of this later.

But you can think of this as *sort of an update with an upsert option set to true*. Right? It says that update set these new fields into an existing document. If there isn't an existing document, then *insert* it. So the default action is like an *upsert into the target collection*. That's the easiest way to remember it. Now, the other options when there isn't a *match are discard and fail*. Both of these would probably be useful in a scenario where you always expect to find a *matching document*.

And if a *match* is not found, then something is wrong. Imagine doing some kind of *partial processing* where you're calculating some additional information to be *merged* with an *existing record*, and if the *existing record* isn't found, that's an error. In that case, you would want to raise an exception. That would be *fail*. In other cases, it's OK if you don't find a record to update with the new information, but you also don't want to create that record, in which case that option would be *discard*.

Now, when there is a *matching document* found, you can specify *four options* to *whenMatched*, in addition to the default *merge* action. They are *replace, keep existing, fail*, and then one more special option in the *bracket*. *Replace and keep existing* is straightforward. *Replace* means the incoming document will *completely overwrite or replace the matching document in the target collection*. *KeepExisting* will *discard the incoming document and leave the existing document in the target collection as it is*. And *fail would be useful when you absolutely do not expect to find a match*. I'll show you an example of that later.

The last option you have when a document that's incoming *matches an existing document* is useful when you want to *merge* their values of fields somehow, but a simple *merge* option is not sufficient. The *Brackets* here represent that you can specify *your own custom pipeline* that will be used to compute a new document to be written to the *target collection*. You can compute it from fields of, both, the *incoming and existing versions of the document*.

Now, the pipeline is limited to stages that do single document transformations, like project or $addFields, and it will be applied to existing matched document in the target collection.

Any field names, like $a or $total, are referring to fields in the existing document.

But you can refer to fields in the incoming document with a special variable, $$new.

Now, this may look to you, very much, like the new aggregation pipeline in update, which is new in 4.2.

And it is.

It's the exact same implementation, and we even give you the same alias for ad fields, known as $set.

And what this pipeline is doing is, for matched document, it's going to set a field total to a sum of already existing dollar total, right here.

And $$newtotal, that's the total from the document that's flowing through the pipeline.

Here's an example.

If you're incoming document has underscore ID 37 total 64, and then there's some other field F1.

And our target has the same idea, obviously.

That's how they merge.

And it has an already existing total in some other F1.

This pipeline will only modify the total field.

It will set total to be the sum of the two.

The other two fields will be left alone.

Compare this with example two where, on match, we're going to use replace with, which creates a new object.

And that new object is merging the entire new incoming document-- that would be the one on the left here-- just with a single field object where total is computed as a sum of new total and existing total.

And here, you can see that the F1 field is actually inherited from incoming because it's in $$new.

And the only field from $$new that's being changed is the total.

Now, there's one other option that merge syntax allows.

And that option is only allowed and only makes sense when you're using a custom pipeline for the whenMatched field, and that's let.

Let allows you to define variables from your incoming or $$new document.

And if you don't specify left, it's exactly as if you did specify left, but defining variable new to be $$ dollar route, which is the entire incoming document.

So a different way to rewrite this particular pipeline might be to add a let, which preserves just the total from the new incoming document.

And on a match, it sets total in the existing document to a sum of $total and $$itotal, which is this variable over here.
