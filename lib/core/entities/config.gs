function Config() {
}

Config.DATA_ROW_START = 2;
Config.DATA_COL_START = 1;
Config.DATA_COL_END = 2;

Config.parse = function(sheet) {
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(
    Entry.DATA_ROW_START,
    Entry.DATA_COL_START,
    lastRow,
    Entry.DATA_COL_END);

  var config = {
    adSpots: []
  };

  var values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    if (!row[0]) {
      break;
    }

    var color = range.getCell(i + 1, 2).getBackground();
    config.adSpots.push({
      name: row[0],
      color: color
    });
  }

  return config;
};
