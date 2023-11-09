<mark>**本项目迁移到Github，[点击这里查看](https://github.com/Zhoucheng133/netPlayer-PWA)**</mark>
# netPlayer PWA

## 简介

<img src="build/icon.png" width="100px">

![vue](https://img.shields.io/badge/vue.js-2.6.14-green?logo=vue.js)
![Antd](https://img.shields.io/badge/Antd-1.7.8-blue)
![axios](https://img.shields.io/badge/axios-1.4-orange)
![crypto-js](https://img.shields.io/badge/crypto_js-4.1.1-yellow)
![bootstrap-icons](https://img.shields.io/badge/bootstrap_icons-1.11.1-purple)

![License](https://img.shields.io/badge/License-MIT-dark_green)

**基于Subsonic API的Web (PWA)端播放器**

关于桌面版的netPlayer，你可以在这里查看：[Gitee](https://gitee.com/Ryan-zhou/net-player) / [Github](https://github.com/Zhoucheng133/net-player)  
关于移动版的netPlayer，你可以在这里查看：[Gitee](https://gitee.com/Ryan-zhou/net-player-mobile) / [Github](https://github.com/Zhoucheng133/netPlayer-Mobile)  
关于移动Lite的netPlayer，你可以在这里查看：[Gitee](https://gitee.com/Ryan-zhou/net-player_-lite) / [Github](https://github.com/Zhoucheng133/neyPlayer_Lite)


|                          | netPlayer                       | netPlayer Mobile                                             | netPlayer Lite                                               | netPlayer PWA         |
| ------------------------ | ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------- |
| 兼容系统                 | Windows<br />macOS<br />Linux ⭕ | iOS<br />Android<br />Web (PWA) <sup>1</sup><br />Windows❗<br />macOS❗<br />Linux❗ | iOS<br />Android<br />Web (PWA) ⭕<br />Windows❗<br />macOS❗<br />Linux❗ | Web (PWA)<sup>1</sup> |
| 基于                     | Vue & Electron                  | Flutter                                                      | Flutter                                                      | Vue                   |
| 登录                     | ✅                               | ✅                                                            | ✳️                                                            | ✅                     |
| 通过系统控制<sup>1</sup> | ✅                               | ✅                                                            | ✅                                                            | ✅                     |
| 查看所有歌曲             | ✅                               | ✅                                                            | ❌                                                            | ✅                     |
| 查看歌单                 | ✅                               | ✅                                                            | ❌                                                            | ✅                     |
| 查看喜欢的歌曲           | ✅                               | ✅                                                            | ❌                                                            | ✅                     |
| 搜索                     | ✅                               | ✅                                                            | ❌                                                            | ✅                     |
| 播放顺序                 | 顺序/随机                       | 顺序/随机                                                    | 随机                                                         | 顺序/随机             |
| 添加到喜欢               | ✅                               | ✅                                                            | ❌                                                            | ✅                     |
| 添加到歌单               | ✅                               | ✅                                                            | ❌                                                            | ✅                     |
| 删除歌单                 | ✅                               | ✅                                                            | ❌                                                            | 放弃开发              |
| 编辑歌单                 | ✅                               | ✅                                                            | ❌                                                            | ❌                     |

⭕：理论上支持，但是没有做测试  
❗：理论上支持，但是不推荐在该平台上运行

✅：支持  
❌：不支持  
✳️：有限的支持

1：对于所有需要运行在iOS设备上的PWA应用程序，**可能**因为苹果的后台管理政策无法实现自动播放下一首和系统控制功能，如果你希望在iOS设备上正确的工作，可以使用纯Web模式使用浏览器打开

**相对于Mobile版本，PWA版本在iOS平台以PWA方式安装的时候如果放在前台可以自动切换下一首**

## 更新日志

### v1.0.0 (2023/10/13)
- 第一个版本