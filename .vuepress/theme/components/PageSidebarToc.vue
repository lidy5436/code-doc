<template>
  <ul class="ra-menu">
    <li
        class="ra-menu-item"
        v-for="(item,index) in items" :key="index"
        @click="itemClick(index,item.slug)"
        :class="[
            index===activeIndex?'active':'',
            item.level > 2 ? 'sub': '',
            `h${item.level}`
            ]">
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
import DropdownTransition from "./DropdownTransition.vue";
import PageSidebarLink from "./PageSidebarLink.vue";

export default {
  components: {PageSidebarLink, DropdownTransition},
  props: ["items"],
  data() {
    return {
      openGroupIndex: 0,
      activeIndex: undefined,
    };
  },
  methods: {
    itemClick(index,slug) {
      this.activeIndex = index;

      window.scrollTo({
        top: document.getElementById(slug)?.offsetTop || 0,
        behavior: "smooth"
      })

    }
  }
}
</script>

<style scoped lang="stylus">
$rightAnchorBgColor ?= #fff;
$rightAnchorTextColor ?= $textColor;
$rightAnchorFontSize ?= 14px;
// btn
$rightAnchorBtnTextColor ?= $rightAnchorTextColor;
$rightAnchorBtnBgColor ?= $rightAnchorBgColor;
// menu
$rightAnchorMenuTextColor ?= $rightAnchorTextColor;

.ra {
  &-menu {
    padding: 12px 0 12px 0;
    background-color: $rightAnchorBgColor;
    border-left: 1px solid $borderColor;
    font-size: $rightAnchorFontSize;
    overflow-y: auto;
    max-height: calc(100% - 1.75rem - 0.6rem * 2 + 0.2rem * 2);
    margin: 0;

    &-item {
      display: block;
      padding: 4px 12px 4px 0;
      margin-left: -1px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      color: $rightAnchorMenuTextColor;

      &.h1 {
        padding-left: 2px;
        font-weight: bold;
        font-size: $rightAnchorFontSize + 2px;
        text-align: center;
      }

      &.h2 {
        padding-left: 16px;
        font-weight: bold;
      }

      &.sub {
        padding-top: 2px;
        padding-bottom: 2px;

        &.h3 {
          padding-left: 24px;
        }

        &.h4 {
          padding-left: 32px;
        }

        &.h5 {
          padding-left: 40px;
        }

        &.h6 {
          padding-left: 48px;
        }
      }

      &:hover, &.active {
        color: $accentColor;
        border-left: 2px solid $accentColor;
        padding-left: 22px;

        &.h1 {
          padding-left: 0px;
        }

        &.h2 {
          padding-left: 14px;
        }

        &.sub {
          &.h3 {
            padding-left: 22px;
          }

          &.h4 {
            padding-left: 30px;
          }

          &.h5 {
            padding-left: 38px;
          }

          &.h6 {
            padding-left: 46px;
          }
        }
      }
    }
  }

  @media (max-width: $MQMobile) {
    .ra-wrapper {
      display: none;
    }
  }
}
</style>
