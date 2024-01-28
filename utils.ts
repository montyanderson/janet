import * as path from "std/path/mod.ts";
import * as cli from "std/cli/mod.ts";
import { readAll } from "std/io/read_all.ts";
import { createGPT4 } from "./gpt4.ts";

export const getConfig = async () => {
	const homeDirectory = Deno.env.get("HOME");
	if (homeDirectory === undefined) {
		throw new Error("getConfig(): failed to get home directory");
	}

	const janetDirectory = path.join(homeDirectory, ".janet");

	// attempt to make directory. if already exists, continue.
	try {
		await Deno.mkdir(janetDirectory, { mode: 0o700 }); // only accessable by owner user
	} catch (err) {
		if (!(err instanceof Deno.errors.AlreadyExists)) {
			throw err;
		}
	}

	const janetConfigPath = path.join(janetDirectory, "config");

	return await Deno.openKv(janetConfigPath);
};

export const getGPT4 = async () => {
	const config = await getConfig();

	const configKey = "openai-api-key";

	let apiKey = (await config.get([configKey])).value;

	if (typeof apiKey !== "string") {
		// keep prompting if bad input
		while (typeof apiKey !== "string" || apiKey === "") {
			apiKey = cli.promptSecret("Enter your OpenAI API Key: ");
		}

		config.set([configKey], apiKey);
	}

	return createGPT4({
		apiKey,
	});
};

export const getStdin = async () =>
	new TextDecoder().decode(
		await readAll(Deno.stdin),
	);
