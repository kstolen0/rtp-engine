import { useMemo, useState } from "react";
import { useOutcomeDispatch, useOutcomes } from "./context/provider"
import type { OutcomeType } from "./context/types";
import { Slider } from "./Slider";
import { DropDown } from "./DropDown";

const outcomeOptions: OutcomeType[] = ['none', 'coins', 'spins']

export const AddOutcome = () => {
  const { outcomes } = useOutcomes();
  const dispatch = useOutcomeDispatch();
  const [type, setType] = useState<OutcomeType>('none');
  const [quantity, setQuantity] = useState(1);
  const [probability, setProbability] = useState(50);
  const totalProbability = useMemo(() => outcomes.reduce((a, o) => a + o.probability, 0), [outcomes.length])
  const probabilityPercentage = totalProbability > 0 ? probability / (totalProbability + probability) * 100 : 100
  const onSubmit = () => {
    dispatch({
      type: 'add',
      payload: {
        type,
        quantity,
        probability
      }
    })

  }

  return (

    <div className="addOutcome">
      <div className="inputs">
        <DropDown value={type} onChange={setType} label="set outcome type" options={outcomeOptions} />
        <Slider min={1} max={100} label={`set probability | ${probability} | (${probabilityPercentage.toFixed(2)}%)`} onChange={setProbability} disabled={false} value={probability} />
        {type != 'none' &&
          <Slider min={1} max={10} label={`set quantity | ${quantity}`} onChange={setQuantity} disabled={false} value={quantity} />
        }
      </div>
      <input type="button" onClick={onSubmit} value={'add'} />
    </div>
  )
}

