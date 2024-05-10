import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
const [expense , setExpense] = useState([
    {
        id: uuidv4(),
        title: "Movie",
        amount: 200,
        date: "12-04-2024",
    },
    {
        id: uuidv4(),
        title: "Food",
        amount: 500,
        date: "13-04-2024",
    },
]);
const [title, setTitle] = useState("");
const [amount, setAmount] = useState(0);
const [isEdit, setIsEdit] = useState(false);
const [editId , setEditId] = useState("")


const nowDate = new Date();
const month = nowDate.getMonth() +1;
const day = nowDate.getDate();
const year = nowDate.getFullYear();
const currentDate = `${day}-${month}-${year}`;

const handleSubmit = (e)=>{

    e.preventDefault();
    if(!isEdit){
    if(!title || !amount){
        alert("please fill all fields")
        return;
    }
    let newItem = {
        id: uuidv4(),
        title: title,
        amount: parseFloat(amount),
        date: currentDate,
    };
    setExpense([...expense, newItem]);
    setTitle("");
    setAmount(0);
} else{
    
    setExpense(
        expense.map((ite) => 
            ite.id === editId ? {...ite, title, amount}: ite)
    );
    setTitle("")
    setAmount(0)
    setIsEdit(false)
    }
};

const handleEdit = (id)=>{
    setIsEdit(true);
    setEditId(id);
    const editObj = expense.find((ite)=> id === ite.id);
    setTitle(editObj.title);
    setAmount(parseFloat(editObj.amount));

};



  return (
    <>
      <h1>Expense Tracker</h1>

      <form 
      style = {{display:"flex",flexDirection: "column",gap: 10}}
      onSubmit={(e)=>handleSubmit(e)}
      >
        <input 
            value ={title}
            type='text' 
            placeholder='Title' 
            onChange={(e)=>setTitle(e.target.value)}
            required
        />
        <input 
            value={amount}
            type='number' 
            placeholder='Amount' 
            onChange={(e)=>setAmount(e.target.value)} 
            required
        />
        
        
        <button type='submit'>{isEdit ? "Update":"Submit"}</button>
      </form>
    
      <table border={1} style={{marginTop: 10}}>
        <thead>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
        </thead>
        <tbody>
            {
                expense.map((_)=>(
                    <tr key={_.id}>
                        <td>{_.title}</td>
                        <td>{_.amount}</td>
                        <td>{_.date}</td>
                        <td><button style={{padding: 7}}onClick={() =>handleEdit(_.id)}>
                            Edit
                            </button>
                            </td>
                    </tr>
                ))
            }
        </tbody>
      </table>
      
    </>
  );
};

export default Home