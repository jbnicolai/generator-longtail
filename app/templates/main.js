'use strict';

/**
 *
 * Following is a SuperClass with a few useful shortcuts
 *
 **/

function LTApp() {
    this.WIN = $(window);
    this.DOC = $(document);
    this.BODY = $('body');
    this.HTML = $('html');
    this.INITED = false;
}
/**
 *
 * Main Application
 *
 **/

function App_<%= camelname %>() {
    if(App_<%= camelname %>.instance !== undefined) {
        return App_<%= camelname %>.instance;
    } else {
        App_<%= camelname %>.instance = this;
    }
    LTApp.call(this);
    return App_<%= camelname %>.instance;
}
App_<%= camelname %>.prototype = new LTApp();

/**
*
* Singleton thing
*
**/
App_<%= camelname %>.getInstance = function(){
    if(App_<%= camelname %>.instance === undefined) {
        new App_<%= camelname %>();
    }
    return App_<%= camelname %>.instance;
}

/**
 *
 * Initialize your app, surcharge with whatever needed
 *
 **/
App_<%= camelname %>.prototype.init = function () {
	var scope = this;
    if(!scope.INITED) {
        scope.INITED = true;
        scope.addListeners();
    }
};

/**
 *
 * Event Listeners, surcharge with whatever needed
 *
 **/
App_<%= camelname %>.prototype.addListeners = function () {
	var scope = this;
    this.WIN.resize(function (event) {
        return event;
    });
    this.DOC.ajaxError(function (event, xhr, settings, thrownError) {
        scope.onAjaxError(event, xhr, settings, thrownError);
        return arguments;
    });
    this.DOC.ajaxSuccess(function (event, xhr, settings) {
        scope.onAjaxSuccess(event, xhr, settings);
        return arguments;
    });
};

/**
 *
 * React on any Ajax Error
 *
 **/
App_<%= camelname %>.prototype.onAjaxError = function (event, xhr, settings, thrownError) {
	var scope = this;
    return arguments;
};

/**
 *
 * React on any Ajax Success
 * DOM may be updated/changed
 *
 **/
App_<%= camelname %>.prototype.onAjaxSuccess = function (event, xhr, settings) {
	var scope = this;
    return arguments;
};

/**
 *
 * Declare new methods in such way
 *
 **/
App_<%= camelname %>.prototype.doSomething = function () {
	var scope = this;
    // code here
};

/**
 *
 * Launch the application
 *
 **/
$(document).ready(function () {
    App_<%= camelname %>.getInstance().init();
});


