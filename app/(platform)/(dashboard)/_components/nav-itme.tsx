"use client";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity, CreditCard, Layout, Paperclip, Settings, ShovelIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

type Organization = {
	id: string;
	name: string;
	slug: string;
	imageUrl: string;
};

interface NavItemProps {
	isExpanded: boolean;
	onExpand: (id: string) => void;
	isActive: boolean;
	organization: Organization;
}

const NavItem = ({
	isActive,
	isExpanded,
	organization,
	onExpand,
}: NavItemProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const [pending, startTransition] = useTransition();

	const onClick = (href: string) => {
		startTransition(() => {
			router.push(href);
		});
	};

	const routes = [
		{
			label: "Boards",
			icon: <Layout className="w-4 h-4 mr-2" />,
			href: `/organization/${organization.id}`,
		},
		{
			label: "Projects",
			icon: <Activity className="w-4 h-4 mr-2" />,
			href: `/organization/${organization.id}/projects`,
		},
		{
			label: "Tasks",
			icon: <ShovelIcon className="w-4 h-4 mr-2" />,
			href: `/organization/${organization.id}/tasks`,
		},
		{
			label: "Documents",
			icon: <Paperclip className="w-4 h-4 mr-2" />,
			href: `/organization/${organization.id}/documents`,
		},
		{
			label: "Settings",
			icon: <Settings className="w-4 h-4 mr-2" />,
			href: `/organization/${organization.id}/settings`,
		},
	];

	return (
		<AccordionItem value={organization.id} className="border-none">
			<AccordionTrigger
				onClick={() => onExpand(organization.id)}
				className={cn(
					"flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
					isActive && isExpanded && "bg-sky-500/10 text-sky-700",
				)}
			>
				<div className="flex items-center gap-x-2">
					<div className="relative w-7 h-7">
						<Image
							fill
							src={organization.imageUrl}
							alt="Organization"
							className="object-cover rounded-sm"
							sizes="7"
						/>
					</div>
					<span className="text-sm font-medium">{organization.name}</span>
				</div>
			</AccordionTrigger>
			<AccordionContent className="pt-1 text-neutral-700">
				{routes.map((route) => (
					<Button
						type="button"
						key={route.href}
						onClick={() => {

              onClick(route.href);
            }}
						className={cn(
							"w-full font-normal justify-start pl-10 mb-1",
							pathname.includes(`${organization.id}/${route.label.toLowerCase()}`) ? "bg-sky-500/10 text-sky-700" : null,
              pending && "opacity-50 animate-pulse pointer-events-none",
						)}
            variant="ghost"
					>
						{route.icon}
            {route.label}
					</Button>
				))}
			</AccordionContent>
		</AccordionItem>
	);
};
export default NavItem;
