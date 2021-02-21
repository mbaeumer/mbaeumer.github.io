---
layout: post
title: "JDK incubator: Using jpackage"
date: 2021-02-21 09:25:00 +0100
categories: jekyll update
---

![](/assets/incubate.jpg)
<br><br>
Starting from version 14, the JDK contains a new module: `jdk.incubator`.
This new module contains a couple of experimental tools and features.<br>
Usually, Java applications are delivered as jar file. In some cases, it could be useful to provide an installer instead. The tool `jpackage` does just that.

In this post a very simple JavaFX application is built and then packaged as an Apple disc image (dmg file) using jpackage.

# The sample project
The sample application can be found [here](https://github.com/mbaeumer/java-lab/tree/master/java-14-incubator/test-project)

# Build the project
The project is built using maven.

# Packaging
After the project is built successfully, we can package it using the following command from the root folder of the test-project: 
```bash
jpackage --name test-project --input . --main-jar target/java-14-incubator-test-0.0.1.jar --module-path /Users/martinbaumer/Downloads/javafx-sdk-11.0.2/lib --add-modules javafx.controls,java.desktop
```
The `jpackage` tools comes with a couple of arguments:

* --name sets the name of the resulting file
* --input points to the path that will be input to the image
* --main-jar points to the jar file
* --module-path points to the path to the JavaFX SDK
* --add-modules sets the modules that are required to run the app

When jpackage is finished, a new dmg file is created in the project's root folder. The file is opened instantly.<br><br>
![](/assets/jpackage-dmg.png)
The application can be dragged and dropped to the Application folder. Done!

