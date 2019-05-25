import React from 'react'
import { View, StyleSheet, Text, ScrollView, Slider, Alert } from 'react-native'
import {Button, Image} from 'react-native-elements'
import {colors} from '../shared/colors'
import {AdMobBanner} from 'expo'
import Ad from './AdComponent'


class Home extends React.Component {

    static navigationOptions = {
        title: 'Quiz Music Benin',
    }


    render (){
        
        return(
            <ScrollView>
                <Image
                    source={require('../assets/musicquiz.png')}
                    style={styles.logo}
                    />
                
                <Button
                    title= 'Jouer'
                    onPress={ () => {this.props.navigation.navigate('Game')} }
                    buttonStyle={styles.playButton}
                 />
                 <Button
                    title='A propos du jeu'
                    onPress={() => {this.props.navigation.navigate('About')} }

                    buttonStyle={styles.aboutButton}
                 />
                 {/*
                 <Text style={{margin:16, marginTop:32, fontSize: 16}}>
                    Testez vos connaisances sur la musique béninoise : 
                    
                </Text>
                 */}
                 <View style={{marginTop: 48}}>
                    <Ad />
                 </View>
 
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    logo : {  
                          
        alignSelf: 'center',
        

    },
    playButton: {
        width:150, 
        alignSelf: 'center', 
        margin: 16,
        backgroundColor:colors.secondary,
        
    },
    aboutButton:{
        width: 150,
        alignSelf: 'center',
        backgroundColor: colors.secondaryLight,
        opacity: 0.75
    }
    
})

export default Home