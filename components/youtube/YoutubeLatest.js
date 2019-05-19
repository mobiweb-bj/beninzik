import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import {Card, Icon, Button, ListItem, Image} from 'react-native-elements'
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

            videos: []
        }
    }

    static navigationOptions = {
        title: 'Nouveautés'
    }

    fetchVideos() {
        fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
        .then(response => response.json())
        .then(data => this.setState({videos:data}))
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

        return (
            <ScrollView>
                
                <AudioItems />

            </ScrollView>
        )
    }
}

export default YoutubeLatest