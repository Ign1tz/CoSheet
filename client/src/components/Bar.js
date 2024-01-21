import React, {useEffect, useState} from 'react';
import '../Style/widthBar.css';
import {ResizableBox} from 'react-resizable';

export default function Bar(props) {
    let [state, setState] = useState({width: props.columWidth})
    let onResize = (event, {node, size, handle}) => {
        //setState({width: size.width})
        let oldSettings = props.settings
        let newSettings = oldSettings
        let oldWidths = [...oldSettings.columWidths]
        oldWidths[props.index] = size.width

        newSettings.columWidths = oldWidths
        //props.settings.columWidths.reduce((a,b) => a+b,0))
        setState({width: size.width})
        props.setSettings(newSettings)
        props.onSettingsChange(props.settings)
    }
    return (
        <ResizableBox style={{float: "left"}} width={state.width} height={15} minConstraints={[20, 15]}
                      onResize={onResize}>
            <div className={"test"} style={{width: state.width}}/>
        </ResizableBox>
    )

}