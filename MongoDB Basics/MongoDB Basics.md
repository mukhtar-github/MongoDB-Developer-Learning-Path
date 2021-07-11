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

How can we insert new documents into a collection using the Mongo shell? Now that we learned about the ObjectId and its role, we can backtrack a little bit and talk about a scenario where we insert a lot of documents at a time, such as this *mongoimport* command. When I try to insert a collection to a database that already contains the same documents, we get a lot of the same error. If we read what the error says, things may become a little clearer. The error says duplicate key error followed by a namespace for the collection and the ID value of a document that we attempted to insert.

The insertion did not succeed because a document with this exact ID value already exists. This is why we need to add the drop option. This way we remove the whole collection before inserting it back, thus eliminating the duplicate key issue. Of course, importing entire collections is not the only way to insert documents using the Mongo shell. Another way is to use the insert command.

As my first try, I want to see if I can replicate the duplicate ID error. Step one, connect to the Atlas cluster *mongo "mongodb+srv://username:password@<cluster.mongodb.net/admin"*. Step two, navigate to the database that we need *use sample_training*. Step three, get a random document from a collection *db.inspections.findOne();*.

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

This is our first time using *findOne*. This function is good to have when you're looking for some document that matches a certain query, or to get a general idea about the shape of documents in a collection. This is a rare case, because most of the time, when a collection is queried, the goal is to get all of the documents that match the query, not just one. Plus, when you get just one document, you don't know if this is the only document that matches the query or if there are others.
But this function is excellent for the purpose of this example, which is why you're seeing it now. Step four, copy this random document. Finally, let's try to insert it into the collection. See if we get a duplicate key error.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.insert({
...       "_id" : ObjectId("56d61033a378eccde8a8354f"),
...       "id" : "10021-2015-ENFO",
...       "certificate_number" : 9278806,
...       "business_name" : "ATLIXCO DELI GROCERY INC.",
...       "date" : "Feb 20 2015",
...       "result" : "No Violation Issued",
...       "sector" : "Cigarette Retail Dealer - 127",
...       "address" : {
...               "city" : "RIDGEWOOD",
...               "zip" : 11385,
...               "street" : "MENAHAN ST",
...               "number" : 1712
...          }
...   })
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "E11000 duplicate key error collection: sample_training.inspections index: _id_ dup key: { _id: ObjectId('56d61033a378eccde8a8354f') }"
	}
})
```

It worked. We have a duplicate key error. The response tells us that the number of inserted documents after this command was zero. And there was a write error, meaning that writing this document to the collection did not succeed. Great. This means that we cannot insert documents with identical *_id* values into the collection. What happens if we remove the *_id* field and try to insert this document again? I just hit the up arrow on my keyboard to get the previously issued command.Then, I navigate all the way to the _id field and its value, delete this part of the document that I'm trying to insert, and hit Enter.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.insert({ "id" : "10021-2015-ENFO",       "certificate_number" : 9278806,       "business_name" : "ATLIXCO DELI GROCERY INC.",       "date" : "Feb 20 2015",       "result" : "No Violation Issued",       "sector" : "Cigarette Retail Dealer - 127",       "address" : {               "city" : "RIDGEWOOD",               "zip" : 11385,               "street" : "MENAHAN ST",               "number" : 1712          }   })
WriteResult({ "nInserted" : 1 })
```

This worked. And the response from the database is that the number of inserted documents is one, which is exactly how many documents we tried to insert. Let's investigate. I'm going to create a find query looking for all inspections with this ID and certificate number, just to be safe. Let's not forget to ask for the output to be pretty.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.find({"id" : "10021-2015-ENFO", "certificate_number" : 9278806}).pretty()
{
	"_id" : ObjectId("56d61033a378eccde8a8354f"),
	"id" : "10021-2015-ENFO",
	"certificate_number" : 9278806,
	"business_name" : "ATLIXCO DELI GROCERY INC.",
	"date" : "Feb 20 2015",
	"result" : "No Violation Issued",
	"sector" : "Cigarette Retail Dealer - 127",
	"address" : {
		"city" : "RIDGEWOOD",
		"zip" : 11385,
		"street" : "MENAHAN ST",
		"number" : 1712
	}
}
{
	"_id" : ObjectId("60d0383080680a0009339523"),
	"id" : "10021-2015-ENFO",
	"certificate_number" : 9278806,
	"business_name" : "ATLIXCO DELI GROCERY INC.",
	"date" : "Feb 20 2015",
	"result" : "No Violation Issued",
	"sector" : "Cigarette Retail Dealer - 127",
	"address" : {
		"city" : "RIDGEWOOD",
		"zip" : 11385,
		"street" : "MENAHAN ST",
		"number" : 1712
	}
}
```

The two documents look identical, except for the *_id* value. But we didn't add the *_id* field when we were inserting the document, you might say. That is correct. We did not. However, it got added automatically upon insertion, and it got assigned a generated ObjectId value. *MongoDB* allows you to have documents identical in their content, as long as the *_id* values are different between those documents. *MongoDB* also allows you to prevent inserting identical documents if you choose to manage your database that way.

To place restrictions on the document content that is being inserted, you can check out the MongoDB schema validation functionality, which is unfortunately not part of this course. The main idea behind the way that insertion and document structure, in general, work in MongoDB, is that there is flexibility in how you choose to use it. And that's the beauty of it.

### Inserting New Documents - insert() order

Can we also *insert* multiple documents at a time, and how that work? Here's the syntax for that operation, *db.inspections.insert([ { "test": 1 }, { "test": 2 }, { "test": 3 } ])*. I used the command *insert*, and to add multiple documents, I placed them into an *array* by surrounding them with square brackets. These documents each have only one field called *test*. So they do not match the rest of the documents in this collection, in structure and in content. But that's still allowed by *MongoDB*, and is definitely very convinient for the purposes of this lesson.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.insert([ { "test": 1 }, { "test": 2 }, { "test": 3 } ])
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 3,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

The response from this command conveys alot of information about how this operation went, so far, so good. We see no errors, and all three documents were added to the collection.

Now we're going to try to insert these three documents into the collection again, and hope that this will produce a duplicate key error. Because these documents are duplicates over the ones that we inserted earlier.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.insert([ { "test": 1 }, { "test": 2 }, { "test": 3 } ])
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 3,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

This didn't work. We did not get the duplicate key error. Why is that? This is because we did not specify the underscore ID values for any of the documents that we inserted. This means that no duplicate IDs were generated. Each one of those now six inserted documents has it's own unique underscore ID value. Well, I would still love to demonstrate a duplicate key error. So let's do that within one action.

```javascript
db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 }, { "_id": 3, "test": 3 }])
```

Here, *test 1 & test 2* have the same underscore ID value,which equals to 1. Let's hope this fails.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 },
... { "_id": 3, "test": 3 }])
BulkWriteResult({
	"writeErrors" : [
		{
			"index" : 1,
			"code" : 11000,
			"errmsg" : "E11000 duplicate key error collection: sample_training.inspections index: _id_ dup key: { _id: 1.0 }",
			"op" : {
				"_id" : 1,
				"test" : 2
			}
		}
	],
	"writeConcernErrors" : [ ],
	"nInserted" : 1,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

And it does, but only kind of. One document is still inserted. Was it *test 1, test 2, or test 3*, the one without the duplicate key in it?

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.find({ "_id": 1 })
{ "_id" : 1, "test" : 1 }
```

Looks like it was *test 1*. This doesn't seem right. There were two documents that had unique underscore ID values. Why did only one of them get inserted? The error clearly states that the problem document was *test 2*. But we know nothing about *test 3*. This is because, when many documents are inserted, the default behavior is to insert them in the order in which they are listed in the array, but we can change that. All we need to do is add the *ordered* option in the *insert* command.

```javascript
db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 }, { "_id": 3, "test": 3 }],{ "ordered": false })
```

