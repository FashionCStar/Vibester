import React, {Component} from 'react';
import {View,  SafeAreaView, TextInput,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Button } from 'native-base';
import { GiftedChat , Actions, SystemMessage, Send } from 'react-native-gifted-chat'
const width = Dimensions.get("window").width
export default class Chat extends Component { 

  constructor (props) {
    super(props);
    this.state={
      messages: [],
    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

    render() {
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column',}}>            
            <View style={{flexDirection:'row', width:'100%',marginTop:10, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity activeOpacity={0.8} style={{position:'absolute', left:10}} onPress={()=>{
                  this.props.navigation.goBack(null);
              }}>
                <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
              </TouchableOpacity>
              <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{color:'#fff',fontWeight:'bold'}}>Best Friends</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                  <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#7738eb',}}/>
                  <Text style={{color:'#fff', marginLeft:5, fontWeight:'bold'}}>Jess Brown</Text>
                </View>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                  <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#7738eb',}}/>
                  <Text style={{color:'#fff', marginLeft:5, fontWeight:'bold'}}>Jess Brown</Text>
                </View>                
                <View style={{flexDirection:'column',alignItems:'center'}}>
                  <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:30, height:30, borderRadius:15, borderWidth:2, borderColor:'#7738eb',}}/>
                  <Text style={{color:'#fff', marginLeft:5, fontWeight:'bold'}}>Jess Brown</Text>
                </View>
              </View>
              </View>

              <TouchableOpacity activeOpacity={0.8} style={{position:'absolute', right:10}} onPress={()=>{
              
              }}>
                <Icon type={"FontAwesome"} name="edit" style={{color:'#fff', fontSize:20}} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1, width:'100%',}}>
              <GiftedChat
              alwaysShowSend={true}
              renderUsernameOnMessage={true}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                  _id: 1,
                }}
                renderSend={(props)=>{
                  return (
                        <Send
                            {...props}
                        >
                            <View style={{padding: 10, backgroundColor:'#000'}}>
                              <Icon type="MaterialCommunityIcons" name="send"  style={{color:'#08e'}}/>
                            </View>
                        </Send>
                    );
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
