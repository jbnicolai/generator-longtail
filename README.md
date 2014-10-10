# Longtail Frontend Setup 

This guide will help you through the process of setting up static frontend projects. This is a simple framework based on [NodeJS][0], [Yeoman][1], [Bower][2] and [Grunt][3] that automate a lot of tasks such as preprocessing your files and minify them. The framework includes:

* A convenient folder structure.
* A HTML template based on [HTML5 Boilerplate][4].
* An optional set of [Jade][5] templates based on HTML5 Boilerplate to generate your pages.
* Several [LESS][6] files that compile in a single autoprefixed minified CSS files.
* Option to use [SCSS][11], but that bit is a work in progress.
* A CSS grid framework based on [PureCSS][7].
* [jQuery][8] and a few JavaScript helpers that compile in a single minified JavaScript file.
* An image minifier.
* A simple webserver that reloads automatically when you make changes.
* A [Grunt][3] observer that automatically compile your changes on LESS and JavaScript files.

As the framework may evolve to include more options (such as including other JavaScript libraries like [AngularJS][9], or other pre-processors like [Stylus][10], ...), I strongly suggest that you subscribe to this Github project. This way you will get email notifications when a change is available and you will be able to update by reinstalling the [npm][13].

For editing code, I suggest that you use [Sublime Text][14] with [Package Control][15] to extends its functionalies. This is the best and most extensible editor at the moment, simple as that.

## Global Configuration

The following needs to be done once.

[Install GIT][16]  

Important for Windows users, you must install msysgit correctly. Be sure to check the option shown below:  
![](http://demo.longtail.com.au/frontend/img/build/mysgit.png)

[Install NodeJs][0]

Open a console (Windows: `Win+R` then type `cmd` then press Enter, Mac: `Command+Space` then type `terminal` then press Enter)

Install Grunt by entering the following command:

    npm install -g grunt-cli

 And press Enter

Install Bower by entering the following command:

    npm install -g bower

 And press Enter

Install Yeoman by entering the following command:

    npm install -g yo

 And press Enter

Install the project generator by entering the following command:

    npm install -g generator-longtail

And press Enter

## Project Configuration

The following needs to be done per project.


Create a folder


Move into this folder then `shift + right click` and select "Open command window here", on Mac open a Terminal and move to this folder (`cd \[your-path\]`) or go to `System Preferences \> Keyboard \> Keyboard Shortcuts \> Services` and enable `New Terminal at Folder` and the service will appear by `right click` or `Control + click` on the folder.


In the console that opens, type:

	yo longtail

Press Enter and answer the few questions about the project name, description and version. If you want to use the [Jade templating engine][5], answer **yes** to the `Use Jade templating engine` question. I strongly recommend using Jade as it's a very powerful templating engine. Once you've adopted it, standard HTML coding looks like stone age.

You can choose to use [SCSS][11] instead of [LESS][6] but the SCSS files are not finished. At all.

If you answer **yes** to the `ASPX form included in the markup` question, what the template does is adding a form tag after the body to encapsulate your page content. This may impact the style of your page.

When all this is done, all your templates files will be under the app folder, here you will find one .bat file (or .command file on Mac): `launchgrunt`

`launchgrunt` first compiles all your files (js + less, etc.), launches a web server, watches any changes you make to re-compile on the fly, and finally refreshes the server.

Open [http://localhost:8080/][17] to see this in action.

## Start Working

Following are a few things to keep in mind when you work on your project:


Don't forget to launch app/launchgrunt before working on your project.

Open [http://localhost:8080/][17].

There are two main folders in your `app/` folder: `app/build/` and `app/src/`. `app/build/` contains the compiled, concatenated and minified files you will deploy. `app/src/` contains your working files. Only exception is the HTML templates (when you don't use Jade) which are editable directly into `app/build/`. Save all your HTML templates either on the app/build/ folder, either on the app/build/templates folder. 
Alternatively, if you use Jade, save your Jade templates into the `app/src/jade folder`, and all your included Jade templates into the `app/src/jade/includes` folder. All generated HTML files will end up in the `app/build/` folder.

Always write your JavaScript into `app/src/js/main.js`

Add any jQuery plugins or JavaScript helpers into `app/src/js/plugins.js`

Don't forget to change your favicon and the IOS and Windows special icons/tiles on the `app/build/` folder.

Always put your images into `app/src/img/`. If you delete an image, it will not be deleted on the `app/build/img/` folder, do it manually.

If you want to commit your work on SVN or any version control system, don't commit the `node\_modules` folder. Create a rule to exclude them.

### Using LESS

Write your main styles into `app/src/less/main.less`. You can create more `less` files if you want to structure your project differently. You just have to import these files into `app/src/less/main.less` with the `@import` directive.

You can write all your mediaqueries as you go by nesting them directly in your code. For example:

    .selector{
        color: blue;
        @media screen and (min-width: 768px) {
            color: white;
        @media @my-mediaquery-variable {
            color: red;
        }
    }

For more convenience, a few common breakpoint variables have been added to `app/src/less/variables.less`. You can add more breakpoints here if you want, or edit/delete the ones that already exist. Don't forget that IE8 doesn't support mediaqueries so you will need to have a desktop first approach if you need to support IE8.

#### The grid system

The grid system is based on [PureCSS][7] in term of philosophy: meaning it uses `display:flex` and fallbacks to `display:inline-block` for older browsers. No `float` here. There are no grid unit classes in the framework, just two useful mixins to build your grids.

##### The grid units container

First one is the `.unit-wrapper` mixin. Which create the container for your grid units, and works like this:

    .unit-wrapper(~".your-wrapper-class-name");
    /* or */
    .unit-wrapper(~".your-wrapper-class-name, header, .other-class-name");

If you have several grid containers, use the second syntax above as it will save a couple of bytes in the compiled file and will avoid redundancy.

##### The grid unit

Second mixin is the grid unit mixin, simply called `.unit`, and it works like this:

    .your-selector {
        .unit(1/2);
    }
    /* or */
    .your-selector {
        .unit(1, 1/2, ~"screen and (min-width: 980px)", 1/3, ~"screen and (min-width: 1200px)");
    }
    /* or */
    .your-selector {
        .unit(0.5, 1/2, @my-mediaquery-variable, 1/3, @my-other-ediaquery-variable);
    }

So in short, the first arguments is the base width of you grid unit, which will render as a percentage. e.g. `1` will be `100%`, `1/3` will be `33.3334%`, `0.5` will be `50%`. If you're on a mobile first approach, this will be the mobile width of your unit. If you're on a desktop first approach, this will be the desktop width of your unit. The other arguments are optional, they are mediaqueries and they define how your unit will react depending on several breakpoints. All the other arguments go by pair: the width of the unit, and the corresponding mediaquery. i.e.: width, mediaquery, width, mediaquery, ... You can have as many breakpoints as you want, and you can use LESS variables that contain mediaqueries strings for more convenience.

### Using SCSS

Coming soon!

Any bug? [Let me know][18].


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

