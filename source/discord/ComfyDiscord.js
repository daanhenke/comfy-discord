import * as common from '../common'
import SettingsPatcher from './patches/SettingsPatcher'
import CustomSettings from './data/CustomSettings'
import { getModule } from '../common/webpack'
import { filterByProperties } from '../common/filters'
import MessagePatcher from './patches/MessagePatcher'
import PluginsSection from './components/sections/PluginsSection'
import { registerCommonComponents, components } from './ui'

export default class ComfyDiscord
{
    constructor()
    {
        this.patchers = [
            new SettingsPatcher,
            new MessagePatcher
        ]

        this.custom_settings = new CustomSettings
    }

    get library()
    {
        return common
    }

    async enable()
    {
        registerCommonComponents()

        const React = await getModule(filterByProperties('Component', 'PureComponent'))
        const test = name => [name, () => (<h1>{name}</h1>)]

        this.custom_settings.addSection(...test('Themes (borken)'))
        this.custom_settings.addSection('Plugins', PluginsSection)
        this.custom_settings.addSection(...test('About (borken)'))

        for (const patcher of this.patchers)
        {
            await patcher.patch()
        }
    }

    async disable()
    {

    }

    getSettings()
    {
        return this.custom_settings
    }
}
