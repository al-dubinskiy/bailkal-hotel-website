import CormorantInfantRegular from "../assets/fonts/CormorantInfant/CormorantInfant-Regular.ttf";
import CormorantInfantMedium from "../assets/fonts/CormorantInfant/CormorantInfant-Medium.ttf";
import CormorantInfantSemiBold from "../assets/fonts/CormorantInfant/CormorantInfant-SemiBold.ttf";
import CormorantInfantBold from "../assets/fonts/CormorantInfant/CormorantInfant-Bold.ttf";
import RalewayLight from "../assets/fonts/Raleway/Raleway-Light.ttf";
import RalewayRegular from "../assets/fonts/Raleway/Raleway-Regular.ttf";
import RalewayItalic from "../assets/fonts/Raleway/Raleway-Italic.ttf";
import RalewayMedium from "../assets/fonts/Raleway/Raleway-Medium.ttf";
import RalewaySemiBold from "../assets/fonts/Raleway/Raleway-SemiBold.ttf";
import RalewayBold from "../assets/fonts/Raleway/Raleway-Bold.ttf";

export const fontFaceOverrides = `
@font-face {
  font-family: 'CormorantInfant';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: local('CormorantInfant'), local('CormorantInfant-Regular'), url(${CormorantInfantRegular}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'CormorantInfant';
  font-style: medium;
  font-display: swap;
  font-weight: 500;
  src: local('CormorantInfant'), local('CormorantInfant-Medium'), url(${CormorantInfantMedium}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'CormorantInfant';
  font-style: semibold;
  font-display: swap;
  font-weight: 600;
  src: local('CormorantInfant'), local('CormorantInfant-SemiBold'), url(${CormorantInfantSemiBold}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'CormorantInfant';
  font-style: bold;
  font-display: swap;
  font-weight: 700;
  src: local('CormorantInfant'), local('CormorantInfant-Bold'), url(${CormorantInfantBold}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'Raleway';
  font-style: light;
  font-display: swap;
  font-weight: 300;
  src: local('Raleway'), local('Raleway-Light'), url(${RalewayLight}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: local('Raleway'), local('Raleway-Regular'), url(${RalewayRegular}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-display: swap;
  font-weight: 400;
  src: local('Raleway'), local('Raleway-Italic'), url(${RalewayItalic}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'Raleway';
  font-style: medium;
  font-display: swap;
  font-weight: 500;
  src: local('Raleway'), local('Raleway-Medium'), url(${RalewayMedium}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'Raleway';
  font-style: semibold;
  font-display: swap;
  font-weight: 600;
  src: local('Raleway'), local('Raleway-SemiBold'), url(${RalewaySemiBold}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
@font-face {
  font-family: 'Raleway';
  font-style: bold;
  font-display: swap;
  font-weight: 700;
  src: local('Raleway'), local('Raleway-Bold'), url(${RalewayBold}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}
`;
