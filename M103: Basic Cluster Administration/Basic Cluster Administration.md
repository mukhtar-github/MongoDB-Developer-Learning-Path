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

It is the core server of the database, handling *connections, requests, and most importantly, persisting your data*. *mongod* contains all of the configuration options we can use to make our database *secure, distributed, and consistent*. Our *MongoDB* deployment may consist of more than one server.

For example, our data may be distributed in a *replica set* or across a *sharded cluster*. In this case, we run a separate *mongod* process for each server in our cluster. When we launch *mongod*, we're essentially starting up a new *database*. But we don't interact with the *mongod* process directly. Instead, we use a *database* client that is programmed to communicate with *mongod*.

We issue *database* commands, like document *inserts* or *updates*, to the client, and the client takes care of communicating with *mongod* to execute those commands. If our deployment has multiple servers, we can configure our client to communicate with each of these *mongod* processes as needed. So we don't need to figure out which server to connect to ourselves.

Now that we have an idea of what *mongod* is used for, let's talk about how to use it. The easiest way to start up a *mongod* process is to run the command *mongod* in the terminal.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongod
{"t":{"$date":"2021-08-12T04:00:05.285+01:00"},"s":"I",  "c":"CONTROL",  "id":23285,   "ctx":"main","msg":"Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'"}
{"t":{"$date":"2021-08-12T04:00:05.302+01:00"},"s":"W",  "c":"ASIO",     "id":22601,   "ctx":"main","msg":"No TransportLayer configured during NetworkInterface startup"}
{"t":{"$date":"2021-08-12T04:00:05.303+01:00"},"s":"I",  "c":"NETWORK",  "id":4648601, "ctx":"main","msg":"Implicit TCP FastOpen unavailable. If TCP FastOpen is required, set tcpFastOpenServer, tcpFastOpenClient, and tcpFastOpenQueueSize."}
{"t":{"$date":"2021-08-12T04:00:05.322+01:00"},"s":"I",  "c":"STORAGE",  "id":4615611, "ctx":"initandlisten","msg":"MongoDB starting","attr":{"pid":4716,"port":27017,"dbPath":"/data/db","architecture":"64-bit","host":"mukhtar-Aspire-ES1-431"}}
{"t":{"$date":"2021-08-12T04:00:05.322+01:00"},"s":"I",  "c":"CONTROL",  "id":23403,   "ctx":"initandlisten","msg":"Build Info","attr":{"buildInfo":{"version":"4.4.7","gitVersion":"abb6b9c2bf675e9e2aeaecba05f0f8359d99e203","openSSLVersion":"OpenSSL 1.1.1f  31 Mar 2020","modules":[],"allocator":"tcmalloc","environment":{"distmod":"ubuntu2004","distarch":"x86_64","target_arch":"x86_64"}}}}
{"t":{"$date":"2021-08-12T04:00:05.322+01:00"},"s":"I",  "c":"CONTROL",  "id":51765,   "ctx":"initandlisten","msg":"Operating System","attr":{"os":{"name":"Ubuntu","version":"20.04"}}}
{"t":{"$date":"2021-08-12T04:00:05.322+01:00"},"s":"I",  "c":"CONTROL",  "id":21951,   "ctx":"initandlisten","msg":"Options set by command line","attr":{"options":{}}}...
{"t":{"$date":"2021-08-12T04:00:05.383+01:00"},"s":"I",  "c":"CONTROL",  "id":20565,   "ctx":"initandlisten","msg":"Now exiting"}
{"t":{"$date":"2021-08-12T04:00:05.383+01:00"},"s":"I",  "c":"CONTROL",  "id":23138,   "ctx":"initandlisten","msg":"Shutting down","attr":{"exitCode":100}}
```

Notice that we no longer have a command prompt in our terminal. If we try to type a command, such as ls, we'll just get a new line. If we want to continue using the terminal, we need to open a new window (*old way*).

As we'll see in later lessons, we can configure *mongod* by providing a configuration file or specifying flags. But there are some default values to be aware of when launching *mongod* without any options. The port *mongod* listens on will default to *27017*. Clients that want to access *mongod* should specify the same port.

The default dbpath is */data/db*. This is where the data files representing your databases, collections, and indexes are stored so that your data persists after *mongod* stops running. The dbpath also stores journaling information so that your data remains consistent in the case of an unexpected crash.
> *mongod* binds to localhost by default.

This means that the only database clients that can connect with *mongod* are ones local to the machine where *mongod* is running. We'll learn in later lessons how to bind to other IP addresses and hosts to allow remote clients to connect. Authentication is turned off by default. This means that unless we enable off, database clients are not required to authenticate before accessing the database.

Understanding the default values should make it easier to read the *mongod* output. On the line with *STORAGE* component, we can see the *dbpath and the port*. A little further down we also have two warnings, that access control is not enabled -- that is, we have not turned on authentication -- and that *mongod* is only bound to localhost.

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

# Basic configuration file
processManagement:
   fork: true
net:
   bindIp: localhost
   port: 27017
storage:
   dbPath: /var/lib/mongo
systemLog:
   destination: file
   path: "/var/log/mongodb/mongod.log"
   logAppend: true
storage:
   journal:
      enabled: true

# Sample configuration file
systemLog:
   destination: file
   path: "/var/log/mongodb/mongod.log"
   logAppend: true
storage:
   journal:
      enabled: true
processManagement:
   fork: true
net:
   bindIp: 127.0.0.1
   port: 27017
setParameter:
   enableLocalhostAuthBypass: false
...
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

1. Launch a *mongod* instance in the IDE terminal with a configuration file:

Write the configuration file. There should be an empty configuration file in your IDE File Editor, where you can specify options in *YAML*.

As a reminder, here are the requirements of your *mongod* instance:

* run on port **27000**
* authentication is enabled

2. When your config file is complete, launch mongod with the *--config* command line option:

```javascript
mongod --config "/etc/mongod.conf"
```

or

```javascript
mongod -f "/etc/mongod.conf"
```

3. Once *mongod* is running, open a new Terminal window and use the following command to create an admin user. **You will need to create this user in order to validate your work**.

```javascript
mongo admin --host localhost:27000 --eval '
  db.createUser({
    user: "m103-admin",
    pwd: "m103-pass",
    roles: [
      {role: "root", db: "admin"}
    ]
  })
'
```

#### Answer

```javascript
systemLog:
   destination: file
   path: "/var/log/mongodb/mongod.log"
   logAppend: true
storage:
   journal:
      enabled: true
processManagement:
   fork: true
net:
   bindIp: 127.0.0.1
   port: 27000
security:
    authorization: enabled
```

### File Structure

In this lesson, we will cover the file structure of a *MongoDB standalone server*. This is a list of the files you can expect to find in a data directory of a *MongoDB server or standalone process*.

```javascript
/data/db
  WiredTiger
  WiredTiger.wt
  WiredTiger.lock
  WiredTiger.turtle
  WiredTigerLAS.wt
  _mdb_catalog.wt
  mongod.lock
  sizeStorer.wt
  collection-n.wt
  index-n.wt
  diagonostic.data
  storage.bson
```

You typically never need to interact with the files in this data folder unless directed to by *MongoDB support personnel* or through a procedure detailed in our documentation. None of these files are designed for user access or modification, and modifying them can cause crashes or data loss. If you want to explore, please take time to make sure you are performing read functions only. Let's take a look at a real *MongoDB* deployment.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ ls -1 /var/lib/mongodb/
collection-0-2220429308737549451.wt
collection-0--2342126649730374789.wt
collection-2-2220429308737549451.wt
collection-2-6521560288725605282.wt
collection-4-2220429308737549451.wt
collection-4-6521560288725605282.wt
diagnostic.data
index-1-2220429308737549451.wt
index-1--2342126649730374789.wt
index-3-2220429308737549451.wt
index-3-6521560288725605282.wt
index-5-2220429308737549451.wt
index-6-2220429308737549451.wt
index-6-6521560288725605282.wt
journal
_mdb_catalog.wt
mongod.lock
sizeStorer.wt
storage.bson
WiredTiger
WiredTigerHS.wt
WiredTiger.lock
WiredTiger.turtle
WiredTiger.wt
```

The group of files in *WiredTiger.turtle* is related to how the *WiredTiger* storage engine keeps track of information like *cluster metadata* and *WiredTiger-specific configuration* options. The *WiredTiger.lock* file acts as a safety. If you ran a second simultaneous *MongoDB* process and pointed at this */var/lib/mongodb/* folder, the lock file helps prevent that second *MongoDB* process from starting up.

If you experience an unclean shutdown such, as the host machine losing power or a crash of some sort, you may find that you cannot start up the *MongoD* due to this lock file. You may be instructed to delete lock files before restarting the *MongoD*. Remember that if you are not guided by *MongoDB* support or a documented procedure, do not interact with any of these files.

The next group of files ending in *.wt* are related to *collection and index* data itself. There are your *collection data* and your *index data*. *MongoDB WiredTiger* stores *index data* as a separate structure from *collection data*. Each *collection and index* gets its own file. Even in a brand new *MongoDB* deployment, you typically have a few databases and collections by default, so you should always see some *collection and index.wt* files.

You can try to introspect these data files using a program like Strings, but there's not much human readable data here. These files are designed to be interacted with through the *MongoDB server process*, rather than a third party tool. Modifying these tools can lead to data loss and crashes. Now this *diagnostic.data* folder looks pretty interesting. Let's take a quick look.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ sudo ls -1 /var/lib/mongodb/diagnostic.data/
[sudo] password for mukhtar: 
metrics.2021-04-14T10-16-25Z-00000
metrics.2021-04-16T10-28-53Z-00000
metrics.2021-04-16T13-17-09Z-00000
metrics.2021-04-16T14-15-49Z-00000
metrics.2021-08-05T11-58-27Z-00000
metrics.interim
```

This data contains *diagnostic data* captured for specific use by *MongoDB* support. To be very clear, we are not capturing any of your actual private data. The *diagnostic data* is captured by a *Full Time Data Capture, or FTDC module*. *FTDC* collects data from the following commands.

```javascript
FTDC periodically collects statistics produced by the following commands:

serverStatus
replSetGetStatus (mongod only)
collStats for the local.oplog.rs collection (mongod only)
connPoolStats (mongos only)
```

If you try to take a look at the data produced by the *FTDC module* using something like Strings, you'll find that it's not human readable. This data is only used for diagnostic purposes by *MongoDB support engineers*. And they can only look at that data if you explicitly provide it.

Moving forward, let's take a look at our *journal files*. Each of these *journal files* are part of the *WiredTiger journaling system*. Let's talk about that just briefly. With *MongoDB WiredTiger*, **write operations** are buffered in memory and are flushed every 60 seconds, creating a checkpoint of data.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ sudo ls -1 /var/lib/mongodb/journal/
WiredTigerLog.0000000058
WiredTigerPreplog.0000000001
WiredTigerPreplog.0000000002
```

*WiredTiger* also uses a write ahead logging system turning on the *journal file*. *Journal* entries are first buffered in memory, and then *WiredTiger*, syncs the *journal* to *disk* every 100 milliseconds. Each *journal file* is limited to 100 megabytes of size. *WiredTiger* uses a *file rotation method* for syncing data to disk. In the event of a failure, *WiredTiger* can use the *journal* to recover data that occurred between checkpoints.

For example, during normal operations, *WiredTiger* flushes data to disk every 60 seconds, or when the *journal file* has 2 gigabytes of data. These flushes again create a durable checkpoint. If the *MongoD* crashes between checkpoints, there is a possibility that data was not safely and fully written. When the *MongoDB* gets back online, *WiredTiger* can check if there is any recovery to be made.

In case that there are some incomplete writes, *WiredTiger* looks at the existing data files to find the identifier of the last checkpoint. It then searches the *journal files* for the record that matches the identifier of the last checkpoint. Finally, it applies operations in the *journal files* since the last checkpoint. At the end, the *MongoDB server* can resume normal execution. Let's take a look at the last group of files.

The *mongod.lock file* has a similar function to the *WiredTiger.lock file*. If the file is not empty, it means that a *MongoDB process* is currently active in the */var/lib/mongodb/* directory. Any other *MongoDB process* attempting to access this directory will fail to startup in that event. If the file is empty, then everything is clear. In some unusual situations, like an unclean shutdown, the *mongod.lock file* won't be empty, even though the *MongoD* is no longer running.

You may need to delete the *mongod.lock file* if directed to by support or our documentation. These remaining two files *sizeStorer.wt and storage.bson* are more support and metadata files for *WiredTiger*. Remember, you should never need to interact with any of these files and modifying them may result in crashes or data loss. In addition to the files held here in the data directory, there is also the *log file*. We're going to be going over logging in more detail in the later lesson.

> But just to give you a quick look, you can see in my *log*, there's not a whole lot of information in here right now. That's because I'm not really doing anything with my server. As you use your *MongoDB server*, the *log file* will fill with additional information. These *log files* are vital for post failure diagnostics and should be treated with care as well. It's up to you if you want to place your *log files* in the same directory as your *data files*.

It's not a bad idea to keep them separate though. There's one more file that we should talk about, but it's in neither of the two directories we've talked about so far.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ ls -1 /tmp
appInsights-nodeAIF-444c3af9-8e69-4462-ab49-4191e6ad1916
config-err-yWvX1M
exthost-97445c.cpuprofile
mongodb-27017.sock
```

This *mongodb-27017.sock file* is a socket file used by *MongoDB* to create a *socket connection* at the specified port. *MongoDB* needs to use *sockets* for interprocess communications. Without this file, the *MongoDB* cannot function.

This file is created at startup and lets the *MongoDB server* own this port. If there is a crash or other unclean shutdown, you might find an error on startup related to this file. You can safely delete it if directed to by support or our documentation in that event.

Let's recap. Some files, such as *diagnostic.data* and your *log files*, are used by *MongoDB support* for helping you resolve problems with your database. The rest are exclusively used by the *MongoDB server process* for normal operations and should not be modified without specific direction from *MongoDB support*. Defer to the *MongoDB support* or our documentation for instructions on interacting with any of these files.

### Lab: Change the Default DB Path

#### Problem

Use a *configuration file* to store database files in a new directory:

1. Create a new folder /var/mongodb/db/:

```javascript
mkdir -p /var/mongodb/db
```

2. Edit your config file to use this new directory as the *dbpath*.

Here are the updated requirements for your mongod instance:

* runs on port **27000**
* stores its data files in **/var/mongodb/db/**
* listens to connections from **localhost**
* uses authentication

3. Launch *mongod* with the new configuration.

4. Use the following command to connect to the Mongo shell and create the following user. **You will need to create this user in order to validate your work**.

```javascript
mongo admin --host localhost:27000 --eval '
  db.createUser({
    user: "m103-admin",
    pwd: "m103-pass",
    roles: [
      {role: "root", db: "admin"}
    ]
  })
'
```

5. Click "Run Tests" to run a test that will check the updated *dbpath*.

#### Answer

```javascript
storage:
  dbPath: /var/mongodb/db/
net:
  bindIp: localhost
  port: 27000
security:
  authorization: enabled

#Start the mongod process with:
user@M103# mongod --config mongod.conf

#The process of creating this user is identical to the previous labs, but we have to repeat it for our new DB path:
use admin
db.createUser({
  user: "m103-admin",
  pwd: "m103-pass",
  roles: [
    {role: "root", db: "admin"}
  ]
})
```

### Basic Commands

In this lesson, we'll cover a few of the basic commands necessary to interact with the *MongoDB cluster*. This won't be an exhaustive list. For that, take a look at the reference documentation included in the lecture notes. We're actually going to focus on the *shell helpers* first. These are methods available in the *MongoDB shell* that wrap underlying database commands. The majority of your interactions in this course and likely in general will use *shell helpers*.

### Useful Shell Helpers

#### Basic Helper Groups

* db.*method()*

* rs.*method()*

* sh.*method()*

First you have your **DB shell helpers**. These are methods that wrap commands that interact with the database. You've already used a few of these in previous lessons, like *db.createuser*. Next you have your **rs helper** methods. These methods wrap commands that control *replica set* deployment and management. We're going to talk about *replication* in the next chapter. Finally, you have your **sh helper** methods. These methods wrap commands to control *sharded cluster* deployment and management. We will get to *sharding* in the third chapter.

Now the *database shell helper* has one additional extension. Remember that each database can have one or more *collections* in it. And *collections* are where your data are stored. So *Mongo shell* provides *shell helpers for collection level* operations. You specify the name of the *collection*, essentially providing a path to the *collection* you want to interact with. Let's go over some of the most basic *shell helpers* that you may find useful during this course.

#### Command groups

* db.*method()*
  * db.*collection.method()*

For *User Management*, you've got *create user and drop user*. You've already used *create user* in an earlier lesson. Note that both of these are acting on the *database object*. That's because users are created at the *database level*.

#### User Management

* db.*createUser()*

* db.*dropUser()*

For *Collection management*, you can use *rename collection* to change the name of an existing *collection*. You also have *collection.createindex and collection.drop*. Both of these methods act on the *collection object*, which is why we have *db.collection.* In the shell, you'd want to change the *collection* to the *name of the collection*. The *collection* here is just a placeholder.

#### Collection Management

* db.*rename Collection()*

* db.*collection.createIndex()*

* db.*collection.drop()*

For *database management*, you can always use *drop database to drop the entire database*. This will destroy all *collections, indexes, and users* created on that database, so use this with caution. *db.createcollection* lets you create a *collection* on your own. In a previous lesson, we noted that *MongoDB* creates *databases and collections* implicitly on a write operation, but you may want to create your *collections* first. There are some conditional configuration options you have when you use this method, such as creating a *capped collection or setting language collation support*, both of which are out of scope for this lesson. So look at the documentation if you're curious.

#### Database Management

* db.*dropDatabase()*

* db.*createCollection()*

Finally, when you want to see how your *database* is doing, you've got *db.serverstatus*, which returns statistics on the database, like the amount of storage space you are using. We're going to talk more about *replication and sharding* in later lessons. And you'll see examples of the *rs and sh shell helpers* then.

#### Database Status

* db.*serverStatus()*

I mentioned earlier that *shell helpers* wrap an underlying *database command*. Let's look at the *db.collection.createindex* method, compared against the underlying *create indexes* command.

#### Database Command vs Shell Helper

```javascript
Creating index with Database Command:
db.runCommand(
  {
    "createIndexes" : "<collection>",
    "indexes" : [
      {
        key : { "product" : 1 }
      },
      "name" : "name_index"
    ]
  }
)

Creating index with Shell Helper:
db.<collection>.createIndex(
  { "product" : 1 },
  { "name" : "name_index" }
)
```

While they look sort of similar, the *database command* is a lot more verbose in defining the same level of work. That's part of why *MongoDB* provides *helper methods* for wrapping these *database commands*. Depending on whether you're using the *MongoDB shell or MongoDB driver*, the exact name and format of these *helper methods* might differ, but their purpose is to provide a shortcut for methods like this.

Running a *database command* itself is pretty straightforward. The *Mongo shell* provides the *run command* method on the *database object*. You pass in the command as a *parameter* to this method. *DB* here refers to the *active database*. Do you remember the *use keyword*? We've used it a few times already. The *run command* always works against the *active database*. So make sure you set the right *database* to active before you use *run command*. If you want information on how a particular command works, you can use the *db.commandhelp* method to retrieve any available help information.

#### Database Commands

* db.runCommand( { "COMMAND" } )

* db.commandHelp( "command" )

Now you might wonder, why would I ever want to use the *underlying database command*? Well, we've been talking about the *shell helpers*. They're only in the *shell*. If you want to run a *database command* from a driver, then you're going to need to execute the *underlying database command* instead, assuming that the driver doesn't have some other existing helper method.

You can actually introspect a *shell helper from the shell* by not including the open and closing parentheses. The *shell helper* will produce the underlying code run. In this case, we can see that *create index* method runs the *create indexes command*.

#### Introspect a Shell Helper

```javascript
> db.products.createIndex

function (keys, options) {
  
  return this.createIndexs([keys],
  options);

}
```

To recap, the *database commands* provide the foundation for interacting with *MongoDB*. You can use *db.runCommand()* to run any given *database command*. The *Mongo shell* provides *helper methods* for wrapping *database commands* and simplifying usage. For this course, you're going to be using the *helper methods*, but if you want to know more about the *underlying database commands*, check out our documentation.

### Logging Basics

*MongoDB* provides two logging facilities for tracking activities on your database. The *Process log* displays activity on the *MongoDB* instance. The *Process log* collects activity into one of the following components. Each of these components has an associated verbosity level. You can use *db.getLogComponents in the mongo shell* -- to review the currently configured log component verbosity. Let's take a look. I'm connected to the *MongoDB server using the mongo shell*. I can run *db.getLogComponents* to retrieve the *log components* from my current database.

```javascript
>  db.getLogComponents()
{
 "verbosity" : 0, 
 "accessControl" : {"verbosity" : -1},
 "command" : {"verbosity" : -1},
 "control" : {"verbosity" : -1},
 "executor" : {"verbosity" : -1},
 "geo" : {"verbosity" : -1},
 "index" : {"verbosity" : -1},
 "network" : {
  "verbosity" : -1,
  "asio" : {"verbosity" : -1},
  "bridge" : {"verbosity" : -1},
  "connectionPool" : {"verbosity" : -1}
 },
 "query" : {"verbosity" : -1},
 "replication" : {
  "verbosity" : -1,
  "election" : {"verbosity" : -1},
  "heartbeats" : {"verbosity" : -1},
  "initialSync" : {"verbosity" : -1},
  "rollback" : {"verbosity" : -1}
 },
 "sharding" : {
  "verbosity" : -1,
  "rangeDeleter" : {"verbosity" : -1},
  "shardingCatalogRefresh" : {"verbosity" : -1},
  "migration" : {"verbosity" : -1}
 },
 "storage" : {
  "verbosity" : -1,
  "recovery" : {"verbosity" : -1},
  "journal" : {"verbosity" : -1}
 },
 "write" : {"verbosity" : -1},
 "ftdc" : {"verbosity" : -1},
 "tracking" : {"verbosity" : -1},
 "transaction" : {"verbosity" : -1},
 "test" : {"verbosity" : -1}
}
```

So what does all of this mean? Starting at the top, the *verbosity field* is the default *verbosity level for the MondoDB server*. Any of the other components can inherit from this field. See how all of these other components have *negative 1* as their verbosity? *Negative 1* means, inherit from parent. You can see I have a *verbosity of 1*, so all of my components are inheriting from that. *Log levels 1 through 5*.

Just increase the verbosity level to include debug messages. The higher the number, the more verbose your debug messages are. Let's just recap that very briefly. *Negative 1* means that the *log component* inherits its verbosity level from its parent. By default, your *verbosity is typically 0*. That means informational messages only. I had set my *verbosity level to 1* so I could see more debug messages. A higher verbosity level means more detailed and more frequent debug messages.

If you're not trying to actively identify and resolve an issue, you can leave the *verbosity at 0* for a base level of monitoring. You'll notice that, for some of these *log components*, there are actually *subcomponents* as well. Remember, there were three different *components for replication*. You had your *standard replication component*, and then you had a *heartbeats and a rollback component*. You can see all three of them here under the *replication parent*. Each one is inheriting.

*Heartbeats and rollback* both inherit from *replication*, which, itself, inherits from my top level verbosity field. Now, how does all this work? There are two ways that we can look at the logs. The first is by using the *get logs database command here in the mongo shell*. The other is to use a utility, like *tail dash f* to follow the end of the log. Let's start with the *get logs command*. I'm using *db.adminCommand*, because *getLog* has to be run against the *admin database*. I'm specifying *global* to tell *getLog* to give me all of the *log activity*. This is going to return the entire log up to the point we ran this command.

```javascript
> db.adminCommand({ "getLog": "global" })
{
 "totalLinesWritten" : 98,
 "log" : [
  "{\"t\":{\"$date\":\"2021-08-08T03:03:24.201+01:00\"},\"s\":\"I\",  \"c\":\"CONTROL\",  \"id\":20698,   \"ctx\":\"main\",\"msg\":\"***** SERVER RESTARTED *****\"}",
  "{\"t\":{\"$date\":\"2021-08-08T03:03:24.624+01:00\"},\"s\":\"I\",  \"c\":\"CONTROL\",  \"id\":23285,   \"ctx\":\"main\",\"msg\":\"Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'\"}",
  "{\"t\":{\"$date\":\"2021-08-08T03:03:28.320+01:00\"},\"s\":\"W\",  \"c\":\"ASIO\",     \"id\":22601,   \"ctx\":\"main\",\"msg\":\"No TransportLayer configured during NetworkInterface startup\"}",
  "{\"t\":{\"$date\":\"2021-08-08T03:03:28.320+01:00\"},\"s\":\"I\",  \"c\":\"NETWORK\",  \"id\":4648601, \"ctx\":\"main\",\"msg\":\"Implicit TCP FastOpen unavailable. If TCP FastOpen is required, set tcpFastOpenServer, tcpFastOpenClient, and tcpFastOpenQueueSize.\"}",
  "{\"t\":{\"$date\":\"2021-08-08T03:03:28.321+01:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":4615611, \"ctx\":\"initandlisten\",\"msg\":\"MongoDB starting\",\"attr\":{\"pid\":1224,\"port\":27017,\"dbPath\":\"/var/lib/mongodb\",\"architecture\":\"64-bit\",\"host\":\"mukhtar-Aspire-ES1-431\"}}",...
    "{\"t\":{\"$date\":\"2021-08-08T04:07:45.042+01:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1628392065:42316][1224:0x7ff78527f700], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 73, snapshot max: 73 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}",
  "{\"t\":{\"$date\":\"2021-08-08T04:08:45.233+01:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1628392125:233367][1224:0x7ff78527f700], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 74, snapshot max: 74 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}"
 ],
 "ok" : 1
```

You can see that I have a lot of *index activity*. There are several commands in here, including the command I ran when I ran *db.getLog*. Looking at this, I actually have a little bit too much *index activity*. I don't really need this level of detail. Let's change the *log verbosity for the index component back down to 0*. I'm specifying the *verbosity level* that I want to change the component to with *db.setLogLevel*.

```javascript
> db.setLogLevel(0, "index")

{ 
  "was" : {
    "verbosity" : 0, 
    "accessControl" : {"verbosity" : -1},
    "command" : {"verbosity" : -1},
    "control" : {"verbosity" : -1},
    "executor" : {"verbosity" : -1},
    "geo" : {"verbosity" : -1},
    "index" : {"verbosity" : -1},
    "network" : {
      "verbosity" : -1,
      "asio" : {"verbosity" : -1},
      "bridge" : {"verbosity" : -1},
      "connectionPool" : {"verbosity" : -1}
    },
    "query" : {"verbosity" : -1},
    "replication" : {
      "verbosity" : -1,
      "election" : {"verbosity" : -1},
      "heartbeats" : {"verbosity" : -1},
      "initialSync" : {"verbosity" : -1},
      "rollback" : {"verbosity" : -1}
    },
    "sharding" : {
      "verbosity" : -1,
      "rangeDeleter" : {"verbosity" : -1},
      "shardingCatalogRefresh" : {"verbosity" : -1},
      "migration" : {"verbosity" : -1}
    },
    "storage" : {
      "verbosity" : -1,
      "recovery" : {"verbosity" : -1},
      "journal" : {"verbosity" : -1}
    },
    "write" : {"verbosity" : -1},
    "ftdc" : {"verbosity" : -1},
    "tracking" : {"verbosity" : -1},
    "transaction" : {"verbosity" : -1},
    "test" : {"verbosity" : -1}
    },
    "ok" : 1
}
```

The output here is what the *log level configuration* was. I can rerun *db.getLogComponents* to see my updated value of index. We can see here that I've successfully set the *verbosity level of the index logging component to 0*.

```javascript
>  db.getLogComponents()
{
 "verbosity" : 0, 
 "accessControl" : {"verbosity" : -1},
 "command" : {"verbosity" : -1},
 "control" : {"verbosity" : -1},
 "executor" : {"verbosity" : -1},
 "geo" : {"verbosity" : -1},
 "index" : {"verbosity" : 0},
 "network" : {
  "verbosity" : -1,
  "asio" : {"verbosity" : -1},
  "bridge" : {"verbosity" : -1},
  "connectionPool" : {"verbosity" : -1}
 },
 "query" : {"verbosity" : -1},
 "replication" : {
  "verbosity" : -1,
  "election" : {"verbosity" : -1},
  "heartbeats" : {"verbosity" : -1},
  "initialSync" : {"verbosity" : -1},
  "rollback" : {"verbosity" : -1}
 },
 "sharding" : {
  "verbosity" : -1,
  "rangeDeleter" : {"verbosity" : -1},
  "shardingCatalogRefresh" : {"verbosity" : -1},
  "migration" : {"verbosity" : -1}
 },
 "storage" : {
  "verbosity" : 0,
  "recovery" : {"verbosity" : -1},
  "journal" : {"verbosity" : -1}
 },
 "write" : {"verbosity" : -1},
 "ftdc" : {"verbosity" : -1},
 "tracking" : {"verbosity" : -1},
 "transaction" : {"verbosity" : -1},
 "test" : {"verbosity" : -1}
}
```

Let's take another look at the *log*, this time using *tail -f*. I'm specifying the path to my *log file to the tail utility*, and I'm specifying the *-f flag* to direct *tail* to follow this log.

```javascript
tail -f /data/db/mongod.log
```

That means that I will constantly get updates as there is new activity posted to this file. Depending on your operating system, there may be different utilities from *tail* available to you that perform the same basic function. Let's specifically take a look at this *command logging event*.

```javascript
{
  "t": {
    "$date": "2020-05-20T19:18:40.604+00:00"
  },
  "s": "I",
  "c": "COMMAND",
  "id": 51800,
  "ctx": "conn281",
  "msg": "client metadata",
  "attr": {
    "remote": "192.168.14.15:37666",
    "client": "conn281",
    "doc": {
      "application": {
        "name": "MongoDB Shell"
      },
      "driver": {
        "name": "MongoDB Internal Client",
        "version": "4.4.0"
      },
      "os": {
        "type": "Linux",
        "name": "CentOS Linux release 8.0.1905 (Core) ",
        "architecture": "x86_64",
        "version": "Kernel 4.18.0-80.11.2.el8_0.x86_64"
      }
    }
  }
}
```

So this is the *command* that I just identified in the *log file*. Let's start with the **Timestamp** -- *t*. This lets us know when the event occurred. Next, *I* have the **Severity level** of the message. Briefly, there are five types of *severity levels*.
> You have *F-fatal, E-error, W-warning, I-informational, which is related to verbosity level 0, and D-debug, which is related to (verbosity level 1 - 5)*. This component has a *verbosity level of I*, which means that this is an *informational message*.

Next, we have the actual log **Components** -- *c*, that the operation falls under. In this case, the operation is a *COMMAND*. We can also see the **Context** -- *"ctx": "conn281"*, that the event occurred on. *Connections* are incremented and unique, so any events initiated by a specific *connection* are likely from the same *client*. We have more specific information on the event. We have a command action that was executed on the admin database. The *$cmd* indicates that this was a database command.
> Note that the logging output has changed in MongoDB 4.4. If you're interested, you can find more information in the 4.4 release notes for *Logging & Diagnostics*.

The full list of possible events and descriptors are out of scope. But in general, you can expect that what immediately follows the *connection* to be the operation that triggered the event. *appName* indicates what client initiated the operation -- in this case, the *mongo shell*. Now we can dig into the command itself. The entire document is the skeleton of the command executed. Under the hood, we have a set parameter command that sets the log component verbosity of the index log component on the admin database.

The command was spawned by me using the *db.setLogLevel method*. Finally, we have some metadata related to how the operation performed. The last data point is of particular interest. It's how long this operation took to complete. We will talk in another lesson about slow operations and how to identify them.

The *MongoDB process log* supports multiple components for controlling granularity of events captured. You can retrieve the log from the *mongo shell*, or by using command line utilities, like *tail*. Finally, you can change the verbosity of any log component using the *mongo shell*.

### Profiling the Database

All right so in this lesson, we're going to discuss the *database profiler*, and how it can be used in conjunction with the *database locks*. Servers generate a really large number of events. And a *log file* is great for capturing this data, or subsets of this data. But the purpose of these logs is to report on the health of the database, as a whole. The logs do store some data on our commands, but there's not enough data in here to start optimizing our queries.

The lines won't contain any *execution stats, the direction of an index used by a query, rejected plans*, or anything. And even if we could place that information in the logs, we really shouldn't. The *log files* are meant to give administrators operational information about an instance or process, so they can flag any errors, warnings, or interesting informational messages. For *debugging slow operations*, we need to be a bit more precise in the information we capture.

So for that, we rely on the *database profiler*. We enable *profilers at the database level*. So the operations on each database are profiled separately. When it's enabled, the profile will restore data for all operations on a given database, and a new collection called *system dot profile*. This collection will hold profiling data on *CRUD operations, as well as administrative and configuration options*.

It has three settings. The default value is *zero*, which just means that the profiler's *turned off*. *One* means the profiler is *on*, but it's only going to profile operations that are considered *slow*. By default, *MongoDB* will consider any operation that takes longer than *100 milliseconds to be slow*. But we can also define what a *slow query* is by setting the *slow MS value*, as we'll see in a minute. *Two means that the profiler's on*, and will profile all operations on a database, regardless of how long they take.

> This is a bit dangerous because it can result in a lot of rights to the *system dot profile collection*, and generate a lot of load on the system. This doesn't mean small operations can't be blocking other ones, but getting data on those operations requires more granularity.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongo --quiet
> use newDB
switched to db newDB
```

All right, so now let's take a look at the *profiler*. This database doesn't actually exist yet, so the *profiler by default is set to level 0*. And we can verify that by running *db.getProfilingLevel()*. And as you can see, it gives us a *zero*.

```javascript
> db.getProfilingLevel()
0
```

We can change that to a *one* with *db.setProfilingLevel(1)*. So this statement turned on the *profiler, profiling level 1*.

```javascript
> db.setProfilingLevel(1)
{ "was" : 0, "slowms" : 100, "sampleRate" : 1, "ok" : 1 }
```

If we run *show collections* command, we can see that *MongoDB* created a *new collection called system dot profile*.

```javascript
> show collections
system.profile
```

But there's nothing in it right now. And because we haven't specified a *slow MS*, the *profiler* will only store data on queries that take longer than *100 milliseconds*.

All right so here, just to get a sense of how the *profiler* works and what the *profiling data* looks like, I'm just going to *set slow MS to zero*, so that everything gets *profiled in this database*.

```javascript
> db.setProfilingLevel( 1, { slowms: 0 } )
{ "was" : 1, "slowms" : 100, "sampleRate" : 1, "ok" : 1 }
```

So I'm just going to *insert* a small document here into this *new collection*, called *new_collection*.

```javascript
> db.new_collection.insert( { "a": 1 } )
WriteResult({ "nInserted" : 1 })
```

So now I'm just going to look at what's in the *system dot profile collection* right now, after we'd run that query, and I'm going to make the output a little prettier so it's more readable.

```javascript
> db.system.profile.find().pretty()
{
    "op" : "insert",
    "ns" : "newDB.new_collection",
    "command" : {
      "insert" : "new_collection",
      "ordered" : true,
      "lsid" : {
        "id" : UUID("5d506a80-0091-47f6-9f04-5ae47502afb4")
      },
      "$db" : "newDB"
    },
    "ninserted" : 1,
    "keysInserted" : 1,
    "numYield" : 0,
    "locks" : {
      "ParallelBatchWriterMode" : {
        "acquireCount" : {
          "r" : NumberLong(5)
        }
      },
      "ReplicationStateTransition" : {
        "acquireCount" : {
          "w" : NumberLong(6)
        }
      },
      "Global" : {
        "acquireCount" : {
          "r" : NumberLong(3),
          "w" : NumberLong(3)
        }
      },
      "Database" : {
        "acquireCount" : {
          "r" : NumberLong(2),
          "w" : NumberLong(3)
        }
      },
      "Collection" : {
        "acquireCount" : {
          "r" : NumberLong(1),
          "w" : NumberLong(3)
        }
      },
      "Mutex" : {
        "acquireCount" : {
          "r" : NumberLong(5)
        }
      }
    },
    "flowControl" : {
      "acquireCount" : NumberLong(3),
      "timeAcquiringMicros" : NumberLong(5)
    },
    "storage" : {
      
    },
    "responseLength" : 45,
    "protocol" : "op_msg",
    "millis" : 307,
    "ts" : ISODate("2021-08-09T05:24:14.898Z"),
    "client" : "127.0.0.1",
    "appName" : "MongoDB Shell",
    "allUsers" : [ ],
    "user" : ""
}
```

All right, so we can see our rights statement is recorded in the *profiler*. It gives us the number of documents *inserted -- ninserted*, and the number of *index keys inserted by the operation -- keysInserted*, as well as *how long the operation took in milliseconds*.

So we can also *profile read operations*. Here, we have a really simple *query predicate*, where we're only looking for documents where *a is one*.

```javascript
> db.new_collection.find( { "a": 1 } )
{ "_id" : ObjectId("6110bbfe274fa4bc4823b4c9"), "a" : 1 }
> db.system.profile.find().pretty()
{
    "op" : "insert",
    "ns" : "newDB.new_collection",
    "command" : {
      "insert" : "new_collection",
      "ordered" : true,
      "lsid" : {
        "id" : UUID("5d506a80-0091-47f6-9f04-5ae47502afb4")
      },
      "$db" : "newDB"
    },
    "ninserted" : 1,
    "keysInserted" : 1,
    "numYield" : 0,
    "locks" : {
      "ParallelBatchWriterMode" : {
        "acquireCount" : {
          "r" : NumberLong(5)
        }
      },
      "ReplicationStateTransition" : {
        "acquireCount" : {
          "w" : NumberLong(6)
        }
      },
      "Global" : {
        "acquireCount" : {
          "r" : NumberLong(3),
          "w" : NumberLong(3)
        }
      },
      "Database" : {
        "acquireCount" : {
          "r" : NumberLong(2),
          "w" : NumberLong(3)
        }
      },
      "Collection" : {
        "acquireCount" : {
          "r" : NumberLong(1),
          "w" : NumberLong(3)
        }
      },
      "Mutex" : {
        "acquireCount" : {
          "r" : NumberLong(5)
        }
      }
    },
    "flowControl" : {
      "acquireCount" : NumberLong(3),
      "timeAcquiringMicros" : NumberLong(5)
    },
    "storage" : {
      
    },
    "responseLength" : 45,
    "protocol" : "op_msg",
    "millis" : 307,
    "ts" : ISODate("2021-08-09T05:24:14.898Z"),
    "client" : "127.0.0.1",
    "appName" : "MongoDB Shell",
    "allUsers" : [ ],
    "user" : ""
  }
  {
    "op" : "query",
    "ns" : "newDB.system.profile",
    "command" : {
      "find" : "system.profile",
      "filter" : {
        
      },
      "lsid" : {
        "id" : UUID("5d506a80-0091-47f6-9f04-5ae47502afb4")
      },
      "$db" : "newDB"
    },
    "keysExamined" : 0,
    "docsExamined" : 1,
    "cursorExhausted" : true,
    "numYield" : 0,
    "nreturned" : 1,
    "locks" : {
      "ReplicationStateTransition" : {
        "acquireCount" : {
          "w" : NumberLong(2)
        }
      },
      "Global" : {
        "acquireCount" : {
          "r" : NumberLong(2)
        }
      },
      "Database" : {
        "acquireCount" : {
          "r" : NumberLong(1)
        }
      },
      "Collection" : {
        "acquireCount" : {
          "r" : NumberLong(1)
        }
      },
      "Mutex" : {
        "acquireCount" : {
          "r" : NumberLong(1)
        }
      }
    },
    "flowControl" : {
      
    },
    "storage" : {
      
    },
    "responseLength" : 878,
    "protocol" : "op_msg",
    "millis" : 27,
    "planSummary" : "COLLSCAN",
    "execStats" : {
      "stage" : "COLLSCAN",
      "nReturned" : 1,
      "executionTimeMillisEstimate" : 0,
      "works" : 3,
      "advanced" : 1,
      "needTime" : 1,
      "needYield" : 0,
      "saveState" : 0,
      "restoreState" : 0,
      "isEOF" : 1,
      "direction" : "forward",
      "docsExamined" : 1
    },
    "ts" : ISODate("2021-08-09T05:32:32.506Z"),
    "client" : "127.0.0.1",
    "appName" : "MongoDB Shell",
    "allUsers" : [ ],
    "user" : ""
  }
  {
    "op" : "query",
    "ns" : "newDB.new_collection",
    "command" : {
      "find" : "new_collection",
      "filter" : {
        "a" : 1
      },
      "lsid" : {
        "id" : UUID("5d506a80-0091-47f6-9f04-5ae47502afb4")
      },
      "$db" : "newDB"
    },
    "keysExamined" : 0,
    "docsExamined" : 1,
    "cursorExhausted" : true,
    "numYield" : 0,
    "nreturned" : 1,
    "queryHash" : "4B53BE76",
    "planCacheKey" : "4B53BE76",
    "locks" : {
      "ReplicationStateTransition" : {
        "acquireCount" : {
          "w" : NumberLong(2)
        }
      },
      "Global" : {
        "acquireCount" : {
          "r" : NumberLong(2)
        }
      },
      "Database" : {
        "acquireCount" : {
          "r" : NumberLong(1)
        }
      },
      "Collection" : {
        "acquireCount" : {
          "r" : NumberLong(1)
        }
      },
      "Mutex" : {
        "acquireCount" : {
          "r" : NumberLong(1)
        }
      }
    },
    "flowControl" : {
      
    },
    "storage" : {
      
    },
    "responseLength" : 145,
    "protocol" : "op_msg",
    "millis" : 46,
    "planSummary" : "COLLSCAN",
    "execStats" : {
      "stage" : "COLLSCAN",
      "filter" : {
        "a" : {
          "$eq" : 1
        }
      },
      "nReturned" : 1,
      "executionTimeMillisEstimate" : 10,
      "works" : 3,
      "advanced" : 1,
      "needTime" : 1,
      "needYield" : 0,
      "saveState" : 0,
      "restoreState" : 0,
      "isEOF" : 1,
      "direction" : "forward",
      "docsExamined" : 1
    },
    "ts" : ISODate("2021-08-09T05:57:28.384Z"),
    "client" : "127.0.0.1",
    "appName" : "MongoDB Shell",
    "allUsers" : [ ],
    "user" : ""
}
```

And we can see the *profiler* recorded a little more information about this query. It tells us that we *exhausted the cursor -- cursorExhausted* that we were using to retrieve this data, and it also has some *execution stats -- execStats*, like the status that we went through to get here. In this case, it was just a *collection scan -- COLLSCAN*.

All right, so just to recap, we've covered the difference between *log data and profile data*, how to configure the *profiler on your database*, and how to interpret the output from the *profiler* depending on the operation.

### Lab: Logging to a Different Facility

#### Problem:

Use a configuration file to store log files in a new location:

1. Update your configuration file such that:

* *mongod* sends logs to */var/mongodb/logs/mongod.log*
* *mongod* is forked and run as a daemon (this will not work without specifying *logpath*)

