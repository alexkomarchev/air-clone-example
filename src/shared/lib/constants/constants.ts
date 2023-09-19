import * as process from 'process'

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST

export enum ModelPagesList {
	'/chatgpt',
	'/dalle',
	'/stable-diffusion',
	'/whisper',
	'/kandinsky',
}

export const API_URL = process.env.NEXT_PUBLIC_MAIN_URL

export const surpriseMePrompts = [
	'Vintage 90\'s anime style. stylish model posing in 7/11 convenience store., sci-fi.',

	'an exhausted pepe the frog at the frontlines in the army at night with his platoon fighting, key lighting, soft lights, foggy, by steve hanks, by lisa yuskavage, by serov valentin, by tarkovsky, 8 k render, detailed, cute cartoon style, very cute adorable face',

	'Cute adorable little furry bunny waving at me and happy smiling greeting me with red theme, unreal engine, cozy indoor lighting, artstation, detailed, digital painting, cinematic, character design by mark ryden and pixar and hayao miyazaki, unreal 5, daz, hyperrealistic, octane render',

	'Portrait painting of a cybernetic grey werewolf with power armor, ultra realistic, concept art, intricate details, eerie, highly detailed, photorealistic, octane render, 8 k, unreal engine. art by artgerm and greg rutkowski and alphonse mucha',

	'pikachu attacking a chocolate cake with an electric attack anime style',

	'"Robot Astronaut and Human Astronaut" by Syd Mead, cold color palette, muted colors, detailed, 8k',

	'Hyper detailed ultra sharp, trending on artstation, vibrant aesthetic, bloodwave, colorful, psychedelic, ornate, intricate, digital painting, concept art, smooth, sharp focus, illustration, anthropomorphic alien, art by artgerm and greg rutkowski and h. r. giger, 8 k',

	'8k render of a glowing reflective iridescent male marble bust, glowing, dark hues, 8k. iridescent. very iridescent. trending on behance',

	'cute adorable baby phoenix made of crystal ball with low poly eye\'s highly detailed intricated concept art trending artstation 8k',

	'lighthouse,retro cover, high details, intricate details, by vincent di fate, artgerm julie bell beeple, 60s, inking, vintage 60s print, screen print',

	'Pixar animation style Children on a rollercoaster, rendered, octane render, trending on artstation, trending on deviantart, 8k, 4k, HDR, masterpiece, vibrant colors, low details',

	'Darth Vader on trial, courtroom sketch, black and white',

	'Create a high resolution artwork of lofi ,Anime Girl is programming at a computer in a room full of gadgets, snown ,web developer, by makoto shinkai and ghibli studio, outlined silhouettes, dramatic lighting, highly detailed, incredible quality, trending on artstation, masterpiece, 8k',

	'knight warrior helmet skyrim mask elder scrolls v nordic armor bethesda adam adamowicz illustration character design concept, unreal 5, daz, hyperrealistic, octane render, cosplay, rpg portrait, dynamic lighting, intricate detail, harvest fall vibrancy, cinematic volume inner glowing aura global illumination ray tracing hdr',

	'An Astronaut which is playing on the Moon, with a Grey background.',

	'An astronaut in a tulip garden on a spring day',

	'Robot hacker look like robot golden colour and dark place and orange light comes and sit on chair his hands on table and cd4 laptop',
]
