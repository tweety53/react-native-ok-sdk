import React, {Component} from 'react'
import LoggedInScreen from './LoggedInScreen'
import LogInScreen from './LogInScreen'
import OkManager from 'react-native-ok-sdk'

class App extends Component {

    state = {
        auth: null
    }

    componentWillMount() {
        console.log('App will mount')
        OkManager.initialize('1247442432', 'CBAHHLFLEBABABABA')
    }

    render() {
        if (this.state.auth)
            return <LoggedInScreen auth={ this.state.auth } onAuth={ this.onAuth } />
    
        return <LogInScreen onAuth={ this.onAuth }/>
    }

    onAuth = auth => {
        this.setState({auth})
    };
}

export default App