You will still have access to the terminal window after launching mongod with these options. For help on forking the mongod process, please refer to the docs on *Managing Mongod Processes*.

2. Use the following command to connect to the Mongo shell and create the following user. *You will need this user in order to validate your work*.

```javascript
mongo admin --host localhost:27000 --eval '
  db.createUser({
    user: "m103-admin",
    pwd: "m103-pass",
    roles: [
      {role: "root", db: "admin"}
    ]
  })
'
```

3. Click "Run Tests" to run a test that will check the updated *logpath*.

#### Answer:

```javascript
user@M103# mongod --config mongod.conf

processManagement:
   fork: true
systemLog:
   destination: file
   path: "/var/mongodb/logs/mongod.log"
   logAppend: true
storage:
  dbPath: /var/mongodb/db
net:
  bindIp: localhost
  port: 27000
security:
  authorization: enabled
```

### Basic Security: Part 1

Have you ever thought about the process required for you to withdraw cash from an *ATM*? How does the *ATM* figure out who you are, and what accounts you have access to, and what you can do? The *ATM* starts with a challenge. Who are you? Depending on your response, the *ATM* can validate you as who you say you are and grant access to the system. This process of *challenge, response, and validation* is **authentication**.

Now, there is a second step that takes place. We know who you are, but how do we know what you can do? The *ATM* first asks a question. What does this user have access to? The answer here are the resources you have access to and the privileges or actions you can execute on these resources. The process of *verifying the privileges and resource access of an authenticated user* is **authorization**.

In this case, the *ATM* authorizes you to only access your own accounts. Now, you're logged in and you can withdraw cash because you *authenticated*, using your debit card and pin, and were *authorized* to only access your own accounts. *MongoDB Security* is built around the process of *authentication and authorization*. When you enable *authentication on a MongoDB cluster*, every client must provide valid credentials for *authentication*.

*MongoDB* then authorizes the user with certain resources and privilege access. Let's start with *authentication*. *MongoDB* supports four different client *authentication mechanisms*. *SCRAM* is the default and most basic form of *client authentication MongoDB* provides when you deploy in *MongoD or MongoS* with security enabled. The *SCRAM* prefix stands for *Salted Challenge Response Authentication Mechanism*.

The key here is challenge response. Basically the *MongoDB server* presents a question or challenge to the client who must provide a valid answer or response for *authentication*. This is basically *password security*. You don't need to know the exact workings of the *SCRAM authentication* mechanism. Just remember that *Scram* is basic security for your *MongoDB cluster*. Every *MongoDB cluster* should have *authentication* enabled and at least *SCRAM* in place.

With the community version of *MongoDB*, you also have the option of configuring *X.509 security*. This form of security uses an *X.509 certificate for authentication*. This is a more secure, albeit more complex, *authentication* mechanism that is also available to you.

*MongoDB Enterprise* includes two additional authentication mechanisms designed for *enterprise environments*. The first is the *Lightweight Directory Access Protocol*, or *LDAP* for short. If you haven't heard of *LDAP*, you might have heard of *Microsoft Active Directory*, which is built on the *LDAP protocol*.
> *MongoDB* can use an *Active Directory* or other *LDAP* service as the authority on *authentication or authorization* of users.

Finally, we have *Kerberos authentication*. The bright folks at the *Massachusetts Institute of Technology* designed *Kerberos* as a powerful *authentication mechanism*. Since this is a basic security course, we're sticking to *SCRAM*.

Now, we're not quite done with *authentication* yet. We've only talked about *client authentication*. *MongoDB* also supports *intra cluster authentication*, the mechanism by which *nodes in a cluster authenticate to each other*. Think of this like a *secret handshake*. If you don't know the *handshake, you can't join the cluster*. We'll talk more about *intra cluster authentication* in a later lesson. For now, just remember that *MongoDB* provides both *cluster and client authentication* for complete security.

To recap *MongoDB* provides *four client authentication mechanisms*, in addition to *cluster authentication*. All editions of *MongoDB get SCRAM and X.509 for client authentication*. *Enterprise editions of MongoDB also get LDAP and Kerberos authentication*. At the very minimum, you should always configure your *MongoDB deployments with SCRAM* where there is a *single administrative user protected by a very strong password*.

We'll be sticking to the basics in this course. Take a look at *M310 or our MongoDB documentation* for guidance on implementing other available *authentication mechanisms*. Now, we've covered the *who are you*. What about the *what are you allowed to do*?

*MongoDB* uses *role based access control for authorizing an authenticated user*. Each *MongoDB* user has *one or more roles associated to it*. Each role has *one or more privileges*. These privileges represent a *group of actions and the resources that those actions apply to*. *Role based access control* allows you to ensure a high level of responsibility isolation among individual users.

That means a user can be granted the exact roles required for that user to execute its expected workload. *Users exist per database*, so you can *isolate user privilege down to the database* or even the *collection that the user should have access to*. For the most basic security possible, create a user on the *Admin database* with one of our built in *administrative super user roles, such as root*. We're going to cover roles in detail later on.

### Basic Security: Part 2

Right now, we're actually going to create our first *MongoDB super user*. First, let's take a look at our *MongoDB server*. Let's look at the *configuration file for my MongoD*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ cat /etc/mongod.conf
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1


# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

#security:

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
```

Notice this line here *#security:*. This *configuration file* option does two things. First, it enables *role-based access control or authorization on my cluster*. Second, it implicitly *enables authentication*, as well. You cannot have one without the other.

Now, I need to connect to my *cluster*. But this *cluster has no existing users configured*, even though *auth is enabled*. Since by default, *MongoDB* doesn't give you any users, you have to create them yourself. Since my server does not yet have any *configured users*, there's no way for me to *authenticate myself to the server nor can I be authorized to do any work*.

Instead I must use the *localhost exception to connect to the server*, meaning I must connect to the *Mongo shell from the same host that is running the MongoDB server process*. Remember, once you have created your *first user, the localhost exception closes*.
> So always create *a user with the administrative role first* so you can create other users after the localhost exception has closed.

So here I am, running my *Mongo shell*, and I'm going to connect to the *server from the same host*. Notice here that I'm using the *localhost address*. This is also a way for you to just double check that you are specifically connecting over the *localhost interface*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongo --host 127.0.0.1:27017
MongoDB shell version v4.4.8
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("c9e72548-84a7-4797-beee-3a3e7e8fbb71") }
MongoDB server version: 4.4.8
---
The server generated these startup warnings when booting: 
        2021-08-14T09:05:08.419+01:00: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem
        2021-08-14T09:05:12.308+01:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
---
> 
```

Now I'm connected. I'm going to try to run a few commands here. Well, I am connected, but I'm not *authenticated nor authorized to do anything on the MongoDB server*.

When using the *localhost exceptions*, your privileges on the system are very restricted. Now, I do have access. So I can create my *first user*. I'm going to create this user on the *admin database*, because this is going to be an *administrative super user*, and I'm going to use the *route built-in role*. I'm using the *db.createUser* method to create a user on the *admin database*. I've specified the *user name and the password*, as well as the *role I want to be associated to this user*.

The *username and password* are used for the *authentication steps*, and this array of roles is used for *authorization*. I've specified the *built-in role route*, which provides the highest level of privilege action across all database resources. I do want to note, *MongoDB 3.6* adds some additional *user authentication restrictions* in the form of an *IP whitelist*, meaning that the roles granted to a user depend on what *IP they connect from*. It's a little advanced for this course, but if you want to learn more, make sure to check our documentation on *db.createUser or the Create User command*.

```javascript
> use admin
switched to db admin
> db.stats()
{
    "db" : "admin",
    "collections" : 1,
    "views" : 0,
    "objects" : 2,
    "avgObjSize" : 382,
    "dataSize" : 764,
    "storageSize" : 36864,
    "indexes" : 1,
    "indexSize" : 36864,
    "totalSize" : 73728,
    "scaleFactor" : 1,
    "fsUsedSize" : 17135935488,
    "fsTotalSize" : 29394636800,
    "ok" : 1
}
> db.createUser({
...   user: "root",
...   pwd: "root123",
...   roles : [ "root" ]
... })
Successfully added user: { "user" : "root", "roles" : [ "root" ] }

db.createUser({
... ...   user: "Mukhtar",
... ...   pwd: "Mukhtar123",
... ...   roles : [ "readWrite" ]
... ... })
Successfully added user: { "user" : "Mukhtar", "roles" : [ "readWrite" ] }
> db.stats()
{
    "db" : "admin",
    "collections" : 2,
    "views" : 0,
    "objects" : 5,
    "avgObjSize" : 372.8,
    "dataSize" : 1864,
    "storageSize" : 73728,
    "indexes" : 3,
    "indexSize" : 110592,
    "totalSize" : 184320,
    "scaleFactor" : 1,
    "fsUsedSize" : 17146085376,
    "fsTotalSize" : 29394636800,
    "ok" : 1
}

```

We can see here that I've successfully added my *new user*. Now I have to *authenticate as my root user to continue*. The *localhost exception* at this point in time is exhausted, and I cannot create any additional users without *authenticating first*.

Remember, I'm currently using an *unauthenticated session* that I was only able to open because of the *localhost exception*. Now, there is a *shell command, db.auth*, that lets me *authenticate from this particular session*, but let's do this via the *Mongo shell* to simulate how a client would normally connect. I've specified my *username root and password root*. Remember using *SCRAM*, so there is a challenge response mechanism here.

The *authentication database parameter* tells the *MongoDB server* which database contains my *user credentials*. Remember, *users are per database*. That means if I have *two users, Bob at inventory and Bob at sales*, those are two different users. The *authentication database* dictates which user I *authenticate as and what privileges I get*. I created this user on the *admin database*, so that's where I'm connecting. So, now I'm connected, and I have the privileges associated with root.

Remember, earlier I could not run this command. Now I am *authenticated and authorized* as a user who has access to this. So now I'm connected, and I have the privileges associated with root. Again, this is the most basic implementation of security. You will have to create additional users as necessary to fulfill specific operational tasks. You don't want everyone using the system to have root access. This is a lot of information, so read through carefully.

Let's recap. *MongoDB user security is an authentication and authorization model*, so users must provide who they are to the server, which decides what they can do based on the user they *authenticated as*. *MongoDB supports multiple authentication mechanisms*.

*SCRAM and X.509 are the community authentication mechanisms*. These are also available on the *enterprise versions of MongoDB*. *LDAP and KERBEROS are enterprise-only authentication mechanisms*. Each user that you create has one or more roles that define their *authorized access*. And, at the very minimum, you should always configure *SCRAM-SHA-1 with a single administrative user protected by a strong password*.

### Built-In Roles: Part 1

Time for us to talk a little bit about *roles*, in particular, about *built-in roles in MongoDB*, and how the *role-based access control system* works. Now, there is a fair amount to say about *roles*. But by now, you should be aware that *MongoDB role-based access control system* is in place, and that database users will be granted roles to perform operations of *MongoDB*. So we're not going to cover that in this lesson.

*Roles* can be of two types. It can be either *custom roles*, which are tailored roles to attend specific needs of specific users, which we are also not going to cover in this lecture, and *built-in roles*, which are *prepackaged MongoDB roles*. Now, saying that we are not going to cover *custom roles*, doesn't mean you cannot learn about them. And we have a specific course, *MongoDB Security*, for you to learn everything related with security, including the *custom roles*.

So I do recommend you to take that, if you want to learn a lot more about *custom roles* in other security aspects of *MongoDB*. But before we go into the list of *built-in roles, the MongoDB packages*, let's talk about the *role structure*, how can we define *roles, or how roles are defined internally*. A role is composed by the following. There is a set of privileges that the role enables.

If a new user is granted a given role, all privileges that that role defines will be made available to the user. And a privilege defines the action, or actions, that can be performed over a *resource*.
> A *resource* on its own can be defined by either being a set of specific database and specific collection, any database in any collection, any database in a set of collections, or a specific database in all collections within that database.

And finally, we also have the *cluster level resource* that applies to operations regarding the *replica sets or shard clusters*. A *privilege* is defined by a *resource and the actions allowed over that same resource*. So for example, here, we would have the system allowing the *shut down of a full cluster*. By that, we define the *resource cluster equals true, and the action to be shutdown*. A role with such a privilege will be allowed to *shut down any member of the cluster*.

```javascript
// Allow to shutdown over the cluster

{ resource: { cluster: true }, actions: [ "shutdown" ] }
```

But apart of having a list of privileges, a role can also inherit from other roles, either one or several of them, making this a potentially quite elaborate architecture of permission and privileges across several different roles. And finally, we can also define *network authentication restrictions at the role level*. This basically allows us to define that a given role is allowed to connect from a *clientSource, or to a serverAddress*, by specifying the set of list of *clientSource and serverAddress* in the network restrictions.

OK. So now that we've seen how the roles are organized, or defined, let's look into this set of different *built-in roles that MongoDB* provides. So the *built-in roles* are organized by *four different sets of groups, plus the super user role type*. We have *database level users, which can either be read and readWrite*. These are the application users that should be allowed to *read or read and write*. We have *database administration roles, like userAdmin, dbAdmin, and dbOwner*.

We have *cluster level administration roles, which are clusterAdmin, clusterManager, clusterMonitor, and hostManager*. We have specific roles for *backup and restore*. And obviously, we also have our *super user root role* that should be granted only in specific situations. All the roles defined here are purely *database level* for each user. That means that I can grant different roles, to different users, on different databases.

But there are also *built-in roles that are all database level*. That means they apply to any database in the system. For the *database users, we have readAnyDatabase or read and write any database*. For *database administration, we have dbAdminAnyDatabase, or userAdminAnyDatabase*. And obviously, the *super user nature of root is, in fact, a whole database level role, as well*. But these are a lot of them. So I want to focus your attention on the ones that we're going to need throughout this course -- *userAdmin, dbOwner, and dbAdmin*.

### Built-In Roles: Part 2

Now the first thing I'm going to do is basically connect with an existing user that we've previously created -- our *root level user*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongo admin -u root -p root123
MongoDB shell version v4.4.8
connecting to: mongodb://127.0.0.1:27017/admin?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("8bfabf1a-0c08-41bf-86c6-39d032ee1695") }
MongoDB server version: 4.4.8
---
The server generated these startup warnings when booting: 
        2021-08-14T09:05:08.419+01:00: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem
        2021-08-14T09:05:12.308+01:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
---
> 
```

Once I'm connected and authenticated, the first thing I'm going to do is create my *security officer, which enables user admin role*. In this case, I'm creating it on the *admin database*.

```javascript
> db.createUser(
...   { user: "security_officer",
...     pwd: "h3ll0th3r3",
...     roles: [ { db: "admin", role: "userAdmin" } ]
...   }
... )
Successfully added user: {
    "user" : "security_officer",
    "roles" : [
      {
        "db" : "admin",
        "role" : "userAdmin"
      }
    ]
}
```

Now, this is the first user you should always create. And why is that? Well the main reason for this is that this particular role allows the user to do all operations around *user management*. But in themself is not able to do anything related with *data management or data modifications*. Cannot *create or write, cannot list databases*, cannot do anything around *database administration* aside from *creating and updating or reviewing database users*.

This is quite important if you want to ensure that there are specific users in your organization that are not allowed to do anything with data in your system -- just managing other users that themselves can create the data. So the command for doing that is the *create user*, as always. We create a user we are calling here *security officer*, passing a password, the roles where it's going to be created. And the command gets successfully created.

Now next, I'm going to create a user that is allowed to actually administer the database. Yep, you got it. It's our *dbAdmin role* -- a user that is created using this role. Now the list of privileges that this particular role enables is quite long. But it can get a feeling of what it can actually do. All the *statistical data, kill cursors, lists indexes, list databases and collections, get collect statistics on the collections, do collection modifications, convert to capped*.

There's a variety of different operations that this built in role allows the user to operate. But again, similar to the *user admin role*, this role does not have the ability to read any user data at all or write data for that fact. Everything that is related with *DDL, data definition language*, this user will be able to perform. Everything that is related with the *DML, data modification language* operations, he will not be able to do.

This is to prevent the *dba* to go in and modify data inadvertently. Does not stop him from dropping collections though because that's a *DDL* operation. But it cannot remove specific fields from a document or even create new documents in a collection. Let's go ahead and do that.

```javascript
> use admin
switched to db admin
> db.createUser(
...   { user: "dba",
...     pwd: "c1lynd3rs",
...     roles: [ { db: "admin", role: "dbAdmin" } ]
...   }
... )
Successfully added user: {
    "user" : "dba",
    "roles" : [
      {
        "db" : "admin",
        "role" : "dbAdmin"
      }
    ]
}
```

So here I have my *dba user* with some password and the role that I've given him on the *database m103 is role dbAdmin*. Now if you look closely to this operation, I'm doing something quite tricky. I'm using the database admin to create a user on admin, but granting a role of *dbAdmin on M103 database*. Although this might sound a little bit strange, this is actually a recommended approach. All users should be created on the *database admin* for simplicity reasons. That means that the *database admin* will be used to authenticate the users that we create.

That said, it might not be needing to access the *database admin* at all for doing what it's supposed to do. So if he wants to be *administrator on M103*, the roles of *dbAdmin* should only be granted to *M103*. Roles can also vary between databases. I can have a given user with different roles on a *per database basis*. So let's go ahead and do that. Let's do that to this *database user*. Now to do that, I can just simply use this *grant roles to user*, when I select the user, which is my *dba* that I recently created.

```javascript
db.grantRolesToUser( "dba",  [ { db: "playground", role: "dbOwner"  } ] )
```

I'm going to give it a *database playground* where this particular user will be the *dbOwner*. Once I do this, the role *dbOwner is the database owner*. And therefore, it can do any *administrative action on the database*. That also means that this role combines all privileges of *read write, dbAdmin, and user admin roles*. That said, any user which is granted *dbOwner* over a database can actually do pretty much anything he wants. He can *read write, he can dbAdmin, and he can even user admin on that same database*.

So you can interpret this *dbOwner role as a meta role* -- one that combines several other built in roles that *MongoDB* provides. And we can see that by running this command -- *rolesInfo* where you want to know what *dbOwner is on the db playground*. We can also say to show the privileges of this particular role.

```javascript
> db.runCommand( { rolesInfo: { role: "dbOwner", db: "playground" }, showPrivileges: true} )
  {
    "roles" : [
      {
        "role" : "dbOwner",
        "db" : "playground",
        "isBuiltin" : true,
        "roles" : [ ],
        "inheritedRoles" : [ ],
        "privileges" : [
          {
            "resource" : {
              "db" : "playground",
              "collection" : ""
            },
            "actions" : [
              "bypassDocumentValidation",
              "changeCustomData",
              "changePassword",
              "changeStream",
              "collMod",
              "collStats",
              "compact",
              "convertToCapped",
              "createCollection",
              "createIndex",
              "createRole",
              "createUser",
              "dbHash",
              "dbStats",
              "dropCollection",
              "dropDatabase",
              "dropIndex",
              "dropRole",
              "dropUser",
              "emptycapped",
              "enableProfiler",
              "find",
              "grantRole",
              "insert",
              "killCursors",
              "listCollections",
              "listIndexes",
              "planCacheIndexFilter",
              "planCacheRead",
              "planCacheWrite",
              "reIndex",
              "remove",
              "renameCollectionSameDB",
              "revokeRole",
              "setAuthenticationRestriction",
              "storageDetails",
              "update",
              "validate",
              "viewRole",
              "viewUser"
            ]
          },
          {
            "resource" : {
              "db" : "playground",
              "collection" : "system.js"
            },
            "actions" : [
              "changeStream",
              "collStats",
              "convertToCapped",
              "createCollection",
              "createIndex",
              "dbHash",
              "dbStats",
              "dropCollection",
              "dropIndex",
              "emptycapped",
              "find",
              "insert",
              "killCursors",
              "listCollections",
              "listIndexes",
              "planCacheRead",
              "remove",
              "renameCollectionSameDB",
              "update"
            ]
          },
          {
            "resource" : {
              "db" : "playground",
              "collection" : "system.profile"
            },
            "actions" : [
              "changeStream",
              "collStats",
              "convertToCapped",
              "createCollection",
              "dbHash",
              "dbStats",
              "dropCollection",
              "find",
              "killCursors",
              "listCollections",
              "listIndexes",
              "planCacheRead"
            ]
          }
        ],
        "inheritedPrivileges" : [
          {
            "resource" : {
              "db" : "playground",
              "collection" : ""
            },
            "actions" : [
              "bypassDocumentValidation",
              "changeStream",
              "collMod",
              "collStats",
              "compact",
              "convertToCapped",
              "createCollection",
              "createIndex",
              "dbHash",
              "dbStats",
              "dropCollection",
              "dropDatabase",
              "dropIndex",
              "emptycapped",
              "enableProfiler",
              "find",
              "insert",
              "killCursors",
              "listCollections",
              "listIndexes",
              "planCacheIndexFilter",
              "planCacheRead",
              "planCacheWrite",
              "reIndex",
              "remove",
              "renameCollectionSameDB",
              "storageDetails",
              "update",
              "validate"
            ]
          },
          {
            "resource" : {
              "db" : "playground",
              "collection" : "system.js"
            },
            "actions" : [
              "changeStream",
              "collStats",
              "convertToCapped",
              "createCollection",
              "createIndex",
              "dbHash",
              "dbStats",
              "dropCollection",
              "dropIndex",
              "emptycapped",
              "find",
              "insert",
              "killCursors",
              "listCollections",
              "listIndexes",
              "planCacheRead",
              "remove",
              "renameCollectionSameDB",
              "update"
            ]
          },
          {
            "resource" : {
              "db" : "playground",
              "collection" : "system.profile"
            },
            "actions" : [
              "changeStream",
              "collStats",
              "convertToCapped",
              "createCollection",
              "dbHash",
              "dbStats",
              "dropCollection",
              "find",
              "killCursors",
              "listCollections",
              "listIndexes",
              "planCacheRead"
            ]
          },
          {
            "resource" : {
              "db" : "playground",
              "collection" : ""
            },
            "actions" : [
              "changeCustomData",
              "changePassword",
              "createRole",
              "createUser",
              "dropRole",
              "dropUser",
              "grantRole",
              "revokeRole",
              "setAuthenticationRestriction",
              "viewRole",
              "viewUser"
            ]
          }
        ]
      }
    ],
    "ok" : 1
}
```

Once we do that, we can have the list of all different *actions and resources*, meaning the privileges, of each role that this particular role inherits for himself. Let's recap. We've looked into the structure of the roles and how they are defined. We've seen the list of *built in roles* and how they are logically grouped together. And finally, we've seen how to create and grant roles to users using the *built in roles*.

### Lab: Creating First Application User

#### Problem:

Create a new user for an application that has the *readWrite* role:

1. Connect to a *mongod* instance that is *already running in the background on port 27000*. You can find the options used to launch *mongod* in the configuration file in your file editor.

The *m103-admin* user has also already been created for you with password *m103-pass*.

2. Use the *db.createUser()* command to create a user for a CRUD application.

The requirements for this new user are:

* Role: *readWrite* on *applicationData* database
* Authentication source: *admin*
* Username: *m103-application-user*
* Password: *m103-application-pass*

3. Click "Run Tests" to run a suite of tests that will check the configuration of *m103-application-user*. The results of these tests will let you know which steps you've yet to complete.

#### Answer:

```javascript
db.createUser(
  { user: "m103-application-user",
  pwd: "m103-application-pass",
  roles: [ { db: "applicationData", role: "readWrite" } ]
})

user@M103# mongo admin --port 27000 -u m103-admin -p m103-pass

> use admin
switched to db admin
> db.createUser(
...   { user: "m103-application-user",

...   pwd: "m103-application-pass",
...   roles: [ { db: "applicationData", role: "readWrite" } ]
... })
Successfully added user: {
        "user" : "m103-application-user",
        "roles" : [
                {
                  "db" : "applicationData",
                  "role" : "readWrite"
                }
        ]
}
```

### Server Tools Overview

All right, so in this lesson, we're going to take a look at the tools you get when you download the *MongoDB package*. You should already be familiar with a couple of them, such as *mongod*, the core database process, and *Mongo*, which is the interactive *MongoDB shell* that you use to connect to *mongod*.

In this lesson, we're going to cover some of the other important tools you get when you download *MongoDB*. So in order to get a full list of the *Mongo tools* that we get when we download *MongoDB*, we can use a *find* command in Unix. To the *find* command, we pass a search term -- in this case, *mongo** -- which just looks for anything that begins with the word *"mongo"* in this directory -- */usr/bin/*.

```javascript
// List mongodb binaries:
mukhtar@mukhtar-Aspire-ES1-431:~$ find /usr/bin/ -name "mongo*"
/usr/bin/mongoexport
/usr/bin/mongoimport
/usr/bin/mongorestore
/usr/bin/mongostat
/usr/bin/mongosh
/usr/bin/mongofiles
/usr/bin/mongotop
/usr/bin/mongodump
/usr/bin/mongodb-compass
/usr/bin/mongos
/usr/bin/mongo
/usr/bin/mongod
```

So this is a lot of stuff. Specifically in this lesson, we're going to cover *mongostat, mongodump, mongorestore, mongoexport, and mongoimport*. *mongostat* is a utility designed to give quick statistics on a running *mongod or mongos* process. All right, so I'm just going to launch an example *mongod*, here, on *port 30000*, and I'm going to *fork* the process so I can still use the terminal window.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mkdir -p ~/first_mongod
mukhtar@mukhtar-Aspire-ES1-431:~$ mongod --port 30000 --dbpath ~/first_mongod --logpath ~/first_mongod/mongodb.log --fork
about to fork child process, waiting until server is ready for connections.
forked process: 29864
child process started successfully, parent exiting

// Help Info
mukhtar@mukhtar-Aspire-ES1-431:~$ mongostat --help
Usage:
  mongostat <options> <connection-string> <polling interval in seconds>

Monitor basic MongoDB server statistics.

Connection strings must begin with mongodb:// or mongodb+srv://.

See http://docs.mongodb.com/database-tools/mongostat/ for more information.

general options:
      --help                                      print usage
      --version                                   print the tool version and exit
      --config=                                   path to a configuration file

verbosity options:
  -v, --verbose=<level>                        more detailed log output (include multiple times for more verbosity, e. g. -vvvvv, or specify a numeric value, e.g. --verbose=N)
      --quiet                                     hide all log output

connection options:
  -h, --host=<hostname>                           mongodb host(s) to connect to (use commas to delimit hosts)
      --port=<port>                               server port (can also use --host hostname:port)...
```

In order to connect to this *mongod and get Mongo stats* from it, I have to specify the *port in the mongostat call*. And here I've specified my *port*. And if I enter this command, it's going to return *Mongo stats* to me every second -- indefinitely, because I haven't specified when I want it to stop or how often to report. So I'm just going to cancel this so we can take a look at the output.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongostat --port 30000
insert query update delete getmore command dirty used flushes vsize   res qrw arw net_in net_out conn                time
    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   111b   42.8k    3 Aug 15 10:43:57.907
    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   111b   43.0k    3 Aug 15 10:43:58.908
    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   111b   42.8k    3 Aug 15 10:43:59.913
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   112b   43.3k    3 Aug 15 10:44:00.907
    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   111b   42.9k    3 Aug 15 10:44:01.909
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   112b   43.1k    3 Aug 15 10:44:02.907
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   112b   43.3k    3 Aug 15 10:44:03.900
    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   111b   42.7k    3 Aug 15 10:44:04.906
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   112b   43.2k    3 Aug 15 10:44:05.903
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   166b   43.2k    3 Aug 15 10:44:06.906
insert query update delete getmore command dirty used flushes vsize   res qrw arw net_in net_out conn                time
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   252b   43.2k    3 Aug 15 10:44:07.909
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   112b   43.2k    3 Aug 15 10:44:08.904
    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   111b   43.0k    3 Aug 15 10:44:09.904
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   112b   43.2k    3 Aug 15 10:44:10.899
    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   111b   42.7k    3 Aug 15 10:44:11.907
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   112b   43.0k    3 Aug 15 10:44:12.906
    *0    *0     *0     *0       0     1|0  0.0% 0.0%       0 1.44G 82.0M 0|0 1|0   112b   43.1k    3 Aug 15 10:44:13.903
