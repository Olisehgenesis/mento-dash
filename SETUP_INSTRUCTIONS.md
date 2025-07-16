# Setup Instructions for Dune Analytics Integration

## 🔑 Dune API Configuration

### 1. Get Dune API Key
1. Visit [Dune Analytics](https://dune.com)
2. Sign up or log in to your account
3. Go to [Settings > API](https://dune.com/settings/api)
4. Generate a new API key
5. Copy the API key

### 2. Configure Environment Variables
Create a `.env.local` file in your project root:

```env
# Dune Analytics API Configuration
NEXT_PUBLIC_DUNE_API_KEY=your_dune_api_key_here
```

### 3. Deploy Dune Queries
1. Go to [Dune Analytics](https://dune.com)
2. Create new queries for each SQL file in `dune/queries/`:
   - `reserve_overview.sql`
   - `asset_breakdown.sql`
   - `chain_comparison.sql`
   - `protocol_exposure.sql`
   - `historical_trends.sql`

3. After creating each query, copy the query ID from the URL
4. Update the query IDs in `services/duneApi.ts`:

```typescript
const QUERY_IDS = {
  reserve_overview: 'YOUR_ACTUAL_QUERY_ID_1',
  asset_breakdown: 'YOUR_ACTUAL_QUERY_ID_2',
  chain_comparison: 'YOUR_ACTUAL_QUERY_ID_3',
  protocol_exposure: 'YOUR_ACTUAL_QUERY_ID_4',
  historical_trends: 'YOUR_ACTUAL_QUERY_ID_5'
};
```

## 🚀 Running the Dashboard

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Dashboard
Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Data Flow

1. **React Dashboard** → **DuneApiService** → **Dune Analytics API**
2. **Dune Analytics** → **Blockchain Data** (Celo + Ethereum)
3. **Real-time Results** → **Dashboard Visualizations**

## 🔧 Troubleshooting

### Common Issues

1. **"Failed to fetch data from Dune Analytics"**
   - Check your API key is correct
   - Verify query IDs are updated
   - Ensure queries are published and accessible

2. **"Query execution timeout"**
   - Dune queries can take time to execute
   - Check query complexity and optimization
   - Consider reducing historical data range

3. **"No data available"**
   - Verify reserve addresses are correct
   - Check if assets have balances
   - Ensure price data is available

### Debug Mode
Add this to your `.env.local` for detailed logging:

```env
NEXT_PUBLIC_DEBUG=true
```

## 📈 Performance Optimization

### Query Optimization
- Limit historical data to 30 days
- Use efficient joins and aggregations
- Index frequently queried columns

### Caching Strategy
- Dune results are cached for 5 minutes
- Consider implementing client-side caching
- Use React Query for data management

## 🔒 Security Notes

- Never commit your API key to version control
- Use environment variables for sensitive data
- Consider rate limiting for production use
- Monitor API usage and costs

## 📞 Support

For issues with:
- **Dune Analytics**: [Dune Documentation](https://docs.dune.com)
- **API Integration**: Check the error messages in browser console
- **Dashboard Issues**: Review the setup instructions above 