/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TestBridge from './TestBridgeNativeView';
import TestModule from './TestModuleNativeModule';

export default class App extends Component {
    state = {
    nativeModuleText: null
  };

  componentWillMount() {
    TestModule.emitter.addListener('EXAMPLE_EVENT', ({ greeting }) =>
      this.setState(() => ({ nativeModuleText: greeting })),
    );
  }

  componentWillUnmount() {
    TestModule.emitter.remove()
  }

  onPress = () => {
    TestModule.exampleMethod();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <TestBridge exampleProp = "Hello World!" style={{width: 200, height: 200}} />
        <TouchableOpacity onPress={this.onPress}>
          <Text>Click me!</Text>
        </TouchableOpacity>
        <Text>
             {this.state.nativeModuleText}
        </Text>
      </View>
    );
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
