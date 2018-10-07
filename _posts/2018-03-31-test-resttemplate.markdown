---
layout: post
title: "Spring Boot lab (part 4): Testing the RestTemplate"
date: 2018-03-31 20:45:03 +0100
categories: jekyll update
---

## What will be done here?
In the [previous post](https://mbaeumer.github.io/jekyll/update/2018/02/19/springbootlab-rest-template.html) I described how Spring Boot's RestTemplate can be used to call Github's API. In this post, we will implement a test for this RestTemplate.

## Implementation
One way of writing a test for the funtionality that was implemented earlier could be a test for the controller. There is however one problem with this approach:If we only test the controller and simply rely on Github responding to the request, the test will be unstable because there is no guarantee that Github is always responding.<br/> 
Instead, we will make use of Spring Boot's capabilities to mock RestTemplate's call to Github.<br/>
The test class looks as follows:
{% highlight java %}
@RunWith(SpringRunner.class)
@SpringBootTest
public class GithubRepositoryServiceTest {
    @Autowired
    RestTemplate restTemplate;

    @Autowired
    GithubRepositoryService service;

    private MockRestServiceServer mockServer;

    @Before
    public void setUp() {
        mockServer = MockRestServiceServer.createServer(restTemplate);
    }
{% endhighlight %}
The class is annotated with `RunWith(SpringRunner)` and `SpringBootTest` which means that Spring Boot will start an application context with the main configuration. Next, the `RestTemplate` and the `GithubRepositoryService` are autowired. The member variable of type `MockRestReserviceServer` will be mocking Github's response.
Ok, now the test case itself:
{% highlight java %}
@Test
public void testGetRepositories() {

  String expectedResponseBody="[{\"name\":\"angular-ots-custom-navbar\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/angular-ots-custom-navbar\"},{\"name\":\"angular-ots-notify\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/angular-ots-notify\"},{\"name\":\"codehero-springboot-samples\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/codehero-springboot-samples\"},{\"name\":\"fiftyseven\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/fiftyseven\"},{\"name\":\"fxlink\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/fxlink\"},{\"name\":\"glucosediary\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/glucosediary\"},{\"name\":\"mbaeumer.github.io\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/mbaeumer.github.io\"},{\"name\":\"papp2017\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/papp2017\"},{\"name\":\"python-challenge\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/python-challenge\"},{\"name\":\"springboot-lab\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/springboot-lab\"},{\"name\":\"vtri\",\"owner\":{\"login\":\"mbaeumer\",\"id\":5737140,\"avatarUrl\":null,\"url\":\"https://api.github.com/users/mbaeumer\"},\"url\":\"https://api.github.com/repos/mbaeumer/vtri\"}]";

  mockServer.expect(requestTo("https://api.github.com/users/mbaeumer/repos")).andRespond(withSuccess(expectedResponseBody, MediaType.APPLICATION_JSON));

  List<Repository> result = service.getRepositoriesForUser("mbaeumer");

  mockServer.verify();
  assertEquals(11, result.size());
}
{% endhighlight %}
When the test is executed, a call to Github will be mocked and a json string will be returned. In that way the test case is not dependent on a working Github API.

## Further resources
[Fully working example](https://github.com/mbaeumer/springboot-lab/tree/master/part4-test-resttemplate)
