var Utils = {
  getMonthYearPostfixes: function(date, range) {
    var prefixes = [];
    for (var i = range * -1; i < range; i++) {
      var d = new Date(date.getFullYear(), date.getMonth() + i, 1);

      prefixes.push(Utils.yearMonthPostfix(d));
    }

    return prefixes;
  },
  hasYearMonthPostfix: function(sheetName) {
    return /_\d{6}$/.test(sheetName);
  },
  getBaseName: function(sheetName) {
    if (Utils.hasYearMonthPostfix(sheetName)) {
      return sheetName.slice(0, sheetName.length - 7);
    }

    return sheetName;
  },
  yearMonthPostfix: function(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    if (month === 12) {
      year += 1;
      month = 1;
    }

    return '_' + year + (month >= 10 ? month : '0' + month);
  }
};
