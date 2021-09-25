# The MongoDB Aggregation Framework

## Chapter 0: Introduction and Aggregation Concepts

### Introduction to the MongoDB Aggregation Framework

Hi, I'm Nathan. Welcome to *M121-the MongoDB Aggregation Framework*. I'll be one of your instructors for this course. Throughout this course, we're going to discuss the *aggregation framework, a key feature of MongoDB*. You'll learn about *expressive filtering, powerful data transformation, statistical utilities and data analysis*, and how to do much more work with a single operation.

This course is seven chapters long. With each chapter, there will be a new set of lesson videos. After most of these lessons, there will be a quiz to assess your learning of the material. At the end of each chapter, there will be a set of related lab exercises. Let's go over a few of the course logistics.

The target audience -- this is a beginner's course focused on developer practices. If you're coming from an operations background, fear not, young grasshopper, we have something for you too. It is expected that you are familiar with the *MongoDB query language*. If you aren't, we recommend you taking our definitive beginner course, *M001, before attempting M121*.

How does grading work? There are quizzes, labs, and a final exam. Quizzes are ungraded and exist to make sure that you're understanding the content. Your grade in the class, however, will be based on how well you do on the labs and the final exam, each of these being worth 50% of your total grade. Students with a grade of 65% or greater will receive a passing grade and will get a certificate of completion.

Finally, I'd highly encourage you to participate in the discussion forum. We have knowledgeable teaching assistants who are there to answer your questions. We also have your classmates who can also contribute to answering your questions and are often beneficial and knowledgeable resources. The labs in this course can be challenging.

Based on our experience, we've seen that students who perform best in the course are those who are most active in the discussion forum. By the end of this course, you should be familiar with how to transform data, perform data analysis, and reallocate work to the server from your client application. With all of that said, we're excited to have you as a student in this course. Best of luck.

### Atlas Requirement

Before we dive into the course, let's discuss some prerequisites and walk through connecting to the infrastructure that is going to support the class. The course prerequisites are minimal. All that is required is a modern 64-bit operating system and an internet connection and your participation. One note -- you'll also need to be able to make a TCP connection on port 27017.

This is easy to test. Visit portquiz.net:27017. You should see a page that looks a lot like this. And make sure that you see something like this here that says you've reached this page on port 27017. If you don't see this page, please contact your network administrator about opening up this port. Additionally, make sure you post in the forums so that we can help you until this issue is resolved.

As you've seen myself and other instructors use new aggregation operators throughout the course, you are highly encouraged to pause the video and follow along. All collections will perform operations on will be available to you in the Class Atlas cluster. So what's Atlas? Atlas is MongoDB's cloud-hosting service. We'll let MongoDB worry about optimizing storage, security, and backing up our data for this course.

Signing up for Atlas is easy and free. Visit mongodb.com/cloud/atlas and click the Get Started Free button. After clicking the button, go ahead and fill out your information and click Get Started Free again. And for now, that's it. We'll be revisiting Atlas later on in the course. Next, let's ensure we have MongoDB installed. Visit mongodb.com and click the Download button.

Navigate over to Enterprise and select the download that's appropriate for your operating system. Enterprise is free to test and evaluate, so we'll be using it throughout the course. While that's downloading, let's click Resources and Documentation. Click on Tutorials and click MongoDB Enterprise. Scroll down and find the tutorial for installing MongoDB Enterprise on your specific operating system.

Lastly, we need to test our connection to the class Atlas cluster. Open a terminal and paste the information you find below this video. Go ahead and type show dbs to see all of the available databases available on the cluster. Typing show collections will show collections within the aggregations database. And that's it for the course prerequisites in connecting to Atlas.
