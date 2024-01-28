import * as cli from "std/cli/mod.ts";
import { getGPT4, getStdin } from "./utils.ts";

const helpText = `Usage: janet [OPTIONS...]

Subcommands:
    --help      Display help text and exit
    --feedback  Get feedback on a git diff
`;

const commands = {
	help: () => {
		console.log(helpText);
	},

	feedback: async () => {
		const callGPT4 = await getGPT4();

		await callGPT4([
			{
				role: "system",
				content:
					"You are a code reviewer. Give the user simple and consice feedback on their git commit diff. Only comment on problems.",
			},
			{
				role: "user",
				content: await getStdin(),
			},
		]);
	},
} as const;

const flags = cli.parseArgs(Deno.args);

for (const [name, func] of Object.entries(commands)) {
	if (name in flags) {
		await func();
		Deno.exit(0);
	}
}

commands.help();
