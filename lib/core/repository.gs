function Repository() {
}

Repository.getTargetEntries = function(date) {
  date = date || new Date();

  var postfixes = Utils.getTargetMonthYearPostfixes(date);

  var map = {};

  var sheets = SpreadsheetApp.getActive().getSheets();
  for (var i = 0; i < sheets.lenght; i++) {
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

Repository.getAdSpots = function() {
  // TODO 必要なシートだけフィルタする
  var sheets = SpreadsheetApp.getActive().getSheets();

  var adSpots = [];
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var sheetName = sheet.getSheetName();

    if (!Utils.isDataSheetName(sheetName)) {
      continue;
    }

    adSpots.push({
      name: Utils.getBaseName(sheetName),
      color: sheet.getTabColor()
    });
  }

  return adSpots;
};
