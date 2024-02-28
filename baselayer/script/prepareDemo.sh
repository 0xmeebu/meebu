#!/bin/sh

create_proposal_json=$(<jsons/create_proposal.json)
cast_vote_json=$(<jsons/cast_vote.json)

sunodo send generic --dapp 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --input-encoding string --input "$create_proposal_json"
sunodo send generic --dapp 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --input-encoding string --input "$cast_vote_json"

sunodo send generic --chain-id 31337 -r http://127.0.0.1:8545 --mnemonic-index 1 --dapp 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --input-encoding string --input "$cast_vote_json"

sunodo send generic --chain-id 31337 -r http://127.0.0.1:8545 --mnemonic-index 2 --dapp 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --input-encoding string --input "$cast_vote_json"


sunodo send generic --chain-id 31337 -r http://127.0.0.1:8545 --mnemonic-index 3 --dapp 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --input-encoding string --input "$cast_vote_json"
