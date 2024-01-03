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
  let formattedDate = "";
  date = new Date(date);

  const previousYearformatter = new Intl.DateTimeFormat(
    navigator.languages[0],
    { dateStyle: "short" }
  )
  const todayFormatter = new Intl.DateTimeFormat(navigator.languages[0], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const middleMonthFormatter = new Intl.DateTimeFormat(navigator.languages[0], {
    day: '2-digit',
    month: 'short'
  })

  const currentDate = new Date();

  console.log(date.getFullYear());

  currentDate.getFullYear() > date.getFullYear()
    ? (formattedDate = previousYearformatter.format(date))
    : "";
  currentDate.getDate() === date.getDate()
    ? (formattedDate = todayFormatter.format(date))
    : (formattedDate = middleMonthFormatter.format(date));

  return formattedDate;
}
