---
layout: post
title: "Python challange: warmup exercises"
date: 2017-06-11 18:32:21 +0100
categories: jekyll update
---
I decided to start my Python challenge with a unch of warmup exercises simply to get a feeling for the syntax and for how to work with that language
This exercises include:


* hello world and running python
* getting the user's input
* handling command line arguments
* working with functions
* writing test cases


## How to execute a simple 'hello world'?

After installing python 3, I took the classic hello world example 
{% highlight python %}
print("hello world")
{% endhighlight %}

...and executed it like this:
{% highlight bash %}
python3 hello.py
{% endhighlight %}

## How to get the user's input?
{% highlight python %}
print("Demo of user input")
print("")
response = input("Please enter your name: ")
print ("Hello, ", response)
{% endhighlight %}
<br/>
The user's input can be caught by the input function followed by a message.

## How to handle command line arguments?
{% highlight python %}
import sys
print("Demo of CLI handling")
print("")
print("Number of CLI args: ", len(sys.argv))
print("CLI args: ", str(sys.argv))
{% endhighlight %}
<br/>
In order to handle command line arguments, the _sys_ module needs to be imported.<br/>
The arguments themselves are stored in the _argv_ array
 
## Implementing a simple function
{% highlight python %}
def sum(a, b):
  return a + b

print("calling sum...")
print(sum(5,5))
{% endhighlight %}
<br/>
A function starts with the keyword _def_ followed by the name and parameters if suitable.<br/>
The function's body needs to be indented.

## Writing a test case
Usually, Python is not strictly object-oriented. Test cases however are implemented as classes.<br/>
The following is a test class that contain a test case for the sum function above:<br/>
{% highlight python %}
import unittest
from sum_function import sum

class SumTestCase(unittest.TestCase):
  def test_sum(self):
    self.assertTrue(sum(5,5)==10)

if __name__ == '__main__':
  unittest.main()
{% endhighlight %}

