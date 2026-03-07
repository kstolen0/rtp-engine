export type OutcomeState = {
	outcomes: Outcome[];
	coins: number;
	spins: number;
}

export type Outcome = Nothing | FreeSpins | Coins

type OutcomeBase = {
	probability: number;
	id: string;
	type: OutcomeType;
}

export type Nothing = OutcomeBase & {
	type: 'none';
	quantity: 1;
	artwork: '😭';
}

export type FreeSpins = OutcomeBase & {
	type: 'spins';
	quantity: number;
	artwork: '🗝️';
}

export type Coins = OutcomeBase & {
	type: 'coins';
	quantity: number;
	artwork: '💵';
}

export type OutcomeType = 'none' | 'coins' | 'spins';
