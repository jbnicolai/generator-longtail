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
}
/**
 *
 * Main Application
 *
 **/

function App_<%= name %>() {
    LTApp.call(this);
}
App_<%= name %>.prototype = new LTApp();

/**
 *
 * Initialize your app, surcharge with whatever needed
 *
 **/
App_<%= name %>.prototype.init = function () {
	var scope = this;
    scope.addListeners();
};

/**
 *
 * Event Listeners, surcharge with whatever needed
 *
 **/
App_<%= name %>.prototype.addListeners = function () {
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
App_<%= name %>.prototype.onAjaxError = function (event, xhr, settings, thrownError) {
	var scope = this;
    return arguments;
};

/**
 *
 * React on any Ajax Success
 * DOM may be updated/changed
 *
 **/
App_<%= name %>.prototype.onAjaxSuccess = function (event, xhr, settings) {
	var scope = this;
    return arguments;
};

/**
 *
 * Declare new methods in such way
 *
 **/
App_<%= name %>.prototype.doSomething = function () {
	var scope = this;
    // code here
};

/**
 *
 * Launch the application
 *
 **/
$(document).ready(function () {
    var scope = new App_<%= name %>();
    scope.init();
});
