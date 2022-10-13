import React, { Component } from 'react'
import {View,Text,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux'

 class ViewAppointment extends Component {
    
   
    
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
               <View style={{flex:1,marginTop:20,marginHorizontal:10}}>
                <FlatList
                    data={this.props.all_appointments}
                    renderItem={
                        ({item})=>(
                            <TouchableOpacity style= {{margin:5}} onPress={()=>this.props.navigation.navigate('Appointment Data',{data:item})}>
                                
                                <LinearGradient  colors={['#00223E','#1CB5E0']} 
                                    start={{x:0,y:0}} 
                                    end={{x:1,y:0}}
                                    style={{borderRadius:10,marginRight:10}}
                                    >
                                    
                                <Text style={{color:'#FFFFFF',padding:7,fontSize:20}} >
                                {item.date}
                                </Text>
                                <Text style={{color:'#FFFFFF',padding:7,fontSize:18}} >
                                    Ref Number : #{item.id}
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        
                    )}
                    keyExtractor={(item) => item.id}/>
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

    all_appointments: store.userState.all_appointments,
   

})


  
   
   export default connect(mapStateToProps,null)(ViewAppointment);