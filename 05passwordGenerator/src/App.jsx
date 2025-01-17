import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  //ref hook
  const passwordRef = useRef(null) // talking or providing to line no:50

  const passwordGenerator = useCallback(()=>{ // useCallback use to memorize the function to reuse it later instead of creating a new one every render
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+-=[]{};'"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char); 
    }

    setPassword([pass])
  }, [length,numberAllowed,charAllowed,setPassword]) // in this we are talking about optimization

  const copyPasswordToClipboard = useCallback(()=>{ 
    passwordRef.current?.select(); // to make a effect of copying the password for better UI we will use useRef() for it
    // passwordRef.current?.setSelectionRange(0,3) // for selecting only 3 values
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator]) // in this we are talking about if something change , it will re run automatically

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className="text-white text-center my-3">Password Generator:</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value = {password}
        className='outline-none w-full px-3 py-1'
        placeholder='password'
        readOnly
        ref = {passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className="flex items-center gap-x-1">
          <input 
          type="range" 
          min= {8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={ (e) => {setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={ () => {setNumberAllowed((prev) => !prev)}}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={ () => {setCharAllowed((prev) => !prev)}}
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
