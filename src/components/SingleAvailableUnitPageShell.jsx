"use client";

import Loading from "@/components/Loading";
import dynamic from "next/dynamic";

const SingleAvailableUnitPageClient = dynamic(
  () => import("@/components/SingleAvailableUnitPageClient"),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

export default function SingleAvailableUnitPageShell() {
  return <SingleAvailableUnitPageClient />;
}
