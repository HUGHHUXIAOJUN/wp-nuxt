<template>
  <footer :class="['footer', errorInformation.code && 'is-error', menuStatus && 'is-show-menu']">
    <div class="wrap">
      <div class="link-wrap" v-if="$route.name === 'index'">
        <a
          v-for="(item, index) in links"
          :key="index"
          :href="item.url"
          :target="item.target"
          :title="item.description"
        >
          {{ item.text }}
        </a>
      </div>
      <div class="copyright">
        <div class="left">
          <ul class="footer-menu">
            <li class="list" v-for="item in subMenu" :key="item.key">
              <nuxt-link
                v-if="item.object === 'category'"
                :to="{
                  name: 'category-id',
                  params: { id: 1 },
                  query: { type: item.object_id, title: item.title }
                }"
              >
                {{ item.title }}
              </nuxt-link>
              <nuxt-link
                v-else-if="item.object === 'page'"
                :to="{ name: 'page-id', params: { id: item.object_id } }"
              >
                {{ item.title }}
              </nuxt-link>
              <a v-else-if="item.object === 'custom'" :href="item.url">{{ item.title }}</a>
            </li>
          </ul>
          <!-- 版权文字 -->
          <div class="copyright-text" v-html="copyright"></div>
        </div>
      </div>
    </div>
    <div class="back-top" ref="backTop" @click="backTop" :class="{ show: isShowBackTop }">
      <x-icon class="icon-back-top"></x-icon>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppFooter',
  data () {
    return {
      isShowBackTop: false
    }
  },
  computed: {
    ...mapState(['menuStatus', 'links', 'subMenu', 'errorInformation']),
    ...mapState({
      copyright: state => state.info.copyright
    })
  },
  mounted () {
    let self = this
    window.addEventListener('scroll', function () {
      self.isShowBackTop = this.scrollY > 500
    })
  },
  methods: {
    backTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  padding: 10px 0;
  background: #2d3237;
  transition: .5s;

  &.is-show-menu {
    transform: translateX(-240px);
  }

  &.is-error {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}

.link-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
  line-height: 2;
  border-bottom: 1px solid #3b424a;
  &:after {
    content: "";
    flex: auto;
  }

   /deep/ a {
    display: block;
    margin-right: $container-margin;
    color: #9295a2;
    font-size: $font-size-large;

    &:hover {
      color: $color-theme;
    }
  }
}

.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size-small;

  .footer-menu {
    display: flex;
    flex-wrap: wrap;

    .list {
      margin-right: 15px;
      line-height: 1.8;

      a {
        padding-right: 15px;
        font-size: $font-size-base;
        border-right: 1px solid #666;
      }

      &:last-child {
        a {
          border: 0;
        }
      }
    }
  }

  img {
    vertical-align: baseline;
  }

  .right {
    align-self: flex-end;
  }
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 40px;
  z-index: 99;
  transform: translateX(100px);
  transition: .5s;
  cursor: pointer;

  &.show {
    transform: translateX(0px);
  }

  .iconfont {
    color: $color-theme;
    font-size: 40px;
  }
}

@media screen and (max-width:1024px) {
  .copyright {
    flex-wrap: wrap;
  }

  .left {
    width: 100%;
  }

  .right {
    width: 100%;
    margin-top: $container-margin;
    text-align: right;
  }
}
</style>
