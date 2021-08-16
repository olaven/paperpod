import React from "react";

import { Button, TextInput, View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 20,
    padding: 10,
    margin: 10,
  },
});

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="email"
        textContentType="emailAddress"
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="password"
        textContentType="password"
        onChangeText={setPassword}
      ></TextInput>

      <Text>
        {email} - {password}
      </Text>
      <Button
        title={"Log in"}
        onPress={() => {
          console.log("Clicked");
        }}
      ></Button>
    </View>
  );
};
