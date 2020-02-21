import React from 'react'
import {components as Discord} from '../../ui'

export default props =>
{
    const {Text, Flex, Button, Card, LazyImage, Switch, Anchor} = Discord

    const {title, image, links, meta} = props

    let linkMarkup = []
    if (links) linkMarkup = links.map(
        link => (<Anchor style={{marginRight: '5px'}} target="_blank" title={link.title} href={link.href}>{link.title}</Anchor>)
    )

    return (
        <Card className="cardPadded" style={{marginBottom: '20px'}}>
            <Flex direction={Flex.Direction.HORIZONTAL} grow="1" shrink="1">
                <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.STRETCH}>
                    <LazyImage width="40" height="40" src={image}></LazyImage>
                    <Text style={{marginLeft: '20px'}} weight={Text.Weights.BOLD} size={Text.Sizes.LARGE} color={Text.Colors.PRIMARY}>{title}</Text>
                </Flex>
                <Flex.Child grow="0" shrink="1">
                    <Button className="fadeInOnHover" color={Button.Colors.RED} look={Button.Looks.OUTLINED} size={Button.Sizes.SMALL}>
                        Uninstall
                    </Button>
                </Flex.Child>
            </Flex>
            <Flex style={{marginTop: '20px'}} direction={Flex.Direction.HORIZONTAL}>
                <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.STRETCH}>
                    <Text size={Text.Sizes.MEDIUM}>
                        {linkMarkup}
                    </Text>
                </Flex>
                <Flex grow="0" shrink="1" >
                    <Text size={Text.Sizes.MEDIUM} style={{marginRight: '20px'}} color={Text.Colors.PRIMARY}>Enabled</Text>
                    <Switch value={Math.random() > .5}></Switch>
                </Flex>
            </Flex>
        </Card>
    )
}