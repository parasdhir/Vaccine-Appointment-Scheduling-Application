import React, { Component } from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import { Form,Item,Input, Label} from 'native-base';
import * as firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';

export default class Forget extends Component {
    
    
    state={
        message:'',
        email:''
    }
    
    
    
    onSubmit = () => {
        const {email} = this.state;
        
                firebase.auth().sendPasswordResetEmail(email).then(()=> {
                 // Email sent.
                this.setState({message:'Email sent successfully'})
                }).catch((error) =>{
                 
                  if(error.code  === 'auth/user-not-found'){
                    this.setState({message:'Email  doesn\'t exist in our system'})
                  }else if(error.code === 'auth/invalid-email'){
                    this.setState({message:'Invalid Email'})
                  }else{
                    this.setState({message:error.message})
                  }
               
                });
    
    }
    
    
      render() {
        return (
         <View   style={styles.container}>
           <View style={{position:'absolute',top:0,left:0,right:0,height:'30%'}}>
            <View><Image source={require('../assets/banner1.png')} resizeMode='stretch' style={{height:150,width:'100%'}}/></View>
           
            <View style={{marginHorizontal:30}}>
            <Text style={{fontSize:40}}>Forgot Password</Text>
             
             
           </View>
    
           </View>
    
           
           {/* email and sign up */}
            <View style={{position:'absolute',top:250,left:0,right:0,height:'50%'}}>
            
              <View style={{marginHorizontal:30}}>
               <Text style={{marginBottom:20}}>please enter your registered email address.An email notification will then be sent to reset the password</Text>
              <Form>
                <Item inlineLabel last>
                  <Label>Email</Label>
                  <Input autoCapitalize='none' onChangeText={(email)=>{this.setState({email})}}/>
                </Item>
                </Form>
    
                 
              </View>
    
               
              <View style={{alignItems:'center',marginVertical:60}}>
               
                
               
                 <TouchableOpacity style={{height:60,width:150}} onPress={()=>this.onSubmit()}>
                   <LinearGradient
                    style={{height:'100%',width:'100%',borderRadius:15,justifyContent:'center',alignItems:'center'}}
                    colors={['#1F355D','#23899F']}
                    start={{x:0,y:0}}
                    end={{x:1,y:0}}
                   >
                      <Text style={{fontSize:20,color:'white'}}>Submit</Text>
                   </LinearGradient>
                    
                   </TouchableOpacity> 

                   
              </View>

              <View style={{alignItems:'center',marginHorizontal:20}}>
                  <Text style={{color:this.state.message === 'Email sent successfully'?'green':'red'}}>{this.state.message}</Text>
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