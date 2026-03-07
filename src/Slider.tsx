type SliderProps = {
  disabled: boolean,
  label: string,
  min: number,
  max: number,
  onChange: (x: number) => void,
  value: number,
}

export const Slider = (props: SliderProps) => {
  return (<p>
    {props.label}<br />
    <input disabled={props.disabled} className='slider' type='range' min={props.min} max={props.max} onChange={e => props.onChange(Number(e.target.value))} value={props.value} />
  </p>
  )
}


