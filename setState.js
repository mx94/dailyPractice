import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { NavBar, Icon, Button } from 'antd-mobile';

class demoRN extends Component {
    constructor() {
        super();
        this.state = {
            text: 0
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        await this.setStateAsync({text: this.state.text + 1})
        console.log(this.state.text)
        await this.setStateAsync({text: this.state.text + 1})
        console.log(this.state.text)
    }

    render() {
        return (
            <Button>{this.state.text}</Button>
        )
    }
}

AppRegistry.registerComponent('demoRN', () => demoRN);