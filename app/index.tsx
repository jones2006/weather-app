import { fetchWeatherForecast } from "@/api/weather";
import { image } from "@/components/images";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme/colors";
import { WeatherType } from "../types/weather.d";
import { getWeatherImage } from "../utills/weatherIconMapper";

export default function index() {
  const loadWeather = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherForecast("Chennai", 7);
      setWeather(data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadWeather1 = async (city: string) => {
    setLoading(true);
    try {
      const data = await fetchWeatherForecast(city, 7); // 7 = days of forecast
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState(false);

  const [showSearch, togglebtn] = useState(false);

  const [city, setCity] = useState("Chennai");
  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Image source={image.Background} style={styles.img} blurRadius={70} />

      <ScrollView>
        <SafeAreaView>
          {/* Search Bar */}
          <View style={styles.inputview}>
            <TextInput
              placeholder="Search a city"
              placeholderTextColor={"lightgray"}
              style={styles.input}
              value={city}
              onChangeText={setCity}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (showSearch) {
                  loadWeather1(city);
                  togglebtn(false);
                } else {
                  togglebtn(true);
                }
              }}
            >
              <MagnifyingGlassIcon
                size={25}
                color={"white"}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* Weather Content */}
          {loading ? (
            <View
              style={{
                marginTop: 250,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Progress.CircleSnail size={140} color="red" thickness={10} />
            </View>
          ) : (
            <View style={styles.location}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 23,
                    fontWeight: "bold",
                  }}
                >
                  {`${weather?.location?.name} , `}
                </Text>
                <Text
                  style={{
                    color: theme.bgWhite(0.7),
                    fontSize: 20,
                    marginTop: 3,
                  }}
                >
                  {weather?.location?.country}
                </Text>
              </View>

              <View style={styles.viewimg}>
                <Image
                  source={getWeatherImage(
                    weather?.current?.condition?.text || "Unknown City"
                  )}
                  style={styles.tempimg}
                />
              </View>

              <View style={styles.degview}>
                <Text style={styles.degree}>
                  {weather?.current?.temp_c}&#176;C
                </Text>
              </View>

              <View style={styles.otherdetail}>
                <View style={styles.windview}>
                  <Image source={image.wind} style={styles.otherimg} />
                  <Text style={styles.windtxt}>
                    {weather?.current?.wind_kph} km/h
                  </Text>
                </View>
                <View style={styles.dropview}>
                  <Image source={image.drop} style={styles.otherimg} />
                  <Text style={styles.droptxt}>
                    {weather?.current?.humidity}%
                  </Text>
                </View>
                <View style={styles.sunview}>
                  <Image source={image.sun} style={styles.otherimg} />
                  <Text style={styles.suntxt}>
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View>
            {/* Forecast Section */}
            <View style={styles.forecastsection}>
              <View style={styles.forecastview}>
                <CalendarDaysIcon size={24} color={"white"} />
                <Text style={styles.forecasttxt}>Daily Forecast</Text>
              </View>

              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather?.forecast?.forecastday?.map((day, index) => (
                  <View key={index} style={styles.card}>
                    <Image
                      source={{ uri: "https:" + day.day.condition.icon }}
                      style={styles.icon1}
                    />
                    <Text style={styles.day}>
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </Text>
                    <Text style={styles.temp}>{day.day.avgtemp_c}&#176;</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  inputview: {
    width: "95%",
    height: 60,
    backgroundColor: theme.bgWhite(0.3),
    marginTop: 40,
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 50,
  },
  input: {
    color: "white",
    fontSize: 16,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: theme.bgWhite(0.3),
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
  list: {
    alignSelf: "center",
    width: "90%",
    marginTop: 20,
    backgroundColor: theme.bgWhite(1),
    borderRadius: 20,
    paddingVertical: 5,
  },
  listitems: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  location: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  viewimg: {
    alignItems: "center",
    marginTop: 45,
  },
  tempimg: {
    width: 200,
    height: 200,
  },
  degview: {
    marginTop: 25,
  },
  degree: {
    color: "white",
    fontWeight: "bold",
    fontSize: 60,
    textAlign: "center",
  },
  degtext: {
    color: theme.bgWhite(0.7),
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
  },
  otherdetail: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  windview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dropview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sunview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  otherimg: {
    width: 25,
    height: 25,
  },
  windtxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  droptxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  suntxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  forecastsection: {
    marginTop: 30,
  },
  forecastview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 10,
  },
  forecasttxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 96, // w-24 = 24 * 4 = 96
    paddingVertical: 12, // py-3 = 3 * 4
    borderRadius: 24, // rounded-3xl
    marginRight: 16, // mr-4 = 4 * 4
    backgroundColor: theme.bgWhite(0.15),
    marginTop: 20,
  },
  icon1: {
    height: 44,
    width: 44,
    marginBottom: 10,
  },
  day: {
    color: "white",
    fontSize: 14,
  },
  temp: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
