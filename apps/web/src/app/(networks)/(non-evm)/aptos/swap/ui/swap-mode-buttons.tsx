import { Button } from '@sushiswap/ui'
import type { FC } from 'react'

export const SwapModeButtons: FC = () => {
  return (
    <div className="flex">
      <Button size="sm" variant="secondary">
        Swap
      </Button>
    </div>
  )
}
