---
layout: post
title: "Spring Boot and relational databases - part 6: Setting constraints"
date: 2021-03-06 19:25:00 +0100
categories: jekyll update
---

![](/assets/chain.jpg)
In the previous part of this series, support for deleting contacts and addresses was added. This part describes the steps to add different kind of constraints to the database tables to prevent duplicate contacts and addresses.

# Updating dependencies
Before changing the code, I updated to a newer version of Spring Boot
```xml 
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>2.4.3</version>
</parent>
```

# Updating application.properties
Updating to a later version of Spring Boot made another change neccessary. Prior to version 2.3, the name for the in-memory database was constant. After version 2.3, it will be re-generated at each application startup. This means that the h2-console will not function correctly, since the database is not found.
To work around that, we can add the following property to the application.properties:
`spring.datasource.url=jdbc:h2:mem:testdb`

# Setting constraints for contacts
The first goal is to make the email unique for each contact. This can be achieved with a very little change in the `Contact` class:
```java
@Column(name = "email", unique = true, nullable = false)
private String email;
```
This ensures that the email address is unique and cannot be null.

## Handling the database error
Since a new constraint was added, an exception will occur each time when the email address is null or not unique.
Right now this will lead to lots of stack traces and an internal server error. However, it will be nice to produce a more explicit error message and HTTP status code to let the client know why the request failed. This can be done using `ControllerAdvice`:
```java
@ControllerAdvice
public class GlobalExceptionHandler {

  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler(HttpClientErrorException.class)
  public void handleConstraintViolation(){
    // do something here, if needed
  }
}
```
The class `GlobalExceptionHandler` is annotated with `ControllerAdvice`. The method is annotated with `ExceptionHandler`. Here it is defined which exception is handled (`HttClientErrorException`).
The method is also annotated with `ResponseStatus` which lets us define which HTTP status is returned.
So each time when an `HttpClientErrorException` is thrown, our appication will respond with HTTP status 400.
 
The only change that is left is in the `ContactService` class:
```java
public void createContact(final Contact contact){
  try {
    contactRepository.save(contact);
  }catch (DataIntegrityViolationException ex){
    throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
  }
}
```
Here, the `DataIntegrityViolationException` is caught and an `HttpClientErrorException` is thrown.

# Setting constraints for addresses
When it comes to constraints for the address table, the situation is slightly different. Here, it is not sufficient to define one or more columns as unique. Instead, we could use composite keys.

## Using `@Embeddable`
One way of defining composite keys is by defining an own class representing the composite key. In this example, I called it `AddressId`.
```java
@Embeddable
public class AddressId implements Serializable {
  private String street;
  private String postalCode;
  private String city;
...
}
```
This class has three members: `street`, `postalCode` and `city`. These member variables together form the address' key. The class is annotaded with `@Embeddable`.
Now the `Address` class needs to be changed so that the new composite key is used:
```java
@Entity
public class Address {
  @EmbeddedId
  private AddressId addressId;
...
}
```
The `@EmbeddedId` annotation indicates that this id is a composite key. The member variables that belonged to the `Address` class earlier have been removed completely.  
 
# A test run
This can be tested with the following request:
```bash
curl -v -H "Content-Type: application/json" -X POST -d '{"firstName": "John", "lastName": "Doe", "email":"test-1@test.com", "address": {"addressId":{"street":"Street","postalCode":"77588", "city":"Town"}}}' http://localhost:8080/contact
``` 
The request will succeed and a new contact is added. Now let's do a similar request:
```bash 
curl -v -H "Content-Type: application/json" -X POST -d '{"firstName": "John", "lastName": "Doe", "email":"test-2@test.com", "address": {"addressId":{"street":"Street","postalCode":"77588", "city":"Town"}}}' http://localhost:8080/contact
```
This request will fail because the address is not unique.

# Further resources
The code example can be found [here](https://github.com/mbaeumer/spring-boot-postgresql-demo)
