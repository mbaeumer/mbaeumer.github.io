---
layout: post
title: "Spring Boot and relational databases - part 3: OneToOne and JpaRepository"
date: 2020-12-31 00:32:00 +0100
categories: jekyll update
---

The previous posts of this series covered the basic setup and population of a Spring Boot application with an in-meory database.
In this post, the database schema is extended to make it more realistic. Along the way, we will try the `OneToOne` annotation and a couple of queries.
<br>

# Adding address data
So far the database schema is not really complex, there is only one table for the contacts. One typical requirement for an address book is to store addresses (surprise, surprise).
The following changes lead to a new table in the database storing address data.
So let's start with the POJO for addresses:
```java 
POJO
@Entity
public class Address {
    @Id
    private int id;
    private String street;
    private String postalCode;
    private String city;
}
```
The class is annotated with `Entity` and the `id` member is annotated with `Id` to mark it as identifier.
Next up is the `AddressRepository`.  

```java
public interface AddressRepository extends JpaRepository<Address, Long> {

}
```
So far the two tables are independent from each other. The following change in the `Contact` class associates them:
````java
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

    @OneToOne
    private Address address;
    ...
}
```
The `address` member is annotated with `OneToOne`. This allows to associate a contact with one address.
One last thing for now is to update the population service, so that the address table is populated at application start.

When calling http://localhost:8080/contact, the response will be something like this:
```json
[
  {
    "id": 0,
    "firstName": "Martin",
    "lastName": "Baeumer",
    "phoneNumber": "0046736398156",
    "email": "test@test.se",
    "address": {
      "id": 0,
      "street": "Some Avenue",
      "postalCode": "12345",
      "city": "Testtown"
    }
  },
  {
    "id": 2,
    "firstName": "Martin",
    "lastName": "Baeumer",
    "phoneNumber": "0046736398156",
    "email": "test@test.se",
    "address": null
  }
]
```

# Looking at the h2-console
When opening http://localhost:8080/h2-console, we can see that there is a new table. Besides, the contact table has changed, i. e. a new column has been added.<br>
![](/assets/spring-boot-h2-console.png)

# Using JPA for different queries
The interfaces `AddressRepository` and `ContactRepository` both extend the JpaRepository interface. This allows to query the database with very little code.
For instance, the following is needed to fetch contacts from a specific city or with a specific postal code.
```java
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByAddressCity(String city);
    List<Contact> findByAddressPostalCode(String postalCode);
}
```
These are only two examples of queries. If you work with IntelliJ, you can see more suggestions for queries.


# Further resources
The code example can be found [here](https://github.com/mbaeumer/spring-boot-postgresql-demo)
