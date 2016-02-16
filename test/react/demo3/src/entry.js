import { CommentList, CommentForm } from "./commentpartner";
import $ from "$";
let CommentBox = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  render: function() {
    return (
      <div className = "commentBox">
        <h1> Comments </h1>
        <CommentList data = { this.state.data } />
        <CommentForm onCommentSubmit = {this.handleCommentSubmit} />
      </div>
    );
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    //  Todo: submit to the server and refresh the list
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

});

ReactDOM.render(
    <CommentBox url = "data.json" pollInterval = "10000" />,
    document.getElementById(`example`)
)
