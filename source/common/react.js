export const getNodeInstance = node =>
{
    const key = '__reactInternalInstance$'
    return node.hasOwnProperty(key) ? node[key] : undefined
}

export const findSpecificElementChild = (parent, filter) =>
{
    if (! parent.props) return undefined
    if (! parent.props.children) return undefined

    if (Array.isArray(parent.props.children))
    {
        for (const child of parent.props.children)
        {
            if (filter(child)) return child
            let recursive_result = findSpecificElementChild(child, filter)
            if (recursive_result !== undefined) return recursive_result
        }
    }
    else
    {
        if (filter(parent.props.children)) return parent.props.children
        let recursive_result = findSpecificElementChild(parent.props.children, filter)
        if (recursive_result !== undefined) return recursive_result
    }

    return undefined
}