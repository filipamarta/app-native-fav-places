import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AllPlaces"
          screenOptions={{
            headerTintColor: Colors.secondary,
            headerStyle: { backgroundColor: Colors.primary },
            contentStyle: { backgroundColor: Colors.secondary },
            //headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 16,
            },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your <3 places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  iconColor={tintColor}
                  iconName="ios-add-circle"
                  iconSize={28}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: 'Add a new place' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
