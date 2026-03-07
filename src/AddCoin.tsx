import { useOutcomeDispatch } from "./context/provider"

export const AddCoin = () => {
  const dispatch = useOutcomeDispatch();

  const onSubmit = () => {
    dispatch({ type: 'addCoins', quantity: 1 })
  }

  return (
    <div>
      <input type="button" onClick={onSubmit} value={'add coin'} />
    </div>
  )
}
