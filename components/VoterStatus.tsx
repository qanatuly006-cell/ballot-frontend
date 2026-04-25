interface Props {
  weight: string;
  voted: string;
  delegate: string;
  vote: string;
}

export default function VoterStatus({ weight, voted, delegate, vote }: Props) {
  return (
    <section className="card">
      <h2>Статус избирателя</h2>
      <div className="info-grid">
        <div><strong>Вес:</strong> {weight}</div>
        <div><strong>Голосовал:</strong> {voted}</div>
        <div><strong>Делегат:</strong> {delegate}</div>
        <div><strong>Голос:</strong> {vote}</div>
      </div>
    </section>
  );
}