# 我要戴口罩

> 😷 珍爱生命，从我做起

采用微信小程序编写 实现了为头像戴上口罩的功能

基于 [jasscia/ChristmasHat](https://github.com/jasscia/ChristmasHat)，在其上进行了魔改。

扫码预览

![](https://cdn.jsdelivr.net/gh/idealclover/Wear-A-Mask@master/assets/qrcode.jpg)

## 小程序截图

![](https://cdn.jsdelivr.net/gh/idealclover/Wear-A-Mask@master/assets/demo.png)

## 小程序技术实现（摘自 [jasscia/ChristmasHat](https://github.com/jasscia/ChristmasHat)）

### 程序结构

- image (在此放置所有圣诞帽的素材)
- pages (包含了 index imageeditor combine 文件夹，每个文件夹中都有四个文件，后缀名分别为 .js .json .wxss .wxml)
  - index (第一步：选择底图，程序设计三个底图来源 即微信头像、相机、相册)
  - imageeditor(第二步：实现选择圣诞帽 并通过移动和旋转调整圣诞帽的大小和位置)
  - combine(第三步：将底图和调整后的圣诞帽合成新的图片 并保存至微信相册)
- app.js
- app.json
- app.wxss
- project.config.json

### 核心算法介绍

- 核心算法 1:怎么实现 帽子的实时转动
  - 当 touchstart 时，保存此时的 touch 起始点，并以此时的底图和帽子位置作为旋转角度和缩放比例值计算的参考点
  - 当 touchmove 时，根据起始点 和 临时的终止点 计算在 x/y 方向上的移动距离，计算参考点分别 加上这个距离，得到移动后的位置，通过移动前后的位置 计算移动前后位置的变动 计算旋转角和缩放比例
  - 当 touchend 时，重置底图和帽子的位置及旋转角和缩放比例
- 核心算法 2:怎么实现 合成图片(利用 canvas)
  - 首先绘制底图（根据屏幕大小、图片大小计算左上角和右下角坐标）
  - 绘制帽子（计算最终帽子的大小及中心位置 旋转角度,移动画布原点到帽子的中心位置，旋转画布 并绘制帽子）

## 项目依赖

* [jasscia/ChristmasHat](https://github.com/jasscia/ChristmasHat)
* [Tencent/weui-wxss](https://github.com/Tencent/weui-wxss)
* [jasondu/wxa-plugin-canvas](https://github.com/jasondu/wxa-plugin-canvas)
