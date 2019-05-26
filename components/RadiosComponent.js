import React from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Ad from './AdComponent'
import {Audio, KeepAwake } from 'expo'
import {Icon} from 'react-native-elements'
import {colors} from '../shared/colors'

const soundObject = new Audio.Sound();

class Radios extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            audios: [],
            favorites: [],
            loading:true,
            isAudioPlaying:true,
            title:''
        }
    }

    static navigationOptions = {
        title: 'RadioZik'
    }

    fecthVideos() {

        fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
        .then(response => response.json())
        .then(data => {
            this.setState({audios:data, loading:false, isAudioPlaying:true})            
        
        }).then(res => this.playAudio())
        
        .catch(err => console.log(err))
    }

    _onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {
          // Update your UI for the unloaded state
          console.log('loading')

          if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
          }
        } else {
          // Update your UI for the loaded state 

            if (playbackStatus.isPlaying) {
                // Update your UI for the playing state

                if(!this.state.isAudioPlaying){
                    // console.log('pause audio here')
                    soundObject.stopAsync()
                }
                
            } else {
                // Update your UI for the paused state
            }
        
            if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
            }
        
            if (playbackStatus.didJustFinish) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
                console.log('end music')
                soundObject.unloadAsync()
                this.setState({loading:true, isAudioPlaying:true})
                this.fecthVideos()
                
            }
        }
      };

    componentDidMount (){       

        this.fecthVideos()

    }

    async playAudio() {

        let randomIndex = Math.floor(Math.random() * this.state.audios.length)
        let randomAudio = this.state.audios.filter(audio => audio)[randomIndex]
        this.setState({title: randomAudio.title})

        soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate)
        await soundObject.loadAsync(
            {uri:'https://mobiweb.bj/mobileapps/musicQuiz/medias/mp3/'+ randomAudio.videoId + '.mp3'}, 
            initialStatus={shouldPlay:this.state.isAudioPlaying, isLooping:false}, 
            downloadFirst=true
        )

        /*
        Audio.Sound.createAsync(
            { uri: 'https://mobiweb.bj/mobileapps/musicQuiz/medias/mp3/'+ randomAudio.videoId + '.mp3' }, 
              initialStatus = {shouldPlay:this.state.isAudioPlaying, isLooping:false}, 
              onPlaybackStatusUpdate = this._onPlaybackStatusUpdate,
              downloadFirst = true)
        */
    }

    render () {     
        
        if(this.state.loading){
            return(
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <ActivityIndicator />
                    <Text>Chargement en cours...</Text>
                </View>                
            )
        } else {
            return (
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <KeepAwake />
                    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite">
                        {this.state.title}
                    </Animatable.Text>
                    <View style={{margin:16}}>
                        
                        <Icon
                            type='font-awesome'
                            name='rotate-left'
                            color={ colors.secondaryLight }
                            size={30}
                            onPress={() => { 
                                this.setState({
                                    audios: [],
                                    favorites: [],
                                    loading:true,
                                    isAudioPlaying:false,
                                    title:''})

                                    soundObject.unloadAsync()
                                                                  
                                this.fecthVideos()                           
                            }}
                        />
                        
                    </View>
                    <View style={{margin:16}}>
                        <Icon
                            type='font-awesome'
                            name='sign-out'
                            color={colors.primaryLight}
                            size={30}
                            onPress={async () => {
                                this.setState({isAudioPlaying:false})
                                
                                this.props.navigation.navigate('YoutubeHome')
                            }}
                        />
                    </View>
                    <View style={{marginTop: 32}}>
                    <Ad />
                 </View>
                </View>
            )
        }
        

        
    }

}


  export default Radios