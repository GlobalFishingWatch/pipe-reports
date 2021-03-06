/* eslint-disable quotes */
const lodash = require('lodash');

const indexByCode = {
  "AD": {name: "Andorra", code: 'AD', midcodes: [202]},
  "AE": {name: "United Arab Emirates", code: "AE", midcodes: [470]},
  "AF": {name: "Afghanistan", code: "AF", midcodes: [401]},
  "AG": {name: "Antigua and Barbuda", code: "AG", midcodes: [304, 305]},
  "AI": {name: "Anguilla - UK", code: "AI", midcodes: [301]},
  "AL": {name: "Albania", code: 'AL', midcodes: [201]},
  "AM": {name: "Armenia", code: "AM", midcodes: [216]},
  "AN": {name: "Netherlands Antilles", code: "NL", midcodes: [306]},
  "AO": {name: "Angola", code: "AO", midcodes: [603]},
  "AR": {name: "Argentine Republic", code: "AR", midcodes: [701]},
  "AS": {name: "American Samoa - USA", code: "AS", midcodes: [559]},
  "AT": {name: "Austria", code: "AT", midcodes: [203]},
  "AU": {name: "Australia", code: "AU", midcodes: [503]},
  "AW": {name: "Aruba - NL", code: "AW", midcodes: [307]},
  "AZ": {name: "Azerbaijan", code: "AZ", midcodes: [423]},
  "BA": {name: "Bosnia and Herzegovina", code: "BA", midcodes: [478]},
  "BB": {name: "Barbados", code: "BB", midcodes: [314]},
  "BD": {name: "Bangladesh", code: "BD", midcodes: [405]},
  "BE": {name: "Belgium", code: "BE", midcodes: [205]},
  "BF": {name: "Burkina Faso", code: "BF", midcodes: [633]},
  "BG": {name: "Bulgaria", code: "BG", midcodes: [207]},
  "BH": {name: "Bahrain", code: "BH", midcodes: [408]},
  "BI": {name: "Burundi", code: "BI", midcodes: [609]},
  "BJ": {name: "Benin", code: "BJ", midcodes: [610]},
  "BM": {name: "Bermuda - UK", code: "BM", midcodes: [310]},
  "BN": {name: "Brunei Darussalam", code: "BN", midcodes: [508]},
  "BO": {name: "Bolivia", code: "BO", midcodes: [720]},
  "BR": {name: "Brazil", code: "BR", midcodes: [710]},
  "BS": {name: "Bahamas", code: "BS", midcodes: [308, 309, 311]},
  "BT": {name: "Bhutan", code: "BT", midcodes: [410]},
  "BW": {name: "Botswana", code: "BW", midcodes: [611]},
  "BY": {name: "Belarus", code: "BY", midcodes: [206]},
  "BZ": {name: "Belize", code: "BZ", midcodes: [312]},
  "CA": {name: "Canada", code: "CA", midcodes: [316]},
  "CC": {name: "Cocos (Keeling) Islands - AUS", code: "CC", midcodes: [523]},
  "CD": {name: "Democratic Republic of the Congo", code: "CD", midcodes: [615, 676]},
  "CF": {name: "Central African Republic", code: "CF", midcodes: [612]},
  "CH": {name: "Switzerland", code: "CH", midcodes: [269]},
  "CI": {name: "Côte d'ivoire", code: "CI", midcodes: [619]},
  "CK": {name: "Cook Islands - NZ", code: "CK", midcodes: [518]},
  "CL": {name: "Chile", code: "CL", midcodes: [725]},
  "CM": {name: "Cameroon", code: "CM", midcodes: [613]},
  "CN": {name: "China", code: "CN", midcodes: [412, 413, 414]},
  "CO": {name: "Colombia", code: "CO", midcodes: [730]},
  "CR": {name: "Costa Rica", code: "CR", midcodes: [321]},
  "CU": {name: "Cuba", code: "CU", midcodes: [323]},
  "CV": {name: "Cabo Verde", code: "CV", midcodes: [617]},
  "CW": {name: "Curaçao - NL", code: "CW", midcodes: [306]},
  "CX": {name: "Christmas Island - AUS", code: "CX", midcodes: [516]},
  "CY": {name: "Cyprus", code: "CY", midcodes: [209, 210, 212]},
  "CZ": {name: "Czech Republic", code: "CZ", midcodes: [270]},
  "DE": {name: "Germany", code: "DE", midcodes: [211, 218]},
  "DJ": {name: "Djibouti", code: "DJ", midcodes: [621]},
  "DK": {name: "Denmark", code: "DK", midcodes: [219, 220]},
  "DM": {name: "Dominica", code: "DM", midcodes: [325]},
  "DO": {name: "Dominican Republic", code: "DO", midcodes: [327]},
  "DZ": {name: "Algeria", code: "DZ", midcodes: [605]},
  "EC": {name: "Ecuador", code: "EC", midcodes: [735]},
  "EE": {name: "Estonia", code: "EE", midcodes: [276]},
  "EG": {name: "Egypt", code: "EG", midcodes: [622]},
  "ER": {name: "Eritrea", code: "ER", midcodes: [625]},
  "ES": {name: "Spain", code: "ES", midcodes: [224, 225]},
  "ET": {name: "Ethiopia", code: "ET", midcodes: [624]},
  "FI": {name: "Finland", code: "FI", midcodes: [230]},
  "FJ": {name: "Fiji", code: "FJ", midcodes: [520]},
  "FK": {name: "Falkland Islands (Malvinas) - UK", code: "FK", midcodes: [740]},
  "FM": {name: "Micronesia", code: "FM", midcodes: [510]},
  "FO": {name: "Faroe Islands - DK", code: "FO", midcodes: [231]},
  "FR": {name: "France", code: "FR", midcodes: [226, 227, 228]},
  "GA": {name: "Gabonese Republic", code: "GA", midcodes: [626]},
  "GB": {name: "UK", code: "GB", midcodes: [232, 233, 234, 235]},
  "GD": {name: "Grenada", code: "GD", midcodes: [330]},
  "GE": {name: "Georgia", code: "GE", midcodes: [213]},
  "GF": {name: "Guiana - FR", code: "GF", midcodes: [745]},
  "GH": {name: "Ghana", code: "GH", midcodes: [627]},
  "GI": {name: "Gibraltar - UK", code: "GI", midcodes: [236]},
  "GL": {name: "Greenland - DK", code: "GL", midcodes: [331]},
  "GM": {name: "Gambia", code: "GM", midcodes: [629]},
  "GN": {name: "Guinea", code: "GN", midcodes: [632]},
  "GP": {name: "Guadeloupe - FR", code: "GP", midcodes: [329]},
  "GQ": {name: "Equatorial Guinea", code: "GQ", midcodes: [631]},
  "GR": {name: "Greece", code: "GR", midcodes: [237, 239, 240, 241]},
  "GT": {name: "Guatemala", code: "GT", midcodes: [332]},
  "GW": {name: "Guinea-Bissau", code: "GN", midcodes: [630]},
  "GY": {name: "Guyana", code: "GY", midcodes: [750]},
  "HK": {name: "Hong Kong - CN", code: "HK", midcodes: [477]},
  "HN": {name: "Honduras", code: "HN", midcodes: [334]},
  "HR": {name: "Croatia", code: "HR", midcodes: [238]},
  "HT": {name: "Haiti", code: "HT", midcodes: [336]},
  "HU": {name: "Hungary", code: "HU", midcodes: [243]},
  "ID": {name: "Indonesia", code: "ID", midcodes: [525]},
  "IE": {name: "Ireland", code: "IE", midcodes: [250]},
  "IL": {name: "Israel", code: "IL", midcodes: [428]},
  "IN": {name: "India", code: "IN", midcodes: [419]},
  "IQ": {name: "Iraq", code: "IQ", midcodes: [425]},
  "IR": {name: "Iran", code: "IR", midcodes: [422]},
  "IS": {name: "Iceland", code: "IS", midcodes: [251]},
  "IT": {name: "Italy", code: "IT", midcodes: [247]},
  "JM": {name: "Jamaica", code: "JM", midcodes: [339]},
  "JO": {name: "Jordan", code: "JO", midcodes: [438]},
  "JP": {name: "Japan", code: "JP", midcodes: [431, 432]},
  "KE": {name: "Kenya", code: "KE", midcodes: [634]},
  "KG": {name: "Kyrgyz Republic", code: "KG", midcodes: [451]},
  "KH": {name: "Cambodia", code: "KH", midcodes: [514, 515]},
  "KI": {name: "Kiribati", code: "KI", midcodes: [529]},
  "KM": {name: "Comoros", code: "KM", midcodes: [616, 620]},
  "KN": {name: "Saint Kitts and Nevis", code: "KN", midcodes: [341]},
  "KP": {name: "Democratic People's Republic of Korea", code: "KR", midcodes: [445]},
  "KR": {name: "Korea", code: "KR", midcodes: [440, 441]},
  "KW": {name: "Kuwait", code: "KW", midcodes: [447]},
  "KY": {name: "Cayman Islands - UK", code: "KY", midcodes: [319]},
  "KZ": {name: "Kazakhstan", code: "KZ", midcodes: [436]},
  "LA": {name: "Lao People's Democratic Republic", code: "LA", midcodes: [531]},
  "LB": {name: "Lebanon", code: "LB", midcodes: [450]},
  "LC": {name: "Saint Lucia", code: "LC", midcodes: [343]},
  "LI": {name: "Liechtenstein", code: "LI", midcodes: [252]},
  "LK": {name: "Sri Lanka", code: "LK", midcodes: [417]},
  "LR": {name: "Liberia", code: "LR", midcodes: [636, 637]},
  "LS": {name: "Lesotho", code: "LS", midcodes: [644]},
  "LT": {name: "Lithuania", code: "LT", midcodes: [277]},
  "LU": {name: "Luxembourg", code: "LU", midcodes: [253]},
  "LV": {name: "Latvia", code: "LV", midcodes: [275]},
  "LY": {name: "Libya", code: "LY", midcodes: [642]},
  "MA": {name: "Morocco", code: "MA", midcodes: [242]},
  "MC": {name: "Monaco", code: "MC", midcodes: [254]},
  "MD": {name: "Moldova", code: "MD", midcodes: [214]},
  "ME": {name: "Montenegro", code: "ME", midcodes: [262]},
  "MG": {name: "Madagascar", code: "MG", midcodes: [647]},
  "MH": {name: "Marshall Islands", code: "MH", midcodes: [538]},
  "MK": {name: "The Former Yugoslav Republic of Macedonia", code: "MK", midcodes: [274]},
  "ML": {name: "Mali", code: "ML", midcodes: [649]},
  "MM": {name: "Myanmar", code: "MM", midcodes: [506]},
  "MN": {name: "Mongolia", code: "MN", midcodes: [457]},
  "MO": {name: "Macao - CN", code: "MO", midcodes: [453]},
  "MP": {name: "Northern Mariana Islands - USA", code: "MP", midcodes: [536]},
  "MQ": {name: "Martinique - FR", code: "MQ", midcodes: [347]},
  "MR": {name: "Mauritania", code: "MR", midcodes: [654]},
  "MS": {name: "Montserrat - UK", code: "MS", midcodes: [348]},
  "MT": {name: "Malta", code: "MT", midcodes: [215, 229, 248, 249, 256]},
  "MU": {name: "Mauritius", code: "MU", midcodes: [645]},
  "MV": {name: "Maldives", code: "MV", midcodes: [455]},
  "MW": {name: "Malawi", code: "MW", midcodes: [655]},
  "MX": {name: "Mexico", code: "MX", midcodes: [345]},
  "MY": {name: "Malaysia", code: "MY", midcodes: [533]},
  "MZ": {name: "Mozambique", code: "MZ", midcodes: [650]},
  "NA": {name: "Namibia", code: "NA", midcodes: [659]},
  "NC": {name: "New Caledonia - FR", code: "NC", midcodes: [540]},
  "NE": {name: "Niger", code: "NE", midcodes: [656]},
  "NG": {name: "Nigeria", code: "NG", midcodes: [657]},
  "NI": {name: "Nicaragua", code: "NI", midcodes: [350]},
  "NL": {name: "Netherlands", code: "NL", midcodes: [244, 245, 246, 306]},
  "NO": {name: "Norway", code: "NO", midcodes: [257, 258, 259]},
  "NP": {name: "Nepal", code: "NP", midcodes: [459]},
  "NR": {name: "Nauru", code: "NR", midcodes: [544]},
  "NU": {name: "Niue - NZ", code: "NU", midcodes: [542]},
  "NZ": {name: "New Zealand", code: "NZ", midcodes: [512]},
  "OM": {name: "Oman", code: "OM", midcodes: [461]},
  "PA": {name: "Panama", code: "PA", midcodes: [351, 352, 353, 354, 355, 356, 357, 370, 371, 372, 373]},
  "PE": {name: "Peru", code: "PE", midcodes: [760]},
  "PF": {name: "French Polynesia - FR", code: "PF", midcodes: [546]},
  "PG": {name: "Papua New Guinea", code: "PG", midcodes: [553]},
  "PH": {name: "Philippines", code: "PH", midcodes: [548]},
  "PK": {name: "Pakistan", code: "PK", midcodes: [463]},
  "PL": {name: "Poland", code: "PL", midcodes: [261]},
  "PM": {name: "Saint Pierre and Miquelon - FR", code: "PM", midcodes: [361]},
  "PN": {name: "Pitcairn Island - UK", code: "PN", midcodes: [555]},
  "PR": {name: "Puerto Rico - USA", code: "PR", midcodes: [358]},
  "PS": {name: "State of Palestin", code: "PS", midcodes: [443]},
  "PT": {name: "Portugal", code: "PT", midcodes: [204, 255, 263]},
  "PW": {name: "Palau", code: "PW", midcodes: [511]},
  "PY": {name: "Paraguay", code: "PY", midcodes: [755]},
  "QA": {name: "Qatar", code: "QA", midcodes: [466]},
  "RE": {name: "Reunion - FR", code: "RE", midcodes: [660]},
  "RO": {name: "Romania", code: "RO", midcodes: [264]},
  "RS": {name: "Serbia", code: "RS", midcodes: [279]},
  "RU": {name: "Russian Federation", code: "RU", midcodes: [273]},
  "RW": {name: "Rwanda", code: "RW", midcodes: [661]},
  "SA": {name: "Saudi Arabia", code: "SA", midcodes: [403]},
  "SB": {name: "Solomon Islands", code: "SB", midcodes: [557]},
  "SC": {name: "Seychelles", code: "SC", midcodes: [664]},
  "SD": {name: "Sudan", code: "SD", midcodes: [662]},
  "SEE": {name: "Vatican City State", code: "SEE", midcodes: [208]},
  "SE": {name: "Sweden", code: "SE", midcodes: [265, 266]},
  "SG": {name: "Singapore", code: "SG", midcodes: [563, 564, 565, 566]},
  "SH": {name: "Ascension Island", code: "SH", midcodes: [608, 665]},
  "SI": {name: "Slovenia", code: "SI", midcodes: [278]},
  "SK": {name: "Slovak Republic", code: "SK", midcodes: [267]},
  "SL": {name: "Sierra Leone", code: "SL", midcodes: [667]},
  "SM": {name: "San Marino", code: "SM", midcodes: [268]},
  "SN": {name: "Senegal", code: "SN", midcodes: [663]},
  "SO": {name: "Somalia", code: "SO", midcodes: [666]},
  "SR": {name: "Suriname", code: "SR", midcodes: [765]},
  "SS": {name: "South Sudan", code: "SS", midcodes: [638]},
  "ST": {name: "Sao Tome and Principe", code: "ST", midcodes: [668]},
  "SV": {name: "El Salvador", code: "SV", midcodes: [359]},
  "SY": {name: "Syrian Arab Republic", code: "SY", midcodes: [468]},
  "SZ": {name: "Swaziland", code: "SZ", midcodes: [669]},
  "TC": {name: "Turks and Caicos Islands - UK", code: "TC", midcodes: [364]},
  "TD": {name: "Chad", code: "TD", midcodes: [670]},
  "TF": {name: "French Southern Territories", code: "TF", midcodes: [501, 618, 635, 607]},
  "TG": {name: "Togolese Republic", code: "TG", midcodes: [671]},
  "TH": {name: "Thailand", code: "TH", midcodes: [567]},
  "TJ": {name: "Tajikistan", code: "TJ", midcodes: [472]},
  "TM": {name: "Turkmenistan", code: "TM", midcodes: [434]},
  "TN": {name: "Tunisia", code: "TN", midcodes: [672]},
  "TO": {name: "Tonga", code: "TO", midcodes: [570]},
  "TR": {name: "Turkey", code: "TR", midcodes: [271]},
  "TT": {name: "Trinidad and Tobago", code: "TT", midcodes: [362]},
  "TV": {name: "Tuvalu", code: "TV", midcodes: [572]},
  "TW": {name: "Taiwan - CN", code: "TW", midcodes: [416]},
  "TZ": {name: "Tanzania", code: "TZ", midcodes: [674, 677]},
  "UA": {name: "Ukraine", code: "UA", midcodes: [272]},
  "UG": {name: "Uganda", code: "UG", midcodes: [675]},
  "US": {name: "United States of America", code: "US", midcodes: [303, 338, 366, 367, 368, 369]},
  "UY": {name: "Uruguay", code: "UY", midcodes: [770]},
  "UZ": {name: "Uzbekistan", code: "UZ", midcodes: [437]},
  "VC": {name: "Saint Vincent and the Grenadines", code: "VC", midcodes: [375, 376, 377]},
  "VE": {name: "Venezuela", code: "VE", midcodes: [775]},
  "VG": {name: "British Virgin Islands - UK", code: "VG", midcodes: [378]},
  "VI": {name: "United States Virgin Islands - USA", code: "VI", midcodes: [379]},
  "VN": {name: "Viet Nam", code: "VN", midcodes: [574]},
  "VU": {name: "Vanuatu", code: "VU", midcodes: [576, 577]},
  "WF": {name: "Wallis and Futuna Islands - FR", code: "WF", midcodes: [578]},
  "WS": {name: "Samoa", code: "WS", midcodes: [561]},
  "YE": {name: "Yemen", code: "YE", midcodes: [473, 475]},
  "ZA": {name: "South Africa", code: "ZA", midcodes: [601]},
  "ZM": {name: "Zambia", code: "ZM", midcodes: [678]},
  "ZW": {name: "Zimbabwe", code: "ZW", midcodes: [679]},
};

const indexByMidCode = lodash(indexByCode)
  .flatMap((item, key) => item.midcodes.map(midcode => [midcode, key]))
  .fromPairs()
  .value();

module.exports = {
  lookupByCode(code) {
    return indexByCode[code];
  },

  lookupByMMSI(mmsi) {
    const midCode = mmsi.toString().slice(0, 3);
    return indexByMidCode[midCode];
  },
};
