import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";

const MarketingPage = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<div className="flex items-center p-4 mb-4 border rounded-full shadow-sm bg-amber-100 text-amber-700">
					<Medal className="w-6 h-6 mr-2" />
					Task Management made easier
				</div>
				<h1 className="mb-6 text-3xl text-center text-neutral-800 md:text-6xl">
					Helping you move with the
				</h1>
				<span className="p-2 px-4 text-3xl text-white rounded-md bg-gradient-to-r from-sky-800 to-teal-950 w-fit">speed of thought.</span>
			</div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="max-w-xs mx-auto mt-4 text-sm text-center md:text-xl text-neutral-600 md:max-w-2xl">

        Collaborate, manage projects and improve your productivity. Get started today.
        </p>
        <Button>Get Started</Button>
      </div>
		</div>
	);
};
export default MarketingPage;
