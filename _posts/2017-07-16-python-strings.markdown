---
layout: post
title: "Python challenge: Exploring strings"
date: 2017-07-16 15:00:00 + 0100
categories: jekyll update
---
Here are some functions that can be applied on strings. Let's take "lorem ipsum" as a dummy example:
{% highlight python %}
lorem = "lorem ipsum"
{% endhighlight %}

# Printing a string
{% highlight python %}
print("Dummy string:  ", lorem)
{% endhighlight %}

# Getting the length of a string
{% highlight python %}
print("Length: ",len(lorem))
{% endhighlight %}

# Capitalize a string
{% highlight python %}
print("Capitalized: " + lorem.capitalize())
{% endhighlight %}

# Checking if a string ends in a certain way
{% highlight python %}
print("endswith 'ipsum': " + str(lorem.endswith("ipsum")))
{% endhighlight %}

# Checking if a string is lower case
{% highlight python %}
print("islower: " + str(lorem.islower()))
{% endhighlight %}

# Checking if a string is numeric
{% highlight python %}
print("isnumeric: " + str(lorem.isnumeric()))
{% endhighlight %}

# Checking if a string contains a white space
{% highlight python %}
print("isspace: " + str(lorem.isspace()))
{% endhighlight %}


# Testing for string equality
{% highlight python %}
lorem2 = "lorem ipsum"
if lorem == "lorem ipsum":
  print("The strings are equal")
else:
  print("The strings are not equal")
{% endhighlight %}

This check is quite simple, but somewhat incorrect as it is case-sensitive.
If you want to compare two strings without case-sensitivity, the following is more suitable:
{% highlight python %}
lorem2 = "lorem ipsum"
if lorem.lower() == lorem2.lower():
  print("The strings are equal")
else:
  print("The strings are not equal")
{% endhighlight %}



# Checking if a string contains a certain substring
{% highlight python %}
print("m" in lorem)
print("a" in lorem)
{% endhighlight %}

This will return true, if the string contains the substring in question. 

# Checking at which index a certain substring appears
{% highlight python %}
print("lorem", lorem.find("lorem"))
print("rem", lorem.find("rem"))
print("ips", lorem.find("ips"))
print("abc", lorem.find("abc"))
{% endhighlight %}

This will return a number indicating where the substring in question occurs. If the number is -1, then the substring is not present.

# Checking how often a substring appears in a string
The easiest and most common way to check that is by using `count`:
{% highlight python %}
teststring = "abbaaaa"
print(teststring.count("aa"))
{% endhighlight %}
Note that `count` ignores overlapping occurences. Here, the number `2`is printed.

# Iterating through a string
{% highlight python %}
i = 0
while i < len(lorem):
  print(lorem[i])
  i = i +1
{% endhighlight %}

Another way could be as follows:

{% highlight python %}
for c in lorem:
  print(c)
{% endhighlight %}

This is a bit shorter and more pythonic.
  
# Splitting a string
{% highlight python %}
splitted = lorem.split(" ")
for word in splitted:
  print(word)
{% endhighlight %}

Here, the string will be splitted at each white space. You can use other separators as well.

# Removing a character in a string
{% highlight python %}
new_lorem = lorem.replace("m", "")
{% endhighlight %}

# Inserting a character into a string
{% highlight python %}
new_lorem = lorem[:5] + "-" + lorem[6:]
{% endhighlight %}

This will insert a dash after the fifth character.

# Using the `not` operator with strings
{% highlight python %}
name=""
if not name:
  print("the name is not set")
name="abc"
if not name:
  print("the name is not set")
else:
  print("now the name is set")
{% endhighlight %}

## Further resources
Example code for the string operations above can be found [here](https://github.com/mbaeumer/python-challenge/tree/master/block2-datatypes/strings)<br>
[My python challenge](https://mbaeumer.github.io/jekyll/update/2017/05/30/python-challenge-intro.html)

