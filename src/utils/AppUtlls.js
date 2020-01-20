import Toast from 'react-native-root-toast'; 

export default class AppUtils{ 

  static showToast = (text) => {
      Toast.show(text, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor:'#fff',
        textColor:'#000',
        animation: true,
        visible:true,
        delay:0,
        hideOnPress: true});
  }
  static validateEmail = (email) => {
   // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   var re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
}
}
  
