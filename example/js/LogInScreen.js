import React from 'react'
import { View } from 'react-native'
import Button from 'apsl-react-native-button'
import OkManager, { Scopes } from 'react-native-ok-sdk'
import styles from './styles'

class LogInScreen extends React.Component {
    static propTypes = {
        onAuth: React.PropTypes.func
    };

    render() {
        return (
          <View style={ styles.container }>
            <Button style={ styles.button } onPress={ this.onLogin }>{'Log In'}</Button>
          </View>
        )
    }

    onLogin() {
        OkManager.login([Scopes.VALUABLE_ACCESS])
      .then(
        response => {
            console.log('OK Login', response)
            this.props.onAuth(response)
        }
          )
          .catch(err => {
              console.log('OK Login error', err)
          })
    }
}

export default LogInScreen