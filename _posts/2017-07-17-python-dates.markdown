---
layout: post
title: "Python challenge: Exploring dates"
date: 2017-07-17 19:00:00 +0100
categories: jekyll update
---

Here are some examples on working with dates.<br/>
# Creating a date using the time module
{% highlight python %}
now = time.asctime(time.localtime(time.time()))
print("the current time using the time module: " + now)
{% endhighlight %}

# Creating a date only using datetime
{% highlight python %}
date = datetime.datetime.strptime("2017-07-01", "%Y-%m-%d")
print("The date in the format Y-m-d: " + date.strftime("%Y-%m-%d"))
print("The date in the format Y-m-d H:m: " + date.strftime("%Y-%m-%d %H:%M"))
{% endhighlight %}


# Creating a date with time using datetime
{% highlight python %}
date = datetime.datetime.strptime("2017-07-01 15:34", "%Y-%m-%d %H:%M")
print(date.strftime("%Y-%m-%d %H:%M"))
{% endhighlight %}

# Adding some time to an existing date

{% highlight python %}
date1 = datetime.datetime.strptime("2017-07-01 15:34", "%Y-%m-%d %H:%M")
date2 = date1 + datetime.timedelta(days=1)
print("date1: " + date1.strftime("%Y-%m-%d %H:%M"))
print("date2: " + date2.strftime("%Y-%m-%d %H:%M"))
{% endhighlight %}

# Calculating the difference between two dates

{% highlight python %}
date2 = datetime.datetime.strptime("2017-07-02 16:35", "%Y-%m-%d %H:%M")
print("all: ", date2 - date1)
print("days: ", (date2 - date1).days)
print("seconds: ", (date2 - date1).seconds)
print("microseconds: ", (date2 - date1).microseconds)
{% endhighlight %}

