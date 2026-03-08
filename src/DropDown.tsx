
export const DropDown = <T extends string>({ value, onChange, label, options }: { value: T, onChange: (x: T) => void, label: string, options: T[] }) => {

  return (
    <label>
      {label}<br />
      <select className='dropdown' value={value.toString()} onChange={e => onChange(e.target.value as T)}>
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label >)

}
