function Repository() {
}

Repository.getEntries = function(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (sheet === null) {
    return [];
  }

  return Entry.parse(sheet);
}

Repository.getTargetEntries = function(date) {
  date = date || new Date();

  var postfixes = Utils.getTargetMonthYearPostfixes(date);

  var map = {};

  var sheets = SpreadsheetApp.getActive().getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];

    var sheetName = sheet.getSheetName();
    if (!Utils.isDataSheetName(sheetName)) {
      continue;
    }

    var isInTime = postfixes.some(function(postfix) {
      return Utils.endsWith(sheetName, postfix);
    });

    if (!isInTime) {
      continue;
    }

    var adSpot = Utils.getBaseName(sheetName);

    if (!map[adSpot]) {
      map[adSpot] = [];
    }

    Array.prototype.push.apply(map[adSpot], Entry.parse(sheet));
  }

  return map;
};

Repository.getConfig = function() {
  // TODO 必要なシートだけフィルタする
  var sheet = SpreadsheetApp.getActive().getSheetByName('設定');

  var config = Config.parse(sheet);
  return config;
};
