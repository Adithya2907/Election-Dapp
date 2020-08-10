pragma solidity ^0.4.17;

contract Election {
    struct Candidate {
        address candidateAddress;
        uint256 candidateVoteCount;
    }

    address public manager;
    bool public campaignDay = true;
    bool public countingDay = false;

    address[] public candidateAddresses;
    mapping(address => Candidate) public candidates;
    mapping(address => bool) public candidatesList;
    uint256 public candidatesCount;

    mapping(address => bool) public votersList;
    mapping(address => bool) public votedList;
    address[] public voterAddresses;

    function Election() public {
        manager = msg.sender;
    }

    function endCampaign() public restricted {
        campaignDay = false;
    }

    function startCounting() public restricted {
        countingDay = true;
    }

    function declareResults() public view restricted returns (address) {
        require(campaignDay == false);
        require(countingDay == true);

        uint256 max = 0;
        for (uint256 i = 1; i < candidatesCount; i++) {
            if (
                candidates[candidateAddresses[i]].candidateVoteCount >
                candidates[candidateAddresses[max]].candidateVoteCount
            ) {
                max = i;
            }
        }

        return candidates[candidateAddresses[max]].candidateAddress;
    }

    function contestInElection() public {
        require(candidatesList[msg.sender] == false);
        require(campaignDay == true);

        candidatesList[msg.sender] = true;
        candidateAddresses.push(msg.sender);
        candidates[msg.sender] = Candidate({
            candidateAddress: msg.sender,
            candidateVoteCount: 0
        });
        candidatesCount++;
    }

    function getCandidateAddresses() public view returns (address[]) {
        return candidateAddresses;
    }

    function registerAsVoter() public {
        require(campaignDay == true);
        require(votersList[msg.sender] == false);

        votersList[msg.sender] = true;
        voterAddresses.push(msg.sender);
    }

    function getVotersAddresses() public view returns (address[]) {
        return voterAddresses;
    }

    function vote(address _candidate) public {
        require(campaignDay == false);
        require(countingDay == false);
        require(votedList[msg.sender] == false);
        require(votersList[msg.sender] == true);

        votedList[msg.sender] = true;
        candidates[_candidate].candidateVoteCount++;
    }

    modifier restricted {
        require(msg.sender == manager);
        _;
    }
}
