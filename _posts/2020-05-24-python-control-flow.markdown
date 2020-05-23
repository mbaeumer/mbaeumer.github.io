---
layout: post
title: "Python challenge: Controlling the flow"
date: 2020-05-22 20:54:22 +0100
categories: jekyll update
---


This post presents some basic commands for control flow, specifcally `if`-statements, `while` and `for`-loops

# `If`-statements
Let's start with a simple if statement:

{% highlight python %}
if number > 0:
  print("The number is larger than zero.")
{% endhighlight %}

Important to note here are two things: The if-clause ends with a colon and the body of the if-statement needs to be indented correctly.
{% highlight python %}

{% endhighlight %}
An if-statement can be combined with an `else`-clause in the following way:

{% highlight python %}
if number > 0:
  print("The number is larger than zero.")
else:
  print("The number is not larger than zero.")
{% endhighlight %}

Again, the body belonging to the else branch needs to be indented.<br/>
The ternary operator is an alternative for `if`..`else`:

{% highlight python %}
number = int(input("Please enter a number: "))
message="The number is larger than zero." if number > 0 else "The number is not larger than zero."
print(message)
{% endhighlight %}.

Another variant is `if`..`elif` which allows to handle multiple branches in the flow of our code:

{% highlight python %}
if number > 0:
  print("You entered a positive number.")
elif number < 0:
  print("You entered a negative number.")
else:
  print("You entered zero.")
{% endhighlight %}

# `while`-loops
Following is a simple example of a `while`-loop
{% highlight python %}
userinput = ""
while userinput != "X":
  print("Main menu")
  print("---------")
  print("Create - 1")
  print("View all - 2")
  print("Delete - 3")
  print("Exit - X")
  userinput = input("Enter your choice: ")
{% endhighlight %}

# `for`-loops
`for`-loops can be used in various ways, e.g. for iterating through a string:

{% highlight python %}
word = "hello"
for letter in word:
  print(letter)
{% endhighlight %}

The limit of the loop can be defined using the `range` keyword:

{% highlight python %}
for i in range(10):
  print(i, end=" ")
{% endhighlight %}

It is also possible to define the counting interval:

{% highlight python %}
for i in range(0,10,2):
  print(i, end=" ")
{% endhighlight %}

Last but not least, a `for`-loop can be executed backwards:

{% highlight python %}
for i in range(10,0,-1):
  print(i, end=" ")
{% endhighlight %}
