function Hero(props) {
  return(
    <div>
      <p>Name: {props.hero.name}</p>

      <p>Rank: {props.hero.rank}</p>

      <p>Location: {props.hero.latitude} | {props.hero.longitude}</p>
    </div>
  );
}

export default Hero;
