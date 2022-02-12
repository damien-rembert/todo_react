import React, { useState } from 'react';
import './Todo.css';


// TODO
// make the meaning of "switch mode" obvious
// CSS add a bit of padding
// grey out add task button when text field empty
    // see disabled in https://www.w3schools.com/html/html_form_input_types.asp
    // and https://www.w3schools.com/html/html_form_attributes.asp
// archive all done tasks
// if a task will be more than x characters the form should say it's too long
// add a timestamp to task objects
// sort by completed then time added https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

// DONE
// when pressing enter in text field, add task
// add text for buttons
// CSS if a task is very long the text should wrap
// CSS checkbox and buttons should be sitting in squares and stay at the end of their side
// 2 arrays: todo / archive
// archive (folder) onClick task is added to archive and deleted from todo
// edit item click on pen button removes task but send text to the input field




let Tasks = () => {

    // task object? status: bool, content: string,


    // let task1 = {done: false, content: "I'm task 1"};
    // let task2 = {done: false, content: "I'm task 2"};
    // let task3 = {done: false, content: "I'm task 3"};
    // let atask1 = {done: false, content: "I'm atask 1"};
    // let atask2 = {done: false, content: "I'm atask 2"};
    // let atask3 = {done: false, content: "I'm taask 3"};
    // const [taskList, setTaskList] = useState([task1, task2, task3]);
    // const [archiveList, setArchiveList] = useState([atask1, atask2, atask3]);

    const [taskList, setTaskList] = useState([]);
    const [archiveList, setArchiveList] = useState([]);

    const [inputText, setInputText] = useState("");

    const inputHandler = (event) => {
        setInputText(event.target.value);
    }

    const spliceTask = (index) => {
        let storedTasks = [...taskList];
        let deletedTask = storedTasks.splice(index, 1)[0];
        setTaskList(storedTasks);
        return deletedTask;
    }

    const tickHandler = (index) => {
        let storedTasks = [...taskList];
        let oldTask = storedTasks.splice(index, 1)[0];
        oldTask = {done: (!oldTask.done), content: oldTask.content};
        if (oldTask.done) {
            storedTasks.push(oldTask);            
        } else {
            storedTasks.unshift(oldTask);
        }
        setTaskList(storedTasks);
    }

    const addHandler = () => {
        if (inputText) {
            let storedTasks = [...taskList];
            let newTask = {done: false, content: inputText};
            storedTasks.unshift(newTask);
            setInputText('');
            setTaskList(storedTasks);            
        } 
    }

    const captureEnter = ({key}) => {
        if (key === "Enter") {
            addHandler();
        }
    }

    const archiveHandler = (index) => {
        let storedTask = spliceTask(index);
        let storedArchive = [...archiveList];
        storedArchive.push(storedTask);
        setArchiveList(storedArchive);
    }

    const editHandler = (index) => {
        setInputText(spliceTask(index).content);
    }

    const switchArray = (index) => {
        let storedTasks = [...taskList];
        let storedArchive = [...archiveList];
        setTaskList(storedArchive);
        setArchiveList(storedTasks);
    }
    
    return (
        <div >
            <input onChange={inputHandler} onKeyPress={captureEnter} value={inputText}/>            
            <button onClick={addHandler}>add task</button>

            <div key='list' className='list'>

            {taskList.map((task, index) => {
                let doneString = task.done.toString();
                return <Task key={index.toString()} index={index} doneString={doneString} done={task.done} content={task.content} ticker={tickHandler} remover={spliceTask} archiver={archiveHandler} editer={editHandler}/>
            })}
            </div>
            <div>
                <button onClick={switchArray}>Switch mode</button>
            </div>

        </div>
    );    
}

let Task = (props) => {
    return (
        <div className={props.doneString}>
            <input  className='button' type="checkbox" checked={props.done} onChange={() => props.ticker(props.index)}></input>
                <div className='texttask'>
                    <p className='task'>{props.content}</p>
                </div>
            <div className='buttons'>
                <label><button className='button' onClick={() => props.remover(props.index)}>&#x1F5D1;</button>delete</label>
                <label><button className='button' onClick={() => props.archiver(props.index)}>&#128193;</button>archive</label>
                <label><button className='button' onClick={() => props.editer(props.index)}>&#128393;</button>edit</label>
                </div>
        </div>
    )
}

let Todo = () => {
    return (

        <div className='title'>
            <h1>Todo List</h1>
            <Tasks />
        </div>
    )
};

export default Todo;