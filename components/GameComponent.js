import React from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Text, Share } from 'react-native'
import { Image, Button } from 'react-native-elements'
import {Root, Toast} from 'native-base'
import Modal from 'react-native-modal'
import {colors} from '../shared/colors'
import { Audio, AdMobBanner } from 'expo'
import {QUIZ} from '../shared/quiz'
import * as Animatable from 'react-native-animatable'
import Ad from './AdComponent'


const soundObject = new Audio.Sound()

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            quiz : QUIZ,
            currentQuestion: null,
            isCorrectChoice: false,
            numberOfQuestions: 5,
            score: 0,
            remainingQuestions: 5,
            playedQuestions: [],
            
            gameOverModal: false
            
        }
    }


    static navigationOptions = {
        title: 'Jouer'
    }
    

    getCurrentQuestion () {

        this.setState({remainingQuestions: this.state.remainingQuestions - 1})
        if(this.state.remainingQuestions < 0) {
            this.gameOver()
        } else {

            let question = this.state.quiz.filter((q) => !this.state.playedQuestions.includes(q) )

            let randomQuestionIndex = Math.floor(Math.random() * (this.state.quiz.length - this.state.playedQuestions.length))
            let randomQuestion = question[randomQuestionIndex]

            this.state.playedQuestions.push(randomQuestion)

            this.setState({
                currentQuestion: randomQuestion,
            })
            
        }

    }

    gameOver() {

        this.setState({
            gameOverModal: true
        })
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
        // Wait 3 seconds and display a new question
        setTimeout(() => {this.getCurrentQuestion()}, 3000)
        
    }
    
    // LifeCycle Methods
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
                    <Animatable.View animation="zoomIn" duration={1000} delay={1000}>
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
                                Score : {this.state.score}/{this.state.numberOfQuestions}
                            </Text>
                        </View>
                        <View style={{marginTop:16}}>
                            <Ad />
                        </View>
                        
                    </Animatable.View>

                    <Modal isVisible={this.state.gameOverModal}>
                        <View style={{backgroundColor: colors.white, padding: 32, alignSelf: 'center'}}>
                            <Text>
                                Votre Score : {this.state.score}/{this.state.numberOfQuestions}
                            </Text>
                            <Button
                                title='Rejouer'
                                onPress={() => {
                                    this.setState({gameOverModal: false})
                                    this.props.navigation.push('Game')
                                }}
                                buttonStyle={{backgroundColor:colors.primaryDark,margin:16}}
                            />
                            <Button
                                title='Défier un ami'
                                onPress={async () => {

                                    let msg = 'Viens tester tes connaissances sur la musique béninoise avec l\'application Quiz BeninZik.\n\n\n Devine les artistes et titres de chansons en écoutant des extraits de musique.\n\n\n';
                                    let url = 'http://mobiweb.bj'
                                    
                                    await Share.share(
                                        {
                                        message: msg + ' Mon Score : ' + this.state.score + '/' + this.state.numberOfQuestions + '\n\n Essaie de faire mieux...\n\n' + url,
                                        title: 'Quiz BeninZik',
                                        
                                        url:url
                                        },
                                        {
                                            dialogTitle: 'Quiz BeninZik'
                                        }
                                    )

                                    
                                }}
                                buttonStyle={{backgroundColor:colors.secondary, margin: 16}}
                            />
                            <Button
                                title='Version Premium'
                                onPress={() => {}}
                                buttonStyle={{backgroundColor:colors.primaryLight, margin: 16}}
                            />                            
                        </View>
                        <View style={{marginTop: 32}}>
                            <Ad />
                        </View>
                    </Modal>
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
        marginBottom: 48
    }
})

export default Game