import React, { Component } from 'react'
import { View,Text,TouchableOpacity,StyleSheet,Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase'
require("firebase/firestore")

import {connect} from 'react-redux'



class Submit extends Component {
   
submitform = () =>{
   
    let date = new Date(this.props.date).toDateString();
    
    firebase.firestore().collection('appointments')
    .doc(firebase.auth().currentUser.uid)
    .collection('userappointments')
    .add({
        userid:firebase.auth().currentUser.uid,
        location:this.props.location,
        vaccine:this.props.vaccine,
        nearby:this.props.nearbylocation,
        date: new Date(this.props.date).toDateString(),
        timing:this.props.time,
        status:false,
    }).then((result)=>{   
        
        this.props.navigation.navigate('Successful',{ref_number:result.id,timing:this.props.time});
})



    
    let hosipitaldateref = firebase.firestore().collection('Hospitals').doc(this.props.nearbylocation).collection('dates').doc(date)
    let hospitaltimeref = firebase.firestore().collection('Hospitals').doc(this.props.nearbylocation).collection('dates').doc(date).collection('timings').doc(this.props.time)
    
    hosipitaldateref.get()
    .then((querySnapshot) => {
        if(querySnapshot.exists){
            hosipitaldateref.update({
                datecount:firebase.firestore.FieldValue.increment(1)
            }); 
        }else{
           
            hosipitaldateref.set(
              { datecount:1}
            )
           .then(() => {
            console.log("Document successfully written!")});
            
        }
        
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });



    hospitaltimeref.get()
    .then((querySnapshot) => {
        if(querySnapshot.exists){
            hospitaltimeref.update({
                timecount:firebase.firestore.FieldValue.increment(1)
            }); 
        }else{
           hospitaltimeref.set(
            { timecount:1})
        }
        
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });



  
   
}
   
    render() {
      
        return (
           
           <View style={styles.container}>
                
           
            <LinearGradient  colors={['#000046','#1CB5E0']} 
            start={{x:0,y:0}} 
            end={{x:1,y:0}}  
            style={{flex:0.9,borderBottomLeftRadius:50,borderBottomRightRadius:50,justifyContent:'center'}}>
            <View style={{marginTop:50,justifyContent:'center',height:'60%',width:'100%',alignItems:'center'}}>
            <Image source={require('../assets/checklist.jpg')} style={{resizeMode:'stretch',height:'80%',width:'75%',borderRadius:10}}/>
            
            </View>
            </LinearGradient>
                <View style={{flex:1}}>

                <View style={{flex:0.5,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:19,fontWeight:'bold',fontStyle:'italic'}}>
                    Are you sure you want to book appointment ?
                </Text>
                </View>
                
                <View style={{marginHorizontal:30,justifyContent:'center',alignItems:'center',borderColor:'#1CB5E0',borderWidth:2,borderRadius:20,flex:1.6}}>
                <Text style={{fontSize:18,padding:10}}>Location  : {this.props.location}</Text>
                <Text style={{fontSize:18,padding:10}}>Vaccine  : {this.props.vaccine}</Text>
                <Text style={{fontSize:18,padding:10}}>Nearby center : {this.props.nearbylocation}</Text>
                <Text style={{fontSize:18,padding:10}}>Date  : {new Date(this.props.date).toDateString()}</Text>
                <Text style={{fontSize:18,padding:10}}>Time  :{this.props.time}</Text>
                </View>
                
                <View style={{flex:0.5,justifyContent:'flex-end',marginBottom:5}}>
                <TouchableOpacity  style={{marginHorizontal:10}}
                onPress={()=>this.submitform()}>
                    <LinearGradient  colors={['#000046','#1CB5E0']} 
        start={{x:0,y:1}} 
        end={{x:1.5,y:0}}
        style={{borderRadius:6,padding:20,borderRadius:30,justifyContent:'center',alignItems:'center'}}  >
            <Text style={{fontSize:16,color:'#FFFFFF'}}>CONFIRM APPOINTMENT</Text>
        </LinearGradient>

               
                </TouchableOpacity>
                </View>
                </View>

                
            </View>
        )
    }
}


const mapStateToProps = (store) =>({

    location: store.appointmentState.location,
    vaccine:store.appointmentState.vaccinetype,
    nearbylocation:store.appointmentState.nearbyLocation,
    date: store.appointmentState.date,
    time:store.appointmentState.time


   })

   
export default connect(mapStateToProps,null)(Submit);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff',
    },
  });