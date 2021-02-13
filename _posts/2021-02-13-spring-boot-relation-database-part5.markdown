---
layout: post
title: "Spring Boot and relational databases - part 5: Deleting data"
date: 2021-02-13 23:25:00 +0100
categories: jekyll update
---

In the previous part of this series, we added support for inserting contacts and addresses. This part describes the steps to add support for deleting contacts.

# Changing the code
At first, let's add a new method to the `ContactController`:
```java
@DeleteMapping("/{id}")
public void deleteContact(@PathVariable("id") final String id){
  contactService.deleteContact(Long.parseLong(id));
}
```
This method adds a new REST endpoint for DELETE requests.<br>

In the class `ContactService`, the following method is added:
```java
public void deleteContact(final Long id){
  contactRepository.deleteById(id);
}
```
In the `deleteContact` method, the `deleteById` method of `ContactRepository` is called. Again, this method is provided by the `JpaRepository`.

# A test run
When the application is started, the new endpoint can be called for example with the following curl command:
```bash
curl -v -H "Content-Type: application/json" -X DELETE  http://localhost:8080/contact/4
```
Note that an id is added to the URL. Provided that a contact with that id exists, the request is successful. 

# Looking at `CascadeType`
As a short recap, let's look at the `Contact` class:
```java
public class Contact implements Serializable {
  ...
  @OneToOne(cascade = {CascadeType.ALL})
  private Address address;
  ...
}
```
The member variable `address` is annotated with `CascadeType.ALL`. This annotation means that all database operations on a contact are cascaded to the associated address.<br>
As a result, deleting a contact will also delete the address.

# Further resources
The code example can be found [here](https://github.com/mbaeumer/spring-boot-postgresql-demo)
