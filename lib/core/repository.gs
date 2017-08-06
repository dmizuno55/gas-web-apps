var Repository = (function() {
  var ss = SpreadsheetApp.openById('14stnHK34CIIGKGQJCkMrNvktBDNxd6e1qRJOQIs1n94');

  function getEntries(sheetName) {
    var sheet = ss.getSheetByName(sheetName);
    if (sheet === null) {
      return [];
    }

    return Entry.parse(sheet);
  }

  function getConfig() {
    // TODO 必要なシートだけフィルタする
    var sheet = ss.getSheetByName('setting');

    return Config.parse(sheet);
  }

  return {
    getEntries: getEntries,
    getConfig: getConfig
  };
})();
