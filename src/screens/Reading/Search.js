import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,FlatList,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Tab, Tabs, TabHeading } from 'native-base';
import FitImage from 'react-native-fit-image';

const width = Dimensions.get("window").width


export default class Search extends Component { 

  constructor (props) {
    super(props);
    this.state={
      type:0
    }
  }
  render() {
    
    const DATA=[1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,];
    return (
    <View style={{flexDirection:'column', backgroundColor:'rgba(0,0,0,0.9)', padding:10, width:'100%', zIndex:20000, height:'100%'}}>        
      <View style={{flexDirection:'row',  justifyContent:'space-evenly',marginBottom:10}}>
        <TouchableOpacity activeOpacity={0.7} style={[{paddingVertical:10, paddingHorizontal:20},this.state.type==0&&{borderBottomColor:'#fff', borderBottomWidth:2}]} onPress={()=>{
          this.setState({type:0})
        }}>
          <Text style={{fontSize:14, color:'#fff',}}>People</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[{paddingVertical:10, paddingHorizontal:20},this.state.type==1&&{borderBottomColor:'#fff', borderBottomWidth:2}]} onPress={()=>{
          this.setState({type:1})
        }}>
          <Text style={{fontSize:14, color:'#fff',}}>Venues</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[{paddingVertical:10, paddingHorizontal:20},this.state.type==2&&{borderBottomColor:'#fff', borderBottomWidth:2}]} onPress={()=>{
          this.setState({type:2})
        }}>
          <Text style={{fontSize:14, color:'#fff',}}>Activities</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:1.3}}>
        <FlatList
          data={DATA}
            renderItem={({ item }) =>{
                return (
                  <TouchableOpacity style={{flexDirection:'row', marginVertical:5,alignItems:'center'}} activeOpacity={0.8} onPress={()=>{
                    NavigationService.navigate("Profile",{type:'2'})
                  }}>
                    <Image style={{width:30, height:30, borderRadius:20}} source={require('../../assets/images/avatar.png')} />
                    <Text style={{fontSize:14, color:'#fff', marginLeft:10,  }}>Following name{item}</Text>   
                  </TouchableOpacity>
                );
              }}
            keyExtractor={item => item.id}
        />
      </View>
    </View>
    );
  }
}