"use client";

import Loading from "@/components/Loading";
import FilterContent from "@/components/singleResortPage/FilterContent";
import TopAmenities from "@/components/singleResortPage/TopAmenities";
import { AuthContext } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { GiStarsStack } from "react-icons/gi";

export default function SingleResortPage() {
  const params = useParams();
  const router = useRouter();
  const { allResortData = [] } = useContext(AuthContext);
  const [currentResort, setCurrentResort] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [additional_images, setAdditionalImages] = useState([]);
  const touchStartX = useRef(null);
  const mouseStartX = useRef(null);

  const cleanPlaceName = (name) =>
    String(name || "")
      .replace(/\d+\s*Nights/g, "")
      .trim();

  useEffect(() => {
    const resort = allResortData.find(
      (item) => item._id === params.id || item.id === params.id,
    );
    if (resort) {
      setCurrentResort({
        ...resort,
        place_name: cleanPlaceName(resort.place_name),
      });
    } else {
      setCurrentResort(null);
    }
  }, [allResortData, params.id]);

  useEffect(() => {
    if (!currentResort) {
      setAdditionalImages([]);
      return;
    }

    const images = Object.keys(currentResort)
      .filter((key) => key.startsWith("img"))
      .map((key) => currentResort[key])
      .filter(Boolean);
    setAdditionalImages(
      images.length ? images : [currentResort.img].filter(Boolean),
    );
  }, [currentResort]);

  useEffect(() => {
    if (!additional_images.length) return;
    const interval = setInterval(() => {
      handleSwipe("left");
    }, 5000);
    return () => clearInterval(interval);
  }, [additional_images]);

  const handleSwipe = (direction) => {
    if (!additional_images.length) return;
    setCurrentIndex((prevIndex) => {
      if (direction === "left") {
        return (prevIndex + 1) % additional_images.length;
      }
      return (
        (prevIndex - 1 + additional_images.length) % additional_images.length
      );
    });
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX || null;
  };

  const handleTouchMove = (event) => {
    if (touchStartX.current === null) return;
    const deltaX = event.touches[0]?.clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      handleSwipe(deltaX < 0 ? "left" : "right");
      touchStartX.current = null;
    }
  };

  const handleMouseDown = (event) => {
    mouseStartX.current = event.clientX;

    const moveHandler = (e) => {
      if (mouseStartX.current === null) return;
      const deltaX = e.clientX - mouseStartX.current;
      if (Math.abs(deltaX) > 50) {
        handleSwipe(deltaX < 0 ? "left" : "right");
        mouseStartX.current = null;
      }
    };

    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      mouseStartX.current = null;
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  };

  const goBack = () => {
    router.back();
  };

  const handleAddToCheckout = () => {
    if (!currentResort) return;
    localStorage.setItem("checkoutResort", JSON.stringify(currentResort));
    router.push("/checkout");
  };

  if (!currentResort) {
    return <Loading />;
  }

  const isWyndham = currentResort.place_name.toLowerCase().includes("wyndham");

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="sticky top-20 z-10 bg-white px-6 py-4 shadow-sm sm:px-10">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-[#037092] font-bold"
        >
          ← Back
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="space-y-8">
          <div className="relative h-64 overflow-hidden rounded-3xl bg-slate-200 sm:h-80 md:h-96 lg:h-[500px]">
            {additional_images.map((image, index) => {
              const offset = index - currentIndex;
              const positionClass =
                offset === 0
                  ? "translate-x-0"
                  : offset < 0
                    ? "-translate-x-full"
                    : "translate-x-full";
              return (
                <div
                  key={`${image}-${index}`}
                  className={`absolute inset-0 transition-transform duration-500 ${positionClass}`}
                >
                  <img
                    src={image}
                    alt={`${currentResort.place_name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
            <div
              className="absolute inset-0 cursor-grab"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
            />
          </div>

          <div className="flex justify-center gap-2">
            {additional_images.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? "bg-[#037092]" : "bg-slate-300"
                }`}
              />
            ))}
          </div>

          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-lg text-slate-600">{currentResort.location}</p>
            <p className="text-sm text-slate-500">
              Resort ID: {currentResort.resort_ID}
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              {currentResort.place_name}
            </h1>
            {isWyndham && (
              <div className="flex items-center gap-2 text-[#037092]">
                <GiStarsStack size={24} />
                <span>Wyndham owner exclusive</span>
              </div>
            )}

            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
                    alt="RCI Gold Crown"
                    className="h-14 w-14"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      RCI Gold Crown
                    </p>
                    <p className="text-sm text-slate-600">
                      Top rated resort experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleAddToCheckout}
                  className="rounded-full bg-[#037092] px-6 py-3 text-white shadow hover:bg-[#035c73]"
                >
                  Add to Checkout
                </button>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <h2 className="text-xl font-semibold text-slate-900">
                  Top Amenities
                </h2>
              </div>
              <TopAmenities />
            </div>

            <div className="mt-6 border-t border-slate-200 py-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-32772-5.svg"
                  alt="TripAdvisor"
                  className="h-12 w-32"
                />
                <span className="text-sm text-slate-600">
                  {currentResort.reviews_amount || 0} reviews
                </span>
              </div>
            </div>
          </div>

          <FilterContent currentResort={currentResort} />
        </div>
      </div>
    </main>
  );
}
