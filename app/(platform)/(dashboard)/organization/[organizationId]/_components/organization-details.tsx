"use client";
import { useOrganization } from "@clerk/nextjs";
import { CircleDashed } from "lucide-react";
import Image from "next/image";

const OrganizationDetails = () => {

  const orgData = useOrganization();

  return (
			<div className="flex items-center space-x-5">
				{orgData.isLoaded === false ? (
					<CircleDashed className="animate-spin" />
				) : (
					<>
						{orgData.organization?.imageUrl && (
							<>
								<Image
									src={orgData.organization?.imageUrl}
									alt={orgData.organization.name}
									className="w-12 h-12 aspect-square"
                  width={80}
                  height={80}
								/>
                <p>{orgData.organization.name}</p>
							</>
						)}
					</>
				)}
			</div>
		);
};
export default OrganizationDetails;
