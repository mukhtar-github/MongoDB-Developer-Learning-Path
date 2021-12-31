# M220JS: MongoDB for JavaScript Developers

> Learn the essentials of *Node.js* application development with *MongoDB*.

## Chapter 0: Introduction and Setup

> Course logistics, requirements for environment setup, and application architecture.

### Welcome To M220JS

Hello, and welcome to this course for *developing node JS applications with MongoDB*. My name is Matt, and I'll be one of your instructors. This course will focus on using *MongoDB's node JS driver* to develop applications that meet modern standards for performance and resilience. You may want to brush up on your *JavaScript*, because we jump right into application development.

In joining the course, you'll be placed into the role of a *back-end developer* on an application development team. The team is building a *movie browsing application called mflix*, and you'll be tasked with implementing the *database layer of the API*. You'll learn how to *create and share database connections, write data with different levels of durability, and handle errors you get back from the driver*.

But most importantly, you'll learn how to *develop an application with MongoDB* the right way. The homeworks are presented as *tickets*. And to complete the *tickets*, you'll need to read the *user story*, make sure the *unit tests* pass, and then run a full suite of integration tests on the *mflix application*.

The technology stack is composed of *node, Express, MongoDB, and React*. The *front end is written in react*, and is pre-built and bundled for you, so you'll be focused on the layer of the *back end* that talks directly to *MongoDB*. So thanks so much for joining us. And good luck on your path to becoming a *MongoDB developer*.

### MongoDB URI

In this lesson, we are going to the *MongoDB URI*. *URI* -- stands for *Uniform Resource Identifier*. It's going to look very similar to a *URL* which you are probably very familiar by browsing the internet. *URI's* are used to define the connections between *applications and MongoDB instances*. Applications can use *URI strings* to tell the driver the *host name and port* where *MongoDB* is running, the username and password used to log in, and any other connection options.

Basically anything about a connection to *MongoDB* can be defined in the *URI string* used to start the connection to the database.

```javascript
mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc
```

This is a standard *URI string*. In other to use this *URI string*, we have to be explicit about the *host names* of each of the servers in our cluster, and if the *host name* of one of these servers changes, we have to update the *URI string* to account for it. In many courses, we'll be using a new kind of *URI string*, what we called an *SRV string*.

```javascript
mongodb+srv:<username>:<password>@<host>/<database>
```

The *SRV string* begins at this prefix -- mongodb+srv, that tells *MongoDB*, it's the address of the *SRV record*, we'll talk about that in a minute. The next portion is composed of authentication credentials, we separate the username and password with a colon, and then follow the password with an *@ sign*. After the *@ sign*, we specify the host, which is the *hostname* of the *SRV record* for the *MongoDB* cluster that we want to connect to. Note that, this *hostname* does not actually point to a database server, it only host the *SRV records*.

