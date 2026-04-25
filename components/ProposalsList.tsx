interface Proposal {
  index: number;
  name: string;
  voteCount: string;
  isWinner: boolean;
}

interface Props {
  proposals: Proposal[];
}

export default function ProposalsList({ proposals }: Props) {
  return (
    <section className="card">
      <h2>Предложения</h2>
      <div className="proposals-grid">
        {proposals.length === 0 ? (
          <p>Предложения не загружены.</p>
        ) : (
          proposals.map((proposal) => (
            <div
              key={proposal.index}
              className={`proposal-item ${proposal.isWinner ? "winner-card" : ""}`}
            >
              <div className="proposal-title">
                #{proposal.index} — {proposal.name}
              </div>
              <div className="proposal-votes">
                Голосов: {proposal.voteCount}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}