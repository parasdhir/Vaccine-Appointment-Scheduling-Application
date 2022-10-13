import React,{Component} from 'react'
import {View, TouchableOpacity,Text,StyleSheet,FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase'
require("firebase/firestore")


import Icon from 'react-native-vector-icons/Fontisto';
import CalendarPicker from 'react-native-calendar-picker';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setUserDate,setUserTime} from '../redux/actions/index'


const dataarray = [{name:'9:00AM - 10:00AM',disable:false},{name:'10:00AM - 11:00AM',disable:false},{name:'11:00AM - 12:00PM',disable:false},{name:'12:00PM - 1:00PM',disable:false},
    {name:'1:00PM - 2:00PM',disable:false}]



class datepicker extends Component {
  
  state ={
    selectedDate:null,
    selectedTime:'',
    disablecalendar:false,
    displaytime:false,
    disabledatearray:[],
    
    timesettings:null,
  }

  

  componentDidMount(){
    
    let {alldatesettings} = this.props;
    this.setState({timesettings:alldatesettings.timesettings})
    
    let hospitaldateref = firebase.firestore().collection('Hospitals').doc(this.props.nearbylocation).collection('dates');
    hospitaldateref.where('datecount',"==",alldatesettings.datesettings).get()
    .then((querySnapshot) => {
        let disabledatearray = querySnapshot.docs.map(doc=>new Date(doc.id));
       
          this.setState({disabledatearray,disablecalendar:true})

        });

    
     
  }

  onDateSelect = (setdate) =>{
    this.props.setUserDate(setdate)
    this.props.navigation.navigate('Confirmation')

  }
  onTimeSelect = (time)=>{

    this.props.setUserTime(time)
    this.setState({selectedTime:time})

  }


  
  onDateChange =(date)=> {
    let hospitaldate = new Date(date).toDateString()
    let hospitaltimeref = firebase.firestore().collection('Hospitals').doc(this.props.nearbylocation).collection('dates').doc(hospitaldate).collection('timings')
    
    this.setState({data:null})
    hospitaltimeref.where('timecount',"==",parseInt(this.state.timesettings)).get()
    .then((querySnapshot) => {
      let disabledtimeslots = querySnapshot.docs.map(doc=>doc.id);
       
        let data = dataarray.map(doc=>{
          if (disabledtimeslots.includes(doc.name)){
                return{
                  name:doc.name,
                  disable:true
                }
                
          }else{
            
            return{
              name:doc.name,
              disable:false
            }
          }
        })
        this.setState({data})
       
      
        });

    
    this.setState({
    
      selectedDate: date,
      displaytime:true
    });
  }


  render() {
    const {selectedDate,selectedTime,displaytime,disabledatearray,data,disablecalendar} = this.state;
    

    let d = new Date();
    const nextmonth = new Date(d.setMonth(d.getMonth() + 1,1));
    
    return (
      <View style={styles.container}>
      <LinearGradient  colors={['#000046','#1CB5E0']} 
        start={{x:0,y:0}} 
        end={{x:1,y:0}}  
        style={{flex:2,borderBottomLeftRadius:50,borderBottomRightRadius:50}}>
          <View style={{marginTop:80,marginHorizontal:20,}}>
        {disablecalendar?
        <CalendarPicker
          onDateChange={this.onDateChange}
          maxDate={nextmonth}
          minDate={new Date()}
          restrictMonthNavigation ={true}
          disabledDatesTextStyle ={{color:'#323635'}}
          textStyle={{color:'#FFFFFF'}}
          disabledDates={disabledatearray}
        />:null}
        </View>
        </LinearGradient>
        
        
        <View style={{flex:1.1,}} >
        
        {displaytime ? 
        (<View style={{alignItems:'center'}}>
         
        <Text style = {{fontSize:20,fontWeight:'bold',alignItems:'center'}}>Available time slots</Text>
        <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({ item }) => 
        item.disable ? 
        (<TouchableOpacity disabled={item.disable}
          style={{margin:10}}
        >
            <LinearGradient  colors={['#55585c','#262729']} 
        start={{x:0,y:1}} 
        end={{x:1.5,y:0}}
        style={{borderRadius:6}}  >
        <Text style={{color:'#FFFFFF',fontSize:18,padding:10}}>{item.name}</Text>
        </LinearGradient>




        
        </TouchableOpacity>):
        
        (<TouchableOpacity  
          onPress={()=>this.onTimeSelect(item.name)}
        style={{margin:10}}>
            <LinearGradient  colors={['#05057d','#4485c7']} 
        start={{x:1,y:0}} 
        end={{x:1,y:1}}
        style={{borderRadius:6}}  >
        <Text style={{color:'#FFFFFF',fontSize:18,padding:10}}>{item.name}</Text>
        </LinearGradient>

        </TouchableOpacity>)}/>
      </  View>
        ):null}
        </View>





        
      <View style={{flex:0.4,alignItems:'center'}}>
      { selectedDate ?(<Text style={{fontSize:18}}>Day and Date - {new Date(selectedDate).toDateString()}</Text>):null} 
       

        
        {selectedTime ? ( <Text style={{fontSize:18}}>Time - {selectedTime}</Text>):null} 

      </View>

      






      <View style={{justifyContent:'flex-end'}}>

      {selectedDate && selectedTime ?
    <TouchableOpacity
            onPress={()=>this.onDateSelect(selectedDate)}
            style={{marginHorizontal:10,marginBottom:5}}
            > 
              <LinearGradient  colors={['#000046','#1CB5E0']} 
        start={{x:0,y:1}} 
        end={{x:1.5,y:0}}
        style={{borderRadius:6,padding:20,borderRadius:30,justifyContent:'center',alignItems:'center'}}  >
        <Text style={{fontSize:16,color:'#FFFFFF'}}>CLICK HERE TO PROCEED <Icon name="arrow-right" size={15} /></Text>

        </LinearGradient>
        </TouchableOpacity>
        :
        <TouchableOpacity disabled={true} style={{marginHorizontal:10,marginBottom:5}} >
        <LinearGradient  colors={['#55585c','#262729']} 
        start={{x:0,y:1}} 
        end={{x:1.5,y:0}}
        style={{borderRadius:6,padding:20,borderRadius:30,justifyContent:'center',alignItems:'center'}}  >
        <Text style={{fontSize:16,color:'#FFFFFF'}}>CLICK HERE TO PROCEED <Icon name="arrow-right" size={15} /></Text>

        </LinearGradient>
        </TouchableOpacity>
        
        }
        </View>
      
      
      </View>
    );
  }
}  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff'
    
  },
  
 
});



const mapStateToProps = (store) =>({

  nearbylocation:store.appointmentState.nearbyLocation,
  alldatesettings:store.userState.alldatesettings
  
 })

const mapDispatchProps = (dispatch) => bindActionCreators({setUserDate,setUserTime},dispatch)
   
export default connect(mapStateToProps,mapDispatchProps)(datepicker);




