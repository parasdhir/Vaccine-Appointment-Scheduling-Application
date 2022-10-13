
import React, { Component } from 'react'
import {View,Text,FlatList} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
export default class Faqs extends Component {
    
    
    state={
        data:[
            {
            question:'What is corona virus',
            answer:"Corona viruses are a large family of viruses which may cause illness in animals or humans. In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS). The most recently discovered coronavirus causes coronavirus disease COVID-19."
           },
           {
            question:'What is COVID-19',
            answer:"COVID-19 is the infectious disease caused by the most recently discovered corona virus. This new virus and disease were unknown before the outbreak began in Wuhan, China, in December 2019."
           },
           {
            question:'What are the symptoms of COVID-19',
            answer:"The most common symptoms of COVID-19 are fever, tiredness, and dry cough. Some patients may have aches and pains, nasal congestion, runny nose, sore throat or diarrhea. These symptoms are usually mild and begin gradually. Some people become infected but don’t develop any symptoms and don't feel unwell. Most people (about 80%) recover from the disease without needing special treatment. Around 1 out of every 6 people who gets COVID-19 becomes seriously ill and develops difficulty breathing. Older people, and those with underlying medical problems like high blood pressure, heart problems or diabetes, are more likely to develop serious illness. People with fever, cough and difficulty breathing should seek medical attention."
           },
           {
            question:'How does COVID-19 spread',
            answer:"People can catch COVID-19 from others who have the virus. The disease can spread from person to person through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or exhales. These droplets land on objects and surfaces around the person. Other people then catch COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick."
           },
           {
            question:'Can the virus that causes COVID-19 be transmitted through the air?',
            answer:"Studies to date suggest that the virus that causes COVID-19 is mainly transmitted through contact with respiratory droplets rather than  through the air. See previous answer on “How does COVID-19 spread? "
           },
           {
            question:'Can CoVID-19 be caught from a person who has no symptoms',
            answer:"The main way the disease spreads is through respiratory droplets expelled by someone who is coughing. The risk of catching COVID-19 from someone with no symptoms at all is very low. However, many people with COVID-19 experience only mild symptoms. This is particularly true at the early stages of the disease. It is therefore possible to catch COVID-19 from someone who has, for example, just a mild cough and does not feel ill. "
           },
           {
            question:'Can I catch COVID-19 from the feces of someone with the disease?',
            answer:"The risk of catching COVID-19 from the feces of an infected person appears to be low. While initial investigations suggest the virus may be present in feces in some cases, spread through this route is not a main feature of the outbreak. The ongoing research on the ways COVID-19 is spread and will continue to share new findings. Because this is a risk, however, it is another reason to clean hands regularly, after using the bathroom and before eating."
           },
           
        ]
    }





    
    
    render() {
        return (
           <View style={{flex:1}}>

            <View style={{height:'13%',backgroundColor:'red'}}>
               <LinearGradient  colors={['#000046','#1CB5E0']} 
               start={{x:0,y:0}} 
               end={{x:1,y:0}}  
               style={{flex:1,}}>
            </LinearGradient>
              </View>
              
            <View style={{margin:10,padding:10,flex:1}}>
           <FlatList
                    data={this.state.data}
                    renderItem={
                        ({item})=>(
                            
                <View style={{borderColor:'#1CB5E0',borderWidth:5,padding:20,marginBottom:20,borderRadius:10,marginRight:5}}>
                <Text style={{fontSize:16,fontWeight: 'bold',paddingBottom:10}}>{item.question}</Text>
                <Text>{item.answer}</Text>
            </View>
                        
                    )}
                    keyExtractor={(item)=> item.question} 
                    />
            </View>


        
           

            </View>
        )
    }
}
