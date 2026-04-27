"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

export default function SearchBarMobile() {
  const { allResortData = [] } = useContext(AuthContext);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem("searchHistory");
    if (raw) {
      try {
        setSearchHistory(JSON.parse(raw) || []);
      } catch (error) {
        setSearchHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowHistoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const saveSearchHistory = (items) => {
    setSearchHistory(items);
    localStorage.setItem("searchHistory", JSON.stringify(items));
  };

  const saveSearchQuery = (query) => {
    const normalized = query.trim();
    if (!normalized) return;

    const nextHistory = [
      normalized,
      ...searchHistory.filter((item) => item !== normalized),
    ].slice(0, 10);
    saveSearchHistory(nextHistory);
  };

  const performSearch = (query, data) => {
    const normalizedQuery = String(query || "")
      .trim()
      .toLowerCase();
    if (!normalizedQuery) return [];

    const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);
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
          String(a.resort.place_name || "")
            .toLowerCase()
            .includes(word),
        );
        const bPlaceMatch = queryWords.some((word) =>
          String(b.resort.place_name || "")
            .toLowerCase()
            .includes(word),
        );
        return Number(bPlaceMatch) - Number(aPlaceMatch);
      })
      .map((item) => item.resort);
  };

  const handleSearch = () => {
    const queryValue = searchQuery.trim();
    if (!queryValue) return;

    setLoading(true);
    const results = performSearch(queryValue, allResortData);
    saveSearchQuery(queryValue);
    const ids = results.map((resort) => resort._id || resort.id || "");
    router.push(
      `/search?q=${encodeURIComponent(queryValue)}&ids=${encodeURIComponent(ids.join(","))}`,
    );
    setLoading(false);
    setShowHistoryDropdown(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchBarFocus = () => {
    setShowHistoryDropdown(true);
  };

  const handleSearchHistorySelect = (query) => {
    const normalized = String(query || "").trim();
    if (!normalized) return;
    setSearchQuery(normalized);
    setShowHistoryDropdown(false);
    const results = performSearch(normalized, allResortData);
    saveSearchQuery(normalized);
    const ids = results.map((resort) => resort._id || resort.id || "");
    router.push(
      `/search?q=${encodeURIComponent(normalized)}&ids=${encodeURIComponent(ids.join(","))}`,
    );
  };

  const removeSearchHistoryItem = (index) => {
    const nextHistory = [...searchHistory];
    nextHistory.splice(index, 1);
    saveSearchHistory(nextHistory);
  };

  return (
    <div
      ref={containerRef}
      className="search-bar-container relative mx-auto w-full max-w-4xl px-0 py-4"
    >
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onFocus={handleSearchBarFocus}
          onKeyDown={handleKeyPress}
          placeholder="Search by resort Name, Location, ID"
          className="w-full rounded-full border border-slate-200 bg-gray-200 px-5 py-3 pr-16 text-sm text-slate-900 outline-none focus:border-[#037092] focus:ring-2 focus:ring-[#037092]/20"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-yellow-500 px-4 py-3 text-white shadow-md transition hover:bg-yellow-600"
          disabled={loading}
        >
          <IoSearch size={18} />
        </button>
      </div>

      {showHistoryDropdown && searchHistory.length > 0 && (
        <div className="absolute left-0 right-0 z-10 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
            Your Search History
          </div>
          <div className="space-y-1 px-2 py-3">
            {searchHistory.map((query, index) => (
              <div
                key={`${query}-${index}`}
                className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => handleSearchHistorySelect(query)}
                  className="text-left text-sm text-slate-800"
                >
                  {query}
                </button>
                <button
                  type="button"
                  onClick={() => removeSearchHistoryItem(index)}
                  className="text-slate-400 transition hover:text-slate-700"
                >
                  <IoClose size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
