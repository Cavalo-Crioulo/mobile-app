import { View } from "react-native";
import { Skeleton } from "@/components/ui/Skeleton";

export function SkeletonSectionHeader() {
  return (
    <View className="bg-background px-4 pt-5">
      <Skeleton className="h-6 w-44 rounded-md" />
    </View>
  );
}

export function SkeletonEventCard() {
  return (
    <View className="mx-4 mt-3 rounded-2xl overflow-hidden bg-surface border border-white/10">
      <Skeleton className="w-full h-40" />
      <View className="p-4">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md mt-3" />
        <Skeleton className="h-4 w-1/2 rounded-md mt-2" />
      </View>
    </View>
  );
}
