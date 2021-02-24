<template>
  <div class='container'>
      <router-view></router-view>
      <router-view name="footer"></router-view>
  </div>
</template>

<style lang="scss">
@import '@/lib/reset.scss';
html,body,.container,.detail{
  @include rect(100%,100%);
}

.container,.detail{
  @include flexbox();
  @include flex-direction(column);
   .box{
     @include flex();
     @include flexbox();
     @include rect(100%,100%);
     @include flex-direction(column);
     @include overflow();
     .header{
       @include rect(100%,0.44rem);
       background-image: linear-gradient(to right,#019bfd,#01b9ff);
       @include flexbox();
       @include align-items();
       @include justify-content();
       color: #fff;
       position: relative;
       font-size: 16px;
       .back {
         position: absolute;
         left: 0.1rem;
       }
       .search{
         border:solid 1px #fff;
         height:30px;
         border-radius: 5%;
         width: 70%;
       }
       .icon-saoma{
         position:fixed;
         right:20px;
         font-size:30px;
       }
     }
     .content{
       @include rect(100%,100%);
       @include overflow();
       .van-pull-refresh__head{
         height:0;
         width:0;
       }
     }
   }
   .footer{
     @include rect(100%,0.5rem);
     @include background-color(#eeeeee);
     ul{
       @include rect(100%,100%);
       @include flexbox();
        li{
         @include flex();
         @include rect(auto,100%);
         @include flexbox();
         @include flex-direction(column);
         @include align-items();
         @include justify-content();
         &.router-link-active{
           @include color(rgb(25, 137, 250));
         }
         span{
           @include font-size(0.22rem);
         }
         p{
           @include font-size(0.12rem);
           margin-top: -5px;
         }
       }
     }
   }
}
.back {
  position: absolute;
  left: 0.1rem;
  line-height: 0.44rem;
}
.van-button--danger {
  background-image: linear-gradient(to right,#019bfd,#01b9ff);
  border:none!important;
}
</style>
