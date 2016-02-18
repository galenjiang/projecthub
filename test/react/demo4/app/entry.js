import $ from "$";
import styles from "./css/app.css";
import "./css/normalize.css";

let MessageBox = React.createClass({
    getInitialState: function(){
      return {
        inputValue: "input value",
        selectionValue: "a",
        radioValue: "b",
        checkValue: ["a"],
        textareaValue: "some text here..."
      }
    },
    handleSubmit: function(e){
      e.preventDefault()
      let formData = {
        input: this.refs.input.getDOMNode().value,
        select: this.refs.select.getDOMNode().value,
        radio: this.state.radioValue,
        checkValue: this.state.checkValue,
        textarea: this.refs.textarea.getDOMNode().value
      }
      console.log(formData)
      this.refs.goodRadio.saySomething()
    },
    handleRadio: function(e){
      this.setState({radioValue: e.target.value})
    },
    handleCheckBox: function(e){
      let newArr = this.state.checkValue.slice();
      let newVal = e.target.value;
      let index = newArr.indexOf(newVal)
      if( index == -1){
        newArr.push(newVal)
      }else{
        newArr.splice(index, 1)
      }
      this.setState({checkValue: newArr})
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref={function(com){React.findDOMNode(com).focus()}} defaultValue={this.state.inputValue} onChange={this.handleInput} />
                <br />
                <select ref="select" defaultValue={this.state.selectionValue} onChange={this.handleSelect}>
                  <option value="a">a</option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                  <option value="d">d</option>
                </select>
                <br />
                <RadioCom ref="goodRadio" handleRadio={this.handleRadio} />
                <CheckBoxCom handleCheckBox={this.handleCheckBox} />
                <br />
                <textarea ref="textarea" defaultValue={this.state.textareaValue} onChange={this.handleTextArea}></textarea>
                <button type="submit">提交</button>
            </form>
        )
    },

})
let RadioCom = React.createClass({
  saySomething: function(){
    alert("yo what!!!")
  },
  render: function(){
    return (
      <div>
        <p>radio</p>
        a<input onChange={this.props.handleRadio} name="radio" type="radio" value="a" />
        b<input onChange={this.props.handleRadio} name="radio" type="radio" defaultChecked value="b" />
        c<input onChange={this.props.handleRadio} name="radio" type="radio" value="c" />
      </div>
    )
  }
})

let CheckBoxCom = React.createClass({
  render: function(){
    return (
      <div>
        <p>checkbox</p>
        a<input onChange={this.props.handleCheckBox} name="check" type="checkbox" defaultChecked value="a" />
        b<input onChange={this.props.handleCheckBox} name="check" type="checkbox" value="b" />
        c<input onChange={this.props.handleCheckBox} name="check" type="checkbox" value="c" />
      </div>
    )
  }
})



ReactDOM.render( <MessageBox name="galen" /> ,
    document.getElementById("app")
)
