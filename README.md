<div align="center">
	<a href="https://eoscostarica.io">
		<img src="https://raw.githubusercontent.com/eoscostarica/.github/master/.github/workflows/images/eos-costa-rica-logo.png" width="300">
	</a>

![](https://img.shields.io/github/license/eoscostarica/claim-bp-rewards) ![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) ![](https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg) [![](https://img.shields.io/twitter/follow/eoscostarica?style=social)](https://twitter.com/EOSCostaRica) ![](https://img.shields.io/github/forks/eoscostarica/claim-bp-rewards?style=social)

</div>

# Claim Block Producer Rewards

This script is meant to be run as a cron job that checks if a Block Producer's account has claimed rewards in the last 24 hours.

If the BP has not claimed rwards in the last 24hrs it will call the `claimrewards` action to collect payment.

## Installation

Basic knowledge about Docker and NodeJS is required.

### Getting started

Some things you need before getting started:

- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/es/)
- [docker](https://www.docker.com/)

### Running for the first time

1.  Clone this repo using `git clone --depth=1 https://github.com/eoscostarica/claim-bp-rewards.git <YOUR_PROJECT_NAME>`
2.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.
3.  Copy and rename the `.env.example` to `.env` then update the environment variables according to your needs
4.  For the CLAIM_NETWORK, the supports networks are: `libre`,`libre-testnet`, `antelope`, `jungle`, `telos`, `telos-testnet`, `proton`, `proton-testnet`, `wax`, `.	wax-testnet`

### Quick start

At this point you can execute `make run` to execute the resource watcher locally.

## File Structure

Within the project repository you will find the following directories and files:

```
claim-bp-rewards/
├── src ..................... Project Source Code
| ├── index.js .............. Claim Rewards Script
| ├── config ................ Configuration Parameters
│ └── utils ................. EOSJS Utilities
├── package.json ............ NPM Project Metadata
├── yarn-lock.json .......... NPM Packages Lock File
├── .env.example ............ Environmental Variables Example File
├── .gitignore .............. Files Ignored by Git
├── Dockerfile .............. Docker Build 
├── LICENSE ................. MIT License Terms
└── README.md ............... Project Documentation
```

## Contributing

Please Read EOS Costa Rica's [Open Source Contributing Guidelines](https://developers.eoscostarica.io/docs/open-source-guidelines).

Please report bugs big and small by [opening an issue](https://github.com/eoscostarica/claim-bp-rewards/issues)

## About EOS Costa Rica

<span align="center">

<a href="https://eoscostarica.io"><img width="300" alt="image" src="https://raw.githubusercontent.com/eoscostarica/.github/master/.github/workflows/images/eos-costa-rica-logo.png"></img></a>

[![Twitter](https://img.shields.io/twitter/follow/EOSCostaRica?style=for-the-badge)](https://twitter.com/EdeniaWeb3)
[![Discord](https://img.shields.io/discord/946500573677625344?color=black&label=Discord&logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/YeGcF6QwhP)

EOS Costa Rica is an independently-owned, self-funded, bare-metal Genesis block producer that provides stable and secure infrastructure for the EOS mainnet. We support open source software for our community while offering enterprise solutions and custom smart contract development for our clients.

</span>