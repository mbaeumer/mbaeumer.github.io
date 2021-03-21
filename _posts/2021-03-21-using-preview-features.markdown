---
layout: post
title: "Using JDK preview features"
date: 2021-03-21 09:25:00 +0100
categories: jekyll update
---

![](/assets/peek.jpg)
<br><br>
Since the release of Java 9, the release cycles have become significantly shorter. This makes it possible to release certain features of the language as a preview.
This blog post shortly describes how to use these preview features.

i# The example code
As an example, I wrote a very primitive application that makes use of PatternMatching and records. These features are fully available starting from JDK 16, but have been present as preview features since JDK 14.<br>
The sample application can be found [here](https://github.com/mbaeumer/java-lab/tree/master/java-14)

# Building with maven
For this example, I used the maven-compiler-plugin as well as the maven-shade-plugin.
When building the sample application the following error occurs:
```bash
...
 records are a preview feature and are disabled by default.
...
```
The error message is self explanatory and the error itself can be fixed with a minor change in the maven plugin configuration
```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <version>3.8.1</version>
  <configuration>
    <release>14</release>
    <compilerArgs>
      <arg>--enable-preview</arg>
    </compilerArgs>
  </configuration>
</plugin>
```

# Running the application
Now the build should be successful. When running the application with the jar flag, the following error occurs:
```bash
Error: LinkageError occurred while loading main class se.mbaeumer.javalab.java14.Main
	java.lang.UnsupportedClassVersionError: JVMCFRE163 Class file is a preview version but has the wrong major version or preview is not enabled.
```
The solution is simply to add a flag to enable preview features:
```bash
java --enable-preview -jar <path-to-jar>
```
