import { createContext, useContext, useReducer, type Dispatch, } from "react"
import type { Outcome, OutcomeState, OutcomeType } from "./types";

export const initialState: OutcomeState = {
	outcomes: [],
	coins: 5,
	spins: 0,
	isEnabled: false,
}

type AddPayload = {
	type: OutcomeType,
	quantity: number,
	probability: number,
}

type AddOutcome = {
	type: 'add';
	payload: AddPayload;
}

type RemoveOutcome = {
	type: 'remove';
	id: string;
}

type AddCoins = {
	type: 'addCoins';
	quantity: number
}

type UseSpin = {
	type: 'useSpin';
}

type AddSpins = {
	type: 'addSpins';
	quantity: number
}

type BuySpin = {
	type: 'buySpin'
}

export type Actions = AddOutcome | RemoveOutcome | AddCoins | UseSpin | AddSpins | BuySpin;

const OutcomeContext = createContext<OutcomeState>(initialState);

const OutcomeDispatch = createContext<Dispatch<Actions> | null>(null);

export const OutcomeProvider = ({ children }: { children: React.ReactNode }) => {

	const [state, dispatch] = useReducer(
		reducer,
		initialState);

	return (
		<OutcomeContext value={state}>
			<OutcomeDispatch value={dispatch}>
				{children}
			</OutcomeDispatch>
		</OutcomeContext>
	)
}

const reducer = (state: OutcomeState, action: Actions): OutcomeState => {
	switch (action.type) {
		case 'add': {
			const newOutcomes = [...state.outcomes, toOutcome(action.payload)]
			return {
				...state,
				isEnabled: newOutcomes.reduce((a, o) => a + o.probability, 0) === 100,
				outcomes: newOutcomes,
			}
		}
		case 'remove': {
			const newOutcomes = state.outcomes.filter(o => o.id != action.id)
			return {
				...state,
				isEnabled: newOutcomes.reduce((a, o) => a + o.probability, 0) === 100,
				outcomes: newOutcomes
			}
		}
		case 'addCoins':
			return {
				...state,
				coins: state.coins + action.quantity,
				outcomes: [...state.outcomes],
			}
		case 'useSpin':
			return {
				...state,
				spins: state.spins - 1,
				outcomes: [...state.outcomes],
			}
		case 'addSpins':
			return {
				...state,
				spins: state.spins + action.quantity,
				outcomes: [...state.outcomes],
			}
		case 'buySpin':
			if (state.coins > 0) {
				return {
					...state,
					spins: state.spins + 1,
					coins: state.coins - 1,
					outcomes: [...state.outcomes],
				}
			}
	}

	return state
}

const toOutcome = ({ probability, type, quantity }: AddPayload): Outcome => {
	const id = crypto.randomUUID()
	switch (type) {
		case 'none':
			return { id, type, probability, quantity: 1, artwork: '😭' }
		case 'spins':
			return { id, type, probability, quantity, artwork: '🗝️', }
		case 'coins':
			return { id, type, probability, quantity, artwork: '💵' }
	}
}

export const useOutcomes = () => {
	return useContext(OutcomeContext);
}

export const useOutcomeDispatch = () => {
	const dispatch = useContext(OutcomeDispatch);

	if (!dispatch) {
		throw new Error("no")
	}

	return dispatch;
}
