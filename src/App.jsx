import { useRef, useState } from 'react'
import './App.css'
import CopyIcon from './components/svg/CopyIcon'

const CHARACTERS_SET = {
  uppercase: ['ABCDEFGHIJKLMNÑOPQRSTUVWXYZ', 26],
  lowercase: ['abcdefghijklmnñopqrstuvwxyz', 26],
  numbers: ['0123456789', 10],
  symbols: ['!@#$%^&*()', 10],
}

const App = () => {
  const [valueRange, setvalueRange] = useState(10)
  const [password, setPassword] = useState('')
  const [charPool, setCharPool] = useState(0)
  const [strengthTitle, setStrengthTitle] = useState('Weak')

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
    setCharPool(0)
    let includesSets = []

    const charactersArray = Object.entries(characters)
    charactersArray.forEach(([character, flag]) => {
      if (flag) {
        includesSets.push(CHARACTERS_SET[character][0])
        setCharPool((prev) => prev + CHARACTERS_SET[character][1])
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

      const strength = calculateStrengthPassword(valueRange, charPool)
      styleLevelsBars(strength)
      setPassword(pass)
    }
  }

  const styleLevelsBars = (strength) => {
    const { strengthTextLevel, strengthLevels } = strength
    const barsToFill = Array.from(Object.values(bars.current)).slice(0, strengthLevels)
    setStrengthTitle(strengthTextLevel)

    switch (strengthLevels) {
      case 1:
        break

      default:
        break
    }
  }

  const calculateStrengthPassword = (passwordLength, charPoolSize) => {
    const strength = passwordLength * Math.log2(charPoolSize)
    console.log(strength)
    if (strength < 25) {
      return { strengthTextLevel: 'Too Weak', strengthLevels: 1 }
    } else if (strength >= 25 && strength < 50) {
      return { strengthTextLevel: 'Weak', strengthLevels: 2 }
    } else if (strength >= 50 && strength < 75) {
      return { strengthTextLevel: 'Medium', strengthLevels: 3 }
    } else {
      return { strengthTextLevel: 'Strong', strengthLevels: 4 }
    }
  }

  return (
    <>
      <main className='wrapper-main'>
        <h1 className='password-title'>Password Generator</h1>
        <header>
          <input type='text' readOnly value={password} className='password-copy__input' />
          <CopyIcon />
        </header>
        <section className='wrapper-body'>
          <div className='wrapper-length'>
            <h3 className='password-subtitle'>Character Legth</h3>
            <span className='password-character__length'>{valueRange}</span>
          </div>
          <input
            type='range'
            onChange={handleChangeRange}
            min='1'
            defaultValue={10}
            max='20'
            className='password-range__input'
            style={{ backgroundSize: `${valueRange * 5}% 100%` }}
          />

          <div className='wrapper-checkboxs'>
            <div>
              <label htmlFor='uppercase' className='password-label'>
                <input
                  type='checkbox'
                  name='uppercase'
                  checked={characters.uppercase}
                  onChange={(e) => handleChangeCheckbox('uppercase', e.currentTarget.checked)}
                  id='uppercase'
                  className='password-checkbox'
                />
                <span className='custom-checkbox' />
                Include Uppercase Letters
              </label>
            </div>
            <div>
              <label htmlFor='lowercase' className='password-label'>
                <input
                  type='checkbox'
                  name='lowercase'
                  checked={characters.lowercase}
                  id='lowercase'
                  onChange={(e) => handleChangeCheckbox('lowercase', e.currentTarget.checked)}
                  className='password-checkbox'
                />
                <span className='custom-checkbox' />
                Include Lowercase Letters
              </label>
            </div>
            <div>
              <label htmlFor='numbers' className='password-label'>
                <input
                  type='checkbox'
                  name='numbers'
                  checked={characters.numbers}
                  id='numbers'
                  onChange={(e) => handleChangeCheckbox('numbers', e.currentTarget.checked)}
                  className='password-checkbox'
                />
                <span className='custom-checkbox' />
                Include Numbers
              </label>
            </div>
            <div>
              <label htmlFor='symbols' className='password-label'>
                <input
                  type='checkbox'
                  name='symbols'
                  checked={characters.symbols}
                  id='symbols'
                  onChange={(e) => handleChangeCheckbox('symbols', e.currentTarget.checked)}
                  className='password-checkbox'
                />
                <span className='custom-checkbox' />
                Include Symbols
              </label>
            </div>
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
          <button className='generate-password' onClick={handleGeneratePassword}>
            Generate
          </button>
        </section>
      </main>
    </>
  )
}

export default App
