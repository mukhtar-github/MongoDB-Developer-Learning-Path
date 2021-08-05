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

The **dbpath** is the directory where all the data files for your database are stored. The *dbpath* also contains *journaling logs* to provide durability in case of a crash. As we saw before, the default **dbpath is /data/db**; however, you can specify any directory that exists on your machine. The directory must have *read/write* permissions since database and journaling files will be written to the directory. To use the *dbpath* option, include the *dbpath flag* and specify the name of your directory:

```javascript
mongod --dbpath <directory path>
```

#### port

The **port** option allows us to specify the port on which mongod will listen for client connections. If we don't specify a port, it will default to 27017. Database clients should specify the same port to connect to mongod. To specify a port, run:

```javascript
mongod --port <port number>
```

#### auth

**auth** enables authentication to control which users can access the database. When **auth** is specified, all database clients who want to connect to *mongod* first need to authenticate.

Before any database users have been configured, a *Mongo shell* running on localhost will have access to the database. We can then configure users and their permission levels using the shell. Once one or more users have been configured, the shell will no longer have default access. To enable authentication, run *mongod with the auth option*:

```javascript
mongod --auth
```

#### bind_ip

The **bind_ip** option allows us to specify which IP addresses *mongod* should bind to. When *mongod* binds to an IP address, clients from that address are able to connect to *mongod*. For instance, if we wanted to allow clients on IP address *123.123.123.123* to access our database, we'd use the following command:

```javascript
mongod --bind_ip 123.123.123.123
```

To *bind* to multiple addresses and/or hosts, you can specify them in a comma-separated list:

```javascript
mongod --bind_ip localhost,123.123.123.123
```

If using the **bind_ip** option with external IP addresses, it's recommended to enable **auth** to ensure that remote clients connecting to **mongod** have the proper credentials.

### Configuration File

The *MongoDB configuration file* is a way to organize the options you need to run the *MongoD or MongoS* process into an easy to parse *YAML* file. For the majority of use cases outside of the most basic of development or evaluation, you should be using a *configuration file* for storing your *MongoD or MongoS* startup options.

Before we get into more detail on the *configuration file*, let's first start with what a *MongoD* option is. If you've interacted with a program in a terminal or shell environment, you are likely already familiar with how the command line options work. Typically you have your *main executable* -- for example, the *MongoD*.

Then you chain in your command line options. Some of them like take a value, like *dbpath and logpath*. Others work like a flag and don't require a value to direct behavior, like *fork*. In the end, you have your full command on the command line with potentially dozens of options and values. This command is perfectly valid and would work fine in production environments.

```javascript
mongod --dbpath /data/db --logpath /data/log/mongod.log --fork --replSet "M103" --keyFile /data/keyfile --bind_ip "127.0.0.1,192.168.103.100" --tlsMode requireTLS --tlsCAFile "/etc/tls/TLSCA.pem" --tlsCertificateKeyFile "/etc/tls/tls.pem"
```

But there are problems with this approach. We would have to type this whole thing over again every time we would like to launch a new *MongoD* in a different server. If we want to track these settings, we would need to grep the existing services running in the server or run a command within *MongoDB*. Finally, it's harder to read and look for individual options along this very long command line string.

Before we get into the *configuration file*, let's start with a few common *command line options*. You have your basic path configuration options -- **dbpath and logpath**. Starting with *3.6*, you need to set **bind ip** to include a network adapter on the host that provides access to the network. Otherwise, the *MongoD* can only accept connections on that same host.

#### Command line options

1. --dbpath
2. --logpath
3. --bind_ip
4. --replSet
5. --keyFile
6. --sslPEMKey
7. --sslCAKey
8. --sslMode
9. --fork

Setting the **replSet and keyFile** options starts up the *MongoD in replication mode* with basic *intercluster auth security and user authentication* enabled. These are very common options, and chances are, you'll see at least one of these in any *MongoDB* deployment. The **SSL options** are related to **tls ssl** transport encryption. You don't need to know much about these options in detail for this course.

Take a look at *M310* here on *MongoDB University* for an in-depth course on *cluster security*, including *tsl ssl*. Alternatively, take a look at our documentation. Finally, we have **fork**, which just tells the *MongoD run as a daemon* instead of being tied to a terminal window.

