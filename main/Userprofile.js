import React, { Component } from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Form,Item,Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import firebase from 'firebase'
require("firebase/firestore")





function getdob(dob) {
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff); 
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
    
  return age
}



export default class Userprofile extends Component {
    
    state={
       
       userdata:{},
        name:'',
        email:'',
        date:'',
        namemessage:'',
        emailmessage:'',
        datemessage:'',
        
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
  this.setDate(currentDate);
};

 showDatepicker = () => {
  this.setShow(true);
};




    componentDidMount(){
    
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
        
        this.setState({userdata:querySnapshot.data(),date:querySnapshot.data().dob})
    })
    }


    submitUpdate =()=>{
      const {email,name,date} = this.state;
      
      let ref =  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
      
      if(name != this.state.userdata.name && name != ''){
        
        ref.update({
          name: name
      })
        .then(() => {
          this.setState({namemessage:'Name update Successful'})
      })
      .catch((error) => {
         
        this.setState({namemessage:'Cannot update Name'})
      });
      }

      
      if(email != this.state.userdata.email && email != ''){
        var user = firebase.auth().currentUser;

        user.updateEmail(email).
        then(()=> {
          ref.update({
            email: email
        }).then(() => {
          this.setState({emailmessage:'Email update Successful'})

        }).catch((error)=>{
          this.setState({emailmessage:'error occured'})
        })

        
        
          
        }).catch((error) =>{
            
          if(error.code === 'auth/requires-recent-login'){
              this.setState({emailmessage:'Relogin required'})
            }else{
              this.setState({emailmessage:'Cannot update Email'})
            }
            
        });

      }


      
      if(new Date(date).getTime() != new Date(this.state.userdata.dob).getTime())
      {
        if(getdob(date) < 17){
          this.setState({datemessage:'Age should not be less than 17'})
        }else{

        ref.update({
          dob:moment(date).format('MM/DD/YYYY')
      })
        .then(() => {
          this.setState({datemessage:'DOB update Successful'})
      })
      .catch((error) => {
          // The document probably doesn't exist.
          this.setState({datemessage:'cannot update DOB'})
      });

    }
      }


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
                        <View style={{flex:1}}>
                           <View style={{marginVertical:30,alignItems:'center'}}>
                            <Text style={{fontSize:34,fontWeight:'bold'}}>
                            USER PROFILE
                            </Text>   
                            </View> 
            <View style={{marginHorizontal:30}}>

            {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(this.state.date)}
          mode={this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
      )}

            <Form>
            <Item  inlineLabel last>
              <Label>Name</Label>
              <Input autoCapitalize='none' onChangeText={(name)=>{this.setState({name})}} defaultValue={this.state.userdata.name} />
            </Item>
            <Item  inlineLabel last>
              <Label>Email</Label>
              <Input autoCapitalize='none' onChangeText={(email)=>{this.setState({email})}} defaultValue={this.state.userdata.email} />
            </Item>
            <Item  inlineLabel last>
              <Label>DOB</Label>
              <Input autoCapitalize='none' value ={this.state.date ?moment(new Date(this.state.date)).format('DD/MM/YYYY'):null}/>
              <TouchableOpacity 
            onPress={()=>this.showDatepicker()}
            style={{backgroundColor:'#1CB5E0'
            ,height:40,justifyContent:'center',
            width:70,alignItems:"center",borderRadius:4}}>
              <Icon name="calendar" color='#FFFFFF' size={20} />
              </TouchableOpacity>
            </Item>
            </Form>

            </View>


            <View style={{marginTop:80,alignItems:'center'}}>
            <TouchableOpacity 
            onPress={()=>this.submitUpdate()}
            style={{height:60,width:150}} >
               <LinearGradient
                style={{height:'100%',width:'100%',
                borderRadius:15,justifyContent:'center',alignItems:'center'}}
                colors={['#1F355D','#23899F']}
                start={{x:0,y:0}}
                end={{x:1,y:0}}
               >
                  <Text style={{fontSize:20,color:'white'}}>Update</Text>
               </LinearGradient>
                
               </TouchableOpacity> 
                </View>

                <View style={{marginTop:20,alignItems:'center'}}>
                  <Text style={{color:(this.state.namemessage === 'Name update Successful')?'green':'red'}}>
                    {this.state.namemessage}
                  </Text>
                  <Text style={{color:(this.state.emailmessage === 'Email update Successful')?'green':'red'}}>
                    {this.state.emailmessage}
                    </Text>
                    <Text style={{color:(this.state.datemessage === 'DOB update Successful')?'green':'red'}}>
                    {this.state.datemessage}
                    </Text>
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
    }
}
    );
