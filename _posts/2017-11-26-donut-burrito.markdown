---
layout: post
title: "A donut and a burrito do some pair programming"
date: 2017-11-26 20:09:47 +0100
categories: jekyll update
---
Pair programming is an agile practice that is – despite of not being very new – not widely used in industry. One major objection is that it might cause double costs, thus it is not promoted. Another reason is that people are simply not used to working that way and therefore probably doing it in a wrong way. This article illustrates a scenario how pair programming can be like and how we can succeed with it.<br/>
<br/>
Burrito: Hi buddy, how is it going?
Donut: Fine, I am working on a little utility to generate markdown content, that we can use for our project's website.
Burrito: Sounds good. How far have you come?
Donut: Well, I just completed the main feature, so that the file and its content is generated. Wait, let me show you...
Burrito: Nice, but what language are you using?
Donut: I decided to use python. Python is not my main language, but I know it a bit and figured I could practice a bit with some concrete problem scenario. So this is what I have done so far...
<br/>
The donut runs the script and explains: So the script takes two command line arguments, validates them, generates the content and writes everything to the file.
Burrito: Cool, this could simplify the work in the future. Can I try it?
<br/>
The burrito takes over the keyboard and runs the script with similar arguments.
Then, the burrito runs the script again, but this time with deliberately wrong parameters. The script fails and they both look at the output on the screen.
<br/>
<br/>
Donut: Oops, that I have not handled.
Burrito: No problems, mate! Just add another test case for that and implement the check.
Donut: Well, I have no tests at all right now. I figured the script is so small so I can test the most important things manually.
Burrito: Oh ok...But wouldn't it be good to add test cases so that you can verify that the most important  things work as expected?
Donut: I see your point, but it seems a bit overkill to write tests for everything, doesn't it?
Burrito: Hm, of course it will be a bit more effort, but it might be worth it. I mean, imagine that the team starts using your script in the future. Wouldn't it be good to be certain that it works. And if you decide to add some new feature or argument you'd basically have to test all scenarios again by hand.
Donut: I admit it does make sense. It could save some time later on...
Burrito: Exactly! Again, I know that writing test cases could mean that you need to spend more time, but I think it is a good Return on investment...so time well spent!
Donut: Well, you are right! Thanks for the eye-opening. But when I think about it, the code as it is now, is not really testable. So if I want to add tests, I probably need to change the code to be tested, right!?
Burrito: Hm, you are probably right. But that is no bigger problem, is it? I mean when I write code, I probably change things quite often before I consider them completely done. And even after I committed the code, I might find things that I must improve, so I stepwise refine it.
If you want, we can sit together a while and discuss various improvements.
Donut: Sure why not !?<br/>
Burrito: OK, I get a chair and you can walk me through the code.
<br/>
<br/>
A couple of seconds later, they sit next to each other.
Donut: So, here is the main function: It takes the arguments, calls the validate function and generates the content.
Burrito: Alright, this is pretty straightforward. Good that you have separated the validation of the command line  arguments to a function of its own.
Donut: Yes, I thought it would be good to have an own function for that. It simply returns true if the arguments are correct and false if not.
Burrito: Makes sense, however, there are no test cases for that, right?
Donut: Exactly, as I said earlier, the code as it is now, is not really testable.
Burrito: OK, what would you suggest to make it more testable? I can see that you put the whole code in one file. What if you move the code for the validation to a different file?
Donut:  Hm, I could do that. But what is the point of that? It is not that much code anyway
Burrito: Then you could call the validation function in a more isolated way...and it will be easier to find the validation function. 
Donut: Ah ok, I get it. Then I could call it from a test case. We can do that!
The donut moves the function to a new file
Donut: OK, now I just need to import the function so it is accessible from the main function...
Burrito:Good!<br/>
Donut: So, I'm finished. But we still have no test cases as you suggested.<br/>
Burrito: Well, then write some...as far as I can see the function takes some parameters and returns true or false. That is pretty easy to test, isn't it?
Donut: You are right, should not be that hard! So we could start with two tests basically, one that tests successful validation and one that tests failed validation., right?
Burrito: Precisely!<br/>

