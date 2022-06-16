import React from 'react'

export const useLocalStorageState = initialName => {
  const getName = () => localStorage.getItem('name') || initialName

  const [name, setName] = React.useState(() => getName())

  React.useEffect(() => {
    localStorage.setItem('name', name)
  }, [name])

  return [name, setName]
}
