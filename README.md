# DegenWorks OS

![DegenWorks Logo](./git_header.png)

SYSTEM DIAGNOSTICS: DEGENWORKS OS INITIALIZED  
- DegenWorks OS is not just another analytics tool—it's a modular powerhouse built to decode blockchain complexity.  
- Designed for the sharpest developers and researchers, it dissects wallets, flags anomalies, and operates across multiple chains with precision.  
- Seamlessly integrating APIs, AI-driven intelligence, and raw blockchain data, DegenWorks OS is built for those who demand deep insights.  

---

## **Overview**

DegenWorks OS is built to handle complex blockchain data workflows with the following key features:

- **Multi-Chain Support:** Analyze wallets and transactions across Solana, Ethereum, and Binance Smart Chain, with the flexibility to add more chains.  
- **API Integrations:** Supports major APIs such as CoinGecko, DexScreener, and Binance for price data, liquidity insights, and more.  
- **AI-Powered Insights:** Leverages AI for anomaly detection, transaction analysis, and risk evaluation.  
- **Scalability:** Modular architecture to extend functionality with ease.  
- **Security-Focused:** Includes rate-limiting, authentication, and anomaly detection to safeguard your application.  

GitHub: [DegenWorks Repository](https://github.com/degenworkssecurity/DegenOS)  
Website: [DegenWorks.com](https://www.degenworks.com)  

---

## **Features**

### Blockchain Support:
- **Solana:** Analyze balances, transactions, and tokens.  
- **Ethereum:** Fetch wallet balances, transaction data, and gas fees.  
- **Binance Smart Chain:** Perform in-depth analysis with real-time data.  

### AI-Driven Analysis:
- AI models detect high-risk transactions, unusual patterns, and wallet anomalies.  
- Advanced rule-based anomaly detection with modular rule engines.  

### API Integrations:
- **CoinGecko:** Real-time market prices and historical data.  
- **DexScreener:** Liquidity pool and token insights.  
- **Binance:** Order book data, historical trades, and live prices.  

### Modular Design:
- Expandable modules for blockchain interaction, analytics, and API integrations.  
- Easy-to-add support for additional blockchains and services.  

### Security:
- Built-in rate-limiting to prevent abuse.  
- CORS configuration for secure API access.  
- Role-based access support (coming soon).  

---

## **Installation**

### Prerequisites:
- **Node.js:** >= 16.x  
- **npm:** >= 8.x  
- **PM2 (optional):** For process management in production.  

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/degenworkssecurity/DegenOS.git
   cd DegenOS
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables: Create a .env file in the root directory with the following:
   ```bash
    NODE_ENV=development
	OPENAI_API_KEY=your_openai_api_key
	INFURA_PROJECT_ID=your_infura_project_id
   ```
4. Start the application:
	- Development mode:
   ```bash
   npm run dev
   ```
   
   	- Production mode:
   ```bash
   npm run start
   ```

## **Project Structure**
	```bash
	project-root/
	├── src/
	│   ├── core/
	│   │   ├── apiHandler.js         # Central API handler for all API requests
	│   │   ├── config.js             # Configuration files for various networks and APIs
	│   │   ├── errorHandler.js       # Unified error handling
	│   │   ├── logger.js             # Logging module for requests and analysis
	│   │   └── utils/
	│   │       ├── parser.js         # JSON and data parsers
	│   │       ├── validator.js      # Input validation and standards
	│   │       └── formatter.js      # Output formatting
	│   ├── modules/
	│   │   ├── walletAnalysis/
	│   │   │   ├── solana.js         # Solana-specific analysis modules
	│   │   │   ├── ethereum.js       # Ethereum-specific analysis modules
	│   │   │   └── walletScanner.js  # Universal wallet scanning module
	│   │   ├── transactionAnalysis/
	│   │   │   ├── anomalyDetector.js  # AI module for anomaly detection
	│   │   │   ├── aiAnalyzer.js       # AI-based transaction analysis
	│   │   │   └── rulesEngine.js      # Rule-based transaction filtering
	│   │   ├── blockchainSupport/
	│   │   │   ├── solanaAPI.js        # Solana-specific blockchain API
	│   │   │   ├── ethereumAPI.js      # Ethereum-specific blockchain API
	│   │   │   └── binanceSmartChain.js # Binance Smart Chain API
	│   │   └── apiIntegrations/
	│   │       ├── coingecko.js       # CoinGecko API integration
	│   │       ├── dexscreener.js     # DexScreener API integration
	│   │       ├── binance.js         # Binance API integration
	│   │       └── rugDetection.js    # Rug detection tools integration
	│   ├── frontend/
	│   │   ├── components/
	│   │   │   ├── WalletInput.js     # Input component for wallet addresses
	│   │   │   ├── ResultDisplay.js   # Displays transaction results
	│   │   │   └── AlertMessage.js    # Dynamic alert messages
	│   │   ├── pages/
	│   │   │   ├── Dashboard.js       # User dashboard
	│   │   │   ├── ScanPage.js        # Wallet scanning page
	│   │   │   └── Settings.js        # User settings
	│   │   ├── styles/
	│   │   │   └── main.css           # Central CSS for the frontend
	│   │   └── index.js               # Frontend entry point
	│   └── backend/
	│       ├── routes/
	│       │   ├── wallet.js          # Wallet analysis routes
	│       │   ├── transactions.js    # Transaction analysis routes
	│       │   └── blockchain.js      # Blockchain API routes
	│       ├── services/
	│       │   ├── walletService.js   # Wallet-specific services
	│       │   ├── transactionService.js # Transaction analysis services
	│       │   └── blockchainService.js  # Blockchain-related services
	│       ├── middleware/
	│       │   ├── authMiddleware.js  # API authentication middleware
	│       │   ├── rateLimiter.js     # Rate limiting for API requests
	│       │   └── corsConfig.js      # CORS policy configurations
	│       └── app.js                 # Backend entry point
	├── package.json                   # Dependencies and scripts
	├── README.md                      # Project overview and documentation
	└── LICENSE                        # License file
	```
	
## Usage

### Starting the Application
To start the application, use one of the following commands:
- **Development Mode**:
```bash
npm run dev
```

This starts the application with live reload for development.
Production Mode:
```bash
npm run start
```
This runs the application in production mode.

### API Documentation
1. Wallet Scanning
Endpoint: POST /api/wallet/scan
Request Body:
```bash
{
  "walletAddress": "your_wallet_address",
  "network": "solana"
}
```
Response:
```bash
{
  "balance": 10.5,
  "usdValue": 250,
  "transactions": [...]
}
```

2. Transaction Analysis
Endpoint: POST /api/transactions/analyze
Description: Uses AI to analyze transactions for anomalies.

## Testing

To run tests, use the following command:
```bash
npm run test
```

### Test Coverage
Unit tests: Cover individual modules.
Integration tests: Cover interactions between modules.
End-to-end tests: Simulate real-world workflows.

## Deployment

### Using deploy.sh
Run the following script to deploy the application:
```bash
./scripts/deploy.sh
```
Ensure the necessary environment variables are configured before deployment.

## Contributing

We welcome contributions to DegenWorks Follow these steps:

- Fork the repository.
- Create a new branch for your feature or bugfix.
- Commit your changes with descriptive messages.
- Submit a pull request to the main branch.

## License

This project is licensed under the MIT License. See the LICENSE file for details.