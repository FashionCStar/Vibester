import React, {Component} from 'react';
import {View,  SafeAreaView, StatusBar,Image,FlatList,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Tab, Tabs, TabHeading } from 'native-base';
const width = Dimensions.get("window").width

export default class EditPrivateEvent extends Component { 

  constructor (props) {
    super(props);
    this.state={
      type:-1,
      edit:false,
    }
  }

  componentDidMount = () =>{
    let type = this.props.navigation.getParam("type",0);
    this.setState({type:type});
  }

    render() {
      const DATA=[1,2,3,4];
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column',}}>
            <View style={{flexDirection:'row', width:'100%',height:300}}>
              <Image source={require('../../assets/images/temp/image4.png')} style={{width:'100%', height:'100%'}} />
              <TouchableOpacity style={{position:'absolute', top:10, right:10}} onPress={()=>{
                this.props.navigation.goBack();
              }}>
                <Text style={{color:'#fff'}}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal:10, justifyContent:'space-between', flexDirection:'row', marginVertical:10}}>
            <TouchableOpacity onPress={()=>{
              NavigationService.navigate("SelectProfiles");
            }}>
              <Text style={{color:'#fff'}}> + Add friend</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                this.setState({edit:!this.state.edit})
              }}>
              <Icon type={"FontAwesome"} name="edit" style={{color:'#fff', fontSize:20}} />
              </TouchableOpacity>
            </View>
            <FlatList style={{backgroundColor:'#000',paddingHorizontal:20}}
              data={DATA}
              renderItem={({ item }) =>{
                return (
                  <View style={{flexDirection:'row', marginVertical:10, alignItems:'center'}}>
                    <Image style={{width:30, height:30, borderRadius:20}} source={require('../../assets/images/avatar.png')} />
                    <Text style={{fontSize:14, color:'#fff', marginLeft:10}}>SUZAN OKORIE</Text>
                    {this.state.edit&&
                    <Icon type={"FontAwesome"} name="edit" style={{color:'#fff', fontSize:20, marginLeft:10}} />}
                  </View>
                );}
              }
            />
         </SafeAreaView>
        </View>
      );
    }
  }
  
