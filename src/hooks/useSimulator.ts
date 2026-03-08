import { useEffect, useMemo, useState, type Dispatch } from "react";
import { useOutcomeDispatch, useOutcomes, type Actions } from "../context/provider";
import type { Outcome } from "../context/types";

export const useSimulator = () => {
	const [rewards, setRewards] = useState<Outcome[]>([])
	const { outcomes, spins, isEnabled } = useOutcomes();
	const [isRunning, setIsRunning] = useState(false);
	const dispatch = useOutcomeDispatch();
	const totalProbability = useMemo(() => outcomes.reduce((a, o) => a + o.probability, 0), [outcomes.length])

	useEffect(() => {
		let timer: number
		console.log(`outcome length: ${outcomes.length}`)
		console.log(`rewards length: ${rewards.length}`)

		if (spins > 0 && isEnabled) {
			setIsRunning(true)
			timer = setTimeout(() => {
				dispatch({ type: 'useSpin' })
				const outcome = generateOutcome(outcomes, totalProbability)

				const items: Outcome[] = []
				for (let i = 0; i < outcome.quantity; i++) {
					items.push({ ...outcome, id: crypto.randomUUID() })
				}
				setRewards(p => [...p, ...items].slice(-25));

				distributeReward(outcome, dispatch)

			}, 1000);
		} else {
			setIsRunning(false);
		}

		return () => { if (timer) clearTimeout(timer) }

	}, [spins, outcomes.length, rewards.length])

	const clearRewards = () => {
		setRewards([])
	}


	return {
		rewards,
		clearRewards,
		isRunning
	}

}

const generateOutcome = (outcomes: Outcome[], totalProbability: number) => {
	const result = Math.floor(Math.random() * totalProbability) + 1;
	let resultMutation = result

	const outcome = outcomes.find(o => {
		if (resultMutation <= o.probability) {
			return true
		}
		resultMutation -= o.probability
		return false
	})

	if (!outcome) {
		throw new Error(`catastrophic failure generating outcome for ${result}`)
	}

	console.log({
		result, totalProbability, outcome: outcome.type, outcomeP: outcome.probability
	})

	return { ...outcome }
}

const distributeReward = (outcome: Outcome, dispatch: Dispatch<Actions>) => {
	switch (outcome.type) {
		case 'spins':
			dispatch({ type: 'addSpins', quantity: outcome.quantity })
			break;
		case 'coins':
			dispatch({ type: 'addCoins', quantity: outcome.quantity })
			break;
	}
}

