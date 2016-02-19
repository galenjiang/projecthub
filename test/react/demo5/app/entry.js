import $ from "$";
import styles from "./css/app.css";
import "./css/normalize.css";

let EasyForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function(){
        return {
            message: "react is awesome",
            isReactAwesome: true
        }
    },
    render: function(){
        return (
            <div>
                <h1>我想说： {this.state.message}</h1>
                <h2>React 是不是很好用 {this.state.isReactAwesome ? "是很好用" : "不太好用"}</h2>
                <input type="text" valueLink={this.linkState("message")}/>
                <input type="checkbox" checkedLink={this.linkState("isReactAwesome")} />
                <br />
                <SubComp messageLink={this.linkState("message")} checkedLink={this.linkState("isReactAwesome")} />
            </div>
        )
    }
})
let SubComp = React.createClass({
    render: function(){
        return (
            <div>
                <h3>这是个子组件</h3>
                <SubSubComp {...this.props} />
            </div>
        )
    }
})
let SubSubComp = React.createClass({
    render: function(){
        return (
            <div>
                <p>你想说什么？</p>
                <input type="text" valueLink={this.props.messageLink} />
                <p>你喜欢react的么</p>
                <input type="checkbox" checkedLink={this.props.checkedLink} />
            </div>
        )
    }
})


ReactDOM.render( <EasyForm name="galen" /> ,
    document.getElementById("app")
)
