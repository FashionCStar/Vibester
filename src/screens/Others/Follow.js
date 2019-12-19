import React, {Component} from 'react';
import {View,  SafeAreaView, StatusBar,Image,FlatList,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Tab, Tabs, TabHeading } from 'native-base';
const width = Dimensions.get("window").width

export default class Follow extends Component { 

  constructor (props) {
    super(props);
    this.state={
      type:-1,
    }
  }

  componentDidMount = () =>{
    let type = this.props.navigation.getParam("type",0);
    this.setState({type:type});
  }

    render() {
      const DATA=[1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,];
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
            </View>

            {this.state.type!=-1&&
              <View style={{flex:1, width:'100%', flexDirection:'column'}}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',marginBottom:20}}>
                <TouchableOpacity activeOpacity={0.7} style={[{paddingVertical:10, paddingHorizontal:20},this.state.type==0&&{borderBottomColor:'#fff', borderBottomWidth:2}]} onPress={()=>{
                  this.setState({type:0})
                }}>
                  <Text style={{fontSize:14, color:'#fff',}}>Following</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={[{paddingVertical:10, paddingHorizontal:20},this.state.type==1&&{borderBottomColor:'#fff', borderBottomWidth:2}]} onPress={()=>{
                  this.setState({type:1})
                }}>
                  <Text style={{fontSize:14, color:'#fff',}}>Followers</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1.3}}>
                <FlatList style={{backgroundColor:'#000',paddingHorizontal:20}}
                  data={DATA}
                    renderItem={({ item }) =>{
                        return (
                          <TouchableOpacity style={{flexDirection:'row', marginVertical:5, backgroundColor:'#000', alignItems:'center'}} activeOpacity={0.8} onPress={()=>{
                            NavigationService.navigate("Profile",{type:'2'})
                          }}>
                            <Image style={{width:40, height:40, borderRadius:20}} source={require('../../assets/images/avatar.png')} />
                            <Text style={{fontSize:16, color:'#fff', marginLeft:10,  }}>Following name{item}</Text>   
                          </TouchableOpacity>
                        );
                      }}
                    keyExtractor={item => item.id}
                />
              </View>
            </View>}
          </SafeAreaView>
        </View>
      );
    }
  }
  
