---
layout: post
title: "Python challenge: Performing file operations"
date: 2018-01-07 18:12:31 +0100
categories: jekyll update
---

This blog post demonstrates how different file operations can be performed in Python. For starters the focus is on the following:

* get the current working directory
* list files
* determine wether a file is a file or directory
* determine if a file exists
* rename a file
* delete a file
* create a directory

# Get the current work directory
{% highlight python %}
os.getcwd()
{% endhighlight %}

# list files
{% highlight python %}
os.listdir(directory)
{% endhighlight %}

# determine wether a file is a file or directory
The following function returns "file", if the file is an actual file or "directory" if it is a directory.
{% highlight python %}
def getDirOrFile(file):
  result = "file"
  if os.path.isdir(file):
    result = "directory"
  return result
{% endhighlight %}

# determine if a file exists
{% highlight python %}
if os.path.exists(filename):
  print("The file %s exists" % (filename))
else:
  print("The file does %s not exist" % (filename))
{% endhighlight %}

# rename a file
Files can be renamed  as shown below. 
{% highlight python %}
os.rename(old_name, new_name)
{% endhighlight %}

However, if a file with the new name already exists, it will be overwritten.

# delete a file
The following function deletes a file.

{% highlight python %}
def delete_file(filename):
  print("...deleting a file")
  if os.path.isfile(filename):
    os.remove(filename)
    print("The file %s has been deleted" % (filename))
  else:
    print("The file %s does not exist" % (filename))
{% endhighlight %}

Trying to delete a non-existing file will cause an error, so it is better to check prior to deleting it.

# create a directory
The following creates a directory:

{% highlight python %}
 if not os.path.exists(directory):
    os.makedirs(directory)
{% endhighlight %}
Trying to create a directory that already exists will cause an error. Therefore, it is better to check before.

## Further resources
[My python challenge](https://mbaeumer.github.io/jekyll/update/2017/05/30/python-challenge-intro.html)<br/>
[Fully working example on github](https://github.com/mbaeumer/python-challenge/tree/master/block7-fileio/simple_file_ops)
