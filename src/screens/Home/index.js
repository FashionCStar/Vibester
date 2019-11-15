import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Platform,Text,TouchableOpacity,Linking} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import Footer from '../common/Footer';

export default class Home extends Component { 
    render() {
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column'}}>
            <View style={{flex:1,}}>
              <View style={{width:'100%',paddingHorizontal:10, paddingVertical:5}}>
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
              <View style={{width:'100%'}}>
                <ScrollView style={{flexDirection:'row'}} showsHorizontalScrollIndicator={false}>
                  
                </ScrollView>
              </View>
            </View>
            <Footer />
          </SafeAreaView>
        </View>
      );
    }
  }
  
