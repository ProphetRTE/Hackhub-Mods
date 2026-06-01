import { Command, RegisterCommand, CommandTools } from "@hotbunny/hackhub-content-sdk";

@RegisterCommand
export class IpGenCommand extends Command {

    CommandName = "ipgen";
    Description = "Generate random target IP addresses for testing or scanning";

    Autocomplete = [
        { label: "ipgen", type: "STRING" as const },
        { label: "<count>", type: "NUMBER" as const },
    ];

    async Run(tools: CommandTools) {

        const args = tools.getArgs();
        const { flags } = tools.parseFlags();

        const count = Math.min(parseInt(args[0] || "1", 10) || 1, 50);

        const help = flags["help"] || flags["h"];

        if (help) {
            tools.println("Usage: ipgen <count> [--class-a] [--class-b] [--class-c]");
            tools.newLine();
            tools.println("Options:");
            tools.println("  --class-a   Generate 10.x.x.x range");
            tools.println("  --class-b   Generate 172.x.x.x range");
            tools.println("  --class-c   Generate 192.168.x.x range");
            tools.println("  --help, -h  Show help");
            return;
        }

        const useA = !!flags["class-a"];
        const useB = !!flags["class-b"];
        const useC = !!flags["class-c"];

        const modeCount = [useA, useB, useC].filter(Boolean).length;

        const rand = (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1)) + min;

        const generateIp = (): string => {

            // If user picked a class, bias output
            if (modeCount === 1) {
                if (useA) return `10.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`;
                if (useB) return `172.${rand(16, 31)}.${rand(0, 255)}.${rand(1, 254)}`;
                if (useC) return `192.168.${rand(0, 255)}.${rand(1, 254)}`;
            }

            // Default: fully random public-ish range
            const first = rand(1, 223);

            // avoid reserved blocks loosely
            if (first === 127) return generateIp();

            return `${first}.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`;
        };

        tools.printInfo(`Generating ${count} IP address(es)...`);
        tools.newLine();

        const results: string[][] = [];

        for (let i = 0; i < count; i++) {
            const ip = generateIp();
            results.push([String(i + 1), ip]);
        }

        tools.printTable(
            ["#", "IP ADDRESS"],
            results
        );

        tools.newLine();
        tools.printSuccess(`Generated ${count} target IP(s).`);
    }
}