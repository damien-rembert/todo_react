

const Task = (props) => {
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

export default Task;