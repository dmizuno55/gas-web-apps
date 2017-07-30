function doGet() {
  return HtmlService
  .createTemplateFromFile('templates/index')
  .evaluate()
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getEventSources() {
  var config = Repository.getConfig();
  var adSpots = config.adSpots;
  var postfixes = Utils.getMonthYearPostfixes(new Date(), 1);

  return adSpots.reduce(function(pre, adSpot) {
    var events = prefixes.reduce(function(list, postfix) {
      var sheetName = adSpot.name + postfix;
      Array.prototype.push.apply(list, Repository.getEntries(sheetName););
      return list;
    }, []);

    pre[adSpot.name] = {
      id: adSpot.name,
      color: adSpot.color,
      events: events
    };

    return pre;
  }, {});
}
