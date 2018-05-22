import color from "polychrome"

export default function generateTheme(accentColor, primaryColor, backgroundColor) {
  const primary = color(primaryColor);
  const accent = color(accentColor);
  const background = color(backgroundColor);

  const isDarkBg = background.isDark();
  const bgContrast = background.contrast();

  const isPrimaryExtreme = primary.l === 100 || primary.l === 0;

  // Mix
  const primaryHigh = isPrimaryExtreme ? primary : primary.mix(bgContrast);
  const primaryLow = isDarkBg
    ? primary.mix(background).darken(30)
    : primary.mix(background).lighten();
  const primaryMid = isPrimaryExtreme ? primaryHigh.mix(primaryLow) : primary;

  const accentLow = isDarkBg
    ? accent
      .mix(background)
      .setSaturation(10)
      .darken(15)
    : accent
      .mix(background)
      .setSaturation(10)
      .lighten();

  const [
    primary1,
    primary2,
    primary3,
    primary4,
    primary5,
    accent1,
    accent2,
    accent3
  ] = [
    primaryHigh,
    primaryHigh.mix(primaryMid),
    primaryMid,
    primaryMid.mix(primaryLow),
    primaryLow,
    accent,
    accent.mix(accentLow),
    accentLow
  ].map(color => color.hex());

  const editorBg = background.hex();
  const tabBg = isDarkBg ? background.darken(20).hex() : background.darken(5).hex();
  const sideBarBg = color(tabBg).hex();
  const sideBarHeaderBg = isDarkBg ? color(sideBarBg).darken().hex() : color(sideBarBg).darken(5).hex();
  const activityBarBg = isDarkBg ? color(sideBarHeaderBg).darken().hex() : color(sideBarHeaderBg).darken(5).hex();

  const uiBg = isDarkBg
    ? background.darken(20).hex()
    : background.darken(5).hex();
  const uiBgContrast = color(uiBg).contrast();
  const uiBorder = activityBarBg;
  const bgHighlight = isDarkBg
    ? background.lighten().hex()
    : background.darken().hex();
  const lineHighlight = isDarkBg
    ? background.lighten(32).hex()
    : background.darken(8).hex();

  const foreground = isDarkBg
    ? uiBgContrast.darken().hex()
    : uiBgContrast.lighten().hex();

  const mutedText = isDarkBg
    ? color(foreground)
      .setLightness(60)
      .hex()
    : color(foreground)
      .setLightness(40)
      .hex();

  return {
    primary1,
    primary2,
    primary3,
    primary4,
    primary5,
    accent1,
    accent2,
    accent3,
    editorBg,
    sideBarBg,
    activityBarBg,
    uiBg,
    uiBorder,
    bgHighlight,
    lineHighlight,
    mutedText,
    foreground,
    contrast: bgContrast.hex(),
  }
}