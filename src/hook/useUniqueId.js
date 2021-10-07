import { useRef } from 'react';

import uniqueId from '../util/uniqueId';

export default function useUniqueId() {
  const { current } = useRef(uniqueId());

  return current;
}
