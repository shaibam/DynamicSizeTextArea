import React from "react";
import DummyText from "./DummyText.js"
import TextAreaStyle from "./TextAreaStyle.css";
export default class TextArea extends React.Component {
	//tip found at https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize?page=1&tab=votes#tab-top
	static defaultProps = {
		minRows: 3,
		maxRows: 5
	}
	constructor(props) {
		super(props);
		//console.log(TextAreaStyle)
		this.miniScrollHeight = undefined;
		this.state = {
			rows: 1,
			maxRowReached: false,
			textValue: '',
			style: {
				resize: "none",
				overflow: "hidden",
				height: "auto"
			}
		}
	}
	render() {
		return <DummyText></DummyText>
	}
}