import React, {useState} from "react";
import {nanoid} from "nanoid";
import Form from "./components/Form";
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

const FILTER_NAME = Object.keys(FILTER_MAP)

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function addTask(name) {
    const newTask = {id: "todo-"+nanoid(), name:name, completed:false};
    setTasks([...tasks,newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task;
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const renamingTasks = tasks.filter(task => id !== task.id)
    setTasks(renamingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id == task.id) {
        return {
          ...task,
          name:newName
        }
      }
      return task
    })
    setTasks(editedTaskList)
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map(
    task => (
      <Todo
       id={task.id}
       name={task.name}
       completed={task.completed}
       key={task.id}
       toggleTaskCompleted={toggleTaskCompleted}
       deleteTask={deleteTask}
       editTask={editTask}
      />
    )
  )

  return (
    <div className="stack-large todoapp" >
      <Form addTask={addTask} />
      <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}

export default App;