import Image from "next/image";
import Link from "next/link";

const Logo = () => {
	return (
		<Link href="/">
			<div className="items-center hidden transition hover:opacity-75 gap-x-2 md:flex">
				<Image src="/logo.webp" alt="Logo" width={100} height={100} className="object-cover w-10 aspect-square" />
				<p className="text-lg text-neutral-700">Taskify</p>
			</div>
		</Link>
	);
};
export default Logo;
