import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import {Card, Icon, Button, ListItem, Image} from 'react-native-elements'
import {Grid, Row, Col} from 'react-native-easy-grid'
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

const VideoItem = (props) => {
    return (
        <Card 
            image={{uri:'https://i.ytimg.com/vi/'+ props.video.videoId +'/0.jpg'}}        
                >
                
                    <Row>
                        <Text>
                            {props.video.title}
                        </Text>
                    </Row>
                
                    <Row>
                        <Col>
                            <Icon
                                type='font-awesome'
                                name='play'
                                color={colors.primaryLight}
                                size={15}
                                raised
                                onPress={props.watchVideo}
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
                        </Col>
                    </Row>
 
                </Card>
    )
}


class YoutubeHome extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            videos: []
        }
    }

    static navigationOptions = {
        title: 'Benin Tube'
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
        
        const VideoItems = () => this.state.videos.map(v => ( 
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
                
                <VideoItems />

            </ScrollView>
        )
    }
}

export default YoutubeHome