import { View } from "react-native";
import { Skeleton } from "@/components/ui/Skeleton";

export function SkeletonHero() {
  return (
    <Skeleton className="h-56 w-full rounded-2xl mb-4" />
  );
}

export function SkeletonRow({ count = 6 }: { count?: number }) {
  return (
    <View className="mb-5">
      <Skeleton className="h-5 w-40 rounded-md mb-3 mx-2" />
      <View className="flex-row px-2">
        {Array.from({ length: count }).map((_, i) => (
          <View key={i} className="mr-3">
            <Skeleton className="w-28 h-40 rounded-xl" />
            <Skeleton className="w-24 h-3 rounded-md mt-2" />
          </View>
        ))}
      </View>
    </View>
  );
}
