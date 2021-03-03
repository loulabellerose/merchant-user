import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ApplicationForm from "../screens/ApplicationForm";
import StatusScreen from "../screens/StatusScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ApplicationForm" component={ApplicationForm} />
      <Stack.Screen name="StatusScreen" component={StatusScreen} />
    </Stack.Navigator>
  );
}

export { StackNavigator };