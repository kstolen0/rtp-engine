import { useOutcomeDispatch, useOutcomes } from "./context/provider"
import type { Outcome } from "./context/types"
import { useSimulator } from "./hooks/useSimulator"

export const Simulator = () => {
  const { toggle, setToggle, rewards, clearRewards } = useSimulator()
  const { coins, spins } = useOutcomes();
  const dispatch = useOutcomeDispatch()

  return (
    <div>
      current coins: {coins} <br />
      current spins: {spins} <br />
      <input type="button" onClick={() => setToggle(t => !t)} value={toggle ? 'stop' : 'start'} />
      <input type="button" onClick={() => dispatch({ type: 'buySpin' })} value={'buy spin'} disabled={coins < 1} />
      <input type='button' onClick={clearRewards} value={'CLEAR PRIZES'} />
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
