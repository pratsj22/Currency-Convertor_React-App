import React from 'react'

const Input = ({
    label,
    onAmountChange,
    amount,
    currencyChange1,
    currencyChange2,
    options,
    currency
}) => {
  const handleChange=(e)=>{
    onAmountChange("")
    if(currencyChange1){
      currencyChange1(e.target.value)
    }
    else if(currencyChange2){
      currencyChange2(e.target.value)
    }
  }
  return (
      <div className="flex items-center justify-between w-4/5">
        <div className="relative mt-2 rounded-md shadow-sm w-96">
          <input
            type="text"
            name="price"
            id={label}
            className="h-11 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            value={amount}
            onChange={(e)=>onAmountChange(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              onChange={(e)=>handleChange(e)}
              value={currency.toUpperCase()}
            >
              {options && options.map((item)=>{
                return <option key={item} value={item.toUpperCase()}>{item.toUpperCase()}</option>
              })}
            </select>
          </div>
        </div>
      </div>
  )
}

export default Input