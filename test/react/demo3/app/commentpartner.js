import marked from "marked";
// 评论列表
var CommentList = React.createClass({
  render: function() {

    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
// 评论详情 <h2>author</h2> <span></span>
var Comment = React.createClass({
  rawMarkup: function() {
    // this.props.children 获取tag包裹的html
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function(){
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </div>
    )
  }
})
var CommentForm = React.createClass({
  render: function() {
    return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
         <input type="text" placeholder="Your name" ref="author" />
         <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  },
  handleSubmit: function(e){
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if(!author || !text){
      return false;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.value = "";
    this.refs.text.value = "";
    return false;
  },

});




export {CommentList, CommentForm}
