import React, { Component } from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {GetAllAppointments} from '../redux/actions/index'

import firebase from 'firebase'
require("firebase/firestore")



function getdob(dob) {
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff); 
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
    
  return age
}



 class Appointmentdata extends Component {



    deleteappointment =()=>{
      // deleting from userappointments
      firebase.firestore().collection('appointments')
    .doc(firebase.auth().currentUser.uid)
    .collection('userappointments')
    .doc(this.props.route.params.data.id)
    .delete()
    .then(() => {
        this.props.GetAllAppointments();
        console.log("Document successfully deleted!");

    }).catch((error) => {
        console.error("Error removing document: ", error);
    });



    // deleting from hospitals collection data
    let hosipitaldateref = firebase.firestore().collection('Hospitals').doc(this.props.route.params.data.nearby).collection('dates').doc(this.props.route.params.data.date)
    let hospitaltimeref = firebase.firestore().collection('Hospitals').doc(this.props.route.params.data.nearby).collection('dates').doc(this.props.route.params.data.date).collection('timings').doc(this.props.route.params.data.timing)
    
    hosipitaldateref.get()
    .then((querySnapshot) => {
     
        if(querySnapshot.exists){
            hosipitaldateref.update({
                datecount:firebase.firestore.FieldValue.increment(-1)
            }); 
        }
        
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });



    hospitaltimeref.get()
    .then((querySnapshot) => {
       
        if(querySnapshot.exists){
            hospitaltimeref.update({
                timecount:firebase.firestore.FieldValue.increment(-1)
            }); 
        }
        
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });

    this.props.navigation.goBack()

    }


    deletealert =()=>{
        Alert.alert(
            "Delete Confirmation",
            "Are you sure you want to delete the appointment",
            [
              {
                text: "Cancel",
               
                style: "cancel"
              },
              { text: "Delete", onPress: () => this.deleteappointment() }
            ]
          );
    }
    

    render() {
    
        return (
            <View style={styles.container}>
                 <View style={{height:'13%',backgroundColor:'red'}}>
               <LinearGradient  colors={['#000046','#1CB5E0']} 
               start={{x:0,y:0}} 
               end={{x:1,y:0}}  
               style={{flex:1,}}>
            </LinearGradient>
              </View>
                <View style={{marginHorizontal:20,marginTop:10}}>
                <View style={{alignItems:'center',padding:10,borderRadius:20}} >
                <Text style={styles.fontcontainer}>Name: {this.props.userinfo.name}</Text>
                <Text style={styles.fontcontainer}>Age: {getdob(new Date(this.props.userinfo.dob))}</Text>
                </View>

                  <View style={{alignItems:'center',margin:10}}>
                 {this.props.route.params.data.status ? 
                 (<Text style={{fontSize:20,color:'green'}}>Status : Administered</Text>):
                 (<Text style={{fontSize:20,color:'grey'}}>Status : Pending</Text>)}
                  </View>
                
                <View style={styles.backcontainer}>
                <View style={styles.subcontainer}>
                <Text style={styles.fontcontainer}>REFERENCE NUMBER</Text>
                <Text style={styles.fontcontainer}>{this.props.route.params.data.id}</Text>
                </View>

                <View style={styles.subcontainer}>
                <Text style={styles.fontcontainer}>DATE</Text>
                <Text style={styles.fontcontainer}>{this.props.route.params.data.date}</Text>
                </View>

                <View style={styles.subcontainer}>
                <Text style={styles.fontcontainer}>CITY</Text>
                <Text style={styles.fontcontainer}>{this.props.route.params.data.location}</Text>
                </View>

                <View style={styles.subcontainer}>
                <Text style={styles.fontcontainer}>VACCINATION CENTER</Text>
                <Text style={styles.fontcontainer}>{this.props.route.params.data.nearby}</Text>
                </View>

                <View style={styles.subcontainer}>
                <Text style={styles.fontcontainer}>VACCINE NAME</Text>
                <Text style={styles.fontcontainer}>{this.props.route.params.data.vaccine}</Text>
                </View>

                <View style={styles.subcontainer}>
                <Text style={styles.fontcontainer}>VACCINATION TIMING</Text>
                <Text style={styles.fontcontainer}>{this.props.route.params.data.timing}</Text>
                </View>

               </View>

                <View style={{padding:70}}>
                <TouchableOpacity onPress={()=>this.deletealert()}  style={{justifyContent:'center',alignItems:'center',backgroundColor: '#ed7874',padding:20,borderRadius:30}}
                 >
                <Text style={{fontSize:18,color:'#FFFFFF'}}>Delete</Text>
                 </TouchableOpacity>
                 </View>
                 </View>
            </View>
            )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff'
    },
    backcontainer:{
      borderRadius:20,
      borderWidth:5,
      borderColor:'#1CB5E0'
    },
    subcontainer:{
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    },
    fontcontainer:{
        fontSize:18
    }

  });


  const mapStateToProps = (store) =>({
    userinfo: store.userState.userinfo
})

const mapDispatchProps = (dispatch) => bindActionCreators({GetAllAppointments},dispatch)


export default connect(mapStateToProps,mapDispatchProps)(Appointmentdata);