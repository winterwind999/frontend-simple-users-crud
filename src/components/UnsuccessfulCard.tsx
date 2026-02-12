import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  message?: string;
};

const UnsuccessfulCard = ({ message }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oops! Something went wrong</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          {message || "An unexpected error occurred"}
        </p>
      </CardContent>
    </Card>
  );
};

export default UnsuccessfulCard;
