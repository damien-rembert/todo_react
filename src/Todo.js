import React, { useState } from 'react';
// import logo from './logo.svg';
import './Todo.css';


// TODO
// CSS if a task is very long the text should wrap
// CSS checkbox and buttons should be sitting in squares and stay at the end of their side
// grey out add task button when text field empty
    // see disabled in https://www.w3schools.com/html/html_form_input_types.asp
    // and https://www.w3schools.com/html/html_form_attributes.asp
// 2 arrays: todo / archive
// archive (folder) onClick task is added to archive and deleted from todo
// archive all done tasks
// edit item click on pen button removes task but send text to the input field
// if a task will be more than x characters the form should say it's too long
// add a timestamp to task objects
// sort by completed then time added https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

// DONE
// when pressing enter in text field, add task










let Tasks = () => {

    // task object? status: bool, content: string,
    let task1 = {done: false, content: "I'm task 1"};
    let task2 = {done: false, content: "I'm task 2"};
    let task3 = {done: false, content: "I'm task 3"};

    const [taskList, setTaskList] = useState([task1, task2, task3]);
    const [inputText, setInputText] = useState("");



    const inputHandler = (event) => {
        setInputText(event.target.value);
    }

    const markDone = (index) => {
        console.log("click");
        // see checked https://www.w3schools.com/html/html_form_input_types.asp
        // and https://www.w3schools.com/html/html_form_attributes.asp
        let storedTasks = [...taskList];
        let oldTask = storedTasks.splice(index, 1)[0];
        let newTask = {done: (!oldTask.done), content: oldTask.content};
        if (newTask.done) {
            storedTasks.push(newTask);            
        } else {
            storedTasks.unshift(newTask);
        }
        
        setTaskList(storedTasks);   
        
    }

    const addHandler = () => {
        // create a new array as the actual one cannot be edited directly
        if (inputText) {
            let storedTasks = [...taskList];
            let newTask = {done: false, content: inputText};
            storedTasks.unshift(newTask);
            setInputText('');
            // replace the state array with the edited version 
            setTaskList(storedTasks);            
        } 
    }

    const removeHandler = (index) => {
        let storedTasks = [...taskList];
        storedTasks.splice(index, 1);
        setTaskList(storedTasks);
    }

    const captureEnter = ({key}) => {
        // create a p to add to the div
        if (key === "Enter") {
            addHandler();
        }
    }
    




    return (
        <div >
            <input onChange={inputHandler} onKeyPress={captureEnter} value={inputText}/>            
            <button onClick={addHandler}>add task</button>

            <div className='list'>

            {taskList.map((task, index) => {
                return (
                    <div key={index} className={task.done.toString()}>
                        <input  className='button' type="checkbox" checked={task.done} onChange={() => markDone(index)}></input>
                        <p className='task'>{task.content}</p>
                        <p className='button' onClick={() => removeHandler(index)}>&#x1F5D1;</p>
                        <p className='button' onClick={() => removeHandler(index)}>&#128193; &#x1F4C1;</p>
                        <p className='button' onClick={() => removeHandler(index)}>&#128194; &#x1F4C2;</p>
                    </div>
                )
            })}
            </div>
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