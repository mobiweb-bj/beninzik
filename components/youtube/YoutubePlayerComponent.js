import React from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import { Video } from 'expo'
import { VideoPlayer } from 'expo-video-player'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {  Icon, Text } from 'react-native-elements';
import {colors} from '../../shared/colors'

class YoutubePlayer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isPlaying: true,
        }
    }

    static navigationOptions = {
        title: 'Lecture Video'
    }

    componentWillUnmount () {
        this.stopPlayer()
    }

    async stopPlayer() {
        await this.player.stopAsync()
    }

    // handle Refs
    handlePlayerRef = ref => this.player = ref

    render (){
        let video = {
            title : 'Dibi Dobo - Veze Veze',
            image: 'https://i.ytimg.com/vi/MqRMAQMycFc/0.jpg',
            uri: 'https://mobiweb.bj/mobileapps/musicQuiz/medias/mp4/MqRMAQMycFc.mp4'
        }
 

        return(
            <ScrollView>
                
                <View style={styles.videoContainer}>
                    
                    <Video
                        ref={this.handlePlayerRef}
                        source={{ uri: video.uri }}
                        rate={1.0}
                        usePoster={true}
                        posterSource={{uri: video.image}}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={this.state.isPlaying}
                        isLooping={false}
                        style={{width: wp('95%'), height: 300, marginTop:10}}
                    />
                    
                    
                    <Text h4 style={{margin:10}}>
                        {video.title}
                    </Text>
                    
                    
                </View>
                <View style={{position:'absolute', top:250, left: 25 }}>
                    <Icon
                        type='font-awesome'
                        name={this.state.isPlaying ? 'pause' : 'play'}
                        color={colors.black}     
                        size={18}
                        raised                   
                        onPress={() => this.setState({isPlaying:!this.state.isPlaying})}
                    />
                </View>
                
                       
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    videoContainer: {
        width: wp('100%'), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 0.8,
        borderRadius: 0.5,
        borderColor: colors.black,
    }
})

export default YoutubePlayer