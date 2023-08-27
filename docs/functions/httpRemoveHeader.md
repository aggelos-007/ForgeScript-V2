# $httpRemoveHeader
> Removes an HTTP header
## Usage
```
$httpRemoveHeader[name]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
name | String | The header name | Yes | No
<details>
<summary>
    
## [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/httpRemoveHeader.ts)
    
</summary>
    
```ts
import { ArgType, NativeFunction } from "../structures/NativeFunction"
import { Return } from "../structures/Return"

export default new NativeFunction({
    name: "$httpRemoveHeader",
    description: "Removes an HTTP header",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The header name",
            rest: false,
            type: ArgType.String,
            required: true
        }
    ],
    brackets: true,
    execute(ctx, [ name ]) {
        if (ctx.http.headers) {
            delete ctx.http.headers[name]
        }
        
        return Return.success()
    },
})
```
    
</details>