import React from 'react'
import {View, Text, WebView, ActivityIndicator} from 'react-native'

class Membership extends React.Component {

    static navigationOptions = {
        title: 'Paiement Premium'
    }



    render() {
        return (
            
            <WebView
                startInLoadingState={true}
                renderLoading={() => (<View style={{marginTop:64}}><ActivityIndicator /></View>)}
                originWhitelist={['*']}
                source={{uri: 'https://mobiweb.bj/mobileapps/musicQuiz/index.html'}}
            />
            
        ) 
    }
}

export default Membership