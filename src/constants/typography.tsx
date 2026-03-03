import { TextStyle } from "react-native";

export type TypographyVariant =
  | "title"
  | "body"
  | "bodyS"
  | "bodyM"
  | "captionM"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

export const typography: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontFamily: "Epilogue-ExtraBold",
    fontSize: 24,
    letterSpacing: 24 * 0.01,
  },
  h2: {
    fontFamily: "Epilogue",
    fontSize: 18,
    letterSpacing: 18 * 0.005,
    fontWeight: "bold",
    // fontWeight: 'extrabold',
  },
  h3: {
    // fontFamily: 'Epilogue',
    fontFamily: "Epilogue-ExtraBold",
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 16 * 0.005,
    fontWeight: "bold",
    // fontWeight: 'extrabold',
  },
  h4: {
    fontFamily: "Epilogue",
    fontSize: 14,
    fontWeight: "bold",
    // fontWeight: 'extrabold',
  },
  body: {
    fontFamily: "Epilogue",
    fontWeight: "regular",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyS: {
    fontFamily: "Epilogue",
    fontWeight: "regular",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 12 * 0.01,
  },
  bodyM: {
    fontFamily: "Epilogue",
    fontWeight: "regular",
    fontSize: 14,
    lineHeight: 20,
  },

  captionM: {
    fontFamily: "Epilogue",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 12 * 0.05,
  },
  title: {
    fontSize: 20,
  },
};
