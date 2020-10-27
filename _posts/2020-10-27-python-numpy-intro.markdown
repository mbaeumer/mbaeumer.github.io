---
layout: post
title: "Python challenge: Simple introduction to numpy"
date: 2020-10-27 19:32:00 +0100
categories: jekyll update
---

This blog post provides a simple introduction to numpy.<br/>

# What is numpy?
Numpy is a Python library offering a large variety of mathematical functions. It is particularly popular because of its support for matrix-related functionality.

# How to install numpy?
Since numpy is not a part of the standard Python installation, it needs to be installed separately. One way of doing so is using pip3:
```bash
pip3 install numpy
```

# Using numpy

## Creating arrays
There are a couple of functions that can be used to create and initialize arrays
The following creates an array with 3 numbers; 3, 5, and 9:
{% highlight python %}
a = array([3,5,9])
{% endhighlight %}

As opposite, we can create an empty array of 3 elements.
{% highlight python %}
empty_array = empty([3]) 
{% endhighlight %}

In some cases, it will be convenient to initialize an array, in which each element has the same value. For instance, one would like to initiate an array with zeros or ones:
{% highlight python %}
array_with_zeros = zeros([3])
array_with_ones = ones([3])
{% endhighlight %}

## Reading data from a file
The functions demonstrated above are used when arrays are populated "manually". However, a more common way to populate arrays are by reading the data from a file.
This can be done using numpy´s `loadtxt` function.
Suppose we need to read the data from the following file:
```bash
Reservations  Beers
13            33
2             16
14            32
23            51
```
The data was collected in a pub/restaurant. It shows the number of reservations along with the number of beers ordered the same day.<br>
Now, let´s say we would like to store each column in the file in a 1-dimensional array:  
{% highlight python %}
X, Y = np.loadtxt("beer.txt", skiprows=1, unpack=True)
{% endhighlight %}
This reads the context from beer.txt, skips the first row in the textfile and saves the values in each column to an array (X and Y).

## Mathematical functions
Numpy provides many different mathematical functions, some of which are shown below:
{% highlight python %}
print(np.average(X)) # the average of all elements in X

print(np.max(X)) # the value of the largest element in X

print(np.min(X)) # the value of the lowest element in X

print(np.sum(X)) # the sum of all elements in X

print(np.argmax(X)) # the index of the largest element in X

print(np.argmin(X)) # the index of the lowest element in X
{% endhighlight %}


## Matrix operations

### Creating a matrix
One way to create a matrix with numpy is using the aforementioned functions `zeros` and `ones`.
{% highlight python %}
matrix_with_zeros = np.zeros([3, 3]) 
{% endhighlight %}
This creates a matrix with 3x3 elements initialised with 0.
If one wants to initialise the matrix with vaues from a file, the function `column_stack` can be used:
{% highlight python %}
X, Y = np.loadtxt("beer.txt", skiprows=1, unpack=True)
...
matrix = np.column_stack((X, Y))
{% endhighlight %}

### Manipulating a cell´s value
The value of a cell can be changed using the row and column index of the cell:
{% highlight python %}
matrix[0,0] = 5
{% endhighlight %}

### Inserting a row
Numpy´s insert function takes a couple of parameters: The first one is the affected matrix, the second is the index where the row is inserted. The third parameter is the value to insert. The last one indicates if a row or a column is inserted. If `axis` is equals 0, a row is inserted.
{% highlight python %}
matrix = np.insert(matrix, 1, 1, axis=0)
{% endhighlight %}

### Inserting a column
When inserting a column, the last parameter (`axis`) needs to be 1
{% highlight python %}
matrix = np.insert(matrix, 1, 1, axis=1)
{% endhighlight %}

Deleting rows and columns is done in a similar way.

### Deleting a row
{% highlight python %}
matrix = np.delete(matrix, 1, axis=0)
{% endhighlight %}

### Deleting a column
{% highlight python %}
matrix = np.delete(matrix, 1, axis=1)
{% endhighlight %}


# Further resources
[My python challenge](https://mbaeumer.github.io/jekyll/update/2017/05/30/python-challenge-intro.html)
[The code examples](https://github.com/mbaeumer/python-challenge/tree/master/numpy-examples)
