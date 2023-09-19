import { generateJetBrainsWebTypes } from "custom-element-jet-brains-integration";
import manifest from "./custom-elements.json" assert { type: "json" };

const options = {
  outdir: "./dist",
  webTypesFileName: "web-types",
};

generateJetBrainsWebTypes(manifest, options);