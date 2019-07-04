<template>
  <div>
    <h1 style="text-align:center">做市系统控制信息填写注意事项：</h1>

    <div class="info">
      <div class="a">
        <span>重启和停止不需要填表</span>
        <span>修改做市配置，请先停止，填写新的配置文件后开始</span>
        <span>重启时候</span>

      </div>

    </div>
    <div class="formDiv">
      <form>
        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>做市channe：</span>
          <input v-model="channel" placeholder="KCASH" value="KCASH">

        </div>

        <div class="a">

          <span>simwss刷新时间：</span>
          <input v-model="simWssWait" placeholder="10" value="10">

        </div>

        <div class="a">

          <span>做市目标交易所：</span>

          <select v-model="targetExchange" class="targetExchange">
            <option disabled value="">请选择交易所</option>
            <option>bytetrade</option>
          </select>
        </div>
        <hr>

        <div>
          <!-- maker设置 -->
          <span>maker设置：</span>
          <br>

          <div class="a">
            <!-- maker个数 -->
            <span>maker个数：</span>
            <input v-model="makerSettingMakerNum" placeholder="2" value="2">
          </div>

          <div class="a">
            <!-- 资金是否回收转移 -->
            <span>资金是否回收转移：</span>

            <select v-model="makerSettingRecycle" class="makerRecycle">
              <option disabled value="">是否回收</option>
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </div>

          <div class="a">
            <!-- 买卖最大挂单数 -->
            <span>买卖最大挂单数：</span>
            <input v-model="makerSettingMaxMakerOrders" placeholder="2" value="2">

          </div>

          <!--             <div class="a">
              <span>最大深度：</span>
              <input v-model="makerSettingMaxDepth" placeholder="0.6" value="0.6">

            </div> -->

          <div class="a">
            <!-- 深度挂单资金占总比例 -->
            <span>深度挂单资金占总比例：</span>
            <input v-model="makerSettingMakerRatio" placeholder="0.8" value="0.8">

          </div>

          <div class="a">
            <!-- 额外挂单深度 -->
            <span>额外挂单深度：</span>
            <input v-model="makerSettingPlusDepth" placeholder="1.1" value="1.1">

          </div>

          <div class="a">
            <!-- 挂单最小价差 -->
            <span>挂单最小价：</span>
            <input v-model="makerSettingMinInterval" placeholder="0.006" value="0.006">

          </div>

          <div class="a">
            <!-- 币对买1卖1最小价差 -->
            <span>币对买1卖1最小价差：</span>
            <input v-model="makerSettingMinSpread" placeholder="0.003" value="0.003">

          </div>

        </div>

        <hr>

        <div>
          <!-- selfer设置 -->
          <span>对敲刷单设置：</span>
          <br>

          <div class="a">
            <!-- selfer个数 -->
            <span>selfer个数：</span>
            <input v-model="selferSettingSelferNum" placeholder="2" value="2">
          </div>

          <div class="a">
            <!-- 资金是否回收转移 -->
            <span>资金是否回收转移：</span>

            <select v-model="selferSettingRecycle" class="selferRecycle">
              <option disabled value="">是否回收</option>
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </div>

          <div class="a">
            <!-- 对敲账户资金占总资金比例 -->
            <span>对敲账户资金占总资金比例：</span>
            <input v-model="selferSettingSelfRatio" placeholder="0.02" value="0.02">

          </div>

          <div class="a">
            <!-- 单次对敲占对敲账户比例 -->
            <span>单次对敲占对敲账户比例：</span>
            <input v-model="selferSettingTradeRatio" placeholder="0.2" value="0.2">

          </div>

          <div class="a">
            <!-- 未收到新交易数据，用老价格重复对敲的等待时间 -->
            <span>未收到新交易数据，用老价格重复对敲的等待时间：</span>
            <input v-model="selferSettingRepeatWait" placeholder="120" value="120">

          </div>

          <div class="a">
            <!-- 未收到新交易数据，用老价格重复对敲的等待时间 -->
            <span>self活跃度：</span>
            <input v-model="selferSettingSelfActivity" placeholder="4" value="4">

          </div>

        </div>

        <hr>

        <div id="USDT">
          <!-- pair设置 -->
          <span>USDT币对设置：</span>
          <br>

          <div class="a">
            <!-- selfer个数 -->

            <span>模式:</span>

            <select v-model="val1" class="mode" @change="caxun1(val1)">
              <option disabled value="">报价模式</option>
              <option value="refDirect">参考外部交易所</option>
              <option value="refSelf">自报价</option>
              <option value="refDouble">三角报价</option>
              <option value="donotmake">暂不做市</option>

            </select>

          </div>

          <div id="refDirect1" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refDirectSymbolUSDT" placeholder="KCASH/USDT" value="KCASH/USDT">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refDirectactivityUSDT" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>selfer活跃度：</span>
              <input v-model="refDirectselfActivityUSDT" placeholder="3" value="3">
            </div>
            <div class="a">
              <span>参考币对：</span>
              <input v-model="refDirectRefPairUSDT" placeholder="KCASH/ETH" value="KCASH/USDT">
            </div>
            <div class="a">
              <span>参考交易所：</span>
              <!-- <input v-model="refDirectRefExchangeUSDT" placeholder="okex" value="okex"> -->
              <select v-model="refDirectRefExchangeUSDT" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>maxTotal: </span>
              <input v-model="refDirectmaxTotalUSDT" placeholder="1-ETH" value="1-ETH">
            </div>
            <div class="a">
              <span>挂单最小价差：</span>
              <input v-model="refDirectminIntervalUSDT" placeholder="0.001" value="0.001">
            </div>
            <div class="a">
              <span>币对买一卖一最小价差：</span>
              <input v-model="refDirectminSpreadUSDT" placeholder="0.1" value="0.1">
            </div>
            <div class="a">
              <span>deviation：</span>
              <input v-model="refDirectdeviationUSDT" placeholder="-0.04" value="-0.04">
            </div>

          </div>
          <div id="refSelf1" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refSelfSymbolUSDT" placeholder="KCASH/USDT" value="KCASH/USDT">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refSelfactivityUSDT" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>maxTotal：</span>
              <input v-model="refSelfmaxTotalUSDT" placeholder="10-DGD" value="10-DGD">
            </div>
            <div class="a">
              <span>挂单最小价差：</span>
              <input v-model="refSelfminIntervalUSDT" placeholder="0.001" value="0.001">
            </div>
            <div class="a">
              <span>币对买一卖一最小价差：</span>
              <input v-model="refSelfminSpreadUSDT" placeholder="0.003" value="0.003">
            </div>
            <div class="a">
              <span>振幅百分比：</span>
              <input v-model="refSelfpriceRangeUSDT" placeholder="0.1" value="0.1">
            </div>
            <div class="a">
              <span>最高价：</span>
              <input v-model="refSelfiniPriceUSDT" placeholder="0.00001" value="0.00001">
            </div>

          </div>
          <div id="refDouble1" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refDoubleSymbolUSDT" placeholder="KCASH/USDT" value="KCASH/USDT">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refDoubleactivityUSDT" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>baseRef：</span>
              <input v-model="refDoublePair1USDT" placeholder="OMG/ETH" value="OMG/ETH">
            </div>
            <div class="a">

              <span>参考交易所：</span>
              <input v-model="refDoubleExchange1USDT" placeholder="huobipro" value="huobipro">

              <select v-model="refDoubleExchange1USDT" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>quoteRef：</span>
              <input v-model="refDoublePair2USDT" placeholder="OMG/ETH" value="OMG/ETH">
            </div>
            <div class="a">
              <span>参考交易所：</span>
              <!-- <input v-model="refDoubleExchange2USDT" placeholder="huobipro" value="huobipro"> -->
              <select v-model="refDoubleExchange2USDT" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>计算方式：</span>
              <!-- <input v-model="refDoublecalcPriceUSDT" placeholder="base/quote" value="base/quote"> -->
              <select v-model="refDoublecalcPriceUSDT" class="exchange-select">
                <option disabled value="">计算方式：</option>
                <!-- <option>1min</option> -->
                <option>base / quote</option>
                <!-- <option>30min</option> -->
                <option>base * quote</option>
                <!--                <option>binance</option>
                  <option>bytetrade</option> -->
              </select>
            </div>
            <div class="a">
              <span>maxTotal：</span>
              <input v-model="refDoublemaxTotalUSDT" placeholder="1-ETH" value="1-ETH">
            </div>

          </div>
          <hr>
        </div>

        <div id="ETH">
          <!-- pair设置 -->
          <span>ETH币对设置：</span>
          <br>

          <div class="a">
            <!-- selfer个数 -->

            <span>模式:</span>

            <select v-model="val2" class="mode" @change="caxun2(val2)">
              <option disabled value="">报价模式</option>
              <option value="refDirect">参考外部交易所</option>
              <option value="refSelf">自报价</option>
              <option value="refDouble">三角报价</option>
              <option value="donotmake">暂不做市</option>

            </select>

          </div>

          <div id="refDirect2" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refDirectSymbolETH" placeholder="KCASH/ETH" value="KCASH/ETH">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refDirectactivityETH" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>selfer活跃度：</span>
              <input v-model="refDirectselfActivityETH" placeholder="3" value="3">
            </div>
            <div class="a">
              <span>参考币对：</span>
              <input v-model="refDirectRefPairETH" placeholder="KCASH/ETH" value="KCASH/ETH">
            </div>
            <div class="a">
              <span>参考交易所：</span>
              <!-- <input v-model="refDirectRefExchangeETH" placeholder="okex" value="okex"> -->
              <select v-model="refDirectRefExchangeETH" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>maxTotal: </span>
              <input v-model="refDirectmaxTotalETH" placeholder="1-ETH" value="1-ETH">
            </div>
            <div class="a">
              <span>挂单最小价差：</span>
              <input v-model="refDirectminIntervalETH" placeholder="0.001" value="0.001">
            </div>
            <div class="a">
              <span>币对买一卖一最小价差：</span>
              <input v-model="refDirectminSpreadETH" placeholder="0.1" value="0.1">
            </div>
            <div class="a">
              <span>deviation：</span>
              <input v-model="refDirectdeviationETH" placeholder="-0.04" value="-0.04">
            </div>

          </div>
          <div id="refSelf2" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refSelfSymbolETH" placeholder="KCASH/USDT" value="KCASH/USDT">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refSelfactivityETH" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>maxTotal：</span>
              <input v-model="refSelfmaxTotalETH" placeholder="10-DGD" value="10-DGD">
            </div>
            <div class="a">
              <span>挂单最小价差：</span>
              <input v-model="refSelfminIntervalETH" placeholder="0.001" value="0.001">
            </div>
            <div class="a">
              <span>币对买一卖一最小价差：</span>
              <input v-model="refSelfminSpreadETH" placeholder="0.003" value="0.003">
            </div>
            <div class="a">
              <span>振幅百分比：</span>
              <input v-model="refSelfpriceRangeETH" placeholder="0.1" value="0.1">
            </div>
            <div class="a">
              <span>最高价：</span>
              <input v-model="refSelfiniPriceETH" placeholder="0.00001" value="0.00001">
            </div>

          </div>
          <div id="refDouble2" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refDoubleSymbolETH" placeholder="KCASH/ETH" value="KCASH/ETH">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refDoubleactivityETH" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>baseRef：</span>
              <input v-model="refDoublePair1ETH" placeholder="OMG/ETH" value="OMG/ETH">
            </div>
            <div class="a">
              <span>参考交易所：</span>
              <input v-model="refDoubleExchange1ETH" placeholder="huobipro" value="huobipro">
              <select v-model="refDoubleExchange1ETH" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>quoteRef：</span>
              <input v-model="refDoublePair2ETH" placeholder="OMG/ETH" value="OMG/ETH">
            </div>
            <div class="a">
              <span>参考交易所：</span>
              <!-- <input v-model="refDoubleExchange2ETH" placeholder="huobipro" value="huobipro"> -->
              <select v-model="refDoubleExchange2ETH" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>计算方式：</span>
              <!-- <input v-model="refDoublecalcPriceETH" placeholder="base/quote" value="base/quote"> -->
              <select v-model="refDoublecalcPriceETH" class="exchange-select">
                <option disabled value="">计算方式：</option>
                <!-- <option>1min</option> -->
                <option>base / quote</option>
                <!-- <option>30min</option> -->
                <option>base * quote</option>
                <!--                <option>binance</option>
                  <option>bytetrade</option> -->
              </select>
            </div>
            <div class="a">
              <span>maxTotal：</span>
              <input v-model="refDoublemaxTotalETH" placeholder="1-ETH" value="1-ETH">
            </div>

          </div>
          <hr>
        </div>

        <div id="BTC">
          <!-- pair设置 -->
          <span>BTC币对设置：</span>
          <br>

          <div class="a">
            <!-- selfer个数 -->

            <span>模式:</span>

            <select v-model="val3" class="mode" @change="caxun3(val3)">
              <option disabled value="">报价模式</option>
              <option value="refDirect">参考外部交易所</option>
              <option value="refSelf">自报价</option>
              <option value="refDouble">三角报价</option>
              <option value="donotmake">暂不做市</option>

            </select>

          </div>

          <div id="refDirect3" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refDirectSymbolBTC" placeholder="KCASH/BTC" value="KCASH/BTC">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refDirectactivityBTC" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>selfer活跃度：</span>
              <input v-model="refDirectselfActivityBTC" placeholder="3" value="3">
            </div>
            <div class="a">
              <span>参考币对：</span>
              <input v-model="refDirectRefPairBTC" placeholder="KCASH/BTC" value="KCASH/BTC">
            </div>
            <div class="a">
              <span>参考交易所：</span>
              <!-- <input v-model="refDirectrefExchangeBTC" placeholder="okex" value="okex"> -->
              <select v-model="refDirectRefExchangeBTC" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>maxTotal: </span>
              <input v-model="refDirectmaxTotalBTC" placeholder="1-ETH" value="1-ETH">
            </div>
            <div class="a">
              <span>挂单最小价差：</span>
              <input v-model="refDirectminIntervalBTC" placeholder="0.001" value="0.001">
            </div>
            <div class="a">
              <span>币对买一卖一最小价差：</span>
              <input v-model="refDirectminSpreadBTC" placeholder="0.1" value="0.1">
            </div>
            <div class="a">
              <span>deviation：</span>
              <input v-model="refDirectdeviationBTC" placeholder="-0.04" value="-0.04">
            </div>

          </div>
          <div id="refSelf3" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refSelfSymbolBTC" placeholder="KCASH/USDT" value="KCASH/USDT">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refSelfactivityBTC" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>maxTotal：</span>
              <input v-model="refSelfmaxTotalBTC" placeholder="10-DGD" value="10-DGD">
            </div>
            <div class="a">
              <span>挂单最小价差：</span>
              <input v-model="refSelfminIntervalBTC" placeholder="0.001" value="0.001">
            </div>
            <div class="a">
              <span>币对买一卖一最小价差：</span>
              <input v-model="refSelfminSpreadBTC" placeholder="0.003" value="0.003">
            </div>
            <div class="a">
              <span>振幅百分比：</span>
              <input v-model="refSelfpriceRangeBTC" placeholder="0.1" value="0.1">
            </div>
            <div class="a">
              <span>最高价：</span>
              <input v-model="refSelfiniPriceBTC" placeholder="0.00001" value="0.00001">
            </div>

          </div>
          <div id="refDouble3" style="display:none">
            <div class="a">
              <span>交易对：</span>
              <input v-model="refDoubleSymbolBTC" placeholder="KCASH/ETH" value="KCASH/ETH">
            </div>
            <div class="a">
              <span>活跃度：</span>
              <input v-model="refDoubleactivityBTC" placeholder="4" value="4">
            </div>
            <div class="a">
              <span>baseRef：</span>
              <input v-model="refDoublePair1BTC" placeholder="OMG/ETH" value="OMG/ETH">
            </div>
            <div class="a">
              <span>参考交易所：</span>
              <!-- <input v-model="refDoubleExchange1BTC" placeholder="huobipro" value="huobipro"> -->
              <select v-model="refDoubleExchange1BTC" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>quoteRef：</span>
              <input v-model="refDoublePair2BTC" placeholder="OMG/ETH" value="OMG/ETH">
            </div>
            <div class="a">
              <span>参考交易所：</span>
              <!-- <input v-model="refDoubleExchange2BTC" placeholder="huobipro" value="huobipro"> -->
              <select v-model="refDoubleExchange2BTC" class="exchange-select">
                <option disabled value="">参考交易所：</option>
                <!-- <option>1min</option> -->
                <option>huobipro</option>
                <!-- <option>30min</option> -->
                <option>okex</option>
                <option>binance</option>
                <option>bytetrade</option>
              </select>
            </div>
            <div class="a">
              <span>计算方式：</span>
              <!-- <input v-model="refDoublecalcPriceBTC" placeholder="base/quote" value="base/quote"> -->
              <select v-model="refDoublecalcPriceBTC" class="exchange-select">
                <option disabled value="">计算方式：</option>
                <!-- <option>1min</option> -->
                <option>base / quote</option>
                <!-- <option>30min</option> -->
                <option>base * quote</option>
                <!--                <option>binance</option>
                  <option>bytetrade</option> -->
              </select>

            </div>
            <div class="a">
              <span>maxTotal：</span>
              <input v-model="refDoublemaxTotalBTC" placeholder="1-ETH" value="1-ETH">
            </div>

          </div>
          <hr>
        </div>

        <div>

          <div class="a">
            <!-- 操作做市系统密码 -->
            <span>操作做市系统权限密码：</span>
            <input v-model="market_make_pwd" type="password">
          </div>
        </div>
        <hr>

        <input type="button" value="开始" @click="start">
        <input type="button" value="重启" @click="restart">
        <input type="button" value="停止" @click="stop">

      </form>
    </div>

  </div>

