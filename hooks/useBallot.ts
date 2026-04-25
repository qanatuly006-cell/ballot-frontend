"use client";

import { useEffect, useState } from "react";
import { Contract, JsonRpcSigner, JsonRpcProvider, ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "@/lib/contract";

const READ_PROVIDER = new JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");

export interface ProposalData {
  index: number;
  name: string;
  voteCount: string;
  isWinner: boolean;
}

export interface VoterData {
  weight: string;
  voted: string;
  delegate: string;
  vote: string;
}

export function useBallot(
  contract: Contract | null,
  signer: JsonRpcSigner | null,
  setStatus: (value: string) => void
) {
  const [chairperson, setChairperson] = useState<string>("-");
  const [proposals, setProposals] = useState<ProposalData[]>([]);
  const [winnerName, setWinnerName] = useState<string>("-");
  const [winnerIndex, setWinnerIndex] = useState<string>("-");

  const [voterData, setVoterData] = useState<VoterData>({
    weight: "-",
    voted: "-",
    delegate: "-",
    vote: "-",
  });

  const readContract = new Contract(CONTRACT_ADDRESS, ABI, READ_PROVIDER);

  function decodeBytes32(value: string): string {
    try {
      return ethers.decodeBytes32String(value);
    } catch {
      return value;
    }
  }

  async function loadChairperson(): Promise<void> {
    try {
      const chair = await readContract.chairperson();
      setChairperson(chair);
    } catch (e) {
      console.error("chairperson error:", e);
      setChairperson("ошибка чтения");
    }
  }

  async function loadVoterStatus(): Promise<void> {
    if (!signer) return;
    try {
      const currentAccount = await signer.getAddress();
      const voter = await readContract.voters(currentAccount);
      setVoterData({
        weight: voter.weight.toString(),
        voted: voter.voted ? "Да" : "Нет",
        delegate: voter.delegate === ethers.ZeroAddress ? "-" : voter.delegate,
        vote: voter.voted ? voter.vote.toString() : "-",
      });
    } catch (e) {
      console.error("voterStatus error:", e);
    }
  }

  async function loadProposals(): Promise<void> {
    let winner: number | null = null;
    try {
      winner = Number(await readContract.winningProposal());
    } catch {
      winner = null;
    }

    const loaded: ProposalData[] = [];
    let index = 0;

    while (true) {
      try {
        const proposal = await readContract.proposals(index);
        loaded.push({
          index,
          name: decodeBytes32(proposal.name),
          voteCount: proposal.voteCount.toString(),
          isWinner: winner !== null && winner === index,
        });
        index++;
      } catch {
        break;
      }
    }

    setProposals(loaded);
  }

  async function loadWinner(): Promise<void> {
    try {
      const winner = await readContract.winnerName();
      const winnerProposal = await readContract.winningProposal();
      setWinnerName(decodeBytes32(winner));
      setWinnerIndex(winnerProposal.toString());
    } catch (e) {
      console.error("winner error:", e);
    }
  }

  async function loadAll(): Promise<void> {
    try {
      await loadChairperson();
      await loadVoterStatus();
      await loadProposals();
      await loadWinner();
      setStatus("Данные загружены");
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Ошибка загрузки";
      setStatus(message);
    }
  }

  async function giveRightToVote(address: string): Promise<void> {
    if (!contract) return;
    if (!ethers.isAddress(address)) {
      setStatus("Некорректный адрес");
      return;
    }
    setStatus("Отправка транзакции...");
    const tx = await contract.giveRightToVote(address);
    await tx.wait();
    setStatus("Право голоса выдано");
    await loadAll();
  }

  async function delegateVote(address: string): Promise<void> {
    if (!contract) return;
    if (!ethers.isAddress(address)) {
      setStatus("Некорректный адрес делегата");
      return;
    }
    setStatus("Отправка транзакции...");
    const tx = await contract.delegate(address);
    await tx.wait();
    setStatus("Голос делегирован");
    await loadAll();
  }

  async function voteForProposal(index: number): Promise<void> {
    if (!contract) return;
    setStatus("Отправка транзакции...");
    const tx = await contract.vote(index);
    await tx.wait();
    setStatus("Голос учтен");
    await loadAll();
  }

  useEffect(() => {
    void loadAll();
  }, [contract, signer]);

  return {
    chairperson,
    proposals,
    winnerName,
    winnerIndex,
    voterData,
    loadAll,
    giveRightToVote,
    delegateVote,
    voteForProposal,
  };
}