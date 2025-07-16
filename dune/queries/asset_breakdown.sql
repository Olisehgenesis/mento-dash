-- Mento Reserve Asset Breakdown
-- This query provides detailed breakdown of all reserve assets by type and chain

WITH reserve_addresses AS (
    SELECT '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9' as address, 'CELO' as chain, 'Main Reserve' as category
    UNION ALL SELECT '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1', 'CELO', 'Multisig'
    UNION ALL SELECT '0x13a9803d547332c81Ebc6060F739821264DBcf1E', 'CELO', 'Reserve'
    UNION ALL SELECT '0xDA7BFEF937F0944551a24b4C68B054bfA7127570', 'CELO', 'Operational'
    UNION ALL SELECT '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1', 'CELO', 'Operations'
    UNION ALL SELECT '0x9d65E69aC940dCB469fd7C46368C1e094250a400', 'CELO', 'Reserve'
    UNION ALL SELECT '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E', 'ETHEREUM', 'Main Reserve'
    UNION ALL SELECT '0x13a9803d547332c81Ebc6060F739821264DBcf1E', 'ETHEREUM', 'Reserve'
    UNION ALL SELECT '0xDA7BFEF937F0944551a24b4C68B054bfA7127570', 'ETHEREUM', 'Operational'
    UNION ALL SELECT '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1', 'ETHEREUM', 'Operations'
),

celo_assets AS (
    -- CELO Token
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'CELO' as asset,
        b.balance / 1e18 as balance,
        b.balance / 1e18 * p.price as usd_value,
        'Cryptocurrency' as asset_type
    FROM reserve_addresses ra
    JOIN celo.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'CELO' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'CELO' 
    AND b.contract_address = '0x471EcE3750Da237f93B8E339c536989b8978a438'
    
    UNION ALL
    
    -- USDC on Celo
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'USDC' as asset,
        b.balance / 1e6 as balance,
        b.balance / 1e6 * p.price as usd_value,
        'Stablecoin' as asset_type
    FROM reserve_addresses ra
    JOIN celo.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'USDC' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'CELO' 
    AND b.contract_address = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
    
    UNION ALL
    
    -- USDT on Celo
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'USDT' as asset,
        b.balance / 1e6 as balance,
        b.balance / 1e6 * p.price as usd_value,
        'Stablecoin' as asset_type
    FROM reserve_addresses ra
    JOIN celo.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'USDT' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'CELO' 
    AND b.contract_address = '0xC537B64Bc8394c1d5F7d2B361d83C895A072Cb1e7'
    
    UNION ALL
    
    -- WETH on Celo
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'WETH' as asset,
        b.balance / 1e18 as balance,
        b.balance / 1e18 * p.price as usd_value,
        'Cryptocurrency' as asset_type
    FROM reserve_addresses ra
    JOIN celo.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'ETH' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'CELO' 
    AND b.contract_address = '0x2DEf4285787d58a2f811AF24755A8150622f4361'
),

ethereum_assets AS (
    -- ETH
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'ETH' as asset,
        b.balance / 1e18 as balance,
        b.balance / 1e18 * p.price as usd_value,
        'Cryptocurrency' as asset_type
    FROM reserve_addresses ra
    JOIN ethereum.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'ETH' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'ETHEREUM' 
    AND b.contract_address IS NULL
    
    UNION ALL
    
    -- WBTC
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'WBTC' as asset,
        b.balance / 1e8 as balance,
        b.balance / 1e8 * p.price as usd_value,
        'Cryptocurrency' as asset_type
    FROM reserve_addresses ra
    JOIN ethereum.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'WBTC' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'ETHEREUM' 
    AND b.contract_address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
    
    UNION ALL
    
    -- USDC on Ethereum
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'USDC' as asset,
        b.balance / 1e6 as balance,
        b.balance / 1e6 * p.price as usd_value,
        'Stablecoin' as asset_type
    FROM reserve_addresses ra
    JOIN ethereum.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'USDC' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'ETHEREUM' 
    AND b.contract_address = '0xa0b86a33e6441b8c4c8c0b8c4c8c0b8c4c8c0b8c'
    
    UNION ALL
    
    -- USDT on Ethereum
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'USDT' as asset,
        b.balance / 1e6 as balance,
        b.balance / 1e6 * p.price as usd_value,
        'Stablecoin' as asset_type
    FROM reserve_addresses ra
    JOIN ethereum.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'USDT' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'ETHEREUM' 
    AND b.contract_address = '0xdac17f958d2ee523a2206206994597c13d831ec7'
    
    UNION ALL
    
    -- stETH
    SELECT 
        ra.chain,
        ra.category,
        ra.address,
        'stETH' as asset,
        b.balance / 1e18 as balance,
        b.balance / 1e18 * p.price as usd_value,
        'Yield Asset' as asset_type
    FROM reserve_addresses ra
    JOIN ethereum.balances b ON ra.address = b.address 
    JOIN prices.usd p ON p.symbol = 'stETH' AND p.minute = date_trunc('minute', NOW())
    WHERE ra.chain = 'ETHEREUM' 
    AND b.contract_address = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'
),

all_assets AS (
    SELECT * FROM celo_assets
    UNION ALL
    SELECT * FROM ethereum_assets
)

SELECT 
    asset,
    asset_type,
    chain,
    SUM(balance) as total_balance,
    SUM(usd_value) as total_usd_value,
    COUNT(DISTINCT address) as address_count,
    ROUND(SUM(usd_value) / SUM(SUM(usd_value)) OVER() * 100, 2) as percentage_of_total
FROM all_assets
WHERE usd_value > 0
GROUP BY asset, asset_type, chain
ORDER BY total_usd_value DESC; 