Now all documents with unique underscore ID values will be inserted, and all the documents that have duplicate unique underscore ID values will produce their own error.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 },
...{ "_id": 3, "test": 3 }],{ "ordered": false })
BulkWriteResult({
	"writeErrors" : [
		{
			"index" : 0,
			"code" : 11000,
			"errmsg" : "E11000 duplicate key error collection: sample_training.inspections index: _id_ dup key: { _id: 1.0 }",
			"op" : {
				"_id" : 1,
				"test" : 1
			}
		},
		{
			"index" : 1,
			"code" : 11000,
			"errmsg" : "E11000 duplicate key error collection: sample_training.inspections index: _id_ dup key: { _id: 1.0 }",
			"op" : {
				"_id" : 1,
				"test" : 2
			}
		}
	],
	"writeConcernErrors" : [ ],
	"nInserted" : 1,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

So, *test 1* is a duplicate key error, because that is the only document that got inserted in the previous bulk insert. Also, *test 2* is a duplicate key error, because it also shares the same underscore ID value. And *test 3*, the innocent bystander in this diplicate key drama, finally got inserted into the collection. Hurray! When the default ordered insert happens, the moment there is a duplicate key error, the insert operation halts. And even if the rest of the documents have unique underscore IDs, they won't get a chance to be inserted, just like *test 3*.

If the insert is *unordered*, then every document that has a unique underscore ID values gets added to the collection. Now it's time for a fun fact. See if you can't spot what is wrong here. Feel free to pause the video and give it some thought, if you're up for a puzzle. As a reminder, currently we have successfully inserted the following documents into the database. If I try to insert these documents again, I should get a duplicate key error. So here it goes.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspection.insert([{ "_id": 1, "test": 1 },{ "_id": 3, "test": 3 }])
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 2,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

And the result is no writeErrors, and two documents inserted. Now is time to pause the video if you want to ponder how come these two documents got inserted before you here the actual answer. This one should be a favourite for every developer in the world. There was a *typo*, and not just any *typo*-- the *collection* name got misspelled. Instead of the plural *inpections*, it was a singular *inspection*. So, why didn't we get an error? What happened? This behavior is by design. *MongoDB* wants it to be simple for you to create a new collection or a database.

So if you insert a document into a collection that doesn't exist, then this collection will get created for you. Now when we run *show collections*.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> show collections
companies
grades
inspection
inspections
posts
routes
trips
zips
```

We see that there is the *inspection* collection, and the *inspections* collection. The same goes for databases. If I misspelled a database name, I won't get an error. For example, here we're using *training* instead of *sample training*.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> use training
switched to db training
```

And this database is ready to be created, as you can tell by the helpful *switched to db training* message. If I insert a document into some collection right now, then both the collection and this *training* database will become part of my *Atlas Cluster*. But if don't do anything and go back to take a look at all of the databases at my disposal, then this new *training* database should not be there, since there is no data associated with it.

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

Since nothing was inserted, this list does not contain the *training* database.

### Updating Documents - Data Explorer

Things change, and quite often, we need to update the data that we have in our database. Let's see what tools we have to perform an update. For this lesson, we'll use the *grades* collection from the *sample training* data set. The document and this collection seem pretty small compared to what we saw before. But here, we see an example of a different field type. The inspections collection introduced us to the concept of sub-documents, where the address field was an object, aka, a document, with fields and values for the street name, city, and so on.

In the case of the grades collection, we have an array field. Let's expand it and see what that is about. Looks like an array of objects, is that possible? Why not? *MongoDB* has a flexible document model, which means that you can store your data however it makes sense for your application. An array of objects is a common way to store data in certain applications. Let's expand further and see what these objects look like. It appears that student *zero* took a class with the unique ID of *three three nine*, and had four assessments in that class, two *homework assignments*, one *quiz*, and one *exam*

```javascript
_id: ObjectId ("56d5f7eb604eb380b0d8deb4")
student_id: 151
scores: Array
	0: Object
		type: "exam"
		score: 39.44538383489339
	1: Object
		type: "quiz"
		score: 64.12864683143684
	2: Object
		type: "homework"
		score: 46.49129069302115
	3: Object
		type: "homework"
		score: 1.504565288457116
class_id: 339
```

We're going to pretend to be a teacher of class *three three nine*. And we know for a fact that a student with ID one five one has done some extra credit work at the end of the semester. Let's update that student's record for the class. When we hover over the document that matches this query, there are a number of actions that we can choose to do, edit, copy, clone, and delete.

To update one document, we select the edit button that looks like a pencil. You may recognize this view from when you inserted our first document into the collection. Here, we want to update the scores field by adding another score. Since this is an array field that contains sub-documents, aka, object types, when selecting to add a new element, we get a choice of where to nest it. In this case, we want to add an object to an array, so we select that. And change the value type from the default string to object.

We want to follow the structure of other objects in this array for our own consistency and sanity. So the first field should be type and the second should be score. The type is extra credit and the score is 100. Looking at the other scores that the student has, it's a good thing that they submitted some extra credit. We must remember to change the score value type from string to double. This way, if we plan on doing some calculations down the line, we wouldn't have to convert any values from string to numeric types. Finally, we can hit update.

```javascript
_id: ObjectId ("56d5f7eb604eb380b0d8deb4")
student_id: 151
scores: Array
	0: Object
		type: "exam"
		score: 39.44538383489339
	1: Object
		type: "quiz"
		score: 64.12864683143684
	2: Object
		type: "homework"
		score: 46.49129069302115
	3: Object
		type: "homework"
		score: 1.504565288457116
	4: Object
		type: "extra-credit"
		score: 100
class_id: 339
```

Voila! Now the student has a chance of passing class ID *three three nine*.

### Updating Documents - mongo shell

Time to switch to the *Mongo shell* and see what kind of document updates we can perform using the *MongoDB Query Language*, also known as *MQL*. In this lesson, we'll talk about two operations used to update documents in the Mongo shell, *updateOne* and *updateMany*.

Earlier, we saw an example of using *findOne*, which returns the first document that happens to match the given query. This is different from *find*, which returns a cursor with all the documents that correspond to the given query. Likewise, with *UpdateOne*, if there are multiple documents that match a given criteria, only one of them will be updated, whichever one this operation finds first. Whereas using *updateMany* will update all documents that match a given query. With that said, let's see both commands in action. As always, I must connect to my Atlas cluster. For this lesson, we'll use the *sample_training zips* collection.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find().pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca6ed16"),
	"city" : "ALPINE",
	"zip" : "35014",
	"loc" : {
		"y" : 33.331165,
		"x" : 86.208934
	},
	"pop" : 3062,
	"state" : "AL"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca6ed17"),
	"city" : "BESSEMER",
	"zip" : "35020",
	"loc" : {
		"y" : 33.409002,
		"x" : 86.947547
	},
	"pop" : 40549,
	"state" : "AL"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca6ed18"),
	"city" : "ACMAR",
	"zip" : "35004",
	"loc" : {
		"y" : 33.584132,
		"x" : 86.51557
	},
	"pop" : 6055,
	"state" : "AL"
} ...
Type "it" for more
```

This data is a few years old, which means that the population count is no longer accurate. It's safe to assume that the population of most cities in this collection has increased by at least 10 people. In most cases, the population increased by much, much more, sometimes even doubling. But we'll go with the safe assumption that at least 10 more people were born or moved to every city in the past two years. This data set is based on US cities, which makes it uniquely excellent for something like *updateMany*, and here's why. If we look up a document using its *zip value*, it will yield one document.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({ "zip": "12534" }).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca73239"),
	"city" : "HUDSON",
	"zip" : "12534",
	"loc" : {
		"y" : 42.246978,
		"x" : 73.755248
	},
	"pop" : 21205,
	"state" : "NY"
}
```

Remember, *zip codes* are like postal codes for the rest of the world. In this case, we're looking at the city of Hudson in New York state. However, if we look for all documents where the city is Hudson, regardless of the state or zip code, we get many more entries.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({ "city": "HUDSON" }).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca6f9ff"),
	"city" : "HUDSON",
	"zip" : "80642",
	"loc" : {
		"y" : 40.060555,
		"x" : 104.653208
	},
	"pop" : 2369,
	"state" : "CO"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca6ff48"),
	"city" : "HUDSON",
	"zip" : "34669",
	"loc" : {
		"y" : 28.350634,
		"x" : 82.628793
	},
	"pop" : 8577,
	"state" : "FL"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca6ff4c"),
	"city" : "HUDSON",
	"zip" : "34667",
	"loc" : {
		"y" : 28.364763,
		"x" : 82.675669
	},
	"pop" : 26410,
	"state" : "FL"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca705ca"),
	"city" : "HUDSON",
	"zip" : "61748",
	"loc" : {
		"y" : 40.620485,
		"x" : 88.975931
	},
	"pop" : 1850,
	"state" : "IL"
} ...
```

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({ "city": "HUDSON" }).count()
16
```

