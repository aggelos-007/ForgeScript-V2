# $callFunction
> Calls a forge function made by the user.
## Usage
```
$callFunction[name;...args]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
name | String | The function name | Yes | No
args | String | The args to call this function with | Yes | Yes
<details>
<summary>
    
## [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/callFunction.ts)
    
</summary>
    
```ts
import { ErrorType } from "../structures/ForgeError"
import { ArgType, NativeFunction } from "../structures/NativeFunction"
import { Return } from "../structures/Return"

export default new NativeFunction({
    name: "$callFunction",
    description: "Calls a forge function made by the user.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The function name",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "args",
            description: "The args to call this function with",
            rest: true,
            type: ArgType.String,
            required: true
        }
    ],
    brackets: true,
    execute(ctx, [ name, args ]) {
        const fn = ctx.client.functions.get(name)
        if (!fn) return Return.error(
            this.error(
                ErrorType.UnknownXName,
                "function",
                name
            )
        )

        return fn.call(ctx, args)
    },
})
```
    
</details>