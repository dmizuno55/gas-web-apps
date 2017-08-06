function fillSheet_(sheet) {
  var rowNum = 466;
  var values = [];

  var baseDate = new Date();
  for (var i = 0; i < rowNum; i++) {
    var start = new Date(baseDate.getTime());
    start.setDate(start.getDate() + i);
    start.setHours(0);

    var end = new Date(start.getTime());
    end.setDate(end.getDate() + i);
    end.setHours(23);

    values[i] = [
      i,
      'title-' + i,
      'team-' + i,
      start,
      start,
      end,
      end,
      start,
      start,
      end,
      end,
      end,
      'fixed'
    ];
  }

  var range = sheet.getRange(1, 1, rowNum, 13);
  range.setValues(values);

  range.offset(0, 3).setNumberFormat('yyyy-mm-dd');
  range.offset(0, 4).setNumberFormat('hh:mm');
  range.offset(0, 5).setNumberFormat('yyyy-mm-dd');
  range.offset(0, 6).setNumberFormat('hh:mm');

  range.offset(0, 7).setNumberFormat('yyyy-mm-dd');
  range.offset(0, 8).setNumberFormat('hh:mm');
  range.offset(0, 9).setNumberFormat('yyyy-mm-dd');
  range.offset(0, 10).setNumberFormat('hh:mm');

  range.offset(0, 11).setNumberFormat('yyyy-mm-dd');
}

function getConfigs_(sheet) {
  var range = sheet.getDataRange();
  range = range.offset(1, 0, range.getNumRows() -1);
  var values = range.getValues();
  var colors = range.getBackgrounds();

  var config = [];
  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    var color = colors[i];
    config.push({
      name: value[0],
      color: color[1]
    });
  }

  return config;
}

function clearData() {
  var ss = SpreadsheetApp.getActive();
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    if (sheet.getName().indexOf('sheet-') === 0) {
      ss.deleteSheet(sheets[i]);
    }
  }
}

function creatData() {
  var sheetNum = 15;
  var ss = SpreadsheetApp.getActive();

  for (var i = 0; i < sheetNum; i++) {
    var sheet = ss.insertSheet();
    fillSheet_(sheet);
    sheet.setName('sheet-' + i);
  }
}
