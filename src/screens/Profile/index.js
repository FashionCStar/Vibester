import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Text,TouchableOpacity,ImageBackground,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import Footer from '../common/Footer';
import Carousel from 'react-native-snap-carousel';
import FitImage from 'react-native-fit-image';
import Venue from '../common/Venue';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';

const width = Dimensions.get("window").width
console.log(width);


export default class Profile extends Component { 

  constructor (props) {
    super(props);
    this.state = {
      isEditMode:false
    }
  }

    render() {
      return (
        <View style={{flex:1, backgroundColor:'#000', flexDirection:'column'}}>
          <View style={{flex:1, width:'100%'}}>
            <ImageBackground source={require('../../assets/images/temp/image3.jpg')} style={{width:width, height:width}} imageStyle={{resizeMode:'cover'}}>
              <LinearGradient colors={['rgba(100,100,100,1)', 'rgba(0,0,0,0.05)']} style={{width:'100%', height:'100%'}} start={{x: 0, y: 1}} end={{x: 0, y: 0.6}}>
                <View style={{width:'100%', flexDirection:'row',marginTop:5}}>
                  <TouchableOpacity style={{marginLeft:'auto'}} activeOpacity={0.7} onPress={()=>{
                    this.setState({isEditMode:true})
                  }}>
                    <Icon type={"FontAwesome"} name="edit" style={{color:'#fff', fontSize:20}} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft:5, marginRight:10}} activeOpacity={0.7} onPress={()=>{
                    NavigationService.navigate("AccountSetting");
                  }}>
                    <Icon type={"FontAwesome"} name="cog" style={{color:'#fff', fontSize:20}} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{marginTop:'auto', alignItems:'center', marginBottom:40}} activeOpacity={0.7} onPress={()=>{
                  NavigationService.navigate("Events");
                }}>
                  <Image source={require('../../assets/images/uparrow.png')} />
                  <Text style={{color:'#fff', fontSize:17, fontWeight:'bold'}}>SWIPE UP</Text>
                  <Text style={{color:'#fff', fontSize:12, fontWeight:'bold'}}>To view Nnamdi's vibes</Text>
                </TouchableOpacity>
              </LinearGradient>
            </ImageBackground>
            <View style={{flex:1, borderBottomColor:'#fff', borderBottomWidth:2}}>
              <View style={{width:'100%', justifyContent:'space-evenly', flexDirection:'row'}}>
                <Image style={{width:95, height:95, borderRadius:50, borderWidth:2, borderColor:'#fff', marginTop:-50,marginLeft:30}} source={require('../../assets/images/temp/image2.jpg')} />
                <View style={{ justifyContent:'space-evenly', flexDirection:'row', flex:1}}>
                  <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>Following</Text>
                    <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>361</Text>
                  </View>
                  <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>Followers</Text>
                    <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>706</Text>
                  </View>
                </View>
              </View>
              <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly', paddingLeft:24}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>              
                <Text style={{color:'#fff', fontSize:15, fontWeight:'bold'}}>User name:</Text>                
                {this.state.isEditMode&&<TouchableOpacity style={{marginLeft:'auto', marginRight:20}} activeOpacity={0.7} onPress={()=>{
                  this.setState({isEditMode:false})
                }} >
                 <Text style={{fontSize:15, color:'#467fd7'}}>Done</Text>
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
  
