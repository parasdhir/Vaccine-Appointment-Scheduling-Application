import React, { Component } from 'react'
import {Text, View, StyleSheet, Button,Image} from 'react-native'
import * as Font from 'expo-font';
import { Form,Item,Input, Label} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends Component {

    

  async componentDidMount()
  {
      await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          
        });
  }
  
  state={
      email:'',
      password:'',
      errortype:''
  }
  
  onSignIn = () => {
      
      const {email,password} = this.state;
      if(email && password){
      firebase.auth().signInWithEmailAndPassword(email,password)
      
      .catch((error) =>{
       
        if(error.code === 'auth/invalid-email'){
          this.setState({errortype:'Invalid email entered'})
        }else if (error.code === 'auth/user-not-found'){
          this.setState({errortype:'User doesn\'t exist'})
        }else if (error.code === 'auth/wrong-password'){
          this.setState({errortype:'Invalid Email or Password'})}
        else if (error.code === 'auth/too-many-requests'){
            this.setState({errortype:'Too many request wait for a while'})}

      })}else{
        this.setState({errortype:'both fields are required'})
      }
  }



  render() {
    return (
     <View   style={styles.container}>
       <View style={{position:'absolute',top:0,left:0,right:0,height:'30%'}}>
        <View><Image source={require('../assets/banner1.png')} resizeMode='stretch' style={{height:150,width:'100%'}}/></View>
       
        <View style={{marginHorizontal:30}}>
        <Text style={{fontSize:40}}>Hello there,</Text>
         <Text style={{fontSize:40}}>Welcome</Text>
         
       </View>

       </View>

       
       {/* email and sign up */}
        <View style={{position:'absolute',top:300,left:0,right:0,height:'50%'}}>
        
          <View style={{marginHorizontal:30}}>
           
          <Form>
            <Item  inlineLabel last>
              <Label>Email</Label>
              <Input autoCapitalize='none' onChangeText={(email)=>{this.setState({email})}}/>
            </Item>
            <Item  inlineLabel last>
              <Label>Password</Label>
              <Input autoCapitalize='none' secureTextEntry={true}  onChangeText={(password)=>{this.setState({password})}} />
            </Item>
            </Form>

              <Text style={{marginTop:10,color:'red'}}> {this.state.errortype}</Text>
          </View>

           
          <View style={{alignItems:'center',margin:5}}>
           
            <View style={{marginVertical:50,alignItems:'center'}}>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Forget')}>
            <Text style={{textDecorationLine:'underline'}} >Forgot Your Password ?</Text> 

            </TouchableOpacity>
         
            </View>
           
             <TouchableOpacity style={{height:60,width:150}} onPress={()=>this.onSignIn()}>
               <LinearGradient
                style={{height:'100%',width:'100%',borderRadius:15,justifyContent:'center',alignItems:'center'}}
                colors={['#1F355D','#23899F']}
                start={{x:0,y:0}}
                end={{x:1,y:0}}
               >
                  <Text style={{fontSize:20,color:'white'}}>Sign In</Text>
               </LinearGradient>
                
               </TouchableOpacity> 
               
          </View>




        </View>

                 
    
      <View style={{position:'absolute',top:700,left:0,right:0,height:'20%'}}>
        
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',paddingTop:50}}>
        <Text>New here ? </Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}><Text style={{textDecorationLine:'underline'}}>Sign up instead</Text></TouchableOpacity>

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