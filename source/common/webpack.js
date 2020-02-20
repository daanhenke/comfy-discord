import { sleepWhile } from "./misc"

let __require = undefined

export const getRequire = async () =>
{
    if (__require !== undefined) return __require

    await sleepWhile(() => typeof window.webpackJsonp === 'undefined')

    const webpack_id = '__COMFY__'
    let require = window.webpackJsonp.push([[], {[webpack_id]: (module, exports, require) => exports.default = require}, [[webpack_id]]]).default

    window.webpackJsonp.pop()
    delete require.c[webpack_id]
    delete require.m[webpack_id]
    
    return __require = require
}

export const getModule = async (filter, return_multiple = false) =>
{
    const out = []
    const require = await getRequire()

    for (const index in require.c)
    {
        if (! require.c.hasOwnProperty(index)) continue
        const {exports} = require.c[index]
        let result = undefined

        if (!exports) continue
        if (exports.__esModule && exports.default && filter(exports.default)) result = exports.default
        if (filter(exports)) result = exports

        if (result === undefined) continue
        if (return_multiple) out.push(result)
        else return result
    }

    return return_multiple ? out : undefined
}
