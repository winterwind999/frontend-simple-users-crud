import SkeletonComponent from "@/components/SkeletonComponent";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UnsuccessfulCard from "@/components/UnsuccessfulCard";
import { useGetAllUsersQuery } from "@/redux/apis/userApiSlice";
import { setUserId } from "@/redux/stores/userSlice";
import { ROUTER_ROUTES } from "@/utils/constants/ROUTER_ROUTES";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserDeleteDialog from "./UserDeleteDialog";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery(
    "usersList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  const [search, setSearch] = useState<string>("");

  if (isLoading) {
    return <SkeletonComponent type="TABLE" />;
  }

  if (isError) {
    throw error;
  }

  if (!isSuccess || !data) {
    return <UnsuccessfulCard message="Users not found" />;
  }

  const onView = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(ROUTER_ROUTES.CONTACT_DETAIL + `/${id}`);
  };

  const onUpdate = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    dispatch(setUserId({ userId }));
  };

  const users = data.filter((user: User) => {
    const searchLower = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.contact.toLowerCase().includes(searchLower) ||
      user.id.toString().includes(searchLower)
    );
  });

  const tableContent = () => {
    if (data.length === 0) {
      return <p className="mt-3 font-bold">No users created yet...</p>;
    }

    if (users.length === 0) {
      return <p className="mt-3 font-bold">No user found</p>;
    }

    return users.map((user: User) => (
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
    ));
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex w-full items-center gap-3">
            <p className="font-bold">Users List</p>

            <div className="me-3 flex flex-1">
              <Input
                id="search"
                name="search"
                aria-label="search"
                placeholder="Search..."
                className=""
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{tableContent()}</TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersList;
