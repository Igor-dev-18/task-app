import React, { useState } from "react";
import { MdDelete, MdSave, MdClose } from "react-icons/md";
import "./styles.css";

function Task({
  taskId,
  taskTitle,
  taskGroup,
  groups,
  updateTask,
  removeTask,
}) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editableTaskTitle, setEditableTaskTitle] = useState(taskTitle);
  const [editableTaskGroup, setEditableTaskGroup] = useState(taskGroup);

  // função executada toda vez que o título da task muda
  function onChangeTaskTitle(e) {
    const newTitle = e.target.value;
    setEditableTaskTitle(newTitle);
  }
  // função que atualiza a task
  function onUpdateTask() {
    updateTask(taskId, editableTaskTitle, editableTaskGroup);
  }

  // função que remove a task
  function onRemoveTask() {
    removeTask(taskId);
  }

  // função que ocorre ao clicar em salvar
  function saveTask() {
    onUpdateTask();
    setIsEditingTask(false);
  }

  // função que permite alterar o grupo
  function onChangeGroup(e) {
    const newGroup = e.target.value;
    setEditableTaskGroup(newGroup);
  }

  // função que fecha o popup
  function closePopUp(){
    setIsEditingTask(false);
  }

  return (
    <>
      <div
        className="task"
        onClick={() => {
          setIsEditingTask(true);
        }}
      >
        {taskTitle}
      </div>

      {isEditingTask && (
        <div className="popup">
          <div className="editing-task">
            <button className="close-popup" onClick={closePopUp}>
              <MdClose size={18} />
            </button>{" "}
            <input type="text" value={editableTaskTitle} onChange={onChangeTaskTitle} />
            <select value={editableTaskGroup} onChange={onChangeGroup}>
              {groups.map((group) => {
                return (
                  <option key={group} value={group}>
                    {group}
                  </option>
                );
              })}
            </select>
            <div className="buttons-task">
              <button className="btn-save" onClick={saveTask}>
                Salvar <MdSave size={24} />
              </button>
              <button className="btn-remove" onClick={onRemoveTask}>
                Remover <MdDelete size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
