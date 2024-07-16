## CentOS 7.x 防火墙配置指南

防火墙是保障系统安全的一个重要组件，通过对进出网络流量的控制，可以有效防止未经授权的访问。本文将详细介绍如何在 CentOS 7.x 上配置和管理防火墙。

### 1. 查看 Firewall 服务状态
要检查 `firewalld` 服务的运行状态，可以使用以下命令：
```bash
systemctl status firewalld
```
该命令将显示 `firewalld` 服务的当前状态，例如是否正在运行、是否启用等。

![Firewall 服务状态](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202407162136549.png)

### 2. 查看 Firewall 的状态
要简单地查看 `firewalld` 服务是否正在运行，可以使用：
```bash
firewall-cmd --state
```
该命令将返回 `running` 表示防火墙正在运行，返回 `not running` 则表示防火墙未运行。

![Firewall 状态](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202407162137753.png)

### 3. 启动、重启、停止 `firewalld` 服务
根据需要，可以启动、重启或停止 `firewalld` 服务：
```bash
# 启动服务
service firewalld start

# 重启服务
service firewalld restart

# 停止服务
service firewalld stop
```
这些命令可以帮助你在不同情况下控制 `firewalld` 服务的运行状态。

### 4. 查看防火墙规则
要查看当前防火墙的全部规则，可以使用：
```bash
firewall-cmd --list-all
```
该命令会列出所有的区域和相关的规则配置，包括已开放的端口、服务、转发规则等信息。

![防火墙规则](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202407162137259.png)

### 5. 查询、开放、关闭端口
防火墙允许你查询特定端口的状态以及开放或关闭端口。以下是一些常用的命令：

**查询端口是否开放：**
```bash
firewall-cmd --query-port=80/tcp
```
**开放端口：**
```bash
# 开放80端口
firewall-cmd --permanent --add-port=80/tcp

# 开放5000-6000端口
firewall-cmd --permanent --add-port=5000-6000/tcp
```
**关闭端口：**
```bash
# 移除80端口
firewall-cmd --permanent --remove-port=80/tcp
```
注意：`--permanent` 参数表示持久化更改，需要重启防火墙以应用新配置：
```bash
firewall-cmd --reload
```

### 6. 其他常用防火墙操作

**查看特定区域的规则：**
```bash
firewall-cmd --zone=public --list-all
```
**添加服务到特定区域：**
```bash
firewall-cmd --zone=public --add-service=http --permanent
```
**移除服务：**
```bash
firewall-cmd --zone=public --remove-service=http --permanent
```

**设置默认区域：**
```bash
firewall-cmd --set-default-zone=public
```

通过以上操作，你可以灵活地管理 CentOS 7.x 系统的防火墙，确保系统的网络安全。
