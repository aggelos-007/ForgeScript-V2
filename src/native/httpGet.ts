import { ArgType, NativeFunction } from "../structures/NativeFunction"
import { fetch } from "undici"
import { Return } from "../structures/Return"

export default new NativeFunction({
    name: "$httpGet",
    description: "Performs an http GET request, returns the status code.",
    args: [
        {
            name: "url",
            description: "The url to perform this request to",
            type: ArgType.String,
            rest: false,
            required: true
        },
        {
            name: "variable",
            description: "Environment variable name to load the response to",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    brackets: true,
    unwrap: true,
    async execute(ctx, [ url, name ]) {
        const req = await fetch(url, {
            method: "GET",
            ...ctx.http
        })

        const contentType = req.headers.get("content-type")?.split(";")[0]
        
        if (contentType === "application/json") {
            ctx.setEnvironmentKey(name, await req.json())
        } else ctx.setEnvironmentKey(name, await req.text())

        return Return.success(req.status)
    },
})