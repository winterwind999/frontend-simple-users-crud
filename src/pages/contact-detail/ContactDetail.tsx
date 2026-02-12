import PageNotFound from "@/components/PageNotFound";
import SkeletonComponent from "@/components/SkeletonComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetUserByIdQuery } from "@/redux/apis/userApiSlice";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ContactDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(Number(id), {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  if (!id) {
    return <PageNotFound message="Invalid User ID" />;
  }

  if (isLoading) {
    return <SkeletonComponent type="CARD" />;
  }

  if (isError) {
    throw error;
  }

  if (!isSuccess || !user) {
    return <PageNotFound message="User not found" />;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button
              type="button"
              variant="secondary"
              aria-label="back"
              onClick={() => navigate(-1)}
            >
              <ChevronLeftIcon />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p>
            <span className="font-bold">ID:</span> <span>{user.id}</span>
          </p>
          <p className="break-all">
            <span className="font-bold">Name:</span> <span>{user.name}</span>
          </p>
          <p className="break-all">
            <span className="font-bold">Email:</span> <span>{user.email}</span>
          </p>
          <p className="break-all">
            <span className="font-bold">Contact:</span>{" "}
            <span>{user.contact}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactDetail;
