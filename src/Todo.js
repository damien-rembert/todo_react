import React, { useState } from 'react';





// task buttons: tick/untick button delete archive buttons
// bin button: remove task
// div class=task class=done/todo

// task object? status: bool, content: string, 
// array todo / archive
// grey out add task button when text field empty
// empty field when add task button pressed

// STRETCH
// archive all ticked tasks



let Tasks = () => {

    const [taskList, setTaskList] = useState(["task1", "task2", "task3"]);
    const [inputText, setInputText] = useState("");



    const inputHandler = (event) => {
        setInputText(event.target.value);
    }

    const addHandler = () => {
        // create a new array as the actual one cannot be edited directly
        let storedTasks = [...taskList];
        storedTasks.push(inputText);
        setInputText('');
        // replace the state array with the edited version 
        setTaskList(storedTasks);
    }

    const removeHandler = (index) => {
        let storedTasks = [...taskList];
        storedTasks.splice(index, 1);
        setTaskList(storedTasks);
    }

    // use input text
    // const [inputText, setInputText] = useState("");
    // const handler = (event) => {
    //     setInputText(event.target.value);
    // }

    // return (
    //     <div>
    //         <h1>user input</h1>
    //         <input onChange={handler} />
    //         <h2>{inputText}</h2>
    //     </div>
    // )



    return (
        <div >
            <h1>tasks</h1>

            <input onChange={inputHandler} value={inputText}/>            
            <button onClick={addHandler}>add task</button>

            {taskList.map((task, index) => {
                // here we pass the index to that function using anonymous function
                // return <h1 onClick={() => removeHandler(index)} key={index}>{number}</h1>
                return <h1 key={index} onClick={() => removeHandler(index)}>{task}</h1>
            })}
        </div>
    );



}



let Todo = () => {






    return (
        <React.Fragment>
            <h1>Todo List</h1>
            <Tasks/>
        </React.Fragment>
    )
};

export default Todo;