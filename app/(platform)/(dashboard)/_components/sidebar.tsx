"use client";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import NavItem from "./nav-itme";
import type { Organization } from "@/types";

interface SidebarProps {
	storageKey?: string;
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
		storageKey,
		{},
	);

	const { organization: activeOrganization, isLoaded: isLoadedOrg } =
		useOrganization();

	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});

	const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
		(acc: string[], key: string) => {
			if (expanded[key]) acc.push(key);
			return acc;
		},
		[],
	);

	const onExpand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !expanded[id],
		}));
	};
	if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
		return (
			<>
				<div className="flex items-center justify-between">
					<Skeleton className="w-[60%] h-[20px] rounded-md animate-pulse" />
					<Skeleton className="w-10 h-[20px] rounded-md animate-pulse" />
				</div>
				<Separator className="my-3" />
				<div className="flex flex-col space-y-2">
					<Skeleton className="w-full h-8 rounded-md animate-pulse" />
					<Skeleton className="w-full h-8 rounded-md animate-pulse" />
					<Skeleton className="w-full h-8 rounded-md animate-pulse" />
				</div>
				<div className="flex flex-col mt-6 space-y-2">
					<Skeleton className="w-full h-8 rounded-md animate-pulse" />
					<Skeleton className="w-full h-8 rounded-md animate-pulse" />
					<Skeleton className="w-full h-8 rounded-md animate-pulse" />
				</div>
			</>
		);
	}

	return (
		<>
			<div className="flex items-center mb-1 text-xs font-medium">
				<span className="pl-4">Workspaces</span>
				<Button
					asChild
					type="button"
					size="icon"
					variant="ghost"
					className="ml-auto"
				>
					<Link href="/select-org">
						<PlusIcon className="w-4 h-4" />
					</Link>
				</Button>
				Sidebar
			</div>
			<Accordion
				type="multiple"
				defaultValue={defaultAccordionValue}
				className="space-y-2"
			>
				{userMemberships.data.map((organization) => {

           const org = organization.organization as Organization;

					return (
						<NavItem
							key={organization.organization.id}
							isActive={activeOrganization?.id === organization.organization.id}
							isExpanded={expanded[organization.organization.id]}
							organization={org}
							onExpand={onExpand}
						/>
					);
				})}
			</Accordion>
		</>
	);
};
export default Sidebar;