16 to be precise. Let's update all of them.

```javascript
db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })
```

The first argument here specifies the query which will determine which documents will be updated.The second argument specifies the update that needs to happen. We're using *$inc*, which is an *MQL update operator*. It increments the value of a specified field by the given amount. So in this case, we're looking to increment the "pop" field by 10 in every document which lists Hudson as the city. When the operation is complete, we get a summary of whether it succeeded.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })
{ "acknowledged" : true, "matchedCount" : 16, "modifiedCount" : 16 }
```

16 documents matched our query, and 16 were updated. *$inc* syntax allows us to update multiple fields at the same time by listing the fields and their increment value separated by a comma.

```javascript
{ "$inc": { "pop": 10, "<field2>": <increament value>, ... }}
```

*$inc* is not the only update operator in the *MongoDB query language*.

Let's use *updateOne* and see if we can try out a different update operator with it.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({ "zip": "12534" }).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca73239"),
	"city" : "HUDSON",
	"zip" : "12534",
	"loc" : {
		"y" : 42.246978,
		"x" : 73.755248
	},
	"pop" : 21205,
	"state" : "NY"
}
```

After thorough googling, I found out that the city of Hudson in New York state currently has a population of 17,630 people. So we can update this document to be more accurate. If we try to use the *$inc* operator, then we'll have to find the current population value, then subtract that from the actual population, and then increment by that amount. That sounds exhausting. Instead, we'll use the *$set* operator.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.updateOne({ "zip": "12534" }, { "$set": { "pop": 17630 } })
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
```

When *$set* is used, it updates the value of the given field with a specified value. Check out what happens if we make a typo in the field name.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.updateOne({ "zip": "12534" }, { "$set": { "population": 17630 } })
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
```

No errors, but we don't have a population field, you might say. Well, at this point, this behavior should almost be expected. Just like the implicit creation of databases in a collection, there is a precedent for implicit creation of fields. The idea is that if the field doesn't already exist and you're issuing this update, it means that you want to add this field to the document.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({ "zip": "12534" }).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca73239"),
	"city" : "HUDSON",
	"zip" : "12534",
	"loc" : {
		"y" : 42.246978,
		"x" : 73.755248
	},
	"pop" : 17630,
	"state" : "NY",
	"population" : 17630
}
```

And so the field gets added. Now this document has the "pop" and "population" field and both have the same value.

You can also use *$set* to set the value for multiple fields, much in the same way that the *$inc* operator does it.

```javascript
{ "$set": { "pop": 17630, "<field2>": <new value>, ... }}
```

When we updated the student record via the Data Explorer UI, we updated an array field. It would be great to know how to do that via the Mongo shell as well. To add an element to an array field, one of the options is to use the *$push* operator, which has this syntax.

```javascript
{ $push: { <field1>: <value1>, ... }}
```

Just like with the set operator, if the field that you specify doesn't exist in the document, then *$push* will add an array field to the document with a specified value. Let's see the *$push* operator in action. First, we should look at the document that we updated via the UI.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.grades.find({ "student_id": 151, "class_id": 339 }).pretty()
{
	"_id" : ObjectId("56d5f7eb604eb380b0d8deb4"),
	"student_id" : 151,
	"scores" : [
		{
			"type" : "exam",
			"score" : 39.44538383489339
		},
		{
			"type" : "quiz",
			"score" : 64.12864683143684
		},
		{
			"type" : "homework",
			"score" : 46.49129069302115
		},
		{
			"type" : "homework",
			"score" : 1.504565288457116
		},
		{
			"type" : "extra-credit",
			"score" : 100
		}
	],
	"class_id" : 339
}
```

There, we see the extra credit score that we added earlier. Let's give some extra credit to another student in that class.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.grades.find({ "student_id": 250, "class_id": 339 }).pretty()
{
	"_id" : ObjectId("56d5f7eb604eb380b0d8e292"),
	"student_id" : 250,
	"scores" : [
		{
			"type" : "exam",
			"score" : 3.6641013617826124
		},
		{
			"type" : "quiz",
			"score" : 16.099760154050923
		},
		{
			"type" : "homework",
			"score" : 18.069138737846245
		},
		{
			"type" : "homework",
			"score" : 66.16407292421133
		}
	],
	"class_id" : 339
}
```

This student looks like they could use a little bit of an extra credit. We'll do the same thing that we did in Data Explorer and add an extra credit score to the "scores" array. This modifies the "scores" array by adding another element to it. In this case, the element added is a document with two field value pairs, *type-extra credit* and *score-100*.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.grades.updateOne({ "student_id": 250, "class_id": 339 },
{ "$push": { "scores": { "type": "extra credit", "score": 100 }}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.grades.find({ "student_id": 250, "class_id": 339 }).pretty()
{
	"_id" : ObjectId("56d5f7eb604eb380b0d8e292"),
	"student_id" : 250,
	"scores" : [
		{
			"type" : "exam",
			"score" : 3.6641013617826124
		},
		{
			"type" : "quiz",
			"score" : 16.099760154050923
		},
		{
			"type" : "homework",
			"score" : 18.069138737846245
		},
		{
			"type" : "homework",
			"score" : 66.16407292421133
		},
		{
			"type" : "extra credit",
			"score" : 100
		}
	],
	"class_id" : 339
}

```

And there it is. The student got 100 for their extra credit. Hopefully that will improve their class average.

We will cover other *update operators* in the following lessons, but we won't cover all of them. To learn more about all available update operators in *MQL*, visit our excellent documentation page that is linked in the notes below this video.

### Deleting Documents and Collections

Now that we've added a new collection, and some new documents, and updated a few other documents along the way, it's time to learn how to *delete* documents and collections in *MongoDB*. If we're look to perform such operation through the *Data Explorer*, the handy garbage can button will do the trickfor most cases. We caan delete a database, a collection, or a document by clicking on the garbage can sign where ever we please.

However, we're looking to utilize the mongo shell,our options in how things get deleted vary a little more. First, we have our now familiar *deleteOne and deleteMany* options, which work in a similar way to *updateOne and updateMany*. Except in this case, the only update that happens in that the document gets removed from the database. With that being said, I want to emphasize that the only times when *deleteOne* is a good aproach to deleting documents is when we are querying by the underscore ID value, thus guaranteeing this is the only document matching this query.

Otherwise, we're running the risk of deleting one of a few, or even one of many documents that we needed to delete. We can consistently rely on *findOne, updateOne, deleteOne* to always return the same document when multiple fit the search query, unless we are querying by the underscore ID value. Now, let's connect to our *Atlas Cluster* and delete some stuff. First, it will be good to delete those *test* documents that we created when working with the *inspections* collection.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.find({ "test": 1 }).pretty()
{ "_id" : ObjectId("60d174e7307e3aeced4e3686"), "test" : 1 }
{ "_id" : ObjectId("60d17734307e3aeced4e3689"), "test" : 1 }
{ "_id" : 1, "test" : 1 }

MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.find({ "test": 3 }).pretty()
{ "_id" : ObjectId("60d174e7307e3aeced4e3688"), "test" : 3 }
{ "_id" : ObjectId("60d17734307e3aeced4e368b"), "test" : 3 }
{ "_id" : 3, "test" : 3 }
```

There is the *test1* documents and the *test3* documents. These are the six documents that we want to remove. In this case, we have to use *deleteMany* since we just did a search and know that there are multiple documents that match each criteria.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.deleteMany({ "test": 1 })
{ "acknowledged" : true, "deletedCount" : 3 }

MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspections.deleteMany({ "test": 3 })
{ "acknowledged" : true, "deletedCount" : 3 }
```

First, we delete the ones that match *test1* criteria, and then the ones that match the *test3* criteria. To delete a collection, we need to use *drop*, which is a command that we used earlier when importing new collections. We used this form.

```javascript
mongoimport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dkemg.mongodb.net/sample_supplies" --drop sales.json
```

Where we *dropped* the collection that we were importing, so that we don't get the duplicate key error. We can also *drop* from the *Mongo shell* with the following syntax.

```javascript
dp.collections.drop()
```

Where the collection is referring to collection name. If you remember earlier, we learnt about the implicit creation of collections and databases by creating the *inspection* collection.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspection.find().pretty()
{ "_id" : 1, "test" : 1 }
{ "_id" : 3, "test" : 3 }
```

It contains two test documents, which we can safely remove together with the collection using *drop*.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> show collections
companies
grades
inspection
inspections
posts
routes
trips
zips
```

