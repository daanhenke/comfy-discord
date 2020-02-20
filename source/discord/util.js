import { sleepWhile } from "../common/misc"
import { getNodeInstance } from "../common/react"

export const waitForComponentByDOMNode = async (selector, filter, ms_between_tries = 300) =>
{
    let element = undefined

    // Wait until an element has appeared on the DOM that matches the selector
    await sleepWhile(() => {
        element = document.querySelector(selector)
        return element === null
    }, ms_between_tries)

    // Get it's internal instance
    let instance = getNodeInstance(element)
    if (instance === undefined) return undefined

    // Check the first element
    if (filter(instance)) return instance.type

    // Traverse trough it's parents
    do
    {
        if (filter(instance.return)) return instance.return.type
        instance = instance.return
    }
    while (instance.return)

    // Nothing matched our filter
    return undefined
}