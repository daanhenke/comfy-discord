import { getModule } from "../common/webpack"
import { filterByDisplayName, filterByProperties } from "../common/filters"

export const components = {}

export const registerCommonComponents = async () =>
{
    const add = (name, thing) => components[name] = thing

    add('Text', await getModule(filterByDisplayName('Text')))
    add('Anchor', await getModule(filterByDisplayName('Anchor')))
    add('Button', await getModule(filterByProperties('Link', 'Hovers', 'Looks')))
    add('Icon', await getModule(filterByDisplayName('Icon')))
    add('LazyImage', await getModule(filterByDisplayName('LazyImage')))
    add('Switch', await getModule(filterByDisplayName('Switch')))
    add('Card', await getModule(filterByDisplayName('Card')))
    add('Flex', await getModule(filterByDisplayName('Flex')))
    add('SettingsView', await getModule(filterByDisplayName('SettingsView')))
    
    console.log(components)
}