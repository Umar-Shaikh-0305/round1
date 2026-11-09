// Full-screen themed background. Drop the director's photos into /public/bg/
// (login.jpg, rounds.jpg, rules.jpg, game.jpg). Until then a dark gradient is used.
export default function Background({ variant = 'rounds', children }) {
  return (
    <div className={`bg bg--${variant}`}>
      <div className="bg__fog" />
      <div className="bg__vignette" />
      <div className="bg__scan" />
      <div className="bg__content">{children}</div>
    </div>
  );
}
