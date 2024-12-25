import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./editTodos";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const [description, setDescription] = useState(todos.description);

    //delete todo function

    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    //edit todo function

    const EditTodo = async(id) => {
        
        try {
            
            const body = { description };
            console.log(body);
            const res = await fetch(
            `http://localhost:5000/todos/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };


    const getTodos = async() => {
        try{
            const response=await fetch("http://localhost:5000/todos");
            const jsonData=await response.json();

            setTodos(jsonData);
        }catch(err){
            console.error(err.message);
        }
    };

useEffect(() => {
    getTodos();
}, []);

console.log(todos);

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <Fragment>
                              <button
                                type="button"
                                class="btn btn-warning"
                                data-toggle="modal"
                                data-target={`#id${todo.todo_id}`}
                               >
                                Edit
                              </button>
                            <div
                                class="modal"
                                id={`id${todo.todo_id}`}
                                onClick={() => setDescription(todo.description)}
                            >
                            <div class="modal-dialog">
                               <div class="modal-content">
                                 <div class="modal-header">
                                   <h4 class="modal-title">Edit Todo</h4>
                                   <button
                                     type="button"
                                     class="close"
                                     data-dismiss="modal"
                                     onClick={() => setDescription(todo.description)}
                                   >
                                        &times;
                                   </button>
                            </div>

                            <div class="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            </div>

                            <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        data-dismiss="modal"
                                        onClick={e => EditTodo(todo.todo_id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        data-dismiss="modal"
                                        onClick={() => setDescription(todo.description)}
                                    >
                                        Close
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                        </td>
                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;