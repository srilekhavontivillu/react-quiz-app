import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './components/style.css';
import quizService from './quizService/index';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';

class Quizapp extends Component {

    state = {
        questionBank: [],
        score: 0,
        responses : 0
    };
    getQuestion = () => {
        quizService().then(question => {

            this.setState({
                questionBank: question
            });
        });
    };
    
    computeAnswer = (answer,correctAnswer) => {
        if(answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses <  5  ?  this.state.responses + 1 : 5
        });
    };

    componentDidMount()
    {
        this.getQuestion();
    }
render()
{
    return(
        <div className="container">
            <div className="title">quiz</div>
             {this.state.questionBank.length >0 && this.state.responses>5 && this.state.questionBank.map(
                 ({question,answers,correct,questionId}) => <QuestionBox question={question}
                  options={answers}
                   key={questionId}
                 selected={answer => this.computeAnswer(answer, correct)}
                 />
             )};
        </div>

    );
}
}

ReactDOM.render(<Quizapp /> ,document.getElementById("root"));
