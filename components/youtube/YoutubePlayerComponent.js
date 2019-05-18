import React from 'react'
import {View, ScrollView, Alert } from 'react-native'
import { Audio, Video } from 'expo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {  Icon, Text, Card, ListItem } from 'react-native-elements';
import {Grid, Row, Col} from 'react-native-easy-grid'
import {colors} from '../../shared/colors'

const soundObject = new Audio.Sound()

class YoutubePlayer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            videos:[],
            isAudioPlaying: false,
        }
    }

    static navigationOptions = {
        title: 'Lecture Musique'
    }

    fetchVideos() {
        fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
        .then(response => response.json())
        .then(data => this.setState({videos:data}))
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchVideos()
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

    getVideoObject (id) {
        return this.state.videos.filter(v => (v.videoId == id))[0]
    }
   

    render (){

        let defaultVideo = {
            title : 'Dibi Dobo - Veze Veze',
            image: 'https://i.ytimg.com/vi/MqRMAQMycFc/0.jpg',
            uri: 'https://mobiweb.bj/mobileapps/musicQuiz/medias/mp3/tWpRLUm2R9M'
        }

        const videoInfos = this.props.navigation.getParam('videoInfos', defaultVideo ) 
        const related = JSON.parse(videoInfos.related)

        // console.log(related[0].title + ' - ' + related[0].id)

        var i = 0;
        
        const RelatedVideos = (props) => related.map((r) => {
            i++;
            if(r != null && this.getVideoObject(r.id) != null) {
                
                return (
                    
                    <ListItem
                        key={i}              
                        title={r.title}                        
                        leftAvatar={{ source: { uri: 'https://i.ytimg.com/vi/'+ r.id +'/0.jpg' } }}       
                        subtitle={''}
                        bottomDivider={true}
                        chevron={
                            <Icon type='font-awesome' name='music' color={colors.primaryLight} />
                        }
                        onPress={()=> { 
                            this.stopAudio()

                            this.props.navigation.push('YoutubePlayer', {
                                videoInfos: this.getVideoObject(r.id)
                            })

                        }}
                    />
                    
                    
                )
            } else {
                return (
                    <View>

                    </View>
                )
            }
        })
        

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
                <View style={{marginTop:50}}>

                    <Card title='Musiques similaires'>

                        <RelatedVideos />        

                    </Card>
                </View>
                
                       
            </ScrollView>
        )
    }
}



export default YoutubePlayer