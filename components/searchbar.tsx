import { image } from "@/components/images";
import React, { useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme/colors";

export default function SearchBar() {
  const [showSearch, togglebtn] = useState(false);
  return (
    <View style={Styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      <Image source={image.Background} style={Styles.img} blurRadius={80} />
      <SafeAreaView>
          <View
            style={[
              Styles.inputview,
              {
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
                borderRadius: showSearch ? 50 : 80,
              },
            ]}
          >
            {showSearch && (
              <TextInput
                placeholder="Search a city"
                placeholderTextColor={"lightgray"}
                style={[Styles.input]}
              />
            )}

            <TouchableOpacity
              style={Styles.btn}
              onPress={() => togglebtn(!showSearch)}
            >
              <MagnifyingGlassIcon
                size={25}
                color={"white"}
                style={Styles.icon}
              />
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  img: {
    width: "100%",
    height: "100%",
    zIndex: -3,
  },
  inputview: {
    width: "95%",
    height: "7%",
    backgroundColor: theme.bgWhite(0.3),
    marginTop: 20,
    alignSelf: "center",
  },
  input: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 20,
    color: "white",
  },
  btn: {
    width: "15%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: theme.bgWhite(0.3),
    position: "absolute",
    left: "85%",
  },
  icon: {
    marginTop: 15,
    marginLeft: 18,
  },
});
