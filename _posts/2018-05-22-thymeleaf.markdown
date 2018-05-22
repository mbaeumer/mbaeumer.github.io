---
layout: post
title: "Spring Boot lab (part 5): Adding Thymeleaf"
date: 2018-05-22 20:45:06 +0100
categories: jekyll update
---

## What will be done here?
So far, my series about Spring Boot covered more backend topics. This post deals with improving the frontend by adding Thymeleaf.

## Implementation
At first, the Thymeleaf dependency needs to be added to the pom file.
{% highlight xml %}
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
{% endhighlight %}
Next, we can create a new html file that will present a user's repositories in a table 
{% highlight html %}
<DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
{% endhighlight %}
To be able to work with thymeleaf, the proper namespaces is added (`xmlns:th="http://www.thymeleaf.org"`).
The remainder of the html page is a table that contains the repository data.
```
<h1>List of repositories owned by <span th:utext="${user}"></span></h1>
<table>
  <tr>
     <th>Name</th>
     <th>URL</th>
     <th>Owner</th>
  </tr>
  <tr th:each="repo : ${repos}">
     <td th:text="${repo.name}"></td>
     <td th:text="${repo.url}"></td>
     <td th:text="${repo.owner.login}"></td>
  </tr>
</table>
```
The above table will display the repositories name, URL and owner of each repository.<br/>
As you can see there are some `thymeleaf` related tags such as `th:each` and `th:text`. The `th:each` tag is a loop to iterate through o a list of repositories, `${repos}` in this case. For each item of this list the name, three attribbutes will be displayed by using `th:text`.<br/>
In this tutorial, I named the html file `repositories.html` and saved in `src/main/resources/templates`.<br/>
<br/>
The last step is to modify the Controller to work with thymeleaf.
{% highlight java %}
@RequestMapping(value="/repos/{username}", method= RequestMethod.GET)
public String getRepositories(Model model, @PathVariable String username){
  model.addAttribute("repos", githubRepositoryService.getRepositoriesForUser(username));
  model.addAttribute("user", username);
  return "repositories";
}
{% endhighlight %}
The method is annotated with `RequestMapping` to expose an endpoint that can be called from a consumer. The endpoint's URL contains a path variable named `username`.
The method takes a username as well as a parameter of type `Model`. This `Model` provides a map of keys and values. The keys in this scenario are `user` and `repos`, which will then be accessed through thymeleaf.  
The method returns a string, "repositories" in this case. Spring will try to match the string to a template, that is a file in `src/main/resources/templates`. Here it should work as the name of the template we defined earlier is actually "repositories".  

## Further resources
[Fully working example](https://github.com/mbaeumer/springboot-lab/tree/master/part5-thymeleaf)
