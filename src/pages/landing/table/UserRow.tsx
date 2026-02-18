import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { TableCell, TableRow } from "@/components/ui/table";
import { setUserId } from "@/redux/stores/userSlice";
import { ROUTER_ROUTES } from "@/utils/constants/ROUTER_ROUTES";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserDeleteDialog from "./UserDeleteDialog";

type Props = {
  user: User;
};

const UserRow = ({ user }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onView = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(ROUTER_ROUTES.CONTACT_DETAIL + `/${id}`);
  };

  const onUpdate = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    dispatch(setUserId({ userId }));
  };

  return (
    <TableRow
      key={user.id}
      className="cursor-pointer"
      onClick={() => navigate(ROUTER_ROUTES.CONTACT_DETAIL + `/${user.id}`)}
    >
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.contact}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button
            type="button"
            variant="outline"
            aria-label="view"
            onClick={(e) => onView(e, user.id)}
          >
            View
          </Button>
          <Button
            type="button"
            variant="outline"
            aria-label="update"
            onClick={(e) => onUpdate(e, user.id)}
          >
            Update
          </Button>
          <UserDeleteDialog user={user} />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default memo(UserRow);
