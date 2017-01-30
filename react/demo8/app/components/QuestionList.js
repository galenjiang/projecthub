import QuestionItem from "./QuestionItem"

export default React.createClass({
  render: function(){
    let questions = this.props.questions;
    let onVote = this.props.onVote;
    let questionsMap = questions.map(function(qst){
      return (
        <QuestionItem
          key ={qst.key}
          questionsKey = {qst.key}
          title = {qst.title}
          description = {qst.description}
          voteCount = {qst.voteCount}
          onVote = {onVote}  />
      )
    })
    return (
      <div id="questions" className="">
        {questionsMap}
      </div>
    )
  }
})
