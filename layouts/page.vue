<template>
  <div id="app">
    <div :class="['menu-mask', menuStatus && 'is-show-menu']" @click="_closeMenu"></div>
    <div class="flex_c m-h">
      <app-header class="flex0" />
      <div :class="['flex1', 'main', menuStatus && 'is-show-menu']">
        <div class="wrap">
          <div class="content">
            <nuxt/>
          </div>
        </div>
      </div>
      <app-footer class="flex0" />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import { mapState } from 'vuex'
export default {
  name: 'Page',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapState(['menuStatus'])
  },
  methods: {
    _closeMenu () {
      this.$store.commit('UPDATE_MENU_STATUS', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  margin-top: $container-margin;

  .content {
    width: 100%;
  }
}
</style>
