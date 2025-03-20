import { LinkExternal, classNames } from '@sushiswap/ui'
import { DiscordIcon } from '@sushiswap/ui/icons/DiscordIcon'
import { GithubIcon } from '@sushiswap/ui/icons/GithubIcon'
import { TwitterIcon } from '@sushiswap/ui/icons/TwitterIcon'
import { YoutubeIcon } from '@sushiswap/ui/icons/YoutubeIcon'
import { DEFAULT_SIDE_PADDING } from '../../constants'

const heroIconProps = {
  width: 24,
  className: 'text-slate-300 hover:text-slate-50',
}

export function Hero() {
  return (
    <section
      className={classNames(
        'flex flex-col items-center max-w-[870px] mx-auto',
        DEFAULT_SIDE_PADDING,
      )}
    >
      <div className="relative w-[320px] sm:w-[520px] h-[95px] sm:h-[135px] text-slate-50">
        <h1 className="text-5xl sm:text-7xl absolute top-0 left-0">Sushi</h1>
        <h1 className="text-5xl font-bold sm:text-7xl absolute bottom-0 right-0">
          Academy
        </h1>
      </div>
      <span className="mt-3 text-sm text-center text-slate-300 sm:text-base md:text-xl">
        Demystifying DeFi - everything you need to know in one place. For
        beginners to advanced users, and everyone in between.
      </span>
      <div className="absolute hidden right-12 lg:grid top-[184px] gap-8">
        <LinkExternal href="https://github.com/sushiswap">
          <GithubIcon {...heroIconProps} />
        </LinkExternal>
        <LinkExternal href="https://twitter.com/sushiswap">
          <TwitterIcon {...heroIconProps} />
        </LinkExternal>
        <LinkExternal href="https://sushi.com/discord">
          <DiscordIcon {...heroIconProps} />
        </LinkExternal>
        <LinkExternal href="https://www.youtube.com/c/SushiOfficial">
          <YoutubeIcon {...heroIconProps} />
        </LinkExternal>
      </div>
    </section>
  )
}
