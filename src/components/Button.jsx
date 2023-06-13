const Button = ({ text, handleGeneratePassword }) => {
  return (
    <button className='generate-password' onClick={handleGeneratePassword}>
      {text}
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' height={20} width={20}>
        <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
      </svg>
    </button>
  )
}

export default Button
