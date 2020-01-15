<template>
  <header :class="['header-container', menuStatus && 'is-show-menu']">
    <div :style="{'background-image': `url(${info.banner.big.path})`}" class="hide-header" :class="[$route.path!=='/'&&'active']">
      <div
        id="hitokoto"
        class="hitokoto-fullpage"
        :class="[$route.path!=='/'&&'hide']"
      >
        <div class="bracket text-left">『</div>
        <div
          class="word text-center"
          id="hitokoto_text"
        >{{infoP.hitokoto}}</div>
        <div class="bracket text-right">』</div>
        <div
          class="author text-right m-t-40px"
          id="hitokoto_author"
        >-「{{infoP.creator}}」</div>
      </div>
    </div>
    <div
      :class="['header-content', $route.path==='/' && bg && 'active', $route.path!=='/' && unHome && 'active']"
      ref="header"
    >
      <div class="wrap h-f-100">
        <!-- logo 开始 -->
        <div class="logo">
          <h1>{{ info.blogName }}</h1>
          <nuxt-link
            :to="{ name: 'index' }"
            class="block"
          >
            <!-- <img
              :src="info.logo"
              class="vertical-middle"
              width="130"
              height="40"
            > -->
            <div class="limit2">{{infoP.hitokoto}}</div>
          </nuxt-link>
        </div>
        <!-- logo结束 -->
        <!-- 导航开始 -->
        <div>
          <div :class="['h-f-100','nav-wrapper', menuStatus && 'is-show']">
            <ul class="nav-view h-f-100">
              <li
                class="nav-item h-f-100"
                v-for="item in menu"
                :key="item.key"
              >
                <!-- 目录 -->
                <nuxt-link
                  v-if="item.object === 'category'"
                  :to="{
                  name: `${item.object}-id`,
                  params: { id: 1 },
                  query: { type: item.object_id, title: item.title }
                }"
                  :class="['first-link', item.children.length !== 0 && 'prohibit-event__none']"
                >
                  <x-icon :type="item.classes"></x-icon> {{ item.title }}
                  <x-icon
                    v-if="item.children.length !== 0"
                    type="icon-arrow-bottom"
                  ></x-icon>
                </nuxt-link>
                <!-- 页面 -->
                <nuxt-link
                  v-else-if="item.object === 'page'"
                  :to="{ name: 'page-id', params: { id: item.object_id } }"
                  class="first-link"
                >
                  <x-icon :type="item.classes"></x-icon> {{ item.title }}
                </nuxt-link>
                <!-- 标签 -->
                <nuxt-link
                  v-else-if="item.object === 'post_tag'"
                  :to="{ name: 'tags-id', params: { id: 1 }, query: { type: item.term_id, title: item.name } }"
                  class="first-link"
                >
                  <x-icon :type="item.classes"></x-icon> {{ item.title }}
                </nuxt-link>
                <nuxt-link
                  v-else-if="item.object === 'custom'"
                  :to="{ path: item.url }"
                  class="first-link"
                >
                  <x-icon :type="item.classes"></x-icon> {{ item.title }}
                </nuxt-link>
                <!-- 二级菜单 -->
                <div
                  v-if="item.children.length !== 0"
                  class="sub-nav-wrapper"
                >
                  <ul class="sub-nav-view">
                    <li
                      v-for="child in item.children"
                      :key="child.key"
                      class="sub-item"
                    >
                      <nuxt-link
                        v-if="child.object === 'category'"
                        :to="{
                        name: 'category-id',
                        params: { id: 1 },
                        query: { type: child.object_id, title: child.title }
                      }"
                      >
                        <x-icon :type="child.classes"></x-icon> {{ child.title }}
                      </nuxt-link>
                      <nuxt-link
                        v-else-if="child.object === 'page'"
                        :to="{
                        name: 'page-id',
                        params: { id: child.object_id }
                      }"
                      >
                        <x-icon :type="child.classes"></x-icon> {{ child.title }}
                      </nuxt-link>
                      <nuxt-link
                        v-else-if="child.object === 'post_tag'"
                        :to="{ name: 'tags-id', params: { id: 1 }, query: { type: child.object_id, title: child.title } }"
                      >
                        <x-icon :type="child.classes"></x-icon> {{ child.title }}
                      </nuxt-link>
                      <a
                        v-else-if="child.object === 'custom'"
                        :href="child.url"
                      >
                        <x-icon :type="child.classes"></x-icon> {{ child.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 导航结束 -->
        <!-- 右侧搜索开始 -->
        <div class="controller">
          <div :class="['search-wrapper', isShowSearch && 'is-show']">
            <div class="search-content">
              <input
                v-model="searchText"
                type="text"
                placeholder="请输入关键字"
                @keyup.enter="_search"
              >
              <x-icon
                type="icon-search"
                @click.native="_search"
              ></x-icon>
              <x-icon
                type="icon-close hide"
                @click.native="isShowSearch = false"
              ></x-icon>
            </div>
          </div>
          <x-icon
            type="icon-search tablet-show"
            @click.native="isShowSearch = true"
          ></x-icon>
          <x-icon
            type="icon-menu phone-show"
            @click.native="_showNavWrap"
          ></x-icon>
        </div>
        <!-- 右侧搜索结束 -->
      </div>
      <!-- GIT 查看       -->
      <a
        href="https://github.com/HUGHHUXIAOJUN/nuxt"
        class="github-corner"
        target="_blank"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 250 250"
          style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0; z-index: 5001"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style="transform-origin: 130px 106px;"
            class="octo-arm"
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
          ></path>
        </svg>
      </a>
    </div>
  </header>

</template>
<script>
import { mapState } from "vuex";
import $ from "@/utils/operationDOM";
export default {
  watchQuery: ["type"],
  name: "AppHeader",
  data() {
    return {
      searchText: "",
      isShowSearch: false,
      mark: true,
      bg:false,
      unHome:false
    };
  },
  head() {
    return {
      link: [{ rel: "icon", type: "image/x-icon", href: this.info.favicon }],
      style: [{ cssText: this.info.globalCss, type: "text/css" }] // 一言使用 //script:[{ src: 'https://v1.hitokoto.cn/?encode=js&select=%23hitokoto', defer: true }]
    };
  },
  computed: {
    ...mapState(["info", "menu", "menuStatus", "infoP"]),

    height() {
      return this.menuStatus ? `${window.innerHeight}px` : "100%";
    },
  },
   mounted () {
    window.addEventListener('scroll', this.limit)
  },
  watch: {
    menuStatus(v) {
      this.mark = !v;
      $("body").css("height", this.height);
      v ? $("body").addClass("h-f-100") : $("body").removeClass("h-f-100");
    }
  },
  methods: {
    //limit
    limit(){
      this.bg = window.scrollY > 300
      this.unHome=window.scrollY > 20
    },
    // 搜索
    _search() {
      if (!this.searchText) return (this.isShowSearch = false);
      this.$router.push({
        name: "search",
        query: {
          page: 1,
          s: this.searchText
        }
      });
      this.searchText = "";
      this.isShowSearch = false;
    },

    // 显示菜单
    _showNavWrap() {
      this.$store.commit("UPDATE_MENU_STATUS", this.mark);
      this.mark = !this.mark;
    },

    _closeMenu() {
      this.$store.commit("UPDATE_MENU_STATUS", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.header-container {
  position: relative;
  width: 100%;
  background: $color-menu;
  .logo {
    display: none;
  }
  .hide-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $headerHeight;
    font-size: 25px;
    color: $color-theme;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    &.active{
      height: $headerTabHeight;
    }
    .word {
      min-width: 300px;
      padding: 0 40px;
    }
  }

  .header-content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index + 999;
    width: 100vw;
    height: $headerTabHeight;
    background: $color-Tab;
    box-shadow: $box-shadow;
    transition: .5s;
  }

  .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    h1 {
      position: fixed;
      top: -500%;
      left: 0;
    }
  }

  // 导航
  .nav-wrapper {
    flex: 1;
    margin: 0 20px;
    .nav-view {
      display: flex;
    }

    .nav-item {
      position: relative;
      &:hover {
        background: $bg-menu;
      }
      .first-link {
        display: block;
        padding: 0 10px;
        color: $color-menu;
        line-height: $headerTabHeight;
        &:hover {
          color: $color-theme;
        }
      }

      &:hover {
        .sub-nav-wrapper {
          display: block;
        }
      }
    }
  }

  // 搜索框
  .search-wrapper {
    width: 200px;

    .search-content {
      display: flex;
      align-items: center;
      border: 1px solid $color-main-background;
      border-radius: $border-radius;
    }

    input[type="text"] {
      -webkit-appearance: none;
      width: 160px;
      height: 30px;
      padding: 0 5px;
      caret-color: #2486ff !important;
    }

    .iconfont {
      width: 30px;
      height: 30px;
      background: $color-main-background;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      background: transparent;
    }
  }

  //git 查看
  .github-corner {
    svg {
      z-index: 999;
      fill: $color-theme;
      color: $color-menu;
      position: fixed;
      top: 0;
      border: 0;
      right: 0;
    }
    :not(svg) {
      transform-origin: 0 0;
    }
    &:hover {
      .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
      }
    }
  }
}
/*@media (max-width: 500px) {*/
/*  .github-corner:hover .octo-arm { animation: none }*/

/*  .github-corner .octo-arm { animation: octocat-wave 560ms ease-in-out }*/
/*}*/
@media screen and (max-width: 1600px) {
  .github-corner {
    display: none;
  }
}

@media screen and (min-width: 1024px) {
  .header-container {
    .header-content{
      &.active{
        background: $limit-Tab;
      }  
    }
    .sub-nav-wrapper {
      display: none;
      position: absolute;
      top: 100%;
      left: 50%;
      z-index: $z-index;
      width: 180px;
      transform: translateX(-50%);
    }

    .sub-nav-view {
      position: relative;
      top: 10px;
      color: $color-menu;
      background: $color-Tab;
      border-radius: $border-radius;
      box-shadow: $box-shadow;

      &:before {
        content: "";
        position: absolute;
        top: -10px;
        left: 50%;
        width: 0;
        height: 0;
        border: {
          width: 5px;
          style: solid;
          color: transparent transparent $color-Tab transparent;
        }
      }
    }

    .sub-item {
      a {
        display: block;
        padding: 10px 15px;
        color: $color-menu;
        &:hover {
          background-color: $color-theme;
          color: $color-menu;
          transform: scaleX(1.05);
        }
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  .header-container {
    .logo {
      display: block;
    }
    .hide-header {
      div{
          display: none;
      }
    } 
    .search-wrapper {
      display: none;

      &.is-show {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $z-index + 999;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(limegreen, transparent),
          linear-gradient(90deg, skyblue, transparent),
          linear-gradient(-90deg, coral, transparent);
        background-blend-mode: screen;
        -webkit-animation: colorfulStripeChange 5s infinite alternate linear;
        animation: colorfulStripeChange 5s infinite alternate linear;

        .search-content {
          position: relative;
          width: 80%;
          height: 50px;
        }

        input[type="text"] {
          width: 100%;
          height: 100%;
          font-size: 14px;
        }

        .icon-search {
          width: 50px;
          height: 50px;
          font-size: 24px;
          line-height: 50px;
          background: transparent;
        }

        .icon-close {
          position: absolute;
          top: -60px;
          right: 0;
          display: block;
          background: none;
          font-size: 24px;
        }
      }
    }
    .header-content {
      background: linear-gradient(limegreen, transparent),
        linear-gradient(90deg, skyblue, transparent),
        linear-gradient(-90deg, coral, transparent);
      background-blend-mode: screen;
      -webkit-animation: colorfulStripeChange 5s infinite alternate linear;
      animation: colorfulStripeChange 5s infinite alternate linear;
    }
    .nav-wrapper {
      position: fixed;
      top: 60px;
      right: 0;
      z-index: $z-index + 200;
      width: 240px;
      height: calc(100vh - 60px);
      margin: 0;
      padding: 0 20px;
      box-sizing: border-box;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background: $color-theme;
      transition: 0.5s;
      transform: translateX(100%);

      &.is-show {
        transform: translateX(0);
      }

      a {
        color: $color-menu;
      }

      .nav-view {
        flex-direction: column;
        justify-content: flex-start;
      }

      .nav-item {
        height: auto;
        &:hover {
          background: $bg-menu;
        }
        .first-link {
          padding: 0;
          line-height: 40px;
        }
      }

      .sub-item {
        a {
          display: block;
          padding: 10px 10px 10px 25px;
        }
      }
    }

    .controller {
      display: flex;

      .icon-search,
      .icon-menu {
        font-size: 20px;
        color: $color-menu;
      }

      .icon-menu {
        margin-left: 10px;
      }
    }
  }
}
@-webkit-keyframes colorfulStripeChange {
  100% {
    -webkit-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
@keyframes colorfulStripeChange {
  100% {
    -webkit-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
</style>
