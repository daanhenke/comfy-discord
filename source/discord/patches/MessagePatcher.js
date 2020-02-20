import { waitForComponentByDOMNode } from "../util";
import { HookedObject } from "../../common/js";
import { getModule } from "../../common/webpack";
import { filterByProperties, filterSpecific, filterByDisplayName, filterDefault } from "../../common/filters";

export default class MessagePatcher
{
async patch()
{
    // TODO: ADD FILTER FOR THIS TYPE OF HOOKING
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
                        result.props.style = result.props.style || {}
                        result.props.style.color = props.message.colorString
                    }

                    return result
                })
            }
        }

        return original.call(this, props)
    })
}
}