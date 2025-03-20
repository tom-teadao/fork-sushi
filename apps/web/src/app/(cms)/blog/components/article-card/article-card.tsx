import { ChevronRightIcon } from '@heroicons/react/24/solid'
import type { BlogArticle } from '@sushiswap/graph-client/strapi'
import { Chip, classNames } from '@sushiswap/ui'
import format from 'date-fns/format'
import Link from 'next/link'
import { Media } from '../../../components/media'
import { isMediaVideo } from '../../../lib/media'

interface ArticleCard {
  article: BlogArticle
}

export function ArticleCard({ article }: ArticleCard) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <div className="transition relative [animation-duration:400ms] min-h-[400px] h-full w-full rounded-xl shadow-md bg-slate-800 overflow-hidden hover:ring-2 ring-slate-700 ring-offset-2 ring-offset-slate-900 border border-accent z-10">
        <div className="relative">
          {article.cover ? (
            <Media
              className={classNames(
                isMediaVideo(article.cover.provider_metadata)
                  ? ''
                  : 'group-hover:scale-[1.06] scale-[1.01] transition [animation-duration:400ms]',
              )}
              image={article.cover}
              layout="responsive"
              quality={100}
              objectFit="contain"
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-3 px-4 w-full pb-10">
          <div className="flex gap-1 pt-3">
            {article.categories.map((category) => (
              <Chip key={category.id} variant="ghost">
                {category.name}
              </Chip>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-slate-200 line-clamp-1">
              {article.title}
            </p>

            <p className="text-sm text-slate-400 line-clamp-4">
              {article.description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex w-full items-center justify-between">
            <p className="text-xs font-medium text-slate-400 line-clamp-2">
              {article.publishedAt
                ? format(new Date(article.publishedAt), 'dd MMM, yyyy')
                : null}
            </p>
            <div className="flex items-center text-sm font-medium text-blue hover:underline">
              Read more <ChevronRightIcon height={16} width={16} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
