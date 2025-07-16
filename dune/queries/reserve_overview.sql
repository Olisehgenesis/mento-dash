-- Mento Reserve Overview Dashboard
-- This query provides a high-level overview of Mento's reserve holdings across Celo and Ethereum

WITH celo_reserves AS (
    -- Celo Main Reserve Contract
    SELECT 
        'CELO' as chain,
        'Main Reserve' as category,
        '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9' as address,
        'CELO' as asset,
        balance / 1e18 as balance,
        balance / 1e18 * price as usd_value
    FROM (
        SELECT 
            balance,
            (SELECT price FROM prices.usd WHERE symbol = 'CELO' AND minute = date_trunc('minute', NOW()) LIMIT 1) as price
        FROM celo.balances 
        WHERE address = '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9'
        AND contract_address = '0x471EcE3750Da237f93B8E339c536989b8978a438' -- CELO token
    )
    
    UNION ALL
    
    -- Celo USDC
    SELECT 
        'CELO' as chain,
        'Main Reserve' as category,
        '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9' as address,
        'USDC' as asset,
        balance / 1e6 as balance,
        balance / 1e6 * price as usd_value
    FROM (
        SELECT 
            balance,
            (SELECT price FROM prices.usd WHERE symbol = 'USDC' AND minute = date_trunc('minute', NOW()) LIMIT 1) as price
        FROM celo.balances 
        WHERE address = '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9'
        AND contract_address = '0x765DE816845861e75A25fCA122bb6898B8B1282a' -- USDC token
    )
    
    UNION ALL
    
    -- Celo USDT
    SELECT 
        'CELO' as chain,
        'Main Reserve' as category,
        '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9' as address,
        'USDT' as asset,
        balance / 1e6 as balance,
        balance / 1e6 * price as usd_value
    FROM (
        SELECT 
            balance,
            (SELECT price FROM prices.usd WHERE symbol = 'USDT' AND minute = date_trunc('minute', NOW()) LIMIT 1) as price
        FROM celo.balances 
        WHERE address = '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9'
        AND contract_address = '0xC537B64Bc8394c1d5F7d2B361d83C895A072Cb1e7' -- USDT token
    )
),

ethereum_reserves AS (
    -- Ethereum Main Reserve
    SELECT 
        'ETHEREUM' as chain,
        'Main Reserve' as category,
        '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E' as address,
        'ETH' as asset,
        balance / 1e18 as balance,
        balance / 1e18 * price as usd_value
    FROM (
        SELECT 
            balance,
            (SELECT price FROM prices.usd WHERE symbol = 'ETH' AND minute = date_trunc('minute', NOW()) LIMIT 1) as price
        FROM ethereum.balances 
        WHERE address = '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E'
    )
    
    UNION ALL
    
    -- Ethereum WBTC
    SELECT 
        'ETHEREUM' as chain,
        'Main Reserve' as category,
        '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E' as address,
        'WBTC' as asset,
        balance / 1e8 as balance,
        balance / 1e8 * price as usd_value
    FROM (
        SELECT 
            balance,
            (SELECT price FROM prices.usd WHERE symbol = 'WBTC' AND minute = date_trunc('minute', NOW()) LIMIT 1) as price
        FROM ethereum.balances 
        WHERE address = '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E'
        AND contract_address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' -- WBTC token
    )
    
    UNION ALL
    
    -- Ethereum USDC
    SELECT 
        'ETHEREUM' as chain,
        'Main Reserve' as category,
        '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E' as address,
        'USDC' as asset,
        balance / 1e6 as balance,
        balance / 1e6 * price as usd_value
    FROM (
        SELECT 
            balance,
            (SELECT price FROM prices.usd WHERE symbol = 'USDC' AND minute = date_trunc('minute', NOW()) LIMIT 1) as price
        FROM ethereum.balances 
        WHERE address = '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E'
        AND contract_address = '0xa0b86a33e6441b8c4c8c0b8c4c8c0b8c4c8c0b8c' -- USDC token
    )
),

all_reserves AS (
    SELECT * FROM celo_reserves
    UNION ALL
    SELECT * FROM ethereum_reserves
)

SELECT 
    chain,
    category,
    asset,
    SUM(balance) as total_balance,
    SUM(usd_value) as total_usd_value,
    COUNT(*) as address_count
FROM all_reserves
WHERE usd_value > 0
GROUP BY chain, category, asset
ORDER BY total_usd_value DESC; 