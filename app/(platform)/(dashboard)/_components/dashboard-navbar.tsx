import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSideBar from "./mobile-sidebar";

export const DashboardNavbar = () => {
	return (
		<nav className="fixed z-50 flex items-center w-full px-4 bg-white border-b shadow-sm h-14">
			<MobileSideBar />
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>
				<Button
					size="sm"
					variant="primary"
					className="hidden h-auto rounded-sm md:block py-1.5 px-2"
				>
					Create
				</Button>
				<Button
					size="sm"
					variant="primary"
					className="block rounded-sm md:hidden"
				>
					<Plus className="w-4 h-4" />
				</Button>
			</div>
			<div className="flex items-center ml-auto gap-x-2">
				<OrganizationSwitcher
					hidePersonal
					afterSelectOrganizationUrl="/organization/:id"
					afterCreateOrganizationUrl="/organization/:id"
					afterLeaveOrganizationUrl="/select-org"
          createOrganizationMode="modal"

					appearance={{
						elements: {
							rootBox: {
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							},
						},
					}}
				/>
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: {
								height: "32px",
								width: "32px",
							},
						},
					}}
				/>
			</div>
		</nav>
	);
};