^C2021-08-15T10:44:14.368+0100 signal 'interrupt' received; forcefully terminating
```

These first six fields represent the number of specific operations per second -- such as *inserts, deletes, and just overall commands*. The next seven fields represent lower-level memory statistics, such as *dirty*, which is the percentage of dirty bytes in the cache, *used*, which is the percentage of currently-used bytes in the cache, *vsize*, which is the total amount of virtual memory used by the process, and *res*, which is the total amount of resonant memory used by the process. *Net_in and net_out* are used to measure the amount of network traffic that's being received and sent out by the *mongod or mongos* process.

All right, so we're going to discuss the next four *Mongo server* tools and pairs. The first pair is *mongorestore and mongodump*, which are used to *import and export* dump files from *MongoDB collections*. These dump files are in *BSON, or Binary JSON* format. These tools are very quick, because the data in *MongoDB* is already in *BSON* format, and *mongodump* simply needs to make a copy to export. So we can see the full options that we can pass to *mongodump*, by passing the *help flag*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongodump --help
Usage:
  mongodump <options> <connection-string>

Export the content of a running server into .bson files.

Specify a database with -d and a collection with -c to only dump that database or collection.

Connection strings must begin with mongodb:// or mongodb+srv://.

See http://docs.mongodb.com/database-tools/mongodump/ for more information.

general options:
      --help                                                print usage
      --version                                             print the tool version and exit
      --config=                                             path to a configuration file

verbosity options:
  -v, --verbose=<level>                                     more detailed log output (include multiple times for more verbosity, e.g. -vvvvv, or specify a numeric value, e.g. --verbose=N)
      --quiet                                               hide all log output

connection options:
  -h, --host=<hostname>                                     mongodb host to connect to (setname/host1,host2 for replica sets)
      --port=<port>                                         server port (can also use --host hostname:port)...
```

The only one we're going to use right now is *port*. All right, so in order to use *mongodump* with access control enabled, you must authenticate through the *mongodump* command. So in addition to specifying a *port*, we also specify a *username, password, and authentication database* -- in this case, *admin*. All right, so running this command without specifying a directory creates a folder called *dump*. (*Old way*).

```javascript
// To connect to a local MongoDB instance running on port 27017 and use the default settings to export the content, run mongodump without any command-line options:
mukhtar@mukhtar-Aspire-ES1-431:~$ mongodump
2021-08-16T07:34:47.420+0100 writing admin.system.users to dump/admin/system.users.bson
2021-08-16T07:34:47.456+0100 done dumping admin.system.users (4 documents)
2021-08-16T07:34:47.457+0100 writing admin.system.version to dump/admin/system.version.bson
2021-08-16T07:34:47.459+0100 done dumping admin.system.version (3 documents)
2021-08-16T07:34:47.461+0100 writing newDB.new_collection to dump/newDB/new_collection.bson
2021-08-16T07:34:47.466+0100 writing mongo-exercises.courses to dump/mongo-exercises/courses.bson
2021-08-16T07:34:47.468+0100 writing playground.courses to dump/playground/courses.bson
2021-08-16T07:34:47.469+0100 writing test.employees to dump/test/employees.bson
2021-08-16T07:34:47.493+0100 done dumping newDB.new_collection (1 document)
2021-08-16T07:34:47.520+0100 done dumping mongo-exercises.courses (7 documents)
2021-08-16T07:34:47.547+0100 done dumping playground.courses (2 documents)
2021-08-16T07:34:47.556+0100 done dumping test.employees (0 documents)

// Specify the port in the --port:
mukhtar@mukhtar-Aspire-ES1-431:~$ mongodump --port=30000
2021-08-16T07:41:03.578+0100 writing admin.system.version to dump/admin/system.version.bson
2021-08-16T07:41:03.580+0100 done dumping admin.system.version (1 document)
```

We take a look inside *dump* and then take a look inside the *database that we dump* from, we can see two files. One of them is a *BSON* file. This file is the actual data from the *collection*, but it's not very readable, because it's a *BSON*. The *JSON* file here is *metadata about the collection that was dumped*, and we can take a look at it with *cat* and see it's very short. It has a list of the *indexes*, which right now is just the one on *_id* that comes by default, and then the namespace of the *collection* that we dumped -- *system.users*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ cd dump
mukhtar@mukhtar-Aspire-ES1-431:~/dump$ ls
admin  mongo-exercises  newDB  playground  sample_supplies  test
mukhtar@mukhtar-Aspire-ES1-431:~/dump$ cd admin
mukhtar@mukhtar-Aspire-ES1-431:~/dump/admin$ ls
system.users.bson  system.users.metadata.json  system.version.bson  system.version.metadata.json
mukhtar@mukhtar-Aspire-ES1-431:~/dump/admin$ cat system.users.metadata.json
{"indexes":[{"v":{"$numberInt":"2"},"key":{"_id":{"$numberInt":"1"}},"name":"_id_"},{"v":{"$numberInt":"2"},"unique":true,"key":{"user":{"$numberInt":"1"},"db":{"$numberInt":"1"}},"name":"user_1_db_1"}],"uuid":"3c5d36bc8e494988a1f3cdf98e6ec734","collectionName":"system.users","type":"collection"}mukhtar@mukhtar-Aspire-ES1-431:~/dump/admin$
```

So the *mongorestore* command, which is the inverse of the *mongodump* command. It takes a *BSON dump file* and creates a *MongoDB collection* from it. The *drop flag* will drop the current collection -- *system.users* -- and then replace it with what's in the *dump file*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongorestore --help
Usage:
  mongorestore <options> <connection-string> <directory or file to restore>

Restore backups generated with mongodump to a running server.

Specify a database with -d to restore a single database from the target directory,
or use -d and -c to restore a single collection from a single .bson file.

Connection strings must begin with mongodb:// or mongodb+srv://.

See http://docs.mongodb.com/database-tools/mongorestore/ for more information.

general options:
      --help                                                print usage
      --version                                             print the tool version and exit
      --config=                                             path to a configuration file

verbosity options:
  -v, --verbose=<level>                                     more detailed log output (include multiple times for more verbosity, e.g. -vvvvv, or specify a numeric value, e.g. --verbose=N)
      --quiet                                               hide all log output

connection options:
  -h, --host=<hostname>                                  mongodb host to connect to (setname/host1,host2 for replica sets)
      --port=<port>                                         server port (can also use --host hostname:port)...
```

And now we're done. All we needed to pass was the *dump* directory, because that had the *metadata in JSON format*, which told it about any *indexes* -- in this case, there were no *indexes* -- and the *namespace -- system.users*. So *mongodump and mongorestore* output and input *BSON*, which are binary files.

The next couple of commands we're going to go over -- *mongoexport and mongoimport* -- deal with *JSON* instead. We can see the full list of options for *mongoexport* by passing the *help flag*. And we see there are a lot of them. The ones we're going to use are the *authentication options -- username, password, and authenticationDatabase -- and port*.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongoexport --help
Usage:
  mongoexport <options> <connection-string>

Export data from MongoDB in CSV or JSON format.

Connection strings must begin with mongodb:// or mongodb+srv://.

See http://docs.mongodb.com/database-tools/mongoexport/ for more information.

general options:
      --help                                      print usage
      --version                                   print the tool version and exit
      --config=                                   path to a configuration file

verbosity options:
  -v, --verbose=<level>                           more detailed log output (include multiple times for more verbosity, e.g. -vvvvv, or
                                                  specify a numeric value, e.g. --verbose=N)
      --quiet                                     hide all log output

connection options:
  -h, --host=<hostname>                           mongodb host to connect to (setname/host1,host2 for replica sets)
      --port=<port>                               server port (can also use --host hostname:port)

ssl options:
      --ssl                                       connect to a mongod or mongos that has ssl enabled
      --sslCAFile=<filename>                      the .pem file containing the root certificate chain from the certificate authority
      --sslPEMKeyFile=<filename>                  the .pem file containing the certificate and key
      --sslPEMKeyPassword=<password>              the password to decrypt the sslPEMKeyFile, if necessary
      --sslCRLFile=<filename>                     the .pem file containing the certificate revocation list
      --sslFIPSMode                               use FIPS mode of the installed openssl library
      --tlsInsecure                               bypass the validation for server's certificate chain and host name

authentication options:
  -u, --username=<username>                       username for authentication
  -p, --password=<password>                       password for authentication
      --authenticationDatabase=<database-name>    database that holds the user's credentials
      --authenticationMechanism=<mechanism>       authentication mechanism to use
      --awsSessionToken=<aws-session-token>       session token to authenticate via AWS IAM...
```

All right, so now we get to see *mongoexport* in action. We still have to *authenticate and specify a port*, but notice that this time, we didn't specify a file name for our output. And unlike *mongodump, mongoexport* will not create a directory for us. Instead, it'll send the *output to standard out*.

This is a lot of information, and it's not so useful when it's just printed in the terminal. So this is the same exact command as before, except this time we've passed this *-o flag*, which is for the *output*. We specified a new file called *students.json* to store all that output that was printed at the terminal before. All right, so now we have a new file called *students.json*, and I'm just going to *tail the file* so we can take a look at what's in it. So as we can see, this is a *JSON* representation of the *MongoDB collection*. These are just documents and arrays.

All right, so this is a *mongoimport* statement, which is the inverse operation of *mongoexport*. This is pretty similar to its *BSON counterpart, mongorestore*. In this command, I'm going to use *mongoimport* to import the data set that we just exported. So as we can see here, we didn't specify a database or a collection for this *mongoimport* statement. Because there's no *metadata in the JSON export, mongoimport* has to figure out a place to put all this data. It defaults to use test as the database, and the name of the *JSON files -- students* -- as the name of the collection.

So just to recap, in this lesson we covered *mongostat*, which gives quick statistics on a running *mongod or mongos* process. We covered *mongodump, which outputs BSON representations of MongoDB, and mongorestore, which restores BSON representation in MongoDB into MongoDB collections*. We covered *mongoexport, which outputs JSON or CSV representations of MongoDB collections, and mongoimport, which takes the JSON or the CSV representations and creates a MongoDB collection from it*.

### Lab: Importing a Dataset

#### Problem 6

Import a dataset into MongoDB using mongoimport:

1 Run a mongoimport command on a MongoDB instance running in the background.
  The requirements for this command are:

* connect to a *mongod* process running on port *27000*
* import the data from */dataset/products.json*
* import the data to *applicationData.products*
* use *m103-application-user* to authenticate to the database - this user has already been created
for you on the *admin* database with password *m103-application-pass*

2 Click "Run Tests" to run a test that will check *applicationData.products* for the new data. The results of these tests will let you know which steps you've yet to complete.

#### Answer 6

```javascript
mongo --port 27000 -u m103-admin -p m103-pass --authenticationDatabase admin

mongoimport --db applicationData --collection products --port 27000 -u m103-application-user -p m103-application-pass --authenticationDatabase admin --file /dataset/products.json

// The import can be properly completed with the following command:
mongoimport --drop --port 27000 -u "m103-application-user" \
-p "m103-application-pass" --authenticationDatabase "admin" \
--db applicationData --collection products /dataset/products.json
/* We authenticate to the database the same way with mongoimport as we did with mongo. The flags --db and --collection are used to designate a target database and collection for our data. The flag --drop is used to drop the existing collection, so we don't create duplicates by running this command twice. */
```

## Chapter 2: Replication

### What is Replication?

In this lesson, we're going to cover *replication* and how it makes your data more durable. *MongoDB* uses *asynchronous statement based replication* because it's plateform independent and allows more flexibility within a *replica set*. But first, let's just talk about where *replication* is. *Replication* is the concept of maintaining multiple copies of your data. This is really important concept in *mongoDB*, but really in any database system.

The main reason why *replication* is necessary, is because you can never assume that all of your servers will always be available, whether you have to perform maintenance on a data center or a disaster wipes out your data entirely. Your servers will experience downtime at some point. The point of *replication* is to make sure that in the event your server goes down, you can still access your data. This concept is called *availability*.

A database that does not use *replication* only has a single database server, and we refer to this as a *standalone nodes*. In a *standalone* setup, databases can service *reads and writes* only while that *single node* is up and running, but if the *node* goes down we lose all access to that data. Our *reads and writes* won't reach the server.

Now, in a *replicated* solution, we have a couple extra *nodes* on hand and they hold copies of our data. In *mongoDB*, a group of *nodes* that each have copies of the same data is called a *replica set*, and at a *replica set*, all data is handled by default in one of the *nodes*, and it's up to the remaining *nodes* in the set to sync up with it to *replicate* any new data that's been written through asynchronous mechanism.

The *node* where data is sent is called the *Primary node*, and all the other *nodes* are referred to as *Secondary nodes*. The goal here is for all *nodes* to stay consistent with each other. So, if our application is using the database, and the *primary node* goes down, one of the *secondary nodes* can take it's place as *primary* in a process known as *Failover*.

The *nodes* decide specifically which *secondary* will become the *primary* through an *election*. And this name is not a coincidence. The *secondary nodes* actually vote for one another to decide which *secondary* will become the *primary*. In a durable *replica set*, *failover* can take place quickly, so that no data is lost. And the application using the data will continue communicating with the *replica set* as if nothing had ever happened.

And once the *node* comes back up and ensure that it can catch up and sync on the latest copy of the data, it will rejoin the *replica set* automatically.

### MongoDB Replica Set

Now that we've seen why *replication* is important, let's do a quick dive into the details of *replica sets*. *Replica sets* are groups of *mongods* that share copies of the same information between them. *Replica set* members can have one of two different roles. The either can be *primary node where all reads and all writes* are served by this node. Or *secondary node* where the responsibility of this node is to replicate all of the information, and then serve as a high availability to node in case of failure of the primary.

The *secondaries* will get the data from the *primary* through an *asynchronous replication mechanism*. Every time an application writes some data to the *replica set*, that right is handled by the *primary node*. And then data gets *replicated to the secondary nodes*. Now this *replication mechanism* is based out of a protocol that manages the way that the *secondaries should read data from the primary*.

In *MongoDB* this is *synchronous replication protocol* might have different versions. We have *PV1 and PV0*. The different versions of the *replication protocol* will vary slightly on the way *durability and availability* will be forced throughout the set. Currently *Protocol Version 1, or PV1*, is the default version. This protocol is based out of the *RAFT protocol*. If you are not familiar with the *RAFT protocol*, in the lecture notes of this lesson, you will find detailed information about *RAFT*.

Just keep in mind for now that prior versions of *MongoDB* used the previous *protocol version PV0*, and that there might be some configuration details in between both protocols. For now, we'll just focus on *PV1*. At the heart of this *replication mechanism* there's our *operations log, or oplog* for short. The *oplog* is a segment based lock that keeps track of all *write operations* acknowledged by the *replica sets*. Every time a *write* is successfully applied to the *primary node*, it will get recorded in the *oplog* in its *idempotent form*. We'll looking into the *idempotentcy* details later.

But keep in mind that an *idempotent operation* can be applied multiple times. And the end result of that operation will always results in the same end result. More on this up ahead. Apart from a *primary or secondary* role, a *replica set* member can also be configured as an *arbiter*. An *arbiter* is a member that *holds no data*. It's mere existence is to serve as a *tiebreaker between secondaries in an election*. And obviously if it has no data, it can never become primary.

*Replica sets are failure resilient*. That means that they have a *failover mechanism* that requires a majority of nodes in a *replica set* to be available for a *primary* to be elected. In this particular case, let's assume that we lose access to our *primary*. If we don't have a *primary we will not be able to write*, and that's not good. So we need to clear between the remaining nodes of the set, which one could become the *new primary*? That is through an election, which is embedded on the details of the *protocol version*.

How a *primary* gets elected or why -- a particular node becomes *primary* instead of another. It's out of scope for now, but keep in mind the details of these will be related with the *protocol version* that your system may be having. For now just keep in mind that there is a *failover mechanism* in place. Important thing to note is that you should always have at least an odd number of *nodes* in your *replica set*. In case of even number of *nodes*, do make sure that the majority is consistently available. In this form of a *replica set*, you will need to have at least *three nodes* to be available.

The list of replica set members in their configuration options defines the *replica set topology*. Any *topology change* will trigger an election. Adding members to the *set, failing members*, or changing any of the *replica set* configuration aspects will be perceived as it's *topology* change. The *topology of a replica set* is defined in the *replica set* configuration. The *replica set* configuration is defined in one of the *nodes* and then shared between all members through the *replication mechanism*. We will look into the replication configuration documents in detail later.

In this case, we have four members and I need to raise your attention to a specific situation. This *topology* offers exactly the same number of failures as a *three node replica sets* can only afford to lose *one member*. In case of losing *two of them*, we will have no majority available out of the sets. Why? Well the majority of 4 is 3. Therefore the *two remaining nodes* will not be able to be *electing a primary* in-between them. Having that *extra node* will not provide extra availability of the service. Just another redundant copy of our data, which is good, but not necessarily for availability reasons.

Now, *replica sets* can go up to *50 members*. And this might be useful, especially for geographical distribution of our data where we want copies of our data closer to our users and applications, or just multiple locations for redundancy. But only a maximum of *seven of those members can be voting members*. More than *seven members* may cause election rounds to take too much time, with little to none benefit for availability and consistency purposes. So between those *seven nodes*, one of them will become the *primary* and the remaining ones will be *electable as primaries* if in case its policy changes, or in case a new election gets triggered.

Now if for some reason we can't or don't want to have a *data bearing node*, but still be able to *failover between nodes*, we can add a *replica set member as an arbiter*. That said, *arbiters* do cause significant consistency issues in *distributed data systems*. So we advise you use them with care. In my personal view, the usage of *arbiters* is a very sensitive and potentially harmful option in many deployments. So I idly discourage the usage of *arbiters*. Withing *secondary nodes*, these can also be set to have specific or special properties defined.

We can define *hidden nodes*, for example. The purpose of a *hidden node* is to provide specific *read-only workloads*, or have copies of your data which are *hidden* from their application. *Hidden nodes* can also be set with a *delay* in their *replication process*. We call these *delayed nodes*. The purpose of having *delayed nodes* is to allow resilience to application level corruption, without relying on cold backup files to recover from such an event. If we have a *node delayed*, let's say *one hour*, and if your *DBA* accidentally drops a collection, we have *one hour* to recover all the data from the *delayed node* without needing to go back to back up file to recover to whatever the time that backup was created. Enabling us to have hot backups.

Let's recap what we just learned in this lecture. *Replica sets are groups of mongod processes* that share the same data between all the members of the set. They provide a *high availability and failover mechanism* to our application, making the service in case of failure. The *failover* is supported by a majority of *nodes* that elect between them who should be the *new primary node* at each point in time. *Replica sets* are a dynamic system, means that members may have different roles at different times, and can be set to address specific functional purpose like addressing *read only workloads*, or set to be *delayed in time to allow hot back-ups*.

### Setting Up a Replica Set

All right, so in this lesson, we're going to initiate a *local replica set*. We're going to start by independently launching *three mongod processes* and they won't actually be able to communicate with each other until we connect them, at which point they'll be able to actually *replicate data* for us. So this is the *configuration file for standalone node*. We've called it *node1.conf*. And these settings should look fairly familiar to you if you've been following the previous lessons.

```javascript
storage:
  dbPath: /var/mongodb/db/node1
net:
  bindIp: localhost
  port: 27011
security:
  authorization: enabled
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/db/node1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example

~~~

vagrant@vagrant:~$ sudo rm -r /var/mongodb
rm: cannot remove '/var/mongodb': No such file or directory
vagrant@vagrant:~$ sudo mkdir -p /var/mongodb/pki/
vagrant@vagrant:~$ sudo chown vagrant:vagrant -R /var/mongodb/pki/
vagrant@vagrant:~$ openssl rand -base64 741 > /var/mongodb/pki/m103-keyfile
vagrant@vagrant:~$ chmod 400 /var/mongodb/pki/m103-keyfile
vagrant@vagrant:~$ ls -l /var/mongodb/pki
total 4
-r-------- 1 vagrant vagrant 1004 Aug 24 10:59 m103-keyfile

vagrant@vagrant:~$ ls -l /var/mongodb
total 4
drwxr-xr-x 2 vagrant vagrant 4096 Aug 24 10:59 pki
vagrant@vagrant:~$ cat /var/mongodb/pki/m103-keyfile
x2XpPnCkAClX0unHGBztVGJ.....
```

We don't actually need to change any of these settings in order to enable *replication*, we just need to add a few lines. So the *keyFile* line enables *key file authentication* on our cluster, which mandates that all members of the *replica set* have to *authenticate* to each other using a *key file* that we create here. And we'll create this one in a minute. This is in addition to the *client authentication* that we enabled in the previous line.

So we create this *key file using OpenSSL*, and we place it in the directory that we specified in our *configuration file*. But right now, our *mongod processes* can't actually use this *key file* because they don't have the permissions to read from it. So what we're going to do is we're actually going to change the permissions using *chmod* in order to allow them to read from the file. *400 here just specifies re-permissions*.

So actually enabling *key file authentication* here implicitly enables the *client authentication* that we enabled in the previous line, but I'm going to leave both here for the time being just for clarity. This is a reminder that in addition to *authenticating with the client, our nodes are also authenticating to each other*. So this is the last line that we have to add to our *configuration file* in order to enable *replication* on this node. And all it does is specify the name of the *replica set* that this *node* is going to be a part of.

Now all we need to do is create the *DB path* that we named up in our *configuration file*. And we can actually use this file to start a *mongod*. So here I'm just creating my *DB path*, and now I can start the *mongod* using our *configuration file*. And we have successfully started our *first node*. So right now we have one *node* and we just have two more to go.

```javascript
sudo mkdir -p /var/mongodb/db/node1

vagrant@vagrant:~$ vim node1.conf
vagrant@vagrant:~$ mongod -f node1.conf
about to fork child process, waiting until server is ready for connections.
forked process: 14360
child process started successfully, parent exiting
```

So these below commands are just copying the file that we just made into a new file called *node2.conf and node3.conf* because the other *two nodes* are going to have very similar configurations. We can basically copy the first one, change three lines, and launch a brand new node. Never underestimate the power of *copy and paste*. I'm just going to do the same thing for our *third node* here, and then edit *both new nodes*.

```javascript
vagrant@vagrant:~$ cp node1.conf node2.conf
vagrant@vagrant:~$ cp node2.conf node3.conf

//Open files to edit via vim
vagrant@vagrant:~$ vim node2.conf
vagrant@vagrant:~$ vim node3.conf

vagrant@vagrant:~$ sudo mkdir -p /var/mongodb/db/node2
vagrant@vagrant:~$ sudo mongod -f node2.conf
about to fork child process, waiting until server is ready for connections.
forked process: 14418
child process started successfully, parent exiting

vagrant@vagrant:~$ sudo mkdir -p /var/mongodb/db/node3
vagrant@vagrant:~$ sudo mongod -f node3.conf
about to fork child process, waiting until server is ready for connections.
forked process: 14451
child process started successfully, parent exiting
```

So the three things that we need to change in these files are the *DB path, the port number, and the log path*. Once we do that, we're actually good to start a *new node*. So here I've just created the path for *node 2* and I'm starting it up with *mongod*. And we now have *two nodes* in our set. I'm just going to do the same thing for our *third config file*, and notice that all *three nodes in the replica set* reference the same key file.

Typically these *mongod* instances would be running on different machines, but because they're running on the same machine, they're all just going to share the same *key file* and use the same one to *authenticate with one another*. Typically this *key file* would be copied on to each machine where each *mongod* was running. So at this point we started *three mongod processes* that will eventually make up a *replica set*.

But right now, they can't *replicate data*. And in fact, they have no knowledge that other *nodes* are out there. They're blind to the world around them. We need to enable communication between the *nodes* so they can stay in sync. So I'm just going to connect to *node one* with **mongo --port 27011**.

```javascript
vagrant@vagrant:~$ 
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:27011/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("a056f0e6-c4c3-4daa-aed7-4c01e5e58723") }
MongoDB server version: 3.6.23
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
 http://docs.mongodb.org/
Questions? Try the support group
 http://groups.google.com/group/mongodb-user
```

So I use this command *rs.initiate()* to initiate the *replica set*. And we actually need to run it on one of the *nodes*. Because we ran it on the *first node*, we just have to add the other *two nodes from the first node*. However, we have *client authentication* enabled, so we can't actually add other *nodes* to the set until we create a *user and then connect as that user*.

```javascript
> rs.initiate()
{
 "info2" : "no configuration specified. Using a default configuration for the set",
 "me" : "localhost:27011",
 "ok" : 1
}
m103-example:SECONDARY>
```

All right, so the below command created our *m103 super user, called m103-admin*, that has *root access and authenticates against the admin database*.

```javascript
m103-example:SECONDARY> use admin
switched to db admin
m103-example:PRIMARY> db.createUser({
...   user: "m103-admin",
...   pwd: "m103-pass",
...   roles: [
...     {role: "root", db: "admin"}
...   ]
... })
Successfully added user: {
 "user" : "m103-admin",
 "roles" : [
  {
   "role" : "root",
   "db" : "admin"
  }
 ]
}
```

Now I'm just going to exit out of this *mongod* and then *log back in as that user*. So this is the command that we're going to use to connect to the *replica set*. And in addition to *authenticating* here with a *username password*, we have to specify the name of the *replica set in the host name*. This will tell the *mongo shell* to connect directly to the *replica set*, instead of just this *one node* that we specify.

```javascript
m103-example:PRIMARY> exit
bye
vagrant@vagrant:~$ mongo --host "m103-example/localhost:27011" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://localhost:27011/?authSource=admin&gssapiServiceName=mongodb&replicaSet=m103-example
2021-08-28T18:27:00.192+0000 I NETWORK  [thread1] Starting new replica set monitor for m103-example/localhost:27011
2021-08-28T18:27:00.197+0000 I NETWORK  [thread1] Successfully connected to localhost:27011 (1 connections now open to localhost:27011 with a 5 second timeout)
Implicit session: session { "id" : UUID("48151354-0e90-49a0-bf70-3e175b24d882") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-08-28T10:47:24.504+0000 I STORAGE  [initandlisten] 
2021-08-28T10:47:24.504+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-08-28T10:47:24.504+0000 I STORAGE  [initandlisten] ** See http://dochub.mongodb.org/core/prodnotes-filesystem
```

What the *shell* is going to do is it's going to use this *node* to discover what the *current primary* is of the *replica set* and then connect to that *node* instead. In this case, obviously there's only one *node in the set and that node is the primary*. So that's the one that the *shell* connected us to.

```javascript
m103-example:PRIMARY> rs.status()
{
  "set" : "m103-example",
  "date" : ISODate("2021-08-28T18:57:17.927Z"),
  "myState" : 1,
  "term" : NumberLong(1),
  "syncingTo" : "",
  "syncSourceHost" : "",
  "syncSourceId" : -1,
  "heartbeatIntervalMillis" : NumberLong(2000),
  "optimes" : {
    "lastCommittedOpTime" : {
      "ts" : Timestamp(1630177027, 1),
      "t" : NumberLong(1)
    },
    "readConcernMajorityOpTime" : {
      "ts" : Timestamp(1630177027, 1),
      "t" : NumberLong(1)
    },
    "appliedOpTime" : {
      "ts" : Timestamp(1630177037, 1),
      "t" : NumberLong(1)
    },
    "durableOpTime" : {
      "ts" : Timestamp(1630177027, 1),
      "t" : NumberLong(1)
    }
  },
  "members" : [
    {
      "_id" : 0,
      "name" : "localhost:27011",
      "health" : 1,
      "state" : 1,
      "stateStr" : "PRIMARY",
      "uptime" : 29393,
      "optime" : {
        "ts" : Timestamp(1630177037, 1),
        "t" : NumberLong(1)
      },
      "optimeDate" : ISODate("2021-08-28T18:57:17Z"),
      "syncingTo" : "",
      "syncSourceHost" : "",
      "syncSourceId" : -1,
      "infoMessage" : "",
      "electionTime" : Timestamp(1630156064, 2),
      "electionDate" : ISODate("2021-08-28T13:07:44Z"),
      "configVersion" : 1,
      "self" : true,
      "lastHeartbeatMessage" : ""
    }
  ],
  "ok" : 1,
  "operationTime" : Timestamp(1630177037, 1),
  "$clusterTime" : {
    "clusterTime" : Timestamp(1630177037, 1),
    "signature" : {
      "hash" : BinData(0,"TrqELvb5UNkcnMBnC2niXX8MPo0="),
      "keyId" : NumberLong("7001466986551050241")
    }
  }
}
```

So this command, *rs.status* is a useful way to get a statu report on our *replica set*. See, it gives us the name of the *set*. It gives us how long the intervals are between *heartbeats*. By default, it's *2000 milliseconds*, which means the *nodes are talking to each other every two seconds*. We can scroll down to get a list of the members in the set. In this case, it's just one member, which is the one that we're connected to, *the current primary*.

So this is the command we use to add *new nodes to our replica set, rs.add*, and all we have to specify here is the *host name*, which is just the *host name of the vagrant box and the port that that node is running on*. Now that worked. I'm just going to do the same for our *third node*. I'm just going to check *rs.isMaster*. And we can see that our *replica set now has three nodes in it*.

```javascript
m103-example:PRIMARY> rs.add("localhost:27012")
{
 "ok" : 1,
 "operationTime" : Timestamp(1630221898, 1),
 "$clusterTime" : {
  "clusterTime" : Timestamp(1630221898, 1),
  "signature" : {
   "hash" : BinData(0,"imH7t3GIPeox2UfmG6gD4LWPg6Y="),
   "keyId" : NumberLong("7001466986551050241")
  }
 }
}
m103-example:PRIMARY> 2021-08-29T07:25:21.886+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] changing hosts to m103-example/localhost:27011,localhost:27012 from m103-example/localhost:27011
2021-08-29T07:25:21.893+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27012 (1 connections now open to localhost:27012 with a 5 second timeout)


m103-example:PRIMARY> rs.add("localhost:27013")
{
 "ok" : 1,
 "operationTime" : Timestamp(1630222100, 1),
 "$clusterTime" : {
  "clusterTime" : Timestamp(1630222100, 1),
  "signature" : {
   "hash" : BinData(0,"wFHA3m5e5OTlMieNvLcp6lm6VVg="),
   "keyId" : NumberLong("7001466986551050241")
  }
 }
}
m103-example:PRIMARY> 2021-08-29T07:28:21.907+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] changing hosts to m103-example/localhost:27011,localhost:27012,localhost:27013 from m103-example/localhost:27011,localhost:27012
2021-08-29T07:28:21.912+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27013 (1 connections now open to localhost:27013 with a 5 second timeout)


m103-example:PRIMARY> rs.isMaster()
{
 "hosts" : [
  "localhost:27011",
  "localhost:27012",
  "localhost:27013"
 ],
 "setName" : "m103-example",
 "setVersion" : 3,
 "ismaster" : true,
 "secondary" : false,
 "primary" : "localhost:27011",
 "me" : "localhost:27011",
 "electionId" : ObjectId("7fffffff0000000000000001"),
 "lastWrite" : {
  "opTime" : {
   "ts" : Timestamp(1630222268, 1),
   "t" : NumberLong(1)
  },
  "lastWriteDate" : ISODate("2021-08-29T07:31:08Z"),
  "majorityOpTime" : {
   "ts" : Timestamp(1630222268, 1),
   "t" : NumberLong(1)
  },
  "majorityWriteDate" : ISODate("2021-08-29T07:31:08Z")
 },
 "maxBsonObjectSize" : 16777216,
 "maxMessageSizeBytes" : 48000000,
 "maxWriteBatchSize" : 100000,
 "localTime" : ISODate("2021-08-29T07:31:15.808Z"),
 "logicalSessionTimeoutMinutes" : 30,
 "minWireVersion" : 0,
 "maxWireVersion" : 6,
 "readOnly" : false,
 "ok" : 1,
 "operationTime" : Timestamp(1630222268, 1),
 "$clusterTime" : {
  "clusterTime" : Timestamp(1630222268, 1),
  "signature" : {
   "hash" : BinData(0,"7zHwHjPsFCWYM9IH/+H0q3gDUd4="),
   "keyId" : NumberLong("7001466986551050241")
  }
 }
}
```

So now that we've added those *two nodes to our replica set and connected them*, they can *replicate data from one another*. One thing I want to point out right now is that *the current primary is running on port 27011*. And we could verify that from the output of *rs.isMaster*, where it says *primary is in fact the node running on 27011*. However, we can force an election so that a different note becomes *primary*. And the command we use to do that is called *rs.stepDown()*.

Now the *step down command* is what we use to safely step down *the current primary to a secondary and force an election to take place*. The error that we're getting here is because the shell is trying to *connect us to the primary*, but the *secondaries are still in the process of electing a primary*, so there is *no primary right now*. As soon as one is elected, the shell will connect us to it, which it just did.

```javascript
m103-example:PRIMARY> rs.stepDown()
2021-08-29T08:07:51.183+0000 E QUERY    [thread1] Error: error doing query: failed: network error while attempting to run command 'replSetStepDown' on host 'localhost:27011'  :
DB.prototype.runCommand@src/mongo/shell/db.js:168:1
DB.prototype.adminCommand@src/mongo/shell/db.js:186:16
rs.stepDown@src/mongo/shell/utils.js:1413:12
@(shell):1:1
2021-08-29T08:07:51.188+0000 I NETWORK  [thread1] Marking host localhost:27011 as failed :: caused by :: Location40657: Last known master host cannot be reached
2021-08-29T08:07:51.191+0000 I NETWORK  [thread1] Socket closed remotely, no longer connected (idle 29 secs, remote host 127.0.0.1:27011)
2021-08-29T08:07:51.195+0000 I NETWORK  [thread1] Successfully connected to localhost:27011 (1 connections now open to localhost:27011 with a 5 second timeout)
2021-08-29T08:07:51.196+0000 W NETWORK  [thread1] Unable to reach primary for set m103-example
2021-08-29T08:07:51.699+0000 W NETWORK  [thread1] Unable to reach primary for set m103-example
2021-08-29T08:07:52.171+0000 W NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Unable to reach primary for set m103-example
2021-08-29T08:07:52.203+0000 W NETWORK  [thread1] Unable to reach primary for set m103-example
2021-08-29T08:07:52.707+0000 W NETWORK  [thread1] Unable to reach primary for set m103-example
```

If we run *rs.isMaster()* again, we can verify that now this *"primary" : "localhost:27012"-node* is the current primary, as opposed to *27011*, which was the primary before. So just to recap, we've covered how to *initiate a replica set*, how you can *add nodes to the replica set*, and how to *check the status of the replica set*. We used *rs.status() and rs.isMaster()* in this lesson, and those commands have different outputs for different use cases. And I would urge you to explore those to figure out which one fits your use case.

```javascript
m103-example:PRIMARY> rs.isMaster()
{
 "hosts" : [
  "localhost:27011",
  "localhost:27012",
  "localhost:27013"
 ],
 "setName" : "m103-example",
 "setVersion" : 3,
 "ismaster" : true,
 "secondary" : false,
 "primary" : "localhost:27012",
 "me" : "localhost:27012",
 "electionId" : ObjectId("7fffffff0000000000000002"),
 "lastWrite" : {
  "opTime" : {
   "ts" : Timestamp(1630224882, 1),
   "t" : NumberLong(2)
  },
  "lastWriteDate" : ISODate("2021-08-29T08:14:42Z"),
  "majorityOpTime" : {
   "ts" : Timestamp(1630224882, 1),
   "t" : NumberLong(2)
  },
  "majorityWriteDate" : ISODate("2021-08-29T08:14:42Z")
 },
 "maxBsonObjectSize" : 16777216,
 "maxMessageSizeBytes" : 48000000,
 "maxWriteBatchSize" : 100000,
 "localTime" : ISODate("2021-08-29T08:14:52.514Z"),
 "logicalSessionTimeoutMinutes" : 30,
 "minWireVersion" : 0,
 "maxWireVersion" : 6,
 "readOnly" : false,
 "ok" : 1,
 "operationTime" : Timestamp(1630224882, 1),
 "$clusterTime" : {
  "clusterTime" : Timestamp(1630224882, 1),
  "signature" : {
   "hash" : BinData(0,"Z2Gt3ezkS1vGyxaVlxtv5+UxDqk="),
   "keyId" : NumberLong("7001466986551050241")
  }
 }
}
```

### Lab: Deploy a Replica Set

#### Problem 1

Launch a replica set with three members:

1. There are three configuration files in your IDE workspace, but they are incomplete.
   Update these configuration files so that all three *mongod* processes:

* authenticate internally using the keyfile */var/mongodb/pki/m103-keyfile*
* belong to the replica set *m103-repl*

2.Once your configuration files are complete, start a *mongod* process using *one* of them.

3.When this node is running, use the mongo shell to connect and initiate your replica set with *rs.initiate()*. The shell prompt will read *PRIMARY* when the election is complete.

4.Because the replica set uses a keyfile for internal authentication, clients must authenticate before performing any actions.

While still connected to the primary node, create the admin user for your *replica set*:

```javascript
db.createUser({
  user: "m103-admin",
  pwd: "m103-pass",
  roles: [
    {role: "root", db: "admin"}
  ]
})
```

5.Once *m103-admin* is created, exit the mongo shell and start the other two mongod processes with their respective configuration files.

6.Reconnect to your primary node as *m103-admin* and add the other two nodes to your *replica set using rs.add()*.

7.Once your other two members have been successfully added, run *rs.status()* to check that the *members* array has three nodes - one labeled *PRIMARY* and two labeled *SECONDARY*.

8.Click "Run Tests" to run a suite of tests that will check the configuration of your *replica set*. The results of these tests will let you know which steps you've yet to complete.

#### Answer 1

```javascript
// mongod_1.conf
storage:
  dbPath: /var/mongodb/db/1
