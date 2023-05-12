<script setup>
import {getCategoryFilterAPI,getSubCategoryAPI} from '@/apis/category'
import GoodsItem from '../Home/components/GoodsItem.vue';
import { useRoute } from 'vue-router';
import { onMounted,ref } from 'vue';
const router = useRoute()
 const filterData = ref([])
 const getFilterData = async () => {
    const res = await getCategoryFilterAPI(router.params.id)
    filterData.value = res.result
 }
 onMounted(()=>getFilterData())

// 获取基础列表数据渲染
const goodList = ref([])
const reqData = ref({
  categoryId: router.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  console.log(res)
  goodList.value = res.result.items
}
onMounted(() => getGoodList())

// tab切换回调
// tab组件切换时修改reqData中的sortField字段，重新拉取接口列表
const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField)
  reqData.value.page = 1
  getGoodList()
}

// 1. 触底条件满足之后 page++，拉取下一页数据
// 2. 新老数据做数组拼接
// 3. 判断是否已经全部加载完毕，停止监听
const disabled = ref(false)
const load = async() => {
    // 获取下一页的数据
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = [...goodList.value,...res.result.items]
    //加载完毕 停止监听
    if(res.result.items.length ===0){
        disabled.value = true
    }
}
</script>

<template>
<div class="container">
    <!--面包屑-->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">{{filterData.parentName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{filterData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange()">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-ininite-scroll="load" :v-ininite-scroll-disabled = "disabled">
         <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id"></GoodsItem>
      </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>