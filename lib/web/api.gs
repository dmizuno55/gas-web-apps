function doGet() {
  var config = Repository.getConfig();

  var template = HtmlService.createTemplateFromFile('templates/index');
  template.adSpots = config.adSpots;
  
  return template
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getEventSources() {
  var config = Repository.getConfig();
  var adSpots = config.adSpots;

  return adSpots.reduce(function(pre, adSpot) {
    var events = Repository.getEntries(adSpot.name);

    pre[adSpot.name] = {
      id: adSpot.name,
      color: adSpot.color,
      events: events
    };

    return pre;
  }, {});
}
