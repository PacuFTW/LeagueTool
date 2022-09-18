import * as React from 'react';
import { View, Button, Touchable, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChampionHome } from './ChampionScreen/ChampionHome';
import SummonerDetails from './SummonerScreen/SummonerDetails';
import { ChampionDetails } from './ChampionScreen/ChampionDetails';
import { SummonerHome } from './SummonerScreen/SummonerHome';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', width: '70%', alignSelf: 'center' }}>
      <TouchableOpacity style={{ borderRadius: 10, height: '15%', justifyContent: 'center', backgroundColor: '#6E908B', marginBottom: 40, elevation:8 }} onPress={() => navigation.navigate('Champions')} title="Champions">
          <Text style={{ fontSize:30, textAlign: 'center', color:'#fff', fontWeight:'bold' }}>
            Champions
          </Text>  
        </TouchableOpacity>
        <TouchableOpacity style={{ borderRadius: 10, height: '15%', justifyContent: 'center', backgroundColor: '#6E908B', elevation:8 }} onPress={() => navigation.navigate('Summoners')} title="Summoners">
          <Text style={{ fontSize:30, textAlign: 'center', color:'#fff', fontWeight:'bold' }}>
            Summoners
          </Text> 
        </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        contentStyle: {
          backgroundColor: '#647A8D'
        },
        headerStyle: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
        headerTransparent: true,
        headerTintColor: "#FFF"
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Champions" component={ChampionHome} />
        <Stack.Screen name="Summoners" component={SummonerHome} />
        <Stack.Screen name="Champion Details" component={ChampionDetails} />
        <Stack.Screen name="Summoner Details" component={SummonerDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};