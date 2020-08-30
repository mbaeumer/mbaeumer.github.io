---
layout: post
title: "Python challenge: Exploring numbers"
date: 2020-08-30 23:42:00 +0100
categories: jekyll update
---

Here are some examples on working with numbers.<br/>
# Data types for numbers
In python there are three different datas available for handling numbers

* int
* float
* Decimal

# Converting from string
When working with numbers, a typical thing to do is to create them from string values:
## Convert from string to int

{% highlight python %}
def convert_to_int(s):
  try:
    print(int(s))
  except ValueError:
    print("Cannot convert to int")
{% endhighlight %}

## Convert from string to float

{% highlight python %}
def convert_to_float(s):
  try:
    print(float(s))
  except ValueError:
    print("Cannot convert to float")
{% endhighlight %}

## Convert from string to Decimal
Decimals are handled slightly differently as compared to `int` and `float`.
To use Decimals, the following imports are needed:

{% highlight python %}
from decimal import Decimal
from decimal import DecimalException
{% endhighlight %}

...now it is possible to create a Decimal from a string value:

{% highlight python %}
def convert_to_decimal(s):
  try:
    print(Decimal(s))
  except DecimalException:
    print("Cannot convert to Decimal")
{% endhighlight %}

# Formatting numbers
There are numerous alternatives when it comes to formatting numbers. Some are listed below:
{% highlight python %}
def format_number(number):
  print("{:.2f}".format(number))  # 4.86
  print("{:+.2f}".format(number)) # +4.86
  print("{:.0f}".format(number))  # 5
  print("{:0>2d}".format(5))      # 05
  print("{:,}".format(1000000))   # 1,000,000
  print("{:.2%}".format(number))  # 485.71%
  print("{:.2e}".format(number))  # 4.86e+00
  print("{:10d}".format(50))      #         50
  print("{:<10d}".format(50))     # 50
  print("{:^10d}".format(50))     #     50
{% endhighlight %}

# Further resources
[My python challenge](https://mbaeumer.github.io/jekyll/update/2017/05/30/python-challenge-intro.html)
