function doGet() {
  return HtmlService
  .createTemplateFromFile('templates/index')
  .evaluate()
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getAdSpotCalendar() {

}
