import React, { useState } from 'react';
import './Todo.css';



let Tasks = () => {


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