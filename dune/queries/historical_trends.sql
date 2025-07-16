-- Mento Reserve Historical Trends
-- This query shows how reserve values have changed over time

WITH daily_reserves AS (
    -- Daily Celo reserves
    SELECT 
        DATE_TRUNC('day', p.minute) as date,
        'CELO' as chain,
        'CELO' as asset,
        SUM(b.balance / 1e18 * p.price) as daily_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'CELO' AND p.minute >= NOW() - INTERVAL '30 days'
    WHERE b.address IN (
        '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9',
        '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1',
        '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
        '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
        '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1',
        '0x9d65E69aC940dCB469fd7C46368C1e094250a400'
    )
    AND b.contract_address = '0x471EcE3750Da237f93B8E339c536989b8978a438'
    GROUP BY DATE_TRUNC('day', p.minute)
    
    UNION ALL
    
    SELECT 
        DATE_TRUNC('day', p.minute) as date,
        'CELO' as chain,
        'USDC' as asset,
        SUM(b.balance / 1e6 * p.price) as daily_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'USDC' AND p.minute >= NOW() - INTERVAL '30 days'
    WHERE b.address IN (
        '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9',
        '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1',
        '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
        '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
        '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1',
        '0x9d65E69aC940dCB469fd7C46368C1e094250a400'
    )
    AND b.contract_address = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
    GROUP BY DATE_TRUNC('day', p.minute)
    
    UNION ALL
    
    SELECT 
        DATE_TRUNC('day', p.minute) as date,
        'CELO' as chain,
        'USDT' as asset,
        SUM(b.balance / 1e6 * p.price) as daily_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'USDT' AND p.minute >= NOW() - INTERVAL '30 days'
    WHERE b.address IN (
        '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9',
        '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1',
        '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
        '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
        '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1',
        '0x9d65E69aC940dCB469fd7C46368C1e094250a400'
    )
    AND b.contract_address = '0xC537B64Bc8394c1d5F7d2B361d83C895A072Cb1e7'
    GROUP BY DATE_TRUNC('day', p.minute)
    
    UNION ALL
    
    -- Daily Ethereum reserves
    SELECT 
        DATE_TRUNC('day', p.minute) as date,
        'ETHEREUM' as chain,
        'ETH' as asset,
        SUM(b.balance / 1e18 * p.price) as daily_value
    FROM ethereum.balances b
    JOIN prices.usd p ON p.symbol = 'ETH' AND p.minute >= NOW() - INTERVAL '30 days'
    WHERE b.address IN (
        '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E',
        '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
        '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
        '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1'
    )
    AND b.contract_address IS NULL
    GROUP BY DATE_TRUNC('day', p.minute)
    
    UNION ALL
    
    SELECT 
        DATE_TRUNC('day', p.minute) as date,
        'ETHEREUM' as chain,
        'WBTC' as asset,
        SUM(b.balance / 1e8 * p.price) as daily_value
    FROM ethereum.balances b
    JOIN prices.usd p ON p.symbol = 'WBTC' AND p.minute >= NOW() - INTERVAL '30 days'
    WHERE b.address IN (
        '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E',
        '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
        '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
        '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1'
    )
    AND b.contract_address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
    GROUP BY DATE_TRUNC('day', p.minute)
    
    UNION ALL
    
    SELECT 
        DATE_TRUNC('day', p.minute) as date,
        'ETHEREUM' as chain,
        'USDC' as asset,
        SUM(b.balance / 1e6 * p.price) as daily_value
    FROM ethereum.balances b
    JOIN prices.usd p ON p.symbol = 'USDC' AND p.minute >= NOW() - INTERVAL '30 days'
    WHERE b.address IN (
        '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E',
        '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
        '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
        '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1'
    )
    AND b.contract_address = '0xa0b86a33e6441b8c4c8c0b8c4c8c0b8c4c8c0b8c'
    GROUP BY DATE_TRUNC('day', p.minute)
),

daily_totals AS (
    SELECT 
        date,
        chain,
        SUM(daily_value) as chain_total,
        COUNT(DISTINCT asset) as asset_count
    FROM daily_reserves
    WHERE daily_value > 0
    GROUP BY date, chain
),

chain_trends AS (
    SELECT 
        date,
        chain,
        chain_total,
        asset_count,
        LAG(chain_total, 1) OVER (PARTITION BY chain ORDER BY date) as prev_total,
        (chain_total - LAG(chain_total, 1) OVER (PARTITION BY chain ORDER BY date)) / 
        LAG(chain_total, 1) OVER (PARTITION BY chain ORDER BY date) * 100 as daily_change_pct
    FROM daily_totals
)

SELECT 
    date,
    chain,
    ROUND(chain_total, 2) as total_value,
    ROUND(prev_total, 2) as previous_value,
    ROUND(daily_change_pct, 2) as daily_change_percentage,
    asset_count,
    ROUND(chain_total / 1000000, 2) as value_millions
FROM chain_trends
WHERE prev_total IS NOT NULL
ORDER BY date DESC, chain; 