const { renderHook, act } = require("@testing-library/react-hooks");
const isEqual = require("react-fast-compare");
const useDeps = require(".");

test("Deps are memoized when equal: default equality function", () => {
  const deps1 = [1, 2, 3];

  let deps = deps1;
  const { result, rerender } = renderHook(() => useDeps(deps));

  deps = [1, 2, 3];
  rerender();

  act(() => {
    expect(result.current).toBe(deps1);
  });
});

test("Deps are memoized when equal: react-fast-compare", () => {
  const deps1 = [{ a: 1 }, { b: 2 }, { c: 3 }];

  let deps = deps1;
  const { result, rerender } = renderHook(() => useDeps(deps, isEqual));

  deps = [{ a: 1 }, { b: 2 }, { c: 3 }];
  rerender();

  act(() => {
    expect(result.current).toBe(deps1);
  });
});

test("Deps are updated when changed: default equality function", () => {
  const deps1 = [1, 2, 3];

  let deps = deps1;
  const { result, rerender } = renderHook(() => useDeps(deps));

  deps = [1, 2, 7];
  rerender();

  act(() => {
    expect(result.current).toBe(deps);
  });
});

test("Deps are updated when changed: react-fast-compare", () => {
  const deps1 = [{ a: 1 }, { b: 2 }, { c: 3 }];

  let deps = deps1;
  const { result, rerender } = renderHook(() => useDeps(deps, isEqual));

  deps = [{ a: 1 }, { b: 2 }, { x: 7 }];
  rerender();

  act(() => {
    expect(result.current).toBe(deps);
  });
});

test("An error is thrown if deps is not an array", () => {
  const { result } = renderHook(() => useDeps(null, isEqual));
  expect(result.error).toBeInstanceOf(TypeError);
});
