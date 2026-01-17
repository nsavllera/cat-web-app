import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Catscard from './components/Catscard';

const TOTAL_CATS = 10;

function App() {
  const [cats, setCats] = useState([]);
  const [index, setIndex] = useState(0);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  useEffect(() => {
    const urls = Array.from({ length: TOTAL_CATS }, (_, i) =>
      `https://cataas.com/cat?width=400&height=400&t=${Date.now()}-${i}`
    );
    setCats(urls);
  }, []);

  const handleLike = () => {
    setLike(prev => prev + 1);
    setIndex(prev => prev + 1);
  };

  const handleDislike = () => {
    setDislike(prev => prev + 1);
    setIndex(prev => prev + 1);
  };

  const restartApp = () => {
    const urls = Array.from({ length: TOTAL_CATS }, (_, i) =>
      `https://cataas.com/cat?width=400&height=400&t=${Date.now()}-${i}`
    );

    setCats(urls);
    setIndex(0);
    setLike(0);
    setDislike(0);
  };


  return (
    <>
      <Header />
      <main className="main">
        <div className="card-stack">
          {index < TOTAL_CATS ? (
            <Catscard
              key={cats[index]}
              cataasUrl={cats[index]}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          ) : (
            <div className="summary">
              <h2>♡ Cats Summary ♡</h2>
              <p>Liked: <strong>{like}</strong></p>
              <p>Disliked: <strong>{dislike}</strong></p>
              <button className="refresh-btn" onClick={restartApp}>
                Start Again
              </button>
            </div>
          )}
        </div>
        <h2>Swipe LEFT to DISLIKE & RIGHT to LIKE</h2>
      </main>
      <Footer />
    </>
  );
}

export default App;
