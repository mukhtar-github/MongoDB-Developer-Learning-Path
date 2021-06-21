# MongoDB Lessons

## Chapter 1: What is MongoDB?

## Chapter 2: Importing, Exporting, and Querying Data

> JSON - Importing (mongoimport), Exporting (mongoexport)

> BSON - Importing (mongorestore), Exporting (mongodump).

### Example 1a -  Exporting BSON file.

* mongodump allows us to get the data we looking for in BSON form.

* mongodump --uri <Atlas Cluster URI> - Exports data in BSON.

* mongodump --uri "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.-----.mongodb.net/sample_supplies

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongodump --uri "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.-----.mongodb.net/sample_supplies"
2021-06-13T13:56:51.445+0100	WARNING: On some systems, a password provided directly in a connection string or using --uri may be visible to system status programs such as `ps` that may be invoked by other users. Consider omitting the password to provide it via stdin, or using the --config option to specify a configuration file with the password.
2021-06-13T13:56:57.149+0100	writing sample_supplies.sales to dump/sample_supplies/sales.bson
2021-06-13T13:56:57.450+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T13:57:00.450+0100	[........................]  sample_supplies.sales  101/5000  (2.0%)
2021-06-13T13:57:03.449+0100	[........................]  sample_supplies.sales  101/5000  (2.0%)
2021-06-13T13:57:06.450+0100	[........................]  sample_supplies.sales  101/5000  (2.0%)
2021-06-13T13:57:08.039+0100	[########################]  sample_supplies.sales  5000/5000  (100.0%)
2021-06-13T13:57:08.042+0100	done dumping sample_supplies.sales (5000 documents)
mukhtar@mukhtar-Aspire-ES1-431:~$ ls
30-soc-tools  cloud_haiku  Documents  dump         IdeaProjects  Pictures  Public  SVG-images  Videos
blender_docs  Desktop      Downloads  es6-tooling  Music         Postman   snap    Templates   wget-log
mukhtar@mukhtar-Aspire-ES1-431:~$ cd dump
mukhtar@mukhtar-Aspire-ES1-431:~/dump$ ls
admin  mongo-exercises  playground  sample_supplies
mukhtar@mukhtar-Aspire-ES1-431:~/dump$ cd sample_supplies
mukhtar@mukhtar-Aspire-ES1-431:~/dump/sample_supplies$ ls
sales.bson  sales.metadata.json
mukhtar@mukhtar-Aspire-ES1-431:~/dump/sample_supplies$ less sales.bson (to see the bson format)
```

### Example 1b - Exporting JSON file.

* mongoexport stores the JSON format of the same data.

* mongoexport --uri "<Atlas Cluster URI>" --collection=<collection name> --out=<filename>.json - Exports data in JSON.

* mongoexport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.-----.mongodb.net/sample_supplies" --collection=sales --out=sales.json.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongoexport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.-----.mongodb.net/sample_supplies" --collection=sales --out=sales.json
2021-06-13T14:39:55.084+0100	connected to: mongodb+srv://[**REDACTED**]@cluster0.----.mongodb.net/sample_supplies
2021-06-13T14:39:56.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:39:57.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:39:58.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:39:59.367+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:00.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:01.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:02.367+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:03.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:04.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:05.367+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:05.952+0100	[########################]  sample_supplies.sales  5000/5000  (100.0%)
2021-06-13T14:40:05.952+0100	exported 5000 records
mukhtar@mukhtar-Aspire-ES1-431:~$ less sales.json (to see the json format)
```

### Example 2a -  Importing BSON file.

* Since we just created a binary database dump, let's see if we can import it back to the source.

* mongorestore --uri "<Atlas Cluster URI>" --drop dump - Imports data in BSON dump.

* mongorestore --uri "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dkemg.mongodb.net/sample_supplies" --drop dump

* mongorestore  dump/

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongorestore  dump/
2021-06-15T06:12:09.393+0100	preparing collections to restore from
2021-06-15T06:12:09.422+0100	reading metadata for sample_supplies.sales from dump/sample_supplies/sales.metadata.json
2021-06-15T06:12:10.730+0100	finished restoring sample_supplies.sales (5000 documents, 0 failures)
2021-06-15T06:12:10.730+0100	5000 document(s) restored successfully.

mukhtar@mukhtar-Aspire-ES1-431:~$ mongorestore  --drop dump/
2021-06-15T06:28:10.648+0100	preparing collections to restore from
2021-06-15T06:28:10.915+0100	reading metadata for playground.courses from dump/playground/courses.metadata.json
2021-06-15T06:28:11.114+0100	reading metadata for mongo-exercises.courses from dump/mongo-exercises/courses.metadata.json
2021-06-15T06:28:11.136+0100	reading metadata for sample_supplies.sales from dump/sample_supplies/sales.metadata.json
2021-06-15T06:28:11.237+0100	restoring playground.courses from dump/playground/courses.bson
2021-06-15T06:28:11.271+0100	no indexes to restore
2021-06-15T06:28:11.271+0100	finished restoring playground.courses (2 documents, 0 failures)
2021-06-15T06:28:11.537+0100	restoring mongo-exercises.courses from dump/mongo-exercises/courses.bson
2021-06-15T06:28:11.550+0100	no indexes to restore
2021-06-15T06:28:11.550+0100	finished restoring mongo-exercises.courses (7 documents, 0 failures)
2021-06-15T06:28:11.636+0100	restoring sample_supplies.sales from dump/sample_supplies/sales.bson
2021-06-15T06:28:12.143+0100	no indexes to restore
2021-06-15T06:28:12.143+0100	finished restoring sample_supplies.sales (5000 documents, 0 failures)
2021-06-15T06:28:12.143+0100	5009 document(s) restored successfully. 0 document(s) failed to restore.
```

Example 2b -  Importing JSON file.

* This command allows us to import a database into a MongoDB instance, which in our case is an Atlas Cluster.

* mongoimport --uri "<Atlas Cluster URI>" --drop=<filename>.json - Imports data in JSON.

* mongoimport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dkemg.mongodb.net/sample_supplies" --drop sales.json

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongoimport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dkemg.mongodb.net/sample_supplies" --drop sales.json
2021-06-15T06:42:41.906+0100	no collection specified
2021-06-15T06:42:41.906+0100	using filename 'sales' as collection
2021-06-15T06:42:45.441+0100	connected to: mongodb+srv://[**REDACTED**]@cluster0.dkemg.mongodb.net/sample_supplies
2021-06-15T06:42:45.781+0100	dropping: sample_supplies.sales
2021-06-15T06:42:48.442+0100	[####....................] sample_supplies.sales	848KB/4.01MB (20.7%)
2021-06-15T06:42:51.442+0100	[#########...............] sample_supplies.sales	1.63MB/4.01MB (40.6%)
2021-06-15T06:42:54.442+0100	[##############..........] sample_supplies.sales	2.44MB/4.01MB (60.9%)
2021-06-15T06:42:57.442+0100	[########################] sample_supplies.sales	4.01MB/4.01MB (100.0%)
2021-06-15T06:42:57.727+0100	[########################] sample_supplies.sales	4.01MB/4.01MB (100.0%)
2021-06-15T06:42:57.727+0100	5000 document(s) imported successfully. 0 document(s) failed to import.
```

### MongoDB Lessons (Importing Exporting and Querying Data)

#### Find Command

> show database - shows the list of databases that are in the cluster.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> show dbs
admin               0.000GB
local               5.732GB
sample_airbnb       0.051GB
sample_analytics    0.009GB
sample_geospatial   0.001GB
sample_mflix        0.041GB
sample_restaurants  0.006GB
sample_supplies     0.001GB
sample_training     0.045GB
sample_weatherdata  0.002GB
```

> To indicate that we will now be working with the 'sample_training' database, we issue the 'use sample_training' command.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> use sample_training
switched to db sample_training
```

> To view the 'collections' in the database, we issue the 'show collections' command.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> show collections
companies
grades
inspections
posts
routes
trips
zips
```

> To query the 'zips' collection, we issue a 'find' command, which works like this 'db.zips.find({"state": "NY"})'.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({"state": "NY"})
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f89"), "city" : "FISHERS ISLAND", "zip" : "06390", "loc" : { "y" : 41.263934, "x" : 72.017834 }, "pop" : 329, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f8a"), "city" : "NEW YORK", "zip" : "10001", "loc" : { "y" : 40.74838, "x" : 73.996705 }, "pop" : 18913, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f8b"), "city" : "NEW YORK", "zip" : "10003", "loc" : { "y" : 40.731253, "x" : 73.989223 }, "pop" : 51224, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f8c"), "city" : "GOVERNORS ISLAND", "zip" : "10004", "loc" : { "y" : 40.693604, "x" : 74.019025 }, "pop" : 3593, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f8d"), "city" : "NEW YORK", "zip" : "10005", "loc" : { "y" : 40.705649, "x" : 74.008344 }, "pop" : 202, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f8f"), "city" : "NEW YORK", "zip" : "10006", "loc" : { "y" : 40.708451, "x" : 74.013474 }, "pop" : 119, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f90"), "city" : "NEW YORK", "zip" : "10009", "loc" : { "y" : 40.726188, "x" : 73.979591 }, "pop" : 57426, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f92"), "city" : "NEW YORK", "zip" : "10010", "loc" : { "y" : 40.737476, "x" : 73.981328 }, "pop" : 24907, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f93"), "city" : "NEW YORK", "zip" : "10002", "loc" : { "y" : 40.715231, "x" : 73.987681 }, "pop" : 84143, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f94"), "city" : "NEW YORK", "zip" : "10012", "loc" : { "y" : 40.72553, "x" : 73.998284 }, "pop" : 26365, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f95"), "city" : "NEW YORK", "zip" : "10011", "loc" : { "y" : 40.740225, "x" : 73.99963 }, "pop" : 46560, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f96"), "city" : "NEW YORK", "zip" : "10007", "loc" : { "y" : 40.713905, "x" : 74.007022 }, "pop" : 3374, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f97"), "city" : "NEW YORK", "zip" : "10013", "loc" : { "y" : 40.718511, "x" : 74.002529 }, "pop" : 21860, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f98"), "city" : "NEW YORK", "zip" : "10014", "loc" : { "y" : 40.73393, "x" : 74.005421 }, "pop" : 31147, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f9a"), "city" : "NEW YORK", "zip" : "10017", "loc" : { "y" : 40.75172, "x" : 73.970661 }, "pop" : 12465, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f9b"), "city" : "NEW YORK", "zip" : "10018", "loc" : { "y" : 40.754713, "x" : 73.992503 }, "pop" : 4834, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f9c"), "city" : "NEW YORK", "zip" : "10019", "loc" : { "y" : 40.765069, "x" : 73.985834 }, "pop" : 36602, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72f9f"), "city" : "NEW YORK", "zip" : "10020", "loc" : { "y" : 40.759729, "x" : 73.982347 }, "pop" : 393, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72fa0"), "city" : "NEW YORK", "zip" : "10021", "loc" : { "y" : 40.768476, "x" : 73.958805 }, "pop" : 106564, "state" : "NY" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca72fa1"), "city" : "NEW YORK", "zip" : "10016", "loc" : { "y" : 40.744281, "x" : 73.978134 }, "pop" : 51561, "state" : "NY" }
Type "it" for more
```

> To view the next 20 documents with 'state New York', type 'it', which stands for iterate. This command allows us to
iterate through the 'cursor', which is an object that the 'find' command returns. Formerly, a 'cursor' is a pointer to the result set of a query. A 'pointer' is a direct address to the memory location.

> To find how many 'zip code' are there in New York, we add a 'count' operation at the end of the 'find' command, like this 'db.zips.find({"state": "NY"}).count()'.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({"state": "NY"}).count()
1596
```

> What about the documents that are in New York, but also in the city of Albany?

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({"state": "NY", "city": "ALBANY"}).count()
7
```

> We added the city of Albany criteria to the query, and kept the count option in place.

> To view the data in a nice, more readable way, and to see the structure of each document, and preferably each 'field value' pair should be placed on a separate line. To achieve that, we can use the 'pretty()' directive.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({"state": "NY", "city": "ALBANY"}).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca731d0"),
	"city" : "ALBANY",
	"zip" : "12204",
	"loc" : {
		"y" : 42.684667,
		"x" : 73.735364
	},
	"pop" : 6927,
	"state" : "NY"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca731d4"),
	"city" : "ALBANY",
	"zip" : "12206",
	"loc" : {
		"y" : 42.668326,
		"x" : 73.774406
	},
	"pop" : 17230,
	"state" : "NY"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca731d5"),
	"city" : "ALBANY",
	"zip" : "12207",
	"loc" : {
		"y" : 42.658133,
		"x" : 73.752327
	},
	"pop" : 2709,
	"state" : "NY"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca731d6"),
	"city" : "ALBANY",
	"zip" : "12208",
	"loc" : {
		"y" : 42.655989,
		"x" : 73.796357
	},
	"pop" : 22041,
	"state" : "NY"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca731d7"),
	"city" : "ALBANY",
	"zip" : "12209",
	"loc" : {
		"y" : 42.641665,
		"x" : 73.785385
	},
	"pop" : 10008,
	"state" : "NY"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca731db"),
	"city" : "ALBANY",
	"zip" : "12202",
	"loc" : {
		"y" : 42.641314,
		"x" : 73.764071
	},
	"pop" : 11097,
	"state" : "NY"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca731de"),
	"city" : "ALBANY",
	"zip" : "12210",
	"loc" : {
		"y" : 42.65677,
		"x" : 73.76052
	},
	"pop" : 9374,
	"state" : "NY"
}
```

> If you issue the 'find' command without a query like so 'db.zips.find( {} )'. The first 20 documents of the collection will present themselves to you.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find( {} )
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed16"), "city" : "ALPINE", "zip" : "35014", "loc" : { "y" : 33.331165, "x" : 86.208934 }, "pop" : 3062, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed17"), "city" : "BESSEMER", "zip" : "35020", "loc" : { "y" : 33.409002, "x" : 86.947547 }, "pop" : 40549, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed18"), "city" : "ACMAR", "zip" : "35004", "loc" : { "y" : 33.584132, "x" : 86.51557 }, "pop" : 6055, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed19"), "city" : "BAILEYTON", "zip" : "35019", "loc" : { "y" : 34.268298, "x" : 86.621299 }, "pop" : 1781, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed1a"), "city" : "HUEYTOWN", "zip" : "35023", "loc" : { "y" : 33.414625, "x" : 86.999607 }, "pop" : 39677, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed1b"), "city" : "BLOUNTSVILLE", "zip" : "35031", "loc" : { "y" : 34.092937, "x" : 86.568628 }, "pop" : 9058, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed1c"), "city" : "BRIERFIELD", "zip" : "35035", "loc" : { "y" : 33.042747, "x" : 86.951672 }, "pop" : 1282, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed1d"), "city" : "BREMEN", "zip" : "35033", "loc" : { "y" : 33.973664, "x" : 87.004281 }, "pop" : 3448, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed1e"), "city" : "ADGER", "zip" : "35006", "loc" : { "y" : 33.434277, "x" : 87.167455 }, "pop" : 3205, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed1f"), "city" : "ADAMSVILLE", "zip" : "35005", "loc" : { "y" : 33.588437, "x" : 86.959727 }, "pop" : 10616, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed20"), "city" : "CENTREVILLE", "zip" : "35042", "loc" : { "y" : 32.950324, "x" : 87.11924 }, "pop" : 4902, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed21"), "city" : "CALERA", "zip" : "35040", "loc" : { "y" : 33.1098, "x" : 86.755987 }, "pop" : 4675, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed22"), "city" : "CHELSEA", "zip" : "35043", "loc" : { "y" : 33.371582, "x" : 86.614132 }, "pop" : 4781, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed23"), "city" : "ARAB", "zip" : "35016", "loc" : { "y" : 34.328339, "x" : 86.489638 }, "pop" : 13650, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed24"), "city" : "KEYSTONE", "zip" : "35007", "loc" : { "y" : 33.236868, "x" : 86.812861 }, "pop" : 14218, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed25"), "city" : "NEW SITE", "zip" : "35010", "loc" : { "y" : 32.941445, "x" : 85.951086 }, "pop" : 19942, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed26"), "city" : "BRENT", "zip" : "35034", "loc" : { "y" : 32.93567, "x" : 87.211387 }, "pop" : 3791, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed27"), "city" : "COOSA PINES", "zip" : "35044", "loc" : { "y" : 33.266928, "x" : 86.337622 }, "pop" : 7985, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed28"), "city" : "CLANTON", "zip" : "35045", "loc" : { "y" : 32.835532, "x" : 86.642472 }, "pop" : 13990, "state" : "AL" }
{ "_id" : ObjectId("5c8eccc1caa187d17ca6ed29"), "city" : "CLEVELAND", "zip" : "35049", "loc" : { "y" : 33.992106, "x" : 86.559355 }, "pop" : 2369, "state" : "AL" }
Type "it" for more
```

