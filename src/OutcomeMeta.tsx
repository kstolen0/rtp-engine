import { useOutcomeDispatch, useOutcomes } from "./context/provider"
import type { Outcome } from "./context/types"

export const OutcomeMeta = () => {

  const { outcomes } = useOutcomes();

  const totalProbability = 100

  const spinRTP = getRTP(outcomes, totalProbability)

  const ev = spinRTP < 1 ? getEV(outcomes, spinRTP, totalProbability) : Number.POSITIVE_INFINITY;

  return (<div className="outcomeMeta">
    <div className="outcomesReturns">
      <span>RTP on spins is <strong>{spinRTP.toFixed(2)}</strong></span>
      <span>EV is <strong>{ev.toFixed(2)}</strong> </span>
    </div>
    {outcomes.map(o => (<OutcomeInfo key={o.id} outcome={o} />))}
  </div>)
}

const OutcomeInfo = ({ outcome }: { outcome: Outcome }) => {

  const dispatch = useOutcomeDispatch();

  const onSubmit = (id: string) => {
    dispatch({ type: 'remove', id })
  }

  return (
    <div className="outcomeInfo">
      <span className={`reward ${outcome.type}`}>{outcome.artwork}</span>
      <span>probability: {outcome.probability}</span>
      <span>{outcome.type != 'none' && `quantity: ${outcome.quantity}`}</span>
      <input type="button" value='x' onClick={() => onSubmit(outcome.id)} />
    </div>)
}

const getRTP = (outcomes: Outcome[], pSum: number) => (outcomes.filter(o => o.type === 'spins').reduce((a, o) => a + (o.probability / pSum * o.quantity), 0))

const getEV = (outcomes: Outcome[], rtp: number, totalP: number) => (outcomes.filter(o => o.type === 'coins').reduce((a, o) => a + o.quantity * (o.probability / totalP), 0) / (1 - rtp))
