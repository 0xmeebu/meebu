#!/bin/sh

count_votes_json=$(<jsons/count_votes.json)

sunodo send generic --dapp 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --input-encoding string --input "$count_votes_json"
