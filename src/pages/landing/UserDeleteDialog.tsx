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
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  user: User;
};

const UserDeleteDialog = ({ user }: Props) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    setName("");
  };

  const onDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setName(user.name);

    try {
      await deleteUser(user.id);
      toast.success(`User ${name} deleted`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`User Delete Dialog Error: ${error.message}`);
      } else {
        console.log("User Delete Dialog Error:", error);
      }

      toast.error(`Failed to delete User ID ${name}`);
    }
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