[![Screenshot-from-2021-11-22-08-40-04.png](https://i.postimg.cc/W43c2P9Y/Screenshot-from-2021-11-22-08-40-04.png)](https://postimg.cc/xXW4RBVL)

The *hostname* is the address of the file called *SRV record* or *service records*. The *service records*, will define it's own *DNS* with a list of *hostnames* we want to resolve to. So, even though we are connecting to cluster of servers, we don't need to know where each server in a cluster, because the *SRV record* keeps track of it for us. This is especially useful when the servers in our cluster change or rotate out because the *SRV record* will be updated to reflect this and we don't need to change anything in our client-side.

This part of the connection string -- *database*, is the *authentication database*. This is the *databse* in our cluster that contains the credentials of this *user -- username*. Essentialy, what we are saying is, I want to connect as this *user -- username* and the credentials to authenticate this user are stored in this *database*. Here's an example of a *URI string* an *SRV* format.

```javascript
mongodb+srv://USERNAME:PASSWORD@cluster0.dkemg.mongodb.net/admin?retryWrites=true
```

We've been specified our *username and password* at this point, then we're going to have a *hostname* of the *SRV record*, then the *database* that we want to authenticate against. If we want to specify any other option for the connection, we make this with this string -- we specify them at the end after the *question mark*. This option will retry by default if the connection error arises. So we set it to *retryWrites=true*.

To recap, in this lesson, we cover the structure of the *URI string*, and we briefly discuss the reason to use *SRV records*. The *URI string* is required to connect your applicaton to *MongoDB*. So make sure string is correctly formatted.

### Setting Up Atlas

In this lesson we'll walk through setting up a free Atlast account connecting a new free tier *MongoDB cluster* and importing the sample data that we'll use through out this course. We're Atlas because it is the easiest path for setting up a *MongoDB data store*. While you can complete this course using a local installation of *MongoDB*, we assume Atlas is being used through out.

### OVERVIEW

#### Overview

We are going to have series of README instructions to be able to setup our MFLIX application successfully. With MFLIX application, you will learn to create and share a database connection, perform the basic Create, Read, Update, and Delete operations through the driver, handle errors, utilize the MongoDB best practices and more.

Mflix is composed of two main components:

* Frontend: All the UI functionality is already implemented for you, which includes the built-in React application that you do not need to worry about.
* Backend: The project that provides the necessary service to the application. The code flow is already implemented except some functions.
You'll only be implementing the functions which directly call to MongoDB.

#### Database Layer

We will be using MongoDB Atlas, MongoDB's official Database as a Service (DBaaS), so you will not need to manage the database component yourself. However, you will still need to install MongoDB locally to access the command line tools that interact with Atlas, to load data into MongoDB and potentially do some exploration of your database with the shell.

The following README sections are here to get you setup for this course.

### README: Setting Up mflix

#### Table of Contents

##### Setting Up mflix

* Project Structure
* Node Library Dependencies
* Running the Application
* Running the Unit Tests

In order to run properly, the MFlix software project has some installation requirements and environmental dependencies.

These requirements and dependencies are defined in this lesson, and they can also be found in the README.rst file from the mflix-js project, which you will download shortly. This lesson serves as a guide for setting up these necessary tools. After following this README, you should be able to successfully run the MFlix application. First, you will need to download the mflix-js project, as described below.

#### Download the mflix-js.zip file

You can download the mflix-js.zip file by clicking the link in the "Handouts" section of this page. Downloading this handout may take a few minutes. When the download is complete, unzip the file and cd into the project's root directory, mflix-js.

```javascript
cd ~/Downloads
unzip mflix-js.zip
cd mflix-js
```

Note: The handout contains some hidden files like .babelrc. Please ensure you copy the entire directory to a new location rather than selecting all files within your system's file browser to copy and paste into a new directory.

#### Project Structure

Most of your work will be implementing methods in the dao directory, which contains all database interfacing methods. The API will make calls to Data Access Objects (DAOs) that interact directly with MongoDB.

The unit tests in test will test these database access methods directly, without going through the API. The UI will run these methods in integration tests, and therefore requires the full application to be running.

The lesson handouts can be found in the test/lessons directory. These files will look like *lesson-name.spec.js*, and can be run with *npm test -t lesson-name*.

The API layer is fully implemented, as is the UI. The application is programmed to run on port 5000 by default - if you need to run on a port other than 5000, you can edit the dotenv_win (if on Windows) or the dotenv_unix file (if on Linux or Mac) in the root directory to modify the value of PORT.

Please do not modify the API layer in any way, under the mflix-js/src/api directory. This may result in the front-end application failing to validate some of the labs.

#### Node Library Dependencies

The dependencies for the MFlix application should be downloaded using the npm command-line tool. You can get this tool by downloading Node.js. Make sure to choose the correct option for your operating system.

Once the installation is complete, you may need to restart your computer before using the command line tools. You can test that it's installed by running the following command:

```javascript
node -v
```

This should print out the version of node you currently have - we recommend using version 10 or later, so this command should print something like v10.x.

Once npm is installed, you can install the MFlix dependencies by running the following command from the mflix-js directory:

```javascript
npm install
```

You must run this from the top level of the project, so npm has access to the package.json file where the dependencies are.

While running npm install, you might encounter the below error regarding node-gyp rebuild. Although, it is completely harmless and you can start the application by running npm start.

![m220js-npm-install-warning](https://s3.amazonaws.com/university-courses/m220/m220js-npm-install-warning.png)

#### Running the Application

In order for the application to use Atlas, you will need a file called .env to contain the connection information. In the mflix-js directory you can find two files, dotenv_unix (for Unix users) and dotenv_win (for Windows users).

Open the file for your chosen operating system and enter your Atlas SRV connection string as directed in the comment. This is the information the driver will use to connect. Make sure not to wrap your Atlas SRV connection between quotes:

```javascript
MFLIX_DB_URI = mongodb+srv://...
```

It's highly suggested you also change the SECRET_KEY to some very long, very random string. While this application is only meant for local use during this course, software has a strange habit of living a long time.

When you've edited the file, rename it to .env with the following command:

```javascript
mv dotenv_unix .env  # on Unix
ren dotenv_win .env  # on Windows
```

Note: Once you rename this file to .env, it will no longer be visible in Finder or File Explorer. However, it will be visible from Command Prompt or Terminal, so if you need to edit it again, you can open it from there:

```javascript
vi .env       # on Unix
notepad .env  # on Windows
```

In the mflix-js directory, run the following commands:

```javascript
# install MFlix dependencies
npm install

# start the MFlix application
npm start
```

This will start the application. You can then access the MFlix application at *localhost:5000*.

#### Running the Unit Tests

To run the unit tests for this course, you will use Jest. Jest has been included in this project's dependencies, so npm install should install everything you need.

Each course lab contains a module of unit tests that you can call individually with npm test from mflix-js directory like the following:

```javascript
npm test -t TICKET_TEST_NAME
```

Each ticket will contain the exact command to run that ticket's specific unit tests. You can run these commands from anywhere in the mflix-js project. Bear in mind that a tests will fail until the corresponding ticket is completed. For example to run the Connection Ticket test your shell command will be:

```javascript
npm test -t db-connection
```

## Chapter 1: Driver Setup

### Introduction to Chapter 1

Hello and welcome to Chapter One of the course. We've already covered all of the bookkeeping information for the course and explored the application structure. So now it's time to dive in.

In this chapter we're going to discuss and explore *basic read operations*, *adding field protections*, and how to *handle different query predicates* to allow searching our data set from the UI.

Our goal is that by the end of this chapter you are comfortable with *basic query semantics and basic shaping operations* the decline application might typically require. Remember to read those user stories closely and run the unit tests. And I hope you enjoy this chapter of M220.

### MFlix Application Architecture

Hello.

In this lesson, we're going to review the architecture and functionality of *MFlix*, as well as some of the tools that we can use to *build and test* the application. So you will be working on *MFlix*, which is a service that allows users to browse for their favorite movies, leave movie reviews, and create a dialogue about movies with other users on the site. The version of *MFlix* that you download will have some basic functionality, but it will be missing a lot of the features that would make the site better. Throughout the course, you will build and configure the pieces necessary to help the site grow as a modern application.

Now, we'll cover the architecture of the *MFlix project*. To follow along, please download the handout available for this lesson. In it, you'll find all the material that will be used throughout this course, including the application itself and the *tickets* that you'll be working on. So here, I'll begin at the very top level of the *MFlix JS project*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~/Documents/MongoDB-Developer-Learning-Path/M220JS: MongoDB for JavaScript Developers$ tree -L 1
locales-launch: Data of en_GB locale not found, generating, please wait...
.
├── build
├── dotenv_win
├── index.js
├── jest.config.js
├── M220JS: MongoDB for JavaScript Developers.md
├── mflix
├── mflix-js.zip
├── node_modules
├── package.json
├── package-lock.json
├── README.rst
├── src
└── test

5 directories, 8 files
```

At the top level of the *MFlix JS handout*, you'll find a *README* file, which can help you set up all the necessary *components and dependencies* that you need for *MFlix* to function. When you set everything up, please follow the *README* carefully, and if you hit any roadblocks, don't hesitate to reach out on the class online forum. The Build directory contains all the files necessary for the *front end of the application* to run. It's also important to note that we'll be using *Express* as a layer between the *MFlix front end and back end*. *Express* is a *JavaScript framework*, which is a part of *Node*.

You can think of it as a *routing layer*, which allows us to *route requests from a front end to our DAO-(Data Access Object) methods that eventually return data from MongoDB Atlas*. We won't be working with *Express* directly in this course, but all the *routing files* in the application use *Express* in case you do decide to explore those files. In this course, we'll be using *Node Package Manager, or npm*, to *run and test* the application as well as install any of the necessary *dependencies*.

If I run *npm Install* here, it will find all the *dependencies in the Package.JSON* file and install the correct versions of those packages. All right, great. Once we have all the *dependencies*, we can actually *run* the application. By default, the application will run on *local host port 5000*. The *Test directory* contains all the *unit tests* for the *MFlix application*. We can take a look at what's in these *tests*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~/Documents/MongoDB-Developer-Learning-Path/M220JS: MongoDB for JavaScript Developers$ tree -L 1 test
test
├── config
├── connection-pooling.test.js
├── create-update-comments.test.js
├── db-connection.test.js
├── delete-comments.test.js
├── error-handling.test.js
├── facets.test.js
├── get-comments.test.js
├── lessons
├── migration.test.js
├── paging.test.js
├── projection.test.js
├── text-subfield.test.js
├── timeouts.test.js
├── user-management.test.js
├── user-preferences.test.js
└── user-report.test.js

2 directories, 15 files
```

Each *.test.js* file as a *unit test* that corresponds to a *ticket of work* in this course. These *tests* have been written with the *Jest testing framework* and we can run them in this project using *npm*. For example, if we wanted to run the *unit test* for the *User Management ticket*, we would use the *title of the test file, User-Management*. When you're starting a *new ticket*, make sure to first *read the ticket description*. And then, to verify your understanding, check out the respective unit test in this directory.

You may notice that there is an additional folder called *Lessons under the Test directory*. This folder contains *example code* that will be used throughout the course during lectures. You may use the files from this directory to follow along. So now let's go back to the top level of our *MFlix.JS*, and we're finally going to tackle the biggest directory in this project, the *SRC directory*. This is where most of your work will be done.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~/Documents/MongoDB-Developer-Learning-Path/M220JS: MongoDB for JavaScript Developers$ tree -L 1 src
src
├── api
├── dao
├── index.js
├── migrations
└── server.js

3 directories, 2 files
```

At the top level of the *SRC directory*, you'll find an *API directory* which has the *routing files* that we discussed before. It also contains the *controller methods used to communicate with the front end*. You won't need to touch any of these files, but you're welcome to explore them if you're curious. However, altering them may result in some unexpected behavior. Adjacent to the *API directory*, we have the *DAO directory*, which is really where the work is going to be done in this course.

This is where you'll find the *movies DAO and comments DAO files* that you will need to edit in order to complete your *tickets*. The *unit tests* you run will test functionality directly from the *DAO files*, while requests made on the *front end* will have to go through the *controller* before they are received by the *DAO*. So that's it for our brief overview of the *MFlix architecture*. Good luck in the first chapter.

### MongoClient

Welcome back. In this lesson, we'll use the *MongoClient object* to *initiate a connection* with the *database*.

```javascript
import { MongoClient } from "mongodb";

describe("MongoClient", () => {
  /**
   * In this lesson, we'll use the MongoClient object to initiate a connection
   * with the database.
   */

  test("Client initialized with URI", async () => {
    /**
     * Here's a MongoClient object initialized with a URI string. The only
     * option we've passed is to use the new url parser in order to be
     * future compatible, so this client will have the default connection
     * parameters.
     */

    let testClient
    try {
      testClient = await MongoClient.connect(process.env.MFLIX_DB_URI, {
        useNewUrlParser: true,
      })
      expect(testClient).not.toBeNull()

      // retrieve client options
      const clientOptions = testClient.s.options
      // console.error("OPTS", clientOptions)
      expect(clientOptions).not.toBeUndefined();

      // expect this connection to have SSL enabled
      if (typeof clientOptions.ssl !== "undefined") {
        expect(clientOptions).toHaveProperty("ssl");
        expect(clientOptions.ssl).toBe(true);

        // expect this user to authenticate against the "admin" database
        expect(clientOptions).toHaveProperty("authSource");
        expect(clientOptions.authSource).toBe("admin");
      }
    } catch (e) {
      expect(e).toBeNull();
    } finally {
      testClient.close();
    }
  });

  test("Client initialized with URI and options", async () => {
    /**
     * Here we've initialized a MongoClient with a URI string, as well as a few
     * optional parameters. In this case, the parameters we set are
     * connectTimeoutMS, retryWrites and again useNewUrlParser.
     */

    let testClient
    try {
      testClient = await MongoClient.connect(process.env.MFLIX_DB_URI, {
        connectTimeoutMS: 200,
        retryWrites: true,
        useNewUrlParser: true,
      });

      const clientOptions = testClient.s.options;

      // expect clientOptions to have the correct settings
      expect(clientOptions.connectTimeoutMS).toBe(200);
      expect(clientOptions.retryWrites).toBe(true);
      expect(clientOptions.useNewUrlParser).toBe(true);
    } catch (e) {
      expect(e).toBeNull();
    } finally {
      testClient.close();
    }
  });

  test("Database handle created from MongoClient", async () => {
    /**
     * Now that we have a MongoClient object, we can use it to connect to a
     * specific database. This connection is called a "database handle", and we
     * can use it to explore the database.

     * Here we're looking at the collections on this database. We want to make
     * sure that "mflix" has the necessary collections to run the application.
     */

    let testClient
    try {
      testClient = await MongoClient.connect(process.env.MFLIX_DB_URI, {
        useNewUrlParser: true,
      });

      // create a database object for the "mflix" database
      const mflixDB = testClient.db(process.env.MFLIX_NS)

      // make sure the "mflix" database has the correct collections
      const mflixCollections = await mflixDB.listCollections().toArray()
      const actualCollectionNames = mflixCollections.map(obj => obj.name)
      const expectedCollectionNames = [
        "movies",
        "users",
        "comments",
        "sessions",
      ]
      expectedCollectionNames.map(collection => {
        expect(actualCollectionNames).toContain(collection);
      });
    } catch (e) {
      expect(e).toBeNull();
    } finally {
      testClient.close();
    }
  });

  test("Collection handle created from database handle", async () => {
    /**
     * From the database handle, naturally comes the collection handle. We
     * verified in the previous test that the "mflix" database has a collection
     * called "movies". Now let's see if the "movies" collection has all the
     * data we expect.
     */

    let testClient
    try {
      testClient = await MongoClient.connect(process.env.MFLIX_DB_URI, {
        connectTimeoutMS: 200,
        retryWrites: true,
        useNewUrlParser: true,
      });

      // create a database object for the "mflix" database
      const mflixDB = testClient.db(process.env.MFLIX_NS);

      // create a collection object for the "movies" collection
      const movies = mflixDB.collection("movies");

      // expect the "movies" collection to have the correct number of movies
      const numMoves = await movies.countDocuments({});
      expect(numMoves).toBe(23530);
    } catch (e) {
      expect(e).toBeNull();
    } finally {
      testClient.close();
    }
  });
});
```

So here is a *MongoClient object* initialized with a *URI string*. I've connected here and then stored the client's configuration in this variable. If we look through the options, we can see that this *connection uses SSL*. That's because we connected with an *SRV string*. We can also see the name of the user that were connected as in the *database* where that user's credentials are stored.

So here we've initialized *MongoClient* with a *URI string*, but we've also passed a few optional parameters. We can read these parameters by looking again in the Client Configuration. And we can see the options that we pass to *MongoClient* will be used throughout this connection. So now that we've created a *MongoClient object*, we can use it to connect to a specific *database*. This connection is called a *database* handle. And we can use it to exploit the *database* and send queries to it. Here we're just looking at the collections that exist on this *database*.

We just want to make sure that *MFlix has the collections* that we need to run the application. And from the *database* handle naturally comes the *collection handle*. We verified in the previous test that the *MFlix database* has a *collection called Movies* on it. Now let's see if the *Movies collection* has all the *data* we expect. And it looks like all the *movies* we need are on the *database*. So we're good to go. To recap, we can use a *MongoClient* to create a connection to *MongoDB*. And from that *client object*, we can *read and write data* against a *database or a collection*.

### Asynchronous Programming in Node.js

In this lesson, we'll discuss the difference between *callbacks, promises, and async/await* in modern JavaScript. We'll also discuss how the *Node driver* responds depending on how you *call certain methods*. Unless you are completely new to JavaScript -- and welcome, if you are -- you are most likely familiar with *callbacks*. For those of you that might need a refresher, *callbacks are a way of passing a bundle of information along to a different part of our program*. They are functions that some other portion of our code can run. I like to think of them like *handing a remote control to someone else*.

```javascript
describe("Callbacks, Promises, and Aysnc/Await", () => {
  let movies
  beforeAll(async () => {
    movies = await global.mflixClient
      .db(process.env.MFLIX_NS)
      .collection("movies")
  })

  test("Callbacks", done => {
    movies.findOne({ title: "Once Upon a Time in Mexico" }, function(err, doc) {
      expect(err).toBeNull()
      expect(doc.title).toBe("Once Upon a Time in Mexico")
      expect(doc.cast).toContain("Salma Hayek")
      done()
    })
  })
```

Let's look at an example. Here, I'm issuing a *findOne* query on the *Movies collection*, searching for movies where the *title* is *Once Upon a Time in Mexico*. I also pass along this *callback* here. This *callback* is a function that will be called back when *MongoDB* finds a *document or encounters an error*. If there is an *error*, this *error* argument will be something real, and if there is no *error*, and it found a *document*, *error* should be *null*, and there should be something in the *document* argument.

Now, we know this *movie* exists, so we expect *error* to be *null*. We expect the *doc.title* to be *Once Upon a Time in Mexico*, and we expect the *doc.cast* to contain *Salma Hayek*. Here, I pass *done()*, and this is only for the *testing framework*. Let's go ahead and give it a run. Great. I can see that the *movie* I found was *Once Upon a Time in Mexico*, and the *cast* did contain *Salma Hayek*. Otherwise, this test wouldn't have passed.

```javascript
test("Promises", done => {
    movies
      .findOne({ title: "Once Upon a Time in Mexico" })
      .then(doc => {
        expect(doc.title).toBe("Once Upon a Time in Mexico")
        expect(doc.cast).toContain("Salma Hayek")
        done()
      })
      .catch(err => {
        expect(err).toBeNull()
        done()
      })
  })
```

So now let's jump in to *promises*. *Promises* are a way of saying, do this thing, and when it's done, do one of two things -- *resolve or reject*. *Promises* allow us to be more declarative. Let's look at the same query as before, but instead, use a *promise*. Now there's one interesting note. While browsing the *Node driver documentation*, you may encounter documentation like the following -- *findOne(query, options, callback) -> {Promise}*, where it takes these arguments, and you see the return type is a *promise*.

The *driver* inspects whether a *callback* is passed. If no *callback* is passed, the *driver* will return a *promise* automatically. Great stuff. So here, I'm issuing a *findOne* against the *movies database*, and again, I'm searching for a *movie* where the *title* is *Once Upon a Time in Mexico*. Instead of passing a *callback*, you can see I'm calling *.then*, receiving the *document argument*, where I expect, again, for the *title* to be *Once Upon a Time in Mexico* and the *cast* to contain *Salma Hayek*. I then call *done()*, and again, that's just for the *testing framework*.

Now if there's an *error*, this is where we would handle it. Here, I append *.catch()* to this method chain. I receive the *error*, and I expect this *error to be null*, so if it does return an *error*, this test wouldn't have passed. Let's go ahead and run it and make sure that it works as expected. All right. I see it ran my *promises test and the test pass*. I didn't get an *error callback*, and the *document* I got back did contain the correct *title* and had the correct *cast member*. This is pretty nice. We said, "Hey, *Mongo*, *find one document* where the *title* is *Once Upon a Time in Mexico*". Then I'll do something with that. *catch any error*, and let me do something with that, if that's the case.

```javascript
test("Async/Await", async () => {
    try {
      let { title } = await movies.findOne({
        title: "Once Upon a Time in Mexico",
      })
      let { cast } = await movies.findOne({
        title: "Once Upon a Time in Mexico",
      })
      expect(title).toBe("Once Upon a Time in Mexico")
      expect(cast).toContain("Salma Hayek")
    } catch (e) {
      expect(e).toBeNull()
    }
  })
  /**
   * I recommend reading
   * https://medium.com/front-end-hacking/callbacks-promises-and-async-await-ad4756e01d90
   */
})
```

Now, onto *async and await*. There's another way to handle *promises* that results in *very clean code*, and that's using *async/await*. It's the style we'll use throughout the *code base* for this *project*. Now don't let the terminology intimidate you. We JavaScript programmers like to add fancy names to things to feel better about things like not empty array - *![]* evaluating the *false*. You'll have to forgive us. To use *async/await*, we need to mark our function as *async*, as can be seen in the *test function* for this lesson.

This, then, lets us use the *await keyword for promises*. Behind the scenes, you can think of it as attaching the *.then* part to a *promise*, and returning that value. So what about the *.catch()* part? That's handled by a *catch* block. An important thing to remember is to always surround *await statements* with a *try/catch* block. Let's see an example. Here, I have my *try and catch block*. I'm using *destructuring* here and *awaiting the result of movie.findOne*, where the *title is Once Upon a Time in Mexico*.

I also use *destructuring* to peel off the *cast property from an await movies.findOne* on the same thing. Now, it would be a lot more efficient to do both of these in one operation, but I wanted to show that we can invest *multiple awaits* within a *single try*. So I expect the *title* to be *Once Upon a Time in Mexico*, and I expect the *cast* to, again, contain *Salma Hayek*. Then in my *.catch()* block, I expect *e* to be *null*. This *.catch()* block will trigger if the *promise* rejects. If the *promise* rejects, we definitely want the *test to fail*, so asserting that *e* will be *null* means that it will *fail for sure*.

Let's go ahead and test this. Great. I can see the *async/await* test ran, and the test passed. It works as expected. And that covers *callbacks, promises, and async/await* at a high level and how the *Node driver* will behave when passed a *callback or not*. If any of this is unclear, head to our forums to ask for help. If you are very new to JavaScript and aren't familiar with *callbacks or promises*, there is a *link in the documentation* for this lesson that I highly recommend you read. There are some things to remember. You should always wrap *await* statements with a *try and catch* block. If you aren't comfortable with *promises*, you can always supply a *callback to the driver methods that are asynchronous*. And if you don't pass a *callback, a promise will be returned*.

### Basic Reads

In this lesson, we are going to look into *basic reads*, the *R in our CRUD set of operations*. And the first method we'll be looking to is *findOne*. As the name suggests, *findOne* finds one document for us and returns it. Let's find a document where *Salma Hayek* is a cast member. Because we are using the *findOne* method, we will get a single document back as a result. This is different than the other *query* methods we'll use, which we'll talk about shortly. Because *cast is an array*, *MongoDB* will look at *all elements of the array to match this*.

This is because *MongoDB* treats arrays as *first-class objects*. We know that we have a few movies where *Salma Hayek* is *cast* member, so we do not expect a *null* value to be returned. We have already explored this data set, so we know that the movie that we want to return back will be *Roadracers*, the year to be *1994*, and another member of the *cast* to be *David Arquette*. Well, what if we issued a *query* that resulted in no documents be returned? That result will be null. So if the *findOne* matching expression or *query filter*, then also does not match any document in the collection, it will return *null*.

Looking at the document, we can see that there is a lot of information. What if we only want a *title and year*? You may be familiar with *projection* mechanisms in the *mongo shell*, like this expression here (db.movies.findOne({cast: "Salma Hayek"}, { title: 1, year: 1 })), where we define which fields we are interested on. The *collection* class has *projection* functionality, as well, but the usage is different to what of the *mongo shell*. We need to express a *filter*, as we done before, *Salma Hayek*, pass it along as the first element of the *findOne*, and then pass an object where we specify the *projection* and tell which fields we are interested on, in this case, *title and year*.

Obviously, we are not expecting this to be returning *null* because we know that there are some movies that have *Salma Hayek* in their *cast*. Now, an important thing is that based on the *projection* that we defined, we are expecting three keys, the *title*, the *year*, and the *_id*. Note that only the fields we specify in the *projection* section of the *query* will be returned in our documents with exception for *_id*. If we are not interested on the *_id* field, we need to explicitly specify that we are not wanting it to be part of the documents that we are returning back.

And for doing that, we specify *_id* equals zero as an exclusion from our *projection*. It's fair to say that sometimes we don't want just one single document back, but all documents that match a *query* predicate or *filter*. To do that, we can use the *db.collection.find* method instead of *db.collection.findOne* method. Let's build a *query* so that only movies with both *Salma Hayek* and *Johnny Depp* are returned. And for that, we are going to be using the *$all* operator. The way that the *$all* operator works is that it only returns documents where *all values* specified in the *query* are present in the array for that field.

So in this case, for example, we're going to have a *cast* that matches all elements of the past array, in this case, *Salma Hayek* and *Johnny Depp*. The implementation on the *shell and in the JavaScript driver* is pretty similar. You can see here that we are using the *.next* method on the *results*. This is because instead of *findOne* that will return a document, the *find* method will return a *cursor*. And therefore, we need to iterate over that same *cursor*.

To do that, we have the *.next* or *next* method, or we can even use a *toArray* method to do that. The *next* method will return the *next* result in the *cursor*. If there are no more *results*, the *next* method resolves to *null*. As we are movie experts and have examined this data set before, this time we expect the *title of Once Upon a Time in Mexico* to be present, the year to be *2003*, and containing both *Johnny Depp* and *Salma Hayek* as *cast* members. Once we execute all the tests that we reviewed, everything passes with flying colors. But let's summarize.

We saw how to limit the *results* to one document with *findOne* or get all documents that match a *query* filter with *find* method. We can also see how we can include or exclude fields that we might be interested on the return documents by specifying a *projection*. Few things to keep in mind-- finding one document typically involves querying on a unique *index*, such as *_id* field. When projecting, by specifying an inclusion, like *{title: 1}*, all fields that are not included will be excluded except for *_id* field where we need to be explicit about and say if we are not interested, we also want to exclude that same from the resulting document, like *{title: 1, _id: 0}*.


#### Problem 1

Which of the following statements is true regarding reads in MongoDB?

#### Answers 1

Field projection is specified as a JSON object.

* Field projection is specified as the second parameter to *.find()* and *.findOne()*.
* It is passed to these methods as a *JSON object*.

We must explicitly remove the *_id* field in a projection.

* The *_id* field will be returned unless you explicitly remove it from your result set using projection.
* *value* may be 0 (or false) to exclude the field, or 1 (or true) to include it.
* With the exception of the *_id* field, you may not have both inclusions and exclusions in the same projection document.

### Ticket: Projection 2

#### Problem 2

##### User Story 2

"As a user, I'd like to be able to search movies by country and see a list of movie titles. I should be able to specify a comma-separated list of countries to search multiple countries."

##### Task 2

Implement the *getMoviesByCountry* method in *src/dao/moviesDAO.js* to search movies by country and use projection to return the *title* and *_id* field. The *_id* field will be returned by default.

##### MFlix Functionality 2

Once you complete this ticket, the UI will allow movie searches by one or more countries.

##### Testing and Running the Application 2

Make sure to look at the tests in *projection.test.js* to understand what is expected.

### Answer 2

```javascript
/**
   * Finds and returns movies originating from one or more countries.
   * Returns a list of objects, each object contains a title and an _id.
   * @param {string[]} countries - The list of countries.
   * @returns {Promise<CountryResult>} A promise that will resolve to a list of CountryResults.
   */
  static async getMoviesByCountry(countries) {
    let cursor
    try {
      // TODO Ticket: Projection
      // Find movies matching the "countries" list, but only return the title
      // and _id. Do not put a limit in your own implementation, the limit
      // here is only included to avoid sending 46000 documents down the
      // wire.
      cursor = await movies.find(
        { countries: {'$in': countries} },
        { projection: { title: 1, _id: 1 } }
      )//.limit(1)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return []
    }

    return cursor.toArray()
  }
```

### Ticket: Projection 3

#### Problem 3

##### User Story 3

"As a user, I'd like to be able to search movies by cast members, genre, or perform a text search of the plot summary, full plot, and title."

##### Task 3

For this ticket, you will need to modify the method *genreSearchQuery in moviesDAO.js* to allow the following movie search criteria:

* *genres*: finds movies that include any of the wanted genres.

The methods for *text* and *cast* searches are already implemented:

* *textSearchQuery* : performs a text search in the movies collection
* *castSearchQuery*: finds movies that include any of the specified cast

You just need to construct the query in *genreSearchQuery* that queries the *movies* collection by genre. This method should project all document fields.

A text index was created for you when you restored the collections with *mongorestore*, so these queries will be performant once they are implemented.

*Hint*: Check the implementation of similar formats of search criteria - the *genres* query should be similar.

##### MFlix Functionality 3

Once you complete this ticket, the UI will allow movie searches by members of the *cast, movie genres, movie title, and plot* summary.

##### Testing and Running the Application 3

Make sure to look at the tests in *text_subfield.test.js* to understand what is expected.

### Answer 3

```javascript
/**
   * Finds and returns movies matching a given text in their title or description.
   * @param {string} text - The text to match with.
   * @returns {QueryParams} The QueryParams for text search
   */
  static textSearchQuery(text) {
    const query = { $text: { $search: text } } 
    const meta_score = { $meta: "textScore" }
    const sort = [["score", meta_score]]
    const project = { score: meta_score }

    return { query, project, sort }
  }

  /**
   * Finds and returns movies including one or more cast members.
   * @param {string[]} cast - The cast members to match with.
   * @returns {QueryParams} The QueryParams for cast search
   */
  static castSearchQuery(cast) {
    const searchCast = Array.isArray(cast) ? cast : cast.split(", ")

    const query = { cast: { $in: searchCast } }
    const project = {}
    const sort = DEFAULT_SORT

    return { query, project, sort }
  }

/**
   * Finds and returns movies matching a one or more genres.
   * @param {string[]} genre - The genres to match with.
   * @returns {QueryParams} The QueryParams for genre search
   */
  static genreSearchQuery(genre) {
    /**
    Ticket: Text and Subfield Search

    Given an array of one or more genres, construct a query that searches
    MongoDB for movies with that genre.
    */

    const searchGenre = Array.isArray(genre) ? genre : genre.split(", ")

    // TODO Ticket: Text and Subfield Search
    // Construct a query that will search for the chosen genre.
    // const query = {}?
    const query = {genres: {$in: searchGenre }} // Answer
    const project = {}
    const sort = DEFAULT_SORT

    return { query, project, sort }
  }
```

## Chapter 2: User-Facing Backend

### Introduction to Chapter 2

Hello and welcome to Chapter 2 of the *M220 Developer Course*. I hope you've had success developing the *mflix application* into a *MongoDB database* client. Setting up the *driver to read data from Mongo into your application* is fundamental. And I hope you've enjoyed building that crucial piece of infrastructure. Now that we do have a connection from *mflix to Mongo*, we can start really leveraging the *driver* to create a more functional and durable *backend*.

In this chapter, we'll learn why some *complex queries* are not possible with the *query language* alone and how the *aggregation framework* can actually help us build these *queries*. We'll start using the *driver* to *write data* to *MongoDB*. But not all those *writes* are created equal. We'll explore the nature of these *writes* to determine which are critical to our application and then use the *driver* to increase the durability of those *writes*.

As far as *mflix* is concerned, the application's functionality will grow immensely in this chapter. *New users* will be able to join the site, *update their preferences*, and leave *reviews* on the *movies* they feel strongly about. We'll even allow *users* to *edit or remove* their own *reviews*, but make sure they can't mess with anyone else's. All told, this is a dynamite chapter designed to make you comfortable *writing mflix data to Mongo*.

At the end of the chapter, *mflix users* should be able to not only read about their *favorite movies*, but actually create a community on the site.

### Cursor Methods and Aggregation Equivalents

Welcome back. In this lesson, we'll discuss the methods we can call against *MongoDB cursors* and the same actions that we could perform in *aggregation pipeline*.

```javascript
test("Can limit the number of results returned by a cursor", async () => {
    /**
     * We're looking for movies that Sam Raimi directed, but we don't need ALL
     * the movies he directed - we only want a couple of them.
     *
     * Because Sam Raimi directed more than 2 movies in this collection, the
     * .limit(2) will return only 2 results. Similarly, .limit(10) will only
     * return 10 results, and so on.
     */
    const limitedCursor = movies
      .find({ directors: "Sam Raimi" }, { _id: 0, title: 1, cast: 1 })
      .limit(2)

    // expect this cursor to contain exactly 2 results
    expect((await limitedCursor.toArray()).length).toEqual(2)
  })
```

In this example, we're looking for *movies* that were directed by *Sam Raimi*, but we don't need all of the *movies* that he directed. In fact, we only want two of them. The way that we limit the number of results that are returned by a *cursor* is with this *.limit* method. We call the *.limit* immediately after the *.find*. And we specify an integer value for the number of documents that we want back in the *cursor* so that when we do iterate through the *cursor*, we can be sure that there are no more than *two documents* in it.

```javascript
test("Can limit the number of results returned by a pipeline", async () => {
    /**
     * We can also limit the number of results returned by a pipeline, by adding
     * a $limit stage in our aggregation.
     *
     * This pipeline should return only 2 results.
     */
    const limitPipeline = [
      { $match: { directors: "Sam Raimi" } },
      { $project: { _id: 0, title: 1, cast: 1 } },
      { $limit: 2 },
    ]

    const limitedAggregation = await movies.aggregate(limitPipeline)

    expect((await limitedAggregation.toArray()).length).toEqual(2)
  })
```

We can perform the same action in *aggregation* using a *$limit* stage in our pipeline. And we pass the same integer value that represents the number of documents we want back in the *cursor*.

```javascript
test("Can sort the results returned by a cursor", async () => {
    /**
     * By default, the results in a cursor are sorted in "natural" order - this
     * order is an internal implementation, and often has no particular
     * structure.
     *
     * To sort our results in a more structured way, we can choose a key and a
     * sort order, then use .sort() to return the results accordingly.
     *
     * The "year" field denotes the release date of each movie, so the
     * .sort([["year", 1]]) will sort our results on the "year" key, in
     * ascending order. Conversely, .sort([["year", -1]]) would return them in
     * descending order.
     */
    const sortedCursor = movies
      .find({ directors: "Sam Raimi" }, { _id: 0, year: 1, title: 1, cast: 1 })
      .sort([["year", 1]])

    const movieArray = await sortedCursor.toArray()

    // expect each movie in our cursor to be newer than the next movie in the
    // cursor
    for (var i = 0; i < movieArray.length - 1; i++) {
      let movie = movieArray[i]
      let nextMovie = movieArray[i + 1]
      expect(movie.year).toBeLessThanOrEqual(nextMovie.year)
    }
```

In this example, we want the *documents* and the *cursor* to be *sorted*. Using *.sort* or the *aggregation* equivalent that we'll cover in a minute is nice, because it *sorts documents* on the *server side* so that on the *client side*, we can treat the *cursor* like it's already *sorted*. In this case, we're still looking for *movies* that were directed by *Sam Raimi*. But this time we're going to *sort* them by *year*. The *1* here denotes ascending order. So the first *movie* he directed will appear first in our *cursor*, and his latest project will appear last. And here we can verify that the *movies* in our *cursor* had been *sorted* in ascending order on *year*.

```javascript
test("Can sort the results returned by a pipeline", async () => {
    /**
     * We can also sort the results returned by a pipeline, by adding a $sort
     * stage in our aggregation. In the Aggregation Framework, we say
     * { $sort: { year: 1 } } instead of .sort([["year", 1]]).
     *
     * This pipeline should sort our results by year, in ascending order.
     */
    const sortPipeline = [
      { $match: { directors: "Sam Raimi" } },
      { $project: { _id: 0, year: 1, title: 1, cast: 1 } },
      { $sort: { year: 1 } },
    ]

    const sortAggregation = await movies.aggregate(sortPipeline)
    const movieArray = await sortAggregation.toArray()

    for (var i = 0; i < movieArray.length - 1; i++) {
      let movie = movieArray[i]
      let nextMovie = movieArray[i + 1]
      expect(movie.year).toBeLessThanOrEqual(nextMovie.year)
    }
  })
```

So in *aggregation*, we perform the same action with *$sort* stage, sorting our results on *year* in ascending order. But we've passed our sort key and direction as a *key value pair*, as opposed to a *list of lists*.

```javascript
test("Can skip through results in a cursor", async () => {
    /**
     * Sometimes we don't need all the results in a cursor. Especially when the
     * results in the cursor are sorted, we can skip a few results to retrieve
     * just the results that we need.
     *
     * To skip through results in a cursor, we can use the .skip() method with
     * an integer denoting how many documents to skip. For example, skip(5) will
     * skip the first 5 documents in a cursor, and only return the documents
     * that appear after those first 5.

     * Given that we are sorting on year in ascending order, the .skip(5) will
     * skip the 5 oldest movies that Sam Raimi directed, and only return the
     * more recent movies.
     */
    const skippedCursor = movies
      .find({ directors: "Sam Raimi" }, { _id: 0, year: 1, title: 1, cast: 1 })// *offloading work* to the *server*
      .sort([["year", 1]])
      .skip(5)

    const regularCursor = movies
      .find({ directors: "Sam Raimi" }, { _id: 0, year: 1, title: 1, cast: 1 })// *doing that work* on the *client side*
      .sort([["year", 1]])

    // expect the skipped cursor to contain the same results as the regular
    // cursor, minus the first five results
    expect(await skippedCursor.toArray()).toEqual(
      (await regularCursor.toArray()).slice(5),
    )
  })
```

So the last scenario we're going to cover in this lesson is *skipping documents in a cursor*, which we specify with an *integer* value. However, *skipping* only really makes sense when the results are *sorted*, because otherwise we're not really sure which documents were *skipping* over. So here, we've *sorted* on *year* in ascending order and then *skipped the first five documents*. What this does is *skip the five oldest movies* he directed and only returns his most recent movies. And here we can verify that the *cursor using skip* is identical to the one that didn't use *skip*, but used *slice* to remove the *first five elements*. So again, this is just the difference between *offloading work* to the *server* and *doing that work* on the *client side*.

```javascript
test("Can skip through results in a pipeline", async () => {
    /**
     * We can also skip through the results returned by a pipeline, by adding a
     * $skip stage in our aggregation.
     *
     * This pipeline should sort our results by year, in ascending order, and
     * then skip the 5 oldest movies.
     */
    const skippedPipeline = [
      { $match: { directors: "Sam Raimi" } },
      { $project: { _id: 0, year: 1, title: 1, cast: 1 } },
      { $sort: { year: 1 } },
      { $skip: 5 },
    ]

    const regularPipeline = [
      { $match: { directors: "Sam Raimi" } },
      { $project: { _id: 0, year: 1, title: 1, cast: 1 } },
      { $sort: { year: 1 } },
    ]

    const skippedAggregation = await movies.aggregate(skippedPipeline)
    const regularAggregation = await movies.aggregate(regularPipeline)

    expect(await skippedAggregation.toArray()).toEqual(
      (await regularAggregation.toArray()).slice(5),
    )
  })
})
```

To do the same with *aggregation*, we add *$skip* stage to our *pipeline* and then specify the *number of documents* that we want to *skip*.

So just to recap, we covered the three basic methods we can perform against *cursors* and *MongoDB* -- *limit, sort, and skip*. We've also shown that we can chain them together if we need to use more than one. If we're using the *aggregation framework*, we can perform the same three actions with these three stages in a *pipeline*.

### Ticket: Paging 4

#### Problem 4

##### User Story 4

"As a user, I'd like to get the next page of results for my query by scrolling down in the main window of the application."

##### Task 4

Modify the method *getMovies* in *moviesDAO.js* to allow the application to display *new pages of movies*.

##### MFlix Functionality 4

The UI is already asking for infinite scroll, but it's not implemented yet. Only the first 20 movies (the first "page" of movies) appear on the MFlix homepage.

Once this ticket is completed, scrolling to the bottom of the page will load the next 20 movies, or the next page of movies.

##### Testing and Running the Application 4

Make sure you look at the tests in *paging.test.js* to look at what is expected.

### Answer 4

```javascript
/**
   * Finds and returns movies by country.
   * Returns a list of objects, each object contains a title and an _id.
   * @param {Object} filters - The search parameters to use in the query.
   * @param {number} page - The page of movies to retrieve.
   * @param {number} moviesPerPage - The number of movies to display per page.
   * @returns {GetMoviesResult} An object with movie results and total results
   * that would match this query
   */
  static async getMovies({
    // here's where the default parameters are set for the getMovies method
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    let queryParams = {}
    if (filters) {
      if ("text" in filters) {
        queryParams = this.textSearchQuery(filters["text"])
      } else if ("cast" in filters) {
        queryParams = this.castSearchQuery(filters["cast"])
      } else if ("genre" in filters) {
        queryParams = this.genreSearchQuery(filters["genre"])
      }
    }

    let { query = {}, project = {}, sort = DEFAULT_SORT } = queryParams
    let cursor
    try {
      cursor = await movies
        .find(query)
        .project(project)
        .sort(sort)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { moviesList: [], totalNumMovies: 0 }
    }

    /**
    Ticket: Paging

    Before this method returns back to the API, use the "moviesPerPage" and
    "page" arguments to decide the movies to display.

    Paging can be implemented by using the skip() and limit() cursor methods.
    */

    // TODO Ticket: Paging
    // Use the cursor to only return the movies that belong on the current page
    // const displayCursor = cursor.limit(moviesPerPage)?
    const displayCursor = cursor.skip(moviesPerPage*page).limit(moviesPerPage)

    try {
      const moviesList = await displayCursor.toArray()
      const totalNumMovies = page === 0 ? await movies.countDocuments(query) : 0

      return { moviesList, totalNumMovies }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { moviesList: [], totalNumMovies: 0 }
    }
  }
```

### Basic Aggregation

So in this lesson, we're going to briefly cover the *Aggregation framework in MongoDB*. We're going to use the *Aggregation builder in Compass* to export this pipeline to the language of our choice. So the first thing to know about *Aggregation in MongoDB* is that *it's a pipeline composed of one or more stages*. And within each stage, we define expressions that evaluate and transform the data at that particular stage. To use an analogy, documents flow through the pipeline, sort of like the widgets do on a factory conveyor belt. Each stage is like an assembly station.

Documents enter, some work is performed, and then some output is produced that gets piped in as the input to the following stage. So, we have a stage - ($match) that filters out the colors we don't want. Then we have a stage - ($project) to transform the shapes. And then we have a stage - ($group) that collects all input and gives us a ratio of the colors. So each one of those stages in the pipeline used expressions. And at their core, expressions are functions.

So here we're going to take a look at the *add function* in three different programming languages, as well as the *Aggregation framework*.

```python
def add(a, b):
  return a + b
```

So here it is in *Python* -- simple function, has two inputs, and returns the sum of those two inputs.

```java
static <T extends Number> double add(T a, T b) {
  return a.doubleValue() + b.doubleValue();
}
```

So here in *Java*, we have a little more *strict typing*. So we've just specified that the type of each of our input has to extend this number interface, which is to say that we can add the two inputs. But it's more or less the same function.

```javascript
function add(a, b) {
  return a + b
}
```

And here it is in *JavaScript*. It's about as short as it is in *Python*, but the syntax looks a little bit like *Java*.

```javascript
{ "$add": ["$a", "$b"] }
```

So now, here is the *add function* in *aggregation*. Essentially it's this *add expression*, to which we pass an *array of the values* that we want to *sum up*. *So all expressions and stages in the Aggregation framework will have the dollar sign before them*. And the *dollar sign* is just how we refer to *variables within the expression*. We have a course that dives much more deeply into *Aggregation*, covering *syntax and semantics at almost every stage*. You can find more by looking at the lesson handout. Also included is a link to the *Aggregation* quick reference.

So now, let's jump into *Compass* and start building some *Aggregations*. So here I've just opened up *Compass and connected to my Atlas cluster*. Currently I'm connected to the *movie's collection on the MFlix database*. And I'm using the *Aggregations tab* so we can write a *pipeline* against the *movies collection*. The first stage we're going to add is a *match stage* to only pick up *movies that were directed by Sam Raimi*. The way that we're going to do that is by specifying the *field and the value* that we want.

And we can see this is only returning movies to us that have *Sam Raimi as a director in them*. So the way the *match stage* works is actually very interesting and somewhat subtle. So here the *director's field* actually has an *array* as its *value*. And that *array* has all the *directors* for that specific movie. But we only need to specify the one that we want to *match* against, and it will actually parse the *array* out for us.

```javascript
//$match stage
/**
 * query: The query in MQL.
 */
{
  directors: "Sam Raimi"
}
```

So now let's add another stage to this *pipeline*. We're going to try to figure out the *average IMDb rating* for all the movies that *Sam Raimi has directed*. Just going to add a new stage here. So here's a *project stage* in our pipeline. This is going to essentially choose *which fields we want to display and suppress from the previous stage in the pipeline*. I don't really care about the *underscore ID* in this case. So I'm gonna say *I don't want it with a zero*. I do want the *title of the movie*. And I need the *IMDb rating* in order to find the *average*.

```javascript
// $project stage
/**
 * specifications: The fields to
 *   include or exclude.
 */
{
  _id: 0,
  title: 1,
  "imdb.rating": 1
}

// output
title:"The Evil Dead"
imdb:Object
rating:7.6
```

*Now, because rating is contained within an IMDb object, we have to use dot notation in order to project that field. And when we use dot notation, we have to just surround this in quotes*. And it looks like this did what we wanted it to do. We only got back the *title and the IMDb rating* for each movie. So now that we have all the *IMDb rating*s, we can find the *average*. And to do so, we're going to use a *group stage*.

So the *group stage* can be used for a lot of different purposes, but the way we're using it right now is to find the *average of all of the movies Sam Raimi directed*. We've already *matched all the movies that Sam Raimi directed*, so we don't need to *transform the input*. But we really do want to find the *average of all the movies*. So I've specified a *0 as my underscore ID* here.

```javascript
// $group stage
/**
 * _id: The id of the group.
 * fieldN: The first field name.
 */
{
  _id: 0,
  avg_rating: {
    "$avg": "$imdb.rating"
  }
}

// output
_id:0
avg_rating:6.946153846153846
```

*And as the output of this stage, which is the last stage in our pipeline, we see the grouping criteria, which was none, and the average rating value, which was 6.946*. "Way to go, *Sam Raimi*". So just to recap -- *Aggregations in MongoDB are pipelines that are composed of one or more stages. And each stage uses functions that we write in the Aggregation syntax to transform and evaluate the data*.

### Ticket: Faceted Search

#### Problem 5

##### User Story 5

"As a user, I want to be able to *filter cast search results by one facet, metacritic rating*."

##### Task 5

For this Ticket, you'll be required to implement one method in *moviesDAO.js, facetedSearch*, so the MFlix application can perform *faceted searches*.

##### MFlix Functionality 5

Once the change is implemented for this ticket, the user interface will reflect this change when you search for cast member like "Tom Hanks", then additional search parameters will be added as shown below:

![facetedSearchScreenshot](https://university-courses.s3.amazonaws.com/m220/facetedSearchScreenshot.png)

What is a Faceted Search?

Faceted search is a way of narrowing down search results as search parameters are added. For example, let's say MFlix allows users to filter movies by a rating from 1 to 10, but Kate Winslet has only acted in movies that have a rating of 6 or higher.

If we didn't specify any other search parameters, MFlix would allow us to choose a rating between 1 and 10. But if we first search for Kate Winslet, MFlix would only let us choose a rating between 6 and 10, because none of the movie documents in the result set have a rating below 6.

If you're curious, you can read more about Faceted Search here.

Faceted Search in MFlix

Faceted searches on the MFlix site cannot be supported with the basic search method getMovies, because that method uses the Mongo query language. For faceted searches, the application must use the Aggregation Framework.

The method facetedSearch uses the Aggregation Framework, and the individual stages in the pipeline have already been completed. Follow instructions in the moviesDAO.js file to append the required stages to the pipeline object.

##### Testing and Running the Application 5

Look in the *facets.test.js* file in your test directory to view the unit tests for this ticket.

### Answer 5

```javascript
 /**
   *
   * @param {Object} filters - The search parameter to use in the query. Comes
   * in the form of `{cast: { $in: [...castMembers]}}`
   * @param {number} page - The page of movies to retrieve.
   * @param {number} moviesPerPage - The number of movies to display per page.
   * @returns {FacetedSearchReturn} FacetedSearchReturn
   */
  static async facetedSearch({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    if (!filters || !filters.cast) {
      throw new Error("Must specify cast members to filter by.")
    }
    const matchStage = { $match: filters }
    const sortStage = { $sort: { "tomatoes.viewer.numReviews": -1 } }
    const countingPipeline = [matchStage, sortStage, { $count: "count" }]
    const skipStage = { $skip: moviesPerPage * page }
    const limitStage = { $limit: moviesPerPage }
    const facetStage = {
      $facet: {
        runtime: [
          {
            $bucket: {
              groupBy: "$runtime",
              boundaries: [0, 60, 90, 120, 180],
              default: "other",
              output: {
                count: { $sum: 1 },
              },
            },
          },
        ],
        rating: [
          {
            $bucket: {
              groupBy: "$metacritic",
              boundaries: [0, 50, 70, 90, 100],
              default: "other",
              output: {
                count: { $sum: 1 },
              },
            },
          },
        ],
        movies: [
          {
            $addFields: {
              title: "$title",
            },
          },
        ],
      },
    }

    /**
    Ticket: Faceted Search

    Please append the skipStage, limitStage, and facetStage to the queryPipeline
    (in that order). You can accomplish this by adding the stages directly to
    the queryPipeline.

    The queryPipeline is a Javascript array, so you can use push() or concat()
    to complete this task, but you might have to do something about `const`.
    */

    const queryPipeline = [
      matchStage,
      sortStage,
      skipStage,//added
      limitStage,//added
      facetStage//added
      // TODO Ticket: Faceted Search
      // Add the stages to queryPipeline in the correct order.
    ]

    try {
      const results = await (await movies.aggregate(queryPipeline)).next()
      const count = await (await movies.aggregate(countingPipeline)).next()
      return {
        ...results,
        ...count,
      }
    } catch (e) {
      return { error: "Results too large, be more restrictive in filter" }
    }
  }   
```

### Basic Writes

In this lesson, we'll discuss how to perform *write operations in MongoDB*. The *C* and *U* in *Create, Read, Update, and Delete*. The first method we'll talk about is *insertOne*. *InsertOne inserts one document into the database*. Here, I'm performing some global setup and tear down.

```javascript
import { ObjectId } from "mongodb"
describe("Basic Writes", () => {
  /**
   * In this lesson, we'll discuss how to perform write operations in MongoDB,
   * the "C" and "U" in Create, Read, Update, Delete
   *
   * The first method we'll talk about is insertOne. insertOne inserts one
   * document into the database.
   */

//performing some global
  let videoGames
  // for this lesson we're creating a new collection called videoGames
  beforeAll(async () => {
    videoGames = await global.mflixClient
      .db(process.env.MFLIX_NS)
      .collection("videoGames")
  })

  //and tear down
  // and after all the tests run, we'll drop this collection
  afterAll(async () => {
    await videoGames.drop()
  })
```

Let's insert our document with the *title of Fortnite* and the *year of 2018*. When we insert our document, we get an *insertOneWriteOpResult*. Now that's a mouthful, but don't be worried. One of the useful properties is Result on this object, and in the Result object, we have two keys that we need to pay attention to, *N* and *OK*. *N* is the total number of documents inserted, and *OK* means the database responded that the command executed correctly.

```javascript
it("insertOne", async () => {
    /**
     * Let's insert a document with the title Fortnite and a year of 2018
     */
    let insertResult = await videoGames.insertOne({
      title: "Fortnite",
      year: 2018,
    })
    // when we insert a document, we get an insertOneWriteOpResult
    // one of its properties is result. n is the total documents inserted
    // and ok means the database responded that the command executed correctly
    let { n, ok } = insertResult.result
    expect({ n, ok }).toEqual({ n: 1, ok: 1 })
    // it also contains an insertedCount key, which should be the same as n
    // above
    expect(insertResult.insertedCount).toBe(1)
    // the last property we'll talk about on it is insertedId
    // if we don't specify an _id when we write to the database, MongoDB will
    // insert one for us and return this to us here
    expect(insertResult.insertedId).not.toBeUndefined()
    console.log("inserted _id", insertResult.insertedId)

    // let's ensure that we can find document we just inserted with the
    // insertedId we just received
    let { title, year } = await videoGames.findOne({
      _id: ObjectId(insertResult.insertedId),
    })
    expect({ title, year }).toEqual({ title: "Fortnite", year: 2018 })

    // and what if we tried to insert a document with the same _id?
    try {
      let dupId = await videoGames.insertOne({
        _id: insertResult.insertedId,
        title: "Foonite",
        year: 2099,
      })
    } catch (e) {
      expect(e).not.toBeUndefined()
      // we get an error message stating we've tried to insert a duplicate key
      expect(e.errmsg).toContain("E11000 duplicate key error collection")
    }
  })
```

Here, I'm peeling off *N* and *OK* using *object destructuring* from the *insertResult.result* object. And then I expect *N* and *OK* to equal *1*, and *OK 1* because I am *inserting one document*. The *insert result* also contains an *insert count key*, which should be the same as *N* above. The last property we'll talk about is the *insertedId*. If we don't specify an *_id* when we write to the database, *MongoDB* will *insertOne* for us and return this to us here.

So here, I'm expecting that the *insertResult.insertedId* won't be undefined, and I'm logging out the *insertedId* that was given to the document we wrote. Here, let's ensure that we can find the document we just inserted with the *insertedId* we received. So I specify that the *title and year* are the result of the object when we find one with the *_id* of the returned Id that we just got, and I expect that the *title and year* should equal *Fortnite and 2018*. Our tests are passing, and here, we can see the *insertedId* that was assigned to the object we wrote.

What if we tried to insert a document with the same *_id*. Here, we're going to try and insert a document with the same *_id*, but a different *title and a year*. We put this in a *try and catch the error*, and we'll *expect E to not be undefined*. We do *expect an error*, and we expect the error message *to contain* the error code *E11000 duplicate key error*. Let's check this out. All the assertions passed for our first test, so we know that *insertOne* is working correctly.

```javascript
it("insertMany", async () => {
    /**
     * The insertOne method is useful, but what if we want to insert more than
     * one document at a time? The preferred method for that is insertMany
     */

    let megaManYears = [
      1987,
      1988,
      1990,
      1991,
      1992,
      1993,
      1995,
      1996,
      2008,
      2010,
    ]

    // Creating documents to insert based on the megaManYears array above
    let docs = megaManYears.map((year, idx) => ({
      title: `Mega Man ${idx + 1}`,
      year,
    }))

    // now let's insert these into the database
    let insertResult = await videoGames.insertMany(docs)

    // just like insertOne, we'll get a result object back that has information
    // like the number of documents inserted and the inserted _ids
    expect(insertResult.insertedCount).toBe(10)
    expect(Object.values(insertResult.insertedIds).length).toBe(10)
    // and we can see what the insertIds were
    console.log(Object.values(insertResult.insertedIds))
  })
```

Now, the *insertOne* method is useful, but what if *we want to insert more than one document at a time*? The preferred method for that is *insertMany*. Here, I've defined an *array of years* correlating to the year of release for *megaManYears*. And here, I'm *mapping over that array and creating a document where we get the title and the year*. So let's insert these results in the database here. Now, just like *insertOne*, we'll get a result object back that has information like the number of *documents inserted* and the *inserted _ids*. We also expect that the *insertResult.insertedIds should have 10 values*.

Let's go ahead and log those out and see what they were. Great. I can see all of the *_ids* that were automatically created for us by *MongoDB*. Inserting is a very useful *write operation*, but it's also very simple. It inserts new data into the database without regard for what the new data is or what's already in the database, as long as we don't specify a duplicate *_id* or some other value that has the unique index on it. So what happens if we want to *insert a document* but we're not sure if it's already in the database?

```javascript
/**
   * Inserting is a useful write operation, but it's very simple. It inserts
   * new data into the database without regard for what the new data is, or
   * what's already in the database as as long as we don't specify a duplicate
   * _id.
   *
   * So what happens if we want to insert a document, but we're not sure if it's
   * already in the database? We could do a find to check, but that's
   * inefficient when we have the ability to upsert.
   */
  it("upsert", async () => {
    // this is an upsert. We use the update method instead of insert.
    let upsertResult = await videoGames.updateOne(
      // this is the "query" portion of the update
      { title: "Call of Duty" },
      // this is the update
      {
        $set: {
          title: "Call of Duty",
          year: 2003,
        },
      },
      // this is the options document. We've specified upsert: true, so if the
      // query doesn't find a document to update, it will be written instead as
      // a new document
      { upsert: true },
    )

    // we don't expect any documents to have been modified
    expect(upsertResult.result.nModified).toBe(0)
    // and here's the information that the result.upserted key contains
    // an _id and an index
    console.log(upsertResult.result.upserted)

    // what if the document existed?
    upsertResult = await videoGames.updateOne(
      { title: "Call of Duty" },
      // we'll update the year to 2018
      {
        $set: {
          title: "Call of Duty",
          year: 2018,
        },
      },
      { upsert: true },
    )
    // we can see the second upsert result does not have an upserted key
    console.log("second upsert result", upsertResult.result)
    expect(upsertResult.result.nModified).toBe(1)

    // upserts are useful, especially when we can make a write operation
    // generic enough that updating or inserting should give the same result
    // to our application
  })
})
```

We could issue a *find and check* to see if it's there, but that's inefficient when we have the ability to *upsert*. This here is an *upsert*. We use the *update* method instead of the *Insert* method. The first argument to *update* is the query, so we're going to look to *update* a document where the *title is Call of Duty*. This portion here is the *update* itself, where we set *title  to Call of Duty and year  to 2003*. And this is the *upsert* document, the third parameter to *update*. We specified *upsert  to true*, so if the query doesn't find a document to *update*, it will be written instead as a new document.

Now, we've controlled all of the data that's gone into this collection, so we don't expect any documents to have been modified. So here, we have an expect that the *upsertResult.result.nModified is going to be zero*. And scrolling down a little, we'll go ahead and *console log* out the *upserted key of the result object*. And that key contains an *array* that holds an *index information and the _id of the upserted or freshly written document*.

So what if the document existed? Here, we have another *update* operation where we search for a document with the *title, Call of Duty*. We know it was just *inserted*. This time, we'll *update the year to 2018*. Next year, we'll have to *update it to 2019* based on the *Call of Duty* release schedule. Lastly, we'll specify *upsert true*. Then, we'll *console log* out the result of that *update* operation, and expect that *upsertResult.result.nModified is one*.

We see a lot of information printed out, but if we scroll up through this output, we can see *nModified is one*, and there is no *upsert key in this object*. *Upserts* are useful, especially when we can make a write operation generic enough that *updating or inserting* should give the same result to our application. *This is how some websites handle sign up and updating a client account within the same operation*.

So let's summarize. The two idiomatic methods for inserting documents are *insertOne and insertMany*. Trying to insert a *duplicate _id* will fail. And as an alternative to inserting a document, *an upsert in an update method* can be used instead.

### Ticket: User Management

#### Problem 6

##### User Story 6

"As a user, I should be able to register for an account, log in, logout, and delete my account."

##### Task 6

For this Ticket, you'll be required to implement all the methods in *usersDAO.js* that are called by the API endpoints in *users.controller.js*. Specifically, you'll implement:

* getUser
* addUser
* loginUser
* logoutUser
* getUserSession

Registering a new user will insert a document into the *users collection*, and logging in a user will insert a document into the *sessions collection*.

There is a *[unique index](https://docs.mongodb.com/manual/core/index-unique/?jmp=university)* on the *user_id* field in *sessions*, so we can efficiently query on this field.

##### MFlix Functionality 6

Once this ticket is completed, users will be able to register for a new account, log in, logout, and delete their account.

##### Testing and Running the Application 6

Look within the user-management.test.js file to view the unit tests for this ticket.

### Answer 6

```javascript
let users
let sessions

export default class UsersDAO {
  static async injectDB(conn) {
    if (users && sessions) {
      return
    }
    try {
      users = await conn.db(process.env.MFLIX_NS).collection("users")
      sessions = await conn.db(process.env.MFLIX_NS).collection("sessions")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  /**
  Ticket: User Management

  For this ticket, you will need to implement the following five methods:

  - getUser
  - addUser
  - loginUser
  - logoutUser
  - getUserSession

  You can find these methods below this comment. Make sure to read the comments
  in each method to better understand the implementation.

  The method deleteUser is already given to you.
  */

  /**
   * Finds a user in the `users` collection
   * @param {string} email - The email of the desired user
   * @returns {Object | null} Returns either a single user or nothing
   */
  static async getUser(email) {
    // TODO Ticket: User Management
    // Retrieve the user document corresponding with the user's email.
    return await users.findOne({ email: email })// answer
  }

  /**
   * Adds a user to the `users` collection
   * @param {UserInfo} userInfo - The information of the user to add
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async addUser(userInfo) {
    /**
    Ticket: Durable Writes

    Please increase the durability of this method by using a non-default write
    concern with ``insertOne``.
    */

    try {
      // TODO Ticket: User Management
      // Insert a user with the "name", "email", and "password" fields.
      // TODO Ticket: Durable Writes
      // Use a more durable Write Concern for this operation.
      await users.insertOne({ name:userInfo.name, email:userInfo.email, password:userInfo.password })// answer
      return { success: true }
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { error: "A user with the given email already exists." }
      }
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }

  /**
   * Adds a user to the `sessions` collection
   * @param {string} email - The email of the user to login
   * @param {string} jwt - A JSON web token representing the user's claims
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async loginUser(email, jwt) {
    try {
      // TODO Ticket: User Management
      // Use an UPSERT statement to update the "jwt" field in the document,
      // matching the "user_id" field with the email passed to this function.
      await sessions.updateOne(
        { user_id: email },// answer
        { $set: { jwt: jwt } },// answer
        { upsert: true }// answer
      )
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`)
      return { error: e }
    }
  }

  /**
   * Removes a user from the `sessons` collection
   * @param {string} email - The email of the user to logout
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async logoutUser(email) {
    try {
      // TODO Ticket: User Management
      // Delete the document in the `sessions` collection matching the email.
      await sessions.deleteOne({ email: email })// answer
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging out user, ${e}`)
      return { error: e }
    }
  }

  /**
   * Gets a user from the `sessions` collection
   * @param {string} email - The email of the user to search for in `sessions`
   * @returns {Object | null} Returns a user session Object, an "error" Object
   * if something went wrong, or null if user was not found.
   */
  static async getUserSession(email) {
    try {
      // TODO Ticket: User Management
      // Retrieve the session document corresponding with the user's email.
      return sessions.findOne({ email: email })// answer
    } catch (e) {
      console.error(`Error occurred while retrieving user session, ${e}`)
      return null
    }
  }

  /**
   * Removes a user from the `sessions` and `users` collections
   * @param {string} email - The email of the user to delete
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async deleteUser(email) {
    try {
      await users.deleteOne({ email })
      await sessions.deleteOne({ user_id: email })
      if (!(await this.getUser(email)) && !(await this.getUserSession(email))) {
        return { success: true }
      } else {
        console.error(`Deletion unsuccessful`)
        return { error: `Deletion unsuccessful` }
      }
    } catch (e) {
      console.error(`Error occurred while deleting user, ${e}`)
      return { error: e }
    }
  } 
```

### Write Concerns

All right, so in this lesson, we're going to discuss *write concerns* and how they can provide a different level of *write durability* in our application. If you're not sure right now what *write durability* is, no worries. We'll cover it in this lesson. So for right now, let's just consider a *small supermarket application* using a *replica set* as its data source. Whenever a customer puts an item into their cart, the application will send a *write statement over to MongoDB*, and that *write* will be received for that *primary node of the replica set*.

So the first thing the *primary node's* going to do when it receives this *write* is, it's going to apply the *write and its copy of the data*. And by default, as soon as it's done performing the *write in its database*, it's going to send an acknowledgment back to the *client*. So at this point, the *client* has received a *write acknowledgment* back from the database, and it considers the *write* to be complete.

It assumes that the *secondary nodes* will *replicate the data* sometime soon, but it doesn't actually have any immediate proof of it from this acknowledgment alone. So that was an example of a *write with writeConcern -- {w 1}*. The *number 1* here refers to the number of *nodes* in this set that must apply the *write before a client* gets an acknowledgment back from the driver. In this case, it was just *one node*. This is the default behavior in *MongoDB*, so if you send a *write* to *MongoDB* without a writeConcern specified, it will use {w 1} by default.

So now let's consider a different level of write concern.

Our shopping cart application sends a write statement to the primary node, and the primary applies that write just like it did before.

But this time, the primary waits before sending an acknowledgment back to the client.

And what is it waiting for?

Well, before sending an acknowledgment of the write back to the client, the primary will actually wait for one of the secondary nodes to *replicate the data*.

When the secondary applies the write, it will send an acknowledgment back to the primary saying, hey, I applied this write to my copy of the data.

Once the primary knows that in addition to it having applied the write itself, one of the secondaries has also applied the write, only then will it send an acknowledgment back to the client.

This write was sent with w majority, which means that the client isn't going to get an acknowledgment back from the driver until a majority of nodes in the set have applied the write.

In this case, this is a three-node set, so we only needed two of the nodes to apply the write.

You can think of w majority as a contract with the client that this write will not be lost, even in the event of hosts going down.

If an application sends a write with w majority and gets an acknowledgment back for that write, it knows that even if the current primary were to go down, one of the secondaries in the set has also captured the write.

So with w majority, the connection is going to wait for a majority of nodes to apply the write before sending an acknowledgment back to the client.

For that reason, it takes a little longer and is subject to replication lag.

But there's no additional load on the server, so the primary can still perform the same number of writes per second.

However, w majority essentially guarantees to the client that a write will not be rolled back during fail over, because the write was committed to a majority of nodes.

This is useful when some of our writes are vital to the success of the application.

A common example of this is a new user on a website.

These types of operations must succeed, because without an account, the user can't really do anything else on the site.

So I just want to discuss one more write concern, w 0.

By now, you must have realized that when the value of w is a number, it's the number of nodes that must apply a write before the client receives an acknowledgment.

We can pass any number here to the w field, but it will throw us an error if this number is higher than the total number of nodes in the set.

Following that rule, when w's 0, none of the nodes in the set actually need to apply a write before the client gets acknowledgment.

This means that when we're w 0, there's a chance that we get acknowledgment before any data has actually been written.

So if the server crashes, we might lose a few writes.

This type of write is referred to as a fire and forget operation, because it sends the write and doesn't really worry about the response.

But this isn't entirely true, because the acknowledgment from a w 0 operation can also alert us to network errors and socket exceptions.

So the client can implement some logic to figure out if the write was actually received by the database.

In any case, writing with w 0 is very fast and can be useful for less important writes that occur frequently.

For example, if an internet of things device is sending a ping to Mango every two minutes to report its status, it might be OK to speed up every write operation at the risk of losing a few writes.

So to recap, w 1 is the default write concern in Mongo, and it commits a write to one node before sending an acknowledgement back to the client.

w majority will make sure the write was applied by a majority of the set before sending an acknowledgment back to the client.

This means the application will have to wait a little longer for a response, but it should not have a performance impact so long as you have enough connections to the primary to handle your requests.

w 0 does not commit the write at all, but sends an acknowledgement back to the client immediately.

So there's a slightly higher chance that we lose data in the event of a primary going down.