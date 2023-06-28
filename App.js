import { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { initDB } from './utils/database';
import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        initDB();
        setDbInitialized(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, dbInitialized]);

  if (!appIsReady || !dbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer onReady={onLayoutRootView}>
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
              title: 'My Places',
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
          <Stack.Screen
            name="Map"
            component={Map}
            options={{ title: 'Pick your location' }}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{ title: 'Loading Place...' }}
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
