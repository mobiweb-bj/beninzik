import React from 'react'
import Home from './HomeComponent'
import Game from './GameComponent'
import About from './AboutComponent'
import { createStackNavigator } from 'react-navigation'
import {colors} from '../shared/colors'

export const HomeNavigator = createStackNavigator(
    {
        Home: {
            screen: Home, 

        },
        Game: {
            screen: Game,
        },
        About: {
            screen: About
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
            
        }),
        initialRouteName: 'Home'

    }
)
