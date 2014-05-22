define([
    'underscore',
    'backbone',
    'js/imgur-api',
    'models/imgur',
    'text!./endpoint.html'
], function(_, Backbone, imgurApi, Imgur, templateHtml) {
    return Backbone.View.extend({
        tagName: "div",
        template: _.template(templateHtml),
        events: {
            "click a.call": "callEndpoint",
            "click a.clear": "clearResults"
        },
        initialize: function(options) {
            this.endpoint = options.endpoint;
            this.model = new Backbone.Model({
                endpoint: this.endpoint.toJSON(),
                callUrl: "",
                values: {},
                responseCode: "",
                responseHeaders: "",
                responseBody: ""
            });
            this.model.bind("change" , this.render, this);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$(".response").hide();
            return this;
        },

        callEndpoint: function() {
            var self = this;
            var values = this._getCallValues();
            var url = this._generateUrlFromValues(values);

            imgurApi.request(url, function(response) {
                self.model.set({
                    callUrl: url,
                    values: values,
                    responseCode: response.statusCode,
                    responseHeaders: JSON.stringify(response.headers, null, 2),
                    responseBody: JSON.stringify(response.body, null, 2)
                });
                _.each(self.$(".javascript").toArray(), hljs.highlightBlock);
                self.$(".response").show();
            }, function(xhr) {
                self.model.set({
                    callUrl: url,
                    values: values,
                    responseCode: xhr.status,
                    responseHeaders: "",
                    responseBody: ""
                });
                self.$(".response").show();
            });
        },

        clearResults: function() {
            this.$(".response").hide();
        },

        _getCallValues: function() {
            var values = {};

            this.$("input[type='text']").each(function(ix, input) {
                values[input.name] = input.value;
            });

            return values;
        },

        _generateUrlFromValues: function(values) {
            var url = this.endpoint.get("url");
            var parameters = this.endpoint.get("parameters");
            var queryString = [];

            _.each(values, function(value, name) {
                if (parameters[name].inQueryString) {
                    if (value) {
                        queryString.push(name + "=" + encodeURIComponent(value));
                    }
                } else {
                    url = url.replace("{" + name + "}", value);
                }
            });

            // Remove excess / created by empty parameters.
            url = url.replace(/\/\/+/g, "/");
            // Remove trailing / when present.
            url = url.replace(/\/$/, "");

            if (queryString.length > 0) {
                url += "?" + queryString.join("&");
            }

            return url;
        }
    });
});