Here we see the *inspection* collection withing the database. Then, we drop it.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.inspection.drop()
true

MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> show collections
companies
grades
inspections
posts
routes
trips
zips
```

And now, the misspelled collection is no longer part of our *sample training* database.

## Chapter 4: Advanced CRUD Operations

### Query Operators - Comparison

It's time to upgrade our *MQL* skills and add some complexity to our queries. Let's start by introducing *comparison* operators to our tool box. We already used *MQL* Operators in the previous lessons, where we saw examples of *Update* operators, like *$set, $inc, and $unset*, which enabled you to modify data in your database. *Query* operators provide additional ways to locate data within the database.

What *Query* operators have in common with all kinds of operators is the dollar sign that preceds the operator. The dollar sign is used for multiple things in *MongoDB*, operators, aggregation pipeline stages and accessing field values. We will introduce some aggregation basics later in the course, but if you want to learn more about the aggregation pipeline or the use of variables when creating *MongoDB*, check out our aggregation pipeline course.

What do we have at our disposal and how do they work? Here, we have the obligatory equal *$eq* and not equal *$ne*. Where we see if the specified values equal or do not equal to each other. Then there is the similarly required greater than *$gt*, less than *$lt*, and greater than or equal to *$gte*, and less than or equal to *$lte*. All use the same syntax of field, colon, and then in curly brackets, operator, colon, and value.

```javascript
{ <field>: { <operator>: <value> } }
```

Let's see some of them in action and get a better understanding of how to use them. The *trips* collection is an open source data sample from *Citi Bike*, a bycicle rental in New York City. The trip duration field list how long the trip was in seconds. Let's see if we can find any trips that took a minute or less. Alright, here we go.

```javascript
{ "tripduration": { "$lte": 60 } }

QUERY RESULTS 0
```

Turns out there were none. That's understandable. Let's give these riders an additional 10 seconds and see if anyone rented a bike to ride it for only 70 seconds.

```javascript
{ "tripduration": { "$lte": 70 } }

_id: ObjectId("572bb8222b288919b68ac2d4")
tripduration: 61
start station id: 3150
start station name: "E 85 St & York Ave"
end station id: 3150
end station name: "E 85 St & York Ave"
bikeid: 22299
usertype: "Subscriber"
birth year: 1989
gender: 1
start station location: Object
	type: "Point"
	coordinates: Array
		0: -73.94803392
		1: 40.77536905
end station location: Object
	type: "Point"
	coordinates: Array
		0: -73.94803392
		1: 40.77536905
start time: 2016-01-01T02:43:19.000+00:00
stop time:2016-01-01T02:44:21.000+00:00
...
```

And they did. We have 10 people who rented a bike to ride for less than a minute and 10 seconds. Taking a short ride on a rental bike is much cheaper with a subscription. Let's see how many of these riders were not subscribers. I'm adding another condition, where the *usertype* is not equal to subscriber.

```javascript
{ "tripduration": { "$lte": 70 }, "usertype": { "$ne": "Subscriber" } }

_id: ObjectId("572bb8232b288919b68af7cd")
tripduration: 66
start station id: 460
start station name: "S 4 St & Wythe Ave"
end station id: 460
end station name: "S 4 St & Wythe Ave"
bikeid: 23779
usertype: "Customer"
birth year: ""
gender: 0
start station location: Object
	type: "Point"
	coordinates: Array
		0: -73.96590294
		1: 40.71285887
end station location: Object
	type: "Point"
	coordinates: Array
		0: -73.94803392
		1: 40.77536905
start time: 2016-01-02T11:49:11.000+00:00
stop time:2016-01-02T11:50:18.000+00:00
```

Looks like only one person was not an annual subscriber and took a short trip around the same renting station. Let's try this out in the shell. We are connected to the *Atlas Cluster* and we chose to use the *sample training* database. In a *Mongo Shell* we have to use the *Find* command. This query syntax is already familiar to us. Let's not forget to make the output pretty.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.find({ "tripduration": { "$lte": 70 }, "usertype": { "$ne": "Subscriber" } }).pretty()
{
	"_id" : ObjectId("572bb8232b288919b68af7cd"),
	"tripduration" : 66,
	"start station id" : 460,
	"start station name" : "S 4 St & Wythe Ave",
	"end station id" : 460,
	"end station name" : "S 4 St & Wythe Ave",
	"bikeid" : 23779,
	"usertype" : "Customer",
	"birth year" : "",
	"gender" : 0,
	"start station location" : {
		"type" : "Point",
		"coordinates" : [
			-73.96590294,
			40.71285887
		]
	},
	"end station location" : {
		"type" : "Point",
		"coordinates" : [
			-73.96590294,
			40.71285887
		]
	},
	"start time" : ISODate("2016-01-02T11:49:11Z"),
	"stop time" : ISODate("2016-01-02T11:50:18Z")
}
```

There are only two *usertypes* in this collection, so we could also write this query *usertype* as equals *customer*.

```javascript
"usertype": { "$eq": "Customer" }
```

which gives us the same result. However, the *$eq* operator is implicit in situations like these, which means that this query will also return the same result and be equivalent to the previous query.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.find({ "tripduration": { "$lte": 70 }, "usertype": "Customer" }).pretty()
{
	"_id" : ObjectId("572bb8232b288919b68af7cd"),
	"tripduration" : 66,
	"start station id" : 460,
	"start station name" : "S 4 St & Wythe Ave",
	"end station id" : 460,
	"end station name" : "S 4 St & Wythe Ave",
	"bikeid" : 23779,
	"usertype" : "Customer",
	"birth year" : "",
	"gender" : 0,
	"start station location" : {
		"type" : "Point",
		"coordinates" : [
			-73.96590294,
			40.71285887
		]
	},
	"end station location" : {
		"type" : "Point",
		"coordinates" : [
			-73.96590294,
			40.71285887
		]
	},
	"start time" : ISODate("2016-01-02T11:49:11Z"),
	"stop time" : ISODate("2016-01-02T11:50:18Z")
}
```

The only difference is that we omitted the *$eq* operator in this case.

### Lab 1: Comparison Operators

#### Problem

How many documents in the *sample_training.zips* collection have fewer than 1000 people listed in the *pop* field?

#### Answer

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({ "pop": { "$lt": 1000 } }).count()
8065
```

### Lab 2: Comparison Operators

#### Problem

What is the difference between the number of people *born in 1998* and the number of people *born after 1998* in the *sample_training.trips* collection?

#### Answer

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.find({ "birth year": { "$eq": 1998 } }).count()
12
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.find({ "birth year": { "$gt": 1998 } }).count()
18
18 - 12 = 6
```

### Lab 3: Comparison Operators

#### Problem

Using the *sample_training.routes* collection find out which of the following statements will return all routes that have at least one *stop* in them?

#### Answer

```javascript
db.routes.find({ "stops": { "$gt": 0 }}).pretty()

