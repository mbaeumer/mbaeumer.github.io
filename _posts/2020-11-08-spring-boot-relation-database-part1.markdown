---
layout: post
title: "Spring Boot and relational databases - part 1: In-memory setup"
date: 2020-11-08 19:32:00 +0100
categories: jekyll update
---

It was a while ago that I worked with Spring Boot and relational databases, so I felt it is time for a recap.
In this blog post I set up a Spring Boot application that stores data of contacts in an in-memory database.<br/>


# The dependencies
At first, I added a couple of dependencies in the pom.xml-file. `spring-boot-starter-data-jpa` provides support for JPA, while `h2` is needed to connect to the in-memory database.

```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
    <version>2.1.5.RELEASE</version>
  </dependency>

  <dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>1.4.197</version>
    <scope>runtime</scope>
  </dependency>
```

# The code

The class `PostgreSqlDemo` is the main entry point of this application
```java
@SpringBootApplication
public class PostgreSqlDemo {
    public static void main(String[] args) {
        SpringApplication.run(PostgreSqlDemo.class, args);
    }
}
``` 
Next, I added the `ContactRepository` interface:
```
public interface ContactRepository extends JpaRepository<Contact, Long> {
    @Override
    List<Contact> findAll();
}
```
This interface handles the database operations. Important to note here is that `ContactRepository` is an interface and not a class. Since it extends `JpaRepository`, JPA will generate an implementation
durin runtime.
Then I created a class named `ContactService`.
```java
@Service
public class ContactService {

    private ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getContacts(){
        List<Contact> contacts = contactRepository.findAll();
        System.out.println(contacts.size());
        return contactRepository.findAll();
    }
}
```
This is a typical Spring bean, that autowires the repository mentioned earlier.

Next, I added the `ContactController`, a RestController that exposes an endpoint to be used by clients.
```java
@RestController
@RequestMapping("/contact")
public class ContactController {

    private ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("")
    public List<Contact> getAllContacts(){
        return this.contactService.getContacts();
    }
}
```
At last, I created a simple POJO:
```java
public class Contact {
    private int id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
```
With this, the application can be built. However, an error occurred when the application starts:
```bash
...
Caused by: java.lang.IllegalArgumentException: Not a managed type: class se.maeumer.springbootlab.postgresql.part1.Contact
```
The reason for this error is a missing `@Entity` annotation. This annotation is neccessary to identify a class as entity.
So now the class looks like this:
```java
@Entity
public class Contact {
    private int id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
```
At the next application start another error occurs:
```bash
Caused by: org.hibernate.AnnotationException: No identifier specified for entity: se.maeumer.springbootlab.postgresql.part1.Contact
```
Obviously an identifier is missing, but what does that mean? The `Contact` class is marked as entity and hence one of the class members has to be marked as identifier.
In this case, the `id` member suits best, so it can be annotated with `@Id`:

```java
@Entity
public class Contact {
    @Id
    private int id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
```

Now the application starts up without error so the endpoint http://localhost:8080/contact can be called. No error occurs, but the response is empty. 
This is not so surprising as no contacts have been added to the database.

# Initialising and populating the database
One way to initialise and populate the database is by using an sql file inthe resources folder:
```
DROP TABLE IF EXISTS contact;

CREATE TABLE contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(64),
  lastname VARCHAR(64),
  phonenumber VARCHAR(64),
  email VARCHAR(64)
);

INSERT INTO contact(id, firstname, lastname, phonenumber, email) VALUES(1, 'Martin', 'Bäumer', '13546778', 'mb@mb.se');
```
The file contains three different statements: At first, the table `contact` is dropped if it exists. Next, the table is created from scratch. At last, one contact is inserted ito the table.

# Back to the code
Now that the database is populated, let's try to start the application again. It starts fine, but when calling http://localhost:8080/contact an error occurs again:
```bash
org.h2.jdbc.JdbcSQLException: Column "CONTACT0_.FIRST_NAME" not found; SQL statement:
select contact0_.id as id1_0_, contact0_.email as email2_0_, contact0_.first_name as first_na3_0_, contact0_.last_name as last_nam4_0_, contact0_.phone_number as phone_nu5_0_ from contact contact0_ [42122-197]

```
The column `firstname` cannot be found and the reason for that is a missing JPA annotation, not only for the `firstName` member, but also for the other member variables.
The `Contact` class is as follows: 
```
@Entity
public class Contact {
    @Id
    private int id;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name = "phonenumber")
    private String phoneNumber;
    @Column(name = "email")
    private String email;
}
```
The missing `@Column` annotation maps the member variables to the columns in the contact table.
<br>
When calling the endpoint http://localhost:8080/contact, a list is returned containing one contact. It is the same contact, that was inserted in the sql file.

# Summary
This blog post describes the steps to set up a Spring Boot application to connect to an in-memory database. The application contains a RestController to expose an endpoint, a service bean to handle some logic (not that much logic at the moment though) and a repository bean that handles the communication with the database. Besides, I added an sql file to populate the database with ome testdata at start up. <br>
So far the appication provides support for reading only. In future steps, functionality to create, update and delete contacts will be added.

# Further resources
The code axample vcan be found [here](https://github.com/mbaeumer/spring-boot-postgresql-demo)
