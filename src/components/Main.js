import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import MainScreen from './MainScreen';
import SimplePlayerScreen from './SimplePlayerScreen';
import MoreOptionsPlayerScreen from './MoreOptionsPlayerScreen';

export default class Main extends Component {
    constructor() {
        super();
    }

    render() {
	    return (
            <Router>
                <Scene key="root">
                    <Scene key="mainScreen"
                    component={MainScreen}
                        animation='fade'
                    hideNavBar={true}
                    initial={true}
                    />

                    <Scene key="simplePlayerScreen"
                    component={SimplePlayerScreen}
                    animation='fade'
                    hideNavBar={true}
                    />
                    <Scene key="moreOptionsPlayerScreen"
                    component={MoreOptionsPlayerScreen}
                    animation='fade'
                    hideNavBar={true}
                    />
                </Scene>
            </Router>
	    );
	}
}