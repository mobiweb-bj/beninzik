import React from 'react'
import { View, ScrollView, StyleSheet} from 'react-native'
import { Image, Button } from 'react-native-elements'
import {colors} from '../shared/colors'

const Music = () => {
    return (
        <Image
            source={require('../assets/disc.png')}
            style={styles.discImage}
            onClick={() => {

                    
                   
                }                    

            }

        />
    )
}

const Answers = () => {
    return(
        <View>  
            <Button
                title='Rabbi Slo'
                onPress={() => {}}
                buttonStyle={styles.answerButton}
            />
            <Button
                title='Angelique Kidjo'
                onPress={() => {}}
                buttonStyle={styles.answerButton}
            />
            <Button
                title='Richard Flash'
                onPress={() => {}}
                buttonStyle={styles.answerButton}
            />
            <Button
                title='Ardiess Posse'
                onPress={() => {}}
                buttonStyle={styles.answerButton}
            />
        </View>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            correctAnswer: true,
        }
    }

    static navigationOptions = {
        title: 'Jouer'
    }

    render() {
        return(
            <ScrollView>
                <Music />
                
                <Answers />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    answerButton: {
        width: 200,
        alignSelf: 'center',
        margin:8,
        backgroundColor: 'black',
    },
    discImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 32,
        marginBottom: 64
    }
})

export default Game