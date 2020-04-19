---
layout: page
title: tales of a hobby project
permalink: /tales-of-a-hobby-project/
---
I have been in home office since middle of March now (as many of us...). Not much to do in my spare time, so I figured I might try out, experiment and learn a thing or two while I stay at home.
The result so far is a prototype/POC that collects Covid-19 data from John Hopkins University and visualises different aspects.
On this page I summarize some of the little milestones

## 31/3 The beginning
While reading about covid-19, I some day found an article that was referring to a repository at github. The repository contains detailed data on the number of covid-19 cases worldwide. The repository is owned and updated daily by John Hopkins University
I figured that this could be a nice coding exercise to write an application that processes the data and then visualizes them in one way or another
The initial techniques and frameworks are:

* JavaFX 11: JavaFX is not te most fancy way to build user interfaces, but I always wanted to try its charting features
* JGit: a library for executing git commands

After two days of coding and experimenting, the first screenshot shows a first graph with the number of confirmed cases for multiple countries on a specific day

![](/assets/covid19vis/initial.png)
