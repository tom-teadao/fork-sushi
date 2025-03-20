import {
  type SmartPoolChainId,
  SmartPoolChainIds,
  getSmartPools,
  isSmartPoolChainId,
} from '@sushiswap/graph-client/data-api'
import { Container } from '@sushiswap/ui'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import React, { type FC, Suspense } from 'react'
import { SmartPoolsTable } from 'src/ui/pool/SmartPoolsTable'
import { TableFiltersFarmsOnly } from 'src/ui/pool/TableFiltersFarmsOnly'
import { TableFiltersNetwork } from 'src/ui/pool/TableFiltersNetwork'
import { TableFiltersPoolType } from 'src/ui/pool/TableFiltersPoolType'
import { TableFiltersResetButton } from 'src/ui/pool/TableFiltersResetButton'
import { TableFiltersSearchToken } from 'src/ui/pool/TableFiltersSearchToken'
import type { ChainId } from 'sushi/chain'

const _SmartPoolsTable: FC<{ chainId: SmartPoolChainId }> = async ({
  chainId,
}) => {
  const smartPools = await unstable_cache(
    async () =>
      getSmartPools({ chainId }).then((smartPools) =>
        smartPools.filter((smartPool) => smartPool.isEnabled),
      ),
    ['smart-pools', `${chainId}`],
    {
      revalidate: 60 * 15,
    },
  )()

  return <SmartPoolsTable smartPools={smartPools} />
}

export default async function SmartPoolsPage(props: {
  params: Promise<{ chainId: string }>
}) {
  const params = await props.params
  const chainId = +params.chainId as ChainId

  if (!isSmartPoolChainId(chainId)) {
    return notFound()
  }

  return (
    <Container maxWidth="7xl" className="px-4">
      <div className="flex flex-wrap gap-3 mb-4">
        <TableFiltersSearchToken />
        <TableFiltersPoolType />
        <TableFiltersNetwork
          network={chainId}
          supportedNetworks={SmartPoolChainIds}
          unsupportedNetworkHref={'/arbitrum/explore/smart-pools'}
          className="lg:hidden block"
        />
        <TableFiltersFarmsOnly />
        <TableFiltersResetButton />
      </div>
      <Suspense fallback={<SmartPoolsTable isLoading={true} />}>
        <_SmartPoolsTable chainId={chainId} />
      </Suspense>
    </Container>
  )
}
