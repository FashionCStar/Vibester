import React, {Component} from 'react';
import {View,  SafeAreaView, StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
const width = Dimensions.get("window").width
import { Switch } from 'react-native-switch';

export default class StorySetting extends Component { 

  constructor (props) {
    super(props);
    this.state={
      isAppearInVenue:true,
      isAppearInLocal:false,
    }
  }

    render() {
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column',}}>
            <Text style={{color:'#fff', fontSize:17,marginTop:10, alignSelf:'center'}}> Stroy Settings </Text>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:10, marginLeft:10}} onPress={()=>{
                this.props.navigation.goBack(null);
            }}>
              <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
            </TouchableOpacity>
            <View style={{flex:1, width:'100%', paddingHorizontal:30, paddingVertical:10}}>
              <View style={{flexDirection:'row', marginTop:10, alignItems:'center', }}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={{color:'#fff', fontSize:15}}> Don't appear in venue stories </Text>
                </TouchableOpacity>
                <Switch 
                  circleSize={15}
                  backgroundActive={'#30a566'}
                  backgroundInactive={'black'}
                  circleBorderWidth={0}
                  containerStyle={[{borderWidth:1, marginLeft:'auto', marginRight:'18%'}, this.state.isAppearInVenue?{borderColor:'#30a566'}:{borderColor:'#fff'}]}
                  circleBorderInactiveColor={"#fff"}
                  changeValueImmediately={true}
                  value={this.state.isAppearInVenue} 
                  onValueChange={(c)=>{this.setState({isAppearInVenue:c})}}
                 />
              </View>
              <View style={{flexDirection:'row', marginTop:10, alignItems:'center', }}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={{color:'#fff', fontSize:15}}> Don't appear in local stories </Text>
                </TouchableOpacity>
                <Switch 
                  circleSize={15}
                  backgroundActive={'#30a566'}
                  backgroundInactive={'black'}
                  circleBorderWidth={0}
                  containerStyle={[{borderWidth:1, marginLeft:'auto', marginRight:'18%'}, this.state.isAppearInLocal?{borderColor:'#30a566'}:{borderColor:'#fff'}]}
                  circleBorderInactiveColor={"#fff"}
                  changeValueImmediately={true}
                  value={this.state.isAppearInLocal} 
                  onValueChange={(c)=>{this.setState({isAppearInLocal:c})}}
                 />
              </View>
              
              <TouchableOpacity activeOpacity={0.7} style={{marginTop:10}} onPress={()=>{
                NavigationService.navigate("StoryHideList")
              }}>
                <Text style={{color:'#fff', fontSize:15}}> Hide from </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
