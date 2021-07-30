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

Here's an example using the *company's collection* in our class *sample training data set*. Let's examine the documents in that data set for a moment. The *relationships array* contains objects, and each object describes the *title, current status* with relation to the company title, and personal details, like *first and last name*. All personal info is stored in a nested document in that array element.

```javascript
db.companies.find({ "relationships.0.person.last_name": "Zuckerberg" }, { "name": 1 }).pretty()
```

This query looks at the first element in the *relationships* array using *dot* notation. Array elements in most languages and data structures are enumerated starting from zero. *MongoDB* is no different, so the first element is at position *zero*. And that document is the value of the *person* field. So we use *dot* notation for that, as well. Finally, we are only interested in *Zuckerberg*, so we search for his *last name*.

Because the documents in this collection are so big, we add a *projection* for the company *name*. Now, we're searching for anyone with the *last name Zuckerberg* in the first element of the *relationships* array. Let's try it out in the shell.

```javascript
db.companies.find({ "relationships.0.person.last_name": "Zuckerberg" }, { "name": 1 }).pretty()
{ "_id" : ObjectId("52cdef7c4bab8bd675297d8e"), "name" : "Facebook" }
```

It looks like the result is just one company, and it is the expected *Facebook*. The *relationships* array lists higher-level company executives. Let's see how many of them are CEOs whose *first name* is Mark and who are listed as the first *relationship* in this array for their company's entry.

To do this, we need to slightly modify this query-- change the *last name to first name*, and change *Zuckerberg to Mark*. And then, add another condition where the title in this element contains the string *CEO*. For this, I can use a *regex* operator to specify the string that I'm trying to match. You can find more about the *regex* operator and syntax in the lecture notes below this video. We run the query to find how many Mark's are CEOs and are the first to be listed in this array field.

```javascript
db.companies.find({ "relationships.0.person.first_name": "Mark", "relationships.0.title": { "$regex": "CEO" } }, 
{ "name": 1 }).count()
52
```

Looks like we have 52 Mark's.

```javascript
db.companies.find({ "relationships.0.person.first_name": "Mark", "relationships.0.title": { "$regex": "CEO" } }, 
{ "name": 1 }).pretty()
{ "_id" : ObjectId("52cdef7c4bab8bd675297d8e"), "name" : "Facebook" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dd3"), "name" : "iSkoot" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297efc"), "name" : "Helium" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297fb5"), "name" : "Feedjit" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297fbf"), "name" : "Avvo" }
{ "_id" : ObjectId("52cdef7c4bab8bd675298077"), "name" : "eXelate" }
{ "_id" : ObjectId("52cdef7c4bab8bd6752980ed"), "name" : "Bloglines" }
{ "_id" : ObjectId("52cdef7c4bab8bd67529838c"), "name" : "HipLogic" }
{ "_id" : ObjectId("52cdef7c4bab8bd6752983f1"), "name" : "Surf Canyon" }
{ "_id" : ObjectId("52cdef7c4bab8bd675298543"), "name" : "SignalDemand" }
{ "_id" : ObjectId("52cdef7c4bab8bd675298655"), "name" : "Wiredset" }
{ "_id" : ObjectId("52cdef7d4bab8bd675298c18"), "name" : "Market Sentinel" }
{ "_id" : ObjectId("52cdef7d4bab8bd675298e2b"), "name" : "Courtland Brooks" }
{
	"_id" : ObjectId("52cdef7d4bab8bd675298ec2"),
	"name" : "Are You Watching This?!"
}
{ "_id" : ObjectId("52cdef7d4bab8bd675299659"), "name" : "MESoft" }
{ "_id" : ObjectId("52cdef7d4bab8bd67529906d"), "name" : "SNASM" }
{ "_id" : ObjectId("52cdef7d4bab8bd67529914b"), "name" : "Bitly" }
{ "_id" : ObjectId("52cdef7d4bab8bd6752991fa"), "name" : "N-Play" }
{ "_id" : ObjectId("52cdef7d4bab8bd6752992c2"), "name" : "SAVO" }
{ "_id" : ObjectId("52cdef7d4bab8bd6752993d7"), "name" : "AirMe" }
Type "it" for more
```

And when we take a peek at the first 20, using the *pretty* directive, we see Facebook, Bitly, and a company called Are You Watching This? Which is a great name, in my opinion. Now that we have this new found wisdom on querying embedded documents and array elements, it would be a good time to put this knowledge together in a query that looks for all marks who used to be in the senior company leadership array, a.k.a. the *relationships array*, but are no longer with the company.

This means that we will be searching through every array element in every document. There is a field called *is past*, which can tell us whether this person is still with the company. So if they left, the value should be *true*. And the *first name* field value, under the *person* field in the array element, should equal to *mark*. Thankfully, we have a handy *elemMatch* operator which can look through every array element and match these conditions. So our *find* command, in this case, is going to be much shorter than the previous two.

