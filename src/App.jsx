// import { useCallback, useEffect, useRef, useState } from 'react'
// import './App.css'

// function App() {

//   const [length, setLength] = useState(8);
//   const [number, setNumber] = useState(false);
//   const [char, setChar] = useState(false);
//   const [password, setPassword] = useState("");

//   // useRef

//   const passRef = useRef(null)

//   const copyPass = useCallback(()=>{
//     passRef.current?.select();
//     // passRef.current?.setSelectionRange(0, 6)
//       window.navigator.clipboard.writeText(password)
//   } , [password])
  

//   const passGanerator = useCallback(()=>{
//      let pass ="" ; 
//      let str = "ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz"; 

//      if(number){
//       str += "0123456789"
//      }
//      if(char){
//       str += "!@#$%^&*(){}[]~`"
//      }

//      for (let i = 1; i <= length; i++) {
//         let char = Math.floor(Math.random()*str.length + 1 ) 

//         pass += str.charAt(char)
//      }

//      setPassword(pass)

//   }, [length , number , char , setPassword])

//   useEffect(()=>{
//     passGanerator()
//   } ,[length , number , char , setPassword ])


//   return (
//     <>
//     <div className="w-full max-w-lg mx-auto bg-gray-900 rounded-2xl p-6 shadow-2xl my-10 text-orange-500">
//   <h1 className="text-white text-center text-4xl font-bold mb-6">🔐 Password Generator</h1>

//   <div className="flex flex-col sm:flex-row gap-3 items-stretch shadow-md rounded-xl overflow-hidden bg-white">
//     <input
//       value={password}
//       ref={passRef}
//       className="flex-1 px-4 py-3 text-lg text-gray-800 bg-amber-50 outline-none rounded-l-xl sm:rounded-none"
//       placeholder="Your Secure Password"
//       readOnly
//       type="text"
//     />
//     <button
//       onClick={copyPass}
//       className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 text-sm font-medium rounded-xl sm:rounded-none sm:rounded-r-xl"
//     >
//       Copy
//     </button>
//   </div>

//   <div className="mt-6 space-y-4">
//     <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//       <label className="text-orange-300 font-medium">
//         Length: <span className="text-white font-semibold">{length}</span>
//       </label>
//       <input
//         type="range"
//         min={6}
//         max={100}
//         value={length}
//         onChange={(e) => setLength(e.target.value)}
//         className="w-full sm:w-2/3 accent-orange-500 cursor-pointer"
//       />
//     </div>

//     <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white">
//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           defaultChecked={number}
//           onChange={() => setNumber((prev) => !prev)}
//           className="accent-orange-500"
//         />
//         Include Numbers
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           defaultChecked={char}
//           onChange={() => setChar((prev) => !prev)}
//           className="accent-orange-500"
//         />
//         Include Special Characters
//       </label>
//     </div>
//   </div>
// </div>

//     </>
//   )
// }

// export default App






// 




import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  
  // State for password range selection
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(length);
  
  const passRef = useRef(null);

  const copyPass = useCallback(() => {
    const passwordToCopy = password.slice(startIndex, endIndex);
    passRef.current?.select();
     passRef.current?.setSelectionRange(startIndex , endIndex)
    navigator.clipboard.writeText(passwordToCopy);
  }, [password, startIndex, endIndex]);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz";

    if (number) {
      str += "0123456789";
    }
    if (char) {
      str += "!@#$%^&*(){}[]~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setEndIndex(length);  // Adjust the endIndex when password length changes
  }, [length, number, char]);

  useEffect(() => {
    passGenerator();
  }, [length, number, char]);

  useEffect(() => {
    setEndIndex(length);
  }, [length]);

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900 rounded-2xl p-6 shadow-2xl my-10 text-orange-500">
      <h1 className="text-white text-center text-4xl font-bold mb-6">🔐 Password Generator</h1>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch shadow-md rounded-xl overflow-hidden bg-white">
        <input
          value={password}
          ref={passRef}
          className="flex-1 px-4 py-3 text-lg text-gray-800 bg-amber-50 outline-none rounded-l-xl sm:rounded-none"
          placeholder="Your Secure Password"
          readOnly
          type="text"
        />
        <button
          onClick={copyPass}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 text-sm font-medium rounded-xl sm:rounded-none sm:rounded-r-xl"
        >
          Copy
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <label className="text-orange-300 font-medium">
            Length: <span className="text-white font-semibold">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full sm:w-2/3 accent-orange-500 cursor-pointer"
          />
        </div>

        {/* Range for selecting password portion to copy */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white">
          <div className="flex items-center gap-2">
            <label>Start:</label>
            <input
              type="number"
              min={0}
              max={length}
              value={startIndex}
              onChange={(e) => setStartIndex(parseInt(e.target.value))}
              className="w-20 px-2 py-1 text-gray-800 bg-amber-50 rounded-md"
            />
          </div>

          <div className="flex items-center gap-2">
            <label>End:</label>
            <input
              type="number"
              min={0}
              max={length}
              value={endIndex}
              onChange={(e) => setEndIndex(parseInt(e.target.value))}
              className="w-20 px-2 py-1 text-gray-800 bg-amber-50 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={number}
              onChange={() => setNumber((prev) => !prev)}
              className="accent-orange-500"
            />
            Include Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={char}
              onChange={() => setChar((prev) => !prev)}
              className="accent-orange-500"
            />
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
