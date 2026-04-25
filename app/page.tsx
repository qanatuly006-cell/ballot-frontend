"use client";

import { useState } from "react";
import { CONTRACT_ADDRESS } from "@/lib/contract";
import { useWallet } from "@/hooks/useWallet";
import { useBallot } from "@/hooks/useBallot";

import WalletPanel from "@/components/WalletPanel";
import VoterStatus from "@/components/VoterStatus";
import ProposalsList from "@/components/ProposalsList";
import GiveRightForm from "@/components/GiveRightForm";
import DelegateForm from "@/components/DelegateForm";
import VoteForm from "@/components/VoteForm";
import WinnerCard from "@/components/WinnerCard";

export default function Home() {
  const { signer, contract, account, status, setStatus, connectWallet } = useWallet();

  const {
    chairperson,
    proposals,
    winnerName,
    winnerIndex,
    voterData,
    giveRightToVote,
    delegateVote,
    voteForProposal,
  } = useBallot(contract, signer, setStatus);

  const [voterAddress, setVoterAddress] = useState("");
  const [delegateAddress, setDelegateAddress] = useState("");
  const [proposalIndex, setProposalIndex] = useState("");
  return (
  <main className="container">
    <h1>Ballot DApp (Next.js)</h1>

    <WalletPanel
      account={account}
      chairperson={chairperson}
      contractAddress={CONTRACT_ADDRESS}
      status={status}
      onConnect={connectWallet}
    />

    <VoterStatus
      weight={voterData.weight}
      voted={voterData.voted}
      delegate={voterData.delegate}
      vote={voterData.vote}
    />

    <ProposalsList proposals={proposals} />

    <GiveRightForm
      voterAddress={voterAddress}
      setVoterAddress={setVoterAddress}
      onSubmit={() => void giveRightToVote(voterAddress)}
    />

    <DelegateForm
      delegateAddress={delegateAddress}
      setDelegateAddress={setDelegateAddress}
      onSubmit={() => void delegateVote(delegateAddress)}
    />

    <VoteForm
      proposalIndex={proposalIndex}
      setProposalIndex={setProposalIndex}
      onSubmit={() => void voteForProposal(Number(proposalIndex))}
    />

    <WinnerCard winnerIndex={winnerIndex} winnerName={winnerName} />
  </main>
);
}