export const calculateStrengthPassword = (passwordLength, charPoolSize) => {
  const strength = passwordLength * Math.log2(charPoolSize)

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

export const resetStylesLevelsBars = (barsArr = []) => {
  barsArr.forEach((bar) => {
    bar.style.backgroundColor = '#18171f'
    bar.style.borderColor = '#fff'
  })
}

export const styleLevelsBars = (barsToFill = [], variableColor) => {
  barsToFill.forEach((bar) => {
    bar.style.backgroundColor = variableColor
    bar.style.borderColor = variableColor
  })
}
export const createLevelsBars = (strengthLevels, barsArray) => {
  const barsArr = Array.from(Object.values(barsArray))
  const barsToFill = barsArr.slice(0, strengthLevels)

  // reset background color and border color
  resetStylesLevelsBars(barsArr)

  switch (strengthLevels) {
    case 1:
      styleLevelsBars(barsToFill, 'var(--theme-too-weak-color)')
      break
    case 2:
      styleLevelsBars(barsToFill, 'var(--theme-weak-color)')
      break
    case 3:
      styleLevelsBars(barsToFill, 'var(--theme-medium-color)')
      break
    case 4:
      styleLevelsBars(barsToFill, 'var(--theme-primary-color)')
      break
    default:
      break
  }
}
