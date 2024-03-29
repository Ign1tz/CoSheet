import React, {useEffect, useState} from 'react';
import '../Style/widthBar.css';
import Bar from "./Bar"

export default function WidthBar(props) {
    let widths = props.settings.columWidths


    let widthBars = []
    for (let i = 0; i < widths.length; i++) {
        let bar = <Bar key={i} width={widths[i]} columWidth={props.columWidths[i]} settings={props.settings}
                       setSettings={props.setSettings} index={i} onSettingsChange={props.onSettingsChange}/>
        widthBars.push(bar)
    }
    //console.log(widthBars)
    return (
        <div className="barContainer" style={{width: widths.reduce((a, b) => a + b, 0) + 5 + "px"}}>
            {widthBars}
        </div>
    )
}