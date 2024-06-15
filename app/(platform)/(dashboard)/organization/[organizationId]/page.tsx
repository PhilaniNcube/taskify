import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import OrganizationBoard from "./_components/board";
import CreateProject from "./_components/create-project";

const OrganizationPage = ({
	params: { organizationId },
}: { params: { organizationId:string } }) => {



	return (
		<div className="w-full">
			<CreateProject />
			<OrganizationBoard />
		</div>
	);
};
export default OrganizationPage;
