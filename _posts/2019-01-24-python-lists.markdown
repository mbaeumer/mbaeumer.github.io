---
layout: post
title: "Python challenge: Handling lists"
date: 2019-01-24 21:46:57 +0100
categories: jekyll update
---
Here are some very simple operations that can be performed on lists:

# Initialize an empty list
{% highlight python %}
names = []
{% endhighlight %}

# Adding a string to the list
{% highlight python %}
names.append("Martin")
{% endhighlight %}

# Inserting a new string at a custom position
{% highlight python %}
names.insert(0, "Kalle")
{% endhighlight %}

# Deleting an item from the list
One way of deleting an item is the `del` function:
{% highlight python %}
del names[0]
{% endhighlight %}
Another alernative is the `remove` function:
{% highlight python %}
names.remove("test")
{% endhighlight %}
Note that this call can cause a `ValueError`, if the list does not contain such an object.

# Checking if the list contains a certain string
{% highlight python %}
if names.count("Joe") > 0:
  ...
{% endhighlight %}
The function `count` returns a value larger than 0, if the list contains the string in question.

# Sorting the list
{% highlight python %}
names.sort()
{% endhighlight %}

# Getting the size of the list
{% highlight python %}
len(names)
{% endhighlight %}

# Lists that contain complex objects
Of course, lists can also contain non-primitive objects. The following code iterates through a list of objects of type `Contact` and calls the `displayContact` function.
{% highlight python %}
for contact in contacts:
  contact.displayContact()
{% endhighlight %}

# Sorting the list based on a certain criteria
Lists that contain complex atttributes can be sorted based on such an attribute.
{% highlight python %}
new_list = sorted(contacts, key=lambda x: x.firstname, reverse=False)
{% endhighlight %}
This will sort the contact list ascending based on their firstname. The `sorted` function returns a new, sorted list and keep the original list unchanged. The content of the new list is as follows:

{% highlight bash %}
Sorting the list based on the first name 
Bob, Marley, mail, 071666224
Jane, Doe, mail, 01356867566
Laurel, Aitken, mail, 983444566
Martin, Bäumer, mail, 0786777566
{% endhighlight %}

# Using list comprehension
Above, I have used a standard for loop to iterate through a list. This can be replaced by a list comprehension:
{% highlight python %}
[contact.displayContact() for contact in contacts]
{% endhighlight %}
A comprehension contains an expression followed by a `for` statement. The idea of comprehensions is to shorten the code and to make it easier to read.

# Filtering a list using list comprehension
Comprehensions can be also used to filter lists, that is we can search through a list for matching items. The following example finds all contacts that have phone numbers containing the number 1:
{% highlight python %}
[contact.displayContact() for contact in contacts if "1" in contact.phone]
{% endhighlight %}

# Further resources
A working example can be found on [github](https://github.com/mbaeumer/python-challenge/tree/master/block5-datastructures/lists)
