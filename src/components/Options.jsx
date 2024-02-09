import React from 'react'
import { useState, useEffect } from 'react'

function Options() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(
              " https://api.testvalley.kr/main-shortcut/all"
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
    
      console.log("api 2:", data)
  return (
    <div>
        <div className="options">
        {data.map((option) => (
            <a href={
                option.linkUrl
            } target="_blank" rel="noopener noreferrer" className='option'>
                <img src={option.imageUrl} alt={option.title} className='option-image'/>
                <p style={{color:'#000'}}>{option.title}</p>
            </a>
        ))}
        </div>
    </div>
  )
}

export default Options





