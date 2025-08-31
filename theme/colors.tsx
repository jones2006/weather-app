type ThemeType = {
  bgWhite: (opacity: number) => string;
};

export const theme: ThemeType = {
  bgWhite: (opacity) => `rgba(255,255,255,${opacity})`,
};
