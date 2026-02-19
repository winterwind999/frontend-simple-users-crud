import { useGetUserByIdQuery } from "@/redux/apis/userApiSlice";
import type { RootState } from "@/redux/stores/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import SkeletonComponent from "./SkeletonComponent";

type WithGetUserByIdProps = {
  user?: User;
};

type WithGetUserByIdOptions = {
  getId?: (state: RootState) => number | null;
  required?: boolean; // default: true
};

const withGetUserById = <T extends WithGetUserByIdProps>(
  WrappedComponent: React.ComponentType<T>,
  options: WithGetUserByIdOptions = { required: true },
) => {
  return function WithGetUserByIdWrapper(
    props: Omit<T, keyof WithGetUserByIdProps>,
  ) {
    const { required, getId } = options;

    const { id: paramId } = useParams<{ id: string }>();
    const selectorId = useSelector(
      (state: RootState) => getId?.(state) ?? null,
    );

    const resolvedId = getId ? selectorId : paramId ? Number(paramId) : null;

    const {
      data: user,
      isLoading,
      isError,
      isSuccess,
      error,
    } = useGetUserByIdQuery(resolvedId!, {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      skip: !resolvedId,
    });

    if (!resolvedId && required) {
      return <PageNotFound message="Invalid User ID" />;
    }

    if (isLoading) {
      return <SkeletonComponent type="CARD" />;
    }

    if (isError) {
      throw error;
    }

    if ((!isSuccess || !user) && required) {
      return <PageNotFound message="User not found" />;
    }

    return <WrappedComponent {...(props as T)} user={user} />;
  };
};

export default withGetUserById;
