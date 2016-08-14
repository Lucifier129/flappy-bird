import React from 'react'

export default function Piping({ x, upper, below, top, bottom }) {
	let pipingStyle = {
		transform: `translate(${-x}px, 0)`
	}
	let upperStyle = {
		transform: `translate(0, ${upper}px)`
	}
	let belowStyle = {
		transform: `translate(0, ${-below}px)`
	}
    return (
    	<div className="piping" style={pipingStyle}>
    		<div className="piping-upper" style={upperStyle} />
    		<div className="piping-below" style={belowStyle} />
    	</div>
    )
}
