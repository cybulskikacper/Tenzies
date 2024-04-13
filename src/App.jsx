import Die from './components/Die'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
	const [numbers, setNumbers] = useState(allNewDice())
	const [tenzies, setTenzies] = useState(false)

	useEffect(() => {
		if (numbers.length > 0) {
			const isHeld = numbers.every(number => number.isHeld)
			const firstValue = numbers[0].value
			const sameValue = numbers.every(number => number.value === firstValue)

			if (isHeld && sameValue) {
				setTenzies(true)
				console.log('You won!')
			}
		}
	}, [numbers])

	useEffect(() => {
		setNumbers(allNewDice())
	}, [])

	function allNewDice() {
		const arr = []

		for (let i = 0; i < 10; i++) {
			const randomNumber = Math.floor(Math.random() * 6) + 1
			arr.push({
				value: randomNumber,
				isHeld: false,
				id: nanoid(),
			})
		}
		return arr
	}
	// jak klikam na jakis number i ma on isheld na true i potem klikne roll to on zostaje, nie odswieza sie
	function handleAllNewDice() {
		if (!tenzies) {
			setNumbers(prevNum =>
				prevNum.map(num => (num.isHeld ? num : { ...num, value: Math.floor(Math.random() * 6) + 1 }))
			)
		} else {
			setTenzies(false)
			allNewDice()
		}
	}

	// jak klikniemy na number to on ma wtedy isheld: true, jak klikniemy ponownie to ta wartosc flipuje sie na false, jest to taki jak by  "wlacznik swiatla"
	function holdDice(id) {
		setNumbers(prevNumbers =>
			prevNumbers.map(number => (number.id === id ? { ...number, isHeld: !number.isHeld } : number))
		)
	}

	const diceComponents = numbers.map(number => (
		<Die key={number.id} value={number.value.toString()} isHeld={number.isHeld} id={number.id} holdDice={holdDice} />
	))

	return (
		<main>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
			</p>

			{tenzies ? <Confetti /> : ''}

			<div className="container">{diceComponents}</div>

			<button onClick={handleAllNewDice} className="roll">
				{tenzies ? 'New Game' : 'Roll'}
			</button>
		</main>
	)
}
