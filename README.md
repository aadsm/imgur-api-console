Test Console for Imgur API 3.0
==============================

This is a small project to test the different Imgur API endpoints.
The layout is based on the http://api.imgur.com website and it uses all scripts and css files that exist on that website.
It is supposed to be an extension of the website by adding the necessary scripts, CSS and HTML files to build the test console page.

The entire application is built with [Backbone](https://github.com/jashkenas/backbone) and [RequireJS](https://github.com/jrburke/requirejs). Here's the breakdown:

Components
----------
This application introduces the concept of backbone components. These components are nothing more than a backbone view. Its main purpose is to add a bit of structure and organization to the views.

Each component lives in a directory with a JavaScript file that contains the backbone view, and an HTML file that contains the template of the view. The CSS files that the component uses are also in this folder and are included in the main HTML of the application.

This application has two components, `side-navigation` that renders the left side menu and `endpoint` that renders a single endpoint in the content area. The `endpoint` component expects to receive an `endpoint` object with the data of the endpoint.

Models
------

There are two models in this application, `Imgur` that holds the client id used to authenticate with imgur, and `Endpoints` that holds the information of all the available endpoints. The `Endpoints` is a Collection of endpoints, it is not an exhaustive list and you can easily add more in the `models/endpoints.js` file by following the same structure.

Application
-----------

The application initializes the components. It instantiates a `side-navigation` view and as many `enpoint` views as items in the `endpoints` collection.

You need to set your client id in order to use this test console properly. This can be set up following the instructions at [https://api.imgur.com/oauth2#register](https://api.imgur.com/oauth2#register).

The headers shown do not include the `X-RateLimit-*` that detail the usage rate because the server is not sending the `Access-Control-Expose-Headers` header.

License
-------

This code is released under the BSD 3-Clause License:  http://opensource.org/licenses/BSD-3-Clause

All Imgur related resources and assets are copyrighted by [Imgur](http://imgur.com).