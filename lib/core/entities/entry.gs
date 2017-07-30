function Entry() {
}

Entry.DATA_ROW_START = 1;
Entry.DATA_COL_START = 6;
Entry.DATA_COL_END = 15;

Entry.TEAM_ICON = {
  'メディア': '😀',
  'スペンド': '💰',
  'つりカジ': '🎣',
  'ライフ': '🌱'
};

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

  var entry = {
    team: row[1],
    title: row[2],
    start: dateTime_(row[7], row[8]).getTime(),
    end: dateTime_(row[9], row[10]).getTime(),
    adSpot: adSpot
  };

  entry.fullTitle = '【' + entry.adSpot + '】' +  Entry.TEAM_ICON[entry.team] + ' ' + entry.title;

  return entry;
}

Entry.parse = function(sheet) {
  var lastRow = sheet.getLastRow();
  var values = sheet.getRange(
    Entry.DATA_ROW_START,
    Entry.DATA_COL_START,
    lastRow,
    Entry.DATA_COL_END).getValues();

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
