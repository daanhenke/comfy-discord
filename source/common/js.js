export class HookedObject
{
    constructor(object)
    {
        this.object = object
        this.originals = {}
    }

    getObjectName()
    {
        return this.object.displayName
    }

    hookMethod(method, callback)
    {
        if (! this.object.hasOwnProperty(method))
        {
            console.error(`Object ${this.getObjectName()} has no method named ${method}`)
            return
        }

        if (this.originals.hasOwnProperty(method))
        {
            console.error(`Method '${this.getObjectName()}::${method}' is already hooked!`)
            return
        }

        this.originals[method] = this.object[method]
        const self = this
        this.object[method] = function(...args)
        {
            return callback.call(this, self.originals[method], ...args)
        }

        return this.originals[method]
    }

    beforeMethod(method, callback)
    {
        return this.hookMethod(method, function(original, ...args) {
            callback.call(this, ...args)
            return original.call(this, ...args)
        })
    }

    afterMethod(method, callback)
    {
        return this.hookMethod(method, function(original, ...args) {
            const result = original.call(this, ...args)
            return callback.call(this, result, ...args)
        })
    }
}