import React, { Component } from 'react'
import {StyleSheet, View ,Text,ImageBackground,TouchableOpacity,Image,FlatList} from 'react-native'
import firebase from 'firebase'
import NumberFormat from 'react-number-format';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'



import {GetAllLocations,GetAllVaccines,GetAllAppointments,Userdata,getAllDateSettings} from '../redux/actions/index'




class Main extends Component {
    
    state={
        result:'',
        isFetching:false,
       
      }

    fetchuser = ()=>{
    
        fetch('https://corona.lmao.ninja/v2/countries/India?yesterday&strict&query%20')
        .then(response => response.json())
        .then(result => this.setState({result,isFetching:true}))
        .catch(e => {
          console.log(e);
          
          
      });}

    componentDidMount(){

        this.fetchuser();
        this.props.GetAllLocations();
        this.props.GetAllVaccines();
        this.props.Userdata();
        this.props.getAllDateSettings();
        
        
    }

    ViewAppointments = () => {
        this.props.GetAllAppointments();
        this.props.Userdata();
        this.props.navigation.navigate('View Appointments')
    }



    
    render() {
        return (
            <View style={styles.container}>
            <View style={{marginTop:90,flex:0.8,elevation:20,marginHorizontal:24,backgroundColor:'white',borderRadius:40}}>
               <ImageBackground source={require('../assets/banner.jpg')} resizeMode='cover' imageStyle={{ borderRadius:40}} style={{elevation:20,justifyContent:'center',width:'100%',height:'100%'}}>
                 
                 
               
                 <View style={{alignItems:'center'}}>
                 <Text style={{color:'white',fontSize:26,fontWeight:'bold'}}>TOTAL CASES IN INDIA</Text>

                 <Text style={{color:'white',fontSize:24}}>
                 <NumberFormat value={"44,553,042"} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" renderText={(text)=> (<Text>{text}</Text>)} />
                </Text>
       
                 <Text style={{color:'white',fontSize:24,marginTop:8,fontWeight:'bold'}}>DEATHS </Text>
                 <Text  style={{color:'white',fontSize:20}}>
                 <NumberFormat value={"528,429"} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" renderText={(text)=> (<Text>{text}</Text>)} />

                     </Text>
       
                 <Text style={{color:'white',fontSize:24,marginTop:8,fontWeight:'bold'}}>RECOVERED</Text>
                 <Text style={{color:'white',fontSize:20}}>
                 <NumberFormat value={"43,978,271"} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" renderText={(text)=> (<Text>{text}</Text>)} />

                     </Text>
                 </View>

               </ImageBackground>
             </View>
            <View style={{flex:0.7,marginHorizontal:24}}>
              <Text style={{marginTop:10,fontSize:20,fontWeight:'bold'}}>Approved Vaccines</Text>
              <FlatList horizontal 
                data={this.props.all_vaccines}
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item,index})=>(

                  <TouchableOpacity 
                  onPress={()=>{this.props.navigation.navigate('VaccineDetails',{vaccine_data:item})}}
                  style={{flex:1,justifyContent:'center'}}>
                  <View style={{height:'85%',width:120,borderWidth:1,borderRadius:10,marginLeft:index == 0? 0:10}}>
      
                      <LinearGradient  colors={['#000046','#1CB5E0']} start={{x:0,y:0}} end={{x:1,y:0}} style={{alignItems:'center',borderTopLeftRadius:8,borderTopRightRadius:8}}  >
                      <Text style={{color:'#FFF',fontSize:18,fontWeight:'bold',alignItems:'center'}}>{item.vname}</Text>
                      </LinearGradient>
                      
                      <View style={{alignItems:'center',marginTop:7}} >
                        <Image source={require('../assets/vials.png')}
                          resizeMode='contain'
                          style={{height:60,width:60}}
                        />
                      </View>
                      <View style={{marginTop:10,alignItems:'center'}}>
                        <Text style={{fontSize:14}}>Efficacy: {item.efficacy}</Text>
                      </View>

                  </View>
                  </TouchableOpacity>
                )}
              
              
              />
            </View>
              
             {/* navigation Section */} 
             <View style={{flex:1}}>
       
             <View style={{flex:1,borderTopLeftRadius:30,borderTopRightRadius:30,backgroundColor:'#FFFFFF',elevation:21}}>
               
               <TouchableOpacity 
               onPress={() =>this.props.navigation.navigate('guidelines')}
               style={{flex:1,marginHorizontal:24,marginTop:10,marginBottom:5,justifyContent:'center'}}>
                 <LinearGradient  colors={['#000046','#1CB5E0']} start={{x:0,y:0}} end={{x:1,y:0}}  style={{flexDirection:'row',flex:1,borderRadius:10}}>
                 <View style={{flex:1,justifyContent:'center'}}>
                 <Text style={{fontSize:18,fontWeight:'bold',color:'white',marginHorizontal:20}}>BEFORE VACCINATION VIEW GUIDELINES</Text>
                 </View>
                 <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                   <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}><Icon name='right'  size={25}/></Text>
                 </View>
                 </LinearGradient>
               </TouchableOpacity>
       
               <TouchableOpacity 
                 onPress={() =>this.props.navigation.navigate('Location')}
               style={{flex:1,marginHorizontal:24,marginVertical:5,justifyContent:'center'}}>
                 <LinearGradient  colors={['#000046','#1CB5E0']} start={{x:0,y:0}} end={{x:1,y:0}}  style={{flexDirection:'row',flex:1,borderRadius:10}}>
                 <View style={{flex:1,justifyContent:'center'}}>
                 <Text style={{fontSize:18,fontWeight:'bold',color:'white',marginHorizontal:20}}>BOOK APPOINTMENT</Text>
                 </View>
                 <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                   <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}><Icon name='right'  size={25}/></Text>
                 </View>
                 </LinearGradient>
               </TouchableOpacity>
       
       
               <TouchableOpacity 
                 onPress={() => this.ViewAppointments()} 
               style={{flex:1,marginHorizontal:24,marginVertical:5,justifyContent:'center'}}>
                 <LinearGradient  colors={['#000046','#1CB5E0']} start={{x:0,y:0}} end={{x:1,y:0}}  style={{flexDirection:'row',flex:1,borderRadius:10}}>
                 <View style={{flex:1,justifyContent:'center'}}>
                 <Text style={{fontSize:18,fontWeight:'bold',color:'white',marginHorizontal:20}}>VIEW APPOINTMENT</Text>
                 </View>
                 <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                   <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}><Icon name='right'  size={25}/></Text>
                 </View>
                 </LinearGradient>
               </TouchableOpacity>
       
       
       
               <TouchableOpacity
                 onPress={() => this.props.navigation.navigate('Faqs')}
               style={{flex:1,marginHorizontal:24,marginVertical:5,justifyContent:'center'}}>
                 <LinearGradient  colors={['#000046','#1CB5E0']} start={{x:0,y:0}} end={{x:1,y:0}}  style={{flexDirection:'row',flex:1,borderRadius:10}}>
                 <View style={{flex:1,justifyContent:'center'}}>
                 <Text style={{fontSize:18,fontWeight:'bold',color:'white',marginHorizontal:20}}>FAQs</Text>
                 </View>
                 <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                   <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}><Icon name='right'  size={25}/></Text>
                 </View>
                 </LinearGradient>
               </TouchableOpacity>
       
       
       
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

  const mapDispatchProps = (dispatch) => bindActionCreators({getAllDateSettings,GetAllLocations,GetAllVaccines,GetAllAppointments,Userdata},dispatch)
  const mapStateToProps = (store) =>({

    all_vaccines: store.userState.all_vaccines})

  export default connect(mapStateToProps,mapDispatchProps)(Main);