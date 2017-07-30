function doGet() {
  return HtmlService
  .createTemplateFromFile('templates/index')
  .evaluate()
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getAdSpotCalendar() {
  var adSpots = Repository.getTargetEntries(new Date());

  var events = Object.keys(adSpots).reduce(function(pre, adSpot) {
    Array.prototype.push.apply(pre, adSpots[adSpot]);
    return pre;
  }, []);

  return {
    events: events,
    adSpots: Repository.getAdSpots()
  };
}
