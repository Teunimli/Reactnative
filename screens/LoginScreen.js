import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  state={
    username:"",
    password:"",
  }
    authenticate=(username,password)=>{

      if (username == 'test' && password == 'test'){
          this.props.navigation.navigate("Welcome")
      }else{
          alert(
              'Something went wrong',
              [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
          );
      }
    }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>BarrocIT</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Gebruikersnaam"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({username:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Wachtwoord"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>this.authenticate(this.state.username,this.state.password)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});