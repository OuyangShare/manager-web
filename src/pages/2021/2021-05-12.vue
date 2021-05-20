<template>
  <div class="page">
    <div>
      <h4>:nth-child(n) 定义及用法</h4>
      <p>
        选择器匹配父元素中的第 n 个子元素，元素类型没有限制。 n
        可以是一个数字，一个关键字，或者一个公式。
      </p>
      odd（偶） 和 even（奇） 是可用于匹配下标是奇数或偶数的子元素的关键词（第一个子元素的下标是 1）<br>
      使用公式 (an + b)。描述：表示周期的长度，n 是计数器（从 0 开始），b 是偏移值（如：2n+7 => 7,9,11,...）<br/>
      通常用法：
      <pre>
        p:nth-child(odd){
          background:#ff0000;
        }
        p:nth-child(even){
          background:#0000ff;
        }
        p:nth-child(1){
          background:#0000ff;
        }
      </pre>
    </div>
    <div>
      <h4>扩展：:nth-of-type() 选择器</h4>
      <p>规定属于其父元素的第二个 p 元素的每个 p</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="sass" scoped>
.page
  line-height: 30px;
// p:nth-child(1)
//     background: #0000ff

// p:nth-child(2)
//     background: #eeeeee
</style>