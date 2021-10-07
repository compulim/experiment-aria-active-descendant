import { forwardRef, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import './ActiveDescendant.css';
import uniqueId from '../util/uniqueId';

const LIST_ITEMS = {
  'id-0': 'In the Milne books',
  'id-1': 'Pooh is naive and slow-witted',
  'id-2': 'but he is also friendly',
  'id-3': 'thoughtful and steadfast',
  'id-4': (
    <>
      An authorised sequel{' '}
      <a href="https://en.wikipedia.org/wiki/Return_to_the_Hundred_Acre_Wood">Return to the Hundred Acre Wood</a> was
      published on 5 October 2009
    </>
  )
};

const ActiveDescendant = forwardRef((_, ref) => {
  const [activeKey, setActiveKey] = useState('id-0');

  const activeDescendantId = useMemo(() => {
    return `active-descendant__id-${uniqueId()}`;

    // We explicitly update `activeDescendantId` when `activeKey` changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  const setRelativeActiveKey = useCallback(
    delta =>
      setActiveKey(activeKey => {
        const keys = Object.keys(LIST_ITEMS);
        const index = keys.indexOf(activeKey);

        const nextIndex = Math.max(0, Math.min(keys.length - 1, index + delta));

        return keys[nextIndex];
      }),
    [setActiveKey]
  );

  const handleNextActive = useCallback(() => setRelativeActiveKey(1), [setRelativeActiveKey]);

  const handlePrevActive = useCallback(() => setRelativeActiveKey(-1), [setRelativeActiveKey]);

  const handleKeyDown = useCallback(
    event => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          handlePrevActive();
          break;

        case 'ArrowDown':
          event.preventDefault();
          handleNextActive();
          break;

        default:
          break;
      }
    },
    [handleNextActive, handlePrevActive]
  );

  return (
    <div
      aria-activedescendant={activeDescendantId}
      className="active-descendant"
      onKeyDown={handleKeyDown}
      ref={ref}
      role="group"
      tabIndex="0"
    >
      <ul className="active-descendant__list">
        {Object.entries(LIST_ITEMS).map(([key, value]) => (
          <li
            className={classNames('active-descendant__item', {
              'active-descendant__item--active': key === activeKey
            })}
            id={key === activeKey ? activeDescendantId : undefined}
            key={key}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ActiveDescendant;
