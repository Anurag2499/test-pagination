import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProduct] = useState([]);

  const fetchData = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();
    console.log(data);

    if (data && data.products) {
      setProduct(data.products);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <div className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt="" />
                <span>{prod.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
