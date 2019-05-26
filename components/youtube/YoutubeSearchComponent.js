import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import Ad from '../AdComponent'
import {SearchBar, ListItem, Icon} from 'react-native-elements'
import { colors } from '../../shared/colors';


class YoutubeSearch extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            searchText: '',
            audios: []
        }
    }

    static navigationOptions = {
        title: 'Recherche chanson/artiste'
    }

    fetchVideos() {
        fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
        .then(response => response.json())
        .then(data => this.setState({audios:data}))
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchVideos()
    }

    searchAudio(text) {        

        if(this.state.searchText.length > 2) {
            

            let results = this.state.audios.filter(audio => {

                let lowerAudioTitle = audio.title.toLowerCase()
                let lowerSearch = this.state.searchText.toLowerCase() 

                return lowerAudioTitle.includes(lowerSearch)
            })

            return results           

        }

        else return null
    }

    render () {

        const SearchResults = () => {

            if(this.searchAudio() == 0 || this.searchAudio() == null){

                return (<Text>Aucun résultat!</Text>)

            } else {

                const Audios = () => this.searchAudio().map(audio => (
                    <ListItem
                        key={audio.id}
                        title={audio.title} 
                        
                        leftAvatar={{ source: { uri: 'https://i.ytimg.com/vi/'+ audio.videoId +'/0.jpg' } }}       
                        subtitle={audio.views + ' vues'}
                        bottomDivider={true}
                        chevron={
                            <Icon type='font-awesome' name='music' color={colors.primaryLight} />
                        }
                        onPress={() => this.props.navigation.navigate('YoutubePlayer', {
                            videoInfos: audio
                        })}
                    />
                ))

                return (
                    <View>
                        <Text>{this.searchAudio().length} resultats.</Text>
                        <Audios />
                    </View>
                    
                )
            }
        }

        return (
            <ScrollView style={{padding:8}}>
                <View>
                    <SearchBar
                        round
                        placeholder='Entrer un titre ou chanteur'
                        onChangeText={(text) => {
                            this.setState({searchText:text})
                            this.searchAudio(text)
                        }}
                        value={this.state.searchText}
                        containerStyle={{backgroundColor:colors.secondaryDark, borderColor:colors.secondaryDark}}
                        inputContainerStyle={{backgroundColor:'white', borderWidth:0}}
                    />
                </View>

                <View style={{marginTop: 16}}>
                    <Ad />
                 </View>
                
                <View style={{marginTop:16}}>

                    <SearchResults />

                </View>

            </ScrollView>
        )
    }
}

export default YoutubeSearch