"use client";

import Loading from "@/components/Loading";
import ResortCard from "@/components/ResortCard";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";

export default function SearchPage() {
  const { allResortData = [] } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [resortsCount, setResortsCount] = useState(0);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchTerm(query);
  }, [searchParams]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchData([]);
      setResortsCount(0);
      return;
    }

    setLoading(true);
    const results = performSearch(searchTerm, allResortData);
    setSearchData(results);
    setResortsCount(results.length);
    setLoading(false);
  }, [searchTerm, allResortData]);

  const performSearch = (query, data) => {
    const normalized = String(query || "")
      .trim()
      .toLowerCase();
    if (!normalized) return [];

    const queryWords = normalized.split(/\s+/).filter(Boolean);
    const results = [];

    data.forEach((resort) => {
      let score = 0;
      const matchedWords = [];
      const placeName = String(resort.place_name || "").toLowerCase();
      const location = String(resort.location || "").toLowerCase();
      const resortId = String(
        resort.resort_ID || resort._id || "",
      ).toLowerCase();

      queryWords.forEach((word) => {
        if (placeName.includes(word)) {
          score += 2;
          if (!matchedWords.includes(word)) matchedWords.push(word);
        }
        if (location.includes(word)) {
          score += 1;
          if (!matchedWords.includes(word)) matchedWords.push(word);
        }
        if (resortId.includes(word)) {
          score += 1;
          if (!matchedWords.includes(word)) matchedWords.push(word);
        }
      });

      if (score > 0) {
        results.push({ resort, score, matchedWords });
      }
    });

    return results
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.matchedWords.length !== a.matchedWords.length) {
          return b.matchedWords.length - a.matchedWords.length;
        }
        const aPlaceMatch = queryWords.some((word) =>
          a.resort.place_name?.toLowerCase().includes(word),
        );
        const bPlaceMatch = queryWords.some((word) =>
          b.resort.place_name?.toLowerCase().includes(word),
        );
        return Number(bPlaceMatch) - Number(aPlaceMatch);
      })
      .map((item) => item.resort);
  };

  const modifyResortData = (resort) => {
    const modified = { ...resort };
    delete modified.price_rate;
    if ([3, 4, "3", "4"].includes(modified.bedrooms)) {
      modified.available = false;
    }
    return modified;
  };

  return (
    <Suspense fallback={<Loading />}>
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Search Results Found:{" "}
            <span className="font-semibold">{searchTerm || ""}</span>
          </h1>
          {searchTerm && (
            <p className="mt-3 text-sm text-slate-600">
              {resortsCount} resort(s) match your search
            </p>
          )}

          {loading ? (
            <div className="mt-10">
              <Loading />
            </div>
          ) : searchData.length > 0 ? (
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchData.map((resort) => {
                const modifiedResort = modifyResortData(resort);
                const destination =
                  modifiedResort.available === false
                    ? "#"
                    : `/singleResortPage/${resort._id}`;
                return (
                  <Link key={resort._id || resort.id} href={destination}>
                    <ResortCard
                      resort={modifiedResort}
                      showPoints={true}
                      weekendPointPremium={500}
                    />
                  </Link>
                );
              })}
            </div>
          ) : searchTerm ? (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-xl font-semibold text-slate-900">
                No Results Found for '{searchTerm}'
              </p>
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-lg text-slate-600">
                Start a search from the header to find resorts by name,
                location, or ID.
              </p>
            </div>
          )}
        </div>
      </section>
    </Suspense>
  );
}
