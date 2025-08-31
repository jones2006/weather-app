export const getWeatherImage = (condition: string) => {
  const lower = condition.toLowerCase();

  if (lower.includes("sunny")) return require("../assets/images/sun1.png");
  if (lower.includes("partly"))
    return require("../assets/images/partlycloudy.png");
  if (lower.includes("cloud")) return require("../assets/images/cloud.png");
  if (lower.includes("rain")) return require("../assets/images/heavyrain.png");
  if (lower.includes("thunder"))
    return require("../assets/images/heavyrain.png");

  return require("@/assets/images/mist.png"); // fallback
};
