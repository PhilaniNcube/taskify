import { getProject } from "@/fetchers/projects";
import ProjectHeader from "./_components/project-header";
import { getTasks } from "@/fetchers/tasks";
import ProjectTasks from "./_components/project-tasks";
import CreateTask from "../../tasks/_components/create-task";
import { getProjectDocuments } from "@/fetchers/documents";
import Link from "next/link";

export const dynamic = "force-dynamic"

const ProjectPage = async ({params: {projectId}}:{params:{projectId:string}}) => {

  // const {project, error} = await getProject(projectId)
  // const {tasks, error: tasksError} = await getTasks(projectId)

  const projectData =  getProject(projectId)
  const tasksData = getTasks(projectId)
  const documentData = getProjectDocuments(projectId)

  const [projectResponse, tasksResponse, documentsResponse] = await Promise.all([projectData, tasksData, documentData])

  const {project, error} = projectResponse
  const {tasks, error: tasksError} = tasksResponse

  const {documents, error: documentsError} = documentsResponse




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
              <div className="grid grid-cols-2 gap-3">
                {documents && documents.length > 0 ? (
                  documents.map((document) => (
                    <Link href={document.url} key={document.id} className="p-3 bg-white rounded-md shadow-md">
                      Download Document
                    </Link>
                  ))
                ) : <h3>No documents found</h3>}
              </div>
						</section>
					)
				)}
			</main>
		);
};
export default ProjectPage;
