
import { auth } from "@clerk/nextjs/server";
import OrganizationBoard from "../_components/board";
import CreateProject from "../_components/create-project";
import OrganizationDetails from "../_components/organization-details";

const ProjectsPage = async () => {



	return (
		<div>
			<div className="flex items-center justify-between">
        <OrganizationDetails />
        <CreateProject />
			</div>
			<OrganizationBoard />
		</div>
	);
};
export default ProjectsPage;