</template>

<script>
import { startMarketMake, reStartMarketMake, stopMarketMake } from '@/api/marketMakeContral.js'

export default {

  data() {
    return {
      channel: '',
      simWssWait: '',
      targetExchange: '',

      // maker配置
      makerSettingMakerNum: '',
      makerSettingRecycle: '',
      makerSettingMaxMakerOrders: '',
      makerSettingMakerRatio: '',
      makerSettingPlusDepth: '',
      makerSettingMinInterval: '',
      makerSettingMinSpread: '',

      // selfer配置
      selferSettingSelferNum: '',
      selferSettingRecycle: '',
      selferSettingSelfRatio: '',
      selferSettingTradeRatio: '',
      selferSettingRepeatWait: '',
      selferSettingSelfActivity: '',

      // 报价模式配置
      // USDT
      // 参考报价
      refDirectSymbolUSDT: '',
      refDirectactivityUSDT: '',
      refDirectselfActivityUSDT: '',
      refDirectRefPairUSDT: '',
      refDirectRefExchangeUSDT: '',
      refDirectmaxTotalUSDT: '',
      refDirectminIntervalUSDT: '',
      refDirectminSpreadUSDT: '',
      refDirectdeviationUSDT: '',

      // 自报价
      refSelfSymbolUSDT: '',
      refSelfactivityUSDT: '',
      refSelfmaxTotalUSDT: '',
      refSelfminIntervalUSDT: '',
      refSelfminSpreadUSDT: '',
      refSelfpriceRangeUSDT: '',
      refSelfiniPriceUSDT: '',

      // 三角报价
      refDoubleSymbolUSDT: '',
      refDoubleactivityUSDT: '',
      refDoublePair1USDT: '',
      refDoubleExchange1USDT: '',
      refDoublePair2USDT: '',
      refDoubleExchange2USDT: '',
      refDoublecalcPriceUSDT: '',
      refDoublemaxTotalUSDT: '',

      // ETH
      // 参考报价
      refDirectSymbolETH: '',
      refDirectactivityETH: '',
      refDirectselfActivityETH: '',
      refDirectRefPairETH: '',
      refDirectRefExchangeETH: '',
      refDirectmaxTotalETH: '',
      refDirectminIntervalETH: '',
      refDirectminSpreadETH: '',
      refDirectdeviationETH: '',

      // 自报价
      refSelfSymbolETH: '',
      refSelfactivityETH: '',
      refSelfmaxTotalETH: '',
      refSelfminIntervalETH: '',
      refSelfminSpreadETH: '',
      refSelfpriceRangeETH: '',
      refSelfiniPriceETH: '',

      // 三角报价
      refDoubleSymbolETH: '',
      refDoubleactivityETH: '',
      refDoublePair1ETH: '',
      refDoubleExchange1ETH: '',
      refDoublePair2ETH: '',
      refDoubleExchange2ETH: '',
      refDoublecalcPriceETH: '',
      refDoublemaxTotalETH: '',

      // BTC

      // 参考报价
      refDirectSymbolBTC: '',
      refDirectactivityBTC: '',
      refDirectselfActivityBTC: '',
      refDirectRefPairBTC: '',
      refDirectRefExchangeBTC: '',
      refDirectmaxTotalBTC: '',
      refDirectminIntervalBTC: '',
      refDirectminSpreadBTC: '',
      refDirectdeviationBTC: '',

      // 自报价
      refSelfSymbolBTC: '',
      refSelfactivityBTC: '',
      refSelfmaxTotalBTC: '',
      refSelfminIntervalBTC: '',
      refSelfminSpreadBTC: '',
      refSelfpriceRangeBTC: '',
      refSelfiniPriceBTC: '',

      // 三角报价
      refDoubleSymbolBTC: '',
      refDoubleactivityBTC: '',
      refDoublePair1BTC: '',
      refDoubleExchange1BTC: '',
      refDoublePair2BTC: '',
      refDoubleExchange2BTC: '',
      refDoublecalcPriceBTC: '',
      refDoublemaxTotalBTC: '',

      val1: 0,
      val2: 0,
      val3: 0

      // 报价模式

    }
  },

  methods: {

    caxun1(val) {
      document.getElementById('refDirect1').style.display = 'none'
      document.getElementById('refSelf1').style.display = 'none'
      document.getElementById('refDouble1').style.display = 'none'
      if (val === 'refDirect') {
        document.getElementById('refDirect1').style.display = 'block'
      } else if (val === 'refSelf') {
        document.getElementById('refSelf1').style.display = 'block'
      } else if (val === 'refDouble') {
        document.getElementById('refDouble1').style.display = 'block'
      }
    },
    caxun2(val) {
      console.log('===')
      document.getElementById('refDirect2').style.display = 'none'
      document.getElementById('refSelf2').style.display = 'none'
      document.getElementById('refDouble2').style.display = 'none'
      if (val === 'refDirect') {
        document.getElementById('refDirect2').style.display = 'block'
      } else if (val === 'refSelf') {
        document.getElementById('refSelf2').style.display = 'block'
      } else if (val === 'refDouble') {
        document.getElementById('refDouble2').style.display = 'block'
      }
    },
    caxun3(val) {
      console.log('===')
      document.getElementById('refDirect3').style.display = 'none'
      document.getElementById('refSelf3').style.display = 'none'
      document.getElementById('refDouble3').style.display = 'none'
      if (val === 'refDirect') {
        document.getElementById('refDirect3').style.display = 'block'
      } else if (val === 'refSelf') {
        document.getElementById('refSelf3').style.display = 'block'
      } else if (val === 'refDouble') {
        document.getElementById('refDouble3').style.display = 'block'
      }
    },
    start() {
      const self = this

      var params = {
        'channel': self.channel,
        'simWssWait': self.simWssWait,
        'targetExchange': self.targetExchange,
        'makerSetting': '',
        'selferSetting': '',
        'pairs': '',

        'market_make_pwd': self.market_make_pwd

      }
      var makersettings = {
        'makerNum': self.makerSettingMakerNum,
        'recycle': self.makerSettingRecycle,
        'maxMakerOrders': self.makerSettingMaxMakerOrders,
        'makerRatio': self.makerSettingMakerRatio,
        'plusDepth': self.makerSettingPlusDepth,
        'minInterval': self.makerSettingMinInterval,
        'minSpread': self.makerSettingMinSpread
      }

      var selfersettings = {
        'selferNum': self.selferSettingSelferNum,
        'recycle': self.selferSettingRecycle,
        'selfRatio': self.selferSettingSelfRatio,
        'tradeRatio': self.selferSettingTradeRatio,
        'repeatWait': self.selferSettingRepeatWait || 0.01,
        'selfActivity': self.selferSettingSelfActivity
      }

      params['makerSetting'] = JSON.stringify(makersettings)
      params['selferSetting'] = JSON.stringify(selfersettings)

      const map = {
        'USDT': self.val1,
        'ETH': self.val2,
        'BTC': self.val3
      }

      var temp_pair = {}

      for (var key in map) {
        var temp_ = {}

        if (map[key] === 'refDirect') {
          var temp_lst1 = ['activity', 'selfActivity', 'maxTotal', 'minInterval', 'minSpread', 'deviation']
          for (var i = temp_lst1.length - 1; i >= 0; i--) {
            var k = map[key] + temp_lst1[i] + key

            temp_[temp_lst1[i]] = self[k]
          }
          var pair_key1 = map[key] + 'Symbol' + key
          temp_['pair'] = self[pair_key1]
          temp_['mode'] = map[key]

          var ref_pair_key = map[key] + 'RefPair' + key
          var ref_exchange_key = map[key] + 'RefExchange' + key

          temp_['ref'] = {}
          temp_['ref']['pair'] = self[ref_pair_key]
          temp_['ref']['exchange'] = self[ref_exchange_key]
        } else if (map[key] === 'refSelf') {
          var temp_lst2 = ['activity', 'maxTotal', 'minInterval', 'minSpread', 'priceRange', 'iniPrice']
          for (var i2 = temp_lst2.length - 1; i2 >= 0; i2--) {
            var k2 = map[key] + temp_lst2[i2] + key
            console.log(k2)
            temp_[temp_lst2[i2]] = self[k2]
          }

          var pair_key2 = map[key] + 'Symbol' + key
          temp_['pair'] = self[pair_key2]

          temp_['mode'] = map[key]
        } else if (map[key] === 'refDouble') {
          var pair_key3 = map[key] + 'Symbol' + key
          temp_['pair'] = self[pair_key3]

          temp_['mode'] = map[key]

          var temp_lst3 = ['activity', 'maxTotal', 'calcPrice']
          for (var i3 = temp_lst3.length - 1; i3 >= 0; i3--) {
            var k3 = map[key] + temp_lst3[i3] + key
            console.log(k3)
            temp_[temp_lst3[i3]] = self[k3]
          }

          var base_ref_pair_key = map[key] + 'Pair1' + key
          var base_ref_exchange_key = map[key] + 'Exchange1' + key

          var quote_ref_pair_key = map[key] + 'Pair2' + key
          var quote_ref_exchange_key = map[key] + 'Exchange2' + key

          temp_['baseRef'] = {}

          temp_['baseRef']['pair'] = self[base_ref_pair_key]
          temp_['baseRef']['exchange'] = self[base_ref_exchange_key]

          temp_['quoteRef'] = {}
          temp_['quoteRef']['pair'] = self[quote_ref_pair_key]
          temp_['quoteRef']['exchange'] = self[quote_ref_exchange_key]
        }
        temp_pair[key] = temp_
      }
      params['pairs'] = JSON.stringify(temp_pair)

      startMarketMake(params).then(res => {
        var data = res
        if (data.code === 20000) {
          console.log(data)
          if (data.pwd === 1) {
            // 做市密码正确
            if (data.have_traders === 0) {
              alert('没有做市账户，请生成做市账户')
            } else {
              alert('做市程序 启动成功')
            }
          } else {
            alert('做市密码错误')
          }
        }
      })
    },
    restart() {
      const self = this

      var params = {
        // 直接访问页面

        'market_make_pwd': self.market_make_pwd
      }
      reStartMarketMake(params).then(res => {
        var data = res

        if (data.code === 20000) {
          console.log(data)
          if (data.pwd === 1) {
            // 做市密码正确
            if (data.have_traders === 0) {
              alert('没有做市账户，请生成做市账户')
            } else {
              alert('做市程序 启动成功')
            }
          } else {
            alert('做市密码错误')
          }
        }
        // self.handleRequest(res, self.deal_response)
      })
    },
    stop() {
      const self = this

      var params = {
        // 直接访问页面

        'market_make_pwd': self.market_make_pwd
      }
      stopMarketMake(params).then(res => {
        var data = res

        if (data.code === 20000) {
          console.log(data)
          if (data.pwd === 1) {
            // 做市密码正确
            if (data.stop === 1) {
              alert('做市系统停止，并归还keeper')
            } else {
              alert('停止失败')
            }
          } else {
            alert('做市密码错误')
          }
        }
      })
    }

  }
}
</script>

<style type="text/css">
  .formDiv{
    float:right;
    width: 55%;
    border: 10px dashed #FFF;

  }
  .info{
    float:left;
    width: 40%;
    border: 10px dashed #FFF;
    border-right: 10px dashed #FFF
  }
  .a {
    margin-top: 10px;
  }

</style>
