import SkeletonComponent from "@/components/SkeletonComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UnsuccessfulCard from "@/components/UnsuccessfulCard";
import { useGetAllUsersQuery } from "@/redux/apis/userApiSlice";
import { useState } from "react";
import UserRow from "./UserRow";

const UsersList = () => {
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

    return users.map((user: User) => <UserRow key={user.id} user={user} />);
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
