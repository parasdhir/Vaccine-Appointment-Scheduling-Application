
import {USER_LOCATION,USER_VACCINE_TYPE,USER_NEARBY_LOCATION,USER_AP_DATE,USER_AP_TIME,ALL_LOCATIONS,ALL_NEARBY_LOCATIONS,
    ALL_VACCINES,
    ALL_APPOINTMENTS,
    USERINFO
    ,GETALLDATESETTINGS
} from '../constants'

import firebase from 'firebase'
require("firebase/firestore")

export function setUserLocation(location){
    
    return ((dispatch)=>{
        dispatch({type:USER_LOCATION,location})
    })
}

export function setUserVaccineType(vaccinetype){
    
    return ((dispatch)=>{
        dispatch({type:USER_VACCINE_TYPE,vaccinetype})
    })
}


export function setUserNearbyLocation(nearbyLocation){
    
    return ((dispatch)=>{
        dispatch({type:USER_NEARBY_LOCATION,nearbyLocation})
    })
}


export function setUserDate(date){
    
    return ((dispatch)=>{
        dispatch({type:USER_AP_DATE,date})
    })
}

export function setUserTime(time){
    
    return ((dispatch)=>{
        dispatch({type:USER_AP_TIME,time})
    })
}


// user page

// get all location

export function GetAllLocations(){
    
    return ((dispatch)=>{
    firebase.firestore().collection('locations').get()
    .then((querySnapshot) => {
        let all_location = querySnapshot.docs.map(doc => {
            return {name:doc.id }
        })
        dispatch({type:ALL_LOCATIONS,all_location})
            // doc.data() is never undefined for query doc snapshots; 
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
  
    })
}

export function GetAllNearbyLocations(city){
    
    return ((dispatch)=>{
    firebase.firestore().collection('locations').doc(city).collection('nearby').get()
    .then((querySnapshot) => {
        let all_nearby_location = querySnapshot.docs.map(doc => {
            return {id:doc.id,
                nearbylocation:doc.data().nearbylocation
            }
        })
       
        dispatch({type:ALL_NEARBY_LOCATIONS,all_nearby_location})
            // doc.data() is never undefined for query doc snapshots; 
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
  
    })
}



 
export function GetAllVaccines(){
    
    return ((dispatch)=>{
    firebase.firestore().collection('vaccinetype').get()
    .then((querySnapshot) => {
        let all_vaccines = querySnapshot.docs.map(doc => {
            return {id:doc.id,...doc.data()
            }
        })
        
        dispatch({type:ALL_VACCINES,all_vaccines})
            // doc.data() is never undefined for query doc snapshots; 
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
  
    })
}

 



export function GetAllAppointments(){
    
    return ((dispatch)=>{
        firebase.firestore().collection('appointments')
        .doc(firebase.auth().currentUser.uid)
        .collection('userappointments').orderBy('date','asc')
        .get()
    .then((querySnapshot) => {
        let all_appointments = querySnapshot.docs.map(doc => {
            return {id:doc.id,
            date:doc.data().date,
            location:doc.data().location,
            nearby:doc.data().nearby,
            vaccine:doc.data().vaccine,
            timing:doc.data().timing,
            status:doc.data().status,
            }
        })
        
        
        dispatch({type:ALL_APPOINTMENTS,all_appointments})
            // doc.data() is never undefined for query doc snapshots; 
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
  
    })
}



 
export function Userdata(){
    
    return ((dispatch)=>{
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
        
        let userinfo ={
            name:querySnapshot.data().name,
            dob:querySnapshot.data().dob
        }
    
        
       dispatch({type:USERINFO,userinfo})
            
        })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
  
    })
}


export function getAllDateSettings(){
    
    return ((dispatch)=>{

    firebase.firestore().collection('Settings').doc('datepagesettings').get()
    .then((result)=>{
        
        dispatch({type:GETALLDATESETTINGS,alldatesettings:result.data()})
        
    }
        )

   
    
    })



}