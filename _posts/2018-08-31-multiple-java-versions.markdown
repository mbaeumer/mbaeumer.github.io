---
layout: post
title: "Note to self: Handling multiple Java versions using jenv"
date: 2018-08-31 22:50:49 +0100
categories: jekyll update
---

Since September 2017, the release cycles of the Java language have changed from two (or more) years to a period of six months.
This means that one probably needs to handle multiple versions of Java – one for the current builds and one for builds running on future versions of Java.<br/>

This is a short guide (and reminder to myself) on how to easily switch between two or multiple JDKs using homebrew and jenv.

Originally, I installed Java without homebrew, so I started looking for a better setup of my environment.

## Step 1: Remove any JDK that is not installed using homebrew
First, I had to get rid of any JDK that was installed without homebrew:<br/>
`sudo rm -rf /Library/Java/JavaVirtualMachines...`

## Step 2: Install cask
Homebrew is a package manager and cask is an extension of homebrew that lets users install even more applications.<br/>
`brew install caskroom/cask/brew-cask`

## Step 3: Install jenv
jenv is a simple tool to manage multiple versions of the JDK. It can be installed using brew.<br/>
`brew install jenv`

## Step 4: Adding Git repository
Simply put, taps are repositories that are used by homebrew. Using the following command, a new reposiory is added for `caskroom/versions`.<br/>
`brew tap caskroom/versions` 

## Step 5: Install Java 8
Ok, right now there is no JDK installed. Now we can add new versions of the JDK using cask. Important here is that the oldest version is installed first.<br/>
`brew cask install java8`

## Step 6: Install latest Java
After the oldest version is installed, let's add the latest version.<br/>
`brew cask install java`<br/>
While writing this text, the latest JDK version was 10.

## Step 7: Add the installed versions to jenv
Next, the installed JDK versions are registered in jenv so that jenv knows about all existing versions.<br/>
`jenv add /Library/Java/JavaVirt.../Contents/Home`<br/>
Troubleshooting:<br/>
The command above might cause the following error:<br/>
`/Users/.../.jenv/versions/oracle64-1.7.0.71: No such file or directory`<br/>
The folder `.jenv` cannot be found, which means that jenv is not configured correctly yet. This can be fixed by running the following commands:
```
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile 
$ echo 'eval "$(jenv init -)"' >> ~/.bash_profile
```

## Step 8: View the currently available JDKs
So now we can check which JDKs are available to jenv.<br/>
`jenv versions`. <br/>
The output could look something like this:<br/>
```
  1.8
* 1.8.0.162 (set by /Users/martinbaumer/.jenv/version)
  10.0
  10.0.2
  oracle64-1.8.0.162
  oracle64-10.0.2
```
## Step 9: Switch JDK
For switching JDK versions there are two different alternatives - either the version is changed globally or locally.<br/>
`jenv global <jdk-version>`<br/>
If global is used, the JDK version is updated for all paths. If local is used, the JDK version is set only for the current working directory.
