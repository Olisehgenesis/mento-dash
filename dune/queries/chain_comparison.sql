-- Mento Reserve Chain Comparison
-- This query compares reserve holdings across Celo and Ethereum chains

WITH chain_totals AS (
    -- Celo Chain Totals
    SELECT 
        'CELO' as chain,
        SUM(CASE WHEN asset = 'CELO' THEN usd_value ELSE 0 END) as celo_value,
        SUM(CASE WHEN asset = 'USDC' THEN usd_value ELSE 0 END) as usdc_value,
        SUM(CASE WHEN asset = 'USDT' THEN usd_value ELSE 0 END) as usdt_value,
        SUM(CASE WHEN asset = 'WETH' THEN usd_value ELSE 0 END) as weth_value,
        SUM(usd_value) as total_value,
        COUNT(DISTINCT asset) as asset_count
    FROM (
        SELECT 
            'CELO' as asset,
            b.balance / 1e18 * p.price as usd_value
        FROM celo.balances b
        JOIN prices.usd p ON p.symbol = 'CELO' AND p.minute = date_trunc('minute', NOW())
        WHERE b.address IN (
            '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9',
            '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1',
            '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
            '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
            '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1',
            '0x9d65E69aC940dCB469fd7C46368C1e094250a400'
        )
        AND b.contract_address = '0x471EcE3750Da237f93B8E339c536989b8978a438'
        
        UNION ALL
        
        SELECT 
            'USDC' as asset,
            b.balance / 1e6 * p.price as usd_value
        FROM celo.balances b
        JOIN prices.usd p ON p.symbol = 'USDC' AND p.minute = date_trunc('minute', NOW())
        WHERE b.address IN (
            '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9',
            '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1',
            '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
            '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
            '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1',
            '0x9d65E69aC940dCB469fd7C46368C1e094250a400'
        )
        AND b.contract_address = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
        
        UNION ALL
        
        SELECT 
            'USDT' as asset,
            b.balance / 1e6 * p.price as usd_value
        FROM celo.balances b
        JOIN prices.usd p ON p.symbol = 'USDT' AND p.minute = date_trunc('minute', NOW())
        WHERE b.address IN (
            '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9',
            '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1',
            '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
            '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
            '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1',
            '0x9d65E69aC940dCB469fd7C46368C1e094250a400'
        )
        AND b.contract_address = '0xC537B64Bc8394c1d5F7d2B361d83C895A072Cb1e7'
        
        UNION ALL
        
        SELECT 
            'WETH' as asset,
            b.balance / 1e18 * p.price as usd_value
        FROM celo.balances b
        JOIN prices.usd p ON p.symbol = 'ETH' AND p.minute = date_trunc('minute', NOW())
        WHERE b.address IN (
            '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9',
            '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1',
            '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
            '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
            '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1',
            '0x9d65E69aC940dCB469fd7C46368C1e094250a400'
        )
        AND b.contract_address = '0x2DEf4285787d58a2f811AF24755A8150622f4361'
    ) celo_assets
    
    UNION ALL
    
    -- Ethereum Chain Totals
    SELECT 
        'ETHEREUM' as chain,
        SUM(CASE WHEN asset = 'ETH' THEN usd_value ELSE 0 END) as celo_value,
        SUM(CASE WHEN asset = 'USDC' THEN usd_value ELSE 0 END) as usdc_value,
        SUM(CASE WHEN asset = 'USDT' THEN usd_value ELSE 0 END) as usdt_value,
        SUM(CASE WHEN asset = 'WBTC' THEN usd_value ELSE 0 END) as weth_value,
        SUM(usd_value) as total_value,
        COUNT(DISTINCT asset) as asset_count
    FROM (
        SELECT 
            'ETH' as asset,
            b.balance / 1e18 * p.price as usd_value
        FROM ethereum.balances b
        JOIN prices.usd p ON p.symbol = 'ETH' AND p.minute = date_trunc('minute', NOW())
        WHERE b.address IN (
            '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E',
            '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
            '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
            '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1'
        )
        AND b.contract_address IS NULL
        
        UNION ALL
        
        SELECT 
            'USDC' as asset,
            b.balance / 1e6 * p.price as usd_value
        FROM ethereum.balances b
        JOIN prices.usd p ON p.symbol = 'USDC' AND p.minute = date_trunc('minute', NOW())
        WHERE b.address IN (
            '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E',
            '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
            '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
            '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1'
        )
        AND b.contract_address = '0xa0b86a33e6441b8c4c8c0b8c4c8c0b8c4c8c0b8c'
        
        UNION ALL
        
        SELECT 
            'USDT' as asset,
            b.balance / 1e6 * p.price as usd_value
        FROM ethereum.balances b
        JOIN prices.usd p ON p.symbol = 'USDT' AND p.minute = date_trunc('minute', NOW())
        WHERE b.address IN (
            '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E',
            '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
            '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
            '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1'
        )
        AND b.contract_address = '0xdac17f958d2ee523a2206206994597c13d831ec7'
        
        UNION ALL
        
        SELECT 
            'WBTC' as asset,
            b.balance / 1e8 * p.price as usd_value
        FROM ethereum.balances b
        JOIN prices.usd p ON p.symbol = 'WBTC' AND p.minute = date_trunc('minute', NOW())
        WHERE b.address IN (
            '0xd0697f70E79476195B742d5aFAb14BE50f98CC1E',
            '0x13a9803d547332c81Ebc6060F739821264DBcf1E',
            '0xDA7BFEF937F0944551a24b4C68B054bfA7127570',
            '0xD3D2e5c5Af667DA817b2D752d86c8f40c22137E1'
        )
        AND b.contract_address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
    ) eth_assets
),

total_reserve AS (
    SELECT SUM(total_value) as grand_total
    FROM chain_totals
)

SELECT 
    ct.chain,
    ct.total_value,
    ROUND(ct.total_value / tr.grand_total * 100, 2) as percentage_of_total,
    ct.asset_count,
    ct.celo_value,
    ct.usdc_value,
    ct.usdt_value,
    ct.weth_value,
    ROUND(ct.total_value / 1000000, 2) as total_value_millions
FROM chain_totals ct
CROSS JOIN total_reserve tr
ORDER BY ct.total_value DESC; 