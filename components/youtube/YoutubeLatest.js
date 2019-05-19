import React from 'react'
import {ScrollView, View, Text, ActivityIndicator} from 'react-native'
import {Icon, ListItem} from 'react-native-elements'
import { colors } from '../../shared/colors';

const AudioItem = (props) => {
    return (
        <ListItem
            
            title={props.video.title} 
              
            leftAvatar={{ source: { uri: 'https://i.ytimg.com/vi/'+ props.video.videoId +'/0.jpg' } }}       
            subtitle={props.video.views + ' vues'}
            bottomDivider={true}
            chevron={
                <Icon type='font-awesome' name='music' color={colors.primaryLight} />
            }
            onPress={props.listen}
        />
    )
}


class YoutubeLatest extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading:true,
            videos: []
        }
    }

    static navigationOptions = {
        title: 'Nouveautés'
    }

    fetchVideos() {
        fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
        .then(response => response.json())
        .then(data => this.setState({videos:data, loading:false}))
        .catch(err => console.log(err))
    }

    componentWillMount() {
        this.fetchVideos()
    }

    render() { 
        
        const AudioItems = () => this.state.videos.slice(0, 50).map(v => ( 
            <View style={{marginTop:25}} key={v.id}> 

                <AudioItem
                    
                    video={v}
                    listen={() => this.props.navigation.navigate('YoutubePlayer', {
                        videoInfos : v
                    })}
                />                
  
            </View>       
        ))

        if(this.state.loading) {

            return(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator />
                    <Text>Chargement en cours...</Text>
                </View>
                
            )

        } else {

            return (
            
                <ScrollView>
                    
                    <AudioItems />
    
                </ScrollView>
            )

        }

        
    }
}

export default YoutubeLatest