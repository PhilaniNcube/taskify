import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
	return (
		<div className="fixed bottom-0 flex items-center w-full p-4 bg-white border-t shadow-sm h-14">
			<div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
				<Logo />
				<div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
					<Button size="sm" variant="outline" asChild>
						<Link href="/privacy">Privacy Policy</Link>
					</Button>
					<Button size="sm" variant="outline" asChild>
						<Link href="/terms">Terms & Conditions</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
