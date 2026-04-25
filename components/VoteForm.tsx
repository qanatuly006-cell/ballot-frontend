interface Props {
  proposalIndex: string;
  setProposalIndex: (value: string) => void;
  onSubmit: () => void;
}

export default function VoteForm({
  proposalIndex,
  setProposalIndex,
  onSubmit,
}: Props) {
  return (
    <section className="card">
      <h2>Проголосовать</h2>
      <input
        type="number"
        value={proposalIndex}
        onChange={(e) => setProposalIndex(e.target.value)}
        placeholder="Индекс предложения"
      />
      <button onClick={onSubmit}>Голосовать</button>
    </section>
  );
}