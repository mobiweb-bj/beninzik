import React from 'react'
import {Audio } from 'expo'
import {View, Text, ActivityIndicator} from 'react-native'
import {Icon} from 'react-native-elements'
import {colors} from '../shared/colors'

const radioSoundObject = new Audio.Sound()

class Radio extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            loading:true,
            isAudioPlaying:true,
            audioStatus: '',
            audios:[],
            title: ''
        }
    }

    static navigationOptions = {
        title: 'RadioZik'
    }

    fecthVideos() {

        fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
        .then(response => response.json())
        .then(data => {
            this.setState({audios:data, loading:false})
            
        
        }).then(res => this.playAudio())
        
        .catch(err => console.log(err))
    }

    async playAudio() {

        if (!this.state.loading) {

            if(this.state.isAudioPlaying) {

                let randomIndex = Math.floor(Math.random() * this.state.audios.length)

            let randomAudio = this.state.audios.filter(audio => audio)[randomIndex]

            this.setState({title: randomAudio.title})
            
                try {               
                    await radioSoundObject.loadAsync(
                        {uri: 'https://mobiweb.bj/mobileapps/musicQuiz/medias/mp3/' + randomAudio.videoId + '.mp3'}, 
                        initialStatus={isLooping:false},
                        downloadFirst = true)
                        .then(async (status) => {

                            if(status.isLoaded) {

                                if(status.didJustFinish) {

                                    () => this.forceUpdate()
    
                                } else {
  
                                        await radioSoundObject.playAsync()

                                }

                            } else {

                                this.setState({title:'chargement chanson...'})
                                
                            }
                            
                        })


                                                
                } catch(e) {

                    console.log('erreur music')

                }
                
                  

            } else {

                this.stopAudio()
            }

            
            
        }        
    }

    async stopAudio() {

        await radioSoundObject.unloadAsync()
        /*
        try {
            await soundObject.unloadAsync()                       
                                       
        } catch(e) {
            console.log('erreur music')
        } 
        */
    }

    reload() {
        this.stopAudio()
        this.setState({loading:true, isAudioPlaying:true})
        this.fecthVideos()
    }

    componentWillUnmount () {
        
        this.stopAudio()
    }


    componentDidMount () {

        this.fecthVideos()        

    }

    render () {

        if(this.state.loading) {

            return(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator />
                    <Text>Chargement en cours...</Text>
                </View>
                
            )

        } else {

            return (

                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

                    
                    
                        <View style={{margin:8}}>
                            <Icon
                                type='font-awesome'
                                name='rotate-left'
                                color={ colors.secondaryLight }
                                size={30}
                                onPress={() => {

                                    this.reload()
                                    
                                }}
                                
                            />

                        </View>

                                      
                    
                    <View style={{margin:8}}>
                        <Icon
                            type='font-awesome'
                            name='sign-out'
                            color={colors.primaryLight}
                            size={30}
                            onPress={() => {  
                                this.stopAudio()                              
                                this.setState({isAudioPlaying:false})                                
                                this.props.navigation.navigate('YoutubeHome') 
                            
                            }}
                            
                        />
                    </View>

                    <Text>
                        {this.state.title}
                    </Text>
                    <Text>
                        {this.state.audioStatus}
                    </Text>

                    
                </View>
            )

        }

        
    }
}

export default Radio