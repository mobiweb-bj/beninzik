import React from 'react'
import {View, ScrollView, Alert, CameraRoll } from 'react-native'
import { Audio, FileSystem, SQLite, Permissions, MediaLibrary } from 'expo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {  Icon, Text, Card, ListItem } from 'react-native-elements';
import {Grid, Row, Col} from 'react-native-easy-grid'
import {colors} from '../../shared/colors'

const soundObject = new Audio.Sound()

const db = SQLite.openDatabase('beninzik')

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
            favorites: [],
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
        // fetch audios datas
        this.fetchVideos()

        // connect to db / table
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists favorites (id integer primary key not null, audioId varchar(255))'
            )
        })         

    }

    
    componentWillUnmount () {
        this.stopAudio()
    }

    addfavorite(id) {
        db.transaction(tx => {
            tx.executeSql(
                'select * from favorites where audioId = (?)',
                [id],
                (tx, results) => {
                    if(results.rows.length > 0) {

                        Alert.alert('Déjà favori!')

                    } else {

                        tx.executeSql(
                            'insert into favorites (audioId) values (?)', 
                            [id],
                            (tx, results) => {
                                
                                Alert.alert('Ajouté aux favoris!')
                                this.getFavorites()

                            },
                            (tx, err) => Alert.alert('Erreur ajout aux favoris'),            
                        )
                    }
                
                },
                null
            )

        },
        null,
        null
        )
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

    async downloadAudio(id) {  
        
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if (status == 'granted') {

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
        
    }

    getVideoObject (id) {
        return this.state.videos.filter(v => (v.videoId == id))[0]
    }

    getFavorites() {
        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from favorites order by id desc',
                    [],
                    (tx, results) => {
                        // console.log(results.rows._array)
                        this.setState({favorites:results.rows._array})
                        
                    },
                    null
                )

            },

            null,
            null
            
        )
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
                    <AudioItem    
                        key={this.getVideoObject(r.id).videoId.toString()}                                           
                        audio={r}
                        listen={() => {
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
                                onPress={() => this.addfavorite(videoInfos.videoId)}
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