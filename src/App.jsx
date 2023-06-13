import { useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Checkbox from './components/Checkbox'
import Range from './components/Range'
import Header from './components/Header'
import Button from './components/Button'
import { CHARACTERS_SET } from './constants'
import { calculateStrengthPassword, createLevelsBars } from './utils'

import './App.css'

const App = () => {
  const [valueRange, setvalueRange] = useState(10)
  const [password, setPassword] = useState('')
  const [strengthTitle, setStrengthTitle] = useState('')
  const [characters, setCharacters] = useState({
    uppercase: true,
    lowercase: false,
    numbers: false,
    symbols: false,
  })
  const bars = useRef([])

  const handleChangeRange = (e) => {
    setvalueRange(e.target.value)
  }

  const handleChangeCheckbox = (key, isChecked) => {
    setCharacters({ ...characters, [key]: isChecked })
  }

  const handleGeneratePassword = () => {
    let pass = ''
    let charPool = 0
    const includesSets = []

    const charactersArray = Object.entries(characters)
    charactersArray.forEach(([character, flag]) => {
      if (flag) {
        includesSets.push(CHARACTERS_SET[character][0])
        charPool += CHARACTERS_SET[character][1]
      }
    })
    if (includesSets) {
      for (let i = 0; i < valueRange; i++) {
        const randSetIndex = Math.floor(Math.random() * includesSets.length)
        const randSet = includesSets[randSetIndex]

        const randCharIndex = Math.floor(Math.random() * randSet.length)
        const randChar = randSet[randCharIndex]
        pass += randChar
      }

      const { strengthTextLevel, strengthLevels } = calculateStrengthPassword(valueRange, charPool)
      const barsArr = bars.current
      createLevelsBars(strengthLevels, barsArr)
      setStrengthTitle(strengthTextLevel)
      setPassword(pass)
    }
  }

  return (
    <>
      <main className='wrapper-main'>
        <h1 className='password-title'>Password Generator</h1>
        <Header password={password} />
        <section className='wrapper-body'>
          <div className='wrapper-length'>
            <h3 className='password-subtitle'>Character Length</h3>
            <span className='password-character__length'>{valueRange}</span>
          </div>
          <Range handleChangeRange={handleChangeRange} valueRange={valueRange} />
          <div className='wrapper-checkboxs'>
            <Checkbox handleChangeCheckbox={handleChangeCheckbox} text='Include Uppercase Letters' name='uppercase' checked={characters.uppercase} />
            <Checkbox handleChangeCheckbox={handleChangeCheckbox} text='Include Lowercase Letters' name='lowercase' checked={characters.lowercase} />
            <Checkbox handleChangeCheckbox={handleChangeCheckbox} text='Include Numbers' name='numbers' checked={characters.numbers} />
            <Checkbox handleChangeCheckbox={handleChangeCheckbox} text='Include Symbols' name='symbols' checked={characters.symbols} />
          </div>
          <div className='strength-meter-wrapper'>
            <p className='strength-title'>STRENGTH</p>
            <div className='strength-meter'>
              <h4>{strengthTitle}</h4>
              <div className='strength-levels'>
                <span ref={(el) => (bars.current.bar1 = el)} />
                <span ref={(el) => (bars.current.bar2 = el)} />
                <span ref={(el) => (bars.current.bar3 = el)} />
                <span ref={(el) => (bars.current.bar4 = el)} />
              </div>
            </div>
          </div>
          <Button text='Generate' handleGeneratePassword={handleGeneratePassword} />
        </section>
        <ToastContainer />
      </main>
    </>
  )
}

export default App
