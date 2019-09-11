# use-deps

A composable React hook for expressing deep dependencies.

## Example

```ts
import { isEqual } from 'lodash';
import useDeps from 'use-deps';

export default ({ userIds }) => {

  // ...... snip ......

  useEffect(() => {
    (async () => {
      setUsers(await fetchUsers(userIds);

    })();
  }, useDeps([userIds], isEqual));

  // ...... snip ......

});
```

In this example, the effect is re-run only when the `userIds` array is
deeply different (e.g. if `!isEqual(oldUsersIds, nextUserIds)`).

Using this pattern ensures that the parent component doesn't have to
worry about memoizing the inputs, which can be a difficult contract
to express and often leads to effects running more than expected.

## API

```ts
type EqualityFn = (value1: any, value2: any) => boolean;

export default function useDeps<T extends unknown[]>(
  deps: T,
  equalityFn: EqualityFn = Object.is
): T;

```

The first argument to useDeps is an array of dependencies.
The second argument to useDeps is optional and defaults to `Object.is`.

## Prior art

Check out https://github.com/kentcdodds/use-deep-compare-effect and https://github.com/streamich/react-use/blob/master/src/useDeepCompareEffect.ts for a similar approach.

The main difference is that `useDeps` can be used with any equality function and any dependency array-accepting hook at the cost of being a little more verbose.
