import React from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native'
import { Image, Button } from 'react-native-elements'
import {Root, Toast} from 'native-base'
import {colors} from '../shared/colors'
import { Audio } from 'expo'
import {QUIZ} from '../shared/quiz'
import * as Animatable from 'react-native-animatable'


const soundObject = new Audio.Sound()

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            quiz : QUIZ,
            currentQuestion: null,
            isCorrectChoice: false,
            score: 0,
            remainingQuestions: 10,
            btnBgColor: {
                correct: 'black',
                incorrect: 'black'
            }
            
        }
    }


    static navigationOptions = {
        title: 'Jouer'
    }

    getCurrentQuestion () {

        this.setState({remainingQuestions: this.state.remainingQuestions - 1})
        if(this.state.remainingQuestions == 0) {
            this.gameOver()
        } else {
            let randomQuestionIndex = Math.floor(Math.random() * this.state.quiz.length)
            let question = this.state.quiz.filter((question) => question)[randomQuestionIndex]

            this.setState({
                currentQuestion: question
                
            })
            
        }

        

    }

    gameOver() {

        Alert.alert('Fin du jeu')
    }

    checkAnswer(choice) {

        // Stop Audio
        this.stopAudio()

        if(choice == this.state.currentQuestion.title || choice == this.state.currentQuestion.artist) {

            Toast.show({
                text: 'Bonne Réponse',
                type: 'success',
                duration:3000,
                position: 'bottom'

            })

            this.setState({
                isCorrectChoice: true,
                score: this.state.score + 1
            })
        } else {
            
            Toast.show({
                text: 'Mauvaise Réponse',
                buttonText: '',
                duration: 3000,
                type: 'danger',
                position: 'bottom'
            })
            

            this.setState({
                isCorrectChoice: false
            })
        }
        // Wait 2 seconds and display a new question
        setTimeout(() => {this.getCurrentQuestion()}, 3000)
        
    }

    componentWillMount () {
        this.getCurrentQuestion()
    }

    componentDidMount () {
        
    }

    componentWillUnmount () {
        this.stopAudio()
    }

    async stopAudio() {
        try {
            await soundObject.unloadAsync()                       
                                       
        } catch(e) {
            console.log('erreur music')
        } 
    }

    async playAudio(audio) {

        try {
            await soundObject.loadAsync(
                audio, 
                initialStatus={isLooping:true,},
                downloadFirst = true)

            await soundObject.playAsync()                            
                                       
        } catch(e) {
            console.log('erreur music')
        } 
    }

    render() {

        const Answers = () => {
            return (
                this.state.currentQuestion.answers.map((answer) => {
                    
                    return(
                        
                        <Button
                            key={answer}
                            title={answer}
                            onPress={() => this.checkAnswer(answer)}
                            buttonStyle={{
                                width: 200,
                                alignSelf: 'center',
                                margin:8,
                                backgroundColor: colors.black,
                                opacity: 0.8

                            }}                
                        />
                        
                    )
                })
            ) 
        }

        return(
            <Root>
                <ScrollView>
                    <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                        <TouchableOpacity
                            onPress = { () => this.playAudio(this.state.currentQuestion.audio) }>
                            <Image
                                source={require('../assets/play.png')}
                                style={styles.discImage}
                            />
                        </TouchableOpacity>

                        <View>
                            <Answers />
                        </View>
                        <View>
                            <Text style={{
                                alignSelf: 'center',
                                marginTop: 32
                            }}>
                                Score : {this.state.score}/10
                            </Text>
                        </View>
                    </Animatable.View>
                </ScrollView>
            </Root>
            
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