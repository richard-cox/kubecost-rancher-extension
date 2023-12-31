# Example Kubecost Rancher Dashboard Extension

Extensions Page

<img src="./assets/kubecost_extension.png" width="75%">

Namespace Detail Page / kubecost tab

<img src="./assets/kubecost_namespace_tab.png" width="75%">


## Installation instructions
- Go to the upstream / local cluster's Apps / Repositories list and add the repo `https://richard-cox.github.io/kubecost-rancher-extension`
- Go the the `Extensions` page and install the `Kubecost`

For a cluster with kubecost installed, you should be able to go to `Cluster` --> `Projects/Namespaces` --> click on a namespace --> click on the `kubecost` tab and see costs

##

## Production / Release Blockers
Search for `Production Note`. High level
- Update the package.json to include a nice description and cool kubecost logo
- Kubecost should tab should not show if not installed
- The namespace for the kubecost service should be discovered via the helm app resource
- Only fetch a single namespace when requesting namespace stats
- Generic things like error handling, non-developer designed display of data
- Could also consider caching the information in a vuex store
