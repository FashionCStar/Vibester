import React, {Component} from 'react';
import {View,  SafeAreaView, StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
const width = Dimensions.get("window").width
import { Switch } from 'react-native-switch';
import { FlatList } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'

export default class StorySetting extends Component { 

  constructor (props) {
    super(props);
    this.state={
      isAppearInVenue:true,
      isAppearInLocal:false,
    }
  }

    render() {
      const DATA=[1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,];
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column',}}>
            <Text style={{color:'#fff', fontSize:17,marginTop:10, alignSelf:'center'}}> Stroy Settings </Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:10, marginLeft:10}} onPress={()=>{
                this.props.navigation.goBack(null);
            }}>
              <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:10, marginLeft:'auto', marginRight:10}} onPress={()=>{
               
            }}>
              <Text style={{color:'#fff', fontSize:15}}>Done</Text>
            </TouchableOpacity>
            </View>
            <View style={{flex:1, width:'100%', paddingHorizontal:30, paddingVertical:10}}>
              <FlatList
                 data={DATA}
                  renderItem={({ item }) =>{
                      return (
                        <View style={{flexDirection:'row', marginVertical:5, backgroundColor:'#000', alignItems:'center'}}>
                          <Image style={{width:40, height:40, borderRadius:20}} source={require('../../assets/images/avatar.png')} />
                          <Text style={{fontSize:16, color:'#fff', marginLeft:10,  }}>Profile name{item}</Text>
                          <CheckBox
                            containerStyle={{marginLeft:'auto'}}
                            checked={true}
                          />
                        </View>
                      );
                    }}
                  keyExtractor={item => item.id}
              />
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
