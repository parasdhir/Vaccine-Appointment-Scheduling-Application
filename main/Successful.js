import React, { Component } from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native'


export default class Successful extends Component {
   
   
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.uppertextcontainer}>
                <Text style={styles.fontcontainer}>THANK YOU</Text>
                <Text style={styles.fontcontainer}>FOR BOOKING</Text>
                </View>


                <View style={styles.textcontainer}>
                <Text style={styles.reffontcontainer}>Reference Number:</Text>
                <Text style={styles.reffontcontainer}>#{this.props.route.params.ref_number}</Text>
                </View>

                
                
                <View style={styles.imagecontainer}>
                <Image source={require('../assets/successful_logo.png')} style={styles.logo}/> 
                </View>

                <View style={styles.textcontainer}>
                    <Text style={styles.reffontcontainer}>TIMING:</Text>
                    <Text style={styles.reffontcontainer}>{this.props.route.params.timing}</Text>
                    </View>
                    
                    <View style={{flex:1,justifyContent:'flex-end',marginHorizontal:10}}>
                    <TouchableOpacity  style={{justifyContent:'center',alignItems:'center',backgroundColor: '#26C1A0',padding:20,borderRadius:30}}
                onPress={()=> this.props.navigation.popToTop()}>
               <Text style={{fontSize:16}}>PROCEED TO MAIN</Text>
                </TouchableOpacity>
                </View>
                
            </View>

           
        )
    }
}

const styles = StyleSheet.create({
    logo:{
        height:200,
        width:200
    },
    container:{
    flex:1,
    padding:10
    },

    uppertextcontainer:{
        justifyContent:'center',
        alignItems:'center' ,
        marginTop:70,
        marginBottom:30
     },

    textcontainer:{
       justifyContent:'center',
       alignItems:'center' ,
       marginTop:30,
       marginBottom:30
    },

    imagecontainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:50,
       marginBottom:25
     },

    fontcontainer:{
    fontSize:30,

    },
    reffontcontainer:{
        fontSize:20,
    
        }

})