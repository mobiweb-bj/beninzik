import React from 'react'
import {MainNavigator} from  './NavigationComponent'

import {
    View, Platform, StyleSheet
} from 'react-native'
import {colors} from '../shared/colors'
import { createAppContainer } from 'react-navigation'


class Main extends React.Component {

    render(){

        const MainContainer = createAppContainer(MainNavigator)

        return(
            <View style={{flex:1, backgroundColor: colors.primaryLight}}>
                {/* Status Bar style*/ }
                <View style={styles.statusBar}>
                </View> 

                <MainContainer />           
                
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