var Config = (function() {
  var DATA_ROW_START = 2;
  var DATA_COL_START = 1;
  var DATA_COL_END = 2;

  function parse(sheet) {
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(
      DATA_ROW_START,
      DATA_COL_START,
      lastRow,
      DATA_COL_END);

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
  }
  return {
    parse: parse
  };
})();
