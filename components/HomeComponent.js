import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {Button, Image} from 'react-native-elements'
import {colors} from '../shared/colors'
import TrackPlayer from 'react-native-track-player';

class Home extends React.Component {

    static navigationOptions = {
        title: 'Quiz Music Benin',
    }

    componentDidMount() {
        // Creates the player
        TrackPlayer.setupPlayer().then(async () => {
        
            // Adds a track to the queue
            await TrackPlayer.add({
                id: 'trackId',
                url: require('../assets/audio/rabbislo.mp3'),
                title: '',
                artist: ''
                
            });
        
            // Starts playing it
            TrackPlayer.play();
        
        });

        return
    }

    render (){
        return(
            <View>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    />
                
                <Button
                    title= 'Jouer'
                    onPress={ () => {this.props.navigation.navigate('Game')} }
                    buttonStyle={styles.playButton}
                 />
                 <Button
                    title='A propos du jeu'
                    onPress={() => {}}
                    buttonStyle={styles.aboutButton}
                 />
                 {/*
                 <Text style={{margin:16, marginTop:32, fontSize: 16}}>
                    Testez vos connaisances sur la musique béninoise : 
                    devinez les artistes et les titres des chansons en écoutant des extraits de musique.
                </Text>
                 */}
 
            </View>
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