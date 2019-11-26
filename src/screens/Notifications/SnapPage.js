import React, {Component} from 'react';
import {View,  SafeAreaView, TextInput,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Button } from 'native-base';
const width = Dimensions.get("window").width
export default class SnapPage extends Component { 

  constructor (props) {
    super(props);
    this.state={
    }
  }

    render() {
      const DATA=[1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,];
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column',}}>            
            <View style={{flexDirection:'row', width:'100%',marginTop:10, alignItems:'center', justifyContent:'center'}}>
              
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#7738eb',}}/>
                <Text style={{color:'#fff', marginLeft:5, fontWeight:'bold'}}>Jess Brown</Text>
              </View>

              <TouchableOpacity activeOpacity={0.8} style={{position:'absolute', right:10}} onPress={()=>{
                this.props.navigation.goBack();
              }}>
                <Text style={{color:'#fff', fontSize:20}}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, width:'100%',}}>
             <View style={{flex:1, marginVertical:20}}>
              <Image source={require('../../assets/images/temp/image3.jpg')} style={{width:'100%', height:'100%'}} />
             </View>
             <View style={{width:'100%', flexDirection:'row', justifyContent:'center', paddingHorizontal:20}}>
              <TextInput style={{borderWidth:1, borderColor:'#fff', color:'#fff', paddingVertical:0,flex:1,paddingHorizontal:10 }} placeholderTextColor="#fff" placeholder="Reply..."  />
              <TouchableOpacity>
                <Icon type="MaterialCommunityIcons" name="image-multiple" style={{color:'#fff'}}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon type="MaterialCommunityIcons" name="camera" style={{color:'#fff'}}/>
              </TouchableOpacity>
             </View>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
