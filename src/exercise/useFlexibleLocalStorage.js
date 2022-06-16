import React from 'react'

export const useFlexibleLocalStorage = ({itemValue, itemKey}) => {
  const getValue = () => {
    const localValue = localStorage.getItem(itemKey)
    if (localValue !== 'undefined' && typeof localValue !== 'string') {
      return JSON.parse(localValue)
    } else {
      return localValue || itemValue
    }
  }

  const [value, setValue] = React.useState(getValue)

  React.useEffect(() => {
    if (typeof value !== 'string') {
      localStorage.setItem(itemKey, JSON.stringify(value))
    } else {
      localStorage.setItem(itemKey, value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(value)])

  return [value, setValue]
}
