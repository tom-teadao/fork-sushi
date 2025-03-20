import {
  SmartPoolChainIds,
  isSmartPoolChainId,
} from '@sushiswap/graph-client/data-api'
import { Container } from '@sushiswap/ui'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type React from 'react'
import { GlobalStatsCharts } from 'src/ui/explore/global-stats-charts'
import { PoolsFiltersProvider } from 'src/ui/pool'
import type { ChainId } from 'sushi/chain'
import { SidebarContainer } from '~evm/_common/ui/sidebar'
import { NavigationItems } from '../navigation-items'

export const metadata: Metadata = {
  title: 'Smart Pools',
  description:
    'Smart pools optimize liquidity allocation within custom price ranges, enhancing trading efficiency by providing deeper liquidity around the current price, increasing Liquidity Providers fee earnings.',
}

export default async function ExploreLayout(props: {
  children: React.ReactNode
  params: Promise<{ chainId: string }>
}) {
  const params = await props.params

  const { children } = props

  const chainId = +params.chainId as ChainId

  if (!isSmartPoolChainId(chainId)) {
    return notFound()
  }

  return (
    <SidebarContainer
      selectedNetwork={chainId}
      supportedNetworks={SmartPoolChainIds}
      unsupportedNetworkHref={'/arbitrum/explore/smart-pools'}
      shiftContent
    >
      <main className="flex flex-col h-full flex-1">
        <Container maxWidth="7xl" className="px-4 py-4">
          <GlobalStatsCharts chainId={chainId} />
        </Container>
        <Container maxWidth="7xl" className="px-4 flex gap-2 pb-4">
          <NavigationItems chainId={chainId} />
        </Container>
        <section className="flex flex-col flex-1">
          <div className="bg-gray-50 dark:bg-white/[0.02] border-t border-accent pt-4 pb-10 min-h-screen">
            <PoolsFiltersProvider>{children}</PoolsFiltersProvider>
          </div>
        </section>
      </main>
    </SidebarContainer>
  )
}
