import { getModule } from "../common/webpack"
import { filterByDisplayName, filterByProperties, filterSpecific } from "../common/filters"

export const components = {}

export const registerCommonComponents = async () =>
{
    const add = (name, thing) => components[name] = thing

    add('Text', await getModule(filterByDisplayName('Text')))
    add('Button', await getModule(filterByProperties('Link', 'Hovers', 'Looks')))
    add('Icon', await getModule(filterByDisplayName('Icon')))
    add('Image', await getModule(filterByDisplayName('LazyImage')))
    add('Card', await getModule(filterByDisplayName('Card')))
    add('Flex', await getModule(filterByDisplayName('Flex')))
    console.log(components)
}