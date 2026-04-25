interface Props {
  voterAddress: string;
  setVoterAddress: (value: string) => void;
  onSubmit: () => void;
}

export default function GiveRightForm({
  voterAddress,
  setVoterAddress,
  onSubmit,
}: Props) {
  return (
    <section className="card">
      <h2>Выдать право голоса</h2>
      <input
        type="text"
        value={voterAddress}
        onChange={(e) => setVoterAddress(e.target.value)}
        placeholder="Адрес избирателя"
      />
      <button onClick={onSubmit}>Выдать право</button>
    </section>
  );
}