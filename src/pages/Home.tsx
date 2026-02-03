import Hero from '../components/Hero';

// Home ne sert plus que de conteneur pour le Hero dans cette nouvelle structure
const Home = () => {
  return (
    <div id="home">
      <Hero />
    </div>
  );
};

export default Home;