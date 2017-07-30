function TemplateLoader() {
}

TemplateLoader.load = function(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};
