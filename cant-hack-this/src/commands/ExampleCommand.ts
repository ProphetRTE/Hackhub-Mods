import { Command, RegisterCommand, CommandTools } from "@hotbunny/hackhub-content-sdk";


@RegisterCommand
export class IpGenCommand extends Command {
    CommandName = "example";
    Description = "An example command to build a new one off of.";

    Autocomplete = [
        { label: "example", type: "STRING" as const },
      //{ label: "<count>", type: "NUMBER" as const },
    ];

    Run(tools: CommandTools): Promise<void> | void {
        tools.printInfo("Hello World!");
    }
    
}