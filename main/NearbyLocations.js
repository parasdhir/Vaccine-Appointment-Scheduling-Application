import React, { Component } from 'react'
import {View,Text,FlatList,TouchableOpacity,Image,StyleSheet} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {setUserNearbyLocation} from '../redux/actions/index'



class NearbyLocations extends Component {
    
    
    
    
    
    
    onNearBylocationSelect=(nearby)=>{
        this.props.setUserNearbyLocation(nearby)
        this.props.navigation.navigate('Appointment Date')
    }
    render() {
       
        return (
            <View style={styles.container}>
        <LinearGradient  colors={['#000046','#1CB5E0']} 
        start={{x:0,y:0}} 
        end={{x:1,y:0}}  
        style={{flex:0.9,borderBottomLeftRadius:50,borderBottomRightRadius:50,justifyContent:'center'}}>
        <View style={{marginTop:50,justifyContent:'center',height:'60%',width:'100%',alignItems:'center'}}>
        <Image source={require('../assets/locimage.jpg')} style={{resizeMode:'stretch',height:'80%',width:'75%',borderRadius:10}}/>
        
        </View>

        </LinearGradient>
        <View  style={{flex:1}}>
            <View style={{alignItems:'center'}}>
            <Text style={{marginTop:20,fontSize:19,fontWeight:'bold',fontStyle:'italic'}}>
            Select your Nearby Center
            </Text> 

            </View>
        
                <View style={{flex:1,marginTop:10,marginHorizontal:20}}>

                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={this.props.all_nearby_location}
                    renderItem={
                        ({item})=>(
                            <TouchableOpacity style= {{borderColor:'lightgrey',margin:8,borderWidth:2}} onPress={()=>this.onNearBylocationSelect(item.nearbylocation)}>
                               <View style={{flexDirection:'row',padding:15}}>
                                   <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                   <Icon name="location-pin" size={20} /> 
                                   </View>
                                   
                                   <View style={{flex:8,alignItems:'flex-start'}}>
                                   <Text style={{fontSize:17}} >{item.nearbylocation}</Text>
                                   </View>
                                   <View style={{flex:1,alignItems:'flex-end'}}>
                                   <IconAnt name="right" size={20} /> 
                                   </View>

                               </View>
                                
                            </TouchableOpacity>
                        
                    )}
                    
                    keyExtractor={(item,index)=>index.toString()}
                    />

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
  });



const mapStateToProps = (store) =>({

    all_nearby_location: store.userState.all_nearby_location})

const mapDispatchProps = (dispatch) => bindActionCreators({setUserNearbyLocation},dispatch)
   
export default connect(mapStateToProps,mapDispatchProps)(NearbyLocations);