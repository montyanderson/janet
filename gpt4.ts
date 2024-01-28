export type GPT4Config = {
	apiKey: string;
};

export type GPT4Message = {
	role: "system" | "user";
	content: string;
};

export const createGPT4 =
	(config: GPT4Config) => async (messages: GPT4Message[]) => {
		const url = "https://api.openai.com/v1/chat/completions";

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${config.apiKey}`,
			},
			body: JSON.stringify({
				model: "gpt-4-1106-preview",
				messages,
			}),
		});

		const json = await response.json();

		const output = json?.choices[0]?.message?.content;

		console.log(output);
	};
