import React from 'react'
import {View,Text} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import firebase from 'firebase'
import {GetAllLocations,GetAllVaccines,GetAllAppointments,Userdata} from '../redux/actions/index'
import {
    MenuProvider ,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  import Icon from 'react-native-vector-icons/Entypo';
  import Icon1 from 'react-native-vector-icons/AntDesign';

 

class Menucomp extends React.Component {
    
    
  userLogout = ()=>{
    firebase.auth().signOut();
}
  
    ViewAppointments = () => {
        this.props.GetAllAppointments();
        this.props.Userdata();
        this.props.navigation.navigate('View Appointments')
    }

    
    render(){
    return (
        <View style={{marginRight:20}}>
        <Menu >
        <MenuTrigger>
          { 
          (this.props.routename == 'Home' )?
            (<Text><Icon name="dots-three-vertical" size={16} /></Text>):
            (<Text><Icon name="dots-three-vertical" size={16} color={'white'} /></Text>)
            }
          
       
        </MenuTrigger>
                
                <MenuOptions >
                <MenuOption onSelect={() => this.props.navigation.navigate('Userprofile')}>
                    <Text style={{padding:10,fontSize:18 }}>Profile</Text>
                  </MenuOption >
                <MenuOption onSelect={()=> this.ViewAppointments()} >
                    <Text style={{paddingLeft:10,paddingRight:10,paddingBottom:10,fontSize:18 }}>View Appointment</Text>
                  </MenuOption >
                  
                  <MenuOption onSelect={() =>this.userLogout()}>
                    <Text style={{ paddingLeft:10,paddingRight:10,paddingBottom:10,color: 'red',fontSize:18 }}>
                    <Icon1 name="logout" size={16} /> Logout
                      </Text>
                  </MenuOption >
                  
                </MenuOptions>
                </Menu>
                </View>
    )
    }
}

const mapDispatchProps = (dispatch) => bindActionCreators({GetAllLocations,GetAllVaccines,GetAllAppointments,Userdata},dispatch)
   
  export default connect(null,mapDispatchProps)(Menucomp);