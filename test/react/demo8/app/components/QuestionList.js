import QuestionItem from "./QuestionItem"

export default React.createClass({
  render: function(){
    let questions = this.props.questions;
    let questionsMap = questions.map(function(qst){
      return (
        <QuestionItem key ={qst.key} title = {qst.title} description = {qst.description} voteCount = {qst.voteCount} />
      )
    })
    return (
      <div id="questions" className="">
        {questionsMap}
      </div>
    )
  }
})
