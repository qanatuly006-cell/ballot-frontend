interface Props {
  delegateAddress: string;
  setDelegateAddress: (value: string) => void;
  onSubmit: () => void;
}

export default function DelegateForm({
  delegateAddress,
  setDelegateAddress,
  onSubmit,
}: Props) {
  return (
    <section className="card">
      <h2>Делегировать голос</h2>
      <input
        type="text"
        value={delegateAddress}
        onChange={(e) => setDelegateAddress(e.target.value)}
        placeholder="Адрес делегата"
      />
      <button onClick={onSubmit}>Делегировать</button>
    </section>
  );
}