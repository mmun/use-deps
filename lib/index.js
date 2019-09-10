const { useRef } = require("react");

function depsHaveChanged(deps, oldDeps, isEqual) {
  if (oldDeps === undefined) {
    return true;
  }

  for (let i = 0; i < deps.length; i++) {
    if (!isEqual(deps[i], oldDeps[i])) {
      return true;
    }
  }

  return false;
}

function useDeps(deps, isEqual = Object.is) {
  if (!Array.isArray(deps)) {
    throw new TypeError("expected array");
  }

  const memoizedDepsRef = useRef();

  if (depsHaveChanged(deps, memoizedDepsRef.current, isEqual)) {
    memoizedDepsRef.current = deps;
  }

  return memoizedDepsRef.current;
}

module.exports = useDeps;
