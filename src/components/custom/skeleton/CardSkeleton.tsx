import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "../../ui/card";

export default function CardSkeleton() {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-4 grid grid-cols-1 gap-1">
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
