/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import TestBridge from './TestBridgeNativeView';
import TestModule from './TestModuleNativeModule';
import { WebView } from "react-native-webview";

export default class App extends Component {
    state = {
    nativeModuleText: null,
    seeWebView:false,
  };

  componentWillMount() {
   /* TestModule.emitter.addListener('EXAMPLE_EVENT', ({ greeting }) =>
    this.setState(() => ({ nativeModuleText: greeting,seeWebView:false }),()=>{
      console.log("Test Module =>"+this.state.nativeModuleText);
    }),
  );*/  
  }

  componentWillUnmount() {
    TestModule.emitter.remove()
  }

  openWebView = () => {
    TestModule.emitter.addListener('EXAMPLE_EVENT', ({ greeting }) =>
     this.setState(() => ({ nativeModuleText: greeting,seeWebView:true }),()=>{
       console.log("Test Module =>"+this.state.nativeModuleText);
     }),
   );
    TestModule.exampleMethod();
    console.log("React Method Call 1111=> "+TestModule.exampleMethod());
  };

  render() {
    if(this.state.seeWebView !== true){
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <TestBridge exampleProp = "Hello World!" style={{width: 200, height: 200}} />
          <TouchableOpacity onPress={this.openWebView}>
            <Text>Click me!</Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      return (
        <WebView
        source={{ uri: this.state.nativeModuleText}}
        style={{marginTop: 35}}
      />
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
