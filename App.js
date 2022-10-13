import { StatusBar } from 'expo-status-bar';

// basic imports
import React from 'react';
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase'

import * as Font from 'expo-font';
import { BerkshireSwash_400Regular } from '@expo-google-fonts/berkshire-swash'


import {MenuProvider} from 'react-native-popup-menu';


// redux imports
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'


// redux store

const store = createStore(rootReducer,applyMiddleware(thunk))

// screens
import RegisterScreen from './auth/Register'
import LoginScreen from './auth/Login'
import Forget from './auth/Forget'

import MainScreen from './main/Main'
import LocationScreen from './main/Location'
import ViewAppointmentScreen from './main/ViewAppointment'
import VaccineTypeScreen from './main/VaccineType'
import NearbyLocationsScreen from './main/NearbyLocations'
import DatepickerScreen from './main/DatePicker'
import SubmitScreen from './main/Submit'
import SucessfulScreen from './main/Successful'
import AppointmentdataScreen from './main/Appointmentdata'
import Menucomp from './main/Menucomp'
import Guidelines from './main/Guidelines'
import Faqs from './main/Faqs'
import Userprofile from './main/Userprofile'
import Vaccinedetails from './main/Vaccinedetails'


const Stack = createStackNavigator();


var firebaseConfig = {
  /* Add your Firbase Api Key here  */
};

if (firebase.apps.length === 0)
{
  firebase.initializeApp(firebaseConfig);
}



export default class App extends React.Component {
  
  state = {
    loaded:false,
    loggedIn:false
  }
  
  async loadFonts() {
    await Font.loadAsync({
      BerkshireSwash_400Regular: BerkshireSwash_400Regular
    })
  }

  
  
  componentDidMount(){

    this.loadFonts();
    
    firebase.auth().onAuthStateChanged((user)=>{
      
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true,})
      }else{
        this.setState({
          loggedIn:true,
          loaded:true,})
        }  
    
    })
  }



 


  render(){

    if (!this.state.loaded) //false run and when true it will not
    {
      return( 
      <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator size='large' color='#a84232'/>
      </View>)
    }


    if(!this.state.loggedIn)
    {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Register" component={RegisterScreen}  />
            <Stack.Screen name="Login" component={LoginScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Forget" component={Forget}  />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" 
           
          screenOptions={({ navigation,route }) =>({headerTitle: () =>{
          
          switch(route.name){
            case "Home":
              return(
                <Text style={{fontSize:24,padding:10,fontFamily:'BerkshireSwash_400Regular'}}>Vaccigen</Text>
              )
              default: return ( <Text style={{color:'white',fontSize:24,padding:10,fontFamily:'BerkshireSwash_400Regular'}}>Vaccigen</Text>)
          }}
            
          
          ,
            headerTransparent:'true',
          headerLeft:null,
            headerRight:() => <Menucomp routename={route.name} navigation={navigation} /> 
          })}
        >
          <Stack.Screen name="Home" component={MainScreen}  navigation={this.props.navigation}/>
          <Stack.Screen name="Location" component={LocationScreen}   navigation={this.props.navigation}/>
          <Stack.Screen name="View Appointments" component={ViewAppointmentScreen}  navigation={this.props.navigation}  />
          <Stack.Screen name="Appointment Data" component={AppointmentdataScreen}  navigation={this.props.navigation}  />
          <Stack.Screen name="VaccineType" component={VaccineTypeScreen}   navigation={this.props.navigation} />
          <Stack.Screen name='NearbyLocations' component= {NearbyLocationsScreen}  navigation={this.props.navigation}/>
          <Stack.Screen name='Appointment Date' component={DatepickerScreen} navigation={this.props.navigation} />
          <Stack.Screen name='Confirmation' component={SubmitScreen} navigation={this.props.navigation} />
          <Stack.Screen name='Successful' component={SucessfulScreen} navigation={this.props.navigation} options={{headerShown: false}}  />
          <Stack.Screen name='guidelines' component={Guidelines} />
          <Stack.Screen name='Faqs' component={Faqs} />
          <Stack.Screen name='Userprofile' component={Userprofile} />
          <Stack.Screen name='VaccineDetails' component={Vaccinedetails}/>
          
        </Stack.Navigator>
      </NavigationContainer>
      </MenuProvider>
      </Provider>
    );




  }
 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
  },
});