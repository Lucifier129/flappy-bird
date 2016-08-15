import React from 'react'
import classnames from 'classnames'

export default function Bird(props) {
	let { status, height = 0, isFlying } = props
    let style = {
    	transform: `translate(0, ${-height}px) rotate(${getRotate(status)}deg)`
    }
    let classes = classnames({
    	'bird': true,
    	'flying': isFlying,
    })
	return (
		<div className={classes} style={style}></div>
	)
}

function getRotate(status) {
	let rotate = 0
	if (status === 'up') {
		rotate = -40
	} else if (status === 'down') {
		rotate = 40
	}
	return rotate
}