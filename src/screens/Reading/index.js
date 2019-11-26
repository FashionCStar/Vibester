import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,FlatList,Image,Text,TouchableOpacity,ImageBackground,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input, Button } from 'native-base';
import Footer from '../common/Footer';
import ReadingItem from '../common/ReadingItem';
import Carousel from 'react-native-snap-carousel';
import FitImage from 'react-native-fit-image';
import Venue from '../common/Venue';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import Search from './Search';
import Modal from "react-native-modal";


const width = Dimensions.get("window").width

export default class Reading extends Component { 

  constructor (props) {
    super(props);
    this.state = {
      isEditMode:false,
      showReportBtn:false,
      searchShow:false,
      searchValue:'',
      largeView:false,
    }
  }

    render() {

      let type = this.props.navigation.getParam("type","1"); //1 - mine, 2 - other

      return (
        <View style={{flex:1, backgroundColor:'#000', flexDirection:'column'}}>
          <Modal backdropOpacity={0.9}  animationIn={"zoomIn"} animationOut={"zoomOut"} isVisible={this.state.largeView} style={{padding:0, width:'100%', position:'absolute', top:0,bottom:0,right:0, margin:0}}  >
            <View style={{width:'100%', marginTop:'auto', marginBottom:'auto', flexDirection:'column'}}>
              <View style={{width:'100%',flexDirection:'row', paddingHorizontal:30}}>
                <Text style={{color:'#fff', fontSize:16}}>Events</Text>
                <TouchableOpacity style={{marginLeft:'auto', marginRight:10}} activeOpacity={0.7} onPress={()=>{
                  this.setState({largeView:false})
                }}>
                  <Text style={{fontSize:17, color:'#fff'}}>X</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={{flexDirection:'row', width:'100%',}} horizontal={true}>
                <ReadingItem width={width/1.3} />
                <ReadingItem width={width/1.3} />
                <ReadingItem width={width/1.3} />
                <ReadingItem width={width/1.3} />
                <ReadingItem width={width/1.3} />
              </ScrollView>
            </View>
          </Modal>
          <SafeAreaView style={{flex:1, width:'100%'}}>
            <View style={{flexDirection:'row', width:'100%',marginTop:10}}>
              <View style={{width:50}}>
              <TouchableOpacity activeOpacity={0.8} style={{marginLeft:10}} onPress={()=>{
                  this.props.navigation.goBack(null);
              }}>
                <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
              </TouchableOpacity>
              </View>
              <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                <Icon type={"Ionicons"} name="ios-pin" style={{color:'#fff',fontSize:20,}} />
                <Text style={{color:'#d98020', fontSize:17, marginLeft:10}}> 
                  Reading
                </Text>
              </View>
              <View style={{width:50}}></View>
            </View>
            <View style={{flex:1, flexDirection:'column', paddingTop:10, paddingHorizontal:5}}>
              <View style={{paddingHorizontal:25,}}>
                <SearchBar
                  containerStyle={{backgroundColor:'#000',padding:0, height:undefined }}
                  inputContainerStyle={{padding:0, margin:0,  backgroundColor:'#000', borderBottomWidth:1, borderColor:'#fff', borderWidth:1, margin:0, height:30}}
                  inputStyle={{padding:0, fontSize:14, margin:0,}}
                  leftIconContainerStyle={{paddingVertical:0,}}
                  placeholder="Search"
                  value = {this.state.searchValue}
                  onChangeText={(value)=>{
                    this.setState({searchValue:value})
                    if(value!=""&&!this.state.searchShow)
                    {
                      this.setState({searchShow:true});
                    }
                    if(value=="")
                    {
                      this.setState({searchShow:false});
                    }
                  }}
                />
              </View>
              <View style={{flex:1}}>
                {this.state.searchShow&&
                <View style={{height:'40%', position:'absolute', top:0, left:0, right:0, zIndex:20000}}>
                  <Search/>
                </View>}
                <ScrollView style={{flex:1, marginTop:20, flexDirection:'column'}}>
                  <Text style={{color:'#fff',fontSize:15,}}>Night Club</Text>
                  <ScrollView style={{flexDirection:'row', width:'100%',}} horizontal={true}>
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                  </ScrollView>
                  <Text style={{color:'#fff',fontSize:15,}}>Events</Text>
                  <ScrollView style={{flexDirection:'row', width:'100%',}} horizontal={true}>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                      this.setState({largeView:true})
                    }}>
                      <ReadingItem width={width/2.3}/>
                    </TouchableOpacity>
                    
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                  </ScrollView>
                  <Text style={{color:'#fff',fontSize:15,}}>Activities</Text>
                  <ScrollView style={{flexDirection:'row', width:'100%',}} horizontal={true}>
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                    <ReadingItem width={width/2.3} />
                  </ScrollView>
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
          <SafeAreaView style={{flex:0,}}>
            <Footer />
          </SafeAreaView>
        </View>
      );
    }
  }
  
