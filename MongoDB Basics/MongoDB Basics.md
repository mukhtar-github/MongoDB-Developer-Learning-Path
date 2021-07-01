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

It's time to upgrade our *MQL* skills and add some complexity to our queries. Let's start by introducing *comparison* operatorsto our tool box. We already used *MQL* Operators in the previous lessons, where we saw examples of *Update* operators, like *$set, $inc, and $unset*, which enabled you to modify data in your database. *Query* operators provide additional ways to locate data within the database.

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
