require.config({
    paths: {
        text: "lib/requirejs/text",
        underscore: 'lib/underscore/underscore',
        backbone: 'lib/backbone/backbone',
        jquery: 'lib/jquery/jquery-1.11.1.min'
  }
});

require([
    'backbone',
    'components/side-navigation/side-navigation',
    'components/endpoint/endpoint',
    'models/endpoints',
    'models/imgur'
], function(Backbone, SideNavigationComponent, EndpointComponent, Endpoints, Imgur) {
    var AppView = Backbone.View.extend({
        el: document.querySelector("body"),
        events: {
            "input .client-id": "updateClientId",
        },
        initialize: function() {
            new SideNavigationComponent({el: "#sidenav"});
            this.content = this.$("#content");
            this.clientId = this.$(".client-id");
            this.addAll();
            this.clientId.val(Imgur.get("clientId"));
        },

        addAll: function() {
            Endpoints.each(this.addOne, this);
        },

        addOne: function(endpoint) {
            var component = new EndpointComponent({endpoint: endpoint});
            this.content.append(component.render().el);
        },

        updateClientId: function(value) {
            Imgur.set("clientId", this.clientId.val());
        }
    });

    new AppView();
});