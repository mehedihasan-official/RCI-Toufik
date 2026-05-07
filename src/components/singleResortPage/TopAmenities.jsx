"use client";

export default function TopAmenities() {
  // const amenities = [
  //   {
  //     label: "Beach",
  //     src: "https://clubs.rci.com/static/media/beach.e95fa969.svg",
  //   },
  //   {
  //     label: "Family Vacations",
  //     src: "https://clubs.rci.com/static/media/family_friendly.5efe64b9.svg",
  //   },
  //   {
  //     label: "Golf",
  //     src: "https://clubs.rci.com/static/media/golf.2a7cd669.svg",
  //   },
  //   {
  //     label: "Spa",
  //     src: "https://clubs.rci.com/static/media/spa.9c9f4019.svg",
  //   },
  //   {
  //     label: "Scuba & Water Sports",
  //     src: "https://clubs.rci.com/static/media/scuba.e1995118.svg",
  //   },
  //   {
  //     label: "Casinos",
  //     src: "https://clubs.rci.com/static/media/casino.9d6871be.svg",
  //   },
  // ];

  return (
     <div className="">
         <div className="carousel w-full space-x-5">
           <div className="carousel-item relative flex items-center gap-2">
             <img
               src="https://clubs.rci.com/static/media/beach.e95fa969.svg"
               alt=""
             />
             <h1>Beach</h1>
           </div>
           <div className="carousel-item relative flex items-center gap-2">
             <img
               src="https://clubs.rci.com/static/media/family_friendly.5efe64b9.svg"
               alt=""
             />
             <h1>Family Vacations</h1>
           </div>
           <div className="carousel-item relative flex items-center gap-2">
             <img
               src="https://clubs.rci.com/static/media/golf.2a7cd669.svg"
               alt=""
             />
             <h1>Golf</h1>
           </div>
           <div className="carousel-item relative flex items-center gap-2">
             <img
               src="https://clubs.rci.com/static/media/spa.9c9f4019.svg"
               alt=""
             />
             <h1>Spa</h1>
           </div>
           <div className="carousel-item relative flex items-center gap-2">
             <img
               src="https://clubs.rci.com/static/media/scuba.e1995118.svg"
               alt=""
             />
             <h1>Scuba & Water Sports</h1>
           </div>
   
           <div className="carousel-item relative flex items-center gap-2">
             <img
               src="https://clubs.rci.com/static/media/casino.9d6871be.svg"
               alt=""
             />
             <h1>Casinos</h1>
           </div>
         </div>
       </div>
  );
}
