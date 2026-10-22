# 小芽早教移动端（Expo + React Native）

同一套 TypeScript 移动应用可运行在 iOS 和 Android。移动端与网站共用 `content/` 下的活动、家长课堂和成长占位内容；现有 MVP 不包含账号、后端和数据收集。

## 环境与启动

需要 Node.js 20.19+（建议使用 Node 22）以及 Expo Go，或已安装 iOS Simulator / Android Emulator 的开发环境。

```sh
npm install
npm run mobile
```

Expo 启动后可用 Expo Go 扫码运行；也可以使用 `npm run mobile:ios` 或 `npm run mobile:android` 在已配置的模拟器中启动。首次运行 Expo Go 时，确保手机与开发电脑在同一网络。

## 校验

```sh
npm run mobile:typecheck
```

## 功能

- 首页：24–36 月龄选择、本地保存、能力筛选、随机活动推荐。
- 活动：列表与能力筛选、材料清单、安全说明、分步陪玩模式。
- 成长地图：6 个领域的 24–36 月龄占位内容，并始终显示待专家审核提示。
- 家长课堂与搜索：本地搜索活动、文章；文章标记审核状态。
- 绘本：亲子共读提示与封面占位图，不包含完整歌词或扫描页。
- 关于：免责声明、审核说明与隐私说明。
- 跟随系统浅色/深色外观。

月龄偏好通过 AsyncStorage 保存在设备本地。项目默认不上传儿童或家庭数据。
