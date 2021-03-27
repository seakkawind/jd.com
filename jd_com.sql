-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-03-27 10:54:13
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `jd.com`
--

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL COMMENT '商品id',
  `title` varchar(255) NOT NULL COMMENT '商品标题',
  `price` double NOT NULL COMMENT '商品价格',
  `color` varchar(255) NOT NULL COMMENT '选择颜色',
  `picture` varchar(255) NOT NULL COMMENT '商品图片',
  `attrs` varchar(255) NOT NULL COMMENT '选择版本1',
  `version` varchar(255) NOT NULL COMMENT '选择版本2',
  `details` text NOT NULL COMMENT '商品详情'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `title`, `price`, `color`, `picture`, `attrs`, `version`, `details`) VALUES
(1, 'Apple AirPods Pro 主动降噪无线蓝牙耳机适用iPhone/iPad/Apple Watch', 1799, '[{\"color\":\"公开版\"},{\"color\":\"【官方AppleCare+版】\"}]', '[{\"src\": \"../img/product/airpods-1.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/airpods-2.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/airpods-3.jpg\",\"alt\": \"\"},{\"src\": \"../img/product/airpods-4.jpg\",\"alt\": \"\"},\r\n{\"src\": \"../img/product/airpods-5.jpg\",\"alt\": \"\"}]', '[{\"attrs\":\"优惠套装1\"},{\"attrs\":\"优惠套装2\"},{\"attrs\":\"优惠套装3\"},{\"attrs\":\"优惠套装4\"}]', '[{\"attrs\":\"官方AC+\"},{\"attrs\":\"3年全保修\"},{\"attrs\":\"延保至2年\"}]', '\"../img/product/airpods-details.png\"'),
(2, 'Apple iPad Air 10.9英寸平板电脑（2020年新款64GWLAN版/A14芯片/触控ID/全面屏MYFQ2CH/A）', 4799, '[{\"color\":\"深空灰色\"},{\"color\":\"银色\"},{\"color\":\"玫瑰金色\"},{\"color\":\"绿色\"},{\"color\":\"天蓝色\"}]', '[{\"src\": \"../img/product/ipad-1.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/ipad-2.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/ipad-3.jpg\",\"alt\": \"\"},{\"src\": \"../img/product/ipad-4.jpg\",\"alt\": \"\"},\r\n{\"src\": \"../img/product/ipad-5.jpg\",\"alt\": \"\"}]', '[{\"attrs\":\"WLAN版 64G\"},{\"attrs\":\"WLAN版 256G\"},{\"attrs\":\"Cellular版 64G\"},{\"attrs\":\"Celluar版 256G\"}]', '[{\"attrs\":\"官方标配\"},{\"attrs\":\"教育优惠版\"},{\"attrs\":\"Pencil套装版\"},{\"attrs\":\"官方AppleCare++版\"},\r\n{\"attrs\":\"换无忧年费版\"},{\"attrs\":\"键盘套装\"}]', '\"../img/product/ipad-details.jpg\"'),
(3, 'Apple iPhone 12 (A2404)128GB黑色支持移动联通电信5G双卡双待手机', 6799, '[{\"color\":\"黑色\"},{\"color\":\"白色\"},{\"color\":\"蓝色\"},{\"color\":\"绿色\"},{\"color\":\"红色\"}]', '[{\"src\": \"../img/product/iphone-1.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/iphone-2.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/iphone-3.jpg\",\"alt\": \"\"},{\"src\": \"../img/product/iphone-4.jpg\",\"alt\": \"\"},\r\n{\"src\": \"../img/product/iphone-5.jpg\",\"alt\": \"\"}]', '[{\"attrs\":\"64G\"},{\"attrs\":\"128G\"},{\"attrs\":\"256G\"}]', '[{\"attrs\":\"官方标配\"}]', '\"../img/product/iphone-details.jpg\"'),
(4, 'Apple Watch Series 6 智能手表GPS款 40毫米蓝色 铝金属表壳海军蓝色运动型表带 MG143CH/A', 3199, '[{\"color\":\"黑色\"},{\"color\":\"白色\"},{\"color\":\"深海军蓝色\"},{\"color\":\"粉色\"},{\"color\":\"红色\"}]', '[{\"src\": \"../img/product/iwatch-1.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/iwatch-2.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/iwatch-3.jpg\",\"alt\": \"\"},{\"src\": \"../img/product/iwatch-4.jpg\",\"alt\": \"\"},\r\n{\"src\": \"../img/product/iwatch-5.jpg\",\"alt\": \"\"}]', '[{\"attrs\":\"GPS款 40毫米\"},{\"attrs\":\"GPS 44毫米\"},{\"attrs\":\"GPS+蜂窝款 40毫米\"},{\"attrs\":\"GPS+蜂窝款 44毫米\"}]', '[{\"attrs\":\"官方标配\"},{\"attrs\":\"贴膜套装\"},{\"attrs\":\"官方AppleCare+\"}]', '\"../img/product/iwatch-details.jpg\"'),
(5, 'Apple MacBook Pro 13.3新款八核M1芯片8G256GSSD深空灰笔记本电脑轻薄本 MYD82CH/A', 9999, '[{\"color\":\"深空色\"},{\"color\":\"银色\"}]', '[{\"src\": \"../img/product/mac-1.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/mac-2.jpg\",\"alt\": \"\"}, {\"src\": \"../img/product/mac-3.jpg\",\"alt\": \"\"},{\"src\": \"../img/product/mac-4.jpg\",\"alt\": \"\"},\r\n{\"src\": \"../img/product/mac-5.jpg\",\"alt\": \"\"}]', '[{\"attrs\":\"新款八核M1芯片8G 256G\"},{\"attrs\":\"新款八核M1芯片8G 512G\"},{\"attrs\":\"新款八核M1芯片16G 256G\"},{\"attrs\":\"新款八核M1芯片16G 512G\"}]', '[{\"attrs\":\"官方标配\"},{\"attrs\":\"爆款定制\"},{\"attrs\":\"妙控鼠标套装\"},{\"attrs\":\"官方AppleCare+\"}]', '\"../img/product/mac-details.jpg\"');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(2) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'root', 'root'),
(2, 'haifeng', 'haifeng'),
(15, 'wangwu', 'wangwu'),
(13, 'zhangsan', 'zhangsan');

--
-- 转储表的索引
--

--
-- 表的索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id', AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
