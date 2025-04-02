import { rslibConfigBase } from '@es-proj/storybook';
import { pluginReact } from '@rsbuild/plugin-react';

rslibConfigBase.plugins = [pluginReact()];

export const rslibConfig = rslibConfigBase;
