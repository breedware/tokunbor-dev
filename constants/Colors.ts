const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
export enum CUSTOMCOLRS {
  // From your CUSTOMCOLRS:
  PRIMARY = "#2E7D32",
  ACCENT = "#FFB300",
  BACKGROUND = "#F1F8E9",
  SURFACE = "#FFFFFF",
  TEXT_DARK = "#1B5E20",
  TEXT_LIGHT = "#558B2F",
}
export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
