import React from "react";
import TextAreaStyle from "./TextAreaStyle.css";
export default class TextArea extends React.Component {
	// tip found at https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize?page=1&tab=votes#tab-top
	// the trick is to set the textarea's height to auto then render then after update if the textarea's scrollHeight exceeds
	// the maximum row height, trim it. 
	static defaultProps = {
		minRows: 3,
		maxRows: 5
	}
	constructor(props) {
		super(props);

		this.miniScrollHeight = undefined;
		this.state = {
			rows: 1,
			maxRowReached: false,
			textValue:{current:'',previous:''},
			style: {
				resize: "none",
				overflow: "hidden",
				height: "auto",
				width:"100px"
			}
		}
	}
	
	onInput = (e) => {
		//In any change in text value set css height to "auto".
		//Store the textarea's value 
		var state = { ...this.state };
		var textarea = e.currentTarget;
		state.textValue.current = textarea.value;
		state.style = { ...state.style, height: "auto" };
		this.setState(state);
	}

	onKeyPress = (e) => {
		//Preven exceeding textarea's maximum rows input limit.
		var target = e.currentTarget;
		if (this.state.maxRowReached && target.scrollTop >0) {
			e.preventDefault();
		}
	}

	render() {
		return <div className="TextAreaContainer">
			<textarea
				className={!this.state.maxRowReached ? (TextAreaStyle.textArea+' '+TextAreaStyle.minRowReached)  : (TextAreaStyle.textArea+' '+TextAreaStyle.maxRowReached)}
				ref="textarea"
				style={this.state.style}
				rows={this.state.rows}
				onInput={this.onInput}
				onKeyPress={this.onKeyPress}
				value={this.state.textValue.current}>
			</textarea>
		</div>
	}

	componentDidMount() {
		//Initial calculations of row height, mininmum/maximum text area height and setting number of rows
		this.heightOfRow = this.refs.textarea.scrollHeight;
		this.minHeight = this.heightOfRow * this.props.minRows;
		this.maxHeight = this.heightOfRow * this.props.maxRows;
		var state = { ...this.state };
		state.rows = this.props.minRows;
		state.style = { ...state.style };
		this.forceUpdate();
	}

	shouldComponentUpdate(nextProps, nextState) {
		//No render if height of textarea hasn't changed
		if (this.state.style.height == nextState.style.height) return false
		return true
	}

	componentDidUpdate() {
		//After text area received css value - auto, check the textarea's scroll height and apply it as the textarea's height value
		//(according to min and max row values)
		var state = { ...this.state };
		var textarea = this.refs.textarea;
		var scrollHeight = textarea.scrollHeight;
		//console.log('scrollHeight',scrollHeight);
		//debugger;
		if (scrollHeight > this.maxHeight) {
			if (scrollHeight>this.maxHeight+this.heightOfRow)
				state.textValue.current = state.textValue.previous;
			scrollHeight = this.maxHeight;
			state.maxRowReached = true;
		} else {
			if (scrollHeight < this.minHeight) scrollHeight = this.minHeight;
			state.maxRowReached = false;
		}
		
		state.style = { ...state.style, height: scrollHeight + "px" };
		state.textValue.previous = state.textValue.current;
		this.setState(state);
	}
}