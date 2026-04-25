interface Props {
  account: string;
  chairperson: string;
  contractAddress: string;
  status: string;
  onConnect: () => void;
}

export default function WalletPanel({
  account,
  chairperson,
  contractAddress,
  status,
  onConnect,
}: Props) {
  return (
    <section className="card">
      <h2>Подключение</h2>
      <button onClick={onConnect}>Подключить MetaMask</button>
      <p><strong>Аккаунт:</strong> {account}</p>
      <p><strong>Chairperson:</strong> {chairperson}</p>
      <p><strong>Адрес контракта:</strong> {contractAddress}</p>
      <p><strong>Статус:</strong> {status}</p>
    </section>
  );
}