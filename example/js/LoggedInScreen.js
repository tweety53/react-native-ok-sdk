import React, {Component, PropTypes} from 'react'
import { View, Text } from 'react-native'
import Button from 'apsl-react-native-button'
import OkManager from 'react-native-ok-sdk'
import styles from './styles'

export default class LoggedInScreen extends Component {
    static propTypes = {
        auth: PropTypes.object,
        onAuth: PropTypes.func
    };

    render() {
        return (
          <View style={ styles.container }>
            <DataRow data={ this.props.auth } field="user"/>  
            <DataRow data={ this.props.auth } field="access_token"/>  
            <DataRow data={ this.props.auth } field="session_secret_key"/>  
            <Button style={ styles.button } onPress={ this.onLogout }>{'Log out'}</Button>
          </View>
        )
    }

    onLogout = () => {
        OkManager.logout()
          .then(() => {
              console.log('Logged out')
              this.props.onAuth(null)
          })
    };
}

class DataRow extends Component {
    static propTypes = {
        field: PropTypes.string,
        data: PropTypes.object
    };

    render() {
        let value = this.props.data[this.props.field]
        if (typeof value === 'object')
            value = JSON.stringify(value)

        return (
          <View style={ styles.dataContainer }>
            <View style={ styles.headerRow }>
              <Text>{ this.props.field }</Text>
            </View>
            <View style={ styles.dataRow }>
              <Text>{ value }</Text>
            </View>
          </View>
        )
    }
}