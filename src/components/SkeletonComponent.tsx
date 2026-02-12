import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";

type Props = {
  type: SkeletonType;
};

const SkeletonComponent = ({ type }: Props) => {
  if (type === "CARD") {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="aspect-video w-full" />
        </CardContent>
      </Card>
    );
  }

  if (type === "TEXT") {
    return (
      <div className="flex w-full  flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (type === "FORM") {
    return (
      <div className="flex w-full  flex-col gap-7">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
    );
  }

  if (type === "TABLE") {
    return (
      <div className="flex w-full  flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex gap-4" key={index}>
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Spinner />
        </CardContent>
      </Card>
    </div>
  );
};

export default SkeletonComponent;
