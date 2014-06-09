// dependencies
define(['plugin/charts/nvd3/common/wrapper'], function(NVD3) {

// widget
return Backbone.View.extend(
{
    // initialize
    initialize: function(app, options) {
        this.app        = app;
        this.options    = options;
    },
            
    // render
    draw : function(process_id, chart, request_dictionary)
    {
        var nvd3 = new NVD3(this.app, this.options);
        nvd3.draw('scatterChart', process_id, chart, request_dictionary, function(nvd3_model) {
            nvd3_model.showDistX(true)
                      .showDistY(true)
                      .color(d3.scale.category10().range());
        });
    }
});

});