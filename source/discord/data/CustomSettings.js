export default class CustomSettings
{
    constructor()
    {
        this.sections = []
    }

    getSections()
    {
        return this.sections
    }

    addSection(name, component)
    {
        this.sections.push({name, component})
    }
}