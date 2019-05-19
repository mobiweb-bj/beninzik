import React from 'react'
import {View, Text} from 'react-native'

class YoutubeFavorites extends React.Component {

    static navigationOptions = {
        title: 'Favoris'
    }


    render (){
        return (
            <View>
                <Text>
                    Mes Favoris
                </Text>
            </View>
        )
    }
}

export default YoutubeFavorites