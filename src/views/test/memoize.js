function memoize(func) {
    if (typeof func != 'function') {
        throw new TypeError('Expected a function')
    }
    const memoized = function (...args) {
        const key = args[0]
        const cache = memoized.cache

        if (cache.has(key)) {
            return cache.get(key)
        }
        console.log(key);
        const result = func.apply(this, args)
        memoized.cache = cache.set(key, result) || cache
        return result
    }
    memoized.cache = new Map()
    return memoized
}
function add(n) {
    if (!n) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    return n + add(n - 1)
}
var added = memoize(add)
added(10)