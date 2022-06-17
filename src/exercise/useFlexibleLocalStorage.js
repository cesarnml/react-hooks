import React from 'react'

export const useFlexibleLocalStorage = ({
  key,
  initialValue = '',
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}) => {
  const getValue = () => {
    const localValue = localStorage.getItem(key)
    if (localValue) {
      return deserialize(localValue)
    } else {
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }
  }

  const [value, setValue] = React.useState(getValue)

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    localStorage.setItem(key, serialize(value))
  }, [key, serialize, value])

  return [value, setValue]
}
