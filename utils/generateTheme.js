import color from "polychrome"

export default function generateTheme(accentColor, primaryColor, backgroundColor) {
  const primary = color(primaryColor)
  const accent = color(accentColor)
  const background = color(backgroundColor)

  const isDarkBg = background.isDark()
  const bgContrast = background.contrast()

  // Mix
  const primaryHigh = primary.mix(bgContrast)
  const primaryLow = isDarkBg ? primary.mix(background).darken(30) : primary.mix(background).lighten()

  const accentLow = isDarkBg ? accent
    .mix(background)
    .setSaturation(10)
    .darken(15) : accent
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
    primaryHigh.mix(primary),
    primary,
    primary.mix(primaryLow),
    primaryLow,
    accent,
    accent.mix(accentLow),
    accentLow
  ].map(color => color.hex());

  const editorBg = background.hex();
  const uiBg = background.darken(17).hex();
  const uiBorder = background.darken(33).hex();
  const bgHighlight = isDarkBg ? background.lighten(3).hex() : background.darken(3).hex();
  const lineHighlight = isDarkBg ? background.lighten(20).hex() : background.darken(20).hex();

  const mutedText = isDarkBg ? background
    .setLightness(background.l + 28)
    .setSaturation(5)
    .hex() : background
      .setLightness(background.l - 28)
      .setSaturation(5)
      .hex();

  const foreground = isDarkBg ? background
    .setLightness(background.l + 48)
    .setSaturation(4)
    .hex() : background
      .setLightness(background.l - 48)
      .setSaturation(4)
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
    uiBg,
    uiBorder,
    bgHighlight,
    lineHighlight,
    mutedText,
    foreground,
    contrast: bgContrast.hex(),
  }
}