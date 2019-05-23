import React from 'react'
import {View, Text, ScrollView, Alert, ActivityIndicator} from 'react-native'
import {ListItem, Icon} from 'react-native-elements'
import {SQLite} from 'expo'
import {colors} from '../../shared/colors'

const db = SQLite.openDatabase('beninzik')

class YoutubeFavorites extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            videos : [],
            favorites :[],
            loading:true
        }
    }

    static navigationOptions = {
        title: 'Favoris'
    }

    fetchVideos() {
        fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
        .then(response => response.json())
        .then(data => this.setState({videos:data}))
        .then(() => this.getFavorites())
        .catch(err => console.log(err))
    }

    componentDidMount() {        

        this.fetchVideos()
        
    }

    componentWillUpdate () {
       // this.getFavorites()
    }

    getVideoObject(id) {
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
                        this.setState({favorites:results.rows._array, loading:false})
                        
                        
                    },
                    null
                )

            },

            null,
            null
            
        )
    }

    deleteFavorite(id) {

        db.transaction(
            tx => {
                tx.executeSql(
                    'delete from favorites where audioId = (?)',
                    [id],
                    () => {
                        Alert.alert('Favori supprimé!')
                        // this.getFavorites()
                    },
                    null
                )
            },
            null,
            null
        )
    }


    render (){

        const FavoritesAudios = () => {
            if(this.state.favorites.length > 0) {

                const Audios = () => this.state.favorites.map((favorite, i) => {

                    const audio = this.getVideoObject(favorite.audioId) 

                    return (
                        
                        <ListItem
                            key={i}
                            title={audio.title} 
                            
                            leftAvatar={{ source: { uri: 'https://i.ytimg.com/vi/'+ audio.videoId +'/0.jpg' } }}       
                            subtitle={audio.views + ' vues'}
                            bottomDivider={true}
                            chevron={
                                <Icon 
                                    type='font-awesome' 
                                    name='trash' 
                                    color={colors.primaryLight} 
                                    onPress={() => {
                                        this.deleteFavorite(audio.videoId) 
                                        this.getFavorites()
                                    }}

                                />
                            }
                            onPress={() => this.props.navigation.navigate('YoutubePlayer', {
                                videoInfos: audio
                            })}
                        />
                        
                    )
                    
                })

                return (
                    <View>
                        <Audios />
                    </View>
                    
                )
            } else {

                return (
                    <View>
                        <Text>Aucun favori!</Text>
                    </View>
                )
            }
        }

        if(this.state.loading) {

            return(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator />
                    <Text>Chargement en cours...</Text>
                </View>
                
            )

        } else {


        return (
            <ScrollView style={{padding:8}}>

                <View style={{marginTop:16}}>
                    <Icon 
                        type='font-awesome'
                        name='rotate-left'
                        color={colors.secondaryLight}
                        onPress={() => {
                            this.setState({loading:true})
                            
                            this.getFavorites()
                        }}
                        
                    />
                </View>

                <FavoritesAudios />
                    
            </ScrollView>
        )

        }

    }
}

export default YoutubeFavorites