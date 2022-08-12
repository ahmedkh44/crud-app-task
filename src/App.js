import './App.css';
import {db} from './Firebase';
import {uid} from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { useState, useEffect } from 'react'

function App() {

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([])
  const [itemEdit, setItemEdit] = useState(false)
  const [tempUid, setTempUid] = useState('')

  const handleChange = (e) => {
    setTodo(e.target.value)


  }


  //write
  const writeToDatabase = () => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      todo,
      uuid,
    });
  
    setTodo('')
  }


  //read
  useEffect(() => {
    onValue(ref(db), snapshot => {
      setTodos([])
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map(todo => {
          setTodos(oArray => [...oArray, todo])
        });
      }
    });
  }, []);


  //edit
  const handleEdite = (todo) => {
    setItemEdit(true);
    setTempUid(todo.uuid);
    setTodo(todo.todo)
  };

  const handlSubmitEdite = () => {
    update(ref(db, `${tempUid}`), {
      todo,
      uuid: tempUid,
    });
    setTodo('');
    setItemEdit(false);
  };


  //delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`))

  }


  return (
    <div className="App">
      <div className='container'>
        <input type='text' value={todo} onChange={handleChange} placeholder='Type' />
        {itemEdit ? (
          <>
            <button onClick={handlSubmitEdite} className='btn'>Submit Change</button>
            <button className='close' onClick={() => {
              setItemEdit(false)
              setTodo('')
            }}>X</button>
          </>
        ) :
        (
          <button onClick={writeToDatabase} className='btn'>Add</button>
        )}
        {todos.map((todo) => (
          <>
          <div className='todo-item'>
            <h1>{todo.todo}</h1>
            <button className='btn-updata' onClick={() => handleEdite(todo)}>Updata</button>
            <button className='btn-delete' onClick={() => handleDelete(todo)}>Delete</button>
          </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
