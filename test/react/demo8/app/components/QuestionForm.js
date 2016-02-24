export default React.createClass({
  handleForm: function(e){
    e.preventDefault();
    var newQuestion = {
      title: this.refs.title.getDOMNode().value,
      description: this.refs.description.getDOMNode().value,
      voteCount: 0,
    }
    this.refs.form.getDOMNode().reset();
    this.props.onNewQuestion( newQuestion );
  },
  render: function(){
    let styleForm = {
      display: this.props.formDisplayed ? "block" : "none"
    }
    return (
      <div style={styleForm}>
        <form ref="form" name="addQuestion" className="clearfix" onSubmit = {this.handleForm}>
          <div className="form-group">
            <label HTMLfor="qtitle">问题</label>
            <input ref="title" type="text" className="form-control" id="qtitle" placeholder="您的问题的标题" />
          </div>
          <textarea ref="description" className="form-control" placeholder="问题的描述" rows="3"></textarea>
          <button type="submit" className="btn btn-success pull-right" >确认</button>
          <button type="button" className="btn btn-default pull-right" onClick = {this.props.onToggleForm}>取消</button>
        </form>
      </div>
    )
  }
})
