import React, { Component } from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
export default class Vaccinedetails extends Component {
   
   
    render() {
        const {vaccine_data}  = this.props.route.params;
        
        return (
            <View style={{flex:1,backgroundColor:'#FFF'}}>
                 <View style={{height:'13%',backgroundColor:'red'}}>
               <LinearGradient  colors={['#000046','#1CB5E0']} 
               start={{x:0,y:0}} 
               end={{x:1,y:0}}  
               style={{flex:1,}}>
            </LinearGradient>
              </View>
                <View style={{marginTop:50}}>
                    <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:40,color:'navy',fontWeight:'bold'}}>{vaccine_data.vname}</Text>
                    </View>
                    <View style={{marginTop:30,marginHorizontal:20,alignItems:'center'}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Is used against {vaccine_data.madefor}</Text>
                    </View>
                    <View style={{marginHorizontal:20,marginTop:10,marginBottom:10,alignItems:'center'}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>effective {vaccine_data.efficacy}</Text>
                    </View>
                    
                    <View style={styles.colcontainer}>
                        <Text style={styles.subheading}>Created by :</Text>
                        <Text style={styles.text}>{vaccine_data.createdby}</Text>
                    </View>
                    <View style={styles.colcontainer}>
                        <Text style={styles.subheading}>Made from :</Text>
                        <Text style={styles.text}>{vaccine_data.madefrom}</Text>
                    </View>
                    <View style={styles.colcontainer}>
                        <Text style={styles.subheading}>How it works</Text>
                        <Text style={styles.text}>{vaccine_data.immunity}</Text>
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
    colcontainer:{
        marginTop:20,
        marginHorizontal:20
    },
    subheading:{
        fontSize:28,
        color:'navy',
        fontWeight:'bold'
    },
    text:{
        fontWeight:'bold'
    }
  });