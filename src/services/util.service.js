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
  const currentDate = new Date();

  const previousYearformatter = new Intl.DateTimeFormat(
    navigator.languages[0],
    { dateStyle: "short" }
  );
  const todayFormatter = new Intl.DateTimeFormat(navigator.languages[0], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const middleMonthFormatter = new Intl.DateTimeFormat(navigator.languages[0], {
    day: "2-digit",
    month: "short",
  });

  const utcYear = date.getUTCFullYear();
  const utcMonth = ("0" + (date.getUTCMonth() + 1)).slice(-2); // Adding 1 because getUTCMonth returns zero-based month
  const utcDay = ("0" + date.getUTCDate()).slice(-2);
  const utcHours = ("0" + date.getUTCHours()).slice(-2);
  const utcMinutes = ("0" + date.getUTCMinutes()).slice(-2);
  const utcSeconds = ("0" + date.getUTCSeconds()).slice(-2);

  const formattedUTCDate = `${utcYear}-${utcMonth}-${utcDay} ${utcHours}:${utcMinutes}:${utcSeconds} UTC`;

  // console.log(currentDate.getDate(), date.getDate()); // Output: UTC formatted date

  currentDate.getFullYear() > date.getFullYear()
    ? (formattedDate = previousYearformatter.format(date))
    : currentDate.getDate() === date.getDate()
    ? (formattedDate = todayFormatter.format(date))
    : (formattedDate = middleMonthFormatter.format(date));

  return formattedDate;
}
