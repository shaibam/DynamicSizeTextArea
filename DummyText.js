import React from "react";
import TextAreaStyle from "./TextAreaStyle.css";
export default class DummyText extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange = () =>{

    }
    render() {
        return <textarea rows={1} onChange={this.onChange}></textarea>
    }
}
