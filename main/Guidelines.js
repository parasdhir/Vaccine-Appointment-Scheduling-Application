import { Item } from 'native-base';
import React, { Component } from 'react'
import {FlatList,Text,View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default class Guidelines extends Component {
    
    state={
        data:[
            {id:1,
            name:'Ensure you are not pregnant or have a history of severe allergic reaction as you should not take the vaccine',
            iconname:'alert-triangle',
            iconpack:Feather,
        },
           { id:2,
            name:'The Vaccine will be administered in your arm so please wear loose clothing',
            iconname:'shirt-outline',
            iconpack:Ionicons
        },
            { id:3,
            name:'If you require assistance, you may only have 1 companion to accompany you',
            iconname:'user-friends',
            iconpack:FontAwesome5, 
        },
            { id:4,
            name:'Sites are accessible by wheelchairs. wheelchairs can be provided onsite if required.',
            iconname:'wheelchair',
            iconpack:FontAwesome5
        },
            { id:5,
            name:'Children under the age of 18 are not allowed on site',
             iconname:'child',
             iconpack:FontAwesome5,
        
        },
            { id:6,
            name:'You will be asked to stay 15 min after your vaccination',
            iconname:'time-outline',
            iconpack:Ionicons,

        
        },
            { id:7,
            name:'Like any Vaccine, Common side effects may include pain and redness at the injection site,fever and fatique',
            iconname:'sick',
            iconpack:MaterialIcons,
        },
            {id:8,
            name:'Please make sure you bring your ID Proof',
            iconname:'verified-user',
            iconpack:MaterialIcons,
            },
            {id:9,
            name:'Face mask is required and social distancing is to be Followed',
            iconname:'masks',
            iconpack:MaterialIcons,
            
        }
        ]
    }

    render() {
        return (
          <View  style={{flex:1}}>
              
                 <View style={{height:'13%',backgroundColor:'red'}}>
               <LinearGradient  colors={['#000046','#1CB5E0']} 
               start={{x:0,y:0}} 
               end={{x:1,y:0}}  
               style={{flex:1,}}>
            </LinearGradient>
              </View>
              
              <FlatList style={{margin:10,padding:10,backgroundColor:'white',borderRadius:5}}
                    data={this.state.data}
                    renderItem={
                        ({item})=>(
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:10,margin:2,borderColor:'lightblue',borderBottomWidth:1}}>
                               <Text style={{marginLeft:20}}> <item.iconpack name={item.iconname} size={30} color="#1CB5E0" /></Text>
                                <Text style={{padding:15,fontSize:16,color:'#000000'}} >
                                 {item.name}
                                </Text>
                                </View>
                    )}
                    keyExtractor ={(item) => (item.id).toString()}
                    />

          </View>
        )
    }
}
