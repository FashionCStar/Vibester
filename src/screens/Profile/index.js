import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,FlatList,Image,Text,TouchableOpacity,ImageBackground,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input, Button } from 'native-base';
import Footer from '../common/Footer';
import Carousel from 'react-native-snap-carousel';
import FitImage from 'react-native-fit-image';
import Venue from '../common/Venue';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';

const width = Dimensions.get("window").width

export default class Profile extends Component { 

  constructor (props) {
    super(props);
    this.state = {
      isEditMode:false,
      showReportBtn:false,
    }
  }

    render() {

      let type = this.props.navigation.getParam("type","1"); //1 - mine, 2 - other

      return (
        <View style={{flex:1, backgroundColor:'#000', flexDirection:'column'}}>
          <View style={{flex:1, width:'100%'}}>
          
            <TouchableOpacity style={{width:width, height:width*1.3}} activeOpacity={1} onPress={()=>{
                NavigationService.navigate("Events");
              }}>
              <ImageBackground source={require('../../assets/images/temp/image3.jpg')} style={{width:'100%', height:'100%'}} imageStyle={{resizeMode:'cover'}}>
                <LinearGradient colors={['rgba(100,100,100,1)', 'rgba(0,0,0,0.05)']} style={{width:'100%', height:'100%'}} start={{x: 0, y: 1}} end={{x: 0, y: 0.6}}>
                  <SafeAreaView>
                    <View style={{width:'100%', flexDirection:'row',marginTop:5}}>
                      {type=="2"&&
                      <TouchableOpacity activeOpacity={0.8} style={{marginLeft:10}} onPress={()=>{
                          this.props.navigation.goBack(null);
                      }}>
                        <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
                      </TouchableOpacity>}
                      {type=="1"&&
                      <TouchableOpacity style={{marginLeft:'auto'}} activeOpacity={0.7} onPress={()=>{
                        this.setState({isEditMode:true})
                      }}>
                        <Icon type={"FontAwesome"} name="edit" style={{color:'#fff', fontSize:20}} />
                      </TouchableOpacity>}
                      {type=="1"&&<TouchableOpacity style={{marginLeft:10, marginRight:15}} activeOpacity={0.7} onPress={()=>{
                        NavigationService.navigate("AccountSetting");
                      }}>
                        <Icon type={"FontAwesome"} name="cog" style={{color:'#fff', fontSize:20}} />
                      </TouchableOpacity>}
                      {type=="2"&&
                      <View style={{flexDirection:'row', marginLeft:'auto',}}>
                      {this.state.showReportBtn&&
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                          <TouchableOpacity>
                            <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>Report</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                          <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>Block</Text>
                          </TouchableOpacity>
                        </View>
                      }
                        <TouchableOpacity style={{marginLeft:15, marginRight:10}} activeOpacity={0.7} onPress={()=>{
                          this.setState({showReportBtn:!this.state.showReportBtn})
                        }}>
                          <Icon type={"MaterialCommunityIcons"} name="dots-vertical" style={{color:'#fff', fontSize:20}} />
                        </TouchableOpacity>
                      </View>
                      }
                    </View>
                  </SafeAreaView>
                  <View style={{marginTop:'auto', alignItems:'center', marginBottom:40}} >
                    <Text style={{color:'#fff', fontSize:17, fontWeight:'bold'}}>Tap to view</Text>
                    <Text style={{color:'#fff', fontSize:12, fontWeight:'bold'}}>Nnamdi's vibes</Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
            <View style={{flex:1,}}>
              <View style={{width:'100%', justifyContent:'space-evenly', flexDirection:'row'}}>
                <TouchableOpacity style={{ marginTop:-50,marginLeft:30}} activeOpacity={0.9} onPress={()=>{
                  NavigationService.navigate("Events")
                }}>
                 <Image style={{width:95, height:95, borderRadius:50, borderWidth:2, borderColor:'#fff',}} source={require('../../assets/images/temp/image2.jpg')} />
                </TouchableOpacity>
                <View style={{ justifyContent:'space-evenly', flexDirection:'row', flex:1}}>
                  <TouchableOpacity style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}} activeOpacity={0.8} onPress={()=>{
                    NavigationService.navigate("Follow",{type:0});
                  }}>
                    <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>Following</Text>
                    <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>361</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}} activeOpacity={0.8} onPress={()=>{
                    NavigationService.navigate("Follow",{type:1});
                  }}>
                    <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>Followers</Text>
                    <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>706</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly', paddingLeft:24}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>              
                <TextInput style={{color:'#fff', fontSize:16, fontWeight:'bold', padding:0}} editable={this.state.isEditMode} >User name:</TextInput>
                 {this.state.isEditMode&&<Icon type={"FontAwesome"} name="pencil" style={{fontSize:18, color:'#fff', marginLeft:10}} />}               
                {this.state.isEditMode&&<TouchableOpacity style={{marginLeft:'auto', marginRight:20}} activeOpacity={0.7} onPress={()=>{
                  this.setState({isEditMode:false})
                }} >
                 <Text style={{fontSize:15, color:'#467fd7'}}>Done</Text>
                 </TouchableOpacity>}
                 {type=="2"&&<TouchableOpacity style={{marginLeft:'auto', marginRight:20}} activeOpacity={0.7} onPress={()=>{
                 
                }} >
                 <Text style={{fontSize:15, color:'#f7ba7b'}}>Follow</Text>
                 </TouchableOpacity>}
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                 <TextInput style={{color:'#fff', fontSize:16, fontWeight:'bold', padding:0}} editable={this.state.isEditMode} >Nnams Nwachuku</TextInput>
                 {this.state.isEditMode&&<Icon type={"FontAwesome"} name="pencil" style={{fontSize:18, color:'#fff', marginLeft:10}} />}
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color:'#fff', fontSize:14}}>Bio: </Text>
                  <TextInput style={{color:'#fff', fontSize:14, padding:0}}></TextInput>
                  {this.state.isEditMode&&<Icon type={"FontAwesome"} name="pencil" style={{fontSize:18, color:'#fff', marginLeft:10}} />}
                </View>
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color:'#fff', fontSize:14}}>Interests: </Text>
                  <TextInput style={{color:'#fff', fontSize:14, padding:0}}></TextInput>
                  {this.state.isEditMode&&<Icon type={"FontAwesome"} name="pencil" style={{fontSize:18, color:'#fff', marginLeft:10}} />}
                </View>
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color:'#fff', fontSize:14}}>Liked veues: </Text>
                  <TextInput style={{color:'#fff', fontSize:14, padding:0}}></TextInput>
                  {this.state.isEditMode&&<Icon type={"FontAwesome"} name="pencil" style={{fontSize:18, color:'#fff', marginLeft:10}} />}
                </View>
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color:'#fff', fontSize:14}}>Links: </Text>
                  <TextInput style={{color:'#fff', fontSize:14, padding:0}}></TextInput>
                  {this.state.isEditMode&&<Icon type={"FontAwesome"} name="pencil" style={{fontSize:18, color:'#fff', marginLeft:10}} />}
                </View>
              </View>
            </View>
          
          </View>
          <SafeAreaView style={{flex:0,}}>
            <Footer />
          </SafeAreaView>
        </View>
      );
    }
  }
  
