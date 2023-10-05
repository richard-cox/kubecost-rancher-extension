import { importTypes } from '@rancher/auto-import';
import { NAMESPACE } from '@shell/config/types';
import { IPlugin, TabLocation } from '@shell/core/types';

// Init the package
export default function(plugin: IPlugin): void {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');

  // Add namespaces tab
  plugin.addTab(
    TabLocation.RESOURCE_DETAIL, { resource: [NAMESPACE] }, {
      name:       'kubecost',
      labelKey:   'kubecost.namespaceTab.label',
      weight:     -10,
      tooltipKey: 'kubecost.namespaceTab.tooltip',
      component:  () => import('./components/NamespaceTab.vue')
    });
}
