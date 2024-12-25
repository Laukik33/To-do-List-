import React, { Fragment } from "react";
import "./App.css";

//components

import InputTodo from "./components/inputTodos";
import ListTodos from "./components/listTodos";

function App() {
    return( 
        <Fragment>
          <div className="container">
            <InputTodo />
            <ListTodos />
          </div>
        </Fragment>
    );
}

export default App;
