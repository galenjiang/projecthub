export default React.createClass({
  voteUp: function(){
    let newVote = this.props.voteCount + 1;
    this.props.onVote( this.props.questionsKey, newVote );
  },
  voteDown: function(){
    let newVote = this.props.voteCount - 1;
    this.props.onVote( this.props.questionsKey, newVote );
  },
  render: function(){
    return (
      <div className="media" key = {this.props.key} >
        <div className="media-left">
          <button type="button" className="btn btn-default"  onClick={this.voteUp}>
            <span className="glyphicon glyphicon-chevron-up"></span>
            <span className="vote-count">{this.props.voteCount}</span>
          </button>
          <button type="button" className="btn btn-default"  onClick={this.voteDown}>
            <span className="glyphicon glyphicon-chevron-down"></span>
          </button>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{this.props.title}</h4>
          <p>
            {this.props.description}
          </p>
        </div>
      </div>
    )
  }
})
