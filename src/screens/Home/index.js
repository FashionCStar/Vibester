import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import Footer from '../common/Footer';
import Carousel from 'react-native-snap-carousel';
import FitImage from 'react-native-fit-image';
import Venue from '../common/Venue';

const width = Dimensions.get("window").width


export default class Home extends Component { 

  constructor (props) {
    super(props);
    this.state = {
      entries:[1,2,3,4,5,6,78,98,]
    }
  }

  _renderItem ({item, index}) {
    return (
        <View style={{borderRadius:20,}}>
          <Image source={require('../../assets/images/temp/image1.jpg')} style={{borderRadius:20, width:'100%', height:'100%'}} resizeMode={"contain"} />
        </View>
    );
    }
    render() {
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column'}}>
            <View style={{flex:1,}}>
              <View style={{width:'100%',paddingHorizontal:10, paddingVertical:5, flexDirection:'row'}}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                  NavigationService.navigate("AddItemScreen");
                }}>
                  <Icon type={"AntDesign"} name="plus" style={{color:'#fff', fontSize:15}}/>
                </TouchableOpacity>
                <View style={{flexDirection:'row', marginLeft:'auto'}}>
                  <TouchableOpacity>
                    <Icon type={"FontAwesome"} name="bell-o" style={{color:'#e2e2e2', fontSize:20}}/>
                    <View style={{width:12, height:12, backgroundColor:'#e20f00', alignItem:'center', justifyContent:'center', alignContent:'center', position:'absolute', top:0, right:-4, borderRadius:7}}>
                        <Text style={{color:'#fff', fontSize:9, textAlign:'center'}}>4</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft:30}}>
                    <Icon type={"FontAwesome"} name="filter" style={{color:'#e2e2e2', fontSize:20}}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{width:'100%', flex:1, flexDirection:'column'}}>
                <View style={{width:'100%', height:40, }}>
                <ScrollView style={{flexDirection:'row',}} showsHorizontalScrollIndicator={false} horizontal={true} >
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#7738eb',}}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Local{"\n"}stories</Text>
                  </View>
                  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#f5a44d',}}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Jess S{"\n"}10k Impressions</Text>
                  </View>
                  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#f5a44d',}}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Jess S{"\n"}10k Impressions</Text>
                  </View>
                  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#f5a44d',}}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Jess S{"\n"}10k Impressions</Text>
                  </View>
                  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#f5a44d', }}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Jess S{"\n"}10k Impressions</Text>
                  </View>
                  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#f5a44d',}}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Jess S{"\n"}10k Impressions</Text>
                  </View>
                  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#f5a44d',}}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Jess S{"\n"}10k Impressions</Text>
                  </View>
                  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#f5a44d',}}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Jess S{"\n"}10k Impressions</Text>
                  </View>
                  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
                    <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#f5a44d',}}/>
                    <Text style={{color:'#fff', marginLeft:5,}}>Jess S{"\n"}10k Impressions</Text>
                  </View>
                </ScrollView>
                 
                </View>
                <View style={{flex:1, width:'100%',}}>
                    <Carousel
                      enableSnap = {true}
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.entries}
                      renderItem={this._renderItem}
                      sliderWidth={width}
                      itemWidth={width*0.5}
                      loop = {true}
                      loopClonesPerSide = {this.state.entries.length}
                    />
                    <Text style={{color:'#fff', fontSize:12, position:'absolute', bottom:0, left:10,}}>Venues</Text>
                  </View>                  
                <View style={{flex:2,}}>
                  <ScrollView style={{width:'100%'}}>
                    <Venue />
                    <Venue />
                    <Venue />
                    <Venue />
                  </ScrollView>
                </View>
              </View>
            </View>
            <Footer />
          </SafeAreaView>
        </View>
      );
    }
  }
  
