import React from "react";
import { MdClose, MdAdd } from "react-icons/md";
import Task from "../Task/Task";
import "./styles.css";

function TaskList({
  title,
  group,
  removeGroup,
  tasks,
  addTask,
  updateTask,
  removeTask,
  groups,
}) {
  // função que gera uma nova task
  function onAddTask() {
    addTask("Nova Tarefa", group);
  }

  // função que remove um grupo de tasks
  function onRemoveGroup() {
    removeGroup(group);
  }

  return (
    <div className="task-list">
      <header className="task-header">
        <h2>{title}</h2>
        <button className="task-remove" onClick={onRemoveGroup}>
          <MdClose size={24} className="task-icon" />
        </button>
      </header>
      <div className="task-content">
        {tasks.length === 0 && (
          <div className="empty">
            <p>Lista vazia!</p>
          </div>
        )}
        {tasks.length !== 0 &&
          tasks.map(({ id, title, group }) => {
            return (
              <Task
                key={id}
                taskId={id}
                taskTitle={title}
                taskGroup={group}
                groups={groups}
                updateTask={updateTask}
                removeTask={removeTask}
              />
            );
          })}
      </div>

      {/* Botão que permite adicionar uma nova task */}
      <button className="task-btn-add" onClick={onAddTask}>
        Novo Card <MdAdd size={24} />
      </button>
    </div>
  );
}

export default TaskList;
