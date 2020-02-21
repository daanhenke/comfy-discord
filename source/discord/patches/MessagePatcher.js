import { modules as Modules } from "../modules"
import { HookedObject } from "../../common/js";
import { getModule } from "../../common/webpack";
import { filterByProperties, filterByDisplayName, filterDefault } from "../../common/filters";

export default class MessagePatcher
{
async patch()
{
    const MessageModule = await getModule(filterDefault(filterByDisplayName('Message')))

    // Get Discord's data stores
    const GuildMemberStore = await getModule(filterByProperties('getMember'))
    const ChannelStore = await getModule(filterByProperties('getChannels', 'getDMFromUserId'))

    const hooked = new HookedObject(MessageModule)
    hooked.hookMethod('default', function(original, props) {
        // Shouldn't be any messages without content but it's still a good idea to check
        if (typeof props.childrenMessageContent === 'object')
        {
            // Check if we already hooked the method
            if (props.childrenMessageContent.type.type.displayName === 'MessageContent')
            {
                const hooked = new HookedObject(props.childrenMessageContent.type)

                // Hook the MessageContent component which is a function aswel
                hooked.hookMethod('type', function (original, props) {
                    const result = original.call(this, props)
                    const { message } = props

                    let color = message.colorString
                    if (color === null)
                    {
                        const channel = ChannelStore.getChannel(message.channel_id)
                        
                        if (channel)
                        {
                            const author = GuildMemberStore.getMember(channel.guild_id, message.author.id)
                            
                            if (author) color = author.colorString
                        }
                    }

                    if (color)
                    {
                        const original_color = getComputedStyle(document.documentElement).getPropertyValue('--text-normal')

                        if (original_color.length > 0)
                        {
                            color = Modules.TinyColor.mix(color, original_color, window.meme || 10)
                        }

                        result.props.style = result.props.style || {}
                        result.props.style.color = color
                    }

                    return result
                })
            }
        }

        return original.call(this, props)
    })
}
}