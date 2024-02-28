import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "../../ui/card";

export default function CardSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div>
        <CardContent>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-32 w-full mt-2" />
          <Skeleton className="h-8 mt-2" />
        </CardContent>
      </div>
      <div>
        <CardContent>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-32 w-full mt-2" />
          <Skeleton className="h-8 mt-2" />
        </CardContent>
      </div>
      <div>
        <CardContent>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-32 w-full mt-2" />
          <Skeleton className="h-8 mt-2" />
        </CardContent>
      </div>
      <div>
        <CardContent>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-32 w-full mt-2" />
          <Skeleton className="h-8 mt-2" />
        </CardContent>
      </div>
    </div>
  );
}
