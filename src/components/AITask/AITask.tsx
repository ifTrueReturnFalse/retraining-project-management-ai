"use client";

import { useState } from "react";
import BinIcon from "../Icons/BinIcon";
import PenIcon from "../Icons/PenIcon";
import styles from "./AITask.module.css";
import { GeneratedTask } from "@/models/tasks.model";
import classNames from "classnames";

interface AITaskProps {
  task: GeneratedTask;
  deleteTask: () => void;
  updateTask: (task: GeneratedTask) => void;
}

export default function AITask({ task, deleteTask, updateTask }: AITaskProps) {
  const [isModifying, setIsModifying] = useState(false);
  const [localTask, setLocalTask] = useState(task);

  const handleSave = () => {
    updateTask(localTask);
  };

  const toggleModify = () => {
    if (isModifying) {
      handleSave();
    }
    setIsModifying(!isModifying);
  };

  return (
    <div className={styles.container}>
      {!isModifying && (
        <div className={styles.taskDetail}>
          <h3 className={styles.title}>{task.title}</h3>
          <p className={styles.description}>{task.description}</p>
        </div>
      )}

      {isModifying && (
        <div className={styles.taskDetail}>
          <input
            type="text"
            className={styles.input}
            value={localTask.title}
            onChange={(e) =>
              setLocalTask({ ...localTask, title: e.target.value })
            }
          />
          <input
            type="text"
            className={styles.input}
            value={localTask.description}
            onChange={(e) =>
              setLocalTask({ ...task, description: e.target.value })
            }
          />
        </div>
      )}

      <div className={styles.tools}>
        <span className={styles.tool} onClick={() => deleteTask()}>
          <BinIcon /> Supprimer
        </span>
        <span>|</span>
        <span
          className={classNames([styles.tool, styles.modify])}
          onClick={() => toggleModify()}
        >
          <PenIcon /> {isModifying ? "Fin modification" : "Modifier"}
        </span>
      </div>
    </div>
  );
}
