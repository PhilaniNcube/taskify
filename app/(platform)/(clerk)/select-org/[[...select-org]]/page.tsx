import { OrganizationList } from "@clerk/nextjs";

const CreateOrganizationPage = () => {
	return (
		<div className="flex items-center justify-center h-full">
			<OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
      />
		</div>
	);
};
export default CreateOrganizationPage;
