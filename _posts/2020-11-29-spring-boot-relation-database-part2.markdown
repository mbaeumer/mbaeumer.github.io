---
layout: post
title: "Spring Boot and relational databases - part 2: h2-console and ApplicationListener"
date: 2020-11-29 22:32:00 +0100
categories: jekyll update
---

The previous post of this series covered the basic setup of a Spring Boot application with an in-meory database.
This post describes how to access the h2 console and how to use the `ApplicationListener` for populating the database.

# The h2 console
When working with an in-memory database during development, it can be useful to quickly view the database's content. 
Luckily, Spring Boot provides good support for that, so it requires very little work.
In order to enable the h2 console, the following property needs to be set:
```
spring.h2.console.enabled=true
```
Just add this line to the application properties and restart the application.<br>
Then, the h2 console can be accessed through http://localhost:8080/h2-console

# Populating the database
In the previous post, an sql file was used to populate the database. The ApplicationListener interface provides another way of doing that.
The following shows one way of using it:
```java
@Service
public class DatabasePopulationService implements ApplicationListener<ContextRefreshedEvent> {
    private ContactRepository contactRepository;

    public DatabasePopulationService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        Contact contact = new Contact();
        contact.setId(0);
        contact.setEmail("test@test.se");
        contact.setFirstName("Martin");
        contact.setLastName("Baeumer");
        contact.setPhoneNumber("0046736398156");
        contactRepository.save(contact);
    }
}
```
This class implements the ApplicationListener and listens to the `ContextRefreshedEvent`. Each time when the event is fired, a contact will be stored in the database.

# Further resources
The code example can be found [here](https://github.com/mbaeumer/spring-boot-postgresql-demo)
