jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js')

import * as ReactNative from 'react-native';

class RNIterableAPIMock {
  static email?: string
  static userId?: string

  static getEmail(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve(RNIterableAPIMock.email)
    })
  }

  static setEmail(email?: string) {
    RNIterableAPIMock.email = email
  }

  static getUserId(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve(RNIterableAPIMock.userId)
    })
  }

  static setUserId(userId?: string) {
    RNIterableAPIMock.userId = userId
  }
}

jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      // Mock RNIterableAPI
      NativeModules: {
        ...ReactNative.NativeModules,
        RNIterableAPI: RNIterableAPIMock,
      },
    },
    ReactNative,
  );
});
