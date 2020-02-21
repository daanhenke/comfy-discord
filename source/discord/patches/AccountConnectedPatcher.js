import { getModule } from "../../common/webpack";
import { filterDefault, filterByDisplayName } from "../../common/filters";
import { HookedObject } from "../../common/js";
import { waitForComponentByDOMNode } from "../util";

export default class AccountConnectedPatcher
{
    async patch()
    {
        // Get the 
        const Account = await waitForComponentByDOMNode('[class*="avatarWrapper-"]', m => m.type.displayName === 'Account')
        console.log(Account)
        if (! Account) return

        const hooked = new HookedObject(Account.prototype)

        hooked.hookMethod('render', function(original) {
            const result = original.call(this)
            console.log(result)
            return result
        })

        console.log(hooked)

        console.log('hook placed b0ss')
    }

    async unpatch()
    {
        
    }
}