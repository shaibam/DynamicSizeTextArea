import React from "react";
export default class DummyText extends React.Component {
    static defaultProps = {
		onHasChaged: ()=>{}
	}
    constructor(props) {
        super(props);
        this.state={style:{
            /*top:'0px',
            position:'absolute',
            display:'block',*/
            position:'absolute',
            height:'15px',
            /*overflow:'hidden',*/
            resize:'none',
            top:'0px',
            //transform:'translateY(0px)',
            width:"100%",
            background:"white"
        }}
    }
    onInput = (e) =>{
        this.forceUpdate();
    }
    render() {
        //console.log('render',this.state.style)
        //return <textarea ref='textarea'rows={1} onChange={this.onChange} style={this.state.style}></textarea>
        return <div ref='textarea'contentEditable="true" onInput={this.onInput} style={this.state.style}></div>
    }
    shouldComponentUpdate(nextProps, nextState) {
        //dont render if height of textarea hasn't changed
        /*console.log(nextProps.topBy,nextState.style.transform.replace('translateY(','').replace('px)',''));
        if (nextProps.topBy && nextProps.topBy!=nextState.style.transform.replace('translateY(','').replace('px)','')) {
            console.log(nextProps.topBy,nextState.style.transform.replace('translateY(','').replace('px)',''))
            nextState.style.transform='translateY('+nextProps.topBy+'px)';
            return true;
        }*/
        if (this.state.style.height == nextState.style.height) return false
        if (this.state.style.height!='auto')
            this.props.onHasChaged(nextState.style.height);
		return true
	}
    componentDidUpdate() {
        var state ={...this.state}
        var style ={...state.style}
        //console.log(style)
        style.height = this.refs.textarea.scrollHeight;
        state.style=style;
        this.setState(state);
    }
}
