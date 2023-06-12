const Range = ({ handleChangeRange, valueRange }) => {
  return (
    <input
      type='range'
      onChange={handleChangeRange}
      min='1'
      defaultValue={10}
      max='20'
      className='password-range__input'
      style={{ backgroundSize: `${valueRange * 5}% 100%` }}
    />
  )
}

export default Range
