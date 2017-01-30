import "./css/normalize.css";
import styles from "./css/app.css";
import ShowAddButton from "./components/ShowAddButton";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import _ from "lodash";

let QuestionApp = React.createClass({
  getInitialState: function(){
    let questions = [{
      key: 1,
      title: "产品经理与程序员矛盾的本质是什么",
      description: "理性探讨，请勿撕逼。产品经理的主要工作是产品设计",
      voteCount: 12
    },{
      key: 2,
      title: "热爱编程是一种怎么样的体验",
      description: "别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github,stackoverflow,v2ex,reddit,csdn当兴趣爱好",
      voteCount: 22
    }]
    return {
      questions: questions,
      formDisplayed: false
    }
  },
  onToggleForm: function(){
    this.setState({
      formDisplayed: !this.state.formDisplayed
    })
  },
  onNewQuestion: function(newQuestion){
    newQuestion.key = this.state.questions.length + 1;
    let newQuestions = this.state.questions.concat( newQuestion );
    this.sortQuestion( newQuestions );
    this.setState({
      questions: newQuestions
    })
  },
  sortQuestion: function(questions){
    questions.sort(function(a, b){
      return b.voteCount - a.voteCount
    })
    return questions
  },
  onVote: function(key, newCount){
    let questions = _.uniq(this.state.questions);
    let index = _.findIndex(questions, function(qst){
      return qst.key == key;
    })
    questions[index].voteCount = newCount;
    questions = this.sortQuestion( questions );
    this.setState({
      questions: questions
    })
  },
  render: function(){
    return (
      <div>
          <div className="jumbotron text-center">
            <div className="container">
              <h1>React问答</h1>
              <ShowAddButton onToggleForm = {this.onToggleForm} />
            </div>
          </div>
          <div className="main container">
            <QuestionForm
              onNewQuestion = {this.onNewQuestion}
              onToggleForm = {this.onToggleForm}
              formDisplayed = {this.state.formDisplayed}
               />
            <QuestionList onVote = {this.onVote} questions = {this.state.questions} />
          </div>
      </div>
    )
  }
})


ReactDOM.render( <QuestionApp name="galen" /> ,
    document.getElementById("app")
)
