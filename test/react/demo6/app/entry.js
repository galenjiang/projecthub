// import $ from "$";
import styles from "./css/app.css";
import "./css/normalize.css";

let stateRecordMixin = {
  componentWillMount: function(){
    this.oldState = []
  },
  componentWillUpdate: function(nextProps, nextState){
    this.oldState.push(nextState)
  },
  previousState: function(){
    let index = this.oldState.length - 1;
    return index === -1 ? {} : this.oldState[index]
  }
}
let MessageBox = React.createClass({
    mixins: [stateRecordMixin],
    getDefaultProps: function(){
        console.log("props")
        return {
            name: "galen"
        }
    },
    getInitialState: function(){
        console.log("state")
        return {
            count: 0
        }
    },
    shouldComponentUpdate: function(nextProps, nextState){
      console.log("current", nextState.count);
      return true;
    },
    doUpdate: function(){
      this.setState({count: this.state.count + 1});
      console.log(this.getDOMNode())
      console.log(this.previousState())
    },
    render: function(){
        console.log("render");
        return (
            <div>
                <h1>计数： {this.state.count}</h1>

                <button onClick={this.doUpdate}>加1</button>
                <SubCount count={this.state.count} doUpdate={this.doUpdate} />
            </div>
        )
    }
})

let SubCount = React.createClass({
  mixins: [stateRecordMixin],
  getInitialState: function(){
    return {
      count: 0
    }
  },
  componentWillReceiveProps: function(){
    this.setState({count: this.props.count*2})
  },
  render: function(){
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.props.doUpdate}>按下</button>
      </div>
    )
  }
})


ReactDOM.render( <MessageBox name="galen" /> ,
    document.getElementById("app")
)