db.routes.find({ "stops": { "$ne": 0 }}).pretty()
```

### Query Operators - Logic
Now that we discussed *comparison* operators, it's time to look at the *logic* operators. In *MQL* we have the standard set of four logical operators. And as any electrical engineer or programmer will tell you, that's more than we need. They're your usual suspects, *$and, $or, $nor, and $not*. *$and* returns the documents that meet all of the specified query clauses. *$or* returns the documents as long as at least one of the query clauses is matched. *$nor* returns all documents that fail to match both clauses. And last but not the least, *$not* negates the query requirements and returns all documents that do not match the query.

*$and, $or, and $nor* have similar to each other syntax where the operator precedes an array of clauses that it will operate on.

```javascript
{<operator> : [{statement1}, {statement2}, ...]}
```

*$not* is a bit different and simply negates what is in front of it. Thus, array syntax is not necessary.

```javascript
{$not: {statement}}
```

Let's see what we can do with these using the *Data Explorer*. We haven't visited the *inspections collection* in a while. And scrolling through it, I see the *results* of the *inspections* are mainly *No Violation Issued* or *Violation Issued*. But I also see a *Pass*. I want to filter out the *violation* ones and see if there are any other *pass results* and just generally what other values they have here. So I'll use a *$nor* statement.

```javascript
{$nor : [{result : "No Violation Issued"}, {result : "Violation Issued"}]}
```

Okay, it looks like there is *'Unable to Locate', 'pass', 'warning', 'fail'*, and a bunch of other type of results. Let's exclude the *pass and fail* as well. For that, I just append the other conditions to this array of clauses that *$nor* is looking at. Here, I'm adding that I don't want the *results* to include *pass* or *fail*. So, neither *pass, fail, Violation Issued or No Violation Issued* should be part of the results.

```javascript
{$nor : [{result : "No Violation Issued"}, {result : "Violation Issued"}, {result : "Pass"}, {result : "Fail"}]}
```

All right, still lots of other results are available. This was us using *$nor*, which is essentially a combination of *$not, $and, $or*. So it's almost like we covered three *logic* operators in one go. So it's time to talk about the *$and* operator. I left it for a longer discussion at the end because it is special. One of the reasons that *$and* is special is because it is already present in your queries by default. Just like we discussed the default presence of *equals* when issuing a query, similar logic works for *$and*. 
> *$and* is used as the default operator when an operator is not specified.

```javascript
{ sector : "Mobile Food Vendor - 881", result : "Warning" }
```

Is the same as:

```javascript
{ $and : [{ sector : "Mobile Food Vendor - 881" }, { result : "Warning" }]}
```

For example, this query actually reads as an *$and* statement. *$and* is already present in your queries by default, if you have multiple criteria that must be true for your query. Another example of an implicit *$and* can be seen when we apply multiple conditions to the same field.

> Find which student ids are > 25 and < 100 in the sample_training.grades collection.

In the *grades* collection, to find out which student IDs are greater than 25 and less than 100, we could issue an *$and* query like this.

```javascript
{"$and": [{"student_id": {"$gt": 25}}, {"student_id": {"$lt": 100}}]}
```

But we could also simplify it significantly. Since we're querying on the same field, we can get rid of the implied *$and*. Then, we can also combine both conditions in a single statement like so.

```javascript
{"student_id": {"$gt": 25, "$lt": 100}}
```

This makes for another example where we do not need an explicit *$and*. But we did learn how to combine several requirements for one field in a single query, so that's nice. Then, when do we explicitly include *$and*?

> The general rule is to use it when you need to include the same operator more than once in a query.

For example, if we look at the *routes* collection, we might be interested to see how many CR2 and A81 airplanes come through the Kazan Airport.

> Using the *routes* collection, find out how many CR2 and A81 airplanes come through the *KZN* Airport?

If we want to get all airplanes going through Kazan, we need either the *source* airport or *destination* airport to equal to *KZN*, like so:

```javascript
{"$or": [{dst_airport: "KZN"}, {src_airport: "KZN"}]}
```

To get the specific airplane types, we need another statement.

```javascript
{"$or": [{airplane: "CR2"}, {airplane: "A81"}]}
```

Let's try this on the *Atlas UI*. Here's our query.

```javascript
{"$or": [{dst_airport: "KZN"}, {src_airport: "KZN"}]}, {"$or": [{airplane: "CR2"}, {airplane: "A81"}]}
```

If we don't specify an explicit *$and* like this, and just list one *$or* after another, we'll get documents that match either of the two *$or* queries.

```javascript
{"_id":{"$oid":"56e9b39b732b6122f877fa31"},
"airline":{"id":{"$numberInt":"410"},
	"name":"Aerocondor",
	"alias":"2B",
	"iata":"ARD"},
"src_airport":"CEK",
"dst_airport":"KZN",
"codeshare":"","
stops":{"$numberInt":"0"},
"airplane":"CR2"}
```

This one seems fine. There's the *KZN* and the *CR2* for the airplane, which is what we are looking for. But if I scroll further, suddenly, there is something that I'm not looking for.

```javascript
{"_id":{"$oid":"56e9b39b732b6122f87806f7"},
"airline":{"id":{"$numberInt":"3788"},
	"name":"Onur Air",
	"alias":"8Q",
	"iata":"OHY"},
"src_airport":"KZN",
"dst_airport":"AYT",
"codeshare":"",
"stops":{"$numberInt":"0"},
"airplane":{"$numberInt":"321"}}
```

And that is the correct airport, but the wrong airplane. This does match my query, but it's not the results that I was looking for. So I need to change my query to get the right results. So let's add an explicit *$and* in the begining.


```javascript
{"$and": [{"$or": [{dst_airport: "KZN"}, {src_airport: "KZN"}]}, {"$or": [{airplane: "CR2"}, {airplane: "A81"}]}]}
```

I add the operator, and then include the two *$or* conditions in square brackets. And yeah, we get 18 routes that come through the *KZN* airport, either as source or destination. And all documents have either the *CR2* airplane or the *A81* airplane.

Let's try this out in the shell. To query using the *Logic* operators, we use the already familiar syntax of the find command. We can also use *count* to see if the returned cursor matches what we saw in the *Data Explorer*.

```javascript
db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" }, { "src_airport": "KZN" } ] }, 
	{ "$or" :[ { "airplane": "CR2" }, { "airplane": "A81" } ] } ]}).count()
18
```

And it does. Try to recreate the queries that we issued via the *Data Explorer*, using the *end browser ID* at the end of this chapter.

#### Problem 1:

How many businesses in the sample_training.inspections dataset have the inspection result *"Out of Business"* and belong to the *"Home Improvement Contractor - 100"* sector?

```javascript
{ sector : "Home Improvement Contractor - 100", result : "Out of Business" }
```

#### Answer:

4

#### Problem 2:

Which is the most succinct query to return all documents from the sample_training.inspections collection where the inspection date is either "Feb 20 2015", or "Feb 21 2015" and the company is not part of the "Cigarette Retail Dealer - 127" sector?

#### Answer:

```javascript
db.inspections.find({ "$or": [ { "date": "Feb 20 2015" }, { "date": "Feb 21 2015" } ],
 "sector": { "$ne": "Cigarette Retail Dealer - 127" }}).pretty()
```

#### Problem 3:

How many zips in the *sample_training.zips* dataset are neither *over-populated* nor *under-populated*? In this case, we consider population of more than 1,000,000 to be over- populated and less than 5,000 to be under-populated.

#### Answer:

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({"$nor" : [{"pop" : {"$gt": 1000000}}, {"pop" : {"$lt": 5000}}]}).count()
11193
```

#### Problem:

How many companies in the *sample_training.companies* data set were either founded in 2004

* [and] either have the *social category_code* [or] *web category_code*, 

[or] were founded in the month of October

* [and] also either have the *social category_code* [or] *web category_code*?

#### Answer:

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.companies.find({ "$and": [{ "$or": [ { "founded_year": 2004 }, { "founded_month": 10 } ] }, { "$or": [ { "category_code": "web" }, { "category_code": "social" }]}]}).count()
149
```

### Expressive Query Operator

Let's take it up a notch and look at *$expr*, the expressive query operator. The versatility of this operator is already clear from its name, *$expr*. It's expressive, meaning it can do more than one simple operation.
> *$expr* allows the use of *aggregation expressions* within the query language, and it uses this syntax.

```javascript
{ $expr: { <expression> } }
```

We haven't yet learned what *aggregation expressions* are, so it might seem premature to talk about this operator.
> However, *$expr* also allows us to use variables and conditional statements. 

So let's get started with that and see how it works. In the later lessons, we will also cover *aggregation expressions* so that you can utilize the power of *$expr* to its fullest. When we learned about *comparison* operators, we were comparing a *field's* value to some number.
> But can we compare fields **within the same document** to each other?

It sounds crazy, I know. But it's not such a rare occurrence. Let's say I'm trying to learn more about *city bike* users in New York City, and I want to know how many of them return the bicycle to the same station from which they rented it out. *$expr* allows me to compare the *start station* ID value directly with the *end station* ID value within the same document, without specifying what those values should equal to on their own. And this is how we do it.

```javascript
{ "$expr": { "$eq": [ "$end station id", "$start station id"] } }

