import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteUserMutation } from "@/redux/apis/userApiSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  user: User;
};

const UserDeleteDialog = ({ user }: Props) => {
  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      toast.success(`User ${name} deleted`);
    }

    if (isError) {
      toast.error(`Failed to delete user ${name}`);
    }
  }, [name, isSuccess, isError, error]);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    setName("");
  };

  const onDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setName(user.name);
    await deleteUser(user.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          aria-label="open-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex wrap-break-word">
            <p className="break-all">
              Are you sure you want to delete user {user.name}
            </p>
          </DialogTitle>
          <DialogDescription className="text-red-500">
            This cannot be undone!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              aria-label="close-dialog"
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            aria-label="delete"
            onClick={(e) => onDelete(e)}
            disabled={isLoading}
          >
            DELETE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteDialog;
