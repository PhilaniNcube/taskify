import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Project } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/router";
import ClientNavigation from "../../../_components/client-navigation";
import ProjectStatus from "../projects/[projectId]/_components/project-status";

export const projectColumns: ColumnDef<Project>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("title")}</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="capitalize">
        <ProjectStatus status={row.getValue("status")} /></div>
		),
	},
	{
		accessorKey: "budget",
		header: "budget",
		cell: ({ row }) => (
			<div className="capitalize">{formatCurrency(row.getValue("budget"))}</div>
		),
	},
	{
		accessorKey: "startDate",
		header: "Start Date",
		cell: ({ row }) => (
			<div className="capitalize">
				{format(row.getValue("startDate"), "PP")}
			</div>
		),
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
		cell: ({ row }) => (
			<div className="capitalize">{format(row.getValue("dueDate"), "PP")}</div>
		),
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {

       const {navigate} = ClientNavigation();

			return (
				<div className="flex space-x-2">
					<Button
						variant="secondary"
						onClick={() => {
							const project = row.original;
              navigate(`/organization/${project.orgId}/projects/${project.id}`);
						}}
					>
						View
					</Button>

				</div>
			);
		},
	},
];
