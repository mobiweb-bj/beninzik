import React from 'react'
import YoutubeLatest from './YoutubeLatest'
import YoutubeFavorites from './YoutubeFavorites'
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import {Icon, ListItem} from 'react-native-elements'
import { colors } from '../../shared/colors';


const YoutubeHome = createMaterialTopTabNavigator (
    {
        YoutubeLatest: YoutubeLatest,
        YoutubeFavorites: YoutubeFavorites
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarOptions: {
                style: {
                    backgroundColor: colors.secondaryDark,
                    
                }
            }

        })
    }
)

export default createAppContainer(YoutubeHome)