var Entry = (function() {
  DATA_ROW_START = 1;
  DATA_COL_START = 1;
  DATA_COL_END = 15;

  function dateTime_(d, t) {
    if (!d) {
      return null;
    }
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes(), t.getSeconds());
  }

  function mapping_(row, adSpot) {
    if (!row[1]) {
      return null;
    }

    return {
      team: row[1],
      title: row[2],
      start: dateTime_(row[8], row[9]).getTime(),
      end: dateTime_(row[10], row[11]).getTime(),
      adSpot: adSpot
    };
  }

  function parse(sheet) {
    var lastRow = sheet.getLastRow();
    var values = sheet.getRange(
      DATA_ROW_START,
      DATA_COL_START,
      lastRow,
      DATA_COL_END).getValues();

    var adSpot = Utils.getBaseName(sheet.getSheetName());

    var entries = [];

    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      var e = mapping_(row, adSpot);
      if (!e) {
        continue;
      }

      entries.push(e);
    }

    return entries;
  };

  return {
    parse: parse
  };
})();
