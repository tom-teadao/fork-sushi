// This file is auto-generated by scripts/update-data-api-types.ts
import type { ChainId } from 'sushi/chain'

export const TokenListChainIds = [42161,42170,43114,8453,288,56288,56,42220,1,250,122,100,11235,1666600000,1284,1285,137,534352,2222,1088,199,314,7000,1116,108,10,59144,1101,81457,2046399126,30,146,43111,11155111,25,5000,324,169,34443,167000,810180,33139] as const
export type TokenListChainId = typeof TokenListChainIds[number]
export function isTokenListChainId(value: ChainId): value is TokenListChainId {return TokenListChainIds.includes(value as TokenListChainId)}