```javascript
db.companies.find({ "relationships": { "$elemMatch": { "is_past": true, "person.first_name": "Mark" } } }, { "name": 1 }).pretty()
{ "_id" : ObjectId("52cdef7c4bab8bd675297d94"), "name" : "Twitter" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297d9e"), "name" : "CBS" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297da0"), "name" : "Babelgum" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297da2"), "name" : "Cisco" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297da3"), "name" : "Yahoo!" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297da4"), "name" : "Powerset" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297dc4"), "name" : "Intel" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297def"), "name" : "KickApps" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297df7"), "name" : "Bebo" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297e0c"), "name" : "LinkedIn" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297e6f"), "name" : "Sony" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297e79"), "name" : "Wikia" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297e89"), "name" : "PayPal" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297ed4"), "name" : "Yola" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297ed6"), "name" : "BitTorrent" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297ee9"), "name" : "Sun Microsystems" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297efa"), "name" : "TechCrunch" }
{
	"_id" : ObjectId("52cdef7c4bab8bd675297f07"),
	"name" : "Shock Treatment Management"
}
{ "_id" : ObjectId("52cdef7c4bab8bd675297f34"), "name" : "Webshots" }
{ "_id" : ObjectId("52cdef7c4bab8bd675297f57"), "name" : "Lycos" }
Type "it" for more

db.companies.find({ "relationships": { "$elemMatch": { "is_past": true, "person.first_name": "Mark" } } }, { "name": 1 }).count()
256
```

Here, we say that we're looking for elements in the *relationships* array where there *is past* field is true, and the *person dot first name* field is *Mark*. We can also take a peek at the company names that match these criteria, or we can *count* them. All right 256 -- lovely number. Now that we've got through all the nested documents and giant array fields, it is time to summarize what we learned.

To query an array field by a specific element location or to query an element in *sub-documents*, *MQL* uses *dot-notation* to specify the address of these elements in the doc. You can use *dot-notation* to go as deep into the nested document as you wish. To use *dot-notation* with arrays, specify the position of the element in the array.

#### Problem:

How many *trips* in the *sample_training.trips* collection started at stations that are to the west of the -74 longitude coordinate?

#### Answer:

```javascript
db.trips.find({ "start station location.coordinates.0": { "$lt": -74 } }).count()
1928

address:
city:"NEW YORK"
```

#### Problem:

How many inspections from the *sample_training.inspections* collection were conducted in the *city of NEW YORK?*

#### Answer:

```javascript
db.inspections.find({ "address.city": "NEW YORK" }).count()
18279
```

#### Problem:

Which of the following queries will return the names and addresses of all listings from the *sample_airbnb.listingsAndReviews* collection where the first *amenity* in the list is *"Internet"*?

#### Answer:

```javascript
db.listingsAndReviews.find({ "amenities.0": "Internet" }, { "name": 1, "address": 1 }).pretty()
```

## Chapter 5: Indexing and Aggregation Pipeline

### Aggregation Framework

What is the *MongoDB aggregation framework*? Why do we need it? How do we use it? This lesson will provide answers to some of these questions. The *aggregation framework*, in its simplest form, is just another way to query data in *MongoDB*. Everything we know how to do using the *MongoDB query language* can also be done using the *aggregation framework*.

Here's an example. Let's find all documents that have *Wi-Fi* as one of the *amenities*, only include the *price* and *address* in the resulting cursor. With *MQL*, we will use this command. Let's actually use it in the shell. First, let's switch to the database that we need. I'm already connected to the Atlas cluster.

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

Here's the *MQL* query. We get the first 20 results. Fantastic.

With the *aggregation framework*, we use this command. 

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.aggregate([{ "$match": { "amenities": "Wifi" } },
...  { "$project": { "price": 1, "address": 1, "_id": 0 }}]).pretty()
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

Let's look at the syntax and see what's similar and what's different. To use the *aggregation framework*, we use *aggregate* instead of *find*. The reason for that is because sometimes we might want to *aggregate*, as in group or modify our data in some way, instead of always just filtering for the right documents.

This means that you can perform operations other than finding and projecting data. But you can also calculate using *aggregation*. All right, so we used *aggregate*. Then we have the *start square bracket*, which makes me think *arrays*. In *arrays*, the *order* of elements is important. And you often access elements by knowing *their position in the array*.

The *aggregation framework* works as a pipeline, where the *order of actions* in the pipeline matters. And each action is executed in the *order* in which we list it. Meaning that we give our data to the pipeline on one end, then we describe how this pipeline is going to treat our data using *aggregation stages*. And then the transformed data emerges at the end of the pipeline.

In this case, if our pipeline was to be represented as a literal set of connected pipes, we can think of it as having two separate filters. The first filter is the *$match* stage, which acts as a filter that keeps all the *amenities* without *Wi-Fi* from passing through to the next stage of the pipeline. The second filter is the *$project* stage that filters out all the fields that are not *address* or *price* from each document.

So it must be an even finer filter than the first one. The rest of the syntax looks pretty similar. For each stage, we specify what we want to do. We want all documents that match the given criteria. And we want the following fields to be projected and the ID excluded. So what's the big deal? Why does *MongoDB* have the *aggregation framework*? And what is it good for?

Excellent questions. *Aggregation framework* allows us to do incredible things with data. For example, you can build an equivalent of whatever this is, but with data. It's more of a chemical factory and less of a pipeline at this point. So let's talk about a stage which takes us beyond the capabilities of *MQL*, which will hopefully get you curious to explore more.

