import $ from "$";
import styles from "./css/app.css";
import "./css/normalize.css";

let MessageBox = React.createClass({
    PropTypes: {
        name: React.PropTypes.Array.isRequired
    },
    getDefaultProps: function(){
        return {
            name: "world"
        }
    },
    getInitialState: function() {
        return {
            isVisible: true,
            subMessages: [
                "我会代码搬砖",
                "以及花式搬砖",
                "不说了，工头叫我回去搬砖了。。。"
            ]
        }
    },
    render: function() {
        let styleObj = {
            display: this.state.isVisible ? "block" : "none",
        }
        return (
            <div>
                <h1 style = { styleObj }>你好，{this.props.name}</h1>
                <SubMessages subMessages = { this.state.subMessages }/>
            </div>
        )
    }
})

let SubMessages = React.createClass({
    getDefaultProps: function(){
        return {
            subMessages: ["没有消息"]
        }
    },
    render: function() {
        let subMessages = []
        this.props.subMessages.forEach(function(message, index) {
            subMessages.push(
                <p>码农说：{message}</p>
            )
        })
        return (
            <div>{subMessages}</div>
        )
    }
})



ReactDOM.render( <MessageBox /> ,
    document.getElementById("app")
)
