import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Input from './Input';

function App() {
  const [data, setData] = useState({})
  const [amount, setAmount] = useState("")
  const [newAmount, setNewAmount] = useState("")
  const [currency1, setCurrency1] = useState("usd");
  const [currency2, setCurrency2] = useState("inr");

  const onAmountChange = (amount) => {
    setAmount(amount);
  }
  const onNewAmountChange = (amount) => {
    setNewAmount(amount);
  }
  const clearInput = () => {
    setAmount("")
    setNewAmount("")
  }
  const currencyChange1 = (currency1) => {
    clearInput()
    setCurrency1(currency1.toLowerCase());
  }
  const currencyChange2 = (currency2) => {
    clearInput()
    setCurrency2(currency2.toLowerCase());
  }

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1}.json`)
      .then((res) => res.json())
      .then((res) => setData(res[currency1]))
  }, [currency1])

  const options = Object.keys(data)

  const handleClick = () => {
    let x=parseFloat(amount) * parseFloat(data[currency2])
    setNewAmount(x.toFixed(4))
  }
  const swap=()=>{
    setCurrency1(currency2)
    setCurrency2(currency1)
    setNewAmount(amount)
    setAmount(newAmount)
  }
  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}>
      <div className="w-2/4 flex flex-col justify-center items-center max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <div className=' flex items-center justify-between w-11/12'>
          <span className='text-xl h-10 w-20 flex justify-center items-center font-medium'>From</span>
          <Input
            currency={currency1}
            onAmountChange={onAmountChange}
            amount={amount}
            currencyChange1={currencyChange1} options={options}
          />
        </div>
        <div className="relative w-full h-0.5 z-10">
          <button
            type="button"
            className="absolute left-56 h-9 top-1 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
          onClick={swap}
          >
            swap
          </button>
        </div>
        <div className='flex items-center justify-between w-11/12'>
          <span className='text-xl h-full w-20 flex justify-center items-center font-medium'>To</span>
          <Input
            currency={currency2}
            onAmountChange={onNewAmountChange}
            amount={newAmount}
            options={options} currencyChange2={currencyChange2}
          />
        </div>

        <button
          type="submit"
          className="flex w-11/12 my-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleClick}
        >
          Convert {currency1.toUpperCase()} to {currency2.toUpperCase()}
        </button>

      </div>
    </div>
    // </div>
  );
}

export default App;
