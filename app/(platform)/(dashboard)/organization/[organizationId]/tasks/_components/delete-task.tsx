import { deleteTaskAction } from "@/actions/delete-task";
import { Button } from "@/components/ui/button";
import { CircleDashed, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";


const DeleteTask = ({taskId, projectId, orgId}:{taskId:string, projectId:string, orgId:string}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const deleteRef = useRef<HTMLFormElement>(null);

  async function formAction() {



    startTransition(async () => {
      await deleteTaskAction(taskId);
      router.push(`/organization/${orgId}/projects/`);
    });
  }

  return <form ref={deleteRef} action={formAction} className="absolute text-white top-2 right-3">
    <Button size="icon" variant="ghost" type="submit" className="bg-red-600">
      {pending ? <CircleDashed className="animate-spin" /> : <TrashIcon />}
    </Button>
  </form>;
};
export default DeleteTask;
