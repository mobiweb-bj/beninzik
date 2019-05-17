import React from 'react'
import {View, ScrollView } from 'react-native'
import { Audio, Video } from 'expo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {  Icon, Text, Card } from 'react-native-elements';
import {Grid, Row, Col} from 'react-native-easy-grid'
import {colors} from '../../shared/colors'

const soundObject = new Audio.Sound()

class YoutubePlayer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isAudioPlaying: false,
        }
    }

    static navigationOptions = {
        title: 'Lecture Musique'
    }

    componentDidMount() {
        
    }

    
    componentWillUnmount () {
        this.stopAudio()
    }


    async playAudio(id) {       
        
       if(!this.state.isAudioPlaying) {

            try {               
                await soundObject.loadAsync(
                    {uri: 'https://mobiweb.bj/mobileapps/musicQuiz/medias/mp3/'+id}, 
                    initialStatus={isLooping:false},
                    downloadFirst = true) 

                    await soundObject.playAsync()                
                                            
            } catch(e) {
                console.log('erreur music')
            }

       } else {

            this.stopAudio()

           // this.stopAudio()
       }
        

    }

    async pauseAudio() {
        try {
            await soundObject.pauseAsync()                       
                                       
        } catch(e) {
            console.log('erreur music')
        } 
    }

 

    async stopAudio() {

        try {
            await soundObject.unloadAsync()                       
                                       
        } catch(e) {
            console.log('erreur music')
        } 
    }
   

    render (){

        let defaultVideo = {
            title : 'Dibi Dobo - Veze Veze',
            image: 'https://i.ytimg.com/vi/MqRMAQMycFc/0.jpg',
            uri: 'https://mobiweb.bj/mobileapps/musicQuiz/medias/mp3/tWpRLUm2R9M'
        }

        const videoInfos = this.props.navigation.getParam('videoInfos', defaultVideo ) 

        return(
            <ScrollView>

                <Card 
                    image={{uri: 'https://i.ytimg.com/vi/'+ videoInfos.videoId +'/0.jpg'}} >                                                   
                
                    <Row>
                        <Text>
                            {videoInfos.title}
                        </Text>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Icon
                                type='font-awesome'
                                name={this.state.isAudioPlaying ? 'stop' : 'play'}
                                color={colors.primaryLight}
                                size={15}
                                raised
                                onPress={() => {
                                    this.playAudio(videoInfos.videoId)
                                    this.setState({isAudioPlaying:!this.state.isAudioPlaying})
                                }}
                            />
                        </Col>
                        <Col>
                            <Icon
                                type='font-awesome'
                                name='download'
                                color={colors.secondaryLight}
                                size={15}
                                raised
                            />
                        </Col>
                        <Col>
                            <Icon
                                type='font-awesome'
                                name='heart'
                                color='orange'
                                size={15}
                                raised
                            />
                        </Col>
                    </Row>
 
                </Card>
                       
            </ScrollView>
        )
    }
}



export default YoutubePlayer