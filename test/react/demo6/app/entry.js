import $ from "$";
import styles from "./css/app.css";
import "./css/normalize.css";

let MessageBox = React.createClass({
    getDefaultProps: function(){
        console.log("props")
        return {
            name: "galen"
        }
    },
    getInitialState: function(){
        console.log("state")
        return {
            name: "galen"
        }
    },
    componentWillMount: function(){
        console.log("willmount");
        this.setState({name: "jack"});
    },
    componentDidMount: function(){
        console.log("didmount");
        // console.log(this.getDOMNode())
        console.log(React.findDOMNode(this))
    },
    componentWillUnmount: function(){
        alert("you will try to kill me!!!")
    },
    killMe: function(){
        console.log(this)
        React.unmountComponentAtNode( this.getDOMNode() )
    },
    render: function(){
        console.log("render");
        return (
            <div>
                <h1>你好： {this.state.name}</h1>
                <button onClick={this.killMe}>删除</button>
            </div>
        )
    }
})

ReactDOM.render( <MessageBox name="galen" /> ,
    document.getElementById("app")
)