net:
  bindIp: localhost
  port: 27001
security:
  authorization: enabled
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/logs/mongod1.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-repl

~~~

user@M103# mongod -f mongod_1.conf
about to fork child process, waiting until server is ready for connections.
forked process: 330
child process started successfully, parent exiting
user@M103# mongod -f mongod_2.conf
about to fork child process, waiting until server is ready for connections.
forked process: 363
child process started successfully, parent exiting
user@M103# mongod -f mongod_3.conf
about to fork child process, waiting until server is ready for connections.
forked process: 395
child process started successfully, parent exiting
user@M103# mongo --port 27001
MongoDB shell version v4.0.5
connecting to: mongodb://127.0.0.1:27001/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("62444f38-e911-488c-92ee-06aa85bb2d2c") }
MongoDB server version: 4.0.5
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        http://docs.mongodb.org/
Questions? Try the support group
        http://groups.google.com/group/mongodb-user
> rs.initiate()
{
        "info2" : "no configuration specified. Using a default configuration for the set",
        "me" : "localhost:27001",
        "ok" : 1
}
m103-repl:OTHER> use admin
switched to db admin
m103-repl:PRIMARY> 
db.createUser({
...   user: "m103-admin",
...   pwd: "m103-pass",
...   roles: [
...     {role: "root", db: "admin"}
...   ]
... })
Successfully added user: {
        "user" : "m103-admin",
        "roles" : [
                {
                  "role" : "root",
                  "db" : "admin"
                }
        ]
}
m103-repl:PRIMARY> 
exit
bye
user@M103# mongo --host "m103-repl/localhost:27001" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v4.0.5
connecting to: mongodb://localhost:27001/?authSource=admin&gssapiServiceName=mongodb&replicaSet=m103-repl
2021-08-29T14:15:10.125+0000 I NETWORK  [js] Starting new replica set monitor for m103-repl/localhost:27001
2021-08-29T14:15:10.145+0000 I NETWORK  [js] Successfully connected to localhost:27001 (1 connections now open to localhost:27001 with a 5 second timeout)
Implicit session: session { "id" : UUID("3a7e42d5-c7b0-4dc7-a11c-81a3697cbe5f") }
MongoDB server version: 4.0.5
Server has startup warnings: 
2021-08-29T14:09:52.786+0000 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2021-08-29T14:09:52.786+0000 I CONTROL  [initandlisten] 
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

m103-repl:PRIMARY> 
rs.add("localhost:27002")
{
        "ok" : 1,
        "operationTime" : Timestamp(1630246605, 1),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1630246605, 1),
                "signature" : {
                  "hash" : BinData(0,"2jYndDiU62dxs2+vcJpmR3XlNfQ="),
                  "keyId" : NumberLong("7001854594464612354")
                }
        }
}
m103-repl:PRIMARY> 
rs.add("localhost:270122021-08-29T14:17:10.244+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor] changing hosts to m103-repl/localhost:27001,localhost:27002 from m103-repl/localhost:27001
2021-08-29T14:17:10.245+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor] Successfully connected to localhost:27002 (1 connections now open to localhost:27002 with a 5 second timeout)

m103-repl:PRIMARY> 
rs.add("localhost:27003")
{
        "ok" : 1,
        "operationTime" : Timestamp(1630246683, 2),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1630246683, 2),
                "signature" : {
                  "hash" : BinData(0,"pov/zMTcu+e9PzUdSJLEG+Jr5kU="),
                  "keyId" : NumberLong("7001854594464612354")
                }
        }
}
m103-repl:PRIMARY> 
2021-08-29T14:18:10.293+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor] changing hosts to m103-repl/localhost:27001,localhost:27002,localhost:27003 from m103-repl/localhost:27001,localhost:27002
2021-08-29T14:18:10.294+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor] Successfully connected to localhost:27003 (1 connections now open to localhost:27003 with a 5 second timeout)
rs.status()
{
        "set" : "m103-repl",
        "date" : ISODate("2021-08-29T14:18:34.167Z"),
        "myState" : 1,
        "term" : NumberLong(1),
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "heartbeatIntervalMillis" : NumberLong(2000),
        "optimes" : {
                "lastCommittedOpTime" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                },
                "readConcernMajorityOpTime" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                },
                "appliedOpTime" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                },
                "durableOpTime" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                }
        },
        "lastStableCheckpointTimestamp" : Timestamp(1630246673, 1),
        "members" : [
                {
                  "_id" : 0,
                  "name" : "localhost:27001",
                  "health" : 1,
                  "state" : 1,
                  "stateStr" : "PRIMARY",
                  "uptime" : 523,
                  "optime" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                  },
                  "optimeDate" : ISODate("2021-08-29T14:18:33Z"),
                  "syncingTo" : "",
                  "syncSourceHost" : "",
                  "syncSourceId" : -1,
                  "infoMessage" : "",
                  "electionTime" : Timestamp(1630246312, 1),
                  "electionDate" : ISODate("2021-08-29T14:11:52Z"),
                  "configVersion" : 3,
                  "self" : true,
                  "lastHeartbeatMessage" : ""
                },
                {
                  "_id" : 1,
                  "name" : "localhost:27002",
                  "health" : 1,
                  "state" : 2,
                  "stateStr" : "SECONDARY",
                  "uptime" : 108,
                  "optime" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                  },
                  "optimeDurable" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                  },
                  "optimeDate" : ISODate("2021-08-29T14:18:33Z"),
                  "optimeDurableDate" : ISODate("2021-08-29T14:18:33Z"),
                  "lastHeartbeat" : ISODate("2021-08-29T14:18:33.661Z"),
                  "lastHeartbeatRecv" : ISODate("2021-08-29T14:18:32.711Z"),
                  "pingMs" : NumberLong(0),
                  "lastHeartbeatMessage" : "",
                  "syncingTo" : "localhost:27001",
                  "syncSourceHost" : "localhost:27001",
                  "syncSourceId" : 0,
                  "infoMessage" : "",
                  "configVersion" : 3
                },
                {
                  "_id" : 2,
                  "name" : "localhost:27003",
                  "health" : 1,
                  "state" : 2,
                  "stateStr" : "SECONDARY",
                  "uptime" : 30,
                  "optime" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                  },
                  "optimeDurable" : {
                  "ts" : Timestamp(1630246713, 1),
                  "t" : NumberLong(1)
                  },
                  "optimeDate" : ISODate("2021-08-29T14:18:33Z"),
                  "optimeDurableDate" : ISODate("2021-08-29T14:18:33Z"),
                  "lastHeartbeat" : ISODate("2021-08-29T14:18:33.667Z"),
                  "lastHeartbeatRecv" : ISODate("2021-08-29T14:18:32.941Z"),
                  "pingMs" : NumberLong(0),
                  "lastHeartbeatMessage" : "",
                  "syncingTo" : "localhost:27001",
                  "syncSourceHost" : "localhost:27001",
                  "syncSourceId" : 0,
                  "infoMessage" : "",
                  "configVersion" : 3
                }
        ],
        "ok" : 1,
        "operationTime" : Timestamp(1630246713, 1),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1630246713, 1),
                "signature" : {
                  "hash" : BinData(0,"rs/FH+hBTZCoLM7rWZ+urmzOOm0="),
                  "keyId" : NumberLong("7001854594464612354")
                }
        }
}
m103-repl:PRIMARY> 
```

### Replication Configuration Document

In this lesson, we are going to dissect the *replication configuration*. In particular, we will be looking to which *replica set configuration* options we have and how those options are reflected in the *configuration options document*. The *replica set configuration document* is a simple *BSON* document that we manage using a *JSON* representation where the *configuration or our replica sets* is defined and is shared across all the *nodes* that are configured in the sets.

We can manually set changes to this document to *configure a replica set* according with the expected *topology and overall replication options*. Although we can do this by simply editing such documents using the *mongo.db shell*, we can also use a set of *shell helpers like rs.add, initiate, remove*, and so forth. That will help us facilitate the *configuration and management* of this same configuration.

There is a fair amount of different *configuration options* at our disposal as you can see from the baseline *configuration options document*. This might sound a bit daunting, but in reality, it's a pretty straightforward set of options. And for this lesson, in particular, we are going to be looking only to a set of these *configuration options* -- the *basic and fundamental* ones and the ones that we are going to be using throughout the course. All the other options are out of scope for this course.

```javascript
{
  _id: <string>,
  version: <int>,
  members: [
    {
      _id: <int>,
      host: <string>,
      arbiterOnly: <boolean>,
      hidden: <boolean>,
      priority: <number>,
      slaveDelay: <int>,
    },
    ...
  ],
}
```

But let's start with the *_id* field. This field is sets with the name of the *replica set*. This is a string value that matches the server defined *replica set*. Whenever we start our *mongoD* and we provide a -- *replSet name to our mongoD*, meaning that this *mongoD* will belong to the set, or by setting that same name in the *configuration file* -- for example, our *etc/mongodb.conf* file, we are setting a specific value to be used as a *replica set* name.

The same value must match the *_id field of our replica set configuration document*. In case we have different values from the *configuration_id* and the defined *replica set* name, we end up with an error message. We get an incorrect *replica set configuration*, stating that we are attempting to initiate the *replica set* with a different name from which it has been set as *--replSet or in the config file*. This is a safeguard against incorrect configurations or incorrect adding the server to the incorrect *replica sets*.

The next field is *version*. Now, a *version* is just an integer that gets incremented every time the current *configuration of our replica set* changes. If, for example, we add a *node to our replica set* and if our *version* used to be number 1, we increment the value. Every time we changed a *topology*, changed a *replica set configuration* at all or do something like changing the number of votes of a given host, that will automatically *increment the version number*.

The next field in line is *members*. And *members* is where the *topology of our replica set* is defined. Each element of the *members array* is a sub-document that contains the *replica set node members*. Each has a *host* comprised of the *host name and port*. In this case, for example, we have *m103:27017*. Then we have a *set of flags* that determine the role of the *nodes within the replica set*. *arbiterOnly* is self-explanatory. This means that the *node* will not be holding any data, and its contribution to the set is to ensure quorum in elections. *hidden* -- it's another flag that sets the *node in hidden role*. An *hidden node* is not visible to the application, which means that every time we emit something like an *rs.isMaster()* command, this *node* will not be listed.

*Int nodes* are useful for situations where we want a particular *node* to support specific operations. They are not related with the operational nature of your application. For example, having a *node* that handles all the reporting or *BI reads*. Both of these flags are set to *false* by default.

Then we have *priority, and priority* is an integer value that allows us to set a hierarchy within the *replica set*. We can set *priorities between 0 and 1,000*. Members with *higher priority* tend to be elected in primaries more often. A change in the *priority of a node* will trigger an election because it will be perceived as a *topology* change.

Setting *priority to 0* effectively excludes that member from ever becoming a *primary*. In case, we are setting a member to be *arbiterOnly*, that implies that the *priority needs to be set to 0*. The same would apply for *hidden*. The *priority here also needs to become 0*. If the *node is hidden*, it can never become *primary* because it will not be seen by the application. Failing to do that will result in an *error where a new replica set configuration is incompatible*. *Priority must be 0 when hidden equals true*.

And finally, we have *slaveDelay. slaveDelay* is an integer value that determines a *replication delay* interval in seconds. The *default is 0*. This option will enable *delayed nodes*. These *delayed members maintain a copy of data reflecting a state in some point in the past*, applying that *delay in seconds*. For example, if we have our *slaveDelay option to 3,600 seconds, which means 1 hour*, that will mean that such member will be *replicating data from the other nodes in the sets that occurred 1 hour ago*.

By setting the *slaveDelay* the option, it also implies that your *node will be hidden, and the priority will be set to 0*. Oh yes, and I almost forgot. We also have the *_id* field within the *members sub-document*. This is just a unique identifier of each element in the array. It's a simple integer field that is set once we had a member to the *replica set*. Once set, this value cannot be changed.

Now again, there is a lot more that we can configure within the *replica set configuration documents*. Field like *settings* where we can define several different *replication protocol attributes* or things like the *protocolVersion and configsvr* that will be seen later in this course. But the actual uses of these options for the basic administration course are out of scope.

```javascript
{
  _id: <string>,
  version: <int>,
  term: <int>,
  protocolVersion: <number>,
  writeConcernMajorityJournalDefault: <boolean>,
  configsvr: <boolean>,
  members: [
    {
      _id: <int>,
      host: <string>,
      arbiterOnly: <boolean>,
      buildIndexes: <boolean>,
      hidden: <boolean>,
      priority: <number>,
      tags: <document>,
      secondaryDelaySecs: <int>,
      votes: <number>
    },
    ...
  ],
  settings: {
    chainingAllowed : <boolean>,
    heartbeatIntervalMillis : <int>,
    heartbeatTimeoutSecs: <int>,
    electionTimeoutMillis : <int>,
    catchUpTimeoutMillis : <int>,
    getLastErrorModes : <document>,
    getLastErrorDefaults : <document>,
    replicaSetId: <ObjectId>
  }
}
```

Let's recap. *Replication configuration document* is used to *configure our replica sets*. This is where the properties of our *replica sets are defined*, and the document is shared across all members of the set. The *members* field is where a bunch of our *basic configuration* is going to be determined -- which *nodes are part of the set*, what roles do they have, and what kind of *topology* we want to define is set on this field.

There is a vast amount of other configuration options that either deal with internal replication mechanisms or overall configurations of the sets. We are out of scope on those, but keep in mind that there's a lot more in the *replication configuration document* that you can set up.

### Replication Commands

In this lesson, we're going to cover some of the commands we use to gather information about a *replica set*. You've probably noticed that there are a lot of different ways to check the status of a *replica set* because each *node* emits a lot of information. Each *replication command* gives a different subset of this information.

```javascript
// Starting my replica set
vagrant@vagrant:~$ mongod -f node1.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1824
child process started successfully, parent exiting
vagrant@vagrant:~$ sudo mongod -f node2.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1903
child process started successfully, parent exiting
vagrant@vagrant:~$ mongod -f node3.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1993
ERROR: child process failed, exited with error number 1
To see additional information in this output, start without the "--fork" option.
vagrant@vagrant:~$ sudo mongod -f node3.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1999
child process started successfully, parent exiting
~~~
vagrant@vagrant:~$ mongo --host "m103-example/localhost:27011" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://localhost:27011/?authSource=admin&gssapiServiceName=mongodb&replicaSet=m103-example
2021-09-02T03:40:06.826+0000 I NETWORK  [thread1] Starting new replica set monitor for m103-example/localhost:27011
2021-09-02T03:40:06.833+0000 I NETWORK  [thread1] Successfully connected to localhost:27011 (1 connections now open to localhost:27011 with a 5 second timeout)
2021-09-02T03:40:06.834+0000 I NETWORK  [thread1] changing hosts to m103-example/localhost:27011,localhost:27012,localhost:27013 from m103-example/localhost:27011
2021-09-02T03:40:06.837+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27012 (1 connections now open to localhost:27012 with a 5 second timeout)
2021-09-02T03:40:06.843+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27013 (1 connections now open to localhost:27013 with a 5 second timeout)
Implicit session: session { "id" : UUID("a838ae1c-f713-4b06-ba3d-30224734e043") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-02T03:35:58.173+0000 I STORAGE  [initandlisten] 
2021-09-02T03:35:58.173+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-02T03:35:58.173+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
m103-example:PRIMARY>
```

The first one we're going to cover is *rs.status(). rs.status()* is used to report on the general health of each node in the set. *The data it gets from the heartbeat sent in-between nodes in the set*. Because it relies on *heartbeats* for this data, it may actually be a few seconds out of date. This command gives us the most information for each specific *node*.

```javascript
m103-example:PRIMARY> rs.status()
{
    "set" : "m103-example",
    "date" : ISODate("2021-09-02T03:41:20.920Z"),
    "myState" : 1,
    "term" : NumberLong(3),
    "syncingTo" : "",
    "syncSourceHost" : "",
    "syncSourceId" : -1,
    "heartbeatIntervalMillis" : NumberLong(2000),
    "optimes" : {
      "lastCommittedOpTime" : {
        "ts" : Timestamp(1630554074, 1),
        "t" : NumberLong(3)
      },
      "readConcernMajorityOpTime" : {
        "ts" : Timestamp(1630554074, 1),
        "t" : NumberLong(3)
      },
      "appliedOpTime" : {
        "ts" : Timestamp(1630554074, 1),
        "t" : NumberLong(3)
      },
      "durableOpTime" : {
        "ts" : Timestamp(1630554074, 1),
        "t" : NumberLong(3)
      }
    },
    "members" : [
      {
        "_id" : 0,
        "name" : "localhost:27011",
        "health" : 1,
        "state" : 1,
        "stateStr" : "PRIMARY",
        "uptime" : 323,
        "optime" : {
          "ts" : Timestamp(1630554074, 1),
          "t" : NumberLong(3)
        },
        "optimeDate" : ISODate("2021-09-02T03:41:14Z"),
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "infoMessage" : "",
        "electionTime" : Timestamp(1630553803, 1),
        "electionDate" : ISODate("2021-09-02T03:36:43Z"),
        "configVersion" : 3,
        "self" : true,
        "lastHeartbeatMessage" : ""
      },
      {
        "_id" : 1,
        "name" : "localhost:27012",
        "health" : 1,
        "state" : 2,
        "stateStr" : "SECONDARY",
        "uptime" : 287,
        "optime" : {
          "ts" : Timestamp(1630554074, 1),
          "t" : NumberLong(3)
        },
        "optimeDurable" : {
          "ts" : Timestamp(1630554074, 1),
          "t" : NumberLong(3)
        },
        "optimeDate" : ISODate("2021-09-02T03:41:14Z"),
        "optimeDurableDate" : ISODate("2021-09-02T03:41:14Z"),
        "lastHeartbeat" : ISODate("2021-09-02T03:41:19.377Z"),
        "lastHeartbeatRecv" : ISODate("2021-09-02T03:41:19.429Z"),
        "pingMs" : NumberLong(0),
        "lastHeartbeatMessage" : "",
        "syncingTo" : "localhost:27011",
        "syncSourceHost" : "localhost:27011",
        "syncSourceId" : 0,
        "infoMessage" : "",
        "configVersion" : 3
      },
      {
        "_id" : 2,
        "name" : "localhost:27013",
        "health" : 1,
        "state" : 2,
        "stateStr" : "SECONDARY",
        "uptime" : 225,
        "optime" : {
          "ts" : Timestamp(1630554074, 1),
          "t" : NumberLong(3)
        },
        "optimeDurable" : {
          "ts" : Timestamp(1630554074, 1),
          "t" : NumberLong(3)
        },
        "optimeDate" : ISODate("2021-09-02T03:41:14Z"),
        "optimeDurableDate" : ISODate("2021-09-02T03:41:14Z"),
        "lastHeartbeat" : ISODate("2021-09-02T03:41:19.531Z"),
        "lastHeartbeatRecv" : ISODate("2021-09-02T03:41:19.029Z"),
        "pingMs" : NumberLong(0),
        "lastHeartbeatMessage" : "",
        "syncingTo" : "localhost:27012",
        "syncSourceHost" : "localhost:27012",
        "syncSourceId" : 1,
        "infoMessage" : "",
        "configVersion" : 3
      }
    ],
    "ok" : 1,
    "operationTime" : Timestamp(1630554074, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630554074, 1),
      "signature" : {
        "hash" : BinData(0,"eYW1d85AhdWgUxzQAbPzV5d5Yno="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

We can see that for a given node we get the *state of the node. In this case, it's the primary*. We have the *up time, which is the number of seconds this note has been running for*. And we have the *optime, which is the last time this node applied an operation from its oplog*. There are *heartbeat stats for each node as well but not for the node that we ran this command on*. That's because the *heartbeat stats are all relative to where rs.status was run*.

We know that it was run from the *first node because the self flag in this node is true*. We can scroll down to one of the other *nodes* and see that we have some *heartbeats stats down here*. Because we know the primary was where this command was run from. We know that *last heartbeat refers to the last time this node successfully received a heartbeat from the primary*.

Conversely, *last heartbeat received refers to the last time the primary successfully received a heartbeat from this node*. We can see the *actual frequency of heartbeats in this set through a heartbeat interval millis*. In this case, this set is running with the default of *2,000 milliseconds, which means that the nodes are talking to each other about every two seconds*.

The next command we're going to cover is *rs.isMaster()*. This one describes the *role of the node where we ran this command from*. And it also gives us some information about the *replica set itself*. The output is a lot easier to read than *rs.status()* just because its output is a lot shorter. So as we can see, the list of hosts is a lot shorter in this command, and we can very easily verify if this *node is a secondary*.

```javascript
m103-example:PRIMARY> rs.isMaster()
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012",
      "localhost:27013"
    ],
    "setName" : "m103-example",
    "setVersion" : 3,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:27011",
    "me" : "localhost:27011",
    "electionId" : ObjectId("7fffffff0000000000000003"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630558914, 1),
        "t" : NumberLong(3)
      },
      "lastWriteDate" : ISODate("2021-09-02T05:01:54Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630558914, 1),
        "t" : NumberLong(3)
      },
      "majorityWriteDate" : ISODate("2021-09-02T05:01:54Z")
    },
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-02T05:02:00.923Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1630558914, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630558914, 1),
      "signature" : {
        "hash" : BinData(0,"0vqCofSFrnH4lt2UhuI8+SdCngI="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

In this case, it's not, because *secondary is false*. Or if this is *the primary -- and ismaster is true* in this case. It also gives us the name of *the primary node in the set* regardless of where we ran this command from. In this case, obviously, we ran it from the *primary, so this primary flag is just going to say the same thing as me*. So I just want to point out here when we type *ismaster()* command with parentheses afterward, we're calling the *ismaster()* method. But we can remove the parentheses to see what's actually being run in the background.

```javascript
m103-example:PRIMARY> rs.isMaster
function () {
  return db.isMaster();
}
```

And we can see that *rs.isMaster* is actually just a wrapper around a function called *db.isMaster()*. You're going to notice that a lot of the *rs.commands in Mongo Shell* are actually just wrappers around *db commands*. As a side note, this is the command that *the drivers use to discover each node's role in the replica set*. For more on that, you can follow the reference in the lecture notes.

The next command is *db.serverStatus()*. This command gives us a lot of information about the *MongoD process*, but we're just going to look at the section called *repl*. The output from this command is going to be very similar to the output of *rs.isMaster()*. So as we can see, the output of this command is very similar to the output of *rs.isMaster()* with the exception of one field here.

```javascript
m103-example:PRIMARY> db.serverStatus()['repl']
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012",
      "localhost:27013"
    ],
    "setName" : "m103-example",
    "setVersion" : 3,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:27011",
    "me" : "localhost:27011",
    "electionId" : ObjectId("7fffffff0000000000000003"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630560115, 1),
        "t" : NumberLong(3)
      },
      "lastWriteDate" : ISODate("2021-09-02T05:21:55Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630560115, 1),
        "t" : NumberLong(3)
      },
      "majorityWriteDate" : ISODate("2021-09-02T05:21:55Z")
    },
    "rbid" : 1
}
```

The *rbid is not included in rs.isMaster()*. And all this does is count the number of *rollbacks that have occurred on this node*. The last command we're going to cover is *rs.printReplicationInfo()*. This command only has data about the *oplog and specifically only the oplog for the node we're currently connected to*. It'll give us exact *time stamps for the first and last events that occurred in the oplog for that node*.

```javascript
m103-example:PRIMARY> rs.printReplicationInfo()
configured oplog size:   2845.00048828125MB
log length start to end: 404401secs (112.33hrs)
oplog first event time:  Sat Aug 28 2021 13:07:44 GMT+0000 (UTC)
oplog last event time:   Thu Sep 02 2021 05:27:45 GMT+0000 (UTC)
now:                     Thu Sep 02 2021 05:27:54 GMT+0000 (UTC)
```

So this is a quick report on the current length of the *oplog in time and in megabytes*. And remember that the earliest event in the *oplog* is subject to change because the *oplog* is capped collection, and it's periodically flush to make room for new data. In this lesson, we've learned that there are several different ways to check the status of a r*eplica set*, and each one is important in its own right.

### Local DB: Part 1

In this lesson, we are going to take a quick peek into a *fundamental database and the old replication process -- our dear, sweet Local DB*. The minute we start our *MongoD*, like I'm doing right now, there's a *standalone node*.

```javascript
vagrant@vagrant:~$ sudo mkdir allbymyselfdb
vagrant@vagrant:~$ mongod --dbpath allbymyselfdb
2021-09-02T05:54:54.988+0000 I CONTROL  [initandlisten] MongoDB starting : pid=2366 port=27017 dbpath=allbymyselfdb 64-bit host=vagrant
2021-09-02T05:54:54.988+0000 I CONTROL  [initandlisten] db version v3.6.23
2021-09-02T05:54:54.989+0000 I CONTROL  [initandlisten] git version: d352e6a4764659e0d0350ce77279de3c1f243e5c
2021-09-02T05:54:54.989+0000 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.2n  7 Dec 2017
2021-09-02T05:54:54.989+0000 I CONTROL  [initandlisten] allocator: tcmalloc
2021-09-02T05:54:54.989+0000 I CONTROL  [initandlisten] modules: none
2021-09-02T05:54:54.990+0000 I CONTROL  [initandlisten] build environment:
2021-09-02T05:54:54.990+0000 I CONTROL  [initandlisten]     distmod: ubuntu1604
2021-09-02T05:54:54.990+0000 I CONTROL  [initandlisten]     distarch: x86_64
2021-09-02T05:54:54.990+0000 I CONTROL  [initandlisten]     target_arch: x86_64
2021-09-02T05:54:54.990+0000 I CONTROL  [initandlisten] options: { storage: { dbPath: "allbymyselfdb" } }
2021-09-02T05:54:54.991+0000 I STORAGE  [initandlisten] exception in initAndListen: IllegalOperation: Attempted to create a lock file on a read-only directory: allbymyselfdb, terminating
2021-09-02T05:54:54.991+0000 I CONTROL  [initandlisten] now exiting
2021-09-02T05:54:54.992+0000 I CONTROL  [initandlisten] shutting down with code:100
~~~
vagrant@vagrant:~$ mongo
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7d4b49b7-a0b5-4043-a8b0-74674fb036ae") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-02T03:26:40.494+0000 I STORAGE  [initandlisten] 
2021-09-02T03:26:40.494+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-02T03:26:40.494+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2021-09-02T03:26:43.456+0000 I CONTROL  [initandlisten] 
2021-09-02T03:26:43.456+0000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2021-09-02T03:26:43.456+0000 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2021-09-02T03:26:43.457+0000 I CONTROL  [initandlisten] 
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

And once I connect to that *node*, we can see three different *name spaces, or databases*, if you prefer. We have *admin, which comprises all the Administration Data* and where most of our *administration commands like db.shutdownServer()*, for example, needs to be executed, or will be executed. And we have *local and config*. So let's jump into *local* for a second.

```javascript
> use local
switched to db local
> show collections
startup_log
```

And we can see that, in this instance, *a standalone, all by itself, node*. The *local DB has only one collection -- startup_log*. Nothing extraordinary so far, in that this *startup_log* only holds the *start up log of this particular node*, as the saying kind of leads to. So let's connect to our *replica set* instead and check out how these *local do once we are in the replica set land*.

```javascript
vagrant@vagrant:~$ mongo --host "m103-example/localhost:27011" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://localhost:27011/?authSource=admin&gssapiServiceName=mongodb&replicaSet=m103-example
2021-09-02T08:55:12.915+0000 I NETWORK  [thread1] Starting new replica set monitor for m103-example/localhost:27011
2021-09-02T08:55:12.920+0000 I NETWORK  [thread1] Successfully connected to localhost:27011 (1 connections now open to localhost:27011 with a 5 second timeout)
2021-09-02T08:55:12.923+0000 I NETWORK  [thread1] Successfully connected to localhost:27013 (1 connections now open to localhost:27013 with a 5 second timeout)
2021-09-02T08:55:12.925+0000 I NETWORK  [thread1] changing hosts to m103-example/localhost:27011,localhost:27012,localhost:27013 from m103-example/localhost:27011
2021-09-02T08:55:12.930+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27012 (1 connections now open to localhost:27012 with a 5 second timeout)
Implicit session: session { "id" : UUID("ae8a5036-95b0-44d7-9d91-1e7289be45bb") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-02T03:37:30.754+0000 I STORAGE  [initandlisten] 
2021-09-02T03:37:30.754+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-02T03:37:30.754+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2021-09-02T03:37:33.529+0000 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-02T03:37:33.529+0000 I CONTROL  [initandlisten] 
m103-example:PRIMARY> use local
switched to db local
m103-example:PRIMARY> show collections
me
oplog.rs
replset.election
replset.minvalid
replset.oplogTruncateAfterPoint
startup_log
system.replset
system.rollback.id
```

Now that I'm connected to a *replica set* -- and you can see here from the prompt that I'm connected ta *replica M103 and to its primary*. If I *use local and show the collections* -- so here we have a little bit more of information, or at least a bit more of *collections* in this scenario. Great, but what are these for anyway? Most of these *collections, like me, startup_log, system.replset, system.rollback.id, or replset.election, replset.minvalid, and replset.oplogTruncateAfterPoint are collections maintained internally by the server*.

They don't really vary that much, and the information they hold are simple *configuration data* -- nothing too interesting there. But where things get really interesting is with *one collection* in particular -- *oplog.rs. oplog.rs* is *the central point of our replication mechanism*. This is the *oplog collection* that will keep track of all statements being *replicated in our replica set*.

```javascript
m103-example:PRIMARY> db.oplog.rs.findOne()
{
    "ts" : Timestamp(1630222100, 1),
    "t" : NumberLong(1),
    "h" : NumberLong("-9163983915734987866"),
    "v" : 2,
    "op" : "n",
    "ns" : "",
    "wall" : ISODate("2021-08-29T07:28:20.096Z"),
    "o" : {
      "msg" : "Reconfig set",
      "version" : 3
    }
}
```

Every single piece of information and operations that need to be *replicated will be logged in this collection*. There are a few things about the *oplog.rs collection* that you should know about. First of all, it's a *capped collection. Capped collection means that the size of this collection is limited to a specific size*. If we collect the *stats of our oplog.rs collection* into this variable, there's *a flag called .capped* that will tell us that this collection is, indeed, *capped*.

```javascript
m103-example:PRIMARY> var stats = db.oplog.rs.stats()
m103-example:PRIMARY> stats.capped
true
m103-example:PRIMARY> stats.size
191842
m103-example:PRIMARY> stats.maxSize
NumberLong("2982878208")
m103-example:PRIMARY> var stats = db.oplog.rs.stats(1024*1024)
m103-example:PRIMARY> stats.maxSize
2844
```

You can see the *size of this collection*. We can also see the *max size of the particular collection*. Now if you want to see the *stats into a megabyte unit*, you can see that this collection in here holds up to almost 3 gigabytes of data -- 2.8 gigabytes. By default, the *oplog.rs collection* will take *5% of your free disk*. In my case, I have nearly *56 gigabytes* of available data. So 2.8 gigabytes gives me those 5%.

```javascript
m103-example:PRIMARY> exit
bye
vagrant@vagrant:~$ df -h
Filesystem                    Size  Used Avail Use% Mounted on
udev                          463M     0  463M   0% /dev
tmpfs                          99M  5.1M   94M   6% /run
/dev/mapper/vagrant--vg-root   62G  3.1G   56G   6% /
tmpfs                         493M     0  493M   0% /dev/shm
tmpfs                         5.0M     0  5.0M   0% /run/lock
tmpfs                         493M     0  493M   0% /sys/fs/cgroup
vagrant                        23G   14G  9.3G  60% /vagrant
tmpfs                          99M     0   99M   0% /run/user/1000
```

*The size of our oplog will determine our replication window* -- the amount of time that it will take to fill in your *oplog*. Now, we can also see some of that information from the *printReplicationInfo()*, where here, giving the current status of *my oplog*. We are configured for those 2845 megabytes. The log length starts to end is around 484986secs (134.72hrs).

```javascript
m103-example:PRIMARY> rs.printReplicationInfo()
configured oplog size:   2845.00048828125MB
log length start to end: 484986secs (134.72hrs)
oplog first event time:  Sat Aug 28 2021 13:07:44 GMT+0000 (UTC)
oplog last event time:   Fri Sep 03 2021 03:50:50 GMT+0000 (UTC)
now:                     Fri Sep 03 2021 03:50:56 GMT+0000 (UTC)
```

And it's calculated based on the oplog first event time and the oplog last event time. Now as you can see, I haven't done much so far. And from now, where we stand right now at this moment in time, I see that I have not done much in this particular *replica set*. So the calculated time to fill in the *oplog* is relatively low. But wait just a second. I thought that the *oplog size* was measured in size, therefore it's megabytes, but we are talking about hours?

Fear not, young Padawan. What is happening here is that *MongoDB* will let you know how much time it will take -- given the current workload, how much time will it take to start overwriting entries in your oplog. In this case, I have not been doing much, therefore my workload is quite low. So it will only take about *0.1 hours to fill the oplog*, which is not really predictable at this point. We need more data to actually calculate correctly how much time does it take to fill up our *oplog*.

### Local DB: Part 2

After initiating our *node* and adding the *node* to the *replica set*, the *oplog.rs collection* is created. By default, as I mentioned before, we take 5% of the available disk. But this value can also be set by configuring it through the *oplog size* in megabytes under the *replication section of our configuration file*. As operations get logged into the *oplog*, like *inserts or deletes or create collection* kind of operations, the *oplog.rs collection* starts to accumulate the operations and statements, until it reaches the *oplog size limit*.

Once that happens, the first operations in our *oplog* start to be overwritten with newer operations. The time it takes to fill in fully our *oplog* and start rewriting the early statements determines the *replication window*. The *replication window* is important aspect to monitor because we'll impact how much time the *replica set* can afford a *node* to be down without requiring any human intervention to auto recover.

Every *node* in our *replica set* has its own *oplog*. As *writes and operations* gets to the *primary node*, these are captured in the *oplog*. And then the *secondary nodes replicate that data and apply it on their own oplog*. Now if for some reason one of the *nodes* gets disconnected, either because they're going some maintenance, or there's some sort of network issues, or any server downtime of any kind, and the server keeps on working, the *replica set* keeps on accumulating new writes -- for the server to be able to catch up with the *remaining nodes*, it will need to figure out what's a common point where everyone can see what happened in the past.

