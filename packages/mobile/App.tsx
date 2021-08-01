import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hello updated</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
