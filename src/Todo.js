import React, { useState } from 'react';





// task buttons: 
//      tick/untick button => div class=done/todo
//      delete (bin) onClick task is deleted from todo
//      archive (folder) onClick task is added to archive and deleted from todo
//      when in archive button is back to todo and reverts the operation
 
// CSS div class=task class=done/todo

// task object? status: bool, content: string,
// 2 arrays: todo / archive

// add task when pressing enter

// grey out add task button when text field empty
// see disabled in https://www.w3schools.com/html/html_form_input_types.asp
// and https://www.w3schools.com/html/html_form_attributes.asp
// do not accept 
// empty field when add task button pressed

// STRETCH
// archive all done tasks
// move done tasks to the bottom of the list



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
        storedTasks.push(newTask);
        setTaskList(storedTasks);   
        
    }

    const addHandler = () => {
        // create a new array as the actual one cannot be edited directly
        if (inputText) {
            let storedTasks = [...taskList];
            let newTask = {done: false, content: inputText};
            storedTasks.push(newTask);
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




    return (
        <div >
            <h1>tasks</h1>

            <input onChange={inputHandler} value={inputText}/>            
            <button onClick={addHandler}>add task</button>

            {taskList.map((task, index) => {
                // here we pass the index to that function using anonymous function
                // return <h1 onClick={() => removeHandler(index)} key={index}>{number}</h1>
                return (
                    <div key={index} className="task" className={task.done.toString()}>
                        <input type="checkbox" checked={task.done} onChange={() => markDone(index)}></input>
                        <p onClick={() => removeHandler(index)}>{task.content}</p>
                    </div>

                )
                
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