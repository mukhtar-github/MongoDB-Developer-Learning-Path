# Basic Cluster Administration

## Chapter 0: Introduction & Setup

### Introduction to the Course

Hi there, and welcome to *M103, basic cluster administration*. My name's Matt, and I'm going to be one of your instructors for this course. Together, we'll learn about deploying *MongoDB* in various *architectures*, and how to use the basic administrative tools at your disposal.

In the first chapter, we'll discuss *Mongod*, which is the core database process that handles data requests and manages data access. We'll also cover important aspects of deploying a single *Mongod process*, such as enabling *authentication* and exploring the *database logs*.

In the second chapter, we'll discuss how *MongoDB* supports high availability by replicating our data. With multiple copies of data on different database servers, replication provides a level of fault tolerance against the loss of a single database server.

In this course, we'll go through the general architecture and behavior of a replica set, and the different deployment strategies you can use to better suit your application. In the final chapter, we'll discuss *scalability* and how *MongoDB* scales horizontally through *sharding*.

In this course, we're going to cover topics like the *architecture of a sharded cluster*, how queries are handled, and how to choose the way your data is distributed. This course is three chapters long. And with each chapter, there'll be a new set of lesson videos. After each lesson, there will be a quiz to assess your learning of the material. Lab exercises are dispersed throughout each chapter so that you can apply what you've learned throughout.

So let's go over a few logistics of the course very quickly. Who's the target audience? This is a basic course. So it's suitable for people on both development and administration teams. It's expected that you already have some basic knowledge or understanding of databases or a basic familiarity with *MongoDB*.

For example, if you took *M001 on MongoDB University*, and you feel comfortable with what you learned in that class, then you're in the right place. How does the *grading* work? There are *quizzes, labs, and a final exam* as deliverables on your part during the course. One half of your grade in the class will be determined by how you do in the labs, and the other half will be determined by your performance on the final exam.

The quizzes are ungraded and they exist mainly to help you track your own understanding of the material. Students with a grade of 65% or greater will receive a passing grade and a *certificate of course completion*. Throughout the course, we highly encourage you to participate in the discussion forum. We provide knowledgeable teaching assistants who are there to help answer your questions. But you also have your fellow classmates who are often very helpful resources, as they take the course alongside you.

> By the end of this course, you should be familiar with the *different tools and techniques used to administer basic MongoDB deployments*. You'll be able to identify different *MongoDB architectures* and use the *MongoDB shell* to configure them. So without further ado, thank you for deciding to learn with us. And we wish you the best of luck.

### Navigating the In-Browser IDE

In this lesson, I want to introduce you to our *in-browser IDE*. It's a space where you can practice what you learned or get a grade for a lab that you just completed. But essentially, we want you to get as much *hands-on practice* and learning as possible. And that's what this is for.

This is an example of an *in-browser IDE lab*. There is the *title of the lesson* and then the *problem description*. In this particular case, it's an ungraded problem. So as this description says, practice what you learned in earlier lectures. And maybe even find answers to some of the quiz questions.

So this is your *sandbox* playground space. Scrolling down, I get to the actual *in-browser IDE*. Let's examine it a little closer. There are multiple tabs and windows in this one little area. So let's go from left to right. This highlighted area in green is where you get to browse the files, the files that are given to you by the lab or by the instructor that usually have something to do with the instructions above the actual *IDE* space.

You can switch between the files that were given to you. And the file contents will be displayed on the right side over here, which is your *code or text editor*. This you can use as an actual editor. You can edit these files as you like. And the changes will stay here unless you reset the workspace, which you can do by clicking this button right here.

Now, when I look back at the file that I just edited, point 6 is no longer there. So this workspace was completely reset with what it was originally configured to hold. The files given to you may not always be just plain text files like in this case where we're just looking at problems that were referenced earlier in the chapter so that you can practice them.

You could also have *JSON* files or *snippets* of other types of files that you can edit in the code editor on the right.You can also collapse the browse files functionality and just have a little more space for editing the files. Another functionality that the *in-browser IDE* has is the *terminal window*.

If you are looking to issue *shell* commands, this is the space for it. Here I can issue any shell command that I want for the purposes of this course. So I can try to issue the Mongo command and hope that it is installed. The shell is actually installed. But I didn't provide any other arguments, so I get an error.

If this is a graded assignment, then there will be some test cases that will run against your solution. So after you complete following the instructions in the lab, you could hit the *Run Test* button. And the Test Results tab in the terminal part of the screen will show how many tests were run, how many tests were passed, and how many tests were skipped.

And if this is a graded assignment, you will get feedback on your solution. As you can see, this assignment is not graded. And because there are no passed tests, the message is telling me, incorrect, try again. But I don't care, because I'm not getting a grade for this. I'm here to practice and learn from that.

Make sure when you get to an *in-browser IDE lab* to check whether the assignment is graded or not and to carefully read the instructions that are provided for you on the page. I hope you enjoy learning with us. And good luck.

## Chapter 1: The Mongod

### The Mongod

In this lesson, we'll discuss *mongod*, the *daemon* process for *MongoDB*. You'll learn what *mongod* is, how it works at a high level, and how to interact with it using a database client. We'll also go over the default configuration for *mongod*. Before understanding what *mongod* is, we need to define the term *daemon*.

A *daemon* is a program or process that's meant to be run but not interacted with directly. *Daemons* usually have a *D* appended to their name, which gives us the name *mongod*.
> *mongod* is the main *daemon* process for *MongoDB*.

