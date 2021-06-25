<template>
  <div class="page">
    <div>
      <h4>常规解决方案（*10^n转整数计算的方法经实践已发现本身计算就有坑）：</h4>
      <p>
        1、(yyds) toFixed() 方法可把 Number
        <span style="color: red">四舍五入</span>为指定小数位数的数字。（IE
        6，7，8浏览器中可能有坑）
      </p>
      <pre>
        NumberObject.toFixed(num)

        num 规定小数的位数，是 0 ~ 20 之间的值，包括 0 和 20，有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替。
      </pre>
      <p>2、引用类库（待研究）</p>
      <a href="https://github.com/josdejong/mathjs" target="_blank">math.js</a
      ><br /><br />
      <a href="https://github.com/MikeMcl/decimal.js" target="_blank"
        >decimal.js</a
      ><br /><br />
      <a href="https://github.com/MikeMcl/big.js/" target="_blank">big.js</a>
      <p>3、 重写 Number 原型方法（参考）</p>
      <pre>
      // 加法
        function accAdd(arg1, arg2) {
            var r1, r2, m, c;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            c = Math.abs(r1 - r2);
            m = Math.pow(10, Math.max(r1, r2));
            if (c > 0) {
                var cm = Math.pow(10, c);
                if (r1 > r2) {
                    arg1 = Number(arg1.toString().replace(".", ""));
                    arg2 = Number(arg2.toString().replace(".", "")) * cm;
                } else {
                    arg1 = Number(arg1.toString().replace(".", "")) * cm;
                    arg2 = Number(arg2.toString().replace(".", ""));
                }
            } else {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", ""));
            }
            return (arg1 + arg2) / m;
        }
        Number.prototype.add = function (arg) {
            return accAdd(arg, this);
        };

          // 减法
          function accSub(arg1, arg2) {
              var r1, r2, m, n;
              try {
                  r1 = arg1.toString().split(".")[1].length;
              }
              catch (e) {
                  r1 = 0;
              }
              try {
                  r2 = arg2.toString().split(".")[1].length;
              }
              catch (e) {
                  r2 = 0;
              }
              m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
              n = (r1 >= r2) ? r1 : r2;
              return ((arg1 * m - arg2 * m) / m).toFixed(n);
          }
          Number.prototype.sub = function (arg) {
              return accMul(arg, this);
          };

          // 乘法
          function accMul(arg1, arg2) {
              var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
              try {
                  m += s1.split(".")[1].length;
              }
              catch (e) {
              }
              try {
                  m += s2.split(".")[1].length;
              }
              catch (e) {
              }
              return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
          }
          Number.prototype.mul = function (arg) {
              return accMul(arg, this);
          };

          // 除法
          function accDiv(arg1, arg2) {
              var t1 = 0, t2 = 0, r1, r2;
              try {
                  t1 = arg1.toString().split(".")[1].length;
              }
              catch (e) {
              }
              try {
                  t2 = arg2.toString().split(".")[1].length;
              }
              catch (e) {
              }
              with (Math) {
                  r1 = Number(arg1.toString().replace(".", ""));
                  r2 = Number(arg2.toString().replace(".", ""));
                  return (r1 / r2) * pow(10, t2 - t1);
              }
          }
          Number.prototype.div = function (arg) {
              return accDiv(this, arg);
          };
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="sass" scoped>
// p:nth-child(2)
//     background: #eeeeee
</style>