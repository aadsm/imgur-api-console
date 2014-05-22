define([
    'underscore',
    'backbone',
    'text!./side-navigation.html'
], function(_, Backbone, templateHtml) {
    return Backbone.View.extend({
        template: _.template(templateHtml),
        initialize: function() {
            this.render();
        },
        render: function() {
            this.el.innerHTML = this.template();
        }
    });
});