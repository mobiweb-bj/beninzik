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
const falseSoundObject = new Audio.Sound()
const trueSoundObject = new Audio.Sound()

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            quiz : QUIZ,
            currentQuestion: null,
            isCorrectChoice: null,
            numberOfQuestions: 20,
            score: 0,
            remainingQuestions: 20,
            playedQuestions: [],
            
            gameOverModal: false,

            revealAnswer: false
                    
            
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

           //this.view.bounce(1000).then(() => {})
            
        }

    }

  

    gameOver() {

        this.setState({
            gameOverModal: true
        })
    }



    async checkAnswer(choice) {      
        
        this.stopAudio()

        if(choice == this.state.currentQuestion.title || choice == this.state.currentQuestion.artist) {

            
            try {
                    await trueSoundObject.loadAsync(
                    require('../assets/correct.mp3'), 
                    initialStatus={isLooping:false},
                    downloadFirst = true)
    
                    await trueSoundObject.playAsync() 
                    setTimeout(async() => await trueSoundObject.unloadAsync(), 1000)                  
                                           
            } catch(e) {
                console.log('erreur music')
            } 
            


            Toast.show({
                text: 'Bonne Réponse',
                type: 'success',
                duration:2500,
                position: 'bottom'

            })

            this.setState({
                
                score: this.state.score + 1
            })
        } else {

            
            try {
                    await falseSoundObject.loadAsync(
                    require('../assets/incorrect.mp3'), 
                    initialStatus={isLooping:false},
                    downloadFirst = true)
    
                    await falseSoundObject.playAsync()
                    setTimeout(async() => await falseSoundObject.unloadAsync(), 1000)                       
                                           
            } catch(e) {
                console.log('erreur music')
            } 
          
            Toast.show({
                text: 'Mauvaise Réponse',
                buttonText: '',
                duration: 2500,
                type: 'danger',
                position: 'bottom'
            })

            this.setState({                
                
            })
        }

        setTimeout(() => {
            this.setState({revealAnswer:false})
            this.stage.zoomIn(1000)
            this.getCurrentQuestion()

        }, 2500);

        
        
    }

    btnBgColor(choice) {

        if (!this.state.revealAnswer) {

            return '#fdc33d'
        } else {
            if(choice == this.state.currentQuestion.title || choice == this.state.currentQuestion.artist) {
                
                return colors.secondaryLight

            } else {
                
                return colors.primaryLight
            }
        }
    }

    
    // LifeCycle Methods
    componentWillMount () {
        this.getCurrentQuestion()
    }
    


    componentWillUnmount () {
        this.stopAudio()
    }
    
    componentDidMount () {
        // how many mp3
        // Toast.show({text: this.state.quiz.length.toString()})
    }
    //

    async stopAudio() {
        try {
            await soundObject.unloadAsync()                       
                                       
        } catch(e) {
            console.log('erreur music')
        } 
    }

    async playAudio(audio, loop) {

        try {
            await soundObject.loadAsync(
                {uri: 'https://mobiweb.bj/mobileapps/musicQuiz/quiz-mp3/' + audio + '.mp3'}, 
                initialStatus={isLooping:loop},
                downloadFirst = true)

            await soundObject.playAsync()                            
                                       
        } catch(e) {
            console.log('erreur music')
        } 
    }

    // handle Refs
    handleStageRef = ref => this.stage = ref

    render() {

        const Answers = () => {
            
            return (
                this.state.currentQuestion.answers.map((answer) => {
                    
                    return(
                        
                        <Button
                            key={answer}
                            title={answer}
                            titleStyle={{color:colors.black}}
                            onPress={() => {this.setState({revealAnswer:true}); this.checkAnswer(answer); }}
                            buttonStyle={{
                                width: 250,
                                height:42,
                                alignSelf: 'center',
                                margin:8,
                                backgroundColor: this.btnBgColor(answer),
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
                    <Animatable.View ref={this.handleStageRef} animation='zoomIn' duration={1000} delay={1000}>
                        <TouchableOpacity
                            onPress = { () => {
                                    this.playAudio(this.state.currentQuestion.id, true)
                                }
                            }>
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
                                marginTop: 24,
                                color: colors.primaryLight
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

                                    this.setState({gameOverModal: false})

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
                                title='Quitter'
                                onPress={() => {
                                    this.setState({gameOverModal: false})
                                    this.props.navigation.navigate('YoutubeHome')
                                }}
                                buttonStyle={{backgroundColor:colors.primaryLight, margin: 16}}
                            />                            
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
        marginTop: 24,
        marginBottom: 32
    }
})

export default Game