export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  formattedDate,
};

function makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function saveToStorage(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue;
  return JSON.parse(value);
}

function formattedDate(date) {
  let formattedDate = ""
  const curentYear = new Date.getFullYear()
  curentYear > date.getFullYear() ? formattedDate = date.getFullYear() : ""


  return formattedDate;
}
