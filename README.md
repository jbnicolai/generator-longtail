# Longtail Frontend Setup [![Build Status](https://secure.travis-ci.org/rkgttr/generator-longtail.png?branch=master)](https://travis-ci.org/rkgttr/generator-longtail)

This guide will help you through the process of setting up static frontend projects. This is a simple framework based on [NodeJS][0], [Yeoman][1], [Bower][2] and [Grunt][3] that automate a lot of tasks such as preprocessing your files and minify them. The framework includes:

* A convenient folder structure.
* A HTML template based on [HTML5 Boilerplate][4].
* An optional set of [Jade][5] templates based on HTML5 Boilerplate to generate your pages.
* Several [LESS][6] files that compile in a single autoprefixed minified CSS files.
* A CSS grid framework based on [PureCSS][7].
* [jQuery][8] and a few JavaScript helpers that compile in a single minified JavaScript file.
* An image minifier.
* A simple webserver that reloads automatically when you make changes.
* A [Grunt][3] observer that automatically compile your changes on LESS and JavaScript files.

As the framework may evolve to include more options (such as including other JavaScript libraries like [AngularJS][9], or other pre-processors like [Stylus][10], [SASS][11], ...), I strongly suggest that you subscribe to the Github project where the template is hosted: [https://github.com/rkgttr/generator-longtail][12]. This way you will get email notifications when a change is available and you will be able to update by reinstalling the [npm][13].

For editing code, I suggest that you use [Sublime Text][14] with [Package Control][15] to extends its functionalies. This is the best and most extensible editor at the moment, simple as that.

## Global Configuration

The following needs to be done once.

* [Install GIT][16]  
Important for Windows users, you must install msysgit correctly. Be sure to check the option shown below:  
![](http://demo.longtail.com/frontend/img/build/mysgit.png)
* [Install NodeJs][0]
* Open a console (Windows: Win+R then type cmd then press Enter, Mac: Command+Space then type terminal then press Enter)
* Install Grunt by entering the following command:

	npm install -g grunt-cli
And press Enter
* Install Bower by entering the following command:

	npm install -g bower
And press Enter
* Install Yeoman by entering the following command:

	npm install -g yo
And press Enter
* Install the project generator by entering the following command:

	npm install -g generator-longtail
And press Enter

## Project Configuration

The following needs to be done per project.

* Create a folder
* Move into this folder then shift + right click and select "Open command window here", on Mac open a Terminal and move to this folder (cd \[your-path\]) or go to System Preferences \> Keyboard \> Keyboard Shortcuts \> Services and enable New Terminal at Folder and the service will appear by right click or Control + click on the folder.
* In the console that opens, type:

	yo longtail
Press Enter and answer the few questions about the project name, description and version. If you want to use the [Jade templating engine][5], answer **yes** to the Use Jade templating engine question. I strongly recommend using Jade as it's a very powerful templating engine. Once you've adopted it, standard HTML coding looks like stone age.

Please keep in mind that Internet Explorer 8 does not understand mediaqueries, so answer **no** to the Mobile First Project question if you need to support IE8\. This will change the way breakpoints are declared in the framework.

If you answer **yes** to the ASPX form included in the markup question, what the template does is adding a form tag after the body to encapsulate your page content. This may impact the style of your page.
* When all this is done, all your templates files will be under the app folder, here you will find one .bat file (or .command file on Mac): launchgrunt
* launchgrunt first compiles all your files (js + less, etc.), launches a web server, watches any changes you make to re-compile on the fly, and finally refreshes the server.
* Open [http://localhost:8080/][17] to see this in action.

## Start Working

Following are a few things to keep in mind when you work on your project:

* Don't forget to launch app/launchgrunt before working on your project.
* Open [http://localhost:8080/][17].
* Save all your HTML templates either on the app/ folder, either on the app/templates folder.  
Alternatively, if you use Jade, save your Jade templates into the app/jade folder, and all your included Jade templates into the app/jade/includes folder. All generated HTML files will end up in the app/ folder.
* Always write your JavaScript into app/js/main.js
* Add any jQuery plugins or JavaScript helpers into app/js/plugins.js
* Write your main styles into app/css/main.less, your mediaqueries into app/css/mediaqueries.less, your LESS mixins and variables into app/css/mixins.less, and your no-JavaScript styles into app/css/nojs.less.

If you need to support Internet Explorer 8 and have answered "no" to the "mobile first" question in the project configuration, the breakpoints in app/css/mediaqueries.less won't be mobile first. So the styles you'll write into app/css/main.less will be the standard desktop ones, and devices specific ones will be into app/css/mediaqueries.less.  
If you answered "yes" then the styles you'll write into app/css/main.less will be the mobile ones, that you'll need to surcharge into app/css/mediaqueries.less.  
The grid system is devices agnostic, you need to add the proper classes to your grid units. For example, a grid unit that needs to be 100% wide on mobile, 50% wide on tablet, 33% wide on desktop, and 25% wide on large desktop will have these classes: class="unit-1-3 unit-sm-1 unit-md-1-2 unit-lg-1-3 unit-xl-1-4". The first class (unit-1-3) is for devices that don't understand mediaqueries such as Internet Explorer 8\. Other classes are for small, medium, large, and x-large devices (sm, md, lg, xl). The -1-3 component of the class name indicates the fraction of space that is used by the unit, in this example it's one third (33.3333%). The grid has up to 24 columns. All grid units should be encapsulated into a < div class="grid"/\>.
* Don't forget to change your favicon and the IOS and Windows special icons/tiles on the root folder.
* Always put your images into app/img/src. If you delete an image, it will not be deleted on the app/img/build folder, do it manually.
* If you want to commit your work on SVN, don't commit the node\_modules. Create a rule to exclude them.
* Any bug? [Let me know][18].


[0]: http://nodejs.org/
[1]: http://yeoman.io/
[2]: http://bower.io/
[3]: http://gruntjs.com/
[4]: http://html5boilerplate.com/
[5]: http://jade-lang.com/
[6]: http://lesscss.org/
[7]: http://purecss.io/
[8]: https://jquery.org/
[9]: https://angularjs.org/
[10]: http://learnboost.github.io/stylus/
[11]: http://sass-lang.com/
[12]: https://github.com/rkgttr/generator-longtail
[13]: #npm
[14]: http://www.sublimetext.com/2
[15]: https://sublime.wbond.net/
[16]: http://git-scm.com/downloads
[17]: http://localhost:8080/
[18]: mailto:eguittiere@longtail.com.au
