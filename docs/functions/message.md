# $message
> Retrieves arguments from a message command
## Usage
```
$message
```
---
```
$message[index]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
index | Number | Index to get arg | Yes | No
<details>
<summary>
    
## [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/message.ts)
    
</summary>
    
```ts
import { ArgType, NativeFunction } from "../structures/NativeFunction"
import { Return } from "../structures/Return"

export default new NativeFunction({
    name: "$message",
    description: "Retrieves arguments from a message command",
    args: [
        {
            name: "index",
            description: "Index to get arg",
            type: ArgType.Number,
            required: true,
            rest: false,
        }
    ],
    brackets: false,
    unwrap: true,
    execute(ctx, [ index ]) {
        if (this.hasFields) {
            return Return.success(ctx.args[index - 1])   
        }
        return Return.success(ctx.args.join(" "))
    },
})
```
    
</details>