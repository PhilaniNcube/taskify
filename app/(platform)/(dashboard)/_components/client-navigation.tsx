"use client";
import { useRouter } from "next/navigation";

const ClientNavigation = () => {

  const router = useRouter()

  const navigate = (path: string) => {
    router.push(path)
  }

  return {
    navigate
  }


};
export default ClientNavigation;
