import React, {Component} from 'react';
import {View,  SafeAreaView, ImageBackground,StatusBar,Image,Platform,Text,TouchableOpacity,Linking} from 'react-native';
import NavigationService from '../../NavigationService'

export default class Footer extends Component { 
    render() {
        return (
        <View style={{backgroundColor:'#000', flexDirection:'row', paddingHorizontal:8, paddingVertical:8,}}>
            <View style={{flex:1,}}>
                <TouchableOpacity activeOpacity={0.7} style={{ marginRight:'auto'}} onPress={()=>{NavigationService.navigate("Home")}}>
                    <Image source={require('../../assets/images/footer_home.png')} style={{width:29, height:29,}} resizeMode={"contain"} />
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity activeOpacity={0.7} style={{ marginRight:'auto'}} onPress={()=>{NavigationService.navigate("Profile")}}>
                    <Image source={require('../../assets/images/footer_profile.png')} style={{width:29, height:29,}} resizeMode={"contain"} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                NavigationService.navigate("Camera");
            }}>
                <Image source={require('../../assets/images/footer_camera.png')} style={{width:29, height:29,}} resizeMode={"contain"} />
            </TouchableOpacity>
            <View style={{flex:1}}>
                <TouchableOpacity activeOpacity={0.7} style={{ marginLeft:'auto'}}  onPress={()=>{NavigationService.navigate("Reading")}}>
                    <Image source={require('../../assets/images/footer_location.png')} style={{width:29, height:29,}} resizeMode={"contain"} />
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity activeOpacity={0.7} style={{ marginLeft:'auto'}} onPress={()=>{NavigationService.navigate("Vibes")}}>
                    <Image source={require('../../assets/images/footer_chatroom.png')} style={{width:29, height:29,}} resizeMode={"contain"} />
                    <View style={{width:15, height:15, backgroundColor:'#e20f00', alignItem:'center', justifyContent:'center', alignContent:'center', position:'absolute', top:0, right:-4, borderRadius:7}}>
                        <Text style={{color:'#fff', fontSize:11, textAlign:'center'}}>4</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}
  