## Chapter 3: Creating and Manipulating Documents

### Inserting New Documents - ObjectId

* *"_id"* - serves as a unique identifier for a document in a collection, and it is required in every *MongoDB* document.

* *ObjectId()* is the default value for the *"_id"* field, unless otherwise specified.

* We learned how to insert documents into a collection using *Insert Document* from the *Data Explorer*. And the document was found by searching in the *Filter Field* of the *Data Explorer*, with the key words *{"business_name": "GARBA AND SONS"}*, then, using *Find* from the *Data Explorer* as well.

```javascript
_id: ObjectId("60cf5489b579883e83e6a77b")
id: "1234876-2020-CPLM"
certificate_number: 7834123
business_name: "GARBA AND SONS"
date: 2015-02-11T23:00:00.000+00:00
result: "No Casualties"
sector: "Organizational"
address: Object
```

### Inserting New Documents - insert() and errors

* When we try to insert a collection to a database that already contains the same documents, we get alot of the same error. The insertion did not succeed because a document with the exact *id* value already exsits.

* This is why we need to add the *drop* option. This way we remove the whole collection before inserting it back, thus eliminating the duplicate key issue.

* Ofcourse, *importing* entire collections is not the only way to insert documents using the *mongo shell*. Another way is to use the *insert* command.

