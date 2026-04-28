import Loading from "@/components/Loading";
import SearchPageClient from "@/components/SearchPageClient";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageClient />
    </Suspense>
  );
}
