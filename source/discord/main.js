import 'core-js'
import 'regenerator-runtime'
import ComfyDiscord from './ComfyDiscord'

const main = async () =>
{
    window.comfy = {}
    window.comfy.discord = new ComfyDiscord

    window.addEventListener('load', () => {
        window.comfy.discord.enable()
    })
}

main()