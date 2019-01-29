//  Created by react-native-create-bridge

import { NativeModules, NativeEventEmitter } from 'react-native'

const { TestModule } = NativeModules

const TestModuleEmitter = new NativeEventEmitter(TestModule);

export default {
  exampleMethod () {
    return TestModule.exampleMethod()
  },

  emitter: TestModuleEmitter,

  EXAMPLE_CONSTANT: TestModule.EXAMPLE_CONSTANT
}
