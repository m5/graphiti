Graphiti = window.Graphiti || {};

Graphiti.startRefresh = function(seconds){
  this.refreshTimer = setInterval(function(){
    $('#graphs-pane div.graph img.ggraph, div#graph-preview img').each(function() {
      var jqt = $(this);
      var src = jqt.attr('src');
      Sammy.log("Refreshing from", src);
      src.replace(/(^.*_timestamp_=).*/, function (match, _1) { return  _1 +  new Date().getTime() + "000#.png"; })
      jqt.attr('src',src);
    });
  }, seconds * 1000);
};

Graphiti.stopRefresh = function(){
  clearInterval(this.refreshTimer);
};

Graphiti.setRefresh = function(){
  if ($('#auto-refresh').prop('checked')) {
    Sammy.log("starting");
    this.startRefresh($('#auto-refresh').data('interval'));
  } else {
    Sammy.log("stop");
    this.stopRefresh();
  }
};

$(Graphiti.setRefresh.bind(Graphiti));
$("#auto-refresh").change(Graphiti.setRefresh.bind(Graphiti));
