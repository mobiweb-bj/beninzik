import React from 'react'
import Home from './HomeComponent'
import Game from './GameComponent'
import About from './AboutComponent'
import Membership from './MembershipComponent'
import Premium from './PremiumComponent'

// youtube
import YoutubeHome from './youtube/YoutubeHomeComponent'

import {ScrollView, StyleSheet, View, Text, Image} from 'react-native'
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import {Icon} from 'react-native-elements'
import {colors} from '../shared/colors'

const HomeNavigator = createStackNavigator(
    {
        Home: {
            screen: Home, 

        },
        Game: {
            screen: Game,
        },
        About: {
            screen: About
        },
        Premium: {
            screen: Premium
        },
        Membership: {
            screen: Membership,
        },
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTitleStyle: {
                color: colors.defaultTextColor
            },
            headerLeft: <View style={{margin:7}}><Icon 
                    name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } /></View> 
            
        }),
        initialRouteName: 'Home'

    }
)

const YoutubeNavigator = createStackNavigator(
    {
        YoutubeHome: YoutubeHome
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTitleStyle: {
                color: colors.defaultTextColor
            },
            headerLeft: <View style={{margin:7}}><Icon 
                    name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } /></View> 
        })
    }
)

const drawerHeader = (props) => (
    <ScrollView>
      <SafeAreaView style={{flex:1, marginTop:-25}} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
            <Image source={require('../assets/logo.png')} style={styles.drawerImage} />
          </View>
          
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );

export const MainNavigator = createDrawerNavigator(
    {
        MusicQuiz: {
            screen: HomeNavigator,
            navigationOptions: {
                title: 'Music Quiz',
                drawerLabel: 'Music Quiz',
                drawerIcon: () => (<Icon
                    type='font-awesome'
                    name='music'
                    />)
            }
        },
        BeninTube: {
            screen: YoutubeNavigator,
            navigationOptions: {
                title: 'Benin Tube',
                drawerLabel: 'Benin Tube',
                drawerIcon: () => (<Icon
                    type='font-awesome'
                    name='play'
                    />)
            }
        },
    },
    {
        drawerBackgroundColor: colors.white,
        contentComponent: drawerHeader
    }
    
)

const styles = StyleSheet.create({
    drawerHeader : {
        height: 150,
        backgroundColor: colors.secondaryLight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerImage: {
        width:100,
        height: 100
    }
})
