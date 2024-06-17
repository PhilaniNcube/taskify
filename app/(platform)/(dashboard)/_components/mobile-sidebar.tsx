"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

const MobileSideBar = () => {
	const pathname = usePathname();
	const [isMounted, setIsMounted] = useState(false);

	const onOpen = useMobileSidebar((state) => state.onOpen);
	const onClose = useMobileSidebar((state) => state.onClose);
	const isOpen = useMobileSidebar((state) => state.isOpen);

	const toggleSidebar = () => {
		if (isOpen) {
			onClose();
		} else {
			onOpen();
		}
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
        console.log("MobileSidebar", pathname);
        onClose();
    }, [pathname, onClose]);

	if (!isMounted) return null;

	return (
		<>
			<Sheet open={isOpen} onOpenChange={toggleSidebar}>
				<SheetTrigger className="md:hidden" asChild>
					<Button
						onClick={onOpen}
						className="mr-3 md:hidden"
						variant="ghost"
						size="icon"
					>
						<Menu className="w-6 h-6" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="p-2 pt-10">
					<Sidebar storageKey="t-sidebar-mobile-state" />
				</SheetContent>
			</Sheet>
		</>
	);
};
export default MobileSideBar;