{"_id":{"$oid":"572bb8222b288919b68abf70"},
"tripduration":{"$numberInt":"110"},
"start station id":{"$numberInt":"439"},
"start station name":"E 4 St & 2 Ave",
"end station id":{"$numberInt":"439"},
"end station name":"E 4 St & 2 Ave",
"bikeid":{"$numberInt":"24021"},
"usertype":"Customer",
"birth year":"",
"gender":{"$numberInt":"0"},
"start station location":{"type":"Point","coordinates":[{"$numberDouble":"-73.98978041"},{"$numberDouble":"40.7262807"}]},"end station location":{"type":"Point","coordinates":[{"$numberDouble":"-73.98978041"},{"$numberDouble":"40.7262807"}]},"start time":{"$date":{"$numberLong":"1451607024000"}},
"stop time":{"$date":{"$numberLong":"1451607135000"}}}
```

Fantastic. I get results. If I scroll through a little bit, I see that these documents seem to match my query. But what are these *dollar* signs everywhere? Are there *start station* ID and *end station* ID operators now too? Great question. The *dollar* sign symbol has a lot of wonderful superpowers in *MQL*.
> One of them is to denote when you're using an operator.

> Another one is to signify that you're looking at the value of that field, rather than just the field name itself.

In this example, given a document, when we issue an expression like this.

```javascript
{ "$expr": { "$eq": [ "$end station id", "$start station id"] } }
```

The *$start station ID* means the value 439. And if we were to use *$start station name*, that would mean *E 4th Street and 2nd Avenue*. If we don't use the *dollar* sign in this case, we have to look for a specific field value in all documents, rather than compare a value that varies from document to document to another value that varies from document to document. If we were to replace the *ID* with *name*, we should get the same exact results.

```javascript
{ "$expr": { "$eq": [ "$end station name", "$start station name"] } }
```

Another question that I have for this data set is how many of these people rented the bikes out for more than a couple of minutes? For that I'll add another condition to this expression and move to the show to play around with this data more. One thing to know before we switch from the Atlas interface, though, is that this particular collection contains 10,000 documents.

So how many of these, were just rides around the area that lasted longer than a few minutes, and returned to the starting point? Again, we're already connected to the Atlas cluster. If you're not, make sure to connect when you're trying this on your own. And we're going to be using the sample training database. This is the initial query that we issued in the Atlas UI in the Data Explorer. And we want to find out how many trips started and ended at the same station.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.find({ "$expr": { "$eq": [ "$end station id", "$start station id"] } }).count()
316
```
So there's a count at the end, and the final result is 316 *trips*, which is only about 3% of the total number of 10,000 trips. Looks like New York City is living up to its reputation, and most people are, in fact, rushing to some other destination. So how many of these, were just rides around the area that lasted longer than a few minutes, and returned to the starting point? For that, I issue this query.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.find({ "$expr": { "$and": [ { "$gt": [ "$tripduration", 1200 ]},
 { "$eq": [ "$end station id", "$start station id" ]}]}}).count()
173
```

And here I am adding another condition where I want the trip duration to be greater than 1,200 seconds -- 173. OK, let's break this query down to take a closer look at the syntax and what this query really does. First, we added a *greater than operator* to our *equals operator* under the same *"$and"* umbrella. Something here is still a bit off from how we learned to use *comparison operators*.

In *MQL*, *comparison operator* syntax uses the *field* name first and the *comparison operator* applied later.

```javascript
{ <field>: { <operator>: <value> } }
```

This syntax, however, is using the *aggregation operator* instead.

```javascript
{ <operator>: { <field>, <value> } }
```
 
It looks the same way, but the syntax is slightly different. We will cover the *aggregation pipeline and operators*, I promise, later in this course.

So stay with me. This is it for the *expressive operator*. It allows for more complex queries and for comparing fields within a document. We also learned about another way that the dollar sign is used in the *MongoDB query language*, and even got a peek at how to use *comparison operators* via the *aggregation pipeline* before we even got to learn about the *aggregation pipeline*.

#### Problem:

Which of the following statements will find all the companies that have more employees than the year in which they were founded?

#### Answer:

```javascript
db.companies.find({ "$expr": { "$lt": [ "$founded_year", "$number_of_employees" ] } }).count()

db.companies.find({ "$expr": { "$gt": [ "$number_of_employees", "$founded_year" ] } }).count()
```

#### Problem:

How many companies in the sample_training.companies collection have the same permalink as their twitter_username?

#### Answer:


```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.companies.find({ "$expr": { "$eq": [ "$permalink", "$twitter_username" ] } }).count()
1299
```

### Array Operators

So far we queried documents by fields that have *string*, *numeric*, and *Boolean* values. It's time that we look at more complex elements and see what *MQL* has to offer to query *array* fields.

> The correct functionality of the *$push* operator is that when the *field* is not an array, the operation will *fail*. However, if the *field* is absent in the document to *update*, *$push* adds the *array field* with the value as its element.

Let's see what happens when we query for a value in an *array field* using the methods that we already learned for other types of fields. I'm looking to start traveling, and I heard a lot about this *Airbnb* place. The sample *Airbnb* database contains an excellent example of *array fields*, plus it can help me figure out where and how I want to travel.

Each *Airbnb* listing has a field with an array of available *amenities*. Let's say that not having *shampoo* in the *Airbnb* is a deal breaker for me. So I query for *"amenities" "Shampoo"* to isolate all entries that have *shampoo* in them. Notice that the resulting documents match this criterion in such a way that *shampoo* is one of the array elements, even though the query itself doesn't specify that *"amenties"* has to be an array.

So this looks like we're querying a field that could just have a *string* as a value. How can we differentiate and look for documents where *amenities* is specifically an *array field*? Let's try a different approach. What if I place *["shampoo"]* in square brackets, making it an array. Will this work?

Nope. You might think that the result will be documents where the *amenities* field is an array field. However, now *MongoDB* is looking for a document where the value of the array field is a single element, *shampoo*. Because without any additional operators, it will look for an exact match. Now the question is, does the order of elements in an array field query matter? To test this out, we'll just copy an array field from one of the documents and do a search that way.

```javascript
{"amenities": ["Internet", "Wifi", "Kitchen", "Heating", "Family/kid friendly", "Washer", "Dryer", "Essentials", "Shampoo", "Hangers", "Hair dryer", "Iron", "Laptop friendly workspace"]}
```

As a result, we can either get all documents that contain the same *amenities*, regardless of their order in the array field, or all the documents that have the *amenities* listed in this exact order. Hmm. The result is a single document with a listing of an apartment in Montreal, Canada. To fully test which scenario we're observing, let's swap the order of the first two elements in this array. If the order doesn't matter, we'll get the same document back. But if the order does matter, we'll get a different document, or nothing if no documents have that exact array in them.

And that's a zero. All right. It appears that the order does matter. Of course, the order matters. It's an array. That's the whole point of them, you might say. Well, I wish you'd told me that earlier, and I didn't have to go through all this trouble testing things out. So the question now is, how do we find all documents that contain more than one *amenity* without caring about the order of array elements?
> *MQL* has a great operator for that called *"$all"*. This query should return all documents that have at least these elements in the *amenities* field.

```javascript
{"amenities": {"$all": ["Wifi", "Internet", "Kitchen", "Heating", "Family/kid friendly", "Washer", "Dryer", "Essentials", "Shampoo", "Hangers", "Hair dryer", "Iron", "Laptop friendly workspace"]}}
```

Most matches will have these, and more. Something tells me that the more *amenities* are listed, the more expensive the place is going to be. We're trying to travel on a budget, so we can either make our query limit the results by price, or we can learn more about*array operators* and limit the results by *array length*. To limit the result cursor by restricting their *array length*, add the *size operator* to your query, like so.

```javascript
{"amenities": {"$size": 20, "$all": ["Wifi", "Internet", "Kitchen", "Heating", "Family/kid friendly", "Washer", "Dryer", "Essentials", "Shampoo", "Hangers", "Hair dryer", "Iron", "Laptop friendly workspace"]}}
```

This will only return documents that list exactly *20 amenities* in this field and contain the *amenities* that we're looking for. You can also just query by *array length* using the *size operator* as your only query condition.

```javascript
{"amenities": {"$size": 20}}
```

But we do not need it in this scenario. Finally, I would like to make an informed choice about this journey. But the documents in this collection are just too big to quickly compare and choose my travel destination. For that, let's switch to the *Mongo shell* and learn about *projection*.

As always, I'm already connected to the cluster. If you are not, make sure to be connected to it when you're following along with this lesson. And I want to specify which database I'll be using for this exercise.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> use sample_airbnb

MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.find({"amenities": {"$size": 20, "$all": ["Wifi", "Internet", "Kitchen", "Heating", "Family/kid friendly", "Washer", "Dryer", "Essentials", "Shampoo", "Hangers", "Hair dryer", "Iron", "Laptop friendly workspace"]}}).pretty()
```

