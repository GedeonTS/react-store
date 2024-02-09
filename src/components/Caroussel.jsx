import  { useState, useEffect } from "react";

const Caroussel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.testvalley.kr/main-banner/all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  console.log("data:", data)



  return  (<div className="carousel">
  <button onClick={goToPrevSlide} className="prev-button">&lt;</button>
  <div className="carousel-content">
  <a href={data[currentIndex].linkUrl}  target="_blank" rel="noopener noreferrer"> <img src={data[currentIndex].pcImageUrl} className="caroussel-image" alt={data[currentIndex].title} />
   </a>
  </div>
  <button onClick={goToNextSlide} className="next-button">&gt;</button>
</div>)
}

export default Caroussel;
