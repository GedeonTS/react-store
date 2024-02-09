import { useState, useEffect } from "react";
const Products = ({listTitle}) => {
  const randomIndex = Math.floor(Math.random() * 70);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [indexNumber, setIndexNumber] = useState(randomIndex);

  const samplePrice = () => {
    return Math.floor(Math.random() * 702323) + " ₩";
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          " https://api.testvalley.kr/collections?prearrangedDiscount"
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
    return <div>Loading...</div>;
  }

  console.log("api 3:", data);

  const limitedData = data.items.slice(indexNumber, indexNumber + 4);

  const handleIndex = () => {
    setIndexNumber(Math.floor(Math.random() * 70));
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        marginTop: "20px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "15%",
          margin: "10px",
          padding: "10px",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "5px" }}>{listTitle}</h2>
        <p style={{ marginBottom: "5px" }}>Check out our best deals</p>

        <div style={{ display: "flex", position: "absolute", bottom: 0 }}>
          <button onClick={() => handleIndex()} style={{ marginRight: "5px", 
        }}>&lt;</button>
          <button onClick={() => handleIndex()}>&gt;</button>
        </div>
      </div>
      {limitedData.map((item) => (
        <div
          key={item.id}
          style={{
            width: "15%",
            margin: "10px",
            padding: "10px",
          }}
        >
          <img
            src={item.thumbnail?.uri}
            alt={item.thumbnail?.fileName}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <h2 style={{ fontSize: "18px", marginBottom: "5px" }}>
            {item.title}
          </h2>
          <p style={{ marginBottom: "5px" }}>{item.description}</p>
          <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
           {" "}
            {item.installmentPrice
              ? `${item.installmentPrice} per month`
              : samplePrice()}
          </p>
          <div style={{ marginBottom: "5px" }}>
            {Array.from({ length: item.rating }, (_, index) => (
              <span key={index} style={{ color: "gold", fontSize: "18px" }}>
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
