---
layout: post
title: "Spring boot lab: Using the RestTemplate"
date: 2018-02-19 18:10:53 +0100
categories: jekyll update
---

In the third part of this series on Spring Boot we will start implementing the core of the application using Spring Boot's RestTemplate. 
<br/>
## What will be done here?
We will add a service, that calls GitHub's API using the RestTemplate.

## Implementation

### The REST controller
At first, we add a new class in the same package as the WelcomeController. This new controller exposes another endpoint ("/repos/some-username").
When the endpoint is called, the GithubRepositoryService in its turn calls the GitHub API.
{% highlight java %}
@RestController
public class GithubRepositoryController {

    @Autowired
    private GithubRepositoryService githubRepositoryService;

    @RequestMapping(value="/repos/{username}", method= RequestMethod.GET)
    public List<Repository> getRepositories(@PathVariable String username){
        return githubRepositoryService.getRepositoriesForUser(username);
    }
} 
{% endhighlight %}

### The service
The following class is used to call GitHub's API to retrieve information about the repositories owned by a specific user.
{% highlight java %}
@Service
public class GithubRepositoryService {

    @Autowired
    private RestTemplate restTemplate;

    public List<Repository> getRepositoriesForUser(String username) {
        Repository[] response =  restTemplate.getForEntity(String.format("https://api.github.com/users/%s/repos", username), Repository[].class).getBody();
        return Arrays.asList(response);
    }
}
{% endhighlight %}
This seems to be all that is needed. However, the build fails with the following message:

{% highlight bash%}
Unsatisfied dependency expressed through field 'restTemplate'; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'org.springframework.web.client.RestTemplate' available: expected at least 1 bean which qualifies as autowire candidate.
{% endhighlight %}

Obviously, the field restTemplate in the GithubRepositoryService class cannot be initialized right now. The missing piece here is to create a bean of type RestTemplate which can be autowired into the service.<br/>
This can be fixed by adding a bean definition, e.g. to the SpringBootLabGithubHeroApplication class:
{% highlight bash%}
@Bean
public RestTemplate restTemplate() {
  return new RestTemplate();
}
{% endhighlight %}
Now the restTemplate should be initialized correctly and the build should succeed.
After starting the application, you can access the new endpoint ("/repos/some-username)" list of GitHub repositories will be shown in json format.<br/>
Further examples are discussed in future tutorials. A fully working example is available at the link below.

## Further resources
[Fully working example](https://github.com/mbaeumer/springboot-lab/tree/master/part3)


