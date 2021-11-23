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

In this lesson we'll walk through setting up a free Atlast account connecting a new free tier *MongoDB cluster* and importing the sample data that we'll use through out this course. We're Atlas because it is the easiest path for setting up a *MongoDB data store*. While you can complete this course using a local installation of *MongoDB*, we assume Atlas is being used
