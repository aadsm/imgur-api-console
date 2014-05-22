define([
    "backbone",
    "models/imgur"
], function(Backbone, Imgur) {
    var IMGUR_API = "https://api.imgur.com/3";

    var parseResponseHeaders = function(responseHeadersString) {
        var responseHeaders = {};
        var headers = responseHeadersString.split("\r\n");

        for (var i = 0, header; header =/*assign*/ headers[i]; i++) {
            var match = /([^:]+):\s*(.*)/.exec(header);
            if (match) {
                responseHeaders[match[1]] = match[2];
            }
        }

        return responseHeaders;
    }

    return {
        request: function(path, callback, errback) {
            var clientId = Imgur.get("clientId");
            return Backbone.$.ajax({
                url: IMGUR_API + path,
                headers: {"Authorization": "Client-ID " + clientId},
                error: errback
            }).done(function(data, textStatus, jqXHR) {
                callback({
                    body: data.data,
                    statusCode: data.status,
                    headers: parseResponseHeaders(jqXHR.getAllResponseHeaders()),

                });
            });
        }
    };
});