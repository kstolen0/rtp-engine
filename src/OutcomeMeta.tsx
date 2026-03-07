import { useOutcomeDispatch, useOutcomes } from "./context/provider"
import type { Outcome } from "./context/types"

export const OutcomeMeta = () => {

  const { outcomes } = useOutcomes();

  const probabilitySum = outcomes.reduce((a, o) => a + o.probability, 0)
  const coinReward = outcomes.filter(o => o.type === 'coins').reduce((a, o) => a + o.quantity * (o.probability / probabilitySum), 0)

  const spinRTP = getRTP(outcomes, probabilitySum)

  const ev = spinRTP < 1 ? getEV(outcomes, spinRTP, probabilitySum) : Number.POSITIVE_INFINITY;

  return (<div>
    RTP on spins is {spinRTP.toFixed(2)} <br />
    EV is {ev.toFixed(2)} ({coinReward.toFixed(2)} / (1 - RTP))
    {outcomes.map(o => (<OutcomeInfo key={o.id} outcome={o} totalProbability={probabilitySum} />))}
  </div>)
}

const OutcomeInfo = ({ outcome, totalProbability }: { outcome: Outcome, totalProbability: number }) => {

  const dispatch = useOutcomeDispatch();

  const onSubmit = (id: string) => {
    dispatch({ type: 'remove', id })
  }

  return (
    <div className="outcomeInfo">
      <span>{outcome.artwork}</span>
      <span>probability: {outcome.probability} ({(outcome.probability / totalProbability * 100).toPrecision(4)}%)</span>
      <span>{outcome.type != 'none' && `quantity: ${outcome.quantity}`}</span>
      <input type="button" value='x' onClick={() => onSubmit(outcome.id)} />
    </div>)
}

const getRTP = (outcomes: Outcome[], pSum: number) => (outcomes.filter(o => o.type === 'spins').reduce((a, o) => a + (o.probability / pSum * o.quantity), 0))

const getEV = (outcomes: Outcome[], rtp: number, totalP: number) => (outcomes.filter(o => o.type === 'coins').reduce((a, o) => a + o.quantity * (o.probability / totalP), 0) / (1 - rtp))
