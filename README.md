# factorio-recipe-sheet

Creates a short recipe overview sheet as html and pdf

- Based on mod:
    - (Mod) https://mods.factorio.com/mod/recipelister
    - (Source) https://gitlab.com/Miner239/recipelister
- Mod Result path  (Windows, created after Factorio start) is %Appdata%/Factorio/script-output/recipe-lister/recipe.json
- Images from Factorio wiki(example): https://wiki.factorio.com/images/Assembling_machine_1.png ![](https://wiki.factorio.com/images/Assembling_machine_1.png)

## Source

- src/namedictionary.json is the dictionary for some type names to icon names
- src/index.js opens the recipe.json file and creates an out.html, also an out.html.pdf file

## Usage (Windows)

- install the mod in Factorio and restart
  
- install nodejs
- clone this repo

- via command line go into the cloned repo folder
- execute 
  
      npm run start

## Develop

Same as 'Usage' but 

- execute 
  
      npm run develop
