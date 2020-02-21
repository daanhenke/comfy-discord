import 'core-js'
import 'regenerator-runtime'

import './style/style'
import ComfyDiscord from './ComfyDiscord'
import * as common from '../common'
import { modules } from './modules'
import { components } from './ui'

import React from 'react'

const main = async () =>
{
    window.comfy = {}
    window.comfy.common = common
    window.comfy.discord = new ComfyDiscord

    window.meme = () => {
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
        
        const yeet = () => <components.SettingsView onClose={modules.LayerManager.popLayer} theme="dark" section="Plugins" sections={out}></components.SettingsView>
        console.log(yeet())
        modules.LayerManager.pushLayer(yeet)
    }

    window.addEventListener('load', () => {
        window.comfy.discord.enable()
    })
}

main()