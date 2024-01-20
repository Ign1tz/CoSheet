import React, { useEffect, useState } from 'react';
import '../Style/widthBar.css';
import { ResizableBox } from 'react-resizable';

export default function Bar(props){
    let [state, setState] = useState({width: props.width})

    let onResize = (event, {node, size, handle}) =>{
        setState({width: size.width})
    }
    //console.log(widthBars)
    return (
        <ResizableBox style={{float: "left"}} width={state.width} height={15} minConstraints={[0,15]} maxConstraints={[1000,15]} onResize={onResize}
	      draggableOpts={{grid: [1, 0]}} > <div className={"test"} style={{width: state.width}} /></ResizableBox>
    )
}