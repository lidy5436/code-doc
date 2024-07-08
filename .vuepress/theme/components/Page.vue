<template>
  <main class="page">
    <slot name="top"/>
    <div class="page-container-wrapper">
      <div class="page-container-main-wrapper">
        <Content class="theme-default-content"/>
        <PageEdit/>
        <PageNav v-bind="{ sidebarItems }"/>
      </div>
      <div class="page-container-right-wrapper" v-if="'李东阳的个人笔记记录平台'!==pageSidebarItems[0].title">
        <div class="page-container-right-pos-box">
          <div class="page-container-right-title">
            {{  pageSidebarItems[0].title }}
          </div>
          <hr/>
          <div class="page-container-right-toc-box">
            <PageSidebarToc :items="pageListHeaders"/>
          </div>
        </div>
      </div>
    </div>
    <slot name="bottom"/>
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import PageSidebarToc from "../components/PageSidebarToc.vue";

export default {
  components: {PageSidebarToc, PageEdit, PageNav},
  props: ['sidebarItems', 'pageSidebarItems', 'pageListHeaders'],
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

.page-container-wrapper
  display flex
  justify-content space-between

.page-container-main-wrapper
  flex 78

.page-container-right-wrapper
  flex 22
  border-left: 1px solid #eaecef;
  display block
  position relative
  color $textColor
  top 80px
  background transparent
  padding 0 16px

.page-container-right-pos-box
  position fixed
  padding 16px
  top 80px
  width 100%
  height 80vh
  overflow-x hidden
  overflow-y auto

.page-container-right-toc-box
  max-height calc(100% - 250px)
  overflow-x hidden
  overflow-y auto
  box-sizing border-box
  height: calc(100% - 250px)

.theme-default-content:not(.custom)
  max-width 80%

.page-container-right-title
  font-weight: bold

</style>