Introducing the *$group* stage. The *$group* stage is one of the many stages that differentiates the *aggregation framework* from *MQL*. With *MQL*, we can *filter* and *update* data. With the *aggregation framework*, we can *compute* and *reshape* data. If the previous pipeline visualization used two filters, visualizing the *$group* stage looks something like this -- an operator that takes the incoming stream of data and siphons it into multiple distinct reservoirs.

At this point, it is important to note that the nonfiltering stages in the *aggregation framework* are not modifying the original data when they do the summaries, calculations, and groupings of data. Instead, they work with the data that they get from the previous stage in the pipeline, which is in its own cursor.

Let's look at a concrete example. We've been querying the *Airbnb* data set for a while. Let's find out which countries are listed in the sample set. First things first. We don't need the entire document to find an answer to this inquiry. We can use the *"address"* field to find the answer, and that's enough.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.findOne({ },{ "address": 1, "_id": 0 })
{
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
}
```

This query gets one document from the collection and projects only the *address* value into the return cursor. Looks like if we group documents by the *address.country* field value, we should find out how many and which countries are used in this data set. But for that, we need to know the syntax of the *$group* stage.

Let's look at the *$group* stage syntax to see how it works and how we can get a list of countries that are featured in our data set. The *$group* stage has this form.

```javascript
{ $group:
	{
		_id: <expression>, // Group by expression
		<field>: { <accumulator1> : <expression1> },
		...
	}
}
```

As the *$group* stage receives documents from the previous stage, it uses the *expression* that we provide in the *_id* field to identify the group that this document belongs to.

We're not going to use a complex expression. We're simply looking to group data by the *address.country* value. So we can state exactly that.
> *Project* only the *address* field value for each document, then *group* all documents into one document per *address.country* value.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.aggregate([ { "$project": { "address": 1, "_id": 0 }}, { "$group": { "_id": "$address.country" }}])
{ "_id" : "Spain" }
{ "_id" : "Portugal" }
{ "_id" : "Turkey" }
{ "_id" : "Hong Kong" }
{ "_id" : "China" }
{ "_id" : "United States" }
{ "_id" : "Australia" }
{ "_id" : "Canada" }
{ "_id" : "Brazil" }
```

Fantastic. It looks like we have nine countries in this set, and they span multiple continents. That's wonderful. It would also be cool to know how many listings each country has. With *aggregation*, that's easy to do. The second part of the *$group* syntax allows us to do more *quantitative analysis* across the data that's coming through the pipeline.
> *Project* only the *address* field value for each document, then *group* all documents into one document per *address.country* value, and *count* one for each document in each group.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.aggregate([{ "$project": { "address": 1, "_id": 0 }}, { "$group": { "_id": "$address.country", "count": { "$sum": 1 } } }])
{ "_id" : "Hong Kong", "count" : 600 }
{ "_id" : "Canada", "count" : 649 }
{ "_id" : "Brazil", "count" : 606 }
{ "_id" : "China", "count" : 19 }
{ "_id" : "Australia", "count" : 610 }
{ "_id" : "United States", "count" : 1222 }
{ "_id" : "Spain", "count" : 633 }
{ "_id" : "Portugal", "count" : 555 }
{ "_id" : "Turkey", "count" : 661 }
```

Here, we're creating another field for the documents that are created in the pipeline, and we're calling this field *"count"*. Then we're using the *$sum* operator. In our case, we're simply adding the number one for each document that folds into each group. We now know which countries have listings in this data set and how many listings each country has. 

Can we do more complex and cool calculations? Absolutely. Developers have been known to create *Conway's Game of Life* and build *fractals* using the *aggregation framework*. So, sky's the limit. To learn more about the power of the *aggregation framework*, take our *aggregation framework* course. 

Let's summarize what we've learned. The *aggregation framework* is a powerful tool that exceeds the filtering capabilities of *MQL* through its ability to compute, reshape, and reorganize data. Data in the *aggregation pipeline* exists within the pipeline. It does not inherently modify or change your original data.

*Aggregation framework* syntax is in the form of a pipeline, where stages are executed in the order in which they are listed. The stage name is preceded with a dollar sign and followed by the required action descriptions, like *$sum* or a filter or some other type of modification.

#### Problem:

What room types are present in the *sample_airbnb.listingsAndReviews* collection?

#### Answer:

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.listingsAndReviews.aggregate([ { "$project": { "room_type": 1, "_id": 0 }}, { "$group": { "_id": "$room_type" }}])
{ "_id" : "Private room" }
{ "_id" : "Entire home/apt" }
{ "_id" : "Shared room" }
```

#### Problem:

What are the differences between using *aggregate()* and *find()*?

#### Answer:

* aggregate() can do what find() can and more.
* aggregate() allows us to compute and reshape data in the cursor.

### sort() and limit() Methods

In this lesson, we learned how to use these *sort()* and *limit()* methods. Sometimes, when you're creating a collection, you're not interested in all results, but are looking for the top 3 or top 10 results. In this lesson, we'll learn how to get the results in the order and quantity that we're looking for.

