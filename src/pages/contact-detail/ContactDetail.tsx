import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import withGetUserById from "@/components/withGetUserById";
import { onBack } from "@/utils/onBack";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User;
};

const ContactDetail = ({ user }: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button
              type="button"
              variant="secondary"
              aria-label="back"
              onClick={() => onBack(navigate)}
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

const ContactDetailWithUser = withGetUserById(ContactDetail);

export default ContactDetailWithUser;
