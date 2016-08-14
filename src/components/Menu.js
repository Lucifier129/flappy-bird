import React from 'react'

export default function Menu({ score, onPlay }) {
	return (
		<div className="menu c-wrap">
			<ul className="c-inner">
				<li>
					<div className="btn" onClick={onPlay}>play</div>
				</li>
				<li>score: {score}</li>
			</ul>
		</div>
	)
}