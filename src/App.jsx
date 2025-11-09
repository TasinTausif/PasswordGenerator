import './App.css'
import { useState, useCallback, useEffect, useRef } from "react"

export default function App() {
  // state values
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef Hook
  const passwordCopyRef = useRef(null)

  // useCacllBack caches the function and renders only the changes after each call
  const passwordGenerate = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbersAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_[]{}|~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numbersAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordCopyRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  // useEffect Hook
  useEffect(() => passwordGenerate(), [length, numbersAllowed, charAllowed, setPassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-4xl text-center my-3 text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordCopyRef}
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPasswordToClipBoard}
            >
              Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex gap-x-1 items-center'>
            <input
              type="range"
              className=''
              min={8}
              max={30}
              value={length}
              onChange={(e) => setLength(e.currentTarget.value)}
            />
            <label htmlFor="length">Length:{length}</label>
          </div>
          <div className='flex gap-x-1 text-center'>
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              onChange={() => setNumbersAllowed(prev => !prev)}
              id='numberInput'
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex gap-x-1 text-center'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              id='specialCharInput'
            />
            <label htmlFor="specialCharInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}