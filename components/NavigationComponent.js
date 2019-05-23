import React from 'react'
import Home from './HomeComponent'
import Game from './GameComponent'
import About from './AboutComponent'
import Membership from './MembershipComponent'
import Premium from './PremiumComponent'

// youtube
import YoutubeHome from './youtube/YoutubeHomeComponent'
import YoutubePlayer from './youtube/YoutubePlayerComponent'
import YoutubeSearch from './youtube/YoutubeSearchComponent'

import Radios from './RadiosComponent'

import {ScrollView, StyleSheet, View, Text, Image} from 'react-native'
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import {Icon} from 'react-native-elements'
import {colors} from '../shared/colors'

const YoutubeNavigator = createStackNavigator(
    {
        YoutubeHome: {
            screen: YoutubeHome, 
            navigationOptions: {
                title: 'BeninZik'
            },

        },
        YoutubePlayer: {
            screen: YoutubePlayer, 
            navigationOptions: ({navigation}) => ({
                headerLeft: <View style={{margin:7}}><Icon 
                    type='font-awesome'
                    name="arrow-left" size={24} 
                    color= 'white'
                    onPress={ () => navigation.goBack() } /></View> 
            })

        },
        YoutubeSearch:{
            screen: YoutubeSearch,
            navigationOptions: ({navigation}) => ({
                headerLeft: <View style={{margin:7}}><Icon 
                    type='font-awesome'
                    name="arrow-left" size={24} 
                    color= 'white'
                    onPress={ () => navigation.goBack() } /></View> 
            })
        }
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
                    onPress={ () => navigation.toggleDrawer() } /></View> ,
            headerRight: <View style={{margin:7}}>
                            <Icon type='font-awesome' color='white' name='search'
                                onPress={() => {navigation.navigate('YoutubeSearch')}}
                                />

                        </View>
        }),        
        initialRouteName: 'YoutubeHome'
    }
)

const HomeNavigator = createStackNavigator(
    {
        Home: {
            screen: Home, 

        },
        Game: {
            screen: Game,
            navigationOptions: ({navigation}) => ({
                headerLeft: <View style={{margin:7}}><Icon 
                    type='font-awesome'
                    name="arrow-left" size={24} 
                    color= 'white'
                    onPress={ () => navigation.goBack() } /></View> 
            })
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

const RadioNavigator = createStackNavigator(
    {
        Radios: {
            screen: Radios,            
        }
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
        BeninTube: {
            screen: YoutubeNavigator,
            navigationOptions: {
                title: 'BeninZik',
                drawerLabel: 'BeninZik',
                drawerIcon: () => (<Icon
                    type='font-awesome'
                    name='music'
                    />)
            }
        },
        
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

        Radios: {
            screen: RadioNavigator,
            navigationOptions: {
                title: 'Radio',
                drawerLabel: 'RadioZik',
                drawerIcon: () => (
                    <Icon type='font-awesome'
                        name='music'
                    />
                )
            }
        }
        
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
