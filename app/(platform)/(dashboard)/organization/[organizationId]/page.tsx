import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import OrganizationBoard from "./_components/board";
import CreateProject from "./_components/create-project";
import { getProjects } from "@/fetchers/projects";
import ProjectsTable from "./_components/projects-table";

const OrganizationPage = async ({
	params: { organizationId },
}: { params: { organizationId: string } }) => {
	const result = await getProjects();

	const { projects, error } = result;

	if (error || projects?.length === 0 || !projects) {
		return (
			<div className="mt-4">
				<h1 className="text-2xl font-semibold">No Projects Found</h1>
			</div>
		);
	}

	return (
		<div className="w-full">
			<CreateProject />
			<ProjectsTable projects={projects} />
		</div>
	);
};
export default OrganizationPage;
