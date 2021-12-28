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
