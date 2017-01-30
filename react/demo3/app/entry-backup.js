let BtnCom = React.createClass({
  clickme: function(event){
    let tip = React.findDOMNode(this.refs.tip)
    if(tip.style.display === "none"){
      tip.style.display = "inline"
    }else{
      tip.style.display = "none"
    }
    event.stopPropagation()
    event.preventDefault()
  },
  render: function() {
    return (
      <div>
        <button onClick = {this.clickme}>点击</button><span ref="tip">显示|隐藏</span>
      </div>
    )
  }
})

let InputCom = React.createClass({
  changeme: function(event){
    this.setState({
      inputContent: event.target.value
    })
    event.stopPropagation()
    event.preventDefault()
  },
  getInitialState: function() {
    return {
      inputContent: ''
    }
  },
  render: function() {
    return (
      <div>
        <input type='text' onChange={this.changeme} /><span>{this.state.inputContent}</span>
      </div>
    )
  }
})

ReactDOM.render(
  <div>
    <BtnCom name="galen" />
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <InputCom />
  </div>
  ,
  document.getElementById("example")
)
