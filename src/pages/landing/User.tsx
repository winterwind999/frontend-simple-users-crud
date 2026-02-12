import SkeletonComponent from "@/components/SkeletonComponent";
import { useGetUserByIdQuery } from "@/redux/apis/userApiSlice";
import { selectUserId } from "@/redux/stores/userSlice";
import { useSelector } from "react-redux";
import UserForm from "./UserForm";

const User = () => {
  const id = useSelector(selectUserId);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(id!, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  if (isLoading) {
    return <SkeletonComponent type="CARD" />;
  }

  if (isError) {
    throw error;
  }

  return <UserForm user={id && user ? user : undefined} />;
};

export default User;
