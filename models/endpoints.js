define([
    'backbone'
], function(Backbone) {
    return new Backbone.Collection([
        {
            name: "Gallery",
            description: "Returns the images in the gallery",
            url: "/gallery/{section}/{sort}/{window}/{page}",
            parameters: {
                "section": {
                    default: "hot",
                    type: "hot | top | user",
                    description: ""
                },
                "sort": {
                    default: "viral",
                    type: "viral | time",
                    description: ""
                },
                "page": {
                    default: "0",
                    type: "integer",
                    description: "The data paging number."
                },
                "window": {
                    default: "day",
                    type: "day | week | month | year | all",
                    description: "Change the date range of the request if the section is \"top\"."
                },
                "showViral": {
                    default: "true",
                    type: "true | false",
                    description: "Show or hide viral images from the 'user' section.",
                    inQueryString: true
                }
            }
        }, {
            name: "Memes Subgallery",
            description: "View images for memes subgallery",
            url: "/gallery/g/memes/{sort}/{window}/{page}",
            parameters: {
                "sort": {
                    default: "viral",
                    type: "viral | time | top",
                    description: ""
                },
                "page": {
                    default: "0",
                    type: "integer",
                    description: "The data paging number."
                },
                "window": {
                    default: "week",
                    type: "day | week | month | year | all",
                    description: "Change the date range of the request if the section is \"top\"."
                }
            }
        }, {
            name: "Memes Subgallery Images",
            description: "View a single image in the memes gallery",
            url: "/gallery/g/memes/{image_id}",
            parameters: {
                "image_id": {
                    default: "",
                    type: "id",
                    description: "The ID for the image."
                }
            }
        }, {
            name: "Sub-reddit Galleries",
            description: "View gallery images for a sub-reddit",
            url: "/gallery/r/{subreddit}/{sort}/{window}/{page}",
            parameters: {
                "subreddit": {
                    default: "",
                    type: "string",
                    description: "A valid sub-reddit name."
                },
                "sort": {
                    default: "viral",
                    type: "viral | time | top",
                    description: ""
                },
                "page": {
                    default: "0",
                    type: "integer",
                    description: "The data paging number."
                },
                "window": {
                    default: "week",
                    type: "day | week | month | year | all",
                    description: "Change the date range of the request if the section is \"top\"."
                }
            }
        }
    ]);
});