So what are the *configuration file* counterparts to these *command line options*? Below, I have the full path to the configuration option. That means each key in the path to the final value is the parent of the *YAML* file. So the *replSet name* configuration option falls under the *replication parent key*.

#### Configuration file options

1. storage.dbPath
2. systemLog.path and systemLog.destination
3. net.bind_ip
4. replication.replSetName
5. security.keyFile
6. net.ssl.sslPEMKey
7. net.ssl.sslCAKey
8. net.sslMode
9. processManagement.fork

*Configuration files* to support deeper nesting as well. Take a look at these two options -- *sslPEMKey and sslCA* file. These are both under the *SSL parent*, which themselves are under the *net parent*. The *net parent* also captures *bind ip*. All three options are related to the *net parent*, but *sslPEMKey and sslCAKey* are specific to *net.ssl*.

Now, how did I get to these mappings? This is where our fantastic manual comes to the rescue. All of our *command line options and our configuration file options* are well documented in these two links -- <https://docs.mongodb.com/manual/reference/program/mongod/#options> and <https://docs.mongodb.com/manual/reference/configuration-options/>. I invite you to give these a look to find out about which *command line options or configuration file options* are available and how to map between the two.

Now let's take our list of *configuration file options* with the full path to the option and translate that into our *configuration YAML file*. *YAML Ain't Markup Language*.
> *YAML* is a *data serialization language* that is often used for writing *configuration files and in applications where data is being stored or transmitted*.

```javascript
storage:
  dbPath: "/data/db"
systemLog:
  path: "/data/log/mongod.log"
  destination: "file"
replication:
# This is the name of the replica set for M103
  replSetName: "M103"
net:
  bindIp : "127.0.0.1,192.168.103.100"
tls:
  mode: "requireTLS"
  certificateKeyFile: "/etc/tls/tls.pem"
  CAFile: "/etc/tls/TLSCA.pem"
security:
  keyFile: "/data/keyfile"
processManagement:
  fork: true
```

You have your *key value* pairs. The *top level key and a MongoDB configuration file* represents a logical grouping of options. Each *nested element* under a *top level key* represents an option related to that *top level key*. So here we see that *dbPath* is a *storage* option. Remember, previously this was listed as *storage.dbPath*. The command line option was *--dbPath*.

A key can have multiple embedded *key pair values*, each representing an option related to the *top level key*. So here we have our *systemLog* family of options, where I am specifying the *path* to the *log file and the file type*. You'll notice that our one option, *log path*, became two.

Sometimes a *configuration file* option will have one or more required chained options. The documentation will always clearly state these relationships. It's also easier to see distinct groupings of related options. I can clearly distinguish the *storage* options from the *system logging* options from the *replication* options.

I've even added a comment to improve readability and comprehension. The *configuration file* options have the same effect as the *command line* options, but as you can see, the *YAML* format provides significant advantages. These are all of the options from our initial example. The effect on the *MongoD* is the same, but the organization and readability is vastly improved.

Now how do we use a *configuration file*? Well, we're going to have to use at least one *command line* option for this to work. Specify *--config* or *-f* along with a path to the *configuration file*. For many Linux distributions, when installing *MongoDB* through a *package manager*, you'll find a default *configuration file in etc/mongod.conf*.

```javascript
mongod --config "/etc/mongod.conf"
```

or

```javascript
mongod -f "/etc/mongod.conf"
```

Feel free to modify this or point to your own *configuration file*. You just need to ensure that the *MongoD* process can access the file location and read the file. You can find the complete list of *configuration file* options and how to use them on our online documentation. The documentation also includes structural examples, as well as a description of how the options work and what the expected values are.
> To recap, *configuration file* options provide the same functionality as our *command line* options. They improve the readability of our *configuration settings*, and you can use the documentation to facilitate mapping a *command line option to a configuration file* option.

#### Lab: Configuration File

##### Problem

1. Launch a mongod instance in the IDE terminal with a configuration file:

Write the configuration file. There should be an empty configuration file in your IDE File Editor, where you can specify options in *YAML*.

As a reminder, here are the requirements of your *mongod* instance:

* run on port 27000
* authentication is enabled

2. When your config file is complete, launch mongod with the --config command line option:
