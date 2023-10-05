<script>
import Loading from '@shell/components/Loading';
import LabelValue from '@shell/components/LabelValue';
import { mapGetters } from 'vuex';

export default {
  name: 'KubecostNamespaceTab',

  components: { Loading, LabelValue },

  props: {
    resource: {
      type:     Object,
      required: true,
    }
  },

  async fetch() {
    const targetNamespace = this.resource.id;
    const prefix = `/k8s/clusters/${ this.clusterId }`;
    const namespace = 'kubecost'; // Production Note - This could be any namespace the user decided to install kubecost to
    const service = 'http:cost-analyzer-cost-analyzer:9090'; // Production Note - Brittle. In theory this could change?
    const path = 'model/allocation?window=1d&aggregate=namespace&accumulate=true'; // Production Note - this will fetch allll namespaces, guessing there's a param to limit to one

    const url = `${ prefix }/api/v1/namespaces/${ namespace }/services/${ service }/proxy/${ path }`;

    const res = await this.$store.dispatch('cluster/request', { url, redirectUnauthorized: false });

    // Production Note - There's no error handling here
    if (res.code === 200) {
      const model = res.data?.[0][targetNamespace];

      if (model) {
        const costs = {
          cpuCost:     model.cpuCost.toFixed(2),
          ramCost:     model.ramCost.toFixed(2),
          pvCost:      model.pvCost.toFixed(2),
          gpuCost:     model.gpuCost.toFixed(2),
          networkCost: model.networkCost.toFixed(2),
          lbCost:      model.loadBalancerCost.toFixed(2),
          totalCost:   model.totalCost.toFixed(2),
        };

        this.costs = Object.entries(costs).map(([key, value]) => ({ name: this.t(`kubecost.namespaceTab.costs.${ key }`), value: `$${ value }` }));
      } else {
        this.costs = null;
      }
    }
  },

  data() {
    return { costs: {} };
  },

  watch: {},

  computed: { ...mapGetters(['clusterId']) },

  methods: {}
};
</script>

<template>
  <div class="main">
    <Loading v-if="$fetchState.pending" mode="relative" />
    <div v-else>
      <h3>{{ t('kubecost.namespaceTab.title') }}</h3>
      <p v-if="!costs">
        {{ t('kubecost.namespaceTab.noCosts') }}
      </p>
      <div
        v-else
        class="label-values"
      >
        <LabelValue
          v-for="cost of costs"
          :key="cost.name"
          class="label-value"
          :name="cost.name"
          :value="cost.value"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  position:'relative';

  .label-values {
    display: flex;
    flex-direction: row;
    .label-value {
      padding-right: 20px;
    }
  }
}
</style>
