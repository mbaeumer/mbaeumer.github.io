---
layout: post
title: "Python challenge: Exploring enumerations"
date: 2017-07-16 15:00:00 +0100
categories: jekyll update
---
Here are some examples of working with enumerations:
# Defining an enumeration
{% highlight python %}
from enum import Enum

class Status(Enum):
  OPEN = 1
  ONGOING = 2
  COMPLETED = 3
{% endhighlight %}

# Importing an enumeration
Provided the enumeration above is created and saved in a file named status.py, you can import it as follows:
{% highlight python %}
from status import Status
{% endhighlight %}

# Creating a variable of type Status with value OPEN
{% highlight python %}
status  = Status.OPEN
print("Status: " + str(status))
{% endhighlight %}

# Setting the status with a numeric value
{% highlight python %}
another_status = Status(2)
print(another_status)
{% endhighlight %}

# Checking the value of the enum variable
{% highlight python %}
if status == Status.COMPLETED:
  print("Congrats, the task is completed")
else:
  print("Sorry, the task is not completed yet")
{% endhighlight %}

# See all available values for the enumeration status
{% highlight python %}
for status in Status:
  print(status)
{% endhighlight %}

# Accessing the enum by numeric value: Status(1)
{% highlight python %}
print(Status(1))
{% endhighlight %}

# Accessing an enum value that does not exist: Status(4) should not exist
{% highlight python %}
try:
  print(Status(4))
except ValueError:
  print("Status(4) is not valid!")
{% endhighlight %}

# Checking if a potential member is really a member of an enum
{% highlight python %}
print(isinstance(Status.OPEN, Status))
{% endhighlight %}

# Retrieving the value of an enum member
{% highlight python %}
print("Status.OPEN has the numeric value %d " % (Status.OPEN.value))
{% endhighlight %}

# Further resources
[My python challenge](https://mbaeumer.github.io/jekyll/update/2017/05/30/python-challenge-intro.html)

