-- Mento Reserve Protocol Exposure
-- This query tracks assets held in DeFi protocols for yield generation

WITH aave_positions AS (
    -- Aave V3 positions on Celo
    SELECT 
        'Aave V3' as protocol,
        'CELO' as chain,
        '0x87647780180B8f55980C7D3fFeFe08a9B29e9aE1' as address,
        'CELO' as asset,
        b.balance / 1e18 as balance,
        b.balance / 1e18 * p.price as usd_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'CELO' AND p.minute = date_trunc('minute', NOW())
    WHERE b.address = '0x87647780180B8f55980C7D3fFeFe08a9B29e9aE1'
    AND b.contract_address = '0x471EcE3750Da237f93B8E339c536989b8978a438'
    
    UNION ALL
    
    SELECT 
        'Aave V3' as protocol,
        'CELO' as chain,
        '0x87647780180B8f55980C7D3fFeFe08a9B29e9aE1' as address,
        'USDT' as asset,
        b.balance / 1e6 as balance,
        b.balance / 1e6 * p.price as usd_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'USDT' AND p.minute = date_trunc('minute', NOW())
    WHERE b.address = '0x87647780180B8f55980C7D3fFeFe08a9B29e9aE1'
    AND b.contract_address = '0xC537B64Bc8394c1d5F7d2B361d83C895A072Cb1e7'
    
    UNION ALL
    
    SELECT 
        'Aave V3' as protocol,
        'CELO' as chain,
        '0xDA7BFEF937F0944551a24b4C68B054bfA7127570' as address,
        'CELO' as asset,
        b.balance / 1e18 as balance,
        b.balance / 1e18 * p.price as usd_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'CELO' AND p.minute = date_trunc('minute', NOW())
    WHERE b.address = '0xDA7BFEF937F0944551a24b4C68B054bfA7127570'
    AND b.contract_address = '0x471EcE3750Da237f93B8E339c536989b8978a438'
    
    UNION ALL
    
    SELECT 
        'Aave V3' as protocol,
        'CELO' as chain,
        '0xDA7BFEF937F0944551a24b4C68B054bfA7127570' as address,
        'USDT' as asset,
        b.balance / 1e6 as balance,
        b.balance / 1e6 * p.price as usd_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'USDT' AND p.minute = date_trunc('minute', NOW())
    WHERE b.address = '0xDA7BFEF937F0944551a24b4C68B054bfA7127570'
    AND b.contract_address = '0xC537B64Bc8394c1d5F7d2B361d83C895A072Cb1e7'
),

uniswap_positions AS (
    -- Uniswap V3 positions on Celo
    SELECT 
        'Uniswap V3' as protocol,
        'CELO' as chain,
        '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1' as address,
        'CELO' as asset,
        b.balance / 1e18 as balance,
        b.balance / 1e18 * p.price as usd_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'CELO' AND p.minute = date_trunc('minute', NOW())
    WHERE b.address = '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1'
    AND b.contract_address = '0x471EcE3750Da237f93B8E339c536989b8978a438'
    
    UNION ALL
    
    SELECT 
        'Uniswap V3' as protocol,
        'CELO' as chain,
        '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1' as address,
        'WETH' as asset,
        b.balance / 1e18 as balance,
        b.balance / 1e18 * p.price as usd_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'ETH' AND p.minute = date_trunc('minute', NOW())
    WHERE b.address = '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1'
    AND b.contract_address = '0x2DEf4285787d58a2f811AF24755A8150622f4361'
    
    UNION ALL
    
    SELECT 
        'Uniswap V3' as protocol,
        'CELO' as chain,
        '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1' as address,
        'USDT' as asset,
        b.balance / 1e6 as balance,
        b.balance / 1e6 * p.price as usd_value
    FROM celo.balances b
    JOIN prices.usd p ON p.symbol = 'USDT' AND p.minute = date_trunc('minute', NOW())
    WHERE b.address = '0x87647780180b8f55980c7d3ffefe08a9b29e9ae1'
    AND b.contract_address = '0xC537B64Bc8394c1d5F7d2B361d83C895A072Cb1e7'
),

all_protocols AS (
    SELECT * FROM aave_positions
    UNION ALL
    SELECT * FROM uniswap_positions
),

protocol_summary AS (
    SELECT 
        protocol,
        chain,
        SUM(usd_value) as total_protocol_value,
        COUNT(DISTINCT asset) as asset_count,
        STRING_AGG(DISTINCT asset, ', ') as assets
    FROM all_protocols
    WHERE usd_value > 0
    GROUP BY protocol, chain
),

total_protocol_value AS (
    SELECT SUM(total_protocol_value) as grand_total
    FROM protocol_summary
)

SELECT 
    ps.protocol,
    ps.chain,
    ps.total_protocol_value,
    ROUND(ps.total_protocol_value / tpv.grand_total * 100, 2) as percentage_of_protocols,
    ps.asset_count,
    ps.assets,
    ROUND(ps.total_protocol_value / 1000000, 2) as value_millions
FROM protocol_summary ps
CROSS JOIN total_protocol_value tpv
ORDER BY ps.total_protocol_value DESC; 