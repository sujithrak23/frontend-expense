import React, { useState } from "react";

const ExpenseForm = ({addExpense}) => {
  const [title, setTitle] = useState(" ")
  const [amount, setAmount] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({title, amount})
    console.log("submitted")
    addExpense(title,amount)
    setTitle("")
    setAmount(0)
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  // handle amount change
  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange}/>
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" value={amount} onChange={handleAmountChange}/>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default ExpenseForm;