Let's say we want to find the least populated zip code in the *Zips* collection. I'm already connected to my Atlas cluster, and I'm going to switch to it using the sample_training database. And let's get right to it. Looks like I forgot to add the *pretty()* directive. Much better.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find().sort({ "pop": 1 }).limit(1).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca6eea3"),
	"city" : "ALLEN",
	"zip" : "36419",
	"loc" : {
		"y" : 31.624266,
		"x" : 87.66746
	},
	"pop" : 0,
	"state" : "AL"
}
```

This query gets all the documents, sorts them by their population count in increasing order, and only returns the first document in the cursor, a.k.a. the one with the smallest population value. This is weird. It looks like there can be a zip code -- or a postal code, if you're not from the US -- with zero people living in it. Now I'm kind of curious how many of these zip codes we have in this collection.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find({ "pop": 0 }).count()
67
```

*67*. It looks like a lot. I certainly didn't expect a number this high. Maybe it makes more sense to look for the most populated zip code instead of the least populated one. For this, we reverse the direction of the sort and make it decreasing, so that the highest values are first in the cursor.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find().sort({ "pop": -1 }).limit(1).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca7044d"),
	"city" : "CHICAGO",
	"zip" : "60623",
	"loc" : {
		"y" : 41.849015,
		"x" : 87.7157
	},
	"pop" : 112047,
	"state" : "IL"
}
```

This way, we see that the most populated zip code in this database is in Chicago. We can use the same approach to get the top 10 most populated zip codes. All we have to do is increase the limit of the cursor from 1 to 10.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find().sort({ "pop": -1 }).limit(10).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca7044d"),
	"city" : "CHICAGO",
	"zip" : "60623",
	"loc" : {
		"y" : 41.849015,
		"x" : 87.7157
	},
	"pop" : 112047,
	"state" : "IL"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca7307f"),
	"city" : "BROOKLYN",
	"zip" : "11226",
	"loc" : {
		"y" : 40.646694,
		"x" : 73.956985
	},
	"pop" : 111396,
	"state" : "NY"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca72fa0"),
	"city" : "NEW YORK",
	"zip" : "10021",
	"loc" : {
		"y" : 40.768476,
		"x" : 73.958805
	},
	"pop" : 106564,
	"state" : "NY"
}...
```

And now we see the top 10 zip codes by population. Now let's break down the syntax a little bit. *Sort()* and *limit()* are cursor methods. We already know other cursor methods, like *pretty()* and *count()*, so these two are an addition to our knowledge base.

> A cursor method is not applied to the data that is stored in the database. It is instead applied to the results set that lives in the cursor.

After the cursor is populated with the filter data that's the result of the *Find* command, we can then apply the *sort()* method, which will sort the data based on the criteria that we provided. You can sort the data by one or more fields in increasing or decreasing direction, like this.


```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.zips.find().sort({ "pop": 1, "city": -1 }).pretty()
{
	"_id" : ObjectId("5c8eccc1caa187d17ca756c9"),
	"city" : "WALLOPS ISLAND",
	"zip" : "23337",
	"loc" : {
		"y" : 37.827338,
		"x" : 75.506503
	},
	"pop" : 0,
	"state" : "VA"
}
{
	"_id" : ObjectId("5c8eccc1caa187d17ca6f948"),
	"city" : "VINTON",
	"zip" : "96135",
	"loc" : {
		"y" : 39.720719,
		"x" : 120.204994
	},
	"pop" : 0,
	"state" : "CA"
}...
```

Here, the results that we get are sorted in increasing order by population and decreasing order by the city name. If you're looking for some specific number of results that best match your query, you can use *limit()*. The caveat with *limit()* is that if you use *limit()* without *sort()*, you will most likely get some results without any guarantee of its order.

Similarly, if you use *limit()* before you *sort()*, you might miss some of the data that you meant to sort and include in the results set. Which is why *MongoDB* assumes that when you use *sort() and limit()*, you always mean to sort first, regardless of the order in which you type these methods up.

#### Problem:

Which of the following commands will return the *name and founding year* for the 5 oldest companies in the *sample_training.companies* collection?

#### Answer:

```javascript
db.companies.find({ "founded_year": { "$ne": null }},
 { "name": 1, "founded_year": 1 }).sort({ "founded_year": 1 }).limit(5).pretty()
```
We first must filter out the documents where the founded year is not null, then project the fields that we are looking for, which is *name*, and *founded_year* in this case. Then we sort the cursor in increasing order, so the first results will have the smallest value for the *founded_year* field. Finally, we limit the results to our top 5 documents in the cursor, thus getting the 5 oldest companies in this collection.

or

```javascript
db.companies.find({ "founded_year": { "$ne": null }},
 { "name": 1, "founded_year": 1 }).limit(5).sort({ "founded_year": 1 })
```

While the *limit() and sort()* methods are not listed in the correct order, *MongoDB* flips their order when executing the query, delivering the results that the question prompt is looking for.

#### Problem:

In what year was the youngest bike rider from the *sample_training.trips* collection born?

