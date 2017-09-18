<template>
  
<div class="home">
  <div class="logo">
    <img src="../assets/img/logo.png" alt="防伪查询">
  </div>
  <div class="so">
    <input type="text" v-model="text">
    <a href="javascript:;" class="btn" v-on:click="show">
      <img src="../assets/img/so.png" alt="">
    </a>
  </div>
  <div v-show="shopinfo" class="main">
    <li v-for="(item,index) in obj" class="clearfix animated lightSpeedIn" v-bind:style="'animation-delay: '+index*0.7+'s;'"><span class="proName">{{ item.storage.property.name }}：</span><span class="proName">{{ item.storage.propertyValue }}</span><span v-if="item.storage.property.name=='快递单号'" class="searchOrder" v-on:click="shop">查看物流</span></li>
    <!-- <li class="clearfix animated lightSpeedIn" style="animation-delay: 0.7s;"><span class="proName">生产日期：</span><span class="proName">2017年9月10日 11:30:35</span></li>
    <li class="clearfix animated lightSpeedIn" style="animation-delay: 1.4s;"><span class="proName">快递单号：</span><span class="proName">200465668499</span><span class="searchOrder" v-on:click="shop">查看物流</span></li>
    <li class="clearfix animated lightSpeedIn" style="animation-delay: 2.1s;"><span class="proName">包装日期：</span><span class="proName">null</span></li> -->
  </div>
  <div class="content" v-show="shopliu">
    <li v-for="(item,index) in shopwuliu" class="animated fadeInUpBig" v-bind:style="'animation-delay: '+index*0.7+'s;'"><p>{{ item.context }}</p><p>{{ item.time }}</p></li>
    <!-- <li class="animated fadeInUpBig" style="animation-delay: 0.7s; display: list-item;"><p>【黑龙江省绥化市庆安县公司】 已发出 下一站 【哈尔滨转运中心】</p><p>2017-09-08 17:11:37</p></li> -->
  </div>
  <div class="footer">
      <p>庆安绿品源生态农业有限公司</p>
      <p>Copyright  2017 <a href="http://www.qinganmi.com">绿品源</a> All rights reserved</p>
   </div>
</div>

</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        text:'123456',
        shopinfo:false,
        shopliu:false,
        obj:'',
        num:'',
        shopwuliu:''
    }
  },
  computed:{
    
  },
  methods:{
    show:function(){
      this.shopinfo = false;
      this.shopliu = false;
      if(this.text==""||this==null||this==undefined){
        alert('请输入查询码')
        this.shopinfo = false;
        this.shopliu = false;
      }else{
        this.$http.post('http://thisqjj.6655.la/order/check',{code:this.text},{emulateJSON:true}).then(function(data){
          // console.log(data.body.list)
          if(data.body.list==null||data.body.list==undefined){
            alert('请输入正确的查询码,谢谢您的支持')
            this.shopinfo = false;
          }else{
            this.obj = data.body.list
            // console.log(data.body.list[2].storage.propertyValue)
            this.num = data.body.list[2].storage.propertyValue;
            // console.log(this.num)
            this.shopinfo = true;
            this.shopliu = false;
          }
          
        })
      }
    },
    shop:function(){
      this.shopliu = false;
      this.$http.post('http://thisqjj.6655.la/Post/info',{num:this.num},{emulateJSON:true}).then(function(data){
        // console.log(data.body.data);
        if(data.body.data==null||data.body.data==undefined){
          alert('暂无物流信息请稍后查询，谢谢')
           this.shopliu = false;
        }else{
          this.shopwuliu = data.body.data
          this.shopliu = true;
        }
      })
    },
    yangs:function(index){
      let i = 0.7;
      return 'animation-delay: '+i*index+'s;'
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    font-size:0.28rem;
    display:block;
  }
  .home{
    width:7.5rem;
    height:auto;
    margin:0 auto;
    overflow:hidden;
  }
  .logo{
    padding:0;
    width:7.5rem;
    height:3rem;
  }
  .logo img{
    width:2rem;
    height:2rem;
    border:50%;
    margin-top:0.5rem;
    margin-left:2.75rem;
  }
  .so{
    position:relative;
    margin-top:0.2rem;
    width:7.2rem;
    margin-left:0.24rem;
    margin-bottom:0.5rem;
  }
  .so input{
    width:5.5rem;
    height:0.82rem;
    border:none;
    border:0.01rem solid #6bb94a;
    padding-left:0.24rem;
    float:left;
  }
   .so:after{
      display:block;
      clear:both;
      content:"";
      visibility:hidden;
      height:0;
    }
  .btn{
    float:left;
    display:inline-block;
    right:0rem;
    top:0.18rem;
    width:1.3rem;
    height:0.9rem;
    background:#6bb94a;
    vertical-align: middle;
  }
  .btn img{
    display:block;
    width:0.52rem;
    height:0.5rem;
    margin:0 auto;
    margin-top:0.16rem;
  }
  .main{
    padding-left:0.24rem;
  }
  .main li{
    width:6.85rem;
    height:auto;
    line-height:0.3rem;
    background:#6bb94a;
    margin-bottom:0.3rem;
    padding:0.2rem 0rem;
    padding-left:0.2rem;
    color:#fff;
  }
  .content li{
    margin-left:0.24rem;
    margin-top:0.3rem;
    line-height:0.5rem;
  }
  .content li p{
    width:7rem;
  }
  .footer {
    color:#333;
    font-size:0.28rem;
    text-align: center;
    line-height: 0.6rem;
    padding: 0.5rem
  }
  .searchOrder {
    float: right;
    padding-right: 0.3rem;
    color: #fffcc7!important;
  }
  .animated {
    animation-duration: 1s;
    animation-fill-mode: both
  }
  @keyframes lightSpeedIn {
    from {
      transform: translate3d(100%,0,0) skewX(-30deg);
      opacity: 0
    }

    60% {
      transform: skewX(20deg);
      opacity: 1
    }

    80% {
      transform: skewX(-5deg);
      opacity: 1
    }

    to {
      transform: none;
      opacity: 1
    }
  }

  .lightSpeedIn {
    animation-name: lightSpeedIn;
    animation-timing-function: ease-out
  }

  

  @keyframes slideInUp {
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInUp {
    animation-name: slideInUp;
  }


  @keyframes fadeInUpBig {
    from {
      opacity: 0;
      transform: translate3d(0, 2000px, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInUpBig {
    animation-name: fadeInUpBig;
  }
</style>
