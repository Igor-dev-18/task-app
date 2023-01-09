import React, { useState } from "react";
import { MdAdd, MdViewColumn, MdViewComfy } from "react-icons/md";

import "./styles.css";

import TaskList from "../TaskList/TaskList";

let id = 0;

function GenerateId() {
  return id++;
}

function Board() {
  const [groups, setGroups] = useState([]);
  const [isGroupEditing, setIsGroupEditing] = useState(false);
  const [newGroup, setNewGroup] = useState();

  const [tasks, setTasks] = useState([]);

  const [modeView,setModeView] = useState('column');

  // Funções das tasks

  // função que gera uma nova task
  function addTask(title, group) {
    const newTask = {
      id: GenerateId(),
      title,
      group,
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  }

  // função que atualiza a task
  function updateTask(id, title, group) {
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, group };
        } else {
          return task;
        }
      });
    });
  }

  // função que remove a task
  function removeTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  // Funções dos grupos

  // evento que ocorre sempre que o valor do input muda
  function onGroupNameChange(e) {
    const newGroupName = e.target.value;
    setNewGroup(newGroupName);
  }
  // evento para adicionar um novo grupo a lista de grupos
  function addNewGroup(groupName) {
    if (groupName) {
      setGroups((existingGroups) => {
        return [...existingGroups, groupName];
      });
    }
  }
  // função que salva o grupo sempre que o Enter é pressionado
  function onKeyDown(e) {
    if (e.key === "Enter") {
      addNewGroup(newGroup);
      // sair do mode de edição
      setIsGroupEditing(false);
    }
  }

  // função que remove um grupo
  function removeGroup(groupName) {
    setGroups((groups) => {
      return groups.filter((group) => group !== groupName);
    });

    setTasks((tasks) => {
      return tasks.filter((task) => task.group !== groupName);
    });
  }

  return (
    <div className="board">
      <div className="board-bar">
        {/* botão para adicionar novo grupo */}
        <div
          className="btn-new-group"
          onClick={() => {
            setIsGroupEditing(true);
          }}
        >
          {!isGroupEditing && (
            <>
              Novo Grupo <MdAdd />
            </>
          )}

          {isGroupEditing && (
            <input
              type="text"
              placeholder="Nome do grupo"
              onChange={onGroupNameChange}
              onKeyDown={onKeyDown}
            />
          )}
        </div>

        <div className="options-view">
          <button onClick={()=>{setModeView('column')}}>
          <MdViewColumn size={18}/>
          </button>
          <button onClick={()=>{setModeView('grid')}} datatype="grid">
          <MdViewComfy size={18} />
          </button>

        </div>
      </div>

      <div className={`board-content ${modeView}`}>
        {groups.length !== 0 &&
          groups.map((group) => (
            <TaskList
              key={group}
              title={group}
              group={group}
              removeGroup={removeGroup}
              tasks={tasks.filter((task) => task.group === group)}
              addTask={addTask}
              updateTask={updateTask}
              removeTask={removeTask}
              groups={groups}
            />
          ))}
      </div>
    </div>
  );
}

export default Board;
