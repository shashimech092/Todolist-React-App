import { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import EditForm from "./EditForm";
import TodoItem from "./TodoItem";
import './style.css'

export default function App() {

    const [todo, setTodo] = useState('')
// const [todos, setTodos] = useState([])
   
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});


    const handleAddInputChange = (event) => {
        setTodo(event.target.value)
    }
    function handleAddFormSubmit(e) {
        e.preventDefault();

        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: new Date(),
                    text: todo.trim()
                }
            ]);
        }

        setTodo("");
    }
    function handleDeleteClick(id) {
        const removeItem = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(removeItem);
    }
    function handleEditClick(todo) {    // for here define two more states
        setIsEditing(true);
        setCurrentTodo({ ...todo });
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();

        handleUpdateTodo(currentTodo.id, currentTodo);
    }
    function handleEditInputChange(e) {
        setCurrentTodo({ ...currentTodo, text: e.target.value });
        console.log(currentTodo);
    }

    function handleUpdateTodo(id, updatedTodo) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodos(updatedItem);
    }


    return (
        <div className="App">
            {isEditing ? (<EditForm
                currentTodo={currentTodo}
                setIsEditing={setIsEditing}
                onEditInputChange={handleEditInputChange}
                onEditFormSubmit={handleEditFormSubmit}

            />
            ) : (<AddTodoForm
                todo={todo}
                onAddFormSubmit={handleAddFormSubmit}
                onAddInputChange={handleAddInputChange}
            />
            )}
            <ul className="todo-list">
                {todos.map((todo) => (
                    <TodoItem
                        todo={todo}
                          onEditClick={handleEditClick}
                          onDeleteClick={handleDeleteClick}
                    />
                ))}
            </ul>
           
        </div>)
    
}