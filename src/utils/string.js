export function firstCapital(text) {
  if (!text || text.length === 0) return '';

  return text.charAt(0).toUpperCase() + text.substr(1);
}

export function getFirstPararaphText(htmlString) {
  const openTagIndex = htmlString.indexOf('<p>');
  const closeTagIndex = htmlString.indexOf('</p>');

  if (openTagIndex < 0 || closeTagIndex < 0) return htmlString;
  return htmlString.substring(openTagIndex + '<p>'.length, closeTagIndex)
}

export function truncateText(text, maxLength = 70, delimiter = "...") {
  if (!text || text.length === 0) return text;

  let result = "";
  if (text.length > (maxLength + delimiter.length)) {
    result = text.substr(0, maxLength) + delimiter;
  } else {
    result = text;
  }
  return result;
}

export function getShortAddressString(addressObj) {
  const { ward } = addressObj;
  const { district } = ward;
  const { city } = district;
  const districtStr = district.prefix + " " + district.name;
  const cityStr = city.prefix + " " + city.name;
  return districtStr + ", " + cityStr;
}

export function getAddressString(addressObj) {

  if (!addressObj) return '';

  const {
    ward,
    ward: {
      district,
      district: {
        city
      }
    },
    street
  } = addressObj;
  const streetStr = street.prefix + " " + street.name;
  const wardStr = ward.prefix + " " + ward.name;
  const districtStr = district.prefix + " " + district.name;
  const cityStr = city.prefix + " " + city.name;
  return [streetStr, wardStr, districtStr, cityStr].join(", ");
}