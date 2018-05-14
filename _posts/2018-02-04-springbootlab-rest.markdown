---
layout: post
title: "Spring Boot lab (part 2): REST"
date: 2018-02-04 23:48:15 +0100
categories: jekyll update
---

The second part of this series on Spring Boot shows how to add a REST endpoint to a Spring Boot application.

## What will be done here?
We will modify the application taken from part1 so that it exposes a REST endpoint. Besides, we add a test case for the endpoint.

## Implementation

### The REST controller
{% highlight java %}
@RestController
public class WelcomeController {
    @RequestMapping(value="/welcome", method= RequestMethod.GET)
    public String welcome(){
        return "Welcome";
    }
}
{% endhighlight %}
This controller is pretty simple. When the endpoint '/welcome' is called, it will simply return a string.

### The test case
{% highlight java %}
@RunWith(SpringRunner.class)
@WebMvcTest(WelcomeController.class)
public class WelcomeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testWelcome() throws Exception{
        mockMvc.perform(get("/welcome")).andExpect(status().isOk());
    }
}
{% endhighlight %}
The test case is annotated with WebMcvTest, which means that the application configuration is not fully loaded. Instead, only the configuration for this controller and similar components is applied.</br>
The test is probably not quite meaningful as it just tests if the HTTP status is 200, i. e. ok.<br/>
Another version of the test could even check, if the string 'Welcome' is returned.
{% highlight java %}
@RunWith(SpringRunner.class)
@WebMvcTest(WelcomeController.class)
public class WelcomeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testWelcome() throws Exception{
        MvcResult result = mockMvc.perform(get("/welcome")).andExpect(status().isOk()).andReturn();
        String response = result.getResponse().getContentAsString();
        Assert.assertTrue(response.equalsIgnoreCase("Welcome"));
    }
}
{% endhighlight %}

## Further resources
[Fully working example](https://github.com/mbaeumer/springboot-lab/tree/master/part2-rest)
