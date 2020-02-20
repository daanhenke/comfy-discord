import { getModule } from "../../common/webpack";
import { filterByDisplayName } from "../../common/filters";
import { HookedObject } from "../../common/js";

export default class SettingsPatcher
{
    async patch()
    {
        // Find the SettingsView component
        const SettingsView = await getModule(filterByDisplayName('SettingsView'))
        if (SettingsView === undefined) return

        // Wrap it in a hooker helper
        const hooked = new HookedObject(SettingsView.prototype)

        // Store this for use in the hooked functions
        const self = this

        // Patch render function of the SettingsView component
        // so we can inject our own sections
        hooked.hookMethod('render', function(original) {
            const custom_sections = comfy.discord.getSettings().getSections()
            const out = []

            // Add a section header
            out.push({
                section: 'HEADER',
                label: 'Comfy Settings'
            })

            // Add all our custom sections
            for (const section of custom_sections)
            {
                out.push({
                    section: section.name,
                    label: section.name,
                    element: section.component
                })
            }

            // Add a seperator
            out.push({section: 'DIVIDER'})

            // Find the `Discord Nitro` section, we want to inject all of our sections above it
            const nitro_index = this.props.sections.findIndex(el => el.section.includes('Discord Nitro'))
            
            // Add them
            this.props.sections.splice(nitro_index, 0, ...out)

            // Render the actual settings panel
            return original.call(this, this.props.sections)
        })
    }

    async unpatch()
    {

    }
}