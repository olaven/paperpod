import React from "react";

import { Button, TextInput, View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  input: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
});

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View>
      <TextInput
        value={email}
        placeholder="email"
        textContentType="emailAddress"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="password"
        textContentType="password"
        onChangeText={setPassword}
        style={styles.input}
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
