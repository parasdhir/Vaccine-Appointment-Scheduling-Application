import React, { Component } from 'react'
import {Text, View,FlatList,TouchableOpacity,Image,StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/Fontisto';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {setUserVaccineType} from '../redux/actions/index'

class VaccineType extends Component {


    onVaccineSelect = (vaccine) =>{
        this.props.setUserVaccineType(vaccine)
        this.props.navigation.navigate('NearbyLocations')
    }

    

    render() {
        return (
            <View style={styles.container}>
        <LinearGradient  colors={['#000046','#1CB5E0']} 
        start={{x:0,y:0}} 
        end={{x:1,y:0}}  
        style={{flex:0.9,borderBottomLeftRadius:50,borderBottomRightRadius:50,justifyContent:'center'}}>
        <View style={{marginTop:50,justifyContent:'center',height:'60%',width:'100%',alignItems:'center'}}>
        <Image source={require('../assets/vaccineimage.png')} style={{resizeMode:'stretch',height:'80%',width:'75%',borderRadius:10}}/>
        
        </View>

        </LinearGradient>
        <View  style={{flex:1}}>
            <View style={{alignItems:'center'}}>
            <Text style={{marginTop:20,fontSize:19,fontWeight:'bold',fontStyle:'italic'}}>
            Select the vaccine you prefer
            </Text> 

            </View>
        
                <View style={{flex:1,marginTop:10,marginHorizontal:20}}>

                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={this.props.all_vaccines}
                    renderItem={
                        ({item})=>(
                            <TouchableOpacity style= {{borderColor:'lightgrey',margin:8,borderWidth:2}} onPress={()=>this.onVaccineSelect(item.vname)}>
                               <View style={{flexDirection:'row',padding:15}}>
                                   <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                   <Icon name="injection-syringe" size={20} /> 
                                   </View>
                                   
                                   <View style={{flex:8,alignItems:'flex-start'}}>
                                   <Text style={{fontSize:17}} >{item.vname}</Text>
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

    all_vaccines: store.userState.all_vaccines})

  
const mapDispatchProps = (dispatch) => bindActionCreators({setUserVaccineType},dispatch)
   
export default connect(mapStateToProps,mapDispatchProps)(VaccineType);