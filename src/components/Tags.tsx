import clsx from 'clsx';
import { Beach, City, Couples, Hiking, Sights } from './svg/tags';
import { Tag } from '@/lib/gemini/types';

type Props = {
  tags: Tag[];
  size: 'sm' | 'lg';
};

const icon: { [tag in Tag]: () => JSX.Element } = {
  Beach: Beach,
  City: City,
  Couples: Couples,
  Hiking: Hiking,
  Sights: Sights,
};

export default function Tags({ tags, size }: Props) {
  return (
    <div
      className={clsx('flex flex-wrap', size === 'sm' ? 'gap-1' : 'gap-1.5')}
    >
      {tags.map((tag) => {
        // TODO: more icons?
        const TagIcon = icon[tag];
        if (!TagIcon) return null;

        return (
          <div
            className={clsx(
              'text-background font-medium flex items-center bg-white/30 backdrop-blur-xl rounded-full',
              size === 'sm'
                ? 'text-[10px] py-1 px-1.5 gap-1'
                : 'text-base py-1 pl-3 pr-2.5 [&>svg]:scale-[1.5] gap-2',
            )}
            key={tag}
          >
            <TagIcon /> {tag}
          </div>
        );
      })}
    </div>
  );
}
