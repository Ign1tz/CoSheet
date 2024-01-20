import React, { useEffect, useState } from 'react';
import '../Style/widthBar.css';
import Bar from "./Bar"

export default function WidthBar(props) {
    let widths = props.widths
    widths = [100,50,100]



    let widthBars = []
    for (let i = 0; i < widths.length; i++) {
        console.log(i)
        let bar = <Bar width={100}/>
        widthBars.push(bar)
    }
    //console.log(widthBars)
    return (
        <div className="barContainer">
            {widthBars}
        </div>
    )
}