It is the core server of the database, handling connections, requests, and most importantly, persisting your data. *mongod* contains all of the configuration options we can use to make our database secure, distributed, and consistent. Our *MongoDB* deployment may consist of more than one server.

For example, our data may be distributed in a *replica set* or across a *sharded cluster*. In this case, we run a separate *mongod* process for each server in our cluster. When we launch *mongod*, we're essentially starting up a new *database*. But we don't interact with the *mongod* process directly. Instead, we use a *database* client that is programmed to communicate with *mongod*.

We issue *database* commands, like document *inserts* or *updates*, to the client, and the client takes care of communicating with *mongod* to execute those commands. If our deployment has multiple servers, we can configure our client to communicate with each of these *mongod* processes as needed. So we don't need to figure out which server to connect to ourselves.

Now that we have an idea of what *mongod* is used for, let's talk about how to use it. The easiest way to start up a *mongod* process is to run the command *sudo systemctl start mongod* in the terminal. Notice that we no longer have a command prompt in our terminal. If we try to type a command, such as ls, we'll just get a new line. If we want to continue using the terminal, we need to open a new window (*old way*).

As we'll see in later lessons, we can configure *mongod* by providing a configuration file or specifying flags. But there are some default values to be aware of when launching *mongod* without any options. The port *mongod* listens on will default to *27017*. Clients that want to access *mongod* should specify the same port.

The default dbpath is */data/db*. This is where the data files representing your databases, collections, and indexes are stored so that your data persists after *mongod* stops running. The dbpath also stores journaling information so that your data remains consistent in the case of an unexpected crash.
> *mongod* binds to localhost by default.

This means that the only database clients that can connect with *mongod* are ones local to the machine where *mongod* is running. We'll learn in later lessons how to bind to other IP addresses and hosts to allow remote clients to connect. Authentication is turned off by default. This means that unless we enable off, database clients are not required to authenticate before accessing the database.

Understanding the default values should make it easier to read the *mongod* output. On the first line, we can see the dbpath and the port. A little further down we also have two warnings, that access control is not enabled -- that is, we have not turned on authentication -- and that *mongod* is only bound to localhost.

> As we said before, we don't communicate with *mongod* directly when we issue commands to our database. Instead, we issue commands through a *database client*.

In this lesson, we'll use the *Mongo Shell* as our *database client* to communicate with *mongod*. And we'll issue our commands with the *Mongo query language*. The *Mongo Shell* allows us to interact with *MongoDB* directly in the terminal. By default, the *Mongo Shell* will connect to *port 27017*, which is the port our *mongod* process is currently listening on.

To get the *Mongo Shell* up and running, we just need to type the command *mongo*. To verify the *Mongo Shell* is connected to our *mongod* process, we can check the output in the *mongod window*. The output shows that one connection is now open, and that the application is the *MongoDB shell*.

Once the *Mongo Shell* is connected to *mongod*, we can issue database commands like *insert and find*. Let's try an example. Say we want to add an *employees collection* to our database. All we need to do is type in the command *db.createCollection* and pass in the name of the collection we want to create. The shell outputs an OK message to indicate that we successfully created a new collection.

```javascript
db.createCollection("employees")
{ "ok" : 1 }
```

We can also see the results of the *createCollection* command in the *mongod* output. When we're done, we can use the shell to close our *mongod* connection with the following command -- *use admin - db.shutdownServer - and exit*. Again, let's check the *mongod* window to verify that *mongod* is no longer running. *mongod* outputs that it received the shell command and cleaned up after itself by closing sockets and shutting down.

Of course, the *Mongo Shell* isn't the only way we can connect to *mongod*. *MongoDB* provides other database clients such as *MongoDB Compass*, which is a graphical user interface for *MongoDB*, and drivers in several different languages like *Node.js*, which provide *APIs* to connect to *mongod* in your applications.

Let's recap what we learned in this lesson. We defined *mongod as the main daemon process for MongoDB*. We talked about some default configurations when we run *mongod*. And we learned about database clients and used the *Mongo Shell to connect with mongod*.

### Mongod Options

Below are some of the available options for mongod. Note that this is not a comprehensive list of all possible *mongod* configurations. To see all available options, run *mongod with the help flag*.

```javascript
mongod --help
```

This command will output the various options for *mongod* with a description of their functionality. Note: The *--fork* option is not available on the Windows operating system.

#### dbpath

The *dbpath* is the directory where all the data files for your database are stored. The *dbpath* also contains *journaling logs* to provide durability in case of a crash. As we saw before, the default **dbpath is /data/db**; however, you can specify any directory that exists on your machine. The directory must have *read/write* permissions since database and journaling files will be written to the directory. To use the *dbpath* option, include the *dbpath flag* and specify the name of your directory:

```javascript
mongod --dbpath <directory path>
```

#### port

The**port** option allows us to specify the port on which mongod will listen for client connections. If we don't specify a port, it will default to 27017. Database clients should specify the same port to connect to mongod. To specify a port, run:

```javascript
mongod --port <port number>
```

#### auth

**auth** enables authentication to control which users can access the database. When **auth** is specified, all database clients who want to connect to *mongod* first need to authenticate.

Before any database users have been configured, a *Mongo shell* running on localhost will have access to the database. We can then configure users and their permission levels using the shell. Once one or more users have been configured, the shell will no longer have default access. To enable authentication, run *mongod with the auth option*:

```javascript
mongod --auth
```
