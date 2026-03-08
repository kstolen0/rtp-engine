import { useOutcomeDispatch, useOutcomes } from "./context/provider"
import type { Outcome } from "./context/types"
import { useSimulator } from "./hooks/useSimulator"

export const Simulator = () => {
  const { rewards, clearRewards, isRunning } = useSimulator()
  const { coins, spins, isEnabled } = useOutcomes();
  const dispatch = useOutcomeDispatch()

  const onBuySpin = () => {
    dispatch({ type: 'buySpin' })
    clearRewards()
  }

  return (
    <div className="simulator">
      <div className="wallet">
        <span>current coins: {coins}</span>
        <span>current spins: {spins}</span>
      </div>
      <input type="button" onClick={onBuySpin} value={'buy spin'} disabled={coins < 1 || isRunning || !isEnabled} />
      <div className="chain">
        {rewards.slice().reverse().map((r) => (
          <Reward {...r} key={r.id} />
        ))}
      </div>
    </div>
  )
}

const Reward = (outcome: Outcome) => {

  return (<div className={`reward ${outcome.type}`}>
    {outcome.artwork}
  </div>
  )
}
