import "./css/normalize.css";
import styles from "./css/app.css";
import ShowAddButton from "./components/ShowAddButton";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";

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
      questions: questions
    }
  },
  render: function(){
    return (
      <div>
          <div className="jumbotron text-center">
            <div className="container">
              <h1>React问答</h1>
              <ShowAddButton />
            </div>
          </div>
          <div className="main container">
            <QuestionForm />
            <QuestionList questions = {this.state.questions} />
          </div>
      </div>
    )
  }
})


ReactDOM.render( <QuestionApp name="galen" /> ,
    document.getElementById("app")
)
