import React from 'react'
import {components as Discord} from '../../ui'

export default () =>
{
    const {Text, Flex, Button, Card, LazyImage, Switch} = Discord
    return (
        <div>
            <Card outline className="cardPadded">
                <Flex direction={Flex.Direction.HORIZONTAL} grow="1" shrink="1">
                    <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.STRETCH}>
                        <LazyImage width="80" height="80" src="https://cdn.discordapp.com/avatars/211236663752523777/c976cf825a82efa6bd048cbf0a8b588d.png?size=128"></LazyImage>
                        <Text weight={Text.Weights.BOLD} size={Text.Sizes.LARGE} color={Text.Colors.PRIMARY}>I am plugin</Text>
                    </Flex>
                    <Flex.Child grow="0" shrink="1">
                        <Button className="fadeInOnHover" color={Button.Colors.RED} look={Button.Looks.OUTLINED} size={Button.Sizes.SMALL}>
                            Uninstall
                        </Button>
                    </Flex.Child>
                </Flex>
                <Flex direction={Flex.Direction.HORIZONTAL}>
                    <Text color={Text.Colors.PRIMARY}>Enabled? (Switches use external state don't get mad at them if they do not work)</Text>
                    <Switch value={Math.random() > .5}></Switch>
                </Flex>
                <Flex direction={Flex.Direction.HORIZONTAL}>
                    <Text color={Text.Colors.PRIMARY}>Autistic? (Switches use external state don't get mad at them if they do not work)</Text>
                    <Switch value={Math.random() > .5}></Switch>
                </Flex>
            </Card>
        </div>
    )
}