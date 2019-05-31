import React from 'react'
import {ScrollView, View, Text, ActivityIndicator, NetInfo, Alert} from 'react-native'
import {Icon, ListItem} from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import Ad from '../AdComponent'
import { colors } from '../../shared/colors'

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
        .then(data => {
            this.setState({videos:data, loading:false})
            console.log(data.length)
        })
        .catch(err => console.log(err))
    }
    

    componentDidMount() {

        NetInfo.getConnectionInfo()
            .then((connectionInfo) => {
               // console.log('Initial, type: ' + connectionInfo.type )

               if(connectionInfo.type != 'none') {
                    this.fetchVideos()
               } else {
                    Alert.alert('Aucune connexion internet détectée')
               }
            })

        
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
                    <View style={{marginBottom:16}}>
                        <Icon 
                            type='font-awesome'
                            name='rotate-left'
                            color={colors.secondaryLight}
                            onPress={() => {
                                this.setState({loading:true})
                                this.fetchVideos()
                            }}
                            
                        />
                   </View>

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
                                this.fetchVideos()
                            }}
                            
                        />
                   </View>

                   <View style={{marginTop: 16}}>
                        <Ad />
                    </View>
                    
                    <Animatable.View animation='zoomIn' duration={1000} delay={1000}>
                        <AudioItems />
                    </Animatable.View>
                    

                    <View style={{marginTop: 16, marginBottom:16}}>
                        <Ad />
                    </View>

    
                </ScrollView>
            )

        }

        
    }
}

export default YoutubeLatest