#### Answer:

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.find({ "birth year": { "$ne": "" }},
 { "bikeid": 1, "birth year": 1 }).sort({ "birth year": -1 }).limit(1).pretty()
{
	"_id" : ObjectId("572bb8222b288919b68ac17d"),
	"bikeid" : 23959,
	"birth year" : 1999
}
```

### Introduction to Indexes

In this lesson we will learn about *indexes*. Now that we learned to query and modify data, it will be super helpful to know how to make these queries as efficient as possible. Ther are multiple ways in which we can improve our queries, but the most impactful way is through adding indexes to support your queries.

So what is an *Index*? An *Index* in a database is, by its function, similar to an *index* in a book. When you have an alphabetical list of names and subjects with references to the places where they occur. And you can typically find an *index* at the end of the book.

Say we have a book about 20th century Nobel Prize winners in literature, and we're looking to find all mentions of *Tony Morrison*. You have two options on how to go about this search. First, you can look through every page in the book carefully and find what you're looking for, or you can look through an alphabetically organized *index*, go to the *M* section, and find all the pages pertaining to *Morrison*.

> *Index* in a database, is a special data structure that stores a small portion of the collection's data set in an easy to tranverse form.

Which method is faster? Using the *index* is way faster. It cuts down on the search by the number of pages that the book has. Instead of looking through all of them, you just look at the *index* and get the information that you need. An *index* in a collection serves the same purpose, but instead of always being alphabetical, an *index* in a collection is a special data structure that stores a small portion of the collection's data set in an easy-to-tranverse form.
> Or put simply, an *index* is a data structure that optimizes queries.

You should build an *index* to support your queries. For example, if I'm running queries on the *trips* collection and find that I often query by the *birth year*, then I should have an *index* that support these queries.

```javascript
db.trips.find({ "birth year": 1989 })

db.trips.find({ "start station id": 476 }).sort( { "birth year": 1 } )
```

The first query filters data by the value of the *birth year* field. The second *sorts* by the value of that field. Both could benefit from an *index*. So let's create one base on the *birth year* values.

```javascript
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.createIndex({ "birth year": 1 })
{
	"numIndexesBefore" : 2,
	"numIndexesAfter" : 2,
	"note" : "all indexes already exist",
	"ok" : 1,
	"$clusterTime" : {
		"clusterTime" : Timestamp(1626871526, 13),
		"signature" : {
			"hash" : BinData(0,"cr+Xfe6yUrTtOSo2FNYXLB9QnwA="),
			"keyId" : NumberLong("6930006272708182017")
		}
	},
	"operationTime" : Timestamp(1626871526, 13)
}
```
This command creates an *index* on the *birth year* field in increasing order. Now that we have this *index*, where we issue this query, *MongoDB* doesn't have to look at every document to get the needed results. It will just go directly to where the *1989* documents live and retreive them. For this query, however, *MongoDB* will still have to look through all the documents, to find those where the *start station id* is 476.

But the good news is that it can use the *index* that we created in order to retrieve those results in sorted order by *birth year*, so there won't be a need to sort the cursor after the data is filtered. This is quiet awesome, because it massively improves the speed and overall performance of our queries, making them even faster and more efficient. The programmers among us know how memory and time-consuming sorting can be, especially for large amount of data.

So it's very important to use the right *indexes* for queries that use *sort*. Now the question is whether we can make both queries that we're talking about more efficient using *indexes*. We certainly can. Our collection already has a *Single field index* that we created before. We call that *"Single field"*, well because it *indexes* documents using only one field.

```javascript
Single Field Index
db.trips.createIndex({ "birth year": 1 })

Not Perfect For
db.trips.find({ "start station id": 476 }).sort( { "birth year": 1 } )

