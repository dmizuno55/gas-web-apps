var Repository = {};

Repository.getEntries = function(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (sheet === null) {
    return [];
  }

  return Entry.parse(sheet);
}

Repository.getConfig = function() {
  // TODO 必要なシートだけフィルタする
  var sheet = SpreadsheetApp.getActive().getSheetByName('setting');

  return Config.parse(sheet);
};
