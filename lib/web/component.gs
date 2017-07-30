function Component() {
}

Component.getAdSpots = function() {
  var template = HtmlService
    .createTemplateFromFile('templates/components/adspot');

  var config = Repository.getConfig();

  template.adSpots = config.adSpots;

  return template.evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .getContent();
}
