# Mento Reserve Dashboard - Dune Analytics

A comprehensive Dune Analytics dashboard for visualizing Mento's reserve holdings across Celo and Ethereum blockchains. This dashboard provides real-time insights into the composition and distribution of reserve assets that back Mento's stablecoins.

## 🎯 Dashboard Overview

**Dashboard URL**: [Mento Reserve Dashboard on Dune](https://dune.com/your-username/mento-reserve-dashboard)

This dashboard addresses all the assignment objectives:
- ✅ Break down reserve holdings by asset (CELO, sDAI, ETH, BTC, stEUR, USDC, USDGLO, EURC, stETH, USDT)
- ✅ Segment reserve assets by chain (Celo and Ethereum)
- ✅ Show aggregated USD value of reserves on each chain and in total
- ✅ Bonus: Segment reserve holdings by protocol (Aave, Uniswap V3)

## 📊 Dashboard Sections

### 1. Reserve Overview
- **Query**: `reserve_overview.sql`
- **Visualization**: Table
- **Purpose**: High-level overview of total reserve values across all chains and assets
- **Key Metrics**: Total USD value, balance by asset, address count

### 2. Asset Breakdown
- **Query**: `asset_breakdown.sql`
- **Visualization**: Pie Chart
- **Purpose**: Detailed breakdown of all reserve assets by type and chain
- **Key Insights**: Asset distribution, percentage of total, asset types (Cryptocurrency, Stablecoin, Yield Asset)

### 3. Chain Comparison
- **Query**: `chain_comparison.sql`
- **Visualization**: Bar Chart
- **Purpose**: Comparison of reserve holdings across Celo and Ethereum
- **Key Metrics**: Total value per chain, percentage distribution, asset count

### 4. Protocol Exposure
- **Query**: `protocol_exposure.sql`
- **Visualization**: Table
- **Purpose**: Assets held in DeFi protocols for yield generation
- **Protocols**: Aave V3, Uniswap V3
- **Key Metrics**: Protocol value, percentage of total protocols, asset list

### 5. Historical Trends
- **Query**: `historical_trends.sql`
- **Visualization**: Line Chart
- **Purpose**: 30-day historical trends of reserve values
- **Key Metrics**: Daily changes, percentage changes, value trends

## 🏗️ Technical Implementation

### Data Sources
- **Celo Balances**: `celo.balances` table
- **Ethereum Balances**: `ethereum.balances` table
- **Price Data**: `prices.usd` table for real-time asset pricing

### Reserve Addresses Tracked
Based on the Mento analytics API configuration:

**Celo Chain:**
- `0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9` - Main Reserve
- `0x87647780180b8f55980c7d3ffefe08a9b29e9ae1` - Reserve Multisig
- `0x13a9803d547332c81Ebc6060F739821264DBcf1E` - Reserve Address
- `0xDA7BFEF937F0944551a24b4C68B054bfA7127570` - Operational Account
- `0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1` - Operations Multisig
- `0x9d65E69aC940dCB469fd7C46368C1e094250a400` - Reserve

**Ethereum Chain:**
- `0xd0697f70E79476195B742d5aFAb14BE50f98CC1E` - Main Reserve
- `0x13a9803d547332c81Ebc6060F739821264DBcf1E` - Reserve
- `0xDA7BFEF937F0944551a24b4C68B054bfA7127570` - Operational Account
- `0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1` - Operations Multisig

### Supported Assets
- **Cryptocurrencies**: CELO, ETH, WBTC, WETH
- **Stablecoins**: USDC, USDT, EURC, axlUSDC, axlEUROC, USDGLO, stEUR
- **Yield Assets**: stETH, sDAI

## 📈 Key Insights

### Reserve Composition
1. **Cross-Chain Diversification**: Assets are distributed across both Celo and Ethereum chains
2. **Asset Diversity**: Mix of cryptocurrencies, stablecoins, and yield-generating assets
3. **Protocol Integration**: Active use of DeFi protocols for yield generation

### Risk Management
1. **Geographic Distribution**: Assets spread across multiple blockchain networks
2. **Asset Type Balance**: Combination of volatile and stable assets
3. **Protocol Exposure**: Limited exposure to individual DeFi protocols

### Yield Strategy
1. **Aave V3**: Lending and borrowing for yield generation
2. **Uniswap V3**: Liquidity provision for trading fees
3. **Staked Assets**: stETH and sDAI for additional yield

## 🔧 Setup Instructions

### 1. Create Dune Account
- Visit [dune.com](https://dune.com)
- Sign up for a free account
- Navigate to the query editor

### 2. Import Queries
For each query file in the `queries/` directory:
1. Copy the SQL content
2. Create a new query in Dune
3. Paste the SQL and run
4. Save the query with the appropriate name

### 3. Create Dashboard
1. Create a new dashboard
2. Add each query as a visualization
3. Configure the visualization type according to `dashboard_config.json`
4. Arrange sections as specified in the layout

### 4. Customize Styling
- Apply the color scheme from `dashboard_config.json`
- Use Celo green (#35D07F) and Ethereum blue (#627EEA)
- Ensure consistent branding throughout

## 📊 Query Performance

### Optimization Features
- **Efficient Joins**: Optimized table joins for performance
- **Indexed Columns**: Using indexed columns for faster queries
- **Aggregation**: Pre-aggregated data where possible
- **Time Filtering**: Limited historical data to 30 days for performance

### Refresh Schedule
- **Real-time**: Price data updates every minute
- **Balance Updates**: On-chain balance changes reflected immediately
- **Historical Data**: Daily snapshots for trend analysis

## 🎨 Visualization Best Practices

### Chart Types
- **Pie Charts**: For asset distribution and protocol breakdown
- **Bar Charts**: For chain comparison and value comparisons
- **Line Charts**: For historical trends and time series data
- **Tables**: For detailed data with multiple metrics

### Color Scheme
- **Celo**: Green (#35D07F) and Yellow (#FBCC5C)
- **Ethereum**: Blue (#627EEA)
- **Neutral**: Gray scale for UI elements

## 📝 Methodology & Assumptions

### Data Accuracy
- **On-chain Data**: All balance data sourced directly from blockchain
- **Price Data**: Real-time prices from Dune's price feeds
- **Address Validation**: All addresses verified against Mento's official documentation

### Limitations
- **Historical Data**: Limited to 30 days for performance
- **Protocol Data**: Some DeFi protocol positions may require additional queries
- **Cross-chain**: Some assets may have different representations across chains

### Assumptions
- **Price Accuracy**: Dune's price feeds are accurate and up-to-date
- **Address Completeness**: All reserve addresses are included
- **Token Standards**: Standard ERC-20 token decimals used

## 🚀 Future Enhancements

### Planned Features
- **Real-time Alerts**: Notifications for significant reserve changes
- **Mobile Optimization**: Responsive design for mobile devices
- **Export Functionality**: CSV/PDF export capabilities
- **API Integration**: REST API for programmatic access

### Additional Queries
- **Yield Analysis**: Detailed yield performance by protocol
- **Risk Metrics**: VaR and other risk calculations
- **Correlation Analysis**: Asset correlation matrices
- **Regulatory Reporting**: Compliance-focused metrics

## 📞 Support & Contact

For questions or support regarding this dashboard:
- **Email**: internship@celo.org
- **Dune Profile**: [Your Dune Username]
- **GitHub**: [Repository Link]

## 📄 License

This dashboard is created for the Data & Ecosystem Insights Intern position at Celo Foundation. The queries and methodology are open source and available for community use.

---

**Note**: This dashboard uses real blockchain data and provides live insights into Mento's reserve composition. All data is sourced directly from on-chain transactions and verified price feeds. 