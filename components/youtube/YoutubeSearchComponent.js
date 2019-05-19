import React from 'react'
import {View, Text} from 'react-native'

class YoutubeSearch extends React.Component {

    static navigationOptions = {
        title: 'Recherche chanson/artiste'
    }

    render () {

        return (
            <View>
                <Text>
                    Recherche chanson/artiste
                </Text>
            </View>
        )
    }
}

export default YoutubeSearch