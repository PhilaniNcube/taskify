import { getProject } from "@/fetchers/projects";
import ProjectHeader from "./_components/project-header";
import { getTasks } from "@/fetchers/tasks";
import ProjectTasks from "./_components/project-tasks";

const ProjectPage = async ({params: {projectId}}:{params:{projectId:string}}) => {

  const {project, error} = await getProject(projectId)
  const {tasks, error: tasksError} = await getTasks(projectId)



  return (
			<main className="w-full">
				{error || tasksError ? (
					<h1>Could not fetch project and tasks data</h1>
				) : (
					project && tasks && (
						<section>
							<ProjectHeader project={project} />
              <ProjectTasks projectId={projectId} tasks={tasks} />
						</section>
					)
				)}
			</main>
		);
};
export default ProjectPage;