Compound Index
MongoDB Enterprise atlas-ty4m6s-shard-0:PRIMARY> db.trips.createIndex({ "start station id": 1, "birth year": 1 })
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 2,
	"numIndexesAfter" : 3,
	"commitQuorum" : "votingMembers",
	"ok" : 1,
	"$clusterTime" : {
		"clusterTime" : Timestamp(1626871633, 9),
		"signature" : {
			"hash" : BinData(0,"h+ALYaPC/dDDy8nnuisz9T5Cu4U="),
			"keyId" : NumberLong("6930006272708182017")
		}
	},
	"operationTime" : Timestamp(1626871633, 9)
}
```

To make the second query more efficient, we need to use a *Compound index*, which is an *index* on multiple fields. This *index* will first order documents by the *start station id* value, then by the *birth year* value. It co-exist with the previous *index* in the same *trips* collection, but this *index* is much better suited for our second query. It helps us immediately locate all *start stations* with *id 476*, and thanks to our *index*, the documents there are already sorted by *birth year*.

### Introduction to Data Modeling

In this lesson, we'll discuss *data modeling*. *MongoDB* doesn't enforce how data is organized by default. So how can we decide what structure to use to store our data? Where should we create *sub-documents*? And where should we use *arrays of values*? At which point should the data get its own *collection*?

Making these decisions about the shape and structure of your data is called *data modeling*.
> More specifically, *data modeling* is a way to organize fields in a document to support your application performance and querying capabilities.

Today, I'll introduce *data modeling for MongoDB*. The most important rule of thumb in *data modeling with MongoDB* is that **data is stored in the way that it is used**. This notion determines the decision that you make about the shape of your document and the number of your collections.

For example, say we're building an application that stores patient information. Each patient has a varied amount of information associated with them. One might have multiple phone numbers, prescriptions, and visit history but prefer to be contacted by email, or another might have zero prescriptions in their medical history and no patient visit records.

Just from this, we can see how the document sizes will vary per patient -- that is, if we were to store all patient-pertaining information in one collection. We now have a general idea of what kind of data we're looking to store, such as *contact info, visit history, prescriptions, age, gender*, which is great but not enough to make any *data modeling* decisions just yet.

The other important and probably the most important consideration is *how* this data will be queried. *Who* is using our application, and *how*? Let's consider that this application is being used by doctors in a network of medical facilities. It is most useful for the doctor to see the *current prescriptions, diagnosis, and patient contact information* when they pull up their record.

Occasionally, depending on the patient, it would also be helpful to look up and cross-reference medication that the patient is taking for *side effects, allergies, and other information*. We can organize data in any way that we please. But if we want to optimize for fast and easy data retrieval, we can have a collection called *patient records* where we structure data as is most helpful for our application and another collection containing information about various medications.

This way, when a doctor is looking for patient information to create a new prescription, contact them, or prepare for their next visit, all the relevant information is already in one collection and one document and therefore doesn't have to be gathered from across multiple sources, thus taking too long. Everything that is regularly queried together is stored together for fast retrieval.

In this lesson, we learned that when *data modeling with MongoDB*, data that is accessed together should be stored together. It's also important to keep in mind that as your application is changing and evolving, your data model should also be evolving. And *MongoDB* is built for quick data model changes and evolution. To learn more about *data modeling with MongoDB*, take our *Data Modeling* course as your next venture into the land of *MongoDB*.

### Upsert - Update or Insert?

Now that we learned some more complex ways to query data and a bit about structuring data, we can expand into more complex ways to update data. Let's learn about *Upsert*.
> First, it's important to note that everything we learn in *MQL* that's used to locate a document in a collection can also be used to modify this document.

```javascript
db.collection.updateOne({<query to locate>}, {<update>})
```

So the first part of the *update operation* is the *query to locate* the document in question. One of the awesome features of *MQL* is the *upsert* option within the *update* command.
> *Upsert* is the hybrid of *update* and *insert* and should only be used when needed.

```javascript
db.collection.updateOne({<query>}, {<update>}, {"upsert": true})
```

The syntax for *upsert* is to list it as the third option right after your *update* directive. So let's talk about what *upsert* is and when should we use it. By default *upsert* is set to *false*. But if you set it to *true* you can expect it to either do an *update* or an *insert*. The *update* will happen if there are documents that match the filter criteria of the *update* operation.

The *insert* will happen if there are no documents that match this criteria. If this option didn't exist, you would have to search before inserting new documents in order to avoid duplicate records with inconsistencies between them, or not search and get documents with identical information. But this is not even the best scenario for which *upsert* is helpful. Let's look at *upsert* in action and see exactly how it works.

Imaging we are running an *internet of Things* application that gathers data from various sources and accumulates it in the database. Then this data is processed to communicate the status of things and other summaries on the accumulated data. One of my favourite examples is a smart home that is filled with sensors. As the owner of the smart home, I'm looking to figure out how to optimize my energy consumption and be more environmentally friendly.

```javascript
{
	"_id": ObjectId("abcd12340101"),
 	"sensor": 5,
 	"date": Date("2021-05-11"),
 	"valcount": 2,
 	"total": 144,
 	"readings": [ { "v": 70, "t": "0000"}, { "v": 74, "t": "0005"} ]
}
```

I have a separate collection per sensor and a separate documents for 48 sensor readings. Each documents contains the sensor *id, date, an array of data collected so far*, and a couple of fields with summary information about the readings in the documents so far. Every time there's a new sensor reading, what is the best way to add that information to the respective document -- *update, insert*? I'll argue that *update* with *upsert: true* is the best course of action.

```javascript
New reading (r)!
sensor = 5,
value = 72,
date = Date("2021-05-11"),
time = "0010"
```

Here's why. Say we have a sensor reading coming in. Let's call it *r* for reading. It contains the information abut the *sensor id*, the value that it's sensing today, and the time at which this reading is recorded, which is at 10 minutes past midnight. We need to *update* our existing document. But it is important to keep a few things in mind. We have to query for the *sensor and date* of the reading to match the document.

```javascript
db.iot.updateOne({
	"sensor": r.sensor,
	"date": r.date,
	"valcount": { "$lt": 48 } }, { "$push": { "readings": { "v": r.value, "t": r.time } },
    "$inc": { "valcount": 1, "total": r.value } }, { "upsert": true })
```

We also have to ensure that there are no more than 48 readings in the *readings* array. Instead of finding the array size every time, we can just keep the number of readings in a *valcount* field. The actual *update* portion of this command is pushing the new reading information about the *value and time* to the *readings* array. But now we have three readings in the array. So we increament the *valcount* by 1.

Finally, I added a *total* field, which keep track of the sum of all the values in the array. So with this field being present in the dock, it also needs updating with each new reading. Here we're increamenting it by the *reading value*. And now it's time for the *upsert: true* option to be explicitly stated.

```javascript
Current document
{
	"_id": ObjectId("abcd12340101"),
 	"sensor": 5,
 	"date": Date("2021-05-11"),
 	"valcount": 3,
 	"total": 216,
 	"readings": [ { "v": 70, "t": "0000"}, { "v": 74, "t": "0005"}, { "v": 72, "t": "0010"} ]
}
```

If the *valcount* becomes greater than or equal to 48, the existing document will no longer match this query. This command will insert a new document.


```javascript
Current document
{
	"_id": ObjectId("abcd12340101"),
 	"sensor": 5,
 	"date": Date("2021-05-11"),
 	"valcount": 48,
 	"total": 3742,
 	"readings": [ { "v": 70, "t": "0000"}, . . . ]
}

