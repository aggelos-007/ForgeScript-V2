import { Interpreter } from "../../core"
import { EventHandler } from "../../structures"

export default new EventHandler(
    "guildDelete",
    async function(g) {
        const commands = this.commands.get("guildDelete")

        for (const command of commands) {
            Interpreter.run({
                obj: g,
                command,
                client: this,
                states: {
                    guild: {
                        new: g,
                        old: g
                    }
                },
                data: command.compiled.code,
                args: []
            })
        }
    }
)