import type { PortfolioSmartPosition } from '@sushiswap/graph-client/data-api'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Currency,
} from '@sushiswap/ui'
import React, { type FC } from 'react'
import { ChainKey, type EvmChainId } from 'sushi/chain'
import { formatUSD } from 'sushi/format'
import { PortfolioInfoRow } from '../PortfolioInfoRow'

interface PortfolioALMPositionsProps {
  positions: PortfolioSmartPosition[]
  href?: string
}

export const PortfolioALMPositions: FC<PortfolioALMPositionsProps> = ({
  positions,
}) => (
  <AccordionItem value="alm" className="!border-0">
    <AccordionTrigger className="px-5 underline-offset-2">
      {`Smart Positions (${positions.length})`}
    </AccordionTrigger>
    <AccordionContent className="cursor-default">
      {positions.map((position) => (
        <PortfolioInfoRow
          key={`${position.chainId}:${position.id}`}
          chainId={position.chainId as EvmChainId}
          href={`/${ChainKey[position.chainId as EvmChainId]}/pool/v3/${
            position.address
          }/smart/${position.vaultAddress}`}
          icon={
            <Currency.IconList iconWidth={24} iconHeight={24}>
              <img
                className="rounded-full"
                src={position.token0.logoUrl}
                alt={position.token0.symbol}
              />
              <img
                className="rounded-full"
                src={position.token1.logoUrl}
                alt={position.token1.symbol}
              />
            </Currency.IconList>
          }
          leftContent={
            <React.Fragment>
              <div className="text-sm font-medium overflow-hidden overflow-ellipsis">
                {position.name}
              </div>
              <div className=" text-xs text-muted-foreground overflow-hidden overflow-ellipsis">{`V3-${
                position.swapFee * 100
              }%-${position.strategy}`}</div>
            </React.Fragment>
          }
          rightContent={
            <span className="text-sm font-medium overflow-hidden overflow-ellipsis">
              {formatUSD(position.amountUSD)}
            </span>
          }
        />
      ))}
    </AccordionContent>
  </AccordionItem>
)
