import React from 'react'
import {
    View, Text, Platform, StyleSheet
} from 'react-native'
import {colors} from '../shared/colors'

// Default Status Bar
const StatusBar = () => {
    return (
        <View style={styles.statusBar}>

        </View>
    )
    
}




class Main extends React.Component {

    render(){

        return(
            <View style={{flex:1, backgroundColor: colors.primaryLight}}>
                <StatusBar />
                <Text>Music App</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
        backgroundColor: colors.primaryDark,
    }
})

export default Main