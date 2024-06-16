import { getProject } from "@/fetchers/projects";
import ProjectHeader from "./_components/project-header";
import { getTasks } from "@/fetchers/tasks";
import ProjectTasks from "./_components/project-tasks";
import CreateTask from "../../tasks/_components/create-task";

export const dynamic = "force-dynamic"

const ProjectPage = async ({params: {projectId}}:{params:{projectId:string}}) => {

  const {project, error} = await getProject(projectId)
  const {tasks, error: tasksError} = await getTasks(projectId)



  return (
			<main className="w-full">
				{error || tasksError ? (
					<h1>Could not fetch project and tasks data</h1>
				) : (
					project &&
					tasks && (
						<section>
							<ProjectHeader project={project} />
							{tasks.length === 0 ? (
                <div className="my-3">
                  <h3 className="font-medium ext-xl">No tasks found</h3>
                  <CreateTask projectId={projectId}/>
                </div>
							) : (
								<ProjectTasks projectId={projectId} tasks={tasks} />
							)}
						</section>
					)
				)}
			</main>
		);
};
export default ProjectPage;
