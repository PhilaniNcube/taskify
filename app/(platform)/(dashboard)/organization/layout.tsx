import type { ReactNode } from "react";
import Sidebar from "../_components/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const OrganizationLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="px-4 pt-20 md:pt-24">
			<div className="flex gap-x-7">
				<aside className="hidden w-64 shrink-0 md:block">
					<Sidebar />
				</aside>
				<ScrollArea className="h-[calc(100vh-100px)] w-full flex-1">
					{children}
				</ScrollArea>
			</div>
		</div>
	);
};
export default OrganizationLayout;
