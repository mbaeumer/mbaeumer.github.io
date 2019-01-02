---
layout: post
title: "Python challenge: Handling json files"
date: 2017-11-18 17:00:34 +0100
categories: jekyll update
---

This blog post describes how to read and write json files in python 3.<br/>

# Reading json files
In this example, the python script will read product information from an existing json file.<br/>
The content of products.json is as follows:
{% highlight json %}
{
    "products": [
        {
            "price": 25.0,
            "name": "Widget",
            "quantity": 12
        },
        {
            "price": 37.0,
            "name": "Phone",
            "quantity": 5
        },
        {
            "price": 1500.0,
            "name": "Laptop",
            "quantity": 23
        },
        {
            "price": 560.0,
            "name": "bed",
            "quantity": 15
        },
        {
            "price": 120.0,
            "name": "cd-player",
            "quantity": 77
        }
    ]
}
{% endhighlight %}
In general we have two alternatives:

* we read only the raw data and get the result as a dictionary.
* we read the raw data and parse them into objects, so the result will be a listof objects.

The following code reads the json file and returns a dictionary. If the file does not exist, a FileNotFoundError will be thrown that has to be handled by the caller of this function.
{% highlight python %}
import json
def read_raw_data(filename):
  data = {}
  try:
    with open(filename) as data_file:    
      data = json.load(data_file)
  except FileNotFoundError:
    raise FileNotFoundError
  return data 
{% endhighlight %}
Nothing more than that. However, the result is probably of not much value as it is just a (potentially large) dictionary.<br/>
The next step is to parse that dictionary into something more usable. In this concrete example, a list of products sounds reasonable.<br/>
The following is the definition of the Product class:

{% highlight python %}
class Product:
  def __init__(self, name, price, quantity):
    self.name = name
    self.price = price
    self.quantity = quantity

{% endhighlight %}

Next, the content of the json file needs to be handled in a way that a list of products is returned.

{% highlight python %}
def read_json_file(filename):
  products = []
  try:
    with open(filename) as data_file:
      data = json.load(data_file)
    products_json = data["products"]
    for p in products_json:
      product = Product(p['name'], p['price'], p['quantity'])
      products.append(product)
  except FileNotFoundError:
    raise FileNotFoundError
  return products
{% endhighlight %}

# Writing json files
Again, not much work is required.

{% highlight python %}
import json
from product import Product

def write_json_file(filename, products):
  with open(filename, 'w') as outfile:
    json.dump(products, outfile, indent=4)
{% endhighlight %}

The function takes two arguments: The name of the json file and a list of products.<br/>
When the above functions is called, the following error occurs:
{% highlight bash %}
TypeError: <product.Product object at 0x1029f4470> is not JSON serializable
{% endhighlight %}

So obviously something is missing before data can be written to a json file. As the error message suggests, the objects in the list of products are not serializable.<br/>
This can be solved by adding a serializer function to the Product class:

{% highlight python %}
  def to_dict(self):
    data = {}
    data['name'] = self.name
    data['price'] = self.price
    data['quantity'] = self.quantity
    return data
{% endhighlight %}
This will create a dictionary containing the member variables as key/value pairs.<br/>
So now the only thing left is to call this serializer function for each product before writing the data to the file.

{% highlight python %}
def prepare_data_to_write(products):
  products_dictionaries = []
  for p in products:
    products_dictionaries.append(p.to_dict())
  data = {"products": products_dictionaries}
  return data  
{% endhighlight %}
After the list of products is prepared, i.e. made JSON serializable, the above function write_json_file can be called.

## Further resources
[My python challenge](https://mbaeumer.github.io/jekyll/update/2017/05/30/python-challenge-intro.html)<br/>
[Fully working example on github](https://github.com/mbaeumer/python-challenge/tree/master/block7-fileio/simple_file_read_write/json)