If we just issue this query as it is, reading the results in the shell will be as cumbersome as it is reading them in the *Atlas* UI. Because there's just too many fields and too much information.

To mitigate this, we can add a *projection* to our *Find* query. A *projection* allows us to decide which document fields will be part of the resulting cursor. We will cover *projection* in a future lesson. For now, let's summarize what we learned about querying arrays in *MongoDB*.

The *"$size"* array operator will return all documents where the specified array field is exactly the given length.

```javascript
{ <array field>: { "$size": <number> }
```

The *"$all"* array operator will return a cursor with all documents in which the specified *array field* contains all the given elements, regardless of their order in the array.

```javascript
{ <array field>: { "$all": <array> }
```

When querying an array field with an array match, *MongoDB* will look for an exact array match, unless specified otherwise. When querying an array field with a single element, *MongoDB* will return all documents where the specified array field contains this given element.

#### Problem:

What is the name of the listing in the sample_airbnb.listingsAndReviews dataset that accommodates more than 6 people and has exactly 50 reviews?

#### Answer:

```javascript
{"accommodates": {"$gt": 6}, "number_of_reviews": 50}

name: "Sunset Beach Lodge Retreat"
```

#### Problem:

Using the *sample_airbnb.listingsAndReviews* collection find out how many documents have the *"property_type" "House"*, and include *"Changing table"* as one of the *"amenities"*?

#### Answer:

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.find({"property_type": "House", "amenities": {"$all": ["Changing table"]}}).count()
11
or
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.find({ "property_type": "House","amenities": "Changing table" }).count()
11
```

#### Problem:

Which of the following queries will return all listings that have *"Free parking on premises", "Air conditioning", and "Wifi"* as part of their *amenities*, and have at *least 2 bedrooms* in the sample_airbnb.listingsAndReviews collection?

#### Answer:

```javascript
db.listingsAndReviews.find({ "amenities": { "$all": [ "Free parking on premises", "Wifi", "Air conditioning" ] }, "bedrooms": { "$gte":  2 } } ).pretty()
```

### Array Operators and Projection

In this lesson, we'll cover more *array* operators, and the second argument in the *Find* command called *projection*. When we look at the sample *Airbnb* data set, we see documents with lots of fields that often don't fit on the screen. To mitigate this, we can add a projection to our Find queries, and only look at fields that we're interested in at the moment. Here's a query that looks for documents in the sample *Airbnb* database.

```javascript
db.listingsAndReviews.find({ "amenities": { "$size": 20, "$all": [ "Internet", "Wifi",  "Kitchen", "Heating", "Family/kid friendly", "Washer", "Dryer", "Essentials", "Shampoo", "Hangers", "Hair dryer", "Iron", "Laptop friendly workspace" ] } }, {"price": 1, "address": 1}).pretty()
```

The first part of the *Find* query describes the content that we're looking for, though we didn't write out the whole list on this slide. The second is a *projection*, describing specifically which fields we're looking for. This way, the cursor doesn't have to include every single field in the result set. At this point in my travel search, I want to know the *price* and *address* information only, so that is what I specify in my projection.

Let's issue this query and see what we get.

```javascript
db.listingsAndReviews.find({ "amenities": { "$size": 20, "$all": [ "Internet", "Wifi",  "Kitchen", "Heating", "Family/kid friendly", "Washer", "Dryer", "Essentials", "Shampoo", "Hangers", "Hair dryer", "Iron", "Laptop friendly workspace" ] } }, {"price": 1, "address": 1}).pretty()

{
	"_id" : "10992286",
	"price" : NumberDecimal("105.00"),
	"address" : {
		"street" : "Volcano, HI, United States",
		"suburb" : "Island of Hawaiʻi",
		"government_area" : "Puna",
		"market" : "The Big Island",
		"country" : "United States",
		"country_code" : "US",
		"location" : {
			"type" : "Point",
			"coordinates" : [
				-155.2403,
				19.43344
			],
			"is_location_exact" : true
		}
	}
}...
```

Now I can just look at the address and the price for that address for every single listing that matches my query. My initial theory about Airbnb listings was, if there is a shorter list of amenities present, then the booking will be cheaper. It looks like my theory about the number of amenities correlating with the price was wildly off. The prices and the results set ranged from *$45* in Barcelona, Spain, to *$999* in Bronte, Australia. I guess I'm going to have to do some other kind of search to find the perfect travel destination. Searching by price might be a better option, but we already know how to do that. So let's learn more about *projection*, instead.

When using *projection*, you can specify which fields you do or do not want to see in the resulting cursor. Use 1 to specify the fields that you want to see, and 0 to specify the fields that you don't want to see. You cannot mix *zeros* and *ones* in a single projection. If you're using *ones*, then you'll only get the fields that you specified, plus the underscore ID fields. If you're using *zeros*, then you'll get all the fields except for the ones that you specifically excluded.

```javascript
db.<collection>.find( { <query> }, { <projection> })

1 - include the field
0 - exclude the field
Use only 1s or only 0s

db.<collection>.find( { <query> }, { <field1>: 1, <field2>: 1 })
or
db.<collection>.find( { <query> }, { <field1>: 0, <field2>: 0 })

exception:
db.<collection>.find( { <query> }, { <field1>: 1, "_id": 0 })
```

The only time when you can mix *ones* and *zeros* is when you're specifically asking to exclude the *_id* field, because it will be included by default otherwise. So this is a valid projection, because the 0 is used to explicitly exclude the default_id value.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.find({ "amenities": "Wifi" }, { "price": 1, "address": 1, "_id": 0 }).pretty()
{
	"price" : NumberDecimal("80.00"),
	"address" : {
		"street" : "Porto, Porto, Portugal",
		"suburb" : "",
		"government_area" : "Cedofeita, Ildefonso, Sé, Miragaia, Nicolau, Vitória",
		"market" : "Porto",
		"country" : "Portugal",
		"country_code" : "PT",
		"location" : {
			"type" : "Point",
			"coordinates" : [
				-8.61308,
				41.1413
			],
			"is_location_exact" : false
		}
	}
}...
```

But this is not.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.find({ "amenities": "Wifi" }, { "price": 1, "address": 1, "_id": 0, "maximum_nights":0 }).pretty()
Error: error: {
	"operationTime" : Timestamp(1625990014, 1),
	"ok" : 0,
	"errmsg" : "Cannot do exclusion on field maximum_nights in inclusion projection",
	"code" : 31254,
	"codeName" : "Location31254",
	"$clusterTime" : {
		"clusterTime" : Timestamp(1625990014, 1),
		"signature" : {
			"hash" : BinData(0,"RgHeoroQj8nLDJ/Tp0JZvcdN4lM="),
			"keyId" : NumberLong("6930006272708182017")
		}
	}
}
```

As you can see, we get an error when running it. Plus it seems redundant to specify that a field shouldn't be included when it is already not included.

Now let's look at some more advanced projection that is specific to *array* fields. Before I started working at Mongo DB, I was a high school teacher teaching 160 to 190 students a day. Going through student data can be a grueling task, unless, of course, you're good at querying data. Say I'm looking for all students who took class 431 and got an 85 or higher for any type of assessment.

First, let's look at the documents in the *grades* collection to remind ourselves what type of fields we will be querying.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> use sample_training
switched to db sample_training
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.grades.findOne()
{
	"_id" : ObjectId("56d5f7eb604eb380b0d8d8ce"),
	"student_id" : 0,
	"scores" : [
		{
			"type" : "exam",
			"score" : 78.40446309504266
		},
		{
			"type" : "quiz",
			"score" : 73.36224783231339
		},
		{
			"type" : "homework",
			"score" : 46.980982486720535
		},
		{
			"type" : "homework",
			"score" : 76.67556138656222
		}
	],
	"class_id" : 339
}
```

Here we see that the *Scores* field is an *array* of documents. We don't care about the type of assessment, we only care about the *score*. How can we access elements in these *sub documents* of an *array* field?

