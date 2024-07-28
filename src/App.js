import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

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

  const handleOnClick = (i) => {
    setPage(i);
    setError(null);
  };
  const handlePrevBtn = () => {
    if (page > 1) {
      setPage(page - 1);
      setError(null);
    } else {
      setError('Error! No prev page.');
    }
  };

  const handleNextBtn = () => {
    if (page < 10) {
      setPage(page + 1);
      setError(null);
    } else {
      setError('Error! No next page.');
    }
  };
  return (
    <div className="App">
      {'Page number : ' + page}
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <div className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt="" />
                <span>{prod.title}</span>
              </div>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <>
          <div
            className="message"
            style={{ color: 'Red', display: 'flex', justifyContent: 'center' }}
          >
            {error}
          </div>
          <div className="pagination">
            <span onClick={() => handlePrevBtn()}>◀️</span>
            {[...Array(products.length / 10)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={i + 1 === page ? 'pagination__selected' : ''}
                  onClick={() => handleOnClick(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}
            <span onClick={() => handleNextBtn()}>▶️</span>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