Basically what will happen is that a *recovering node* will check for its *last oplog entry* and try to find it in one of the *available nodes*. Once it finds it, it will just simply re-apply all operations since that point and catch up with the remaining *nodes of the sets*. However, if it is not able to find the same common operation in the remaining nodes' oplog because of the oplog already rotated and no sync source point as the last operation, the node will not be able to automatically recover and sync with the rest of the set, being placed in recovery mode.

Now, not all *nodes* need to be the same. For example, sync sources might have different *oplog sizes*. However, if our *oplog size* is larger and able to accommodate more changes in the system, we can afford our *nodes* to be down for longer and still be able to reconnect once they're being brought back up again. Therefore, the size of our *oplog.rs collection is an important aspect to keep in mind*.

To sum up, the *replication window* measured in hours will be proportional to the *load of your system*. You should keep an eye on that. The other good thing is that our *oplog.rs size* can be changed. And we have a fair amount of good documentation telling you how to do that as a administration task. Another aspect to know about this collection is that given the idempotent nature of the instructions, one single update may result in several different operations in this collection.

Let me show you how this works. I'm going to use this database here -- *M03*. I'm going to create a collection called *messages*. Once I create that, I can see that collection there created. Now if I jump into *my local database* and I look into our *oplog.rs*, excluding any periodic noop operations (Query the oplog, filtering out the heartbeats ("periodic noop") and only returning the latest entry) maintained by the server, I can find here the instruction that creates this collection in the *oplog*.

```javascript
m103-example:PRIMARY> use m103
switched to db m103
m103-example:PRIMARY> db.createCollection('messages')
{
    "ok" : 1,
    "operationTime" : Timestamp(1630650066, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630650066, 1),
      "signature" : {
        "hash" : BinData(0,"iFsF+p4uC7waoq55OjtgFCRZA/o="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
m103-example:PRIMARY> show collections
messages
m103-example:PRIMARY> use local
switched to db local
m103-example:PRIMARY> db.oplog.rs.find( { "o.msg": { $ne: "periodic noop" } } ).sort( { $natural: -1 } ).limit(1).pretty()
{
    "ts" : Timestamp(1630650310, 1),
    "t" : NumberLong(6),
    "h" : NumberLong("1325100494529941778"),
    "v" : 2,
    "op" : "u",
    "ns" : "config.system.sessions",
    "ui" : UUID("73255264-b3a5-4246-8dc1-aba181e3242d"),
    "o2" : {
      "_id" : {
        "id" : UUID("913c7fad-fa3a-44a0-846b-47d60ff86d4d"),
        "uid" : BinData(0,"om3K6e0e4eyhVYdfFiMHY8N8YziMIKZJnpi+fSEg//Q=")
      }
    },
    "wall" : ISODate("2021-09-03T06:25:10.167Z"),
    "o" : {
      "$v" : 1,
      "$set" : {
        "lastUse" : ISODate("2021-09-03T06:25:10.170Z")
      }
    }
}
```

Cool, this is really good. Now let's jump back to our *M103 collection*. And let's insert a few documents just for fun. There you go. We inserted *100 documents with the message, 'not yet'*. If I go ahead and *count* them up, I can see *100 documents* there -- great. If I jump back to my *local database* and look for those *messages*, I can see that I can find those *insert -- the operation there is an insert*. And the *object being inserted is one of the 100 documents inserted* -- great.

```javascript
m103-example:PRIMARY> for ( i=0; i< 100; i++) { db.messages.insert( { 'msg': 'not yet', _id: i } ) }
WriteResult({ "nInserted" : 1 })
m103-example:PRIMARY> db.messages.count()
100
m103-example:PRIMARY> db.oplog.rs.find({"ns": "m103.messages"}).sort({$natural: -1})
{ "ts" : Timestamp(1630651165, 22), "t" : NumberLong(6), "h" : NumberLong("6508079293193041593"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.205Z"), "o" : { "_id" : 99, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 21), "t" : NumberLong(6), "h" : NumberLong("2973945474308489380"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.205Z"), "o" : { "_id" : 98, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 20), "t" : NumberLong(6), "h" : NumberLong("-8221932705297272416"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.205Z"), "o" : { "_id" : 97, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 19), "t" : NumberLong(6), "h" : NumberLong("-5595774155362448800"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.193Z"), "o" : { "_id" : 96, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 18), "t" : NumberLong(6), "h" : NumberLong("3783694305258530864"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.172Z"), "o" : { "_id" : 95, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 17), "t" : NumberLong(6), "h" : NumberLong("6022248371005021610"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.172Z"), "o" : { "_id" : 94, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 16), "t" : NumberLong(6), "h" : NumberLong("-1164814900668139500"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.172Z"), "o" : { "_id" : 93, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 15), "t" : NumberLong(6), "h" : NumberLong("7023464676330311418"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.148Z"), "o" : { "_id" : 92, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 14), "t" : NumberLong(6), "h" : NumberLong("-7402120424984514579"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.148Z"), "o" : { "_id" : 91, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 13), "t" : NumberLong(6), "h" : NumberLong("8476639276962447637"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.133Z"), "o" : { "_id" : 90, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 12), "t" : NumberLong(6), "h" : NumberLong("4631706011983230875"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.133Z"), "o" : { "_id" : 89, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 11), "t" : NumberLong(6), "h" : NumberLong("-4555050392990166032"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.133Z"), "o" : { "_id" : 88, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 10), "t" : NumberLong(6), "h" : NumberLong("8792356470516605225"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.133Z"), "o" : { "_id" : 87, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 9), "t" : NumberLong(6), "h" : NumberLong("4915953572770435485"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.117Z"), "o" : { "_id" : 86, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 8), "t" : NumberLong(6), "h" : NumberLong("5401690467671356700"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.077Z"), "o" : { "_id" : 85, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 7), "t" : NumberLong(6), "h" : NumberLong("919894708143489714"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.053Z"), "o" : { "_id" : 84, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 6), "t" : NumberLong(6), "h" : NumberLong("4845480713877310196"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.040Z"), "o" : { "_id" : 83, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 5), "t" : NumberLong(6), "h" : NumberLong("8404444682584706680"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.040Z"), "o" : { "_id" : 82, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 4), "t" : NumberLong(6), "h" : NumberLong("-3734036438003271301"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.029Z"), "o" : { "_id" : 81, "msg" : "not yet" } }
{ "ts" : Timestamp(1630651165, 3), "t" : NumberLong(6), "h" : NumberLong("2475864841565525401"), "v" : 2, "op" : "i", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "wall" : ISODate("2021-09-03T06:39:25.029Z"), "o" : { "_id" : 80, "msg" : "not yet" } }
Type "it" for more
```

But now let's do a simple *updateMany* operation. Let's say that I want to make sure these *messages here have an author*. So I'm going to *set a new field called author with the value called, well, my own name -- Mukhtar*. Once I do this -- and keep in mind that this is one single operation, one *UpdateOne*, that modified and matched a *100 different documents*. If we jump back to *local*, and if we look for more operations, I can see that there is an *update operation, or several update operations -- op equals u means an update* -- for all the affected documents in this collection.

```javascript
m103-example:PRIMARY> use m103
switched to db m103
m103-example:PRIMARY> db.messages.updateMany( {}, { $set: { author: 'mukhtar' } } )
{ "acknowledged" : true, "matchedCount" : 100, "modifiedCount" : 100 }
m103-example:PRIMARY> use local
switched to db local
m103-example:PRIMARY> db.oplog.rs.find({"ns": "m103.messages"}).sort({$natural: -1})
{ "ts" : Timestamp(1630652137, 100), "t" : NumberLong(6), "h" : NumberLong("-8534103641536125094"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 99 }, "wall" : ISODate("2021-09-03T06:55:37.039Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 99), "t" : NumberLong(6), "h" : NumberLong("288900995957784935"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 98 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 98), "t" : NumberLong(6), "h" : NumberLong("3624722856287622280"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 97 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 97), "t" : NumberLong(6), "h" : NumberLong("3913651132485641192"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 96 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 96), "t" : NumberLong(6), "h" : NumberLong("1225747564355888828"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 95 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 95), "t" : NumberLong(6), "h" : NumberLong("1787482418599511463"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 94 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 94), "t" : NumberLong(6), "h" : NumberLong("6775874645454816157"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 93 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 93), "t" : NumberLong(6), "h" : NumberLong("-6883882204935609754"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 92 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 92), "t" : NumberLong(6), "h" : NumberLong("470471816365817158"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 91 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 91), "t" : NumberLong(6), "h" : NumberLong("1121285584689862102"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 90 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 90), "t" : NumberLong(6), "h" : NumberLong("-3038099509928694460"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 89 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 89), "t" : NumberLong(6), "h" : NumberLong("-5177685639751637833"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 88 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 88), "t" : NumberLong(6), "h" : NumberLong("1973326019216495466"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 87 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 87), "t" : NumberLong(6), "h" : NumberLong("-4672804929243938547"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 86 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 86), "t" : NumberLong(6), "h" : NumberLong("393821079842678359"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 85 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 85), "t" : NumberLong(6), "h" : NumberLong("-8307356263748828023"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 84 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 84), "t" : NumberLong(6), "h" : NumberLong("4054984903873593972"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 83 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 83), "t" : NumberLong(6), "h" : NumberLong("8411188256638889527"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 82 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 82), "t" : NumberLong(6), "h" : NumberLong("3411208979155169700"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 81 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
{ "ts" : Timestamp(1630652137, 81), "t" : NumberLong(6), "h" : NumberLong("-3072546549805371544"), "v" : 2, "op" : "u", "ns" : "m103.messages", "ui" : UUID("b4106b49-4833-487e-8514-bdf8e68abba3"), "o2" : { "_id" : 80 }, "wall" : ISODate("2021-09-03T06:55:37.022Z"), "o" : { "$v" : 1, "$set" : { "author" : "mukhtar" } } }
Type "it" for more
```

So one single instruction -- *an updateMany* -- into our primary, produced *100 different operations into our oplog*. Now this is the magic of *idempotence*. Be aware of this. Sometimes is easy to dismiss the fact that *idempotency* might generate a lot more operations in our *oplog* than the number of commands actually issued from the client. One last point that I want to bring to your attention is that, please don't change any of this information present on any of this collection.

Contrary to what MC Hammer used to say, you can, in fact, touch this, given the correct set of permissions. But please don't. This might affect tremendously badly the way that your *replica* works. So try not to mess around too much with this collection. That said, and to prove you that you can do some damage, let's try to write to this local database. I'm going to go ahead and in my *local collection, insert a message saying that you cannot touch this*.

And if we look for it in our *oplog.rs*, we will not find it. You should keep in mind that this data that I've just written into this particular database -- there it is, *my local collection* -- is written into the local database. That means it's local to this particular instance. Any data written in this *collection will not be replicated*.

*Local database* is like Vegas. What happens in local, stays in local. No other *node* in the *set* will ever see that data, except obviously for the *oplog.rs*, which they are reading and applying it on their own. Anything else that you might want to keep *local*, you can write here. But we do not recommend you to do any of that unless you really know what you're doing.Let's quickly sum up what we just learned.

*Local database* holds very important information and should not be messed up with. Changing the data in your *oplog or any of the configuration collections* will impact the settings in the *replication mechanism*. The *oplog.rs* is central to our *replication mechanism*. Everything that needs to be *replicated will be stored and logged in the oplog in an idempotent way*.

The size of our *oplog will impact the replication window* and should be closely monitored. Any data written to *local database* that is not written to *oplog.rs or changing any of the system configuration collections will stay there and will not be replicated*.

### Reconfiguring a Running Replica Set

All right, so until this point, we've covered *basic replication concepts* and how to deploy a *replica set*. But in this lesson, we're going to cover how to *reconfigure a replica set* while it's still running. So let's say our *replica set* containing our data is up and running with a *primary and two secondary nodes*. Our supervisor tells us he wants to add *two more nodes, one secondary and one arbiter*.

This is going to be the *typology of our replica set* once we've added our *two nodes*. And our supervisor wanted to add a *secondary and an arbiter instead of just two secondaries*, because an *arbiter* is a much cheaper *node* to maintain. It doesn't need to *copy or replicate* all of the data from the *primary*, but it still provides us with an odd number of *voting numbers in the set*.

So here I'm connected to our *replica set*, and I'm just going to *rs.isMaster()* to see that *typology* really quickly. And we can see that our *replica set* currently has *three nodes* in it. So here I'm just going to launch a *mongod* using a *configuration file for our fourth node*. And the *config files for the arbiter and the secondary* are going to be very similar to the ones for our other *nodes*.

