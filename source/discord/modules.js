import { getModule } from "../common/webpack"
import { filterByProperties, filterSpecific } from "../common/filters"

export const modules = {}

export const registerCommonModules = async () =>
{
    const add = (name, thing) => modules[name] = thing

    add('TinyColor', await getModule(filterSpecific('prototype', filterByProperties('toRgb'))))
    add('LayerManager', await getModule(filterByProperties('pushLayer', 'popLayer')))

    console.log(modules)
}