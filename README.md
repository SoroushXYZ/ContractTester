# Smart Contract Interaction App

This Next.js TypeScript application allows you to interact with smart contracts on various blockchains. It utilizes the [ThirdWeb library](https://github.com/thirdweb-dev) to manage blockchain functionality.

## Usage

1. Install dependencies:

```
yarn install
```

2. Run the application:

```
yarn dev
```

## Setup

To utilize the blockchain functionalities, you need to set up your ThirdWeb API key in the `.env` file:

```env
NEXT_PUBLIC_TEMPLATE_CLIENT_ID="your-api-key"
```

## Blockchain Interactions

- Use any supported blockchain.
- Provide the contract address and ABI to access its functions.

## ThirdWeb Library

The app leverages the [ThirdWeb library](https://github.com/thirdweb-dev) for blockchain handling.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
