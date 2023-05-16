//封装购物车模块
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCartStore = defineStore('cart',() =>{
    //1、定义state - cartList
    const cartList = ref([])
    //2、定义action addCart
    const addCart = (goods) =>{
        //添加购物车操作
        //已添加过的 count++
        //没有添加 直接push
        const item = cartList.value.find((item)=>goods.skuId === item.skuId)
        if(item){
            item++
        }else{
            cartList.value.push(goods)
        }
    }
    return {
        cartList,
        addCart
    }
},{
    persist: true
})