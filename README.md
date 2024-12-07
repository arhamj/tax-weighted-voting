# tax-weighted-voting

Tax weighted voting is an application of the concept of weighted voting, where the weight of a voter is determined by the amount of tax they pay. National elections today in a developing country like India are based on the principle of one person one vote. This is a fair principle, but it encourages more bad behaviour than good.

## Key Problems

1. **Short-termism**: Politicians are incentivised to focus on short-term gains, rather than long-term benefits.
2. **Populism**: Politicians are incentivised to make popular decisions, rather than the right decisions.
3. **Bribery in Elections**: Politicians are incentivised to bribe voters to win elections.
4. **Stagnation**: Politicians are incentivised to keep the poor poor, so that they can continue to bribe them in future elections.
5. **Polling Booth Capture**: Politicians are incentivised to capture polling booths to win elections.

## Solution

Tax weighted voting is a possible solution to these problems. In tax weighted voting, the weight of a voter is determined by the average tax slab they fall in based on their last 3 year's tax returns. This is also a step to help distribute the tax payer inequality in developing countries (3% of the population pays 97% of the income taxes in India and they aren't the ones making the higest income!).

Technically, the following challenges need to be addressed:

1. Who will determine the weight of a voter?
   - Using TLSNotary to notarize the tax returns of a voter from the Income Tax Portal.
2. What happens to first-time voters and retired voters? (Do they get a weight of 1? Is that fair?)
   - This is a difficult though exercise. It almost feels like a chicken and egg problem. Do you want to add more factors to over complicate the system? Or do you want to keep it fair?
3. How will the voting be conducted?
   - Onchain using MACI.
4. Will this positively impact the systems we have today?
   - Is the current system the most effecient and is this all and overkill?
   - Will we be shifting corruption to tax calculation bodies and are we solving or moving the problem?
     - With the first promise of a blockchain being solving money, maybe this helps in building infra in the long run.

## Implementation

As part of the hackathon the following components will be implemented:

| Component | Description                                                    | Status      |
| --------- | -------------------------------------------------------------- | ----------- |
| TLSNotary | Notarize the tax returns of a voter from the Income Tax Portal | Done        |
| MACI      | Weighted voting                                                | Started     |
| Bridge    | Using the TLSNotary to gatekeep the MACI voting                | Not Started |

## Project Structure

1. `notary_plugins`: contains `income_tax` plugin for TLSNotary Browser Extension.
2. TBA
3. TBA

## Screenshots

### Income Tax Plugin

TBA

## Team

Offbeat Labs
