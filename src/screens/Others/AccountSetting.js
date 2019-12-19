import React, {Component} from 'react';
import {View,  SafeAreaView, StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
const width = Dimensions.get("window").width
import { Switch } from 'react-native-switch';

export default class AccountSetting extends Component { 

  constructor (props) {
    super(props);
    this.state={
      isPrivateAccount:true,
    }
  }

    render() {
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column',}}>
            <View style={{flexDirection:'row', width:'100%',marginTop:10}}>
              <View style={{width:50}}>
              <TouchableOpacity activeOpacity={0.8} style={{marginLeft:10}} onPress={()=>{
                  this.props.navigation.goBack(null);
              }}>
                <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
              </TouchableOpacity>
              </View>
              <Text style={{color:'#fff', fontSize:17, flex:1, textAlign:'center'}}> Account & Setting </Text>
              <View style={{width:50}}></View>
            </View>
           
            <View style={{flex:1, width:'100%', paddingHorizontal:30, paddingVertical:10}}>
              <View style={{flexDirection:'row', marginTop:10, alignItems:'center', }}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={{color:'#fff', fontSize:15}}> Private Account </Text>
                </TouchableOpacity>
                <Switch 
                  circleSize={15}
                  backgroundActive={'#30a566'}
                  backgroundInactive={'black'}
                  circleBorderWidth={0}
                  containerStyle={[{borderWidth:1, marginLeft:'auto', marginRight:'auto'}, this.state.isPrivateAccount?{borderColor:'#30a566'}:{borderColor:'#fff'}]}
                  circleBorderInactiveColor={"#fff"}
                  changeValueImmediately={true}
                  value={this.state.isPrivateAccount} 
                  onValueChange={(c)=>{this.setState({isPrivateAccount:c})}}
                 />
              </View>
                <TouchableOpacity activeOpacity={0.7} style={{marginTop:10}} onPress={()=>{NavigationService.navigate("StorySetting")}}>
              <Text style={{color:'#fff', fontSize:15}}> Story Setting </Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={{marginTop:10}} onPress={()=>{
                NavigationService.navigate("MyPosts");
              }}>
              <Text style={{color:'#fff', fontSize:15}}> My posts </Text>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={0.7} style={{marginTop:10}}>
              <Text style={{color:'#fff', fontSize:15}}> Report a problem </Text>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={0.7} style={{marginTop:10}}>
              <Text style={{color:'#fff', fontSize:15}}> Terms and conditions </Text>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={0.7} style={{marginTop:'auto', marginLeft:'auto', marginRight:10}}>
              <Text style={{color:'#555555', fontSize:13}}> Delete my account </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
