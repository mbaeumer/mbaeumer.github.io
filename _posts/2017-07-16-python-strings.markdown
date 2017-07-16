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
if lorem == 'lorem ipsum':
  print("The strings are equal")
else:
  print("The strings are not equal")
{% endhighlight %}

# Checking if a string contains certain characters
{% highlight python %}
print("m" in lorem)
print("a" in lorem)
{% endhighlight %}

# Checking at which index a certain substring appears
{% highlight python %}
print("lorem", lorem.find("lorem"))
print("rem", lorem.find("rem"))
print("ips", lorem.find("ips"))
print("abc", lorem.find("abc"))
{% endhighlight %}

This will return a number indicating where the substring in question occurs. If the number is -1, then the substring is not present.

Iterate through a string
{% highlight python %}
i = 0
while i < len(lorem):
  print(lorem[i])
  i = i +1
{% endhighlight %}

I know that there are more fancy ways to do that, but I start with a readable version.
  
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
