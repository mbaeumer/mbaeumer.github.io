---
layout: post
title: "Spring Boot lab (part 6): Handling configuration"
date: 2018-06-13 21:54:26 +0100
categories: jekyll update
---

## What will be done here?
In the third part of this series on Spring Boot, we implemented a service that calls Github's API to retrieve data on a user's repositories. 
So far we use a hard-coded string for the URL. This might be ok for test or demonstration purposes. In real applications it is better to store the URL (or parts of it) in properties.
<br/>
Spring provides a couple of ways to read properties and in the following two of them are described.

## Using `@Configuration`
A class that is annotated with `@Configuration` will be handled as a bean. Spring loads the properties at application start and stores the values in member variables of the class.
In the context of the sample application we could store parts of the URL:
The member variables are annotated with `@Value` followed by a parameter that represents the key in the properties file.
{% highlight java %}
@Configuration
public class GithubRepositoryServiceConfiguration {
  @Value("${github.base.url}")
  private String githubBaseUrl;

  @Value("${github.user.path}")
  private String githubUserPath;

  @Value("${github.userrepo.path}")
  private String githubUserRepos;
...
}
{% endhighlight %}
The properties themselves are stored in the file `application.properties` that is located in the `src/main/resources`folder.
{% highlight bash %}
github.base.url=https://api.github.com/
github.user.path=users/
github.userrepo.path=repos
{% endhighlight %}

Next, we can use the values in the service class
{% highlight bash %}
public List<Repository> getRepositoriesForUser(String username) {
  ResponseEntity<Repository[]> responseEntity = restTemplate.getForEntity(
    String.format(configuration.getGithubBaseUrl() + configuration.getGithubUserPath() + "%s/"
    + configuration.getGithubUserRepos(), username), Repository[].class);
  Repository[] response =  responseEntity.getBody();
  return Arrays.asList(response);
}
{% endhighlight %}

## Using `@ConfigurationProperties`
Another approach to load such properties is to use `@ConfigurationProperties` followed by a parameter called prefix.<br/>
{% highlight java %}
@ConfigurationProperties(prefix = "github.api")
public class GithubRepositoryServiceConfiguration {
  private String baseUrl;
  private String userPath;
  private String userRepoPath;
...
}
{% endhighlight %}
Here we do not need to annotate the member variables. However, their names have to match exactly the naming in the properties file.

{% highlight bash %}
github.api.baseUrl=https://api.github.com/
github.api.userPath=users/
github.api.userRepoPath=repos
{% endhighlight %}

Classes annotated with `@ConfigurationProperties` are no treated as beans. When the application is started, the following error occurs:
{% highlight bash %}
Field configuration in se.mbaeumer.githubhero.part6.services.GithubRepositoryService required a bean of type 'se.mbaeumer.githubhero.part6.config.GithubRepositoryServiceConfiguration' that could not be found.

Action:

Consider defining a bean of type 'se.mbaeumer.githubhero.part6.config.GithubRepositoryServiceConfiguration' in your configuration.
{% endhighlight %}

To resolve this, the annotation `@EnableConfigurationProperties` is required in the main class:
{% highlight java %}
@EnableConfigurationProperties(GithubRepositoryServiceConfiguration.class)
public class SpringBootLabGithubHeroApplication {
  public static void main(String[] args) {
    SpringApplication.run(SpringBootLabGithubHeroApplication.class, args);
  }
	
  @Bean
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}
{% endhighlight %}
The annotation takes the configuration class as parameter.

## Further resources
[Configuration example](https://github.com/mbaeumer/springboot-lab/tree/master/part6-1-configuration)
[ConfigurationProperties example](https://github.com/mbaeumer/springboot-lab/tree/master/part6-2-configurationproperties)

