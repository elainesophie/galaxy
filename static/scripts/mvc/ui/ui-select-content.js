define(["utils/utils","mvc/ui/ui-misc","mvc/ui/ui-select-default"],function(a,b,c){var d={data:[{src:"hda",icon:"fa-file-o",tooltip:"Single dataset",batchmode:!1,multiple:!1},{src:"hda",icon:"fa-files-o",tooltip:"Multiple datasets",batchmode:!0,multiple:!0},{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collection",batchmode:!0,multiple:!1}],data_multiple:[{src:"hda",icon:"fa-files-o",tooltip:"Multiple datasets",batchmode:!1,multiple:!0},{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collection",batchmode:!1,multiple:!1}],data_collection:[{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collection",batchmode:!1,multiple:!1}],workflow_data:[{src:"hda",icon:"fa-file-o",tooltip:"Single dataset",batchmode:!1,multiple:!1},{src:"hda",icon:"fa-files-o",tooltip:"Multiple datasets",batchmode:!0,multiple:!0}],workflow_collection:[{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collection",batchmode:!1,multiple:!1},{src:"hdca",icon:"fa-folder",tooltip:"Multiple collections",batchmode:!0,multiple:!0}]},e=Backbone.View.extend({initialize:function(a){var b=this;this.model=a&&a.model||new Backbone.Model({src_labels:{hda:"dataset",hdca:"dataset collection"}}).set(a),this.setElement($("<div/>").addClass("ui-select-content")),this.$batch=$("<div/>").addClass("ui-form-info").append($("<i/>").addClass("fa fa-sitemap")).append($("<span/>").html("This is a batch mode input field. A separate job will be triggered for each dataset.")),this.history={},this.listenTo(this.model,"change:data",this._changeData,this),this.listenTo(this.model,"change:wait",this._changeWait,this),this.listenTo(this.model,"change:current",this._changeCurrent,this),this.listenTo(this.model,"change:value",this._changeValue,this),this.listenTo(this.model,"change:type change:optional change:multiple change:extensions",this._changeType,this),this.render(),this.on("change",function(){a.onchange&&a.onchange(b.value())})},render:function(){this._changeType(),this._changeValue(),this._changeWait()},wait:function(){this.model.set("wait",!0)},unwait:function(){this.model.set("wait",!1)},update:function(a){this.model.set("data",a)},value:function(a){void 0!==a&&this.model.set("value",a);var b=this.model.get("current");if(this.config[b]){var c=this.fields[b].value();if(null!==c&&(c=$.isArray(c)?c:[c],c.length>0)){var d={batch:this._batch(),values:[]};for(var e in c){var f=this.history[c[e]+"_"+this.config[b].src];if(!f)return Galaxy.emit.debug("tools-select-content::value()","Requested details not found for '"+c[e]+"'."),null;d.values.push(f)}return d.values.sort(function(a,b){return a.hid-b.hid}),d}}else Galaxy.emit.debug("tools-select-content::value()","Invalid value/source '"+a+"'.");return null},_changeCurrent:function(){var a=this;_.each(this.fields,function(b,c){a.model.get("current")==c?(b.$el.show(),a.$batch[a.config[c].batchmode&&"show"||"hide"](),a.button_type.value(c)):b.$el.hide()})},_changeType:function(){var e=this,f=String(this.model.get("type"))+(this.model.get("multiple")?"_multiple":"");d[f]?this.config=d[f]:(this.config=d.data,Galaxy.emit.debug("tools-select-content::_changeType()","Invalid configuration/type id '"+f+"'."));var g=a.textify(this.model.get("extensions")),h=this.model.get("src_labels");this.fields=[],this.button_data=[],_.each(this.config,function(a,b){e.button_data.push({value:b,icon:a.icon,tooltip:a.tooltip}),e.fields.push(new c.View({optional:e.model.get("optional"),multiple:a.multiple,searchable:!a.multiple,error_text:"No "+(g?g+" ":"")+(h[a.src]||"content")+" available.",onchange:function(){e.trigger("change")}}))}),this.button_type=new b.RadioButton.View({value:this.model.get("current"),data:this.button_data,onchange:function(a){e.model.set("current",a),e.trigger("change")}}),this.$el.empty();var i=0;this.fields.length>1&&(this.$el.append(this.button_type.$el),i=Math.max(0,35*this.fields.length)+"px"),_.each(this.fields,function(a){e.$el.append(a.$el.css({"margin-left":i}))}),this.$el.append(this.$batch.css({"margin-left":i})),this.model.set("current",0),this._changeCurrent(),this._changeData()},_changeWait:function(){var a=this;_.each(this.fields,function(b){b[a.model.get("wait")?"wait":"unwait"]()})},_changeData:function(){var a=this.model.get("data"),b=this,c={};_.each(a,function(a,d){c[d]=[],_.each(a,function(a){c[d].push({hid:a.hid,label:a.hid+": "+a.name,value:a.id}),b.history[a.id+"_"+d]=a})}),_.each(this.config,function(a,d){c[a.src]&&b.fields[d].add(c[a.src],function(a,b){return b.hid-a.hid})})},_changeValue:function(){var a=this.model.get("value");if(a&&a.values&&a.values.length>0){var b=[];_.each(a.values,function(a){b.push(a.id)});for(var c=a.values[0].src,d=a.values.length>1,e=0;e<this.config.length;e++){var f=this.fields[e],g=this.config[e];if(g.src==c&&-1!==[d,!0].indexOf(g.multiple)){this.model.set("current",e),f.value(b);break}}}else _.each(this.fields,function(a){a.value(null)})},_batch:function(){var a=this.model.get("current"),b=this.config[a];if("hdca"==b.src&&!b.multiple){var c=this.history[this.fields[a].value()+"_hdca"];if(c&&c.map_over_type)return!0}return b.batchmode}});return{View:e}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-select-content.js.map