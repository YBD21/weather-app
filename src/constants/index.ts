export const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export const weatherImages = {
  "Partly cloudy": require("../../assets/cloud-images/partly-cloudy.png"),
  "Moderate rain": require("../../assets/cloud-images/moderate-rain.png"),
  "Patchy rain possible": require("../../assets/cloud-images/moderate-rain.png"),
  Sunny: require("../../assets/cloud-images/sun.png"),
  Clear: require("../../assets/cloud-images/sun.png"),
  Overcast: require("../../assets/cloud-images/cloud.png"),
  Cloudy: require("../../assets/cloud-images/cloud.png"),
  "Light rain": require("../../assets/cloud-images/moderate-rain.png"),
  "Moderate rain at times": require("../../assets/cloud-images/moderate-rain.png"),
  "Heavy rain": require("../../assets/cloud-images/heavy-rain.png"),
  "Heavy rain at times": require("../../assets/cloud-images/heavy-rain.png"),
  "Moderate or heavy freezing rain": require("../../assets/cloud-images/heavy-rain.png"),
  "Moderate or heavy rain shower": require("../../assets/cloud-images/heavy-rain.png"),
  "Moderate or heavy rain with thunder": require("../../assets/cloud-images/heavy-rain.png"),
  other: require("../../assets/cloud-images/moderate-rain.png"),
} as const;
