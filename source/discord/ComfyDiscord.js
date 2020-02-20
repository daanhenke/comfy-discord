import * as common from '../common'
import SettingsPatcher from './patches/SettingsPatcher'
import CustomSettings from './data/CustomSettings'
import { getModule } from '../common/webpack'
import { filterByProperties } from '../common/filters'
import MessagePatcher from './patches/MessagePatcher'

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
        const React = await getModule(filterByProperties('Component', 'PureComponent'))
        const test = name => (<h1>{name}</h1>)
        this.custom_settings.addSection(test('Themes'))
        this.custom_settings.addSection(test('Plugins'))
        this.custom_settings.addSection(test('About'))

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
