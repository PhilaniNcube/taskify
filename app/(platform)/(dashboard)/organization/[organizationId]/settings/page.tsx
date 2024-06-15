import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
			<div className="flex items-center justify-center w-full">
				<OrganizationProfile
					routing="hash"
					appearance={{
						elements: {
							rootBox: {
								boxShadow: "none",
								width: "100%",
							},
							card: {
								border: "1px solid #E5E5E5",
								boxShadow: "none",

								width: "100%",
							},
						},
					}}
				/>
			</div>
		);
};
export default SettingsPage;
