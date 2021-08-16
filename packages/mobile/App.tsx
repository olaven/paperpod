import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Login } from "./src/Login/Login";

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 50,
  },
});

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Image
            style={styles.logo}
            //FIXME: cannot show SVG https://stackoverflow.com/questions/38830568/how-to-show-svg-file-on-react-native
            source={{ uri: "https://paperpod.fm/logo.svg" }}
          ></Image>
          <Login />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
