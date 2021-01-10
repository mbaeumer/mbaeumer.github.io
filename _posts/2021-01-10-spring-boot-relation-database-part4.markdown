---
layout: post
title: "Spring Boot and relational databases - part 4: Inserting data"
date: 2021-01-10 23:25:00 +0100
categories: jekyll update
---

In the previous part of this series, we added an entity for address data to the database. So far the application provides only support for reading data. In this part, we make changes to make it posasible to add contacts.

# Changing the code
At first, let's add a new mothod to the `ContactController
```java
@PostMapping("")
public void createContact(@RequestBody final Contact contact){
  contactService.createContact(contact);
}
```
This method adds a new REST endpoint for POST requests.<br>
In the class `ContactService`, the following method is added:
```java
public void createContact(final Contact contact){
  contactRepository.save(contact);
}
```
In the `createContact` method, the `save` method of `contactReposity` is called. This save method is nothing we need to implement ourselves because it is provided by the `JpaRepository`.

# A test run
When the application is started, the new endpoint can be called for example with the following curl command:
```bash
 curl -H "Content-Type: application/json" -X POST -d '{"firstName": "John", "lastName": "Doe"}' http://localhost:8080/contact
```
However, the request fails with HTTP status code 500 and the following error message:
```bash
"Internal Server Error","message":"could not execute statement; SQL [n/a]; constraint [\"PRIMARY KEY ON PUBLIC.CONTACT(ID)\"; SQL statement:\ninsert into contact (address_id, email, firstname, lastname, phonenumber, id) values (?, ?, ?, ?, ?, ?) [23505-197]]; nested exception is org.hibernate.exception.ConstraintViolationException:
```

# Fixing the error
According to the message there is some constraint getting violated. More precisely, a value for the primary key is missing.
The primary key in this case is an id. Usually this is something that the database generates. To achieve that, we need to change the `Contact` class:
```java
@Entity
public class Contact implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    ...
```
The `id` member is now annotated with `@GeneratedValue`, which will make the database generate an id automatically.
When the curl command is run again, the request is succesful and the contact is added to the database.

# Inserting contact and address at the same time
So now new contacts can be inserted. However, what happens if the client posts contact data including an address?
Let´s try with the following curl command:
```bash
curl -v -H "Content-Type: application/json" -X POST -d '{"firstName": "John", "lastName": "Doe22", "address":{"street":"Street","postalCode":"77588", "city":"Town"}}' http://localhost:8080/contact
```
The request fails and results in the following error:
```bash
org.hibernate.TransientPropertyValueException: object references an unsaved transient instance - save the transient instance before flushing
```
This happens because we try to save a contact with an associated address, while the address is not present in the database yet. What is needed here is a way to save address and contact in the right order. This can be solved with a minor change in the `Contact`class:
```java
@Entity
public class Contact implements Serializable {
    ...
    @OneToOne(cascade = {CascadeType.ALL})
    private Address address;
    ...
}
```
When `CascadeType.ALL` is used, both address and contact are stored.

# Further resources
The code example can be found [here](https://github.com/mbaeumer/spring-boot-postgresql-demo)
