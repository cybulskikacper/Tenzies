import React from 'react'

export default function Die(props) {
	const style = {
		backgroundColor: props.isHeld ? '#59E391' : 'transparent',
	}

	function handleClick() {
		props.holdDice(props.id)
	}

	return (
		<div className="num-container" style={style} onClick={handleClick}>
			<h2 className="number">{props.value}</h2>
		</div>
	)
}
