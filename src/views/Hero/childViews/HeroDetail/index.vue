<template>
  <div class="HeroDetail">
    <LybMaskClose @close="hide" />
    <!--//%%%%%··········资料皮肤··········%%%%%//-->
    <HeroMaterialSkins
      class="stick"
      v-if="skins.length"
      :skins="skins"
      :data="data"
    />

    <!--//%%%%%··········故事··········%%%%%//-->
    <HeroDetailParallaxBg class="stick" v-if="skins.length" :bg="skins[1].img">
      <HeroStory :data="storys" />
    </HeroDetailParallaxBg>
  </div>
</template>
<script>
//#####··········网络请求··········#####//
//接口信息：{  英雄皮肤，英雄技能，英雄故事 }
import { heroSkins, heroStorys } from "@/api/main/hero/hero.js";
//#####··········子组件··········#####//
import HeroDetailParallaxBg from "./childComps/HeroDetailParallaxBg"; //滚动视差背景
import HeroMaterialSkins from "./childComps/HeroMaterialSkins"; //资料、皮肤页
import HeroStory from "./childComps/HeroStory"; //历史页
export default {
  props: {
    /* 英雄id */
    id: {
      type: Number,
      default: 0,
    },
    /* 英雄基本数据 */
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    /* 控制是否显示英雄详情 */
    value: {
      type: Boolean,
      default: false,
    },
  },
  name: "HeroDetail",
  data() {
    return {
      show_info: false,
      skins: [],
      storys: {},
    };
  },
  components: {
    HeroDetailParallaxBg,
    HeroMaterialSkins,
    HeroStory,
  },
  created() {
    setTimeout(() => {
      /* 延迟显示卡片 */
      this.show_info = true;
    }, 1000);

    const params = { id: this.id };
    //#####··········获取英雄皮肤··········#####//
    heroSkins(params).then((res) => {
      this.skins = res.data;
    });
    //#####··········获取英雄故事··········#####//
    heroStorys(params).then((res) => {
      this.storys = res.data;
    });
  },
  methods: {
    //#####··········隐藏自身··········#####//
    hide() {
      this.$emit("input", false);
    },
  },
};
</script>
<style scoped lang="less">
/* 滚动条整体背景 */
*::-webkit-scrollbar {
  width: 1px;
  height: 1px;
  background: #999;
}

/* 滚动条里面可以拖动的那部分 */
*::-webkit-scrollbar-thumb {
  background: var(--white);
}

/* 滚动条里面可以拖动的那部分 */
*::-webkit-scrollbar-thumb:hover {
  background-color: var(--white);
}

/* 滚动条里面可以拖动的那部分 */
*::-webkit-scrollbar-thumb:active {
  background-color: var(--white);
}

.stick {
  scroll-snap-align: start;
}
.HeroDetail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden auto;
  scroll-snap-type: y mandatory;
  .basis {
    display: flex;
    justify-content: space-between;
    transform-style: preserve-3d;
    perspective: 2000px;
    overflow: hidden;
  }
}

/* 缩小放大 */
.clip-enter-active {
  animation: clip-in 0.75s;
}

.clip-leave-active {
  animation: clip-out 0.75s;
}
/* 从左到右 */
.leftToRight-enter,
.leftToRight-leave-to {
  transform: translateX(-100%) !important;
}

.leftToRight-leave-active,
.leftToRight-enter-active {
  transition: all 0.5s;
}
</style>
