import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Catscard from './components/Catscard';
import catsCollage from './assets/meow.png';

const TOTAL_CATS = 10;

function App() {
  const [cats, setCats] = useState([]);
  const [index, setIndex] = useState(0);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [started, setStarted] = useState(false); // ✅ added

  const generateCats = () =>
    Array.from({ length: TOTAL_CATS }, (_, i) =>
      `https://cataas.com/cat?width=400&height=400&t=${Date.now()}-${i}`
    );

  const handleStart = () => {
    setCats(generateCats());
    setStarted(true);
  };

  const handleLike = () => {
    setLike(prev => prev + 1);
    setIndex(prev => prev + 1);
  };

  const handleDislike = () => {
    setDislike(prev => prev + 1);
    setIndex(prev => prev + 1);
  };

  const restartApp = () => {
    setCats(generateCats());
    setIndex(0);
    setLike(0);
    setDislike(0);
  };

  return (
    <>
      <main className="main">
        <div className="body">
          {!started ? (
            <div className="start-screen">
              <img src={catsCollage} alt="" className="area-image" />

              <h1 className="poster-title area-title">
                <span className="highlight highlight-purple">PAWS &amp;</span>
                <span className="line2 highlight highlight-lime">PREFERENCES</span>
              </h1>

              <p className="tagline area-tagline">
                Swipe left, swipe right, decide once and for<br />
                all: which cat is your favourite?
              </p>

              <button className="start-btn area-button" onClick={handleStart}>
                Let's Start!
              </button>
            </div>
          ) : (
            <div className="card-screen">
              <h1 className="card-title">Choose your favourite kitty!</h1>
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
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;