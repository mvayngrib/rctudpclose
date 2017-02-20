/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import dgram from 'react-native-udp';

class rctudp extends Component {
  constructor(props) {
    super(props);

    this.state = { lines: [] };
    this.addLine = this.addLine.bind(this)
  }

  addLine(line) {
    this.setState({
      lines: [...this.state.lines, line]
    })
  }

  componentDidMount() {
    const socket = dgram.createSocket('udp4')
    socket.bind(12345, err => {
      if (err) throw err

      this.addLine('opened')

      socket.close(() => {
        this.addLine('closed')

        const socket = dgram.createSocket('udp4')
        socket.bind(12345, err => {
          if (err) throw err

          this.addLine('reopened')
        })
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.lines.map((line, index) => {
            return (
              <Text key={index} style={styles.welcome}>
                {line}
              </Text>
            );
          })}
        </ScrollView>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rctudp', () => rctudp);
