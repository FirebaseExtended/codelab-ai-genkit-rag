import clsx from 'clsx';
import { Minus, Plus } from './svg';

type Props = {
  hide: boolean;
  guests: number;
  setGuests: (guests: number) => void;
};

export default function GuestStepper({ hide, guests, setGuests }: Props) {
  const increase = () => {
    setGuests(guests + 1);
  };
  const decrease = () => {
    setGuests(guests > 0 ? guests - 1 : 0);
  };

  return (
    <div
      className={clsx(
        'p-5 flex justify-between items-center border border-gray-100 rounded-xl text-lg transition-transform duration-300 ease-in-out',
        hide ? '-translate-x-[120%]' : 'translate-x-0',
      )}
    >
      Who
      <div className="flex items-center gap-2 text-gray-400">
        {/* Subtract guest count */}
        <button
          type="button"
          className={clsx('p-2 transition-colors duration-200 ease-in-out', {
            'text-gray-200': guests === 0,
          })}
          onClick={decrease}
          disabled={guests === 0}
        >
          <Minus />
        </button>

        {/* Guest count */}
        <span
          className={clsx(
            'tabular-nums transition-colors duration-300 ease-in-out',
            { 'text-foreground': guests !== 0 },
          )}
        >
          {guests}
        </span>

        {/* Add guest count */}
        <button type="button" className="p-2" onClick={increase}>
          <Plus />
        </button>
      </div>
    </div>
  );
}
