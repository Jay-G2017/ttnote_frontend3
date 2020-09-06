const colorWarn = '#FA5151';
const btnDisabledFontColor = 'rgba(0,0,0,.18)';
const btnDisabledBg = 'rgba(0,0,0,.02)';

const ttnoteThemeLight = {
  // color
  colorPrimary: '#07C160',
  colorSecondary: '#586B93',
  colorWarn: colorWarn,
  colorDanger: '#DC3545',

  // active mask
  activeMaskWhite: 'rgba(0,0,0,.05)',
  activeMaskColored: 'rgba(0,0,0,.1)',
  activeMaskBlack: 'rgba(0,0,0,.15)',

  // link
  linkColorDefault: '#576B95',

  // background
  bgColorWhiteDarker: 'hsl(0,0%,95%)',
  bgColorPrimaryDarker: 'hsl(0,0%,90%)',
  bgColorPrimary: 'hsl(0,0%,95%)',
  bgColorPrimaryRgba: 'hsla(0,0%,95%,0.9)', // hsl 0 0 97
  bgColorDark: '#2A2723',
  bgColorDarkRgba: 'rgba(42,39,35,0.9)',
  bgColorDarkLighter: '#4F5054',
  bgColorDarkLighterRgba: 'rgba(79,80,84,0.9)',
  bgColorDarkHover: '#313E49',
  bgColorDarkActive: '#393A3C',
  bgColorGrey: '#35322F',
  bgColorGreyRgba: 'rgba(53,50,47,0.9)',
  bgColorGreyHover: '#313E49',
  bgColorGreyDisabled: 'hsl(30,6%,30%)',
  bgColorGreyActive: '#294372',
  bgColorGreyActive2: '#1C57C3',

  // line
  lineColorLight: 'rgba(0,0,0,.1)',
  lineColorDark2: 'rgba(0,0,0,.3)',
  lineColorSilver: '#545454',
  lineColorDark: '#211F1E',

  // text
  textColorTitle: 'rgba(0,0,0,.9)',
  textColorDesc: 'rgba(0,0,0,.5)',
  textColorTips: 'rgba(0,0,0,.3)',
  textColorWarn: '#FA5151',
  textColorLight: '#D5D4D3',
  // textColorDarkDesc: '#6F6C69',
  textColorDarkDesc: '#9b9997',
  textColorDarkTips: '#4a4745',

  // btn
  // btn default
  btnDefaultFontColor: '#06AE56',
  btnDefaultActiveFontColor: '#06AE56',
  btnDefaultDisabledFontColor: btnDisabledFontColor,

  btnDefaultBg: '#F2F2F2',
  btnDefaultActiveBg: '#D9D9D9',
  btnDefaultDisabledBg: 'rgba(0,0,0,.02)',

  btnPrimaryFontColor: '#FFFFFF',
  btnPrimaryActiveFontColor: '#FFFFFF',
  btnPrimaryDisabledFontColor: 'rgba(0,0,0,.18)',

  btnPrimaryBg: '#07C160',
  btnPrimaryActiveBg: '#06AD56',
  btnPrimaryDisabledBg: 'rgba(0,0,0,.02)',

  btnWarnFontColor: colorWarn,
  btnWarnActiveFontColor: colorWarn,
  btnWarnDisabledFontColor: btnDisabledFontColor,

  btnWarnBg: '#F2F2F2',
  btnWarnActiveBg: '#D9D9D9',
  btnWarnDisabledBg: btnDisabledBg,

  btnDisabledBg: btnDisabledBg,

  borderRadiusPrimary: '3px',
};

const ttnoteHomeLight = {
  bgColorDefault: '#FDF8F4',
  bgColorPrimary: '#e86c2a',
  bgColorLight: '#F5F5F7',
};

const LightTheme = {
  greenLight: '#95EC69',

  green: '#07C160',
  greenR10: 'hsla(149, 93%, 39%, 0.1)',
  greenL10: '#1FC770',
  greenL20: '#39CD80',
  greenD10: '#06AE57',
  greenD20: '#069A4D',

  borderRadius: '3px',
};

window.ttnoteThemeLight = ttnoteThemeLight;
window.ttnoteHomeLight = ttnoteHomeLight;

window.light = LightTheme;
