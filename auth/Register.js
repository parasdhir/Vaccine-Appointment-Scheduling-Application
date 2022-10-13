import React, { Component,useState } from 'react'
import {Text, View, StyleSheet, TouchableOpacity,Image,Platform,Button} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Form,Item,Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import * as firebase from 'firebase'




function getdob(dob) {
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff); 
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
    
  return age
}




export default class Register extends Component {
  
  state ={
    date: null,
    show:false,
    name:'',
    
    email:'',
    password:'',
    confirmpassword:'',
    errortype:''
}


  setDate =(date)=>{
    this.setState({date})
  }
  
  setShow =(show)=>{
   
    this.setState({show})
  }
  


  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    
    this.setShow(Platform.OS === 'ios');
    this.setDate(currentDate);   };

  showDatepicker = () => {
    this.setShow(true);};

    CheckPassword=() =>{ 
        var decimal= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
       
        if(this.state.password.match(decimal)) 
        { 
        return true;
        }
        else
        { 
        return false;
        }
        } 


onSignUp = () => {
  const {email,password,name,date,confirmpassword} = this.state;
   let age =0 
  if(date){
    age = getdob(date)
   }
    if (!name || !email || !password || !confirmpassword || !date){
        this.setState({errortype:'All fields are required'})
    }else if(confirmpassword !== password){
      this.setState({errortype:'Password and confirm password does not match'})
     }
     else if(age < 17){
      this.setState({errortype:'Age should not be less than 17'})
    }else if (!this.CheckPassword()){
     
      this.setState({errortype:'password must be between 8 to 15 characters and contain at least one numeric digit and a special character'})
    }
    else{

          firebase.auth().createUserWithEmailAndPassword(email,password)
          .then((results) => {
              firebase.firestore().collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                  name,
                  email,
                  dob:moment(date).format('MM/DD/YYYY'),
              })}

              )
          .catch((error) =>{
            console.log(error.code)
            if(error.code === 'auth/invalid-email'){
            this.setState({errortype:'Email not Valid'})
            }else if(error.code === 'auth/weak-password'){
            this.setState({errortype:'Password is too weak'})
            }
            else if(error.code === 'auth/email-already-in-use'){
              this.setState({errortype:'This email is already Registered'})
              }
            else{
              this.setState({errortype:error.code})
            }
          
          
          }) 
        
  }

}


  render() {
    return (
     <View   style={styles.container}>
       <View style={{position:'absolute',top:0,left:0,right:0,height:'30%'}}>
        <View><Image source={require('../assets/banner1.png')} resizeMode='stretch' style={{height:150,width:'100%'}}/></View>
       
        <View style={{marginHorizontal:30}}>
         <Text style={{fontSize:40}}>Get on Board</Text>
         
       </View>

       </View>

       
       {/* email and sign up */}
        <View style={{position:'absolute',top:250,left:0,right:0,height:'50%'}}>
        
          <View style={{marginHorizontal:30}}>
            {/* date picker */}
            {this.state.show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />)}

          <Form>
            <Item  inlineLabel last>
              <Label>Full Name</Label>
              <Input onChangeText={(name)=>{this.setState({name})}}/>
            </Item>

            <Item  inlineLabel last>
              <Label>DOB</Label>
              <Input disabled={true} value={this.state.date ?(moment(this.state.date).format('DD/MM/YYYY')):null}/>
            <TouchableOpacity 
            onPress={()=>this.showDatepicker()}
            style={{backgroundColor:'#1CB5E0'
            ,height:40,justifyContent:'center',
            width:70,alignItems:"center",borderRadius:4}}>
              <Icon name="calendar" color='#FFFFFF' size={20} />
              </TouchableOpacity>
            </Item>
           
            <Item  inlineLabel last>
              <Label>Email</Label>
              <Input autoCapitalize='none' onChangeText={(email)=>{this.setState({email})}}/>
            </Item>
           
        
            <Item  inlineLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true}  onChangeText={(password)=>{this.setState({password})}} />
            </Item>

            <Item  inlineLabel last>
              <Label>Confirm Password</Label>
              <Input secureTextEntry={true}  onChangeText={(confirmpassword)=>{this.setState({confirmpassword})}} />
            </Item>
            </Form>
            
              <Text style={{marginTop:10,color:'red'}}> {this.state.errortype}</Text>
          </View>

           {/* terms and conditions note */}
          <View style={{alignItems:'center',margin:5}}>
           
            <View style={{marginVertical:20,alignItems:'center'}}>

            <Text>By creating an account. you agree to the</Text>
            <Text><Text style={{textDecorationLine:'underline'}}>Terms and Use</Text> and <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text></Text>

            </View>
           
             <TouchableOpacity style={{height:60,width:150}} onPress={()=>this.onSignUp()}>
               <LinearGradient
                style={{height:'100%',width:'100%',borderRadius:15,justifyContent:'center',alignItems:'center'}}
                colors={['#1F355D','#23899F']}
                start={{x:0,y:0}}
                end={{x:1,y:0}}
               >
                  <Text style={{fontSize:20,color:'white'}}>Sign Up</Text>
               </LinearGradient>
                
               </TouchableOpacity> 
               
          </View>




        </View>

                 
              {/* navigation to login page */}
      <View style={{position:'absolute',top:700,left:0,right:0,height:'20%'}}>
        
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',paddingTop:50}}>
        
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} ><Text style={{textDecorationLine:'underline'}}>I am already a member</Text></TouchableOpacity>

        </View>
        
        </View>
         

     </View>
    )
  }
}


const styles = StyleSheet.create({
  
  container: {
   
    flex: 1,
    
    
  },
});