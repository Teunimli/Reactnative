import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
countDown = 3

    componentDidMount=()=> {
        this.countDownTimer()
    }

    countDownTimer=()=> {
        if (this.countDown > 0) {
          setTimeout(() => {
            this.countDown -= 1
            this.countDownTimer()
          }, 1000)
        }
        if (this.countDown === 0) {
            this.props.navigation.navigate("Home")
        }
      }
    
    render(){
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Welkom test</Text>
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
});