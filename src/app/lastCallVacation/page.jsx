"use client";

import Loading from "@/components/Loading";
import ResortCard from "@/components/ResortCard";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export default function LastCallVacationPage() {
  const { resortData, loading, totalPages, currentPage, fetchResortData } =
    useContext(AuthContext);
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const filteredData = useMemo(() => {
    if (!searchTerm) return resortData;
    return resortData.filter((resort) =>
      resort.location?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [resortData, searchTerm]);

  const handlePrevClick = () => {
    if (localCurrentPage > 1) {
      const newPage = localCurrentPage - 1;
      setLocalCurrentPage(newPage);
      fetchResortData(newPage, 15);
      if (newPage < minPageNumberLimit) {
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      }
    }
  };

  const handleNextClick = () => {
    if (localCurrentPage < totalPages) {
      const newPage = localCurrentPage + 1;
      setLocalCurrentPage(newPage);
      fetchResortData(newPage, 15);
      if (newPage >= maxPageNumberLimit) {
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const handlePageClick = (pageNum) => {
    setLocalCurrentPage(pageNum);
    fetchResortData(pageNum, 15);
  };

  const pageNumbers = [];
  for (
    let i = minPageNumberLimit;
    i < maxPageNumberLimit && i < totalPages;
    i++
  ) {
    pageNumbers.push(i + 1);
  }

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Last Call Vacations
          </h1>
          <p className="mt-2 text-gray-600">
            Discover special deals and exclusive vacation packages
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-[#037092] focus:outline-none"
            />
            <IoSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <button className="rounded-lg bg-[#037092] px-6 py-3 font-semibold text-white hover:bg-blue-700">
            Filter
          </button>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <p className="mb-4 text-sm text-gray-600">
            Found {filteredData.length} resorts
          </p>
        )}

        {/* Resort Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(filteredData.length > 0 ? filteredData : resortData).map(
            (resort) => (
              <Link
                key={resort._id}
                href={`/singleResortPage/${resort._id}`}
                className="transition hover:shadow-lg"
              >
                <ResortCard resort={resort} />
              </Link>
            ),
          )}
        </div>

        {/* Pagination */}
        {!searchTerm && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handlePrevClick}
              disabled={localCurrentPage === 1}
              className="rounded-lg bg-slate-200 p-2 text-gray-700 disabled:opacity-50 hover:bg-slate-300"
            >
              <FaChevronLeft size={18} />
            </button>

            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`rounded-lg px-3 py-2 font-semibold transition ${
                  pageNum === localCurrentPage
                    ? "bg-[#037092] text-white"
                    : "bg-slate-200 text-gray-700 hover:bg-slate-300"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={handleNextClick}
              disabled={localCurrentPage === totalPages}
              className="rounded-lg bg-slate-200 p-2 text-gray-700 disabled:opacity-50 hover:bg-slate-300"
            >
              <FaChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