There is a handy *array* operator, *elemMatch*, which we will use for this query. Here it is in the query itself. Let's see what result we get, and then see how this works.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.grades.find({ "class_id": 431 }, { "scores": { "$elemMatch": { "score": { "$gt": 85 } } } }).pretty()
{ "_id" : ObjectId("56d5f7eb604eb380b0d8d8fb") }
{ "_id" : ObjectId("56d5f7eb604eb380b0d8dbf2") }
{
	"_id" : ObjectId("56d5f7eb604eb380b0d8dca5"),
	"scores" : [
		{
			"type" : "homework",
			"score" : 96.91641379652361
		}
	]
}
{
	"_id" : ObjectId("56d5f7eb604eb380b0d8de16"),
	"scores" : [
		{
			"type" : "exam",
			"score" : 86.41243160598542
		}
	]
}...
```

The results shows all the documents that match the query, but we're not getting every field value for every document. For some documents, we're not getting anything other than the *_id* added value, since that is the default projection behavior. For other documents, we're getting the *_id* value, and the element of the array that matches our *elemMatch* condition, which is that the *score* field has a value of greater than 85, just like it says over here when we issued a query.

Since *array* elements, in this case, are documents, we're getting the full document that matches the condition. So not only the *score*, but also the *type* of the evaluation. Here *elemMatch* is used in the *projection* part of the query, but it can also be used in the query part of the *Find* command as well. To try that out, let's find every student who received *extra credit* for any class. So I'm looking for anyone who has, in the *"scores"* array, a field that is called *"type,"* and the value for the type is *"extra credit"*.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.grades.find({ "scores": { "$elemMatch": { "type": "extra credit" } } }).pretty()
{
	"_id" : ObjectId("56d5f7eb604eb380b0d8e292"),
	"student_id" : 250,
	"scores" : [
		{
			"type" : "exam",
			"score" : 3.6641013617826124
		},
		{
			"type" : "quiz",
			"score" : 16.099760154050923
		},
		{
			"type" : "homework",
			"score" : 18.069138737846245
		},
		{
			"type" : "homework",
			"score" : 66.16407292421133
		},
		{
			"type" : "extra credit",
			"score" : 100
		}
	],
	"class_id" : 339
}
```

There is no *projection* in this query. This student really needed *extra credit*, so it's a good thing that they got it for this class. Since *elemMatch* is being used in the query part, the result is the full document that matches the condition for at least one of the elements in the array, and that is to contain the field, *"type,"* with the value, *"extra credit"*.

In this lesson, we learned that we can use *projection* to specify the fields that we want to see in documents when the cursor returns what matches the query condition. You can use *ones* and *zeros* to specify whether a field should or shouldn't be included, but you can not mix and match, including and excluding fields, with the exception of explicitly excluding the *_id* field, which is present by default.

We also learned about *elemMatch*, an array operator that can be used both in query and projection part of the *Find* command.

```javascript
{ <field>: { "elemMatch": { <field>: <value> } } }
```

> *elemMatch* matches documents that contain an *array* field with at least one element that matches all the specified query criteria, or projects only the array elements with at least one element that matches the specified criteria. Isn't that cool?

#### Problem:

How many companies in the *sample_training.companies* collection have *offices* in the *city of Seattle*?

#### Answer:

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.companies.find({ "offices": { "$elemMatch": { "city": "Seattle" } } }).count()
117
```

#### Problem:

Which of the following queries will return only the *names of companies* from the *sample_training.companies* collection that had exactly *8 funding rounds*?

#### Answer:

```javascript
db.companies.find({ "funding_rounds": { "$size": 8 } }, { "name": 1, "_id": 0 })
```

### Array Operators and Sub-Documents

*MongoDB* has a flexible model for storing data, which means that developers get to decide how to best store their data. So it's common to see *sub-documents* or *arrays of documents* stored in *MongoDB*. Let's learn more about querying those fields. I'm already connected to my *Atlas cluster*, and I'm choosing to use the *sample training* database. In this lesson, we'll learn to query *sub-documents* and specific *array* elements.

We'll start with the *trips* collection. Each document in the collection has two perfect fields for our purposes, the *start station location* and *the end station location*. Each field contains a document, and each document contains an array. First, we want to know how to get to the *array* field in those nested documents.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.findOne({ "start station location.type": "Point" })
{
	"_id" : ObjectId("572bb8222b288919b68abf5a"),
	"tripduration" : 379,
	"start station id" : 476,
	"start station name" : "E 31 St & 3 Ave",
	"end station id" : 498,
	"end station name" : "Broadway & W 32 St",
	"bikeid" : 17827,
	"usertype" : "Subscriber",
	"birth year" : 1969,
	"gender" : 1,
	"start station location" : {
		"type" : "Point",
		"coordinates" : [
			-73.97966069,
			40.74394314
		]
	},
	"end station location" : {
		"type" : "Point",
		"coordinates" : [
			-73.98808416,
			40.74854862
		]
	},
	"start time" : ISODate("2016-01-01T00:00:45Z"),
	"stop time" : ISODate("2016-01-01T00:07:04Z")
}
```

For that, *MQL* uses something called *dot-notation*. Let's look at it in action. All documents in this collection match this query. Every document has a station location where there is a field with the name *type*, and a value *point*. But we are using *findOne*, so we only get one document back.

The top level field of the document called *start station location* stores an object which is a *sub document*. This *sub document* has two fields, *type and coordinates*. To get the value of either field, I can use *dot-notation*. The field name from the *sub document* follows the top-level field separated by a *dot* or a *period*, and the whole thing is included in quotes.

You can think of it as a path to the field that you're looking for almost like a *namespace* for a collection -- where you go from a database level to the collection level, using a *dot* to separate the two objects -- **db.collection**. This notation can be used to go as deep in the document as needed. So if you have a field that has a document as a value, and that document has a field with another document as a value, you can still use *dot* notation to get the last atomic non-document value in that hierarchy.


```javascript
db.collection.find({ "field 1.other field.also a field": "value" })
{
	"_id" : "572bb8222b288919b68abf5a",
	"field 1" : {
					"some field" : "some number",
					"other field" : {
										"also a field": "value",
										"field here": "val too"
           							}
				},
	"field 2": "value 2",
	"field 3": "value 3"
}
```

Here's an example using the company's collection in our class sample training data set. Let's examine the documents in that data set for a moment. The relationships array contains objects, and each object describes the title, current status with relation to the company title, and personal details, like first and last name. All personal info is stored in a nested document in that array element.

This query looks at the first element in the relationships array using dot notation. Array elements in most languages and data structures are enumerated starting from zero. *MongoDB* is no different, so the first element is at position zero. And that document is the value of the person field. So we use dot notation for that, as well. Finally, we are only interested in Zuckerberg, so we search for his last name.

Because the documents in this collection are so big, we add a projection for the company name. Now, we're searching for anyone with the last name Zuckerberg in the first element of the relationships array. Let's try it out in the shell. It looks like the result is just one company, and it is the expected Facebook. The relationships array lists higher-level company executives. Let's see how many of them are CEOs whose first name is Mark and who are listed as the first relationship in this array for their company's entry.

To do this, we need to slightly modify this query-- change the last name to first name, and change Zuckerberg to Mark. And then, add another condition where the title in this element contains the string CEO. For this, I can use a regex operator to specify the string that I'm trying to match. You can find more about the regex operator and syntax in the lecture notes below this video. We run the query to find how many Mark's are CEOs and are the first to be listed in this array field.

Looks like we have 52 Mark's. And when we take a peek at the first 20, using the pretty directive, we see Facebook, Bitly, and a company called Are You Watching This? Which is a great name, in my opinion. Now that we have this new found wisdom on querying embedded documents and array elements, it would be a good time to put this knowledge together in a query that looks for all marks who used to be in the senior company leadership array, a.k.a. the relationships array, but are no longer with the company.

This means that we will be searching through every array element in every document. There is a field called is past, which can tell us whether this person is still with the company. So if they left, the value should be true. And the first name field value, under the person field in the array element, should equal to mark. Thankfully, we have a handy elemMatch operator which can look through every array element and match these conditions. So our find command, in this case, is going to be much shorter than the previous two.

Here, we say that we're looking for elements in the relationships array where there is past field is true, and the person dot first name field is Mark. We can also take a peek at the company names that match these criteria, or we can count them. All right 256-- lovely number. Now that we've got through all the nested documents and giant array fields, it is time to summarize what we learned.

To query an array field by a specific element location or to query an element in sub-documents, MQL uses dot-notation to specify the address of these elements in the doc. You can use dot-notation to go as deep into the nested document as you wish. To use dot-notation with arrays, specify the position of the element in the array.
