import React from 'react'
// Native Base imports
import {Container, Content, Button, Text, Toast} from 'native-base'
import {Grid, Row, Col} from 'react-native-easy-grid'
// Native base imports

class About extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            
        }
    }

    static navigationOptions = {
        title: 'En savoir plus'
    }

    componentDidMount () {
        
    }

    render() {
        return (
            <Container>
                {/*
                <Row size={10}>
                    <Text style={{marginBottom: 32, }}></Text>
                </Row>
                <Row>
                    <Text>
                        Testez vos connaisances sur la musique béninoise : 
                        Devinez les artistes et les titres des chansons en 
                        écoutant des extraits de musique.
           
                    </Text>
                </Row>
                */}
               
                <Row size={10} style={{backgroundColor: '', padding:16}}>
                    <Text>A propos de Quiz Benin Music</Text>
                </Row>
                <Row size={90} style={{backgroundColor: '', padding: 16}}>
                    <Text>Testez vos connaisances sur la musique béninoise : 
                        Devinez les artistes et les titres des chansons en 
                        écoutant des extraits de musique.</Text>

                        
                </Row>
                
                
            </Container>
        )
    }
}

export default About