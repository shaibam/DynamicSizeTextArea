import React from 'react';
import TextArea from './TextArea.js'
import AppStyle from "./AppStyle.css";

export default class App extends React.Component {
	render() {
		return (<div>
			<TextArea minRows='3' maxRows='5'></TextArea>
		</div>)
	}
}
