import { getAllTasks } from "@/fetchers/tasks";
import TaskGrid from "./_components/task-grid";

const TasksPage = async () => {

  const tasksData = await getAllTasks();

  const { tasks, error } = tasksData;

  if (error || tasks === null || tasks === undefined || tasks.length === 0) {
    return <div>Could not fetch the tasks</div>;
  }

  return <div>
    <TaskGrid tasks={tasks} />
  </div>;
};
export default TasksPage;
