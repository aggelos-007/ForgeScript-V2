import { ArgType, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$title",
    description: "Adds an embed title",
    unwrap: true,
    args: [
        {
            name: "title",
            description: "Adds a title to the embed",
            required: true,
            type: ArgType.String,
            rest: false
        },
        {
            name: "hyperlink",
            description: "The hyperlink url",
            rest: false,
            type: ArgType.String
        },
        {
            name: "index",
            description: "The index to add this data to",
            rest: false,
            type: ArgType.Number
        }
    ],
    brackets: true,
    execute(ctx, [ title, hyperlink, index ]) {
        const embed = ctx.container.embed((index ?? 1) - 1).setTitle(title)
        if (hyperlink) embed.setURL(hyperlink)
        return Return.success()
    },
})