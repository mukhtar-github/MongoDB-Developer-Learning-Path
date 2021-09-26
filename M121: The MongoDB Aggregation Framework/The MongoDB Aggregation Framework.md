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

And there we go. The *aggregation framework structure and syntax*. We highly recommend using additive has bracket matching while constructing your pipelines to make noticing errors easier. There's just a few things to remember. *Pipelines are always an array of one or more stages. Stages are composed of one or more aggregation operators or expressions. Expressions may take a single argument or an array of arguments*. See you in the next lesson.

## Chapter 1: Basic Aggregation - $match and $project

### $match: Filtering documents

Now that we've discussed the concept of what *pipelines* are, and have given you an overview of *aggregation, and structure, and syntax*, it's time we learn about one of the most important stages, *$match. The $match* state is vital to a successful and performing *pipeline*. It should come as early as possible. And you are free to use as many *$match changes as necessary in your pipeline*.

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
}
```

Let's observe this another way. First, let's count the number of documents with types that don't equal star. It should be eight, now let's see how many documents make it through our $match stage.

I'm going to use the utility station this example called count, that you'll learn about later. Here, we can see that eight documents pass through our aggregation. Sorry, Pluto. Lastly, $match does not have any mechanism for projection.

With find, we can do something like this if we want to project out the undescribed field. Although this may seem like a limitation, we will soon learn about a powerful stage that allows us to do this and much, much more. And that's it for $match. Again, we encourage you to think of $match as more of a filter than a find. Once documents are in an aggregation pipeline, and we're shaping them with new fields and new data, we'll be using $match heavily to keep filtering documents out.

Some key things to remember. A $match stage may contain a $text query operator, but it must be the first stage in the pipeline. $match come early in an aggregation pipeline, you cannot use $where with match, and $match uses the same query syntax as find.
