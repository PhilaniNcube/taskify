import { Suspense } from "react";
import CreateProject from "./create-project";
import ProjectCards from "./project-cards";
import { getProjects } from "@/fetchers/projects";

const OrganizationBoard = async () => {



	return (
		<div className="w-full py-3">
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectCards />
			</Suspense>
		</div>
	);
};
export default OrganizationBoard;
