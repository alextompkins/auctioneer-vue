import moment from "moment";


/**
 *
 * @param {moment} other
 * @returns {string}
 */
moment.fn.fromWithExactSeconds = function (other) {
  const secondsDiff = Math.round(other.diff(this) / 1000);

  if (-60 < secondsDiff && secondsDiff < 0) {
    return "in " + Math.abs(secondsDiff) + " seconds";
  } else if (0 <= secondsDiff && secondsDiff < 60) {
    return Math.abs(secondsDiff) + " seconds ago";
  } else {
    return this.from(other);
  }
};

const currencyFormatter = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
  minimumFractionDigits: 2
});

/**
 * Turns an integer amount (in cents) into a formatted currency string in NZD.
 * Adds thousands separators, pads to 2dp and prepends a dollar sign.
 * E.g. 51 => "$0.51" and 123456789 => "$1,234,567.89"
 * @param {int} amount An integer amount in cents.
 * @returns {string} A formatted string representing the amount in NZD.
 */
export function amountAsCurrency(amount) {
  return currencyFormatter.format(amount / 100)
}

/**
 * Turns a string representing a float amount (in dollars) into an amount of cents,
 * rounding to the nearest cent. If the string does not hold a valid float, returns NaN.
 * E.g. "0.05" => 5
 *      "501.000001" => 50100
 *      "abc 123" => NaN
 * @param {string} dollarString A string representing a float amount (in dollars).
 * @returns {int} The integer number of cents in the given amount.
 */
export function dollarStringToCents(dollarString) {
  if (isNaN(dollarString)) {
    return NaN;
  } else {
    return Math.round(parseFloat(dollarString) * 100);
  }
}

/**
 *
 * @param {int} datetimeEpochMillis
 * @returns {string}
 */
export function formatDateTimeAbsolute(datetimeEpochMillis) {
  return new moment(datetimeEpochMillis).format("h:mm A, Do MMMM YYYY");
}

/**
 *
 * @param {int} epochMillisFrom
 * @param {int} epochMillisTo
 * @returns {string}
 */
export function formatTimeRelative(epochMillisFrom, epochMillisTo) {
  return new moment(epochMillisFrom).fromWithExactSeconds(new moment(epochMillisTo));
}
