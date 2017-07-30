function Utils() {
}

Utils.isDataSheetName = function(sheetName) {
  return /_\d{6}$/.test(sheetName);
};

Utils.endsWith = function(str, searchWord) {
  return str.indexOf(searchWord) === str.length - searchWord.length;
};

Utils.getTargetMonthYearPostfixes = function(date) {
  return [-1, 0, 1].map(function(offset) {
    var d = new Date(date.getFullYear(), date.getMonth() + offset, 1);

    return Utils.yearMonthPostfix(d);
  });
};

Utils.hasYearMonthPostfix = function(sheetName) {
  return /_\d{6}$/.test(sheetName);
};

Utils.getBaseName = function(sheetName) {
  if (Utils.hasYearMonthPostfix(sheetName)) {
    return sheetName.slice(0, sheetName.length - 7);
  }

  return sheetName;
};

Utils.yearMonthPostfix = function(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;

  if (month === 12) {
    year += 1;
    month = 1;
  }

  return '_' + year + (month >= 10 ? month : '0' + month);
};
