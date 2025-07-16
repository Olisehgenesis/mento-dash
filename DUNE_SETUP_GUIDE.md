# Dune Analytics Integration Setup Guide

## Overview
This guide will help you complete the integration of Dune Analytics with the Mento Reserve Dashboard. The dashboard is designed to show real-time reserve holdings across Celo and Ethereum blockchains.

## Prerequisites
1. Dune Analytics account with API access
2. Dune API key
3. Basic knowledge of SQL and blockchain data

## Step 1: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_DUNE_API_KEY=your_dune_api_key_here
```

## Step 2: Deploy SQL Queries to Dune

### 2.1 Access Dune Analytics
1. Go to [dune.com](https://dune.com)
2. Sign in to your account
3. Navigate to "My Queries"

### 2.2 Create and Deploy Queries

For each query file in `dune/queries/`, follow these steps:

1. **Create New Query**
   - Click "New Query"
   - Give it a descriptive name (e.g., "Mento Reserve Overview")

2. **Copy SQL Code**
   - Open the corresponding `.sql` file from `dune/queries/`
   - Copy the entire SQL code
   - Paste it into the Dune query editor

3. **Test the Query**
   - Click "Run" to test the query
   - Verify it returns data without errors
   - Check that the output format matches expectations

4. **Save and Get Query ID**
   - Click "Save" to save the query
   - Note the query ID from the URL (e.g., `https://dune.com/queries/1234567`)

### 2.3 Required Queries

Deploy these queries in order:

1. **Test Query** (`test_query.sql`)
   - Purpose: Verify basic table access
   - Expected output: Transaction counts and date ranges

2. **Reserve Overview** (`reserve_overview.sql`)
   - Purpose: Get total reserve values and asset counts
   - Expected output: Total USD values per chain

3. **Asset Breakdown** (`asset_breakdown.sql`)
   - Purpose: Detailed asset balances and values
   - Expected output: Individual asset data with USD values

4. **Chain Comparison** (`chain_comparison.sql`)
   - Purpose: Side-by-side chain comparison
   - Expected output: Comparative data between Celo and Ethereum

5. **Protocol Exposure** (`protocol_exposure.sql`)
   - Purpose: DeFi protocol breakdown
   - Expected output: Protocol allocation data

6. **Historical Trends** (`historical_trends.sql`)
   - Purpose: Time-series data for trends
   - Expected output: Historical value changes

## Step 3: Update Query IDs

After deploying all queries, update the query IDs in `services/duneApi.ts`:

```typescript
const QUERY_IDS = {
  reserve_overview: 'YOUR_ACTUAL_QUERY_ID_1',
  asset_breakdown: 'YOUR_ACTUAL_QUERY_ID_2',
  chain_comparison: 'YOUR_ACTUAL_QUERY_ID_3',
  protocol_exposure: 'YOUR_ACTUAL_QUERY_ID_4',
  historical_trends: 'YOUR_ACTUAL_QUERY_ID_5'
};
```

## Step 4: Test the Integration

### 4.1 Start the Development Server
```bash
npm run dev
# or
pnpm dev
```

### 4.2 Verify Data Loading
1. Open the dashboard in your browser
2. Check that data loads without errors
3. Verify that all components display real data
4. Test the refresh functionality

### 4.3 Debug Common Issues

**Issue: "Failed to fetch data from Dune Analytics"**
- Check API key configuration
- Verify query IDs are correct
- Ensure queries are deployed and accessible

**Issue: "Query execution timeout"**
- Check query performance
- Verify table access permissions
- Consider optimizing complex queries

**Issue: "No data returned"**
- Check reserve addresses are correct
- Verify time filters in queries
- Test with broader date ranges

## Step 5: Production Deployment

### 5.1 Environment Setup
1. Set production environment variables
2. Configure API key in production environment
3. Update query IDs for production

### 5.2 Build and Deploy
```bash
npm run build
npm start
```

### 5.3 Monitoring
- Set up error monitoring for API failures
- Monitor query execution times
- Track data freshness and accuracy

## Step 6: Maintenance

### 6.1 Regular Updates
- Monitor Dune table schema changes
- Update queries as needed
- Refresh API keys periodically

### 6.2 Performance Optimization
- Optimize slow queries
- Add caching where appropriate
- Monitor API rate limits

## Troubleshooting

### Common SQL Errors

**Error: "Table not found"**
- Verify table names are correct
- Check database access permissions
- Use correct schema prefixes

**Error: "Invalid address format"**
- Remove quotes from addresses
- Use bytearray literals: `0x1234...` not `'0x1234...'`

**Error: "Data type mismatch"**
- Use proper CAST operations
- Handle NULL values appropriately
- Check decimal precision

### API Issues

**Error: "Invalid API key"**
- Verify API key is correct
- Check key permissions
- Ensure key is not expired

**Error: "Rate limit exceeded"**
- Implement request throttling
- Add retry logic with backoff
- Monitor API usage

## Support Resources

- [Dune Analytics Documentation](https://docs.dune.com/)
- [Dune API Reference](https://docs.dune.com/api/)
- [SQL Query Examples](https://dune.com/browse/queries)

## Next Steps

After completing this setup:

1. **Customize Dashboard**: Modify components to match your specific needs
2. **Add Features**: Implement additional visualizations or data points
3. **Optimize Performance**: Add caching and optimize queries
4. **Scale**: Consider adding more chains or assets

## File Structure

```
mento-dashboard/
├── dune/
│   ├── queries/           # SQL query files
│   ├── README.md          # Dune documentation
│   └── dashboard_config.json
├── services/
│   ├── duneApi.ts         # Dune API integration
│   └── reserveData.ts     # Data service layer
├── components/            # React components
├── types/                 # TypeScript definitions
├── config/                # Configuration files
└── dune_ai_prompt.txt     # AI prompt for query generation
```

This setup guide should help you complete the Dune Analytics integration successfully. If you encounter any issues, refer to the troubleshooting section or consult the Dune documentation. 