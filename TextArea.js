import React from "react";
import DummyText from "./DummyText.js"
//import TextAreaStyle from "./TextAreaStyle.css";
export default class TextArea extends React.Component {
	//tip found at https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize?page=1&tab=votes#tab-top
	static defaultProps = {
		minRows: 3,
		maxRows: 5
	}
	constructor(props) {
		super(props);
		this.rowHeight = 17; //assumption
		this.state = {
			style: {
				overflow: "hidden",
				display: "block",
				position: "relative",
				height: "30px",
				width:"100%"
			}/*,
			pushTopBy: '0px'*/
		}
	}
	onHasChanged = (height) => {
		//console.log('onHasChanged', height);
		var state = { ...this.state };
		var style = { ...state.style };
		//setTimeout(() => {
			if (height < this.props.maxRows * this.rowHeight) {
				style.height = height;
				//state.pushTopBy = '0px';
			} else {
				style.height = this.props.maxRows * this.rowHeight;
				//state.pushTopBy = height - style.height;
				//console.log('state.pushTopBy', state.pushTopBy)
			}
			state.style = style;
			//console.log('state',state);
			this.setState(state);
			setTimeout(()=>{
				this.refs.me.scrollTop=0;
			},0)

		//}, 0)
	}
	render() {
		console.log('render', this.state.pushTopBy);
		return <div ref="me" style={this.state.style}>
			<DummyText minRows={this.props.minRows} maxRows={this.props.maxRows} onHasChaged={this.onHasChanged} topBy={this.state.pushTopBy}></DummyText>
		</div>
	}
}