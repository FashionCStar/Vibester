import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
const width = Dimensions.get("window").width
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';


export default class AddVenueScreen extends Component { 

  constructor (props) {
    super(props);
    this.state={
      type:0,
      working_hour:0,
    }
  }

    render() {
      let venue_type=[
        {
          id:1,
          name:'Bar'
        },{
          id:2,
          name:'Nightclub'
        },{
          id:3,
          name:'Pubs'
        },{
          id:4,
          name:'Other venues'
        }
      ]
      let working_hours=[
        {
          id:1,
          name:'Monday'
        },{
          id:2,
          name:'Tuesday'
        },{
          id:3,
          name:'Wednesday'
        },{
          id:4,
          name:'Thursday'
        },{
          id:5,
          name:'Friday'
        },{
          id:6,
          name:'Saturday'
        },{
          id:7,
          name:'Sunday'
        }
      ]
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column'}}>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:10, marginLeft:10}} onPress={()=>{
                this.props.navigation.goBack(null);
            }}>
              <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
            </TouchableOpacity>
            <ScrollView style={{flex:1, marginHorizontal:30, marginVertical:10, flexDirection:'column'}}>
              <TextField
                ref={c=>this._name=c}
                autoCorrect={false}      
                baseColor={"#8d8d8d"}
                textColor={"#d4d7d9"}         
                tintColor={"#fff"} 
                autoCapitalize='none'
                autoCorrect={false}
                label={"Name of venue"}
              />
              <Dropdown
                label='Type of venue'
                data={venue_type}
                baseColor={"#8d8d8d"}
                textColor={"#d4d7d9"}
                itemColor={"#000"}
                selectedItemColor={"#555"}
                labelExtractor={(item,index)=>{return item.name;}}
                valueExtractor={(item,index)=>{return item.id;}}
                onChangeText={(value, index)=>{
                  this.setState({type:value});
                }}
              />
              <TextField
                ref={c=>this._address=c}
                autoCorrect={false}       
                baseColor={"#8d8d8d"}
                textColor={"#d4d7d9"}         
                tintColor={"#fff"}            
                autoCapitalize='none'
                autoCorrect={false}
                label={"Address.."}
              />
              <Dropdown
                label='Working hours...'
                data={working_hours}
                baseColor={"#8d8d8d"}
                textColor={"#d4d7d9"}
                itemColor={"#000"}
                selectedItemColor={"#555"}
                labelExtractor={(item,index)=>{return item.name;}}
                valueExtractor={(item,index)=>{return item.id;}}
                onChangeText={(value, index)=>{
                  this.setState({working_hour:value});
                }}
              />
              <TextField
                ref={c=>this._description=c}
                autoCorrect={false}        
                baseColor={"#8d8d8d"}
                textColor={"#d4d7d9"}         
                tintColor={"#fff"}                 
                autoCapitalize='none'
                autoCorrect={false}
                multiline={true}
                label={"Brief description..."}
              />
              <View style={{flexDirection:'row', marginTop:20, marginLeft:'auto', alignItems:'center'}}>
                <Text style={{color:'#fff',}}>Add Poster / Video</Text>
                <TouchableOpacity activeOpacity={0.7} style={{marginLeft:30, width:75, height:75,backgroundColor:'#262626', alignItems:'center', justifyContent:'center'}}>
                  <Icon type={"FontAwesome"} name="image" style={{color:'#8d8d8d'}} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', marginLeft:'auto', marginTop:20}}>
                <Text  style={{color:'#f28500', fontSize:15, textAlignVertical:'center'}}>
                Upload venue 
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Image source={require('../../assets/images/signup.png')} style={{width:35, height:35}} resizeMode={"contain"} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      );
    }
  }
  
