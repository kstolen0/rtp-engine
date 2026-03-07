import { useEffect, useMemo, useState, type Dispatch } from "react";
import { useOutcomeDispatch, useOutcomes, type Actions } from "../context/provider";
import type { Outcome } from "../context/types";

export const useSimulator = () => {
	const [toggle, setToggle] = useState(false)
	const [rewards, setRewards] = useState<Outcome[]>([])
	const { outcomes, spins } = useOutcomes();
	const dispatch = useOutcomeDispatch();
	const totalProbability = useMemo(() => outcomes.reduce((a, o) => a + o.probability, 0), [outcomes.length])

	useEffect(() => {
		let timer: number
		if (toggle && spins > 0 && outcomes.length > 0) {
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
		}

		return () => { if (timer) clearTimeout(timer) }

	}, [spins, toggle, outcomes.length, rewards.length])

	const clearRewards = () => {
		setRewards([])
	}


	return {
		toggle,
		setToggle,
		rewards,
		clearRewards,
	}

}

const generateOutcome = (outcomes: Outcome[], totalProbability: number) => {
	let result = Math.floor(Math.random() * totalProbability) + 1;
	const outcome = outcomes.find(o => {
		if (result <= o.probability) {
			return true
		}
		result -= o.probability
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

