# Mento Reserve Dashboard

A comprehensive dashboard for visualizing Mento's reserve holdings across Celo and Ethereum blockchains. This project provides real-time insights into the composition and distribution of reserve assets that back Mento's stablecoins.

## 🎯 Project Overview

Mento is a core protocol in the Celo ecosystem focused on building decentralized, overcollateralized stablecoins for real-world use cases. This dashboard visualizes the state and composition of Mento's reserves to help the community understand how stablecoins are backed.

## ✨ Features

### Core Visualizations
- **Total Reserve Value**: Real-time USD value of all reserve assets
- **Chain Distribution**: Breakdown of assets across Celo and Ethereum
- **Asset Breakdown**: Pie chart showing distribution by asset type
- **Protocol Exposure**: Assets held in DeFi protocols (Aave, Uniswap V3)

### Key Metrics
- Reserve value by blockchain (Celo vs Ethereum)
- Asset composition and percentages
- Protocol-level segmentation
- Historical trends and changes

### Supported Assets
- **Stablecoins**: USDC, USDT, EURC, axlUSDC, axlEUROC, USDGLO, stEUR
- **Cryptocurrencies**: CELO, ETH, WBTC, WETH
- **Yield Assets**: stETH, sDAI

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mento-reserve-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🛠️ API Keys & Environment Variables

This app uses the Zapper API to fetch real-time reserve data.

1. **Local Development:**
   - Create a `.env.local` file in your project root:
     ```
     NEXT_PUBLIC_ZAPPER_API_KEY=your_zapper_api_key_here
     ```
   - Restart your dev server after adding the key.

2. **Vercel Deployment:**
   - Go to your project settings in Vercel.
   - Add the environment variable:
     - Name: `NEXT_PUBLIC_ZAPPER_API_KEY`
     - Value: your Zapper API key
   - Redeploy your project after saving.

## 🏗️ Architecture (Updated)

- **Data Source:** Zapper API (for reserve, protocol, and asset data)
- **API Key:** Required for all data fetching (see above)
- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Charts:** Recharts

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── OverviewCards.tsx  # Key metrics cards
│   ├── AssetBreakdown.tsx # Asset distribution chart
│   ├── ChainComparison.tsx # Chain comparison
│   ├── ProtocolBreakdown.tsx # Protocol exposure
│   └── LoadingSpinner.tsx # Loading component
├── services/              # Data services
│   └── reserveData.ts     # Reserve data fetching
├── types/                 # TypeScript definitions
│   └── index.ts           # Type definitions
├── config/                # Configuration files
│   └── addresses.ts       # Reserve addresses
└── public/                # Static assets
```

## 📊 Data Sources (Updated)

- **Zapper API:** Used for all reserve, asset, and protocol data
- **Celo/Ethereum Addresses:** Queried via Zapper

### Reserve Addresses
The dashboard tracks assets across multiple reserve addresses:

- **Main Reserve Contract**: `0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9`
- **Operational Accounts**: Multiple addresses for rebalancing
- **Protocol Positions**: Aave and Uniswap V3 positions

## 🎨 Design System

### Color Palette
- **Celo Primary**: #35D07F (Green)
- **Celo Secondary**: #FBCC5C (Yellow)
- **Ethereum Primary**: #627EEA (Blue)
- **Neutral**: Gray scale for UI elements

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for production configuration:

```env
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key
```

### Customization
- Modify `config/addresses.ts` to add/remove reserve addresses
- Update `services/reserveData.ts` to integrate with real APIs
- Customize charts in individual components

## 📈 Future Enhancements

### Planned Features
- Real-time blockchain data integration
- Historical data and trends
- Alert system for significant changes
- Mobile-responsive design improvements
- Export functionality for reports

### API Integration
- Implement WebSocket connections for live updates
- Add caching layer for performance
- Integrate with Mento's analytics API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Mento Protocol team for the reserve address configuration
- Celo Foundation for the ecosystem support
- Open source community for the amazing tools and libraries

## 📞 Contact

For questions or support, please reach out to:
- Email: internship@celo.org
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

---

**Note**: This is a demonstration dashboard created for the Data & Ecosystem Insights Intern position at Celo Foundation. The current implementation uses mock data to showcase the visualization capabilities and design approach. 