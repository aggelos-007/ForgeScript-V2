# $arrayReduce
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Reduces an array of elements and returns the result
## Usage
```
$arrayReduce[name;variable;other variable;code;default value]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
name | String | The variable that holds the array | Yes | No
variable | String | The variable to load the element value to | Yes | No
other variable | String | The other variable to load the second element to | Yes | No
code | String | The code to execute for every element, must return a number | Yes | No
default value | Number | The default value, defaults to 0 | No | No
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/arrayReduce.ts)
    
</summary>
    
```ts
import { BoolValues } from "../core"
import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$arrayReduce",
    description: "Reduces an array of elements and returns the result",
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The variable that holds the array",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "variable",
            description: "The variable to load the element value to",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "other variable",
            description: "The other variable to load the second element to",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "code",
            description: "The code to execute for every element, must return a number",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "default value",
            description: "The default value, defaults to 0",
            rest: false,
            type: ArgType.Number
        }
    ],
    brackets: true,
    async execute(ctx) {
        const nameField = this.data.fields![0] as IExtendedCompiledFunctionField
        const varField = this.data.fields![1] as IExtendedCompiledFunctionField
        const otherVarField = this.data.fields![2] as IExtendedCompiledFunctionField
        const defaultValue = this.data.fields![4] as IExtendedCompiledFunctionField
        const code = this.data.fields![3] as IExtendedCompiledFunctionField

        const name = await this["resolveCode"](ctx, nameField.resolve, nameField.functions)
        if (!this["isValidReturnType"](name)) return name

        const variable = await this["resolveCode"](ctx, varField.resolve, varField.functions)
        if (!this["isValidReturnType"](variable)) return variable

        const otherVariable = await this["resolveCode"](ctx, otherVarField.resolve, otherVarField.functions)
        if (!this["isValidReturnType"](otherVariable)) return variable

        const defValue = await this["resolveCode"](ctx, defaultValue.resolve, defaultValue.functions)
        if (!this["isValidReturnType"](defValue)) return variable

        const arr = ctx.getEnvironmentKey([ name.value as string ])
        const varName = variable.value as string
        const otherVarName = otherVariable.value as string

        ctx.setEnvironmentKey(varName, defValue.value)

        if (Array.isArray(arr)) {
            for (let i = 0, len = arr.length;i < len;i++) {
                const el = arr[i]
                
                ctx.setEnvironmentKey(otherVarName, el)
                
                const rt = await this["resolveCode"](ctx, code.resolve, code.functions) as Return
                
                if (rt.return) {
                    ctx.setEnvironmentKey(varName, rt.value)
                } else if (!this["isValidReturnType"](rt)) return rt
            }
        }


        return Return.success(ctx.getEnvironmentKey([ varName ]))
    },
})
```
    
</details>