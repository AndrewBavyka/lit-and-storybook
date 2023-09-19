import { Preview, setCustomElementsManifest } from "@storybook/web-components";
import customElements from '../custom-elements.json' assert { type: "json" };

import '../src/global.css'

setCustomElementsManifest(customElements);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