How can we insert new documents into a collection using the Mongo shell?

Now that we learned about the ObjectId and its role, we can backtrack a little bit and talk about a scenario where we insert a lot of documents at a time, such as this *mongoimport* command.

When I try to insert a collection to a database that already contains the same documents, we get a lot of the same error.

If we read what the error says, things may become a little clearer.

The error says duplicate key error followed by a namespace for the collection and the ID value of a document that we attempted to insert.

The insertion did not succeed because a document with this exact ID value already exists.

This is why we need to add the drop option.

This way we remove the whole collection before inserting it back, thus eliminating the duplicate key issue.

Of course, importing entire collections is not the only way to insert documents using the Mongo shell.

Another way is to use the insert command.

As my first try, I want to see if I can replicate the duplicate ID error.

Step one, connect to the Atlas cluster *mongo "mongodb+srv://username:password@<cluster.mongodb.net/admin"*.

Step two, navigate to the database that we need *use sample_training*.

Step three, get a random document from a collection *db.inspections.findOne();*.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.findOne();
{
	"_id" : ObjectId("56d61033a378eccde8a8355f"),
	"id" : "10423-2015-CMPL",
	"certificate_number" : 9304139,
	"business_name" : "LISANDRO CABRERA",
	"date" : "Jul 17 2015",
	"result" : "No Violation Issued",
	"sector" : "Mobile Food Vendor - 881",
	"address" : {
		"city" : "BRONX",
		"zip" : 10475,
		"street" : "PALMER AVE",
		"number" : 2234
	}
}
```

This is our first time using findOne.

This function is good to have when you're looking for some document that matches a certain query, or to get a general idea about the shape of documents in a collection.

This is a rare case, because most of the time, when a collection is queried, the goal is to get all of the documents that match the query, not just one.

Plus, when you get just one document, you don't know if this is the only document that matches the query or if there are others.

But this function is excellent for the purpose of this example, which is why you're seeing it now.

Step four, copy this random document.

Finally, let's try to insert it into the collection.

See if we get a duplicate key error.

It worked.

We have a duplicate key error.

The response tells us that the number of inserted documents after this command was zero.

And there was a write error, meaning that writing this document to the collection did not succeed.

Great.

This means that we cannot insert documents with identical _id values into the collection.

What happens if we remove the _id field and try to insert this document again?

I just hit the up arrow on my keyboard to get the previously issued command.

Then, I navigate all the way to the _id field and its value, delete this part of the document that I'm trying to insert, and hit Enter.

This worked.

And the response from the database is that the number of inserted documents is one, which is exactly how many documents we tried to insert.

Let's investigate.

I'm going to create a find query looking for all inspections with this ID and certificate number, just to be safe.

Let's not forget to ask for the output to be pretty.

The two documents look identical, except for the _id value.

But we didn't add the _id field when we were inserting the document, you might say.

That is correct.

We did not.

However, it got added automatically upon insertion, and it got assigned a generated ObjectId value.

MongoDB allows you to have documents identical in their content, as long as the _id values are different between those documents.

MongoDB also allows you to prevent inserting identical documents if you choose to manage your database that way.

To place restrictions on the document content that is being inserted, you can check out the MongoDB schema validation functionality, which is unfortunately not part of this course.

The main idea behind the way that insertion and document structure, in general, work in MongoDB, is that there is flexibility in how you choose to use it.

And that's the beauty of it.
