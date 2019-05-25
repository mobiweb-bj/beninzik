import React from 'react'
import {Share} from 'react-native'
// Native Base imports
import {Container, Content, Text, Toast} from 'native-base'
import {Button} from 'react-native-elements'
import {Grid, Row, Col} from 'react-native-easy-grid'
import {colors} from '../shared/colors'


class About extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            premiumModal : false
        }
    }

    static navigationOptions = {
        title: 'En savoir plus'
    }

    render() {
        return (
            <Container>

                <Row>
                    <Text style={{padding:16}}  >
                        Testez vos connaisances sur la musique béninoise : 
                        Devinez les artistes et les titres des chansons en 
                        écoutant des extraits de musique.</Text>                        
                </Row>
                <Row style={{flex:1, flexDirection:'column', alignItems: 'center'}}>
                    <Button
                        title='Jouer'
                        buttonStyle={{margin:8, backgroundColor:colors.primaryDark, width:150}}
                        onPress={() => {
                            this.props.navigation.navigate('Game')
                        }}
                    />
                
                
                    <Button
                        title='Défier un ami'
                        buttonStyle={{margin: 8, backgroundColor:colors.secondary, width:150}}
                        onPress={async () => {

                            let msg = 'Viens tester tes connaissances sur la musique béninoise avec l\'application Quiz BeninZik.\n\n\n Devine les artistes et titres de chansons en écoutant des extraits de musique.\n\n\n';
                            let url = 'http://mobiweb.bj'

                            await Share.share(
                                {
                                message: msg + '' + url,
                                title: 'Quiz BeninZik',
                                
                                url:url
                                },
                                {
                                    dialogTitle: 'Quiz BeninZik'
                                }
                            )
                        }}
                    />
                    {/*
                    <Button
                        title='Version Premium'
                        buttonStyle={{margin: 8, backgroundColor:colors.primaryLight, width:150}}
                        onPress={() => {
                            this.props.navigation.navigate('Premium')
                        }}
                    />
                    */}

                </Row>
  
            </Container>
        )
    }
}

export default About