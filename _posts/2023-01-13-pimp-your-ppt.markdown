---
layout: post
title: "Pimp your Powerpoint"
date: 2023-01-10 23:25:00 +0100
categories: jekyll update
---

This post provides some hands-on tips for your next presentation, with focus on images and code.

## Images in the presentation

# Where to find good images
One thing to think about when it comes to images from the web is that there might be a copyright. Using such images for commercial purposes can get you into legal trouble.<br>
There are at least two good sources that provide plenty images for free:

* [pixabay.com](http://www.pixabay.com)
* [unsplash.com](http://www.unsplash.com)

A picture says more than thousand ways! Indeed, a suitable image can help you to convey your message. A part from that, images are more entertaining than a lot of text during your presentation.

# Stretching the image
Of course, one could simply use the image as-is and paste it into the slide. However, this often looks quite sloppy, it seems that the presenter did not have time (or did not put much effort into) the presentation.
![](/assets/pimp-ppt/01-image-dump-small.png)
<br>Therefore, it can be a good idea to stretch the image so that it covers the whole slide.
![](/assets/pimp-ppt/02-image-stretched-small.png)

How to do it:

* Insert the image in to the slide'
* Left-click on the image, so that it is marked
* Drag the image at the edges until it fits the whole slide 

# Vertically aligned images
Handling images that are vertically aligned can be a bit more tricky to stretch. At first, let's see how the original image looks like:
![](/assets/pimp-ppt/03-vertical-image-original-small.png)

As you can see the stretched version looks a bit strange and surreal which is probably not what you wanted.<br>
![](/assets/pimp-ppt/04-image-vertical-stretched-small.png)

One solution can be to put another image behind your actual image. Then you can stretch the background image and make it, for example, a bit blurry.<br>
In that way you do not need to stretch your image and you can guide your audience to focus on the relevant things:<br>
![](/assets/pimp-ppt/05-image-vertical-blurred-background-small.png)

How to do it:

* Insert a suitable background image
* Stretch it to fit the whole slide
* Make it blurry (see below in more detail)
* Place the actual image on top of it

In this example, I chose a golf theme, so a blurry green background seems kinda suitable.

# Using effects
Powerpoint provides a variety of artistic effects that can be applied on images. My personal favourite is the blur effect. It makes the image look a bit fuzzy, so it gives more room for other elements on the slide, such as text:<br>
![](/assets/pimp-ppt/06-image-blur-small.png)

How to do it:

* Insert a suitable background image
* Stretch it to fit the whole slide
* Right-click on the image and select `Format Picture`
* A new pane comes up where you can choose an artistic effect (see screenshot below)

![](/assets/pimp-ppt/07-artistic-effect-small.png)

# Shapes and text on top of the image
If you want to place text on top of such a slide, it can be a good idea to place that text inside a shape. This makes the text more readable, especially if the background is quite colorful.
![](/assets/pimp-ppt/08-shape-over-image-solid.png)

How to do it:

* Let's start with the previous image that is already blurry.
* From the `Insert` menu select a shape, e. g. a rectangle and place it on the slide.
* Right-click on the shape and select `Format Shape`
* On the right side, select `Solid fill` and choose a color (see screenshot below)
![](/assets/pimp-ppt/09-shape-solid-color.png)

<br>Alternatively you can make the shape's background a bit transparent instead of solid:
![](/assets/pimp-ppt/10-shape-over-image-transparent.png)

<br>Or why not use a circle instead of a rectangle?!
![](/assets/pimp-ppt/11-shape-over-image-circle.png)


## Showing code in your presentation
Depending of the topic of your preentation, you might want to present some code in the slides.
First let's have a look at what the code looks like in the IDE.
![](/assets/pimp-ppt/12-original-code-from-intellij.png)
 
# Straightforward copy
Copy/paste might actually work okay, at least on a slide with white background.<br>
![](/assets/pimp-ppt/13-code-on-white-slide.png)

On a black background however, it looks quite bad as the curly brackets are turned to black and are not visible.<br>
![](/assets/pimp-ppt/14-code-on-black-slide.png)

# Using a syntax highlighter
If you still want to use a black background, a syntax highlighter could be helpful:
![](/assets/pimp-ppt/15-code-from-highlighter.png)

How to do it:

* Go to an online syntax highlighter (see some links below) and paste your code
* Make a screenshot of the result
* Create a slide with black background
* Insert the screenshot

# Using a screencast
Another alternative is to create a screencast when writing the code and then you can insert the video in your slides.<br>
Doing so makes the the presentation more lively (everybody likes to watch shorter clips). A downside though is that the presentation can get really large.

## Further resources

* [pixabay.com](http://www.pixabay.com)
* [unsplash.com](http://www.unsplash.com)
* [SlidesCodeHighlighter on github](https://romannurik.github.io/SlidesCodeHighlighter)
* [another highlighter on github](https://emn178.github.io/online-tools/syntax_highlight.html)
* [highlighter on pinetools.com](https://pinetools.com/syntax-highlighter)
