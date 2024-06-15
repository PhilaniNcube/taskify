import {
	clerkMiddleware,
	createRouteMatcher,
	redirectToSignIn,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
	"/dashboard(.*)",
	"/dashboard/(.*)",
	"/organization(.*)",
	"/organisation/(.*)",
	"/select-org(.*)",
]);

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) auth().protect();

  console.log("Protected Route", isProtectedRoute(req))

	if (auth().userId && isProtectedRoute(req) === false) {
		// Add custom logic to run before redirecting
		let path = "/select-org";

		if (auth().orgId ) {
			path = `/organization/${auth().orgId}`;
		}

		const orgSelection = new URL(path, req.url);
console.log("Redirecting when user is logged in but on a protected route");
		return NextResponse.redirect(orgSelection);
	}

	if (!auth().userId && isProtectedRoute(req)) {
    console.log("Redirecting when user is not logged in but on a protected route");
		return auth().redirectToSignIn({ returnBackUrl: req.url });
	}

	if (
		auth().userId &&
		!auth().orgId &&
		req.nextUrl.pathname !== "/select-org"
	) {
		const orgSelection = new URL("/select-org", req.url);
		return NextResponse.redirect(orgSelection);
	}
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