```javascript
m103-example:PRIMARY> use admin
switched to db admin
m103-example:PRIMARY> rs.isMaster()
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012",
      "localhost:27013"
    ],
    "setName" : "m103-example",
    "setVersion" : 3,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:27011",
    "me" : "localhost:27011",
    "electionId" : ObjectId("7fffffff0000000000000007"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630662489, 1),
        "t" : NumberLong(7)
      },
      "lastWriteDate" : ISODate("2021-09-03T09:48:09Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630662489, 1),
        "t" : NumberLong(7)
      },
      "majorityWriteDate" : ISODate("2021-09-03T09:48:09Z")
    },
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-03T09:48:18.270Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1630662489, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630662489, 1),
      "signature" : {
        "hash" : BinData(0,"7jmiyh+G7RG07pneg76UUAlgwQQ="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

So I'm not going to go over them here, but you can find them attached to the lecture as handouts. So once we've started our *node4*, we can start our *arbiter*. And we now have the two *nodes* we need. And we just have to *add them to the set*. So here we're just adding the *fourth node to our set*. So here when we add our *arbiter, we use a special command called addArb*.

```javascript
// Copying file in vim editor
cp node3.conf node4.conf
// Open and edit file in the vim editor
vim node4.conf
// Make directory in the dbpath parent folder
sudo mkdir -p /var/mongodb/db/node4
// Start new node
sudo mongod -f node4.conf
// Add new node to repSet
m103-example:PRIMARY> rs.add("localhost:27014")
{
    "ok" : 1,
    "operationTime" : Timestamp(1630726564, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630726564, 1),
      "signature" : {
        "hash" : BinData(0,"ZLS/KeqE+Zn8Bm+L9QTJd3nPpBg="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
m103-example:PRIMARY> 2021-09-04T03:36:26.215+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] changing hosts to m103-example/localhost:27011,localhost:27012,localhost:27013,localhost:27014 from m103-example/localhost:27011,localhost:27012,localhost:27013
2021-09-04T03:36:26.221+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27014 (1 connections now open to localhost:27014 with a 5 second timeout)

m103-example:PRIMARY> rs.addArb("localhost:28000")
{
    "ok" : 1,
    "operationTime" : Timestamp(1630728600, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630728600, 1),
      "signature" : {
        "hash" : BinData(0,"jrYMAU0IAeTe8Dh7IV653wu6RTo="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

And it looks like this completed. And I'm just going to check *rs.isMaster* to make sure of that. And we can see that our *replica set now has four nodes in it and one arbiter*. So now our *replica set is running with one primary, three secondaries, and an arbiter node*. But our head of engineering just told us we have to kill the *arbiter node* because we don't have the budget for it.

```javascript
// Checking replica set makeup after adding two new nodes:
m103-example:PRIMARY> rs.isMaster()
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012",
      "localhost:27013",
      "localhost:27014"
    ],
    "arbiters" : [
      "localhost:28000"
    ],
    "setName" : "m103-example",
    "setVersion" : 5,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:27011",
    "me" : "localhost:27011",
    "electionId" : ObjectId("7fffffff0000000000000007"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630728697, 1),
        "t" : NumberLong(7)
      },
      "lastWriteDate" : ISODate("2021-09-04T04:11:37Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630728697, 1),
        "t" : NumberLong(7)
      },
      "majorityWriteDate" : ISODate("2021-09-04T04:11:37Z")
    },
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-04T04:11:42.335Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1630728697, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630728697, 1),
      "signature" : {
        "hash" : BinData(0,"PtA9Ljjg1IzjNLRsL8S3LujhoRw="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

So here to the *remove command*, we just pass the *port where our arbiter was running*. And we've successfully removed it. However, right now our *replica set only has four members*. We can verify that from *rs.isMaster()*.

```javascript
// Removing the arbiter from our replica set:
m103-example:PRIMARY> rs.remove("localhost:28000")
{
    "ok" : 1,
    "operationTime" : Timestamp(1630731750, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630731750, 1),
      "signature" : {
        "hash" : BinData(0,"O3HSbEViqCnDarm5zdMh6kcNbEo="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}

m103-example:PRIMARY> rs.isMaster()
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012",
      "localhost:27013",
      "localhost:27014"
    ],
    "setName" : "m103-example",
    "setVersion" : 6,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:27011",
    "me" : "localhost:27011",
    "electionId" : ObjectId("7fffffff0000000000000007"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630731987, 1),
        "t" : NumberLong(7)
      },
      "lastWriteDate" : ISODate("2021-09-04T05:06:27Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630731987, 1),
        "t" : NumberLong(7)
      },
      "majorityWriteDate" : ISODate("2021-09-04T05:06:27Z")
    },
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-04T05:06:35.299Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1630731987, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630731987, 1),
      "signature" : {
        "hash" : BinData(0,"hUhRFk2MF91WIZRoJsaUSRnJTK0="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

Our list of *hosts only has four nodes* in it. So in order to remedy this problem of having an *even number of voting members in the set*, we don't have to *remove one of our secondary entirely*. We just have to *revoke its voting privileges so that will leave us with three voting members*. Our head of engineering has also been talking about using *a hidden node to store backups*.

So we decide to be a little clever. In addition to being *non-voting, this secondary is also going to be a hidden node*. So we can actually *reconfigure this node to be hidden and non-voting without removing it or restarting the node*. We use our *rs.conf() to retrieve a replica set configuration*.

```javascript
m103-example:PRIMARY> rs.conf()
{
    "_id" : "m103-example",
    "version" : 6,
    "protocolVersion" : NumberLong(1),
    "members" : [
      {
        "_id" : 0,
        "host" : "localhost:27011",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 1,
        "host" : "localhost:27012",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 2,
        "host" : "localhost:27013",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 3,
        "host" : "localhost:27014",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      }
    ],
    "settings" : {
      "chainingAllowed" : true,
      "heartbeatIntervalMillis" : 2000,
      "heartbeatTimeoutSecs" : 10,
      "electionTimeoutMillis" : 10000,
      "catchUpTimeoutMillis" : -1,
      "catchUpTakeoverDelayMillis" : 30000,
      "getLastErrorModes" : {
        
      },
      "getLastErrorDefaults" : {
        "w" : 1,
        "wtimeout" : 0
      },
      "replicaSetId" : ObjectId("612a351f26dce4d03639158f")
    }
}
```

So this gives us a complete configuration of the *replica set*, including the *host name and port of each node, as well as if the node is hidden or an arbiter*. It also gives us the *number of votes that each node has*. So here I'm just storing the configuration for the set in a variable called *cfg*. So members here is a section of the config that has a list of the nodes in the set.

And I've chosen the *node at index position 3* in that list. And I've changed the *number of votes it has to 0*. This is going to leave us with *an odd number of voting members in the set*. And here I'm setting the *hidden variable of that node to true* to hide this note from any client applications. And *hidden nodes can never become primary, so in order to make this a hidden node, we have to set the priority to 0*.

```javascript
// Assigning the current configuration to a shell variable we can edit, in order to reconfigure the replica set:
m103-example:PRIMARY> cfg = rs.conf()
// Editing our new variable cfg to change topology - specifically, by modifying cfg.members:
m103-example:PRIMARY> cfg.members[3].votes = 0
0
m103-example:PRIMARY> cfg.members[3].hidden = true
true
m103-example:PRIMARY> cfg.members[3].priority = 0
0
```

So this is a new command, *rs.reconfig()*, that we use to *reconfigure a running replica set*. We pass in our *updated configuration as an argument*, and we need to specify this whole document. That's why we took a copy of the *original configuration* and then modified it as we needed. Bear in mind that *reconfig might trigger an election depending on what's in the new configuration*. And it looked like this worked.

```javascript
// Updating our replica set to use the new configuration cfg:
m103-example:PRIMARY> rs.reconfig(cfg)
{
    "ok" : 1,
    "operationTime" : Timestamp(1630733973, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630733973, 1),
      "signature" : {
        "hash" : BinData(0,"bRLMth+B6skv6tTRSb4ZJozaP8s="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
m103-example:PRIMARY> 2021-09-04T05:39:46.499+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] changing hosts to m103-example/localhost:27011,localhost:27012,localhost:27013 from m103-example/localhost:27011,localhost:27012,localhost:27013,localhost:27014
```

I'm just going to verify that it worked with the *rs.conf() to get the current configuration of the replica set*. And it looks like this *node now has priority 0, it can't vote, and it's hidden*. So now our *replica set still has four nodes* in it, which is *an even number, but only an odd number of them can vote*.

```javascript
m103-example:PRIMARY> rs.conf()
{
    "_id" : "m103-example",
    "version" : 7,
    "protocolVersion" : NumberLong(1),
    "members" : [
      {
        "_id" : 0,
        "host" : "localhost:27011",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 1,
        "host" : "localhost:27012",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 2,
        "host" : "localhost:27013",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 3,
        "host" : "localhost:27014",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : true,
        "priority" : 0,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 0
      }
    ],
    "settings" : {
      "chainingAllowed" : true,
      "heartbeatIntervalMillis" : 2000,
      "heartbeatTimeoutSecs" : 10,
      "electionTimeoutMillis" : 10000,
      "catchUpTimeoutMillis" : -1,
      "catchUpTakeoverDelayMillis" : 30000,
      "getLastErrorModes" : {
        
      },
      "getLastErrorDefaults" : {
        "w" : 1,
        "wtimeout" : 0
      },
      "replicaSetId" : ObjectId("612a351f26dce4d03639158f")
    }
}

```

So just to recap, in this lesson we covered how to *add arbiters and new secondaries*, we said a little bit about *hidden nodes, and we added one to our set*. And we also covered how to *reconfigure a replica set while it's still running*.

### Lab: Reconfigure a Replica Set

#### Problem 2

A *4-node replica set* has already been launched. You can find the configuration files used to start each server in the IDE.

Reconfigure the replica set to make one node more suitable for analytics queries:

1 Connect to the *replica set m103-repl* and retrieve the configuration of the *node localhost:27004*. This is the node you will reconfigure.

Remember to authenticate as *m103-admin with password m103-pass*.

2 Store this configuration in a variable and use this variable to update the following fields in the configuration document for *localhost:27004:*

* the number of *votes* should be *0*

* the *hidden* field should be *true*

* the *priority* should be *0*

**You should not need to update the configuration files or restart mongod.**

3 Reconfigure the replica set using your new configuration document.

4 Once you've run the proper commands, click "Run Tests" to run a suite of tests that will check the configuration of *m103-repl*. The results of these tests will let you know which steps you've yet to complete.

#### Answer 2

```javascript
user@M103# mongo --host "m103-repl/localhost:27001" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v4.0.5
connecting to: mongodb://localhost:27001/?authSource=admin&gssapiServiceName=mongodb&replicaSet=m103-repl
2021-09-04T07:10:45.379+0000 I NETWORK  [js] Starting new replica set monitor for m103-repl/localhost:27001
2021-09-04T07:10:45.402+0000 I NETWORK  [js] Successfully connected to localhost:27001 (1 connections now open to localhost:27001 with a 5 second timeout)
2021-09-04T07:10:45.402+0000 I NETWORK  [js] changing hosts to m103-repl/localhost:27001,localhost:27002,localhost:27003,localhost:27004 from m103-repl/localhost:27001
2021-09-04T07:10:45.403+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor] Successfully connected to localhost:27002 (1 connections now open to localhost:27002 with a 5 second timeout)
2021-09-04T07:10:45.423+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor] Successfully connected to localhost:27004 (1 connections now open to localhost:27004 with a 5 second timeout)
Implicit session: session { "id" : UUID("97b16081-b5cc-408b-a00a-6f724124babc") }
MongoDB server version: 4.0.5
2021-09-04T07:10:45.435+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor] Successfully connected to localhost:27003 (1 connections now open to localhost:27003 with a 5 second timeout)
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        http://docs.mongodb.org/
Questions? Try the support group
        http://groups.google.com/group/mongodb-user
Server has startup warnings: 
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] 
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server. 
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] **          Start the server with --bind_ip <address> to specify which IP 
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.
2021-09-04T07:06:03.610+0000 I CONTROL  [initandlisten] 
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

m103-repl:PRIMARY> rs.conf()
{
        "_id" : "m103-repl",
        "version" : 4,
        "protocolVersion" : NumberLong(1),
        "writeConcernMajorityJournalDefault" : true,
        "members" : [
                {
                        "_id" : 0,
                        "host" : "localhost:27001",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                },
                {
                        "_id" : 1,
                        "host" : "localhost:27002",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                },
                {
                        "_id" : 2,
                        "host" : "localhost:27003",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                },
                {
                        "_id" : 3,
                        "host" : "localhost:27004",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                }
        ],
        "settings" : {
                "chainingAllowed" : true,
                "heartbeatIntervalMillis" : 2000,
                "heartbeatTimeoutSecs" : 10,
                "electionTimeoutMillis" : 10000,
                "catchUpTimeoutMillis" : -1,
                "catchUpTakeoverDelayMillis" : 30000,
                "getLastErrorModes" : {

                },
                "getLastErrorDefaults" : {
                        "w" : 1,
                        "wtimeout" : 0
                },
                "replicaSetId" : ObjectId("61331adba9fd2cfa38e61c65")
        }
}

m103-repl:PRIMARY> cfg = rs.conf()
{
        "_id" : "m103-repl",
        "version" : 4,
        "protocolVersion" : NumberLong(1),
        "writeConcernMajorityJournalDefault" : true,
        "members" : [
                {
                        "_id" : 0,
                        "host" : "localhost:27001",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                },
                {
                        "_id" : 1,
                        "host" : "localhost:27002",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                },
                {
                        "_id" : 2,
                        "host" : "localhost:27003",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                },
                {
                        "_id" : 3,
                        "host" : "localhost:27004",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                }
        ],
        "settings" : {
                "chainingAllowed" : true,
                "heartbeatIntervalMillis" : 2000,
                "heartbeatTimeoutSecs" : 10,
                "electionTimeoutMillis" : 10000,
                "catchUpTimeoutMillis" : -1,
                "catchUpTakeoverDelayMillis" : 30000,
                "getLastErrorModes" : {

                },
                "getLastErrorDefaults" : {
                        "w" : 1,
                        "wtimeout" : 0
                },
                "replicaSetId" : ObjectId("61331adba9fd2cfa38e61c65")
        }
}

m103-repl:PRIMARY> cfg.members[3].votes = 0
0
m103-repl:PRIMARY> cfg.members[3].hidden = true
true
m103-repl:PRIMARY> cfg.members[3].priority = 0
0
m103-repl:PRIMARY> rs.reconfig(cfg)
{
        "ok" : 1,
        "operationTime" : Timestamp(1630740675, 1),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1630740675, 1),
                "signature" : {
                        "hash" : BinData(0,"Gbm/zIGoE+GMmCzlavi/YSnxU9k="),
                        "keyId" : NumberLong("7003971381981347841")
                }
        }
}
m103-repl:PRIMARY> 2021-09-04T07:31:16.451+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor] changing hosts to m103-repl/localhost:27001,localhost:27002,localhost:27003 from m103-repl/localhost:27001,localhost:27002,localhost:27003,localhost:27004
```

### Reads and Writes on a Replica Set

So in this lesson we're going to take a look at *reads and writes in a replica set* just to get a sense of how the *MongoDB replication mechanism works*. So I'm just going to use this command to connect to our *three node replica set called m103-example*. And to figure out which *node in this set is currently the primary*, I'm going to run this command *rs.isMaster()*.

```javascript
vagrant@vagrant:~$ mongo --host "m103-example/localhost:27011" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://localhost:27011/?authSource=admin&gssapiServiceName=mongodb&replicaSet=m103-example
2021-09-04T04:09:45.706+0000 I NETWORK  [thread1] Starting new replica set monitor for m103-example/localhost:27011
2021-09-04T04:09:45.710+0000 I NETWORK  [thread1] Successfully connected to localhost:27011 (1 connections now open to localhost:27011 with a 5 second timeout)
2021-09-04T04:09:45.712+0000 I NETWORK  [thread1] changing hosts to m103-example/localhost:27011,localhost:27012,localhost:27013,localhost:27014 from m103-example/localhost:27011
2021-09-04T04:09:45.716+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27012 (1 connections now open to localhost:27012 with a 5 second timeout)
2021-09-04T04:09:45.731+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27014 (1 connections now open to localhost:27014 with a 5 second timeout)
2021-09-04T04:09:45.734+0000 I NETWORK  [ReplicaSetMonitor-TaskExecutor-0] Successfully connected to localhost:27013 (1 connections now open to localhost:27013 with a 5 second timeout)
Implicit session: session { "id" : UUID("a01b24c3-744f-49ce-a5b4-71791ce13848") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] 
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] **      See http://dochub.mongodb.org/core/prodnotes-filesystem
m103-example:PRIMARY> rs.isMaster()
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012",
      "localhost:27013",
      "localhost:27014"
    ],
    "setName" : "m103-example",
    "setVersion" : 6,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:27011",
    "me" : "localhost:27011",
    "electionId" : ObjectId("7fffffff0000000000000007"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630731987, 1),
        "t" : NumberLong(7)
      },
      "lastWriteDate" : ISODate("2021-09-04T05:06:27Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630731987, 1),
        "t" : NumberLong(7)
      },
      "majorityWriteDate" : ISODate("2021-09-04T05:06:27Z")
    },
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-04T05:06:35.299Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1630731987, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630731987, 1),
      "signature" : {
        "hash" : BinData(0,"hUhRFk2MF91WIZRoJsaUSRnJTK0="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

And this output actually gives us a lot of information. It gives us the *current primary, which is the node running on port 27011*. And it also gives us the *node that we're currently connected to, me*. In this case, it's the same as the *primary, because we're connected to the replica set through the shell*. It also gives us the *other nodes in this replica set*.

So I'm just going to create a *new database here called newDB*. And *insert a new document into a new collection called new collection in newDB*. And I'm just going to connect to *a secondary to make sure they receive the write as well*. We can scroll up to the *rs.isMaster() output* to figure out which of *these nodes is a secondary*. And we know *one is the primary, so we just have to connect to one of the other two nodes*.

```javascript
// Inserting one document into a new collection:
m103-example:PRIMARY> use newDB
switched to db newDB
m103-example:PRIMARY> db.new_collection.insert( { "student": "Matt Javaly", "grade": "A+" } )
WriteResult({ "nInserted" : 1 })
```

So this is the command we're going to use to connect directly to *a secondary node in our replica set*. Notice that we've changed the *node port that we've selected in our host name to - localhost:27012*. And we also haven't specified the name of the *replica set*. Because if we were to specify the name of the *replica set, the shell would automatically direct us to the primary*. And in this case, we actually want to *connect directly to a secondary*.

```javascript
m103-example:PRIMARY> exit
bye
vagrant@vagrant:~$ mongo --host "localhost:27012" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://localhost:27012/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7372d24f-8da9-4e34-8da6-8de8e3ba80aa") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-03T06:05:34.368+0000 I STORAGE  [initandlisten] 
2021-09-03T06:05:34.368+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-03T06:05:34.368+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2021-09-03T06:05:37.325+0000 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-03T06:05:37.325+0000 I CONTROL  [initandlisten]

// Attempting to execute a read command on a secondary node (this should fail):
m103-example:SECONDARY> show dbs
2021-09-04T08:27:18.028+0000 E QUERY    [thread1] Error: listDatabases failed:{
    "operationTime" : Timestamp(1630744033, 1),
    "ok" : 0,
    "errmsg" : "not master and slaveOk=false",
    "code" : 13435,
    "codeName" : "NotMasterNoSlaveOk",
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630744033, 1),
      "signature" : {
        "hash" : BinData(0,"P96rX6zMAZMniJJ0MbKGx15+99g="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
} :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
Mongo.prototype.getDBs@src/mongo/shell/mongo.js:79:1
shellHelper.show@src/mongo/shell/utils.js:860:19
shellHelper@src/mongo/shell/utils.js:750:15
@(shellhelp2):1:1
```

And as we can see, the shell prompt is changed to reflect that we're now connected to *a secondary node*. So we can just start running *shell commands on the secondary note*, right? No, actually we can't. When we're *connected to a secondary node*, we can only run *read commands after telling MongoDB* that we're sure that's what we want to do. This is because *MongoDB errs on the side of consistency*.

Given that we want to make sure you always have a *consistent view of your data*, you need to explicitly say otherwise if you want to *read from the secondaries*. So this is the command we're going to *run in order to enable read operations on the secondary node*. And now, our *show DBs* command should actually work. And it does.

```javascript
// Enabling read commands on a secondary node:
m103-example:SECONDARY> rs.slaveOk()
WARNING: slaveOk() is deprecated and may be removed in the next major release. Please use secondaryOk() instead.
m103-example:SECONDARY> rs.secondaryOk()
m103-example:SECONDARY> show dbs
admin   0.000GB
config  0.000GB
local   0.001GB
m103    0.000GB
newDB   0.000GB
```

And we can see that the *write command was replicated to the secondary node*. So here I've tried to *insert a document into a secondary node*. And as expected, we can only enable *reads on this secondary*. We'll never be able to *write to a secondary node*. The purpose of this is to enforce *strong consistency on our cluster*. The *Mongo shell* lets us know that we can't *write to the secondary*.

```javascript
// Reading from a secondary node:
m103-example:SECONDARY> use newDB
switched to db newDB
m103-example:SECONDARY> db.new_collection.find()
{ "_id" : ObjectId("613328cd221f266dbf769257"), "student" : "Matt Javaly", "grade" : "A+" }

// Attempting to write data directly to a secondary node (this should fail, because we cannot write data directly to a secondary node):
m103-example:SECONDARY> db.new_collection.insert( { "student": "Norberto Leite", "grade": "B+" } )
WriteResult({ "writeError" : { "code" : 10107, "errmsg" : "not master" } })
```

So far we've covered how *reads and writes work in a replica set* when it's healthy. In the interest of learning how *replica sets handle crisis*, we're going to break a few things. First, we're going to *shut this node off*. Now when we connect back to the *replica set, we run rs.status()* we can see that the *node we shut down is no longer reachable from the primary - "stateStr" : "(not reachable/healthy)"*.

```javascript
// Shutting down the server (on first secondary node)
m103-example:SECONDARY> use admin
switched to db admin
m103-example:PRIMARY> db.shutdownServer()
server should be down...
2021-09-04T13:37:38.096+0000 I NETWORK  [thread1] trying reconnect to localhost:27012 (127.0.0.1) failed
2021-09-04T13:37:38.757+0000 I NETWORK  [thread1] Socket recv() Connection reset by peer 127.0.0.1:27012
2021-09-04T13:37:38.758+0000 I NETWORK  [thread1] SocketException: remote: (NONE):0 error: SocketException socket exception [RECV_ERROR] server [127.0.0.1:27012] 
2021-09-04T13:37:38.759+0000 I NETWORK  [thread1] reconnect localhost:27012 (127.0.0.1) failed failed 
2021-09-04T13:37:38.763+0000 I NETWORK  [thread1] trying reconnect to localhost:27012 (127.0.0.1) failed
2021-09-04T13:37:38.764+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27012, in(checking socket for error after poll), reason: Connection refused
2021-09-04T13:37:38.765+0000 I NETWORK  [thread1] reconnect localhost:27012 (127.0.0.1) failed failed 
> exit
bye
2021-09-04T13:39:13.520+0000 I NETWORK  [thread1] trying reconnect to localhost:27012 (127.0.0.1) failed
2021-09-04T13:39:13.521+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27012, in(checking socket for error after poll), reason: Connection refused
2021-09-04T13:39:13.522+0000 I NETWORK  [thread1] reconnect localhost:27012 (127.0.0.1) failed failed 
2021-09-04T13:39:13.524+0000 I QUERY    [thread1] Failed to end session { id: UUID("7372d24f-8da9-4e34-8da6-8de8e3ba80aa") } due to SocketException: socket exception [CONNECT_ERROR] for couldn't connect to server localhost:27012, connection attempt failed

// Connecting directly to the healthy primary node in our set:
vagrant@vagrant:~$ mongo --host "localhost:27011" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://localhost:27011/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("bcab1a12-2254-42fa-9605-e2945c910928") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] 
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem

// The node we shut down is no longer reachable from the primary:
m103-example:PRIMARY> rs.status()
{
    "set" : "m103-example",
    "date" : ISODate("2021-09-04T13:49:33.021Z"),
    "myState" : 1,
    "term" : NumberLong(9),
    "syncingTo" : "",
    "syncSourceHost" : "",
    "syncSourceId" : -1,
    "heartbeatIntervalMillis" : NumberLong(2000),
    "optimes" : {
      "lastCommittedOpTime" : {
        "ts" : Timestamp(1630763369, 1),
        "t" : NumberLong(9)
      },
      "readConcernMajorityOpTime" : {
        "ts" : Timestamp(1630763369, 1),
        "t" : NumberLong(9)
      },
      "appliedOpTime" : {
        "ts" : Timestamp(1630763369, 1),
        "t" : NumberLong(9)
      },
      "durableOpTime" : {
        "ts" : Timestamp(1630763369, 1),
        "t" : NumberLong(9)
      }
    },
    "members" : [
      {
        "_id" : 0,
        "name" : "localhost:27011",
        "health" : 1,
        "state" : 1,
        "stateStr" : "PRIMARY",
        "uptime" : 114267,
        "optime" : {
          "ts" : Timestamp(1630763369, 1),
          "t" : NumberLong(9)
        },
        "optimeDate" : ISODate("2021-09-04T13:49:29Z"),
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "infoMessage" : "",
        "electionTime" : Timestamp(1630762658, 1),
        "electionDate" : ISODate("2021-09-04T13:37:38Z"),
        "configVersion" : 7,
        "self" : true,
        "lastHeartbeatMessage" : ""
      },
      {
        "_id" : 1,
        "name" : "localhost:27012",
        "health" : 0,
        "state" : 8,
        "stateStr" : "(not reachable/healthy)",
        "uptime" : 0,
        "optime" : {
          "ts" : Timestamp(0, 0),
          "t" : NumberLong(-1)
        },
        "optimeDurable" : {
          "ts" : Timestamp(0, 0),
          "t" : NumberLong(-1)
        },
        "optimeDate" : ISODate("1970-01-01T00:00:00Z"),
        "optimeDurableDate" : ISODate("1970-01-01T00:00:00Z"),
        "lastHeartbeat" : ISODate("2021-09-04T13:49:32.930Z"),
        "lastHeartbeatRecv" : ISODate("2021-09-04T13:37:38.251Z"),
        "pingMs" : NumberLong(0),
        "lastHeartbeatMessage" : "Connection refused",
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "infoMessage" : "",
        "configVersion" : -1
      },
      {
        "_id" : 2,
        "name" : "localhost:27013",
        "health" : 1,
        "state" : 2,
        "stateStr" : "SECONDARY",
        "uptime" : 105225,
        "optime" : {
          "ts" : Timestamp(1630763369, 1),
          "t" : NumberLong(9)
        },
        "optimeDurable" : {
          "ts" : Timestamp(1630763369, 1),
          "t" : NumberLong(9)
        },
        "optimeDate" : ISODate("2021-09-04T13:49:29Z"),
        "optimeDurableDate" : ISODate("2021-09-04T13:49:29Z"),
        "lastHeartbeat" : ISODate("2021-09-04T13:49:32.930Z"),
        "lastHeartbeatRecv" : ISODate("2021-09-04T13:49:31.160Z"),
        "pingMs" : NumberLong(0),
        "lastHeartbeatMessage" : "",
        "syncingTo" : "localhost:27011",
        "syncSourceHost" : "localhost:27011",
        "syncSourceId" : 0,
        "infoMessage" : "",
        "configVersion" : 7
      },
      {
        "_id" : 3,
        "name" : "localhost:27014",
        "health" : 1,
        "state" : 2,
        "stateStr" : "SECONDARY",
        "uptime" : 10292,
        "optime" : {
          "ts" : Timestamp(1630763369, 1),
          "t" : NumberLong(9)
        },
        "optimeDurable" : {
          "ts" : Timestamp(1630763369, 1),
          "t" : NumberLong(9)
        },
        "optimeDate" : ISODate("2021-09-04T13:49:29Z"),
        "optimeDurableDate" : ISODate("2021-09-04T13:49:29Z"),
        "lastHeartbeat" : ISODate("2021-09-04T13:49:32.936Z"),
        "lastHeartbeatRecv" : ISODate("2021-09-04T13:49:31.259Z"),
        "pingMs" : NumberLong(0),
        "lastHeartbeatMessage" : "",
        "syncingTo" : "localhost:27013",
        "syncSourceHost" : "localhost:27013",
        "syncSourceId" : 2,
        "infoMessage" : "",
        "configVersion" : 7
      }
    ],
    "ok" : 1,
    "operationTime" : Timestamp(1630763369, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630763369, 1),
      "signature" : {
        "hash" : BinData(0,"YbMSAveyzB48hE//RDKds/b+i1E="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}

```

Now I'm just going to *shut down node three*. So now that we've *shut off two of the nodes in our replica set, there's only one left. And one out of three does not form a majority*. So we actually won't be able to *connect to the primary, because the current primary, which was running on this node, has stepped down to become a secondary*. So here I haven't specified the name of the *replica set, because I want to connect directly to the last node. And as we can see, that node has stepped down to be the secondary*.

```javascript
// Shutting down the server (on second secondary node)
m103-example:PRIMARY> exit
bye
vagrant@vagrant:~$ mongo --host "localhost:27013" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://localhost:27013/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("ca14a0ec-9deb-407f-ba37-01a37e4e048a") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-03T06:05:53.056+0000 I STORAGE  [initandlisten] 
2021-09-03T06:05:53.056+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-03T06:05:53.056+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2021-09-03T06:05:55.741+0000 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-03T06:05:55.741+0000 I CONTROL  [initandlisten] 
m103-example:SECONDARY> db.shutdownServer()
shutdown command only works with the admin database; try 'use admin'
m103-example:SECONDARY> use admin
switched to db admin
m103-example:SECONDARY> db.shutdownServer()
server should be down...
2021-09-04T14:19:24.205+0000 I NETWORK  [thread1] trying reconnect to localhost:27013 (127.0.0.1) failed
2021-09-04T14:19:24.212+0000 I NETWORK  [thread1] Socket say send() Connection reset by peer 127.0.0.1:27013
2021-09-04T14:19:24.214+0000 I NETWORK  [thread1] reconnect localhost:27013 (127.0.0.1) failed failed 
2021-09-04T14:19:24.218+0000 I NETWORK  [thread1] trying reconnect to localhost:27013 (127.0.0.1) failed
2021-09-04T14:19:24.219+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27013, in(checking socket for error after poll), reason: Connection refused
2021-09-04T14:19:24.220+0000 I NETWORK  [thread1] reconnect localhost:27013 (127.0.0.1) failed failed 
> exit
bye
2021-09-04T14:20:56.984+0000 I NETWORK  [thread1] trying reconnect to localhost:27013 (127.0.0.1) failed
2021-09-04T14:20:56.986+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27013, in(checking socket for error after poll), reason: Connection refused
2021-09-04T14:20:56.987+0000 I NETWORK  [thread1] reconnect localhost:27013 (127.0.0.1) failed failed 
2021-09-04T14:20:56.988+0000 I QUERY    [thread1] Failed to end session { id: UUID("ca14a0ec-9deb-407f-ba37-01a37e4e048a") } due to SocketException: socket exception [CONNECT_ERROR] for couldn't connect to server localhost:27013, connection attempt failed

// Connecting directly to the last healthy node in our set:
vagrant@vagrant:~$ mongo --host "localhost:27011" -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://localhost:27011/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7b6c78eb-9078-4d3b-9552-aa499f4033fb") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] 
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-03T06:05:06.850+0000 I STORAGE  [initandlisten] **     See http://dochub.mongodb.org/core/prodnotes-filesystem
m103-example:SECONDARY>
```

We can verify that by running *rs.isMaster()*. So as we can see, we're still *connected the same node as before*. But that *node is now a secondary node*. Even though the *primary node never went down, we lost the last secondary that gave us a majority*. If the *replica set can no longer reach a majority of the nodes, all the remaining nodes in the set become secondaries*.

```javascript
m103-example:SECONDARY> rs.isMaster()
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012",
      "localhost:27013"
    ],
    "setName" : "m103-example",
    "setVersion" : 7,
    "ismaster" : false,
    "secondary" : true,
    "me" : "localhost:27011",
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630765179, 1),
        "t" : NumberLong(9)
      },
      "lastWriteDate" : ISODate("2021-09-04T14:19:39Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630765159, 1),
        "t" : NumberLong(9)
      },
      "majorityWriteDate" : ISODate("2021-09-04T14:19:19Z")
    },
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-04T14:26:25.103Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1630765179, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630765179, 1),
      "signature" : {
        "hash" : BinData(0,"Qmal4/2wpjJdn9ppQEzlqN+Mje0="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

And because they're *secondaries, we can't write anything to the replica set, because there is no primary*. This is just another *fail safe mechanism used by the MongoDB replica set to ensure data consistency*. So just to recap. In this lesson, we covered *data being replicated to a secondary, how reading from secondary nodes works, and how writing to a replica set when a majority isn't available* -- which is to say, we can't.

### Failover and Elections

In this lesson, we're going to discuss how *failovers and elections work in MongoDB*. The *primary node* is the first point of contact for any *client communicating to the database*. Even if *secondaries go down, the client will continue communicating with the node acting as primary until the primary is unavailable*. But what would cause a *primary to become unavailable*? A common reason is *maintenance*.

So let's say we're doing a *rolling upgrade on a three-node replica set*. A *rolling upgrade* just means we're upgrading one server at a time, *starting with the secondaries*. And eventually, we'll *upgrade the primary*. *Rolling upgrades* are great because they allow us to perform *updates while maximizing availability to any clients using the database*.

We'll start by *stopping the MongoDB process on a secondary*, and then bringing it back up with the *new database version*. And we can do the same thing to *upgrade our other secondary*. When all of our *secondaries have been upgraded, it's time to upgrade the primary*. But *restarting the database server on the primary would trigger an election anyway*, so we're going to *safely initiate an election with rs.stepDown()*.

Once the *election is complete, the last database server running the old database version will be a secondary node*. So we can bring it *down, and then bring it back up with the new database server* without affecting the *availability of the whole replica set*. Let's talk a little bit about how *elections work*.

Elections take place whenever there's a *change in topology. Reconfiguring a replica set will always trigger an election that may or may not elect a new primary*. But you will definitely see a *new primary elected in two cases -- anytime the current primary node becomes unavailable, or when the current primary node steps down to be a secondary*.

The method to figure out which *secondary will run for election begins with priority*, which we'll discuss in a minute; and whichever *node has the latest copy of the data*. So let's say every *node in our set has the same priority, which is the default unless we've been setting priorities for the nodes in our set*. And *one of the secondary nodes has the latest copy of the data*. So it's going to run for *election, and then automatically vote for itself*.

Then it's going to ask the other *two nodes for their support in the election*. And they're going to say, all right, you have a pretty *recent copy of the data*, you seem like a good candidate, then they'll pledge their support as well. The *secondary node will be elected primary*. There is also the very slim possibility that *two nodes run for election simultaneously*.

But in a *replica set with an odd number of nodes*, this doesn't matter. The *two secondary nodes are both going to run, which means they're both going to vote for themselves*. And then the *former primaty node* is going to essentially decide which one of these *nodes becomes primary by virtue of a tie-breaker*.

This becomes a problem when we have an *even number of voting members in a set*. If *two secondaries are running for election simultaneously* and there are an *even number of remaining nodes in the set*, there's a possibility that they *split the vote and there's a tie*. Now a *tie* is not the end of the world, because the *nodes* will just start over and hold another *election*.

The problem with *repeating elections over and over is that any applications accessing the data will have to pause all activity and wait until a primary is elected*. An *even number of nodes increases the chances an election has to be repeated*, so we generally try to keep an *odd number in our replica sets*. Another important aspect of *elections is the priority assigned to each node in a set*.

*Priority* is essentially the likelihood that a *node will become the primary during an election. The default primary for a node is 1, and any node with priority 1 or higher can be elected primary*. We can *increase the priority of a node if we want it to be more likely at this node becomes primary*. But changing this value alone does not guarantee that. We can also set the *priority of node to be 0 if we never want that node to become primary*.

A *priority 0 node can still vote in elections, but it can't run for election*. Let's take a look at how to *change the priority of a node*. So here I'm just *storing a configuration document in a variable*. So here I'm just *setting the priority of one of our secondaries to 0* so it can never become the *primary node*. And here, I'm just *saving the new configuration in a replica set*.

```javascript
// Storing replica set configuration as a variable cfg:
m103-example:PRIMARY> cfg = rs.conf()
{
    "_id" : "m103-example",
    "version" : 7,
    "protocolVersion" : NumberLong(1),
    "members" : [
      {
        "_id" : 0,
        "host" : "localhost:27011",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 1,
        "host" : "localhost:27012",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 2,
        "host" : "localhost:27013",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : false,
        "priority" : 1,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 1
      },
      {
        "_id" : 3,
        "host" : "localhost:27014",
        "arbiterOnly" : false,
        "buildIndexes" : true,
        "hidden" : true,
        "priority" : 0,
        "tags" : {
          
        },
        "slaveDelay" : NumberLong(0),
        "votes" : 0
      }
    ],
    "settings" : {
      "chainingAllowed" : true,
      "heartbeatIntervalMillis" : 2000,
      "heartbeatTimeoutSecs" : 10,
      "electionTimeoutMillis" : 10000,
      "catchUpTimeoutMillis" : -1,
      "catchUpTakeoverDelayMillis" : 30000,
      "getLastErrorModes" : {
        
      },
      "getLastErrorDefaults" : {
        "w" : 1,
        "wtimeout" : 0
      },
      "replicaSetId" : ObjectId("612a351f26dce4d03639158f")
    }
}

//Setting the priority of a node to 0, so it cannot become primary (making the node "passive"):
m103-example:PRIMARY> cfg.members[2].priority = 0
0

// Updating our replica set to use the new configuration cfg:
m103-example:PRIMARY> rs.reconfig(cfg)
{
    "ok" : 1,
    "operationTime" : Timestamp(1630830151, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630830151, 1),
      "signature" : {
        "hash" : BinData(0,"z9yzl00pifXC5QX+CPMlejReJ3s="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

So now we've *reconfigured our replica set, I'm going to run rs.isMaster() through the new topology*. So in *MongoDB, nodes that aren't eligible to become the primary are defined as **passive** nodes*. And we can see the *node that we reconfigured to have priority 0 has appeared in our list of passives*. The other *two nodes are still eligible to become the primary*.

```javascript
// Checking the new topology of our set:
m103-example:PRIMARY> rs.isMaster()
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012"
    ],
    "passives" : [
      "localhost:27013"
    ],
    "setName" : "m103-example",
    "setVersion" : 8,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:27011",
    "me" : "localhost:27011",
    "electionId" : ObjectId("7fffffff000000000000000a"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630830245, 1),
        "t" : NumberLong(10)
      },
      "lastWriteDate" : ISODate("2021-09-05T08:24:05Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630830245, 1),
        "t" : NumberLong(10)
      },
      "majorityWriteDate" : ISODate("2021-09-05T08:24:05Z")
    },
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-05T08:24:14.124Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1630830245, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630830245, 1),
      "signature" : {
        "hash" : BinData(0,"VCK1URv9Gnt4QYgiwsrd0Lp4F3g="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

Something I want to point out here. When we call *rs.stepDown()*, it always tries to choose a *new primary node*. But in this case, other than the *current primary, there's only one node that's eligible to become the primary*. Which means that if we were to *call an election* right now, this *node - ("localhost:27012") would have to become the primary node*. So incidentally, by changing *node priority, we've rigged the election in favor of this node*.

So just to prove our theory, we'll call an *election on this replica set*. We just have to *wait for the election to complete*. All right, so it finished, and I'm just going to check what the *current primary* is. And we can see that we were right. This *node - ("localhost:27012") became the primary node* because it was the only *eligible primary in that election*. So one last thing to note. If the *current primary can't reach a majority of the other nodes in the set*, then it will automatically *step down to become a secondary*.

```javascript
// Forcing an election in this replica set (although in this case, we rigged the election so only one node could become primary):
m103-example:PRIMARY> rs.stepDown()
2021-09-05T09:32:55.158+0000 E QUERY    [thread1] Error: error doing query: failed: network error while attempting to run command 'replSetStepDown' on host 'localhost:27011'  :
DB.prototype.runCommand@src/mongo/shell/db.js:168:1
DB.prototype.adminCommand@src/mongo/shell/db.js:186:16
rs.stepDown@src/mongo/shell/utils.js:1413:12
@(shell):1:1
2021-09-05T09:32:55.162+0000 I NETWORK  [thread1] Marking host localhost:27011 as failed :: caused by :: Location40657: Last known master host cannot be reached
2021-09-05T09:32:55.163+0000 I NETWORK  [thread1] Socket closed remotely, no longer connected (idle 18 secs, remote host 127.0.0.1:27011)
2021-09-05T09:32:55.166+0000 I NETWORK  [thread1] Successfully connected to localhost:27011 (1 connections now open to localhost:27011 with a 5 second timeout)
2021-09-05T09:32:55.169+0000 W NETWORK  [thread1] Unable to reach primary for set m103-example
2021-09-05T09:32:55.672+0000 W NETWORK  [thread1] Unable to reach primary for set m103-example
2021-09-05T09:32:56.178+0000 W NETWORK  [thread1] Unable to reach primary for set m103-example

// Checking the topology of our set after the election:
m103-example:PRIMARY> rs.isMaster()
{
    "hosts" : [
      "localhost:27011",
      "localhost:27012"
    ],
    "passives" : [
      "localhost:27013"
    ],
    "setName" : "m103-example",
    "setVersion" : 8,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:27012",
    "me" : "localhost:27012",
    "electionId" : ObjectId("7fffffff000000000000000b"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1630834466, 1),
        "t" : NumberLong(11)
      },
      "lastWriteDate" : ISODate("2021-09-05T09:34:26Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1630834466, 1),
        "t" : NumberLong(11)
      },
      "majorityWriteDate" : ISODate("2021-09-05T09:34:26Z")
    },
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-05T09:34:36.041Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1630834466, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1630834466, 1),
      "signature" : {
        "hash" : BinData(0,"AerXo+qBHyVzA2AQ0rft7F3O+Yc="),
        "keyId" : NumberLong("7001466986551050241")
      }
    }
}
```

In a *three-node replica set, a majority is two nodes*. So if *two nodes go down, even if the primary is still available, it will step down*. At this point, an election cannot take place until *enough nodes* come back up to form a majority, and the clients will be able to connect to the whole set because there is no *primary*. So just to recap, we've covered *how availability is maintained during elections, the effective priority on elections, and the behavior of a replica set when a majority of the nodes aren't available*.

### Write Concerns: Part 1

*MongoDB write concern is an acknowledgment mechanism that developers can add to write operations*. Higher levels of acknowledgment produce a *stronger durability guarantee. Durability means that the write has propagated to the number of replica set member nodes specified in the write concern*. The more *replica set members that acknowledge the success of a write*, the more likely that the *write is durable in the event of a failure*.

*Majority here is defined as a simple majority of replica set members*. So *divide by two, and round up*. The *trade-off with increased durability is time*. More *durability requires more time* to achieve the *specified durability guarantee* since you have to wait for those acknowledgments. Let's go over the *available write concern levels*. A *write concern of zero* means that the application doesn't wait for any acknowledgments.

The *write might succeed or fail*. The *application doesn't really care*. It only checks that it can *connect to the node successfully*. Think of this like a *fire-and-forget strategy -- very fast, but with no safety checks in place*. The *default write concern is one*. That means the *application waits for an acknowledgment from a single member of the replica set, specifically, the primary. This is a baseline guarantee of success*.

*Write concerns greater than one increase the number of acknowledgments to include one or more secondary members*. Higher levels of *write concern correspond to a stronger guarantee of write durability*. For example, I can set a *write concern of three to require acknowledgment from all three replica set members. Majority is a keyword that translates to a majority of replica set members*. It's a *simple majority. So divide the number of members by two and round up*.

So this *three-member replica set has a majority of two. A five-member replica set would have a majority of three* -- so on and so forth. The nice thing with *majority is that you don't have to update your write concern if you increase the size of your replica set*. There's also a *write concern level for replica set tags*. That's a little advance for this course series, but you can check out our documentation on *write concern* for more information.

We're just talking about *replica sets* in this lesson. But *MongoDB supports write concern for both standalone and sharded clusters*. For *sharded clusters in particular, write concern is pushed down to the shard level*. Finally, I want to make it very clear that no matter what *write concern you specify, MongoDB always replicates data to every data-bearing node in the cluster. Write concern* is just there for you to have a way of tracking the *durability of inserted data*.

There are *two additional write concern options that MongoDB provides*. The first is *wtimeout. This lets you set a maximum amount of time the application waits before marking an operation as failed*. An important note here -- hitting a *wtimeout error* does not mean that the *write operation itself has failed. It only means that the application did not get the level of durability that it requested*. The second is *j, or journal. This option requires that each replica set member to receive the write and commit to the journal filed for the write to be considered acknowledged*.

Starting with *MongoDB 3.2.6, a write concern of majority actually implies j equals true*. The advantage of setting *j equals true for any given write concern* is that you have a stronger guarantee that not only were the *writes received, they've been written to an on-disk journal. If you set j to false, or if journaling is disabled on the mongod, the node only needs to store the data in memory before reporting success*.

### Write Concerns: Part 2

In general, the *core write commands all support write concern*. Now, we've talked about this all at a pretty high level. *Write concern* makes a lot more sense when you watch it in action. In an earlier lesson, we showed you how an *application writes "behave" during a failover event*. Let's return to that example now but to talk about *write concern*. We have our *three-member replica set with an application inserting data into the primary*.

As you might remember, *data is replicated from the primary to the secondaries*. The default *write concern is one*. So even though we don't set the *write concern explicitly, the application implicitly assigns it a write concern of one*. At this point, we know that our *primary has received the write operation*. We've received one *acknowledgment based on our write concern of one*.

Since that matches the *write concern* we requested, we're good to go. But what would happen if the *primary failed at this point of time before it completes replicating this write to the secondaries*? The *secondaries won't see the write*. While it was successful on a *single node, we had no guarantee that the write had propagated to the remaining replica set members*. Even though we got the level of *write concern* we asked for, the *guarantee level was too low to accommodate the scenario*.

As far as our *application is concerned, this was a successful write*. But when this *primary* comes back online the right would actually be rolled back. Let's imagine the same scenario but with a *write concern of majority*. That means we now would need an *acknowledgment from two members of our three-member replica set. The application waits until the primary reports that at least one of the secondaries has also acknowledged the write*.

```javascript
db.product.insert(
  {...},
  {
    writeConcern : { w : "majority"}
  }
)
```

With *two acknowledgments the application can consider the write a success*. Now if the *primary* happens to go down, we have a reasonable *guarantee that at least one of the secondaries has received the write operation*. If I set the *write concern to three, the application would require an acknowledgment from all three members before considering the write successful*. At this point, you might be thinking, well, I want *guarantees of data durability*.

```javascript
db.product.insert(
  {...},
  {
    writeConcern : { w : 3 }
  }
)
```

So shouldn't I always set my *write concern as high as possible*? Well, a *stronger level of durability guarantee comes with the trade off*. Specifically, you have to wait for the *acknowledgments to come in*. That means your *write operations may take longer than required if you requested a lesser or even no write acknowledgment*. As the number of *replica set nodes increase, write operations may take even longer to return as successful*.

Alternatively, what happens if one of your *secondaries are down*? Based on our *write concern*, we need an *acknowledgment from three members of the replica set*. This *write now blocks until the secondary* comes back online which may take longer than is acceptable. This is where the *wtimeout option* comes in handy. You can set it to a *reasonable time wherein the application stops waiting and moves forward throwing an error related to write concern*.

```javascript
db.product.insert(
  {...},
  {
    writeConcern : { w : 3, wtimeout : 60 }
  }
)
wtimeout exceeded!
```

Remember, the *timeout error does not mean that the write failed*. We can see here that the primary and at least one secondary did acknowledge. But because we *timed out waiting for the requested write concern*, as far as the application is concerned, it did not receive the level of guarantee it requested. Generally, setting a *W of majority is a nice middle ground between fast writes and durability guarantees*.

To recap, *write concern* allows your applications to request a certain *number of acknowledgments for a write operation for the MongoDB cluster*. These *acknowledgments* represent increasing *durability guarantees for a given write operations. Write concern comes with a trade off of write speed*. The *higher guarantee* you need that a right is durable, the *more time the overall write operation requires to complete*.

*MongoDB supports a write concern* on all deployment types. That means *standalone, replica sets, and sharded clusters all support write concern*.

### Read Concerns

*Read concern is a companion to write concern, an acknowledgment mechanism for read operations* where developers can direct their *application to perform read operations* where the returned documents meet the requested *durability guarantee*. Consider a *replica set where applications insert a document*, which is *acknowledged by the primary*. Before the document can *replicate to the secondaries, the application reads that document*.

```javascript
db.products.insert(
  { "name" : "things", ...}
)
```

Suddenly, the *primary fails. The document we have read has not yet replicated to the secondaries*. When the *old primary comes back online, that data is going to be rolled back as part of the synchronization process*. While you can access the *rolled back data manually, the application effectively has a piece of data that no longer exists in the cluster*. This might cause problems in the *application, depending on your architecture*.

*Read concern* provides a way of dealing with the issue of *data durability during a failover event*. Just like how *write concern lets you specify how durable write operations should be, read concern lets your application specify a durability guarantee for documents returned by a read operation. The read operation only returns data acknowledged* as having been written to a number of *replica set members specified in the read concern*.

```javascript
db.products.find(
  { "name" : "things", ...}
).readConcern( level : "majority" )
```

You can choose between returning the *most recent data in a cluster or the data received by a majority of members in the cluster*. One really important note. A document that does not meet the specified *read concern* is not a document that is *guaranteed to be lost*. It just means that at the *time of the read, the data had not propagated to enough nodes* to meet the requested *durability guarantee*.

There are *four read concern* levels. *Local* returns the most *recent data in the cluster*. Any data freshly written to the *primary qualifies for local read concern*. There are no *guarantees* that the data will be safe during a *failover* event. *Local reads* are the default for *read operations against the primary. Available read concerns is the same as local read concern for replica set deployments*.

*Available read concern* is the default for *read operations against secondary members. Secondary reads* are an aspect of *MongoDB read preference*, which is covered in a later lesson. The main difference between *local and available read concern is in the context of sharded clusters*. We're going to talk more about *sharded clusters later*. It's enough to know that *available read concern has special behavior in sharded clusters*.

*Majority read concern only returns data that has been acknowledged as written to a majority of replica set members*. So here in our *three-member replica set, our read operations* would only return those *documents written to both the primary and the secondary*. The only way that documents returned by a *read concern majority read operation* could be lost is if a *majority of replica set members* went down and the documents were not *replicated to the remaining replica set members*, which is a very unlikely situation, depending on your deployment architecture.

> *Majority read concern* provides the stronger *guarantee compared to local or available writes*. But the trade-off is that you may not get the *freshest or latest data in your cluster*. As a special note, the *MMAPv1 storage engine* does not support *read concern of majority*.

*Linearizeable read concern was added in MongoDB 3.4*, and has special behavior. Like *read concern majority*, it also only returns data that has been *majority committed. Linearizeable* goes beyond that, and provides *read your own write functionality*. So when should you use what *read concern*? Really depends on your *application requirements. Fast, safe, or the latest data in your cluster. Pick two*. That's the general idea.

If you want *fast reads of the latest data, local or available read concern* should suit you just fine. But you are going to lose your *durability guarantee*. If you want *fast reads of the safest data, then majority read concern* is a good middle ground. But again, you may not be getting the *latest written data to your cluster*. If you want *safe reads of the latest data at the time of the read operation, then linearizeable is a good choice, but it's more likely to be slower*. And it's *single document reads only*.

One thing to be really clear about, *read concern doesn't prevent deleting data using a CRUD operation, such as delete*. We're only talking about the *durability of data returned by a read operation in context of a failover event*. In a later lesson, we're going to talk about *read preference, where you can route your read operations to secondary members. Read preference for secondaries* does allow you to specify *local or available read concern*, but you're going to lose the *guarantee of getting the most recent data*.

> So just remember that with *secondary reads, local and available read concern* is really just *fast*, but not necessarily the *latest*.

To recap, *read concern uses an acknowledgment mechanism for read operations where applications can request only that data which meets the requested durability guarantee*. There are four available read concern options. *Local and available are identical for replica sets*. Their behavior's more distinct in *sharded clusters. Majority read concern is your middle ground between durability and fast reads*, but it can return stale data.

*Linearizeable has the strongest durability guarantees*, and always returns the *freshest data in context of a read operation* in exchange for potentially *slow read operations* as well as the overall restrictions and requirements for using it. Finally, you can use *read concern in conjunction with write concern to specify durability guarantees on both reads and writes*. Remember that the two work together, but are not dependent on each other. You can use *read concern with write concern or read concern without write concern*.

### Read Preferences

*Read preference* allows your applications to route read operations to *specific members of a replica set. Read preference* is principally a driver side setting. Make sure to check your *driver documentation* for complete instructions on specifying a *read preference for your read operations*.

Take the *three member replica set*, for example. By default, your applications *read and write data on the primary*. With *replica sets, data is replicated to all data bearing members*. So both of the *secondaries would eventually have copies of the primary data*. What if we, instead, wanted to have our application prefer *reading from a secondary member?*

```javascript
db.product.find(
  { "name" : "Mongo 101", ... }
)
```

With the *read preference*, we can direct the application to *route its query to a secondary member of the replica set, instead of the primary*. There are *five supported read preference* modes. *Primary* read preference routes all read operations to the *primary* only. This is the default read preference.

```javascript
db.product.find(
  { "name" : "Mongo 101", ... }
).readPref("secondaryPreferred")
```

*PrimaryPreferred* routes read operations to the primary. But if the *primary* is unavailable, such as during an election or fail-over event, the application can route reads to an available *secondary* member instead. *Secondary* routes read operations only to the *secondary* members in the replica set. *SecondaryPreferred* routes read operations to the *secondary* members. But if no *secondary* members are available, the operation then routes to the *primary*.

*Nearest* routes read operations to the replica set member with the least network latency to the host, regardless of the members type. This typically supports *geographically local read operations*. With *secondary reads*, always keep in mind that depending on the amount of *replication latency in a replica set*, you can receive *stale data*. For example, let's say a replica set receives a write operation that updates a document, where *name is Mongo 101*, to have a *status of published*.

```javascript
{ 
  "name" : "Mongo 101", 
  "status" : "Published"
  ...
}
```

At this time, the *secondary* still has the old version of this document where the *status is pending*. If I issue a *secondary read*, using *nearest read* preference selects the *secondary member* to read from, I'm going to get an older version of this document.

```javascript
{ 
  "name" : "Mongo 101", 
  "status" : "Pending"
  ...
}
```

This table gives you an idea of some of the scenarios where you'd use a given *read preference*. The big takeaway here, is that *secondary reads* always have a chance of returning *stale data*. How *stale that data* is, depends entirely on how much of a delay there is between your *primary and your secondaries*.

| Scenario                                                  | Tradeoff                              | Read Preferrence     |
|-----------------------------------------------------------|---------------------------------------|----------------------|
| Read from the primary only                                | Secondaries are for availability only | *primary* (default)  |
| If the primary is unavailable, read from a secondary      | Possible to read stale data           | *primaryPreferred*   |
| Read from secondary members only                          | Possible to read stale data           | *secondary*          |
| If all secondaries are unavailable, read from the primary | Possible to read stale data           | *secondaryPreferred* |
| Application's read from the geographically closest member | Possible to read stale data           | *nearest*            |

> Geographically distributed replica sets are more likely to suffer from stale reads, for example, than a replica set where all the members are in the same geographic region, or even the same data center.

To summarize, *read preference* lets you choose what *replica set members to route read operations* to. The big drawback of using a *read preference, other than primary*, is the potential for *stale read operations*. And the *nearest read preference is most useful if you want to support geographically local reads*. Just remember that it can come with the *potential of reading stale data*.

### Lab: Read Preferences

#### Problem 3

Consider a *3-node replica set* that experiences a network outage. Two of the three nodes were unreachable during the outage, leaving one node remaining. Which of these *readPreferences* will allow you to read data from this node?

#### Answer 3

The key concept to understand here is that when *two nodes* go down in a *three-node replica set*, the *third node becomes a secondary* regardless of whether it started as a *primary*.

Therefore, connecting to the *third node* is the same as connecting to a *secondary node*, and any *readPreference* will work except for *primary*, which requires all operations to read from the *primary node*.

## Chapter 3: Sharding

### What is Sharding?

So until this point, we've learned about *MongoDB deployments* of small and average sizes. So it's feasible to *store an entire data set on one server*. In a *replica set, we have more than one server in our database*. But each server still has to contain *the entire dataset*. As our *dataset grows* to the point where our machines can't properly service client applications, one of our options is just to make the machines better.

We could increase the capacity of individual machines so they have more *RAM, or disk space, or maybe a more powerful CPU*. This is referred to as *vertical scaling*. But this could potentially become very expensive. And besides, *cloud-based* providers aren't going to let us *scale vertically forever*. They'll eventually put a limit on the possible hardware configurations, which would effectively limit our storage layer.

In *MongoDB, scaling is done horizontally*, which means instead of making the individual machines better, we just *add more machines and then distribute the dataset among those machines*. The way we distribute data in *MongoDB is called Sharding. And Sharding allows us to grow our dataset* without worrying about being able to store it *all on one server*. Instead, we *divide the dataset into pieces and then distribute the pieces across as many shards as we want*.

Together, the *shards make up a Sharded Cluster*. In order to *guarantee high availability in our Sharded Cluster*, we deploy each *shard as a replica set*. This way, we can ensure a level of *fault tolerance* against each piece of data regardless of which *shard* actually contains that data. So with our data distributed across several servers, queries may become a *little tricky*. We query our database looking for a specific document. It's not obvious at first where to look for it.

So in between a *Sharded Cluster and its clients*, we set up a kind of *router process* that accepts queries from clients and then figures out which *shard* should receive that query. That router process is called the *Mongos*. And clients connect to *Mongos* instead of connecting to each *shard individually*. And we can have any number of *Mongos processes* so we can service many different applications or requests to the same *Sharded Cluster*.

So *Mongos* must be pretty small, right, to know where each piece of data is at any given point in time in a *massive Sharded Cluster*? But actually, *Mongos* doesn't know anything. It uses the *metadata* about which data is contained on each *shard*. And that *metadata is stored on the Config Servers*. But the data on the *Config Servers* is used very often by *Mongos*. So we need to make sure that data stays *highly available*.

And you can probably guess how we *guarantee high availability here*. Yes, we use *replication. We replicate the data on the Config Servers*. So instead of a *single Config Server*, we deploy a *Config Server Replica Set*. So that's a *high level overview of Sharding in MongoDB -- the Sharded Cluster contains the shards where the data lives; the Config Servers, which contain the metadata of each shard; and the Mongos, which routes the queries to the correct shards*.

### When to Shard

OK, so *MongoDB can scale*. Awesome. Let's do it then. Let's go ahead and build the scalable cluster right off the bat. OK. Not so fast young Padawan. Let's look into when you should definitely *consider to shard*. First let's understand what indicators we should check for to see if we really got to the *moment for sharding*. One of the first things to do is to check out if it is still *economically viable to vertical scale*.

When we need to address a *throughput performance or volume bottleneck*, which are generally the technical drivers for *adding more resources to your system*, the first step would be to check if we can still *add more resources and scale up*. Great, but we need to validate that *adding more of those vertical resources, such as adding more CPU, network, memory, or disk to your existing servers, is economically viable and possible*.

So in case we have a *small set of servers*, checking that, increasing that server's unit resources, in any of the identified resource bottlenecks, gives you an increased performance with very little downtime in an economical scale way. Adding *10 times more RAM to solve a memory allocation bottleneck* does not cost you *100 times more*, if that's the case, great. That should be your reasoning for continuing to scale up.

You are still able to do so in economical viable manner, but you will eventually reach a point where vertical scaling is no longer economically viable or it's very difficult to say impossible to accomplish. Let's say that your *current architecture relies on servers that cost $100 per hour*. You have *three member replica set, so you're sitting on top of $300 per hour*.

The next available type of server costs $1,000 per hour, but where your overall impact in performance is only of 2x, that is probably not going to be a very wise decision. 10 times the cost per server for only two times the performance overall. You will probably be way better off with a horizontal scale where you increase in cost will be, let's say, three times. Three more servers for another replica set, plus three more for your configuration servers, with a potential increase of performance of 2x.

$900 per hour is more acceptable than $3,000 for the same performance improvement. The economics here will play a considerable weight in your decision. Another aspect to consider is the impact on *your operational tasks*. Let's say that you are currently considering increasing the size of your disks to allow moving from *one terabyte disk space to 20 terabyte disks*. The purpose of that is to *scale vertically your storage capabilities*, which is totally fine.

But if we are expecting to run these at *75% capacity*, this will mean loading up to *15 terabytes of data. Which means 15 times more data to backup*. Like a quite significant amount of other aspects, this will probably mean that you will take *15 times more time to back up those servers*, probably an even bigger penalty while restoring such *large servers, as well as doing initial syncs between replica sets*.

And we have to account now for *impact on the network when backing up those 15 terabytes of data*. In such a scenario, having *horizontal scale and distributing* that amount of data across *different shards, will allow getting horizontal performance gains like parallelization of the backup, restore, and initial sync processes*. Remember, that even though these may be infrequent operations, they can become *serious scalability issues to handle from the operational side*.

This same scenario will also impact your *operational workload. 15 times bigger dataset per MongoDB will most likely translate to at least 15 times bigger indexes*. As we know, *indexes are essential for the performance of our queries in a database*. If they take *15 times more space per processing unit or server*, they will require more *RAM so that indexes can be kept in memory*. A very important part of your *working dataset*.

Increasing the *size of your disks most likely will imply eventual increasing the size of your RAM, which Brings added costs or other bottlenecks to your system*. In such a scenario *sharding, the parallelization of your workload across shards*, might be way more beneficial for your application and budget than the waterfall of potential expensive upgrades. > A general rule of thumb indicates that individual servers should contain *two to 5 terabytes of data*.

More than that, it just becomes too time consuming to operate with. Finally, there are workloads that intrinsically play nicer in distributed deployments that *sharding offers, like single threaded operations that can be parallelized and geographically distributed data*. Data that needs to be stored in specific *regional locations or will benefit from being co-located with the clients that consume such data*.

As an example of a single thread operations will be *aggregation framework commands*. If your application relies heavily on *aggregation framework commands and if the response time of those commands becomes slower over time, you should consider sharding your cluster*. That said, not all stages of the *aggregation pipeline are parallelizable*. So a deeper understanding of your pipeline is required before making that decision.

You can learn all about it in our *M121 MongoDB Aggregation Course*. So stay tuned for that. Finally, *geodistributed data is significantly simple to manage using zone sharding. Zone sharding allows us to easily distribute data that needs to be co-located. Zone sharding is out of scope for this course, but bear in mind that this is an efficient way to manage geographically distributed data sets*.

### Sharding Architecture

So in this lesson, we're going to walk to the *architecture of a sharded cluster*. The most important aspect of a *sharded cluster is that we can add any number of shards*. And because that could potentially be *a lot of different shards*, client applications aren't going to *communicate directly with the shards*. Instead, we set up a kind of *router process called mongos*. Then the client connects to *mongos, and mongos routes queries to the correct shards*.

So how does *mongos* figure out exactly where everything is? Well it has to understand exactly how the *data is distributed*. So, let's say this data is on soccer players. Some of you may know them as football players. We split our data set on the last name of each player. So players with *last names between A and J are stored in the first shard, between K and Q on the second shard, and between R and Z on the third shard*.

*Mongos is going to need this information to route queries the client*. For example, if the client sends a query to *mongos about Luis Suarez, mongos can use the last name Suarez to figure out exactly which shard contains that player's document, and then route that query to the correct shard*. We can also have *multiple mongos processes from high availability with mongos*, or to service multiple applications at once.
> The *mongos processes are going to use the metadata* around the collections that have been *sharded* to figure out exactly where to route queries.

The *metadata for this collection* will look like this.

#### Sharded Cluster Metadata

| Shard | Data  |
|:-----:|-------|
|   1   | A - J |
|   2   | K - Q |
|   3   | R - Z |

But the *data is not stored on mongos*. Instead, the *collection metadata gets stored in config servers*, which constantly keep track of where each piece of *data lives in the cluster*. This is especially important because the information contained on each *shard* might change with time. So *mongos queries the config servers* often, in case a piece of data is moved.

But why might a piece of data have to move? Well, the *config servers* have to make sure that there's an even distribution of data across each part. For example, if there are a lot of people in our database with the last name *Smith, the third shard is going to contain a disproportionately large amount of data*. When this happens, the *config servers* have to decide what data has to be moved around so the *shards* have a more even distribution.

In this example, all the names beginning with *R had to move to the second shard from the third shard*, to make room in *third shard for all those people named Smith. The config servers* will then update the data they contain, and then send the data to the correct *shards*.

| Shard | Data  |
|:-----:|-------|
|   1   | A - J |
|   2   | K - R |
|   3   | S - Z |

There's also a chance that a *chunk gets too big and needs to be split*. In that case, *mongos would split the chunk*. We'll talk more about this in the lesson about *chunks*. In the *sharded cluster*, we also have this notion of a *primary shard*. Each database will be assigned a *primary shard*, and all the *non-sharded collections* on that database will remain on that *shard*. Remember, not all the *collections in a sharded cluster need to be distributed*.

The *config servers will assign a primary shard* to each database once they get created. But we can also change the *primary shard* of a database. We're just not going to cover that in this course. The *primary shard* also has a few other responsibilities, specifically around *merge operations for aggregation commands*. So while we're talking about merging results, I just to point something out here.

In our example, the data is organized across *shards* by the name of each player. So if the client receives a query about the *age of a player*, it doesn't know exactly where to look. So it's just going to check *every shard*. It's going to send this query to every single *shard in the cluster*. And it might find a few documents here, a few documents here. And each *individual shard* is going to send their results back to *mongos*.

The *mongos* will gather results, and then maybe sort the results if the query mandated it. This stage is called the *shard merge*, and it takes place on the *mongos*. Once the *shard merge* is complete, the *mongos* will return the results back to the client, but the client won't be aware of any of this. It will query this process like a regular *mongoD*.

So just to recap, in this lesson we covered the *basic responsibilities of mongos, the metadata contained on the contact servers*, and we defined the concept of a *primary shard*.
> The *SHARD_MERGE* stage that takes place on mongos. This is not necessarily true - this stage can take place on *mongos or a randomly chosen shard in the cluster*.

### Setting Up a Sharded Cluster

So now that we've gone over the architecture of a *basic sharded cluster in MongoDB*, we're actually going to build one in our course virtual environment. So right now, all we have is our *replica set - M103 repl*. And this is just a *normal replica set*, but eventually it will become the first *shard in our cluster*. Essentially we just need the *Mongos, a config server replica set (CSRS), and at least one shard*.

The main things we have to build are the *CSRS and the Mongos*. The rest of the work will just be connecting everything together. The first thing we're going to build is our *config servers*. So this is the *configuration file* for one of our *config servers*. It's going to be one of the *nodes in the CSRS*, but it's just a *regular MongoD*, so it's still going to have a *port, a dbpath, and a log path*.

```javascript
// Configuration file for first config server csrs_1.conf:
sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost
  port: 26001
systemLog:
  destination: file
  path: /var/mongodb/db/csrs1.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: /var/mongodb/db/csrs1

// csrs_2.conf:
sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost
  port: 26002
systemLog:
  destination: file
  path: /var/mongodb/db/csrs2.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: /var/mongodb/db/csrs2

// csrs_3.conf
sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost
  port: 26003
systemLog:
  destination: file
  path: /var/mongodb/db/csrs3.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: /var/mongodb/db/csrs3
```

Now, the *config servers* have a very important role in the *shard cluster*, so we have to specify in the configuration that this is in fact a *config server*. So here I'm just going to use that file to start up a *MongoD process*. And here I'm going to do the same thing for the other *two nodes in the CSRS*. And you can find those *config files* in the lecture notes. They look very similar to the first one.

```javascript
// Starting the three config servers:
vagrant@vagrant:~$ sudo mongod -f csrs_1.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1494
child process started successfully, parent exiting
vagrant@vagrant:~$ sudo mongod -f csrs_2.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1530
child process started successfully, parent exiting
vagrant@vagrant:~$ sudo mongod -f csrs_3.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1568
child process started successfully, parent exiting
```

So we enabled this *replica set to use authentication*, and the *key file authentication* is fine, because we already created our *key file*. We're going to share the same *key file in this setup*, since all the *MongoD instances are running on the same virtual machine*. But in a real production environment, *X509 certificates* would be the way to go. Having a *shared password like the key file, when shared across multiple machines, increases the risk of that file being compromised*, so just keep that in mind.

Here I'm just *initiating the config server replica set*. And here I just use the *local host exception to create our super user*. So now I'm just going to *authenticate as the super user*. One (1) means that it worked. And now we can start adding those to the set. Here's our *second node and our third, and now we have a complete config server replica set*. I'm just going to verify that with *rs.isMaster()*.

```javascript
// Connect to one of the config servers:
vagrant@vagrant:~$ mongo --port 26001
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:26001/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("19631e88-46c4-4ea1-ab4c-e3f0b6fd8e21") }
MongoDB server version: 3.6.23

// Initiating the CSRS:
> rs.initiate()
{
    "info2" : "no configuration specified. Using a default configuration for the set",
    "me" : "localhost:26001",
    "ok" : 1,
    "$gleStats" : {
      "lastOpTime" : Timestamp(1631359193, 1),
      "electionId" : ObjectId("000000000000000000000000")
    }
}

// Creating super user on CSRS:
m103-csrs:SECONDARY> use admin
switched to db admin
m103-csrs:PRIMARY> db.createUser({
...   user: "m103-admin",
...   pwd: "m103-pass",
...   roles: [
...     {role: "root", db: "admin"}
...   ]
... })
Successfully added user: {
    "user" : "m103-admin",
    "roles" : [
      {
        "role" : "root",
        "db" : "admin"
      }
    ]
}

// Authenticating as the super user:
m103-csrs:PRIMARY> db.auth("m103-admin", "m103-pass")
1

//Add the second and third node to the CSRS:
m103-csrs:PRIMARY> rs.add("localhost:26002")
{
    "ok" : 1,
    "operationTime" : Timestamp(1631362419, 1),
    "$gleStats" : {
      "lastOpTime" : {
        "ts" : Timestamp(1631362419, 1),
        "t" : NumberLong(1)
      },
      "electionId" : ObjectId("7fffffff0000000000000001")
    },
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631362419, 1),
      "signature" : {
        "hash" : BinData(0,"0RvROMBk6u+hmqUkXTIZnNTwrhg="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
m103-csrs:PRIMARY> rs.add("localhost:26003")
{
    "ok" : 1,
    "operationTime" : Timestamp(1631362569, 1),
    "$gleStats" : {
      "lastOpTime" : {
        "ts" : Timestamp(1631362569, 1),
        "t" : NumberLong(1)
      },
      "electionId" : ObjectId("7fffffff0000000000000001")
    },
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631362569, 1),
      "signature" : {
        "hash" : BinData(0,"quPaC5dX/h4subzBQN84LSqQv4s="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
m103-csrs:PRIMARY> rs.isMaster()
{
    "hosts" : [
      "localhost:26001",
      "localhost:26002",
      "localhost:26003"
    ],
    "setName" : "m103-csrs",
    "setVersion" : 3,
    "ismaster" : true,
    "secondary" : false,
    "primary" : "localhost:26001",
    "me" : "localhost:26001",
    "electionId" : ObjectId("7fffffff0000000000000001"),
    "lastWrite" : {
      "opTime" : {
        "ts" : Timestamp(1631362760, 1),
        "t" : NumberLong(1)
      },
      "lastWriteDate" : ISODate("2021-09-11T12:19:20Z"),
      "majorityOpTime" : {
        "ts" : Timestamp(1631362760, 1),
        "t" : NumberLong(1)
      },
      "majorityWriteDate" : ISODate("2021-09-11T12:19:20Z")
    },
    "configsvr" : 2,
    "maxBsonObjectSize" : 16777216,
    "maxMessageSizeBytes" : 48000000,
    "maxWriteBatchSize" : 100000,
    "localTime" : ISODate("2021-09-11T12:19:28.176Z"),
    "logicalSessionTimeoutMinutes" : 30,
    "minWireVersion" : 0,
    "maxWireVersion" : 6,
    "readOnly" : false,
    "ok" : 1,
    "operationTime" : Timestamp(1631362760, 1),
    "$gleStats" : {
      "lastOpTime" : {
        "ts" : Timestamp(1631362569, 1),
        "t" : NumberLong(1)
      },
      "electionId" : ObjectId("7fffffff0000000000000001")
    },
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631362760, 1),
      "signature" : {
        "hash" : BinData(0,"YeVvWLwXlcycNRte1O5x0StJEGQ="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
```

And it looks like the set has *three nodes* in it. So now that we have our *CSRS* up and running, we can start up *Mongos and then point Mongos in the direction of our config server replica set*. So this is the *configuration file from Mongos*, and the first thing you're going to notice is that there is no *dbpath*. That's because *Mongos* doesn't need to store any data.

```javascript
// Mongos config (mongos.conf):
sharding:
  configDB: m103-csrs/localhost:26001,localhost:26002,localhost:26003
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost
  port: 26000
systemLog:
  destination: file
  path: /var/mongodb/db/mongos.log
  logAppend: true
processManagement:
  fork: true
```

All of the data used by *Mongos is stored on the config servers*. So in the *sharding section*, we've specified those. And note that we've specified the entire *replica set, instead of the individual members*. We also enabled *key file authentication*, so we're going to need to *authenticate to Mongos*, but it will inherit the same uses as our *config servers*, and we'll see that in a minute. So this is the command we use to start *Mongos*.

```javascript
// Start the mongos server:
m103-csrs:PRIMARY> exit
bye
vagrant@vagrant:~$ vim mongos.conf
vagrant@vagrant:~$ sudo mongos -f mongos.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1936
child process started successfully, parent exiting
```

We pass the *config file* like we did before, but note that this is not a *mongod process. Mongos* is a different process with different properties, so just bear that in mind. So as we saw before, *Mongos has auth- enabled*, and it's also going to inherit any users that we created on the *config servers*. So this user is actually ready to go.

```javascript
// Connect to mongos:
vagrant@vagrant:~$ mongo --port 26000 --username m103-admin --password m103-pass --authenticationDatabase admin
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:26000/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("79aba230-015e-45ef-9ea9-ca39313a56e0") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-11T12:50:40.836+0000 I CONTROL  [main] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-11T12:50:40.837+0000 I CONTROL  [main] 
mongos> 
```

And it looks like we're in. I'm just going to check the status here. So *sh.status()* is the most basic way to get *sharding data from the Mongos*. And if we take a look at the output, we can see that we have the number of *Mongoses currently connected, and we also have the number of shards*. Right now, this is empty, because we don't have any *shards*. But you can probably see where this is going.

```javascript
// Check sharding status:
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
      "clusterId" : ObjectId("613c90dc078b9817172ec755")
  }
  shards:
  active mongoses:
        "3.6.23" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
```

Right now, we have our *Mongos running with the config servers*, and, actually, we also have a *replica set* that we can use. We just need to *tweak the configuration so we can use it as a shard node*. So this is the one line that we have to add if we want to *enable sharding on this node*. This line is going to tell *Mongos, hey, you know, you can use me as a shard node in your cluster*. We have to add this line to every *single node in the replica set*.

```javascript
// Updated configuration for node1.conf:
sharding:
  clusterRole: shardsvr
storage:
  dbPath: /var/mongodb/db/node1
  wiredTiger:
    engineConfig:
      cacheSizeGB: .1
net:
  bindIp: localhost
  port: 27011
security:
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/db/node1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example

// Updated configuration for node2.conf:
sharding:
  clusterRole: shardsvr
storage:
  dbPath: /var/mongodb/db/node2
  wiredTiger:
    engineConfig:
      cacheSizeGB: .1
net:
  bindIp: localhost
  port: 27012
security:
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/db/node2/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example

// Updated configuration for node3.conf:
sharding:
  clusterRole: shardsvr
storage:
  dbPath: /var/mongodb/db/node3
  wiredTiger:
    engineConfig:
      cacheSizeGB: .1
net:
  bindIp: localhost
  port: 27013
security:
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/db/node3/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example
```

So I just changed the *config files for all three nodes* in our set. But the *nodes still need to be restarted* in order to account for those changes. We're going to do a *rolling upgrade* in order to do this, which means we're going to *upgrade the secondaries first, then bring them back up, step down the current primary, and then upgrade that last node*. Here, I'm just connecting to one of the *secondary nodes*.

```javascript
// Connecting directly to secondary node (note that if an election has taken place in your replica set, the specified node may have become primary):
vagrant@vagrant:~$ mongo --port 27012 -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:27012/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("65f05546-21e3-41c5-8ebc-5b35b24f8c68") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-12T08:43:53.218+0000 I STORAGE  [initandlisten] 
2021-09-12T08:43:53.218+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-12T08:43:53.218+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2021-09-12T08:43:56.193+0000 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-12T08:43:56.193+0000 I CONTROL  [initandlisten] 
m103-example:SECONDARY>
```

I'm just going to switch to the *admin database and shut down this node*. And here I'm just starting it back up with the *new configuration*. Do the same thing for our *third node*. And here I'm starting up the *third node* with the *new configuration*. So now that *both secondaries have been upgraded for the new configuration*, I'm going to connect to the *primary and then step it down so I can upgrade that one, too*. I'm just going to force an election so this *node becomes a secondary*, and it worked. Now I'm just going to shut this *node down*, as well. So now I'm starting up our *last node* with the new configuration, and it worked.

```javascript
// Shutting down node:
m103-example:SECONDARY> use admin
switched to db admin
m103-example:SECONDARY> db.shutdownServer()
server should be down...
2021-09-12T10:05:31.367+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27012 (127.0.0.1) failed
2021-09-12T10:05:31.368+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27012, in(checking socket for error after poll), reason: Connection refused
2021-09-12T10:05:31.369+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27012 (127.0.0.1) failed failed 
2021-09-12T10:05:31.373+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27012 (127.0.0.1) failed
2021-09-12T10:05:31.374+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27012, in(checking socket for error after poll), reason: Connection refused
2021-09-12T10:05:31.375+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27012 (127.0.0.1) failed failed 
> 

// Restarting node with new configuration:
vagrant@vagrant:~$ sudo mongod -f node2.conf
about to fork child process, waiting until server is ready for connections.
forked process: 2612
child process started successfully, parent exiting

// Do the same thing for our *third node*
vagrant@vagrant:~$ mongo --port 27013 -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:27013/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("44a2c29f-3b79-4a58-a1fd-30b4a3740c8a") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-12T08:44:32.930+0000 I STORAGE  [initandlisten] 
2021-09-12T08:44:32.930+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-12T08:44:32.931+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2021-09-12T08:44:36.120+0000 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-12T08:44:36.120+0000 I CONTROL  [initandlisten] 
m103-example:SECONDARY>
m103-example:OTHER> use admin
switched to db admin
m103-example:SECONDARY> db.shutdownServer()
server should be down...
2021-09-12T10:10:51.322+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27013 (127.0.0.1) failed
2021-09-12T10:10:51.323+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27013, in(checking socket for error after poll), reason: Connection refused
2021-09-12T10:10:51.324+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27013 (127.0.0.1) failed failed 
2021-09-12T10:10:51.328+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27013 (127.0.0.1) failed
2021-09-12T10:10:51.329+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27013, in(checking socket for error after poll), reason: Connection refused
2021-09-12T10:10:51.330+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27013 (127.0.0.1) failed failed 
> exit
bye
2021-09-12T10:11:05.201+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27013 (127.0.0.1) failed
2021-09-12T10:11:05.203+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27013, in(checking socket for error after poll), reason: Connection refused
2021-09-12T10:11:05.204+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27013 (127.0.0.1) failed failed 
2021-09-12T10:11:05.206+0000 I QUERY    [thread1] Failed to end session { id: UUID("44a2c29f-3b79-4a58-a1fd-30b4a3740c8a") } due to SocketException: socket exception [CONNECT_ERROR] for couldn't connect to server 127.0.0.1:27013, connection attempt failed
vagrant@vagrant:~$ 

// Restarting the third node with new configuration:
vagrant@vagrant:~$ sudo mongod -f node3.conf
about to fork child process, waiting until server is ready for connections.
forked process: 2722
child process started successfully, parent exiting

// connecting to the primary node
vagrant@vagrant:~$ mongo --port 27011 -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:27011/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("9d545aa7-375d-4b5c-970b-c1e6041783f0") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-12T08:40:07.951+0000 I STORAGE  [initandlisten] 
2021-09-12T08:40:07.951+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2021-09-12T08:40:07.951+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2021-09-12T08:40:11.229+0000 I CONTROL  [initandlisten] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-12T08:40:11.229+0000 I CONTROL  [initandlisten] 
m103-example:PRIMARY>

// Stepping down current primary:
m103-example:PRIMARY> rs.stepDown()
2021-09-12T10:15:02.048+0000 E QUERY    [thread1] Error: error doing query: failed: network error while attempting to run command 'replSetStepDown' on host '127.0.0.1:27011'  :
DB.prototype.runCommand@src/mongo/shell/db.js:168:1
DB.prototype.adminCommand@src/mongo/shell/db.js:186:16
rs.stepDown@src/mongo/shell/utils.js:1413:12
@(shell):1:1
2021-09-12T10:15:02.077+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27011 (127.0.0.1) failed
2021-09-12T10:15:02.082+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27011 (127.0.0.1) ok
m103-example:SECONDARY>

// Shutting down node:
m103-example:SECONDARY> use admin
switched to db admin
m103-example:SECONDARY> db.shutdownServer()
server should be down...
2021-09-12T10:17:21.726+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27011 (127.0.0.1) failed
2021-09-12T10:17:21.727+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27011, in(checking socket for error after poll), reason: Connection refused
2021-09-12T10:17:21.727+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27011 (127.0.0.1) failed failed 
2021-09-12T10:17:21.732+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27011 (127.0.0.1) failed
2021-09-12T10:17:21.733+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27011, in(checking socket for error after poll), reason: Connection refused
2021-09-12T10:17:21.735+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27011 (127.0.0.1) failed failed 
> exit
bye
2021-09-12T10:17:54.060+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27011 (127.0.0.1) failed
2021-09-12T10:17:54.061+0000 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27011, in(checking socket for error after poll), reason: Connection refused
2021-09-12T10:17:54.061+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27011 (127.0.0.1) failed failed 
2021-09-12T10:17:54.064+0000 I QUERY    [thread1] Failed to end session { id: UUID("9d545aa7-375d-4b5c-970b-c1e6041783f0") } due to SocketException: socket exception [CONNECT_ERROR] for couldn't connect to server 127.0.0.1:27011, connection attempt failed
vagrant@vagrant:~$

// Restarting the first node with new configuration:
vagrant@vagrant:~$ sudo mongod -f node1.conf
about to fork child process, waiting until server is ready for connections.
forked process: 2864
child process started successfully, parent exiting
```

So now we've successfully *enabled sharding on this replica set*. Now I'm going to connect back to *Mongos*. So once I'm connected back to *Mongos*, I can *add the shard that we just enabled sharding on*. And we specify the entire *replica set*, so we only need to specify *one node in order for Mongos to discover the current primary of this replica set*. And it looks like it worked. I'm just going to check *sh.status()*.

```javascript
// Connecting back to mongos
vagrant@vagrant:~$ mongo --port 26000 --username m103-admin --password m103-pass --authenticationDatabase admin
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:26000/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("4a6ac54b-0268-4022-a7e4-288b2d9190de") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-12T09:36:55.448+0000 I CONTROL  [main] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-12T09:36:55.448+0000 I CONTROL  [main] 
mongos>

// Adding new shard to cluster from mongos:
mongos> sh.addShard("m103-example/localhost:27012")
{
    "shardAdded" : "m103-example",
    "ok" : 1,
    "operationTime" : Timestamp(1631442330, 6),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631442330, 7),
      "signature" : {
        "hash" : BinData(0,"gYDjmstDwbXXqTLUqHfNnWWnyZI="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}

// Checking the status of our shard
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
      "clusterId" : ObjectId("613c90dc078b9817172ec755")
  }
  shards:
        {  "_id" : "m103-example",  "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",  "state" : 1 }
  active mongoses:
        "3.6.23" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
        {  "_id" : "m103",  "primary" : "m103-example",  "partitioned" : false }
        {  "_id" : "newDB",  "primary" : "m103-example",  "partitioned" : false }
```

And our list of *shards now has one shard* in it. And as we can see, we only specified *one node, but Mongos* was able to discover all the *nodes in the set*. So just to recap here. We covered how to *launch Mongos and a config server replica set*. We learned how to *enable sharding on a replica set, and we did so, by way of a rolling upgrade. And we added shards to our cluster*.

### Config DB

All right, so in this lesson, we're going to talk about a very important database in the *sharded cluster, the config database*. First thing you need to know about the *config DB* is that you should generally never write any data to it. It's maintained internally by *MongoDB*, and it's used internally. So, generally, you will never need to actually write any data to it. However, it's got some useful information in it, so we are going to read from it.

So, I'm just connected to *mongos* and I'm running a quick *sh.status()* on it just to see the *typology of the sharded cluster*. So this is going to give us a lot of output about some of the *shards, about the active mongos's*. It's going to give us some information about the *database in our sharded cluster*. But all of this data is actually stored in the *config DB*.

```javascript
vagrant@vagrant:~$ sudo mongod -f csrs_1.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1796
child process started successfully, parent exiting
vagrant@vagrant:~$ sudo mongod -f csrs_2.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1895
child process started successfully, parent exiting
vagrant@vagrant:~$ sudo mongod -f csrs_3.conf
about to fork child process, waiting until server is ready for connections.
forked process: 2185
child process started successfully, parent exiting
vagrant@vagrant:~$ sudo mongos -f mongos.conf
about to fork child process, waiting until server is ready for connections.
forked process: 2311
child process started successfully, parent exiting
vagrant@vagrant:~$ mongo --port 26000 --username m103-admin --password m103-pass --authenticationDatabase admin
MongoDB shell version v3.6.23
connecting to: mongodb://127.0.0.1:26000/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7f54c793-db66-4872-805d-fd90497215ed") }
MongoDB server version: 3.6.23
Server has startup warnings: 
2021-09-13T06:02:35.837+0000 I CONTROL  [main] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-13T06:02:35.837+0000 I CONTROL  [main] 
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
      "clusterId" : ObjectId("613c90dc078b9817172ec755")
  }
  shards:
        {  "_id" : "m103-example",  "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",  "state" : 1 }
  active mongoses:
        "3.6.23" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                m103-example 1024
                        too many chunks to print, use verbose if you want to force print
        {  "_id" : "m103",  "primary" : "m103-example",  "partitioned" : true }
        {  "_id" : "newDB",  "primary" : "m103-example",  "partitioned" : false }
```

Here, I'm just switching over to the *config database*. I'm going to take a look at the collections we have in there already. So these are all the collections that we have access to in the *config database*. The first one we're going to look at is the *databases* collection. So here, I'm just pretty printing the results from our *databases query*. So this is going to return each *database* in our cluster as one document.

```javascript
// Switch to config DB:
mongos> use config
switched to db config
mongos> show collections
changelog
chunks
collections
databases
lockpings
locks
migrations
mongos
shards
tags
transactions
version

// Query config.databases:
mongos> sh.enableSharding("m103", "m103-example")
{
    "ok" : 1,
    "operationTime" : Timestamp(1631516381, 5),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631516381, 5),
      "signature" : {
        "hash" : BinData(0,"bE920n3OAwnTHkMEeiGj9NxEefQ="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
mongos> db.databases.find().pretty()
{ "_id" : "m103", "primary" : "m103-example", "partitioned" : true }
{ "_id" : "newDB", "primary" : "m103-example", "partitioned" : false }
```

It's going to give us the *primary shard for each database*, and the *partition* here is just telling us whether or not *sharding has been enabled on this database*. In this case, the *m103 database has sharding enabled*. Now, take a look at the collections. So this is only going to give us information on collections that have been *sharded*. But for those collections, it will tell us the *shard key* that we used. It tell us whether or not that key was unique.

```javascript
// Query config.collections:
mongos> db.collections.find().pretty()
{
    "_id" : "config.system.sessions",
    "lastmodEpoch" : ObjectId("613dd6b14bfc18c75b5ad4e6"),
    "lastmod" : ISODate("1970-02-19T17:02:47.296Z"),
    "dropped" : false,
    "key" : {
      "_id" : 1
    },
    "unique" : false,
    "uuid" : UUID("cc896907-9eff-4010-9ed8-c80dfb1caf4f")
}

// Query config.shards:
mongos> db.shards.find().pretty()
{
    "_id" : "m103-example",
    "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",
    "state" : 1
}
```

 This one's going to tell us about the *shards in our cluster*. And here, you can see the *hostname* contains the *replica set name because these shards are deployed as replica sets*.

```javascript
// Query config.shards:
mongos> db.shards.find().pretty()
{
    "_id" : "m103-example",
    "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",
    "state" : 1
}
```

The *chunks collection* is possibly the most interesting collection in this whole database. So each *chunk* for every collection in this database is returned to us as one document. The *inclusive minimum and the exclusive maximum* define the *chunk range of the shard key values*. That means that any document in the associated collection who's *shard key value* falls into this *chunks range will end up in this chunk, and this chunk only*.

```javascript
// Query config.chunks:
mongos> db.chunks.find().pretty()
{
    "_id" : "config.system.sessions-_id_MinKey",
    "lastmod" : Timestamp(1, 1),
    "lastmodEpoch" : ObjectId("613dd6b14bfc18c75b5ad4e6"),
    "ns" : "config.system.sessions",
    "min" : {
      "_id" : { "$minKey" : 1 }
    },
    "max" : {
      "_id" : {
        "id" : UUID("00400000-0000-0000-0000-000000000000")
      }
    },
    "shard" : "m103-example"
  }
  {
    "_id" : "config.system.sessions-_id_{ id: UUID(\"00400000-0000-0000-0000-000000000000\") }",
    "lastmod" : Timestamp(1, 2),
    "lastmodEpoch" : ObjectId("613dd6b14bfc18c75b5ad4e6"),
    "ns" : "config.system.sessions",
    "min" : {
      "_id" : {
        "id" : UUID("00400000-0000-0000-0000-000000000000")
      }
    },
    "max" : {
      "_id" : {
        "id" : UUID("00800000-0000-0000-0000-000000000000")
      }
    },
    "shard" : "m103-example"
  }
  {
    "_id" : "config.system.sessions-_id_{ id: UUID(\"00800000-0000-0000-0000-000000000000\") }",
    "lastmod" : Timestamp(1, 3),
    "lastmodEpoch" : ObjectId("613dd6b14bfc18c75b5ad4e6"),
    "ns" : "config.system.sessions",
    "min" : {
      "_id" : {
        "id" : UUID("00800000-0000-0000-0000-000000000000")
      }
    },
    "max" : {
      "_id" : {
        "id" : UUID("00c00000-0000-0000-0000-000000000000")
      }
    },
    "shard" : "m103-example"
  }
  {
    "_id" : "config.system.sessions-_id_{ id: UUID(\"00c00000-0000-0000-0000-000000000000\") }",
    "lastmod" : Timestamp(1, 4),
    "lastmodEpoch" : ObjectId("613dd6b14bfc18c75b5ad4e6"),
    "ns" : "config.system.sessions",
    "min" : {
      "_id" : {
        "id" : UUID("00c00000-0000-0000-0000-000000000000")
      }
    },
    "max" : {
      "_id" : {
        "id" : UUID("01000000-0000-0000-0000-000000000000")
      }
    },
    "shard" : "m103-example"
  }
Type "it" for more
```

So this collection is sharded on *config.system.sessions*. And we see that this *chunk* has documents with values of *id for a minKey key to about "004000...". MinKey*, here, means the lowest possible value of "id" or negative infinity, if you want to think about it that way.

The *config database* also some information on the *mongos process* currently connected to this cluster, because we can have any number of them. As we can see right now, we only have one. But it'll give us a lot of information on it, including the *mongos version that's running on the mongos*.

```javascript
// Query config.mongos:
mongos> db.mongos.find().pretty()
{
    "_id" : "vagrant:26000",
    "advisoryHostFQDNs" : [
      "vagrant.vm"
    ],
    "mongoVersion" : "3.6.23",
    "ping" : ISODate("2021-09-13T08:00:32.519Z"),
    "up" : NumberLong(7075),
    "waiting" : true
}
```

So, just to recap, in this lesson we've covered the *collections that we have in the configure database, including but not limited to, shards, chunks, and the mongos*. But remember, never write to this database unless instructed to by *MongoDB* support or our official documentation. It has some useful information, but it's generally meant for internal *MongoDB* usage only.

### Shard Keys

In this lesson, we're going to talk about the *shard key*. This is the *indexed field or fields that MongoDB uses to partition data in a sharded collection, and distribute it across the shards in your cluster*. Let's start with how the *shard key* is used to distribute your data. Consider a collection with some number of documents in them. *MongoDB uses the shard key* to divide up these documents into logical groupings that *MongoDB then distributes across our sharded cluster*.

*MongoDB he refers to these groupings as chunks*. The value of the field or fields we choose as our *shard key* help to define the *inclusive lower bound, and the exclusive upper bound of each chunk*. Because the *shard key is used to define chunk boundaries*, it also defines which *chunk a given document* is going to belong to. Every time you write a new document to the collection, the *MongoS router* checks which *shard* contains the appropriate *chunk* for that documents key value, and routes the document to that *shard* only.

That's how *sharded clusters* handle distributed write operations. Depending on what *shard is holding a given chunk*, a new document is routed to that *shard and only that shard*. This also means that your *shard key* must be present in every document in the collection, and every new document inserted. So I could *shard on as stock-keeping unit-(sku) or type, but not imdb* since that field isn't included in every document within the collection.

*Shard keys* also support distributed read operations. If you specify the *shard key* as part of your queries, *MongoDB* can redirect the query to only those *chunks*, and therefore, *shards* that contain the related data. Ideally, your *shard key* should support the majority of queries you run on the collection. That way, the majority of your read operations can be targeted to a *single shard*.

Without the *shard key* in the query, the *MongoS router* would need to check each *shard* in the cluster to find the documents that match the query. We'll go into the specifics of targeted versus broadcast operations in a later lesson. Let's go over a few important aspects of your *shard key*. First, I mentioned earlier that the *shard key are an index field or fields in your collection*. This is a hard requirement. You cannot select a *field or fields for your shard key* if you do not have an existing *index for the field or fields*.

You'll need to create the *index first before you can shard. Sharding is a permanent operation. Once you have selected your shard key*, that's it. Furthermore, the *shard key is immutable*. Not only can you not change it later, you cannot update the *shard key values of the shard key fields* for any document in the collection. So choose carefully. The next lesson has some guidance on choosing a good *shard key*, so stay tuned for that.
> As of MongoDB 4.2, the *shard key* values are mutable, even though the *shard key* itself is immutable. If you're interested, you can read more in the *Shard Key Values documentation*.

Finally, you cannot *unshard a collection*. This kind of builds off of *shard keys being immutable*. Once you have *sharded a collection, you cannot unshard it later*. The steps for *sharding* are actually pretty straightforward. First, you need to use *sh.enablesharding("database")*, specifying the name of the database, to enable *sharding* for the specified database. This does not automatically *shard* your collections. It just means that the collections in this particular database are *eligible for sharding*.
> As of MongoDB 4.4, you can use *refineCollectionShardKey()* to update a document's *shard key value, unless the shard key field is the immutable _id field*. If you're interested, you can read more in the *refineCollectionShardKey documentation*.

This won't affect other databases in your *MongoDB cluster*. Next, you have to create the *index to back your shard key for the collection you want to shard, using db.collection.createIndex()*. Remember, we're going to substitute collection here with the name of the collection we want to create the index on. Finally, we're going to use *sh.shardCollection("database.collection", { shard key }), specifying the full path to the collection, and the shard key to shard the specified Collection*.

Let's actually try this in action real quick. So here, you can see I'm using *sh.status()* to show that I have a two *shard sharded cluster*. I'm currently connected to the *MongoS*. I'm going to switch to the *m103 database*, because I want to *shard* the products collection in that database. I'm going to enable *sharding on the m103 database* first. Now before we *shard a collection*, we need to decide what key we will be using. I'm using *db.products.find0ne()* to show you those one document from the *products collection*.

```javascript
mongos> cls

mongos> show dbs
admin   0.000GB
config  0.001GB
m103    0.000GB
newDB   0.000GB
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
      "clusterId" : ObjectId("613c90dc078b9817172ec755")
  }
  shards:
        {  "_id" : "m103-example",  "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",  "state" : 1 }
  active mongoses:
        "3.6.23" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  3
        Last reported error:  Could not find host matching read preference { mode: "primary" } for set m103-example
        Time of Reported error:  Tue Sep 14 2021 07:32:26 GMT+0000 (UTC)
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                m103-example 1024
                        too many chunks to print, use verbose if you want to force print
        {  "_id" : "m103",  "primary" : "m103-example",  "partitioned" : true }
        {  "_id" : "newDB",  "primary" : "m103-example",  "partitioned" : false }
// Show collections in m103 database:
mongos> use m103
switched to db m103
mongos> show collections
messages
// Enable sharding on the m103 database:
mongos> sh.enableSharding("m103", "m103-example")
{
    "ok" : 1,
    "operationTime" : Timestamp(1631516381, 5),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631516381, 5),
      "signature" : {
        "hash" : BinData(0,"bE920n3OAwnTHkMEeiGj9NxEefQ="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
// Find one document from the products collection, to help us choose a shard key:
mongos> db.products.findOne()
null
mongos> db.createCollection("products")
{
    "ok" : 1,
    "operationTime" : Timestamp(1631607990, 2),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631607990, 2),
      "signature" : {
        "hash" : BinData(0,"AnbIH/SINP64Baw49th58lWi558="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
mongos> show collections
messages
products
mongos> db.products.insert(
...   { "name" : "MTG products",
...     "type" : "Sofware",
...     "regularPrice" : 39.95,
...     "salePrice" : 39.95,
...     "shippingWeight" : "0.01"
...   }
... )
WriteResult({ "nInserted" : 1 })
mongos> db.getCollection('products').findOneAndUpdate(
...   { "_id" : ObjectId("61406480013e1d1da41a69df") },
...   { $push: { "sku" : 1000 } }
... )
{
    "_id" : ObjectId("61406480013e1d1da41a69df"),
    "name" : "MTG products",
    "type" : "Sofware",
    "regularPrice" : 39.95,
    "salePrice" : 39.95,
    "shippingWeight" : "0.01"
}
mongos> db.products.findOne()
{
    "_id" : ObjectId("61406480013e1d1da41a69df"),
    "name" : "MTG products",
    "type" : "Sofware",
    "regularPrice" : 39.95,
    "salePrice" : 39.95,
    "shippingWeight" : "0.01",
    "sku" : [
      1000
    ]
}
```

I'm going to use the *sku field for my shard key*. Before *sharding*, I need to ensure that the *selected key or keys that compose my shard key are supported by an index*. So let's create an *index on sku using db.products.createIndex( { "sku": 1 } )*. So here, I'm creating the *index on sku*, and I have specified ascending here (1). It's not super important. And you can see here that I now have this additional *index on sku*. Remember that all collections have an *index on ID by default*. Finally, I'm going to *shard the collection* using the *index I just specified*.

```javascript
// Create an index on sku:
mongos> db.products.createIndex( { "sku": 1 } )
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
    "operationTime" : Timestamp(1631614516, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631614516, 1),
      "signature" : {
        "hash" : BinData(0,"L+b+nJ2grc7XUnKi8Vp+7X4kStM="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
```

Here, I have the full path to the *products collection -- m103.products*, and then the *shard key that I want to use for this collection, sku*. If I run *sh.status()*, I can now see that the *m103.primary collection has a shard key*, and has actually already been broken up into three separate chunks.

```javascript
// Shard the products collection on sku:
mongos> sh.shardCollection( "m103.products", { "sku": 1 } )
{
    "ok" : 0,
    "errmsg" : "couldn't find valid index for shard key",
    "code" : 96,
    "codeName" : "OperationFailed",
    "operationTime" : Timestamp(1631616203, 6),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1631616203, 6),
      "signature" : {
        "hash" : BinData(0,"rsvcz/sLsDvQ/bAPCo7n7ufw0KE="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
      "clusterId" : ObjectId("613c90dc078b9817172ec755")
  }
  shards:
        {  "_id" : "m103-example",  "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",  "state" : 1 }
  active mongoses:
        "3.6.23" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  3
        Last reported error:  Could not find host matching read preference { mode: "primary" } for set m103-example
        Time of Reported error:  Tue Sep 14 2021 07:32:26 GMT+0000 (UTC)
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                m103-example	1024
                        too many chunks to print, use verbose if you want to force print
        {  "_id" : "m103",  "primary" : "m103-example",  "partitioned" : true }
        {  "_id" : "newDB",  "primary" : "m103-example",  "partitioned" : false }
```

So if I run *sh.status()* again, we can see now that the collection is marked as *sharded* because it has a *shard key*. My documents have actually been already broken up into *chunks*, and distributed across the *two shards in my cluster -- two chunks in shard 1, one chunk in shard 2*. And we can even see the ranges of values for each *chunk*.

To recap, your *shard* determines the partitioning and data distribution of data across your *sharded cluster. Shard keys are immutable*. You cannot change them after *sharding. Shard key values are also immutable*. You cannot update a document *shard key*. And you need to create the underlying *index first before sharding on the indexed field or fields*.

### Picking a Good Shard Key

In the previous lesson, we talked about what a *shard key* is. Now, we're going to talk about what makes a good *shard key*. First, let's recap. You enable *sharding at the database level. You shard collections. Enabling sharding on a database does not automatically shard the collections in that database*. And, you can have both *sharded and unsharded collections in the same database*. Not all collections need to be equal.

First, let's talk about using a *shard key that provides good right distribution*. These are the three basic properties, here. The *cardinality of the shard key values, the frequency of the shard key values*, and whether or not the *shard key increases or decreases monotonically*. We're going to go over each of these one by one. The first, is that the chosen *shard key should have high cardinality. Cardinality is the measure of the number of elements within a set of values*.
> High *Cardinality* = many possible unique *shard key* values

In context of the *shard key, it is the number of unique possible shard key values*. This is important for two reasons. The first is that if your *shard key supports a small number of unique possible values, then that constrains the number of shards you can have in your cluster*. Remember, *chunks define boundaries based on shard key values, and a unique value can only exist on one chunk*. Let's say we *shard* on a field whose values are the number of states in the United States of America.

That's *50 states, so 50 possible values and an upper limit of 50 chunks. And, therefore, 50 shards*. That's quite good, but imagine if we, instead, *sharded on the days of the week. Now we're down to 7 shards*. What if we happen to pick a *shard key that was a boolean? Now we're down to two shards*. Having a higher *cardinality gives you more chunks, and with more chunks the number of shards can also grow*, not restraining your ability to grow the cluster.

I mentioned two reasons earlier. The second reason is actually related to our next property. The *frequency of a shard key* represents how often a unique value occurs in the data. Going back to our states example, imagine if we have a workload where *90% of the time we're inserting documents where the state is New York*. That means *90% of our data* is going to end up in the *chunk whose range include New York*. That's not good. Remember that a *chunk lives in a single shard*.

So now *90% of our writes are going to this one shard that has that one chunk*. That's pretty severe hot spotting, and that's not what we want. Remember the *cardinality property*? Even though the values for possible *states had high cardinality, our workload has high frequency, leading to bad performance*. If our *workload has a low frequency of the possible shard key values, then the overall distribution* is going to be more even.

Now, if I have a very *low frequency shard key combined with very low cardinality, like days of the week*, I'm still potentially going to have problems. So the two of these properties work very closely together. Finally, we have to consider whether or not the *shard is monotonically changing. Monotonically changing here means that the possible shard key values* for a new document changes at a steady and predictable rate.

Think of a field that has numeric progression. *Time stamps or dates, for example, are monotonically increasing*. Similarly, a *stopwatch timer is a monotonically decreasing value*. Why is this a problem? Remember that *MongoDB* splits your documents into *chunks of data, each chunk having an inclusive lower bound, and then exclusive upper bound to shard key values*. All documents that fall into the *range of a chunk are stored in that chunk*.

If all of your new documents have a *higher shard key value* than the previous one, then they're all going to end up in that *one chunk that contains the upper boundary of your possible shard key values*. So, even though *timestamps are technically very high cardinality, lots of unique values, and very low frequency, nearly no repetition of those unique values, it ends up being a pretty bad shard key. Fun fact, the object ID data type is actually monotonically increasing*.

That's why *sharding on the ID field* isn't a good idea. There are some tricks for achieving even distribution of *monotonically changing shard key's*, and we're going to talk about that in a later lesson. The ideal *shard key* provides good distribution of its possible values, have *high cardinality, low frequency, and change non monotonically*. A *shard key* that can fulfill those properties is more likely to result in an even distribution of written data.

Having a *shard key* that doesn't quite fulfill one of these property doesn't guarantee bad distribution of data, but it's not going to help. So far, we've talked about properties that allow for good right distribution, but there is one other thing to consider -- *read isolation. MongoDB* can route queries that include the *shard key to specific chunks*, whose range contains the specified *shard key values*.

Going back to the *states* example, if my query includes *state New York, MongoDB* can direct my read to the *shard* that contains my data. These targeted queries are very fast because *MongoDB* only needs to check in with a *single shard* before returning results. When choosing a *shard key, you should consider whether your choice supports the queries you run most often*. Now, it's possible that the fields you query on make for pretty bad *shard keys*.

In that case, consider specifying a *compound index as the underlying index for the shard key, where the extra field or fields provide high cardinality, low frequency, or are themselves non monotonically changing*. So, without the *shard key* to guide it, *MongoDB has to ask every single shard* to check if it has the data that we're looking for. These broadcast operations are scatter gather operations and can be pretty slow.

Let's go over some considerations of choosing a *shard key*. We've already talked about these, but I want to emphasize them. You cannot *unshard a collection once sharded*. You cannot *update a shard key once you have sharded a collection*. You cannot update the values for that *shard key* for any document in the collection. What that basically means is that your choice of *shard key* is final.

Whenever possible, try to test your *shard keys* in a staging environment first, before *sharding* in production environments. If you use the *Mongo dump and Mongo restore utilities, you can dump, drop, and restore the collection*. But that's non-trivial. So again, whenever possible, you really want to test in a staging environment where you can safely *drop and restore* the collection without impacting production workloads.

Let's recap. Good *shard keys provide even right distribution and, where possible, read isolation by supporting targeted queries*. You want to consider the *cardinality and frequency of the shard keys, and avoid monotonically changing shard keys. Finally, really remember, unsharding a collection is hard*. You really want to avoid it.

### Hashed Shard Keys

So far, we've only talked about the default *shard key*. However, there's an additional type of *shard key* that is useful for certain scenarios. That is the *hashed shard key*. That is a *shard key where the underlying index is hashed*. Previously, if we had a document where, let's say *x was 3 and the shard key was on x, MongoDB* would place it into the following *chunk where the value of 3 falls into the trunk range*.

With a *hashed shard key, MongoDB first hashes the value 3*, then uses that *hash value* to decide which *chunk* to place the document in. The *hash shard key* does not mean that *MongoDB stores your shard key values as hashes*. The actual data remains untouched. Instead, the *underlying index backing the shard key itself is hashed. And MongoDB uses the hashed index* for partitioning your data, so you end up with a more even distribution of your data across the *sharded cluster*.

So when would you want to use a *hashed shard key*? In the previous lesson, we talked about *monotonically increasing or decreasing shard key fields, like dates or time stamps*. Because these values are constantly increasing or decreasing in numeric progression, you get *hot spotting*. But the output from the *hash function* can change drastically between values that are, themselves, similar.

For example, if I have two documents where the *shard key values are 2 and 3, the hashing function* might output the *shard key values as 609,000*. Apply that same logic to a *time stamp, two numerically adjacent timestamps would be hashed* to very different values and are therefore more likely to end up on different *chunks and different shards*. Now there are a few drawbacks to using a *hashed shard* key.

Since everything is *hashed* now, documents within a range of *shard key* values are likely to be completely distributed across the *sharded cluster*. So ranged queries on the *shard key* field will now have to hit *multiple shards, instead of a single shard*. Comparatively, a *non-hash shard key* is more likely to produce documents that are on a *single chunk in a single shard*, meaning ranged queries are more likely to be targeted with a *non-hashed shard key*.

You're going to lose the ability to use features like *zone sharding* for the purpose of geographically isolated reads and writes. Again, if everything is randomly distributed across every *shard in the cluster*, there's no real way to isolate data into groupings like geography. You can't create *hashed compound indexes*. You can only *hash a single field shard key*. That plays into why these are best used for *monotonically changing single fields, like timestamps*.

Also, the value in the *hashed index must not be an array*. Finally, because the *index is using hashed values*, you're going to lose the performance an *index can provide for sorting documents on the shard key*. To create a *hashed shard*, you're going to start by enabling *sharding on the database using sh.enablesharding("database")*. Remember, this does not automatically *shard* your collections.

You're still going to create an *index using db.collection.createIndex({"field" : "hashed"})*, but now you're going to specify that it is a *hashed index* instead of specifying *-1 or 1 as the value of the indexed field*. Finally, you're going to use *sh.shardcollection("database.collection", { shard key field : "hashed" })*, still specifying the *database and collection*, but you're going to specify *hashed for the shard key value*.

To recap, *hashed shard keys* provide more even distribution of data of a *monotonically changing shard key field. Hashed shard key's* do not support fast sorts, targeted queries on ranges of *shard key* values, or geographically isolated workloads. Finally, *hashed indexes are single fields and do not support arrays*.

### Lab: Shard a Collection

#### Problem 4

Import and shard a collection of data on your cluster:
1 Use *mongoimport* to import the data in */dataset/products.json:*

* import this dataset onto *m103.products*

* use *mongos* as the target for *mongoimport* - you can find the configuration details for this process in *mongos.conf*

* authenticate to *mongos* as *m103-admin* (with password *m103-pass*)

2 Enable sharding on the *m103* database.

Two shards have already been added to your cluster, *shard1 and shard2*. For more information, run *sh.status() on mongos*.

3 Choose a shard key for the *m103.products* collection.

Review the qualities of a good *shard key* in the docs and the following information about the *products* collection:

* *_id* is a serial number for each *product in this collection*, rarely used in queries but important for internal *MongoDB* usage.

* *sku* (Stock Keeping Unit) is a randomly generated integer unique to each product - this is commonly used to refer to specific products when updating stock quantities.

* *name* is the name of the product as it appears in the store and on the website.

* *type* is the type of product, with the possible values "Bundle", "Movie", "Music" and "Software"

* *regularPrice* is the regular price of the product, when there is no sale this price changes every season.

* *salePrice* is the price of a product during a sale - this price changes arbitrarily based on when sales occur.

* *shippingWeight* is the weight of the product in kilograms, ranging between 0.01 and 1.00 - this value is not known for every product in the collection.

4 Create an index on your shard key and shard the collection.

5 Once you've run the proper commands, click "Run Tests" to run a suite of tests that will check the configuration of your sharded cluster. The results of these tests will let you know which steps you've yet to complete.

If you chose the wrong shard key, clicking "Run Tests" will give you an error. However, if you already imported the dataset, you must drop the collection:

```javascript
use m103
db.products.drop()
```

Then reimport the dataset, and shard it using a different key.

#### Answer 4

```javascript
user@M103# mongoimport /dataset/products.json --port 26000 -u m103-admin -p m103-pass --authenticationDatabase admin -d m103 --collection products
2021-09-17T10:30:57.772+0000    connected to: mongodb://localhost:26000/
2021-09-17T10:30:59.785+0000    9966 document(s) imported successfully. 0 document(s) failed to import.
user@M103# mongo --port 26000 --username m103-admin --password m103-pass --authenticationDatabase admin
MongoDB shell version v4.0.5
connecting to: mongodb://127.0.0.1:26000/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("b44a002c-40dd-4810-a143-0540d2502364") }
MongoDB server version: 4.0.5
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        http://docs.mongodb.org/
Questions? Try the support group
        http://groups.google.com/group/mongodb-user
Server has startup warnings: 
2021-09-17T08:41:47.589+0000 I CONTROL  [main] ** WARNING: You are running this process as the root user, which is not recommended.
2021-09-17T08:41:47.589+0000 I CONTROL  [main] 
2021-09-17T08:41:47.589+0000 I CONTROL  [main] ** WARNING: This server is bound to localhost.
2021-09-17T08:41:47.589+0000 I CONTROL  [main] **          Remote systems will be unable to connect to this server. 
2021-09-17T08:41:47.589+0000 I CONTROL  [main] **          Start the server with --bind_ip <address> to specify which IP 
2021-09-17T08:41:47.589+0000 I CONTROL  [main] **          addresses it should serve responses from, or with --bind_ip_all to
2021-09-17T08:41:47.589+0000 I CONTROL  [main] **          bind to all interfaces. If this behavior is desired, start the
2021-09-17T08:41:47.589+0000 I CONTROL  [main] **          server with --bind_ip 127.0.0.1 to disable this warning.
2021-09-17T08:41:47.589+0000 I CONTROL  [main] 
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
        "_id" : 1,
        "minCompatibleVersion" : 5,
        "currentVersion" : 6,
        "clusterId" : ObjectId("61446d2a624f017fc12d8b07")
  }
  shards:
        {  "_id" : "shard1",  "host" : "shard1/localhost:27001,localhost:27002,localhost:27003",  "state" : 1 }
        {  "_id" : "shard2",  "host" : "shard2/localhost:27007,localhost:27008,localhost:27009",  "state" : 1 }
  active mongoses:
        "4.0.5" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                shard1  1
                        { "_id" : { "$minKey" : 1 } } -->> { "_id" : { "$maxKey" : 1 } } on : shard1 Timestamp(1, 0) 
        {  "_id" : "m103",  "primary" : "shard2",  "partitioned" : false,  "version" : {  "uuid" : UUID("0e526a4c-7018-4f95-8764-770e66bdcc5b"),  "lastMod" : 1 } }

mongos> use m103
switched to db m103
mongos> show collections
products
mongos> db.createCollection("products")
{
        "ok" : 1,
        "operationTime" : Timestamp(1631871290, 10),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1631871290, 10),
                "signature" : {
                        "hash" : BinData(0,"rtLLGLmlwKzjGKQWLFUnpUyhiNI="),
                        "keyId" : NumberLong("7008820150950428679")
                }
        }
}
mongos> show collections
products
mongos> sh.enableSharding("m103")
{
        "ok" : 1,
        "operationTime" : Timestamp(1631874945, 3),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1631874945, 3),
                "signature" : {
                        "hash" : BinData(0,"4X47KL6Trlp3VdMvMVrUNFuMSO8="),
                        "keyId" : NumberLong("7008846947251388443")
                }
        }
}
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
        "_id" : 1,
        "minCompatibleVersion" : 5,
        "currentVersion" : 6,
        "clusterId" : ObjectId("61446d2a624f017fc12d8b07")
  }
  shards:
        {  "_id" : "shard1",  "host" : "shard1/localhost:27001,localhost:27002,localhost:27003",  "state" : 1 }
        {  "_id" : "shard2",  "host" : "shard2/localhost:27007,localhost:27008,localhost:27009",  "state" : 1 }
  active mongoses:
        "4.0.5" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                shard1  1
                        { "_id" : { "$minKey" : 1 } } -->> { "_id" : { "$maxKey" : 1 } } on : shard1 Timestamp(1, 0) 
        {  "_id" : "m103",  "primary" : "shard2",  "partitioned" : true,  "version" : {  "uuid" : UUID("0e526a4c-7018-4f95-8764-770e66bdcc5b"),  "lastMod" : 1 } }
mongos> db.products.findOne()
{
        "_id" : ObjectId("573f7197f29313caab89b21b"),
        "sku" : 20000008,
        "name" : "Come Into The World - CD",
        "type" : "Music",
        "regularPrice" : 14.99,
        "salePrice" : 14.99,
        "shippingWeight" : "0.25"
}
mongos> db.products.createIndex( { "sku": 1 } )
{
        "raw" : {
                "shard2/localhost:27007,localhost:27008,localhost:27009" : {
                        "createdCollectionAutomatically" : false,
                        "numIndexesBefore" : 1,
                        "numIndexesAfter" : 2,
                        "ok" : 1
                }
        },
        "ok" : 1,
        "operationTime" : Timestamp(1631875312, 2),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1631875312, 2),
                "signature" : {
                        "hash" : BinData(0,"CYu/Ch4IPvKA5BLwy1oOrWhiWNg="),
                        "keyId" : NumberLong("7008846947251388443")
                }
        }
}
mongos> sh.shardCollection( "m103.products", { "sku": 1 } )
{
        "collectionsharded" : "m103.products",
        "collectionUUID" : UUID("b3874974-9312-446c-89e0-49db148066dd"),
        "ok" : 1,
        "operationTime" : Timestamp(1631875417, 12),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1631875417, 12),
                "signature" : {
                        "hash" : BinData(0,"plDM9YLtraPhx3mXNqDhVTjslXI="),
                        "keyId" : NumberLong("7008846947251388443")
                }
        }
}

// My trial
mongos> db.products.insert(
...   {
...     "sku" : 1000000749,
...     "name" : "MTG products",
...     "type" : "Sofware",
...     "regularPrice" : 39.95,
...     "salePrice" : 39.95,
...     "shippingWeight" : "0.01"
...   }
... )
WriteResult({ "nInserted" : 1 })
mongos> db.products.findOne()
{
        "_id" : ObjectId("614463c1e4d870a95347dbe9"),
        "sku" : 1000000749,
        "name" : "MTG products",
        "type" : "Sofware",
        "regularPrice" : 39.95,
        "salePrice" : 39.95,
        "shippingWeight" : "0.01"
}
mongos> sh.enableSharding("m103")
{
        "ok" : 1,
        "operationTime" : Timestamp(1631872193, 3),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1631872193, 3),
                "signature" : {
                        "hash" : BinData(0,"0EinMWIJ1gnMpUn4/7I7ctljmtQ="),
                        "keyId" : NumberLong("7008835836170993693")
                }
        }
}
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
        "_id" : 1,
        "minCompatibleVersion" : 5,
        "currentVersion" : 6,
        "clusterId" : ObjectId("6144630f1e0bd54452cc319f")
  }
  shards:
        {  "_id" : "shard1",  "host" : "shard1/localhost:27001,localhost:27002,localhost:27003",  "state" : 1 }
        {  "_id" : "shard2",  "host" : "shard2/localhost:27007,localhost:27008,localhost:27009",  "state" : 1 }
  active mongoses:
        "4.0.5" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                shard1  1
                        { "_id" : { "$minKey" : 1 } } -->> { "_id" : { "$maxKey" : 1 } } on : shard1 Timestamp(1, 0) 
        {  "_id" : "m103",  "primary" : "shard1",  "partitioned" : true,  "version" : {  "uuid" : UUID("be363122-66e5-4708-998b-e2bfaab09403"),  "lastMod" : 1 } }
mongos> db.products.createIndex( { "sku": 1 } )
{
        "raw" : {
                "shard1/localhost:27001,localhost:27002,localhost:27003" : {
                        "createdCollectionAutomatically" : false,
                        "numIndexesBefore" : 1,
                        "numIndexesAfter" : 2,
                        "ok" : 1
                }
        },
        "ok" : 1,
        "operationTime" : Timestamp(1631872453, 2),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1631872453, 2),
                "signature" : {
                        "hash" : BinData(0,"z05oDDgX0YFHY4dp2aosCGjEjKs="),
                        "keyId" : NumberLong("7008835836170993693")
                }
        }
}
mongos> sh.shardCollection( "m103.products", { "sku": 1 } )
{
        "collectionsharded" : "m103.products",
        "collectionUUID" : UUID("ee35eec4-233d-4078-875f-fb5586fcf6cf"),
        "ok" : 1,
        "operationTime" : Timestamp(1631872548, 14),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1631872548, 14),
                "signature" : {
                        "hash" : BinData(0,"SiBvXwOy8CsNFpkEptGiNDTw1ao="),
                        "keyId" : NumberLong("7008835836170993693")
                }
        }
}
```

### Chunks

So far, we've been briefly discussing the term *chunks* in a quite loose way. So let's take a few minutes to review what *chunks* are and what can we do with them. In a prior lecture, we've mentioned that the *config servers hold the cluster metadata*. Things like how many *shards we have, which databases are sharded, and the configuration settings of our shard cluster*. But one of the most important pieces of information that the *config servers hold, is the mapping of the chunks to shards*.

Right, let's jump into our terminal to see this in action. If I jump into the *config database and show the collections*, you'll see a long list of different *collections that hold information about this shard cluster*. Within the *chunks collection*, if we find one *db.chunks.findOne()* document, we will see the definition of a *chunk*. In this case, we can see what's the *name* space that this *chunk* belongs to? When was this *chunk* last modified? Which *shard holds this chunk*?

```javascript
mongos> show dbs
admin   0.000GB
config  0.001GB
m103    0.000GB
newDB   0.000GB
mongos> use config
switched to db config
mongos> show collections
actionlog
changelog
chunks
collections
databases
lockpings
locks
migrations
mongos
shards
tags
transactions
version
mongos> db.chunks.findOne()
{
    "_id" : "config.system.sessions-_id_MinKey",
    "lastmod" : Timestamp(1, 1),
    "lastmodEpoch" : ObjectId("613dd6b14bfc18c75b5ad4e6"),
    "ns" : "config.system.sessions",
    "min" : {
      "_id" : { "$minKey" : 1 }
    },
    "max" : {
      "_id" : {
        "id" : UUID("00400000-0000-0000-0000-000000000000")
      }
    },
    "shard" : "m103-example"
}
```

But more importantly, we can see the *chunk bound - the Min and max fields* indicate exactly that. But let's step back a little bit. Once we add documents in our *collections*, these documents contain *fields that we can use as shard keys*. For example, if we decide to use *field x as our shard key*, the minute we *shard our collection*, we immediately define *one initial chunk. This initial chunk goes from minKey to maxKey*.

An important thing to note is that *chunks lower bound is inclusive, while chunks upper bound is exclusive*. The different values that our *shard key* may hold will define the *keyspace of our sharding collection*. As time progresses, the *cluster will split up that initial chunk* into several others to allow data to be evenly distributed between *shards*. All documents of the *same chunk live in the same shard*. If we would have only one *magnanimous chunk*, we could only have one *single shard in our cluster*.

The number of *chunks that our shard key* allows may define the *max number of shards of our system*. This is why *cardinality of the shard key* is an important aspect to consider. There are other aspects that will determine the number of *chunks within your shard*. The first one is our *chunk size*. By default, *MongoDB takes 64 megabytes as the default chunk size*. That means that if a *chunk is about 64 megabytes, or within 64 megabytes range, it will be split*.

We can define a *chunk size* between the values of *one megabyte and 1024 as one gigabyte. The chunk size is configurable* during runtime. So if we decide to change a *chunk size*, we can easily do so. But before we go in changing our *chunk size*, let's have a look to how many *chunks* we currently hold. As you can see here, from our *sh.status()*, the *chunks mark tells me that shard -- m103-example has 1024 chunks*. But I want to lower my *chunk size* to see what happens.

```javascript
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
      "clusterId" : ObjectId("613c90dc078b9817172ec755")
  }
  shards:
        {  "_id" : "m103-example",  "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",  "state" : 1 }
  active mongoses:
        "3.6.23" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  5
        Last reported error:  Could not find host matching read preference { mode: "primary" } for set m103-example
        Time of Reported error:  Sat Sep 18 2021 09:53:56 GMT+0000 (UTC)
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                m103-example 1024
                        too many chunks to print, use verbose if you want to force print
        {  "_id" : "m103",  "primary" : "m103-example",  "partitioned" : true }
        {  "_id" : "newDB",  "primary" : "m103-example",  "partitioned" : false }
```

To do that, what I need to do is, basically, go to my *settings collection and save a document with ID chunk size*, with the determined value that I intend the *chunk size to be, in megabytes*. Once I've done so, if I run again, *sh.status()*, I can see that nothing changed. Well, why? Well, the component responsible for the thing is the *mongos*, and since we have not given any indication or signal to *mongos* that it needs to split anything -- because no new data came in -- it will basically do absolutely nothing. *If something is working, why will Porter bother trying to fix it?*

```javascript
mongos> use config
switched to db config
mongos> db.settings.save({_id: "chunksize", value: 2})
WriteResult({ "nMatched" : 0, "nUpserted" : 1, "nModified" : 0, "_id" : "chunksize" })
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
      "clusterId" : ObjectId("613c90dc078b9817172ec755")
  }
  shards:
        {  "_id" : "m103-example",  "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",  "state" : 1 }
  active mongoses:
        "3.6.23" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  5
        Last reported error:  Could not find host matching read preference { mode: "primary" } for set m103-example
        Time of Reported error:  Sat Sep 18 2021 09:53:56 GMT+0000 (UTC)
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                m103-example 1024
                        too many chunks to print, use verbose if you want to force print
        {  "_id" : "m103",  "primary" : "m103-example",  "partitioned" : true }
        {  "_id" : "newDB",  "primary" : "m103-example",  "partitioned" : false }
```

So, for us to see some action going on, what we need to do is tell the *mongos* to actually do something. So I'm going to go ahead and *import this other file, products part 2* that I just recently changed, so I can see some *splitting* going on. Once I *import this data*, we'll connect back to see if there is any more *chunks*. Right, sweet. So we're done with our *imports*, so let's connect back. And again, let's do our *sh.status()* for a second. Sweet.

```javascript
vagrant@vagrant:~$ vim products_2.json
vagrant@vagrant:~$ sudo mkdir -p /var/mongodb/db/products_2.json
vagrant@vagrant:~$ ls
csrs_1.conf  csrs_2.conf  csrs_3.conf  mongos.conf  node1.conf  node2.conf  node3.conf  products_2.json
vagrant@vagrant:~$ mongoimport products_2.json --drop --port 26000 -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin" --db m103 --collection products
2021-09-20T19:08:58.637+0000 connected to: localhost:26000
2021-09-20T19:08:58.641+0000 dropping: m103.products
2021-09-20T19:09:01.613+0000 [################........] m103.products 989KB/1.42MB (68.2%)
2021-09-20T19:09:03.064+0000 [########################] m103.products 1.42MB/1.42MB (100.0%)
2021-09-20T19:09:03.066+0000 imported 8829 documents

// Import and shard a collection of data on your cluster
mongos> db.products.createIndex( { "sku": 1 } )
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
    "operationTime" : Timestamp(1632166289, 1),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1632166289, 1),
      "signature" : {
        "hash" : BinData(0,"IJRyQd6xkUE31uJHBN8x0tEspJ4="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
mongos> sh.shardCollection( "m103.products", { "sku": 1 } )
{
    "collectionsharded" : "m103.products",
    "collectionUUID" : UUID("1359746f-fd2e-4883-8af1-c7354a2ea3e6"),
    "ok" : 1,
    "operationTime" : Timestamp(1632166401, 9),
    "$clusterTime" : {
      "clusterTime" : Timestamp(1632166401, 9),
      "signature" : {
        "hash" : BinData(0,"tmeuSYol2An0IE6xAdLpAtbGVko="),
        "keyId" : NumberLong("7006634394848854025")
      }
    }
}
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
      "clusterId" : ObjectId("613c90dc078b9817172ec755")
  }
  shards:
        {  "_id" : "m103-example",  "host" : "m103-example/localhost:27011,localhost:27012,localhost:27013",  "state" : 1 }
  active mongoses:
        "3.6.23" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  5
        Last reported error:  Could not find host matching read preference { mode: "primary" } for set m103-example
        Time of Reported error:  Mon Sep 20 2021 18:53:20 GMT+0000 (UTC)
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                m103-example 1024
                        too many chunks to print, use verbose if you want to force print
        {  "_id" : "m103",  "primary" : "m103-example",  "partitioned" : true }
                m103.products
                        shard key: { "sku" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                m103-example 1
                        { "sku" : { "$minKey" : 1 } } -->> { "sku" : { "$maxKey" : 1 } } on : m103-example Timestamp(1, 0) 
        {  "_id" : "newDB",  "primary" : "m103-example",  "partitioned" : false }
```

Now I have a lot more *chunks*, all kind of still not very well balanced, but that's fine. It will take them some time to actually balance everything between all *shards*. But, the good thing is that, I no longer have just *one and two chunks* spread across *two different shards*. I have around *51 chunks* right now. And if I run it again, I'll see that, eventually, the system will be balanced. Another aspect that will be important for the *number of chunks* that we can generate will be the *shard key values frequency*.

Now, let's consider that the chosen shard key wasn't that good after all. Although the cardinality initially was very good, we have an abnormal high frequency of some keys over time. So let's say, for example, if 90% of our new documents have the same shard key value, this might generate an abnormal situation. What do we call jumbo chunks? Jumbo chunks can be damaging because they are chunks which are way larger than the default or defined chunk size. The minute a chunk becomes larger than the defined chunk size, they will be marked as jumbo chunks.

Jumbo chunks cannot be moved. If the balancer sees a chunk which is marked as jumbo, you will not even try to balance it. You will just leave it in its place, because it's basically marked as too big to be moved. In very extreme cases, there will be no split point on those chunks, and therefore, they will not be able to be moved at all, or even split, and that can be very, very damaging situation. So, keep an eye for that.

> Please do consider the frequency of our shard key, to avoid situations like jumbo chunks as much as possible.

So, let's recap. Chunks are logical groups of documents that are based out of the shard key key space, and have bounds associated to it. Min bound, inclusive. Max bound, exclusive. A chunk can only live at one designated shard at the time. And all documents within the bound defined by the chunk live in the same shard. Shard key cardinality frequency and configured chunk size will determine the number of chunks in your sharded collection.
