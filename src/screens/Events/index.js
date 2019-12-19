import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import Footer from '../common/Footer';
import Carousel from 'react-native-snap-carousel';
import FitImage from 'react-native-fit-image';
import Venue from '../common/Venue';

const width = Dimensions.get("window").width


export default class Events extends Component { 

  constructor (props) {
    super(props);
    this.state = {
      entries:[1,2,3,4,5,6,78,98,]
    }
  }

  _renderItem ({item, index}) {
    return (
        <View style={{borderRadius:20,}}>
          <Image source={require('../../assets/images/temp/image1.jpg')} style={{borderRadius:5, width:'100%', height:'100%'}} resizeMode={"cover"} />
        </View>
    );
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#000'}}>
        <SafeAreaView style={{flex:1, flexDirection:'column'}}>
        <View style={{width:'100%',marginVertical:5}}>
        
        <View style={{flexDirection:'row',alignItems:'center', alignSelf:'center' }}>
                <Icon type="Entypo" name="location-pin" style={{color:'#f00', fontSize:20}}/>
                <Text style={{fontSize:12, color:'#f7ba7b', fontWeight:'bold', marginLeft:5}}>London UK</Text>
              </View>  
              
            <View style={{flexDirection:'row', width:'100%', paddingHorizontal:10}}>       
            
              <View style={{flexDirection:'row',alignItems:'center', }}>
                <Icon type="FontAwesome" name="user-circle-o" style={{color:'#fff', fontSize:25}}/>
                <Text style={{fontSize:12, color:'#fff', fontWeight:'bold', marginLeft:5}}>Nnams Nwachuku</Text>
              </View>     
              <TouchableOpacity style={{marginLeft:'auto', marginRight:10}} activeOpacity={0.7} onPress={()=>{
              this.props.navigation.goBack(null);
            }}>
              <Text style={{fontSize:14, color:'#fff'}}>X</Text>
            </TouchableOpacity>
            </View>
        </View>
          <View style={{flex:1, width:'100%', alignItems:'center'}}>
            <Image style={{width:'100%', height:'100%', borderRadius:10}} source={require('../../assets/images/temp/image3.jpg')} resizeMode={"cover"} />
            
            <View style={{position:'absolute', bottom:10, right:10, alignItems:'center', flexDirection:'column',}}>
              <View style={{flexDirection:'row',alignItems:'center', }}>
                <Icon type="Feather" name="trending-up" style={{color:'#ccc', fontSize:18}}/>
                <Text style={{fontSize:16, color:'#fff',  marginLeft:5}}>275</Text>
              </View>
              <Text style={{fontSize:12, color:'#fff', fontWeight:'bold', marginLeft:5}}>Reach</Text>
            </View>
          </View>
          <View style={{width:'100%', height:width*0.4, paddingBottom:10}}>
            <Carousel
              enableSnap = {true}
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={width}
              itemWidth={width*0.4}
              loop = {true}
              loopClonesPerSide = {this.state.entries.length}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
  
