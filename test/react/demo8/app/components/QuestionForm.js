export default React.createClass({
  render: function(){
    return (
      <div>
        <form name="addQuestion" className="clearfix" action="index.html" method="post">
          <div className="form-group">
            <label HTMLfor="qtitle">问题</label>
            <input type="text" className="form-control" id="qtitle" placeholder="您的问题的标题" />
          </div>
          <textarea className="form-control" placeholder="问题的描述" rows="3"></textarea>
          <button type="button" className="btn btn-success pull-right">确认</button>
          <button type="button" className="btn btn-default pull-right">取消</button>
        </form>
      </div>
    )
  }
})
