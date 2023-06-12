const Checkbox = ({ handleChangeCheckbox, name, checked, text }) => {
  return (
    <div>
      <label htmlFor={name} className='password-label'>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          onChange={(e) => handleChangeCheckbox(name, e.currentTarget.checked)}
          id={name}
          className='password-checkbox'
        />
        <span className='custom-checkbox' />
        {text}
      </label>
    </div>
  )
}

export default Checkbox
