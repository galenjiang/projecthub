export default React.createClass({
  render: function(){
    return (
      <button id="add-question-btn" type="button" className="btn btn-success" onClick = {this.props.onToggleForm}>添加问题</button>
    )
  }
})
