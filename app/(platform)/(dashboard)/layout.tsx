import type { ReactNode } from "react";
import { DashboardNavbar } from "./_components/dashboard-navbar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full h-full">
			<DashboardNavbar />
			<main className="w-full">{children}</main>
		</div>
	);
};
export default DashboardLayout;
