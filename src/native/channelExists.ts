import noop from "../functions/noop"
import { ArgType, CompiledFunction, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$channelExists",
    description: "Returns whether an channel id exists",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "channel ID",
            description: "The channel to check",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    async execute(ctx, [ id ]) {
        return Return.success(
            CompiledFunction.IdRegex.test(id) &&
            ctx.client.channels.cache.has(id)
        )
    },
})