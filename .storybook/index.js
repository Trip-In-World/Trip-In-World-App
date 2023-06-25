import { getStorybookUI } from '@storybook/react-native';
import { loadStories } from './storyLoder';

import './storybook.requires';

const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
