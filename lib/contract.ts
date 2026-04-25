export const CONTRACT_ADDRESS = "0x94eaCA77659020F43cc5b6eD1659F0011642c5E6";
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