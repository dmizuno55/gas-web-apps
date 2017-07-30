function Repository() {
}

Repository.getEntries = function(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (sheet === null) {
    return [];
  }

  return Entry.parse(sheet);
}

Repository.getConfig = function() {
  // TODO 必要なシートだけフィルタする
  var sheet = SpreadsheetApp.getActive().getSheetByName('設定');

  var config = Config.parse(sheet);
  return config;
};
