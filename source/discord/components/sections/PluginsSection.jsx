import React from 'react'
import {components as Discord} from '../../ui'
import PluginCard from '../cards/PluginCard'

export default () =>
{
    const image = 'https://cdn.discordapp.com/avatars/211236663752523777/c976cf825a82efa6bd048cbf0a8b588d.png?size=128'

    const urls = [
        {title: 'Github', href: ''},
        {title: 'Home', href: ''},
        {title: 'Author', href: ''}
    ]

    const plugins = [1, 2, 3, 4]

    const pluginMarkup = plugins.map(
        plugin => (<PluginCard title={`Plugin ${plugin}`} image={image} links={urls}></PluginCard>)
    )

    return (
        <div>
            {pluginMarkup}
        </div>
    )
}