Shortly after that, there are two different test cases.<br/>
Donut: So, now we have two tests, the first provides two parameters and asserts that true will be returned. The second one passes two incorrect arguments and asserts false as return value.
Let's run the test cases.<br/>
<br/>
The donut runs the tests
Burrito: OK, the tests pass, that's a good start!<br/>
Donut: Let me try something, just to be sure. I want to check if the tests fail, if we change the assertions.
After the small change both tests fail. The donut undoes the changes so that the tests pass again.
Donut: Good, now there are two tests that can be executed all the time to make sure that the validation of the arguments works. But one thing still disturbs me: The error messages are printed inside the validation function. Wouldn't it be good too separate that more? What do you think?
Burrito: Sure, why not?! Is it ok for you that I code a bit? It has been a while that I worked with Python so it could be fun for a change.
Donut: Absolutely.
Burrito: So, what is your idea about the validation function ?
Donut: I admit the current implementation is a bit of a quick hack, but now when I think about it: It makes more sense if the function returns some kind of status instead of just a boolean. Don't you think?
Burrito: Ah, ok, you mean some sort of enumeration?
Donut: Exactly, then we can handle a bunch of different error scenarios..
Burrito: That means we need to define a new enumeration in a new python file, and then make the validation function return this enumeration. I probably need a bit help with the exact syntax, I guess  you know a bit more details right now.
Donut: No problem, I can guide you a bit and you can keep the keyboard. Maybe we could start writing the test case.
A couple of minutes later they have modified the test cases. 
Burrito: So, of course the tests fail as the code under test is not updated. Now we need to modify the validation method as we just discussed.
The burrito changes the validation so that it returns an enumeration.
Shortly after, they re-run the tests and everything passes.
Donut: Nice, I gotta admit, it was good to introduce test cases...
Burrito: Right? Now you can always verify that a vital part of the script is working as expected without testing various scenarios manually each time you change something.
Donut: You are right. And, we managed to improve the code to make it better and more testable. I actually have some more ideas for more improvements.
Burrito: Cool, unfortunately, I gotta run because I have a meeting soon. But it was fun to do some coding with you, I think I will practice a bit more python in the future. Let us follow up on that. 
Donut: Absolutely, thanks for your input. I will put more effort into the tests and get back to you soon.
Burrito: Great, we can sit together soon again and figure out how to proceed with this. It was kind of fun to look at a bit of Python code. I think I should do that more often.
<br/>
**What did just happen?**
First of all, I admit this dialogue might be too peaceful, i. e. in practice there are maybe a bit more discussions and conflicts. Anyway, the donut and the burrito had a successful episode of pair programming. They succeeded due to various reasons:


* They iare obviously used to working in pairs, at least for shorter periods.
* They work in an open environment where people are allowed to make mistakes.
* They are willing to learn from each other
* They collaborate and hand over the keyboard without discussions

<br/> 
**So where to go from here?**
There are a couple of lessons we can learn from this or similar situations. Here I want to focus mainly on pair programming and collaboration.<br/>
The first lesson is that pair programming has various benefits. One big value of it is that ideas are discussed and evaluated quite early. For instance, I experience often that an early review of an idea or implementation makes the result simpler and more straightforward. Another advantage is that best practices, such as automated testing or design principles, are exercised more consistently when people collaborate. Besides, potential “quick hacks” are improved earlier and the technical debt does not increase too much.<br/>

The second and a bit more general lesson is that collaboration between individuals can lead to better results, regardless of the industry we are working in. Be it as craftsmen, doctors, physical therapists (or other professions) collaboration triggers new ideas, improves knowledge sharing, and builds trust between individuals.
<br/>
What are your experiences of pair programming (or collaboration in general)?
 

 
