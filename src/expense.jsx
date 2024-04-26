import React, { useState, useEffect} from "react";
import ExpenseItem from "./components/expenseItem";
import ExpenseForm from "./components/expenseForm";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Logout from "./components/logout";

export default function Expense() {
 
  const [expense, setExpense] = useState([]);

  const[income, setIncome] = useState(0);
  const[outgoing, setOutgoing] = useState(0);
  const [cookies] = useCookies(['token'])

  const getExpenses = ()=>{
    fetch(`http://localhost:5000/expense/all/${cookies.userID}`,{
      headers: {
        'Authorization' : `Bearer ${cookies.token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.status === "failure"){
        setExpense([])
      }
      else{
        setExpense(data)
      }
    })  
    .catch((err)=>{
      console.log(err)
    })
  };

  useEffect(()=>{
    getExpenses();
  }, []);

  useEffect(() => {
    let income = 0;
    let outgoing =0;
    expense.forEach((expense) => {
      if(expense.amount > 0){
        income += parseFloat(expense.amount)
      }
      else{
        outgoing += parseFloat(expense.amount)
      }
    });
    setIncome(income)
    setOutgoing(outgoing)
  },[expense]);


  const deleteExpense = (id) => {
    // for deleting we are passing component from parent to child. that is deleteExpense()

  /* to get that id if we are gwtting that id 
  then using that we can update the state to 
  delete that too this console is an example to delte 
  the particular expense */

    // console.log(expense.filter((expense)=>
    // expense.id != id));

    /* commenting this for backend connection
    setExpense(expense.filter((expense) => expense.id != id));
    */

    fetch(`http://localhost:5000/expense/delete/${id}`,
    {
      method:"DELETE",
      headers: {
        'Authorization' : `Bearer ${cookies.token}`
      }
    })
    .then(()=> getExpenses())
    .catch((err)=> console.log(err));
  };

  const addExpense = (title,amount) =>{
    //console.log({title, amount})
    //append new expense into expense state using setExpense
    // 2 ways - arr push or array spread
    
    //setExpense(expense.push({id:Math.random(), title, amount})) not advisable

    /* commenting this for backend connection
    setExpense([...expense,{id:Math.random(), title:title, amount :amount}])
    */

   fetch(`http://localhost:5000/expense/new/${cookies.userID}`,{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      'Authorization' : `Bearer ${cookies.token}`
    },
    body: JSON.stringify({
      amount,
      category: title,
      userID: `${cookies.userID}`,
      date: new Date(),
    })
  }).then(()=> {  // using this after adding these post method also displayed in UI else won't 
      getExpenses();
   }).catch(err => console.log(err))
  };

  return (
    <>
      <div>
      <Link to="/" >Album</Link>
      <Logout/>
        <div>Expense Tracker</div>
        <div className="balance">Balance: {income + outgoing}</div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>{income}</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>{outgoing}</span>
          </div>
        </div>
        {/* form */}
      </div>
      {/* list expenses */}
      {/*<ExpenseItem title ={"test"} amount={10}/>*/}
      <ExpenseForm addExpense={addExpense}/>

      {expense.map((expense) => (
        <ExpenseItem
          key={expense._id}
          title={expense.category}
          amount={expense.amount}
          id={expense._id}
          deleteExpense={deleteExpense}
        />
      ))}
    </>
  );
}