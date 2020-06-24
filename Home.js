import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image } from 'react-native';

export default class Home extends React.Component {

  constructor() {
 
    super()
 
    this.state = {
 
      UserName: '',
      UserEmail: '',
      UserPassword: ''
 
    }
 
  }
 
UserRegistrationFunction = () =>{
  fetch('http://192.168.1.51/crm/login.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  
      name: this.state.UserName,
  
      email: this.state.UserEmail,
  
      password: this.state.UserPassword
  
    })
  
  }).then((response) => response.json())
        .then((responseJson) => {
          
          if(responseJson=="1"){
            //this.props.navigation.navigate('Email or Password cannot be empty!!');
            Alert.alert("Email or Password cannot be empty!!");
          } else if(responseJson=="0"){
            Alert.alert("User Not Exist!!!");
          } else{
            this.props.navigation.navigate('Dashboard',{ name:responseJson });
          }
          
        }).catch((error) => {
          console.error(error);
        });
 
}
 
  render() {
    return (
 
<View style={styles.MainContainer}>
        
 
        <Text style= {styles.title}>Login</Text>
 
        <TextInput
          placeholder="Email"
          onChangeText={email => this.setState({UserEmail : email})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          />
 
        <TextInput
          placeholder="Password"
          onChangeText={password => this.setState({UserPassword : password})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          secureTextEntry={true}
          />
 
        <Button title="Login" onPress={this.UserRegistrationFunction} color="#2196F3" />
      
  
 
</View>
            
    );
  }
}

const styles = StyleSheet.create({
 
MainContainer :{
 
  justifyContent: 'center',
  flex:1,
  margin: 10
},
 
TextInputStyleClass: {
 
  textAlign: 'center',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#2196F3',
  borderRadius: 5 ,
},
 
title:{
 
  fontSize: 22, 
  color: "#009688", 
  textAlign: 'center', 
  marginBottom: 15
}
 
});