New document
{
	"_id": ObjectId("abcd12345309"),
 	"sensor": 5,
 	"date": Date("2021-05-11"),
 	"valcount": 1,
 	"total": 72,
 	"readings": [ { "v": 72, "t": "0010"} ]
}
```

The *id* value will be taken care of, because it's automatically generated on *insert*. The values in the rest of the fields like *sensor, date, valcount and total* will also be taken care of. *Inc* will create the fields and assign them values. And finally, the *readings* field will automatically be an array, because we're using the *push* operator. This one command can both *update and insert*, depending on the **result of the query search**.

Setting *upsert* to *true* is a great option. But you have to be mindful of the *update* that is happening and whether the *update* directive is enough to create the new document in the collection, which will work with the rest of the documents in that collection. If you have a scenario where this is possible, then you have yourself a great use case for *upsert*. *Upsert* is a good option to use for conditional *updates*, when you may want a new document instead of an updated document.

In all other cases, where you're just looking to make an *update* to an existing document, or are looking to insert a brand new document, you should use the respective *update* with default *upsert: false* and *insert* commands.

## Chapter 6: Next Steps

### Atlas Features - More Data Explorer

We already learned in general terms that *Atlas* is a data platform and even used a built-in *sample data set* for this entire course. Let's see what else *Atlas* has to offer at this point of our *MongoDB* journey. Let's start with the *Data Explorer*, which we've seen a lot in this course.

The *Data Explorer* has a number of tabs in it that we haven't used yet. The first one, after our familiar *Find*, is *Indexes*. You can use this tab to view what indexes our collection has. We can create a new index and drop an index if we want to. But most importantly, this is a performance advisor for your database.

Here you can see how often an *index* is used, when it was created, and who created it to get the best performance out of your Atlas cluster. The *schema Anti-Pattern* tab will provide you with sound advice about your data model once enough queries have been issued against the collection.

The *Aggregation* tab allows us to build aggregation pipelines in the UI and see how data is transformed from one stage of the pipeline to another. Let's add in the stages that we've learned so far and see how that works. First, we *match* all documents that have *Wi-Fi* as one of their amenities.

We entered the stage name. And this UI autocompletes suggestions of stages for us. Then there is a comment reminding of the syntax, saying the query in *MQL*. And the curly brackets are already here for us -- how convenient. All I have left to do is enter the field name amenities and the value *Wi-Fi*.

And voila, the section on the right is populated with the output after this *match* stage is applied. Let's add another stage. *Project* is another one that we learned. I'll go with the same example as before and keep only the *price and address* in the pipeline, getting rid of even the *_ID* field value.

And again, the right side of the *UI* shows how the data is now transformed in the pipeline. Note that if I re-order stages like this and put *project* before *match*, the *match* stage will return zero documents, because we eliminated the *amenities* field from the pipeline using *project*.

This tool already showed us that the *order* matters when building an *aggregation pipeline*. Let's bring it all back and add another stage, *group*. And again, there it is, our helpful syntax reminder. Looks like I don't even need to go to the Documentation page to remind myself of the syntax -- how great.

I'll use the same *accumulator* as in earlier lessons to group documents by *country*, count how many listings each country has, and just for fun, add all the listing *prices* together per country. And here it is. I see the results. I can scroll all the way to the right to see all of them.

```javascript
{
	"$group": { _id: "$address.country", count: { "$sum": 1 }, total_price: { sum:"$price" } }
}
db.listingsAndReviews.aggregate([{ "$project": { "address": 1, "_id": 0 }}, { "$group": { "_id": "$address.country", "count": { "$sum": 1 } } }])
{ "_id" : "Hong Kong", "count" : 600 }
{ "_id" : "Canada", "count" : 649 }
{ "_id" : "Brazil", "count" : 606 }
{ "_id" : "China", "count" : 19 }
{ "_id" : "Australia", "count" : 610 }
{ "_id" : "United States", "count" : 1222 }
{ "_id" : "Spain", "count" : 633 }
{ "_id" : "Portugal", "count" : 555 }
{ "_id" : "Turkey", "count" : 661 }
```

But say at this point I just want to know how many countries are in the previous stage. That's no problem. We can have a stage for that too. Let's add *count*. And all it wants me to do is provide a field name for the *count*. I'll call it *num_countries*. And suddenly I know that listings in *nine* countries offer *Wi-Fi* as one of their amenities in this data set.

And that's not even the coolest part about it all. Say I'm now confident in my pipeline. And I want to add it to my application logic -- easy. By hitting the *Export pipeline code* button, you can export the pipeline code to language and then select which language you're writing your application in.

I'll select *Node*. On the left is the aggregation pipeline. On the right is the same pipeline but using *Node*. This I can just copy/paste into my code. To add some more useful information, I'll choose to include the *import statements and driver syntax*. And suddenly I have everything I need to implement this pipeline and any other aggregation pipeline in my application.

```javascript
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'amenities': 'Wifi'
    }
  }, {
    '$project': {
      'price': 1, 
      'address': 1, 
      '_id': 0
    }
  }, {
    '$group': {
      '_id': '$address.country', 
      'count': {
        '$sum': 1
      }, 
      'total_price': {
        '$sum': '$price'
      }
    }
  }, {
    '$count': 'num_countries'
  }
];

MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('').collection('');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  });
```

Finally, there's a feature called *Atlas Search*, which is a fancier fine-grade indexing that enables advanced search functionality in your collection. Check out the lecture notes to learn more about it. To try it out yourself, you can go through the tutorial that is outlined in the docs.

I linked it below the video. Luckily, the tutorial uses the now familiar sample data set. This wraps up our *Data Explorer* journey. We looked at the Performance Advisor using the *Indexes tab* and the *Aggregation Builder*. We also learned that *Atlas* provides schema *Anti-Pattern advisory* and an *Advanced Text Search*.

### Atlas Products and Options

Let's see what else *Atlas* has in stock. In this lesson, we'll discuss *user access* options with *Atlas*, and two *Atlas* products, *Realm and Charts*. Let's start with *Access Manager*. The first thing to know is how projects are structured within *Atlas*. When you first started with *Atlas*, you had to create something called an Organization.

In *Atlas*, this is a way to group projects, teams, and billing at the highest level. If you are using a free tier cluster, there is no need to think about billing. But if you're using a different kind of cluster, the billing happens at the organization level, and you can find the information about it when you click on the billing tab.

Within *Atlas* organizations, you can find Projects. Here I have three projects, each dedicated to a different course that I'm taking, or a different application that I'm working on. To make it easier to manage access within an organization, users can be grouped into teams, and granted access on project level by team, so that there isn't a need to add and shuffle access around on an individual user basis.

Each project can have multiple Atlas clusters within it, as long as each cluster has a unique name. From this project view, I can access some other awesome Atlas features, like *Realm and Charts*. Let's talk *Realm*. *Realm* offers services that let developers build web or mobile applications, or just integrate *MongoDB Atlas* data into an application, all without worrying about managing or scaling servers.

But they can still easily track the database side of things from the *Advanced Configuration* view, once they have launched an application. *Realm*, just like all other *MongoDB* products, has a great documentation page. I linked some resources for learning more about *Realm*, and *app* development with and without *Realm*, below this video.

Now let's return back to our cluster, and see what *Charts* are all about. I personally think that *Charts* are fabulous. This tool allows us to create dynamic data visualizations, and use those visualizations wherever we like. In fact, in this course, we learned enough to create our own data visualization, so let's get started by hitting *Add Dashboard*.

I'll call mine "Airbnb," with the description saying, "prices heat map." A dashboard can have many charts in it. But for this example, we'll only create one. First I'm going to choose a data source, which will be the *sample Airbnb database*, with the listings and reviews collection as the actual source.

I can pre-process the data by applying a query or an aggregation pipeline to the data first. I can also select Sample mode, so that only a sample of documents is going to be used in this chart. I'm not going to do either of those things right now, but you can certainly-- and should, if you want to-- check out this tool to its full potential.

You may have noticed that when I chose a data source, the Field section on the left got populated with all the fields the documents in this collection have, which is super handy because I don't have to worry about spelling anymore. Next, I'll select a chart type, and as the description suggested, it will be a heat map. So I select Geospatial, and then Heat Map.

The section below the chart type is helpfully telling me that I need some information about coordinates, since I'm using a map, and some information by which the intensity of the map will be visualized. For coordinates, I can use the location field in the address sub-document, and for intensity I'll be using the Price field.

And I want the price on Max, meaning that the heat on this map will be determined by the max price as the hottest price. Here's our first chart. I'll title it "Airbnb Prices Heat Map." Right away, I see that something is going on in Turkey.Looks like the hottest Airbnb rental is in Istanbul.

I happen to know that this is incorrect, and there is just a crazy price listed there, so I'll exclude it using the Query field. There, much better. We're only looking at prices that are less than $20,000 per listing. I can now zoom in on Turkey, for example, and find out which Istanbul neighborhoods are the most expensive.

I can go back and zoom into listings in other countries, too.

We can spend a lot more time exploring this chart, but I'll leave it to do it on your own time.

If I click on this button, I find that I can view the aggregation pipeline that was used to create this chart.

And we already know about aggregation pipelines, so this should be easy enough to read.

It looks like behind this visualization, there's a pretty simple aggregation pipeline.

There are many other awesome Atlas tools and features that we are not going to cover in this course, but stay alert for more online content about MongoDB Atlas.

For now, let's summarize what we learned.

In Atlas, billing happens at the organization level.

All projects can be viewed within an organization, and you can use Teams to bulk assign organization users to projects within the organization.

A cluster must have a unique name within a project.

We also learned about Realm, Charts, and below the video you can find links to more learning resources on app development with MongoDB.
