<template>
  <div class="page">
    <div>
      <h4>Javascript小数计算的问题：</h4>
      <pre>
        加法 =====================
        // 0.1 + 0.2 = 0.30000000000000004
        // 0.7 + 0.1 = 0.7999999999999999
        // 0.2 + 0.4 = 0.6000000000000001
        // 0.22 + 0.1 = 0.3200000000000003
        
        减法 =====================
        // 1.5 - 1.2 = 0.30000000000000004
        // 0.3 - 0.2 = 0.09999999999999998
        
        乘法 =====================
        // 4.90*100=490.00000000000006
        // 4.90*10*10=490
        // 1306377.64 * 100 = 130637763.99999999
        // 1306377.64 * 10 * 10 = 130637763.99999999
        // 0.7 * 180 = 125.99999999999999
        // 9.7 * 100 = 969.9999999999999
        // 39.7 * 100 = 3970.0000000000005
        
        除法 =====================
        // 0.3 / 0.1 = 2.9999999999999996
        // 0.69 / 10 = 0.06899999999999999
      </pre>
    </div>
    <div>
      <h4>原因追究：</h4>
      <p>
        <a
          target="_blank"
          href="https://zh.wikipedia.org/wiki/IEEE_754"
          >（IEEE 754）</a
        >全称为IEEE二进制浮点数算术标准（ANSI/IEEE Std 754-1985），微处理器系统的二进制浮点数算术，改规范定义了浮点数的格式，对于64位的浮点数最多支持 53 位二进制位,那么 0.1 + 0.2 即：
      </p>
      <pre>
        0.0001100110011001...(无限) + 0.0011001100110011...(无限) ≈ 0.0100110011001100110011001100110011001100110011001100 
      </pre>
      <p>
        两数值转换为二进制计算位数不够而截断末尾，再转换为十进制，变成
        <pre>
          0.30000000000000004
        </pre>
        同理，整数也有相同问题,整数是按最大54位来算最大(2^53 - 1) 和最小 -(2^53 - 1) 安全整数范围的。所以只要超过这个范围，就会存在被舍去的精度问题。
        <pre>
          console.log(19571992547450991===19571992547450992); //=> true
        </pre>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {},
};
</script>

<style lang="sass" scoped>
p
  line-height: 20px
</style>