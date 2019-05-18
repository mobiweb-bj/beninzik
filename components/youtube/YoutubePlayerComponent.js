import React from 'react'
import {View, ScrollView, Alert, CameraRoll } from 'react-native'
import { Audio, FileSystem } from 'expo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {  Icon, Text, Card, ListItem } from 'react-native-elements';
import {Grid, Row, Col} from 'react-native-easy-grid'
import {colors} from '../../shared/colors'

const soundObject = new Audio.Sound()

const AudioItem = (props) => (

    <ListItem
                 
        title={props.audio.title}                        
        leftAvatar={{ source: { uri: 'https://i.ytimg.com/vi/'+ props.audio.id +'/0.jpg' } }}       
        subtitle={''}
        bottomDivider={true}
        chevron={
            <Icon type='font-awesome' name='music' color={colors.primaryLight} />
        }
        onPress={props.listen}
    />
)

class YoutubePlayer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            videos:[],
            isAudioPlaying: false,
            audioStatus: ''
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
                    {uri: 'https://mobiweb.bj/mobileapps/musicQuiz/medias/mp3/'+id+'.mp3'}, 
                    initialStatus={isLooping:false},
                    downloadFirst = true) 

                    await soundObject.playAsync()    
                    
                    this.setState({audioStatus: '[Lecture en cours...]'})
                                            
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

    downloadAudio(id) {

        let title = this.getVideoObject(id).title

        this.setState({audioStatus: '[Téléchargement en cours...]'})

        FileSystem.getInfoAsync(FileSystem.documentDirectory + 'beninzik')
            .then(res => {
                if(!res.exists) {
                    console.log('dossier n existe pas')
                    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'beninzik')
                }
            })

        FileSystem.downloadAsync(
            'http://mobiweb.bj/mobileapps/musicQuiz/medias/mp3/' + id + '.mp3',
            FileSystem.documentDirectory + 'beninzik/' + title +'.mp3'
          )
            .then(({ uri }) => {
              // Alert.alert('Téléchargement terminé ' + uri);
              Alert.alert('Téléchargement terminé! (Dossier DCIM : Media-Camera)' )
              this.setState({audioStatus: 'Téléchargement terminé...'})
            
              // save in camera roll
              CameraRoll.saveToCameraRoll(FileSystem.documentDirectory + 'beninzik/' + title +'.mp3', 'video')

            })
            .catch(error => {
              console.error(error);
            });
        
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
        
        const RelatedVideos = () => related.map((r) => {
            
            if(r != null && this.getVideoObject(r.id) != null) {
                
                return (
                    <View key={this.getVideoObject(r.id).id}>
                        <AudioItem    
                                                                           
                            audio={r}
                            listen={() => {
                                this.stopAudio()
    
                                this.props.navigation.push('YoutubePlayer', {
                                    videoInfos: this.getVideoObject(r.id)
                                })
                            }}
                        />  
                    </View>                                                         
                    
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
                
                    <Row style={{flexDirection:'column'}}>
                        <Text>
                            {videoInfos.title}

                        </Text>
                        <Text style={{color:colors.secondaryDark}}>
                            {this.state.audioStatus}
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
                                onPress={() => {
                                    this.downloadAudio(videoInfos.videoId)
                                }}
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