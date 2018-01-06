import React from "react";
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
			textValue:{current:'',previous:''},
			style: {
				resize: "none",
				overflow: "hidden",
				height: "auto",
				width:"12px"
			}
		}
	}

	onInput = (e) => {
		//in any change in text value set css height to "auto"
		var state = { ...this.state };
		var textarea = this.refs.textarea;
		state.textValue.current = textarea.value;
		state.style = { ...state.style, height: "auto" };
		this.setState(state);
	}

	onKeyPress = (e) => {
		var target = e.currentTarget;
		if (this.state.maxRowReached && target.scrollTop >0) {
			e.preventDefault();
		} 
		/*setTimeout(() => {
			//in case the text value exceeds the max number of rows, trim it back to previous text value
			if (this.state.maxRowReached && target.scrollTop >0) {
				target.value = this.state.textValue;
			}
			this.state.textValue = target.value;
		}, 0)*/
	}

	render() {
		return <div className="TextAreaContainer">
			<textarea
				className={!this.state.maxRowReached ? (TextAreaStyle.textArea+' '+TextAreaStyle.minRowReached)  : (TextAreaStyle.textArea+' '+TextAreaStyle.maxRowReached)}
				ref="textarea"
				style={this.state.style}
				rows={this.state.rows}
				onInput={this.onInput}
				onKeyPress={this.onKeyPress}>
			</textarea>
		</div>
	}

	componentDidMount() {
		//initial calculations of row height, mininmum/maximum text area height and setting number of rows
		this.heightOfRow = this.refs.textarea.scrollHeight;
		//this.heightOfRow=13;
		//console.log(this.heightOfRow)
		this.minHeight = this.heightOfRow * this.props.minRows;
		this.maxHeight = this.heightOfRow * this.props.maxRows;
		var state = { ...this.state };
		state.rows = this.props.minRows;
		state.style = { ...state.style };
		this.forceUpdate();
	}

	shouldComponentUpdate(nextProps, nextState) {
		//dont render if height of textarea hasn't changed
		var state= {...this.state};
		var textarea = this.refs.textarea;
		var scrollHeight = textarea.scrollHeight;
		var scrollTop = textarea.scrollTop;
		
		//var boundingBox = textarea.getBoundingClientRect();
		if (scrollHeight > this.maxHeight) {
			//console.log('reached scrollHeight',scrollHeight,'this.maxHeight',	this.maxHeight,'this.heightOfRow',this.heightOfRow);
			//if (scrollHeight>this.maxHeight+this.heightOfRow) {
				//console.log('nextState.textValue',nextState.textValue.current,'state.textValue.current',state.textValue.current,'state.textValue.previous',state.textValue.previous,scrollHeight);
				
			//}
			//if (scrollHeight>this.maxHeight+this.heightOfRow) 
			//	state.textValue = textarea.value;
		}
		if (this.state.style.height == nextState.style.height) return false
		return true
	}

	componentDidUpdate() {
		//after text area received css value - auto, check the textarea's scroll height and apply it as the textarea's height value
		//(according to min and max row values)
		var state = { ...this.state };
		var textarea = this.refs.textarea;
		var scrollHeight = textarea.scrollHeight;
		//console.log('scrollHeight',scrollHeight);
		//debugger;
		if (scrollHeight > this.maxHeight) {
			if (scrollHeight>this.maxHeight+this.heightOfRow)
				textarea.value = state.textValue.current = state.textValue.previous;
			scrollHeight = this.maxHeight;
			state.maxRowReached = true;
		} else {
			if (scrollHeight < this.minHeight) scrollHeight = this.minHeight;
			state.maxRowReached = false;
		}
		
		/*if (this.state.maxRowReached) {
			console.log('scrollHeight',scrollHeight,'textarea.scrollHeight',textarea.scrollHeight,'state.style.height',state.style.height,'this.maxHeight',this.maxHeight);
		}*/
		state.style = { ...state.style, height: scrollHeight + "px" };
		state.textValue.previous = state.textValue.current;
		this.setState(state);
	}
}