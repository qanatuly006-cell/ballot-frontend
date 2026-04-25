export const CONTRACT_ADDRESS = "0xcEeEC462805A428C7417D76EE619f873de20413A";

export const ABI = [
  "function chairperson() view returns (address)",
  "function giveRightToVote(address voter)",
  "function delegate(address to)",
  "function vote(uint proposal)",
  "function winningProposal() view returns (uint)",
  "function winnerName() view returns (bytes32)",
  "function proposals(uint) view returns (bytes32 name, uint voteCount)",
  "function voters(address) view returns (uint weight, bool voted, address delegate, uint vote)"
] as const;