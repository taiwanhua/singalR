/*
需要先建立openauthdb資料庫
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'AppId',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '應用名稱',
  `AppSecret` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '應用金鑰',
  `Description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '應用描述',
  `Icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '應用圖示',
  `Disable` tinyint(4) NOT NULL COMMENT '是否可用',
  `CreateTime` date NOT NULL COMMENT '建立日期',
  `CreateUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立人',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '應用' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of application
-- ----------------------------
INSERT INTO `application` VALUES ('110', 'OpenAuth.Net', 'openauthdotnetyubaolee', '最好用的.NET許可權工作流框架', NULL, 0, '2018-04-14', NULL);
INSERT INTO `application` VALUES ('119', 'XXX管理平臺', 'manageryubaolee', '這是一個第三的平臺', NULL, 0, '2018-04-14', NULL);


-- ----------------------------
-- Table structure for buildertable
-- ----------------------------
DROP TABLE IF EXISTS `buildertable`;
CREATE TABLE `buildertable`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '編號',
  `TableName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '表英文全稱',
  `Comment` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '表描述、中文名稱',
  `DetailTableName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '子表英文全稱',
  `DetailComment` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '子表描述、中文名稱',
  `ClassName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '實體類名稱',
  `Namespace` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名稱空間',
  `ModuleCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '模組標識',
  `ModuleName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '模組名稱',
  `Folder` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '程式碼相對資料夾路徑',
  `Options` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '其它產生選項',
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分類ID',
  `TypeName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分類名稱',
  `CreateTime` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '建立人ID',
  `UpdateTime` datetime(0) NULL DEFAULT NULL COMMENT '修改時間',
  `UpdateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人ID',
  `UpdateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人姓名',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '建立人姓名',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '程式碼產生器的表資訊' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for buildertablecolumn
-- ----------------------------
DROP TABLE IF EXISTS `buildertablecolumn`;
CREATE TABLE `buildertablecolumn`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '編號',
  `TableId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '歸屬表編號',
  `TableName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '表名稱',
  `ColumnName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '列名稱',
  `Comment` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '列描述',
  `ColumnType` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '列型別',
  `EntityType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '實體型別',
  `EntityName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '實體名稱',
  `IsKey` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否主鍵',
  `IsIncrement` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否自增',
  `IsRequired` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否必填',
  `IsInsert` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否為插入欄位',
  `IsEdit` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否編輯欄位',
  `IsList` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否列表欄位',
  `IsQuery` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否查詢欄位',
  `QueryType` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '查詢方式（等於、不等於、大於、小於、範圍）',
  `HtmlType` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '顯示型別（文字框、文字域、下拉框、覈取方塊、單選框、日期控制元件）',
  `EditType` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '編輯型別（文字框、文字域、下拉框、覈取方塊、單選框、日期控制元件）',
  `Sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `CreateTime` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '建立人ID',
  `UpdateTime` datetime(0) NULL DEFAULT NULL COMMENT '修改時間',
  `UpdateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人ID',
  `EditRow` int(11) NULL DEFAULT NULL COMMENT '修改時的行位置',
  `EditCol` int(11) NULL DEFAULT NULL COMMENT '修改時的列位置',
  `UpdateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人姓名',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '建立人姓名',
  `MaxLength` int(11) NULL DEFAULT NULL COMMENT '最大長度',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '程式碼產生器的欄位資訊' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ' ' COMMENT '分類名稱或描述',
  `DtCode` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分類標識',
  `DtValue` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '通常與分類標識一致，但萬一有不一樣的情況呢？',
  `Enable` tinyint(1) NOT NULL DEFAULT 0,
  `SortNo` int(11) NOT NULL DEFAULT 0 COMMENT '排序號',
  `Description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CreateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人ID',
  `CreateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人',
  `UpdateTime` datetime(0) DEFAULT NULL COMMENT '最後更新時間',
  `UpdateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人ID',
  `UpdateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '分類表，也可用作數據字典。表示一個全集，比如：男、女、未知。關聯的分類型別表示按什麼進行的分類，如：按照性別對人類對像集' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('01a2736c-cebe-43a2-8068-7e3f88fa7c23', '審核', 'SYS_ORDERSTATUS_CHECK', 'SYS_ORDERSTATUS_CHECK', 1, 0, '', 'SYS_ORDERSTATUS', '2019-10-29 21:20:40', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:20:40', '', '');
INSERT INTO `category` VALUES ('07d21d6d-3bce-4b73-8273-c9f948f468fe', '釋放', 'PICKSTATUS_RELEASE', 'PICKSTATUS_RELEASE', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:29:35', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:29:35', '', '');
INSERT INTO `category` VALUES ('08776116-d1bf-40d1-b7ff-78b7392f4aef', '自提', 'SYS_SHIPTYPE_NORMAL', 'SYS_SHIPTYPE_NORMAL', 1, 0, '', 'SYS_SHIPTYPE', '2019-11-07 01:19:12', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:19:12', '', '');
INSERT INTO `category` VALUES ('1979955b-901d-4394-8a3c-f81c32970365', '中藥材', 'SYS_GOODSTYPE_TCM', 'SYS_GOODSTYPE_TCM', 1, 0, '', 'SYS_GOODSTYPE', '2019-11-07 01:17:36', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:17:36', '', '');
INSERT INTO `category` VALUES ('2615b6bf-7fc3-46e1-8105-708dda0e6c42', '發貨完成', 'PICKSTATUS_OUTSTOCK', 'PICKSTATUS_OUTSTOCK', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:32:02', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:32:02', '', '');
INSERT INTO `category` VALUES ('354f50b7-0d93-43d6-a721-a4931c650ea3', '建立', 'SYS_ORDERSTATUS_CREATE', 'SYS_ORDERSTATUS_CREATE', 1, 0, '', 'SYS_ORDERSTATUS', '2019-10-29 21:20:02', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:20:02', '', '');
INSERT INTO `category` VALUES ('43303bfb-11e3-4e12-8cdd-2ef090017e4c', '樣品入庫', 'SYS_INBOUNDTYPE_SAMPLE', 'SYS_INBOUNDTYPE_SAMPLE', 1, 0, '', 'SYS_INBOUNDTYPE', '2019-11-07 00:51:26', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 00:51:26', '', '');
INSERT INTO `category` VALUES ('4de1cf0d-b1f5-44f7-a329-4b5fcff73ca6', '普藥', 'SYS_GOODSTYPE_COMMON', 'SYS_GOODSTYPE_COMMON', 1, 0, '', 'SYS_GOODSTYPE', '2019-11-07 01:15:35', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:15:35', '', '');
INSERT INTO `category` VALUES ('52f662c3-39bc-4f5a-9730-107cf26b12f0', '直送', 'SYS_SHIPTYPE_DIRECT', 'SYS_SHIPTYPE_DIRECT', 1, 0, '', 'SYS_SHIPTYPE', '2019-11-07 01:19:41', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:19:41', '', '');
INSERT INTO `category` VALUES ('74f7bcc8-50a3-4c02-9a25-ee2fa4575e25', '集貨完成', 'PICKSTATUS_STAGED', 'PICKSTATUS_STAGED', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:31:11', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:31:11', '', '');
INSERT INTO `category` VALUES ('77a7f565-cb5c-4876-a139-7901e54b5dde', '正常', 'SYS_STATUS_OK', '0', 0, 0, '', 'SYS_STATUS', '2019-11-06 10:38:46', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-06 10:38:46', '', '');
INSERT INTO `category` VALUES ('7fbeb155-8fbb-44ce-a726-2a6fea7920d5', '異常', 'SYS_STATUS_ERROR', '1', 1, 0, '', 'SYS_STATUS', '2019-11-06 10:39:24', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-06 10:39:24', '', '');
INSERT INTO `category` VALUES ('845ef9f2-4d33-4887-acf0-6d45fdf5e05c', 'EMS', 'SYS_SHIPTYPE_EMS', 'SYS_SHIPTYPE_EMS', 1, 0, '', 'SYS_SHIPTYPE', '2019-11-07 01:20:45', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:20:45', '', '');
INSERT INTO `category` VALUES ('8641c594-e43e-4469-a5b5-5da06a53eaf9', '打包完成', 'PICKSTATUS_PACK', 'PICKSTATUS_PACK', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:31:50', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:31:50', '', '');
INSERT INTO `category` VALUES ('86b8d963-63b6-4936-87b1-af248cd26c44', '已完成', 'SYS_ORDERSTATUS_FINISHED', 'SYS_ORDERSTATUS_FINISHED', 1, 0, '', 'SYS_ORDERSTATUS', '2019-10-29 21:27:32', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:27:32', '', '');
INSERT INTO `category` VALUES ('8dcbc59a-c045-4e06-ad13-095cfe9a3209', '銷退入庫', 'SYS_INBOUNDTYPE_RETURN', 'SYS_INBOUNDTYPE_RETURN', 1, 0, '', 'SYS_INBOUNDTYPE', '2019-11-07 00:52:04', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 00:52:04', '', '');
INSERT INTO `category` VALUES ('9bddbcfd-f41e-429f-b112-76db0c1bf0f3', '覆核完成', 'PICKSTATUS_CHECKED', 'PICKSTATUS_CHECKED', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:30:37', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:30:37', '', '');
INSERT INTO `category` VALUES ('a4017f4d-c113-4ec9-bdcb-d9c49019a916', '生物製品', 'SYS_GOODSTYPE_BIOLPROD', 'SYS_GOODSTYPE_BIOLPROD', 1, 0, '', 'SYS_GOODSTYPE', '2019-11-07 01:16:59', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:16:59', '', '');
INSERT INTO `category` VALUES ('b1d4301b-2378-4598-9b96-8592afbb64d1', '快取完成', 'PICKSTATUS_CACHE', 'PICKSTATUS_CACHE', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:30:53', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:30:53', '', '');
INSERT INTO `category` VALUES ('b44bb9f4-166c-4c59-a693-baacd01d2db4', '4+7集中採購', 'SYS_SHIPTYPE_FREIGHT', 'SYS_SHIPTYPE_FREIGHT', 1, 0, '', 'SYS_SHIPTYPE', '2019-11-07 01:20:21', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:20:21', '', '');
INSERT INTO `category` VALUES ('b77f4a7d-0d22-47dd-97d1-7f8ccd9e5f77', '採購入庫', 'SYS_INBOUNDTYPE_PURCHASE', 'SYS_INBOUNDTYPE_PURCHASE', 1, 0, '', 'SYS_INBOUNDTYPE', '2019-11-07 00:50:51', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 00:50:51', '', '');
INSERT INTO `category` VALUES ('c3ce85b1-0115-47d4-b562-1bbcc51105e2', '食品', 'SYS_GOODSTYPE_FOOD', 'SYS_GOODSTYPE_FOOD', 1, 0, '', 'SYS_GOODSTYPE', '2019-11-07 01:17:58', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:17:58', '', '');
INSERT INTO `category` VALUES ('d2dd6a7f-797e-4ff2-96cc-56bf9fbfc24b', '裝車完成', 'PICKSTATUS_CAR', 'PICKSTATUS_CAR', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:31:27', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:31:27', '', '');
INSERT INTO `category` VALUES ('d8152952-cf55-40ba-af81-0d4863247d6a', '揀選完成', 'PICKSTATUS_PICKFINISH', 'PICKSTATUS_PICKFINISH', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:30:16', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:30:16', '', '');
INSERT INTO `category` VALUES ('de4ccb7b-19e4-4203-a092-b2d8bafe3131', '揀選執行中', 'PICKSTATUS_PICKEXECUTE', 'PICKSTATUS_PICKEXECUTE', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:29:55', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:29:55', '', '');
INSERT INTO `category` VALUES ('e6292744-a6e8-4a6f-b077-14bd35e31a27', '建立', 'PICKSTATUS_CREATE', 'PICKSTATUS_CREATE', 1, 0, '', 'SYS_PICKSTATUS', '2019-10-29 21:29:18', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:29:18', '', '');
INSERT INTO `category` VALUES ('faef67e8-48e4-44e5-981c-eebb78d79a0f', '已處理', 'SYS_ORDERSTATUS_DISPOSED', 'SYS_ORDERSTATUS_DISPOSED', 1, 0, '', 'SYS_ORDERSTATUS', '2019-10-29 21:27:05', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-10-29 21:27:05', '', '');
INSERT INTO `category` VALUES ('fe1f7181-d3d0-4b0e-b9b3-5d05b503ff0e', '醫療器械', 'SYS_GOODSTYPE_MEDINSTR', 'SYS_GOODSTYPE_MEDINSTR', 1, 0, '', 'SYS_GOODSTYPE', '2019-11-07 01:16:02', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:16:02', '', '');

-- ----------------------------
-- Table structure for categorytype
-- ----------------------------
DROP TABLE IF EXISTS `categorytype`;
CREATE TABLE `categorytype`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分類表ID',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名稱',
  `CreateTime` datetime(0) NOT NULL COMMENT '建立時間',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '分類型別' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of categorytype
-- ----------------------------
INSERT INTO `categorytype` VALUES ('SYS_CUSTTYPE', '客戶型別', '2019-11-07 00:49:50');
INSERT INTO `categorytype` VALUES ('SYS_GOODSTYPE', '商品類別', '2019-11-07 00:48:47');
INSERT INTO `categorytype` VALUES ('SYS_INBOUNDTYPE', '入庫型別', '2019-11-07 00:48:08');
INSERT INTO `categorytype` VALUES ('SYS_ORDERSTATUS', '訂單狀態', '2019-10-29 21:18:56');
INSERT INTO `categorytype` VALUES ('SYS_ORDERTYPE', '訂單型別', '2019-10-29 21:18:32');
INSERT INTO `categorytype` VALUES ('SYS_PICKSTATUS', '揀選任務狀態', '2019-10-29 21:28:50');
INSERT INTO `categorytype` VALUES ('SYS_SHIPTYPE', '承運方式', '2019-11-07 00:47:36');
INSERT INTO `categorytype` VALUES ('SYS_STATUS', '系統狀態', '2019-11-06 10:38:17');
INSERT INTO `categorytype` VALUES ('USERTYPE', '按使用者型別分類', '2017-11-29 21:27:42');

-- ----------------------------
-- Table structure for dataprivilegerule
-- ----------------------------
DROP TABLE IF EXISTS `dataprivilegerule`;
CREATE TABLE `dataprivilegerule`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '數據ID',
  `SourceCode` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '資源標識（模組編號）',
  `SubSourceCode` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '二級資源標識',
  `Description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ' ' COMMENT '許可權描述',
  `SortNo` int(11) NOT NULL DEFAULT 0 COMMENT '排序號',
  `PrivilegeRules` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ' ' COMMENT '許可權規則',
  `Enable` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用',
  `CreateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人ID',
  `CreateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人',
  `UpdateTime` datetime(0) DEFAULT NULL COMMENT '最後更新時間',
  `UpdateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人ID',
  `UpdateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系統授權規制表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dataprivilegerule
-- ----------------------------
INSERT INTO `dataprivilegerule` VALUES ('5098523e-f038-4bc8-850f-9629cac3e4f6', 'Form', '', '只能看到使用者自己對應部門的表單,System可以看到所有', 0, '{\"Operation\":\"or\",\"Filters\":[{\"Key\":\"OrgId\",\"Value\":\"{loginOrg}\",\"Contrast\":\"in\",\"names\":\"\",\"Text\":\"\"}]}', 1, '2020-03-18 23:36:05', '00000000-0000-0000-0000-000000000000', '', '2020-03-19 21:14:34', '00000000-0000-0000-0000-000000000000', '');
INSERT INTO `dataprivilegerule` VALUES ('6a96c5d9-a226-459d-a4e1-aefcbefc6915', 'WmsInboundOrderTbl', '', '【管理員】角色可以看所有人的訂單，【測試】只能看自己建立的訂單', 0, '{\"Operation\":\"or\",\"Filters\":[{\"Key\":\"{loginRole}\",\"Value\":\"09ee2ffa-7463-4938-ae0b-1cb4e80c7c13,77e6d0c3-f9e1-4933-92c3-c1c6eef75593\",\"Contrast\":\"contains\",\"names\":\"\",\"Text\":\"管理員,神\"}],\"Children\":[{\"Operation\":\"and\",\"Filters\":[{\"Key\":\"{loginRole}\",\"Value\":\"0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d\",\"Contrast\":\"contains\",\"Text\":\"測試\"},{\"Key\":\"CreateUserId\",\"Value\":\"{loginUser}\",\"Contrast\":\"==\",\"Text\":\"\"}]}]}', 1, '2019-11-23 01:02:32', '00000000-0000-0000-0000-000000000000', '', '2019-11-23 01:02:32', '', '');
INSERT INTO `dataprivilegerule` VALUES ('ab177ea0-89f3-429e-8f0f-7a00819d8ef3', 'FlowScheme', '', 'System可以看到所有流程設計，【管理員】可以看到部門的，其他人只能看到自己的', 0, '{\"Operation\":\"or\",\"Filters\":[{\"Key\":\"CreateUserId\",\"Value\":\"{loginUser}\",\"Contrast\":\"==\",\"Text\":\"\"}],\"Children\":[{\"Operation\":\"and\",\"Filters\":[{\"Key\":\"OrgId\",\"Value\":\"{loginOrg}\",\"Contrast\":\"in\",\"Text\":\"\"},{\"Key\":\"{loginRole}\",\"Value\":\"09ee2ffa-7463-4938-ae0b-1cb4e80c7c13\",\"Contrast\":\"contains\",\"Text\":\"管理員\"}]}]}', 1, '2020-03-19 21:17:30', '00000000-0000-0000-0000-000000000000', '', '2020-03-19 21:57:47', '00000000-0000-0000-0000-000000000000', '');
INSERT INTO `dataprivilegerule` VALUES ('e7c95fb1-91f7-422e-a11a-73cea0c404b9', 'Resource', NULL, '【管理員】角色可以看所有人的資源，【測試】只能看自己建立的資源，賬號test3/test4只能看屬於（XXX管理平臺）的資源', 0, '{\"Operation\":\"or\",\"Filters\":[{\"Key\":\"{loginRole}\",\"Value\":\"09ee2ffa-7463-4938-ae0b-1cb4e80c7c13\",\"Contrast\":\"contains\",\"Text\":\"管理員\"}],\"Children\":[{\"Operation\":\"and\",\"Filters\":[{\"Key\":\"{loginRole}\",\"Value\":\"0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d\",\"Contrast\":\"contains\",\"Text\":\"測試\"},{\"Key\":\"CreateUserId\",\"Value\":\"{loginUser}\",\"Contrast\":\"==\",\"Text\":\"\"}]},{\"Operation\":\"and\",\"Filters\":[{\"Key\":\"AppName\",\"Value\":\"XXX管理平臺\",\"Contrast\":\"==\",\"Text\":\"\"},{\"Key\":\"{loginUser}\",\"Value\":\"229f3a49-ab27-49ce-b383-9f10ca23a9d5,1df68dfd-3b6d-4491-872f-00a0fc6c5a64\",\"Contrast\":\"in\",\"Text\":\"test3,test4\"}]}]}', 1, '2019-10-29 11:05:02', '00000000-0000-0000-0000-000000000000', '', '2019-11-23 01:00:19', '00000000-0000-0000-0000-000000000000', '');

-- ----------------------------
-- Table structure for flowinstance
-- ----------------------------
DROP TABLE IF EXISTS `flowinstance`;
CREATE TABLE `flowinstance`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主鍵Id',
  `InstanceSchemeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '流程實例模板Id',
  `Code` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '實例編號',
  `CustomName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '自定義名稱',
  `ActivityId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '當前節點ID',
  `ActivityType` int(11) DEFAULT NULL COMMENT '當前節點型別（0會簽節點）',
  `ActivityName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '當前節點名稱',
  `PreviousId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '前一個ID',
  `SchemeContent` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '流程模板內容',
  `SchemeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '流程模板ID',
  `DbName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '資料庫名稱',
  `FrmData` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '表單數據',
  `FrmType` int(11) NOT NULL COMMENT '表單型別',
  `FrmContentData` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '表單中的控制元件屬性描述',
  `FrmContentParse` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '表單控制元件位置模板',
  `FrmId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '表單ID',
  `SchemeType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '流程型別',
  `Disabled` int(11) NOT NULL COMMENT '有效標誌',
  `CreateDate` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者主鍵',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者',
  `FlowLevel` int(11) NOT NULL COMMENT '等級',
  `Description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '實例備註',
  `IsFinish` int(11) NOT NULL COMMENT '是否完成',
  `MakerList` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '執行人',
  `OrgId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬部門',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '工作流流程實例表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of flowinstance
-- ----------------------------
INSERT INTO `flowinstance` VALUES ('034ad4f0-95e6-40bf-b3c5-38bd60b542d9', '', '1564334796391', '會簽2019-07-29 01:26:40', '1564334444885', 4, 'node_7', '1564334437844', '{\"title\":\"newFlow_1\",\"initNum\":16,\"lines\":[{\"id\":\"1564334446774\",\"type\":\"sl\",\"from\":\"1564334430924\",\"to\":\"1564334435460\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334447796\",\"type\":\"sl\",\"from\":\"1564334435460\",\"to\":\"1564334437844\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334448572\",\"type\":\"sl\",\"from\":\"1564334437844\",\"to\":\"1564334439828\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334449628\",\"type\":\"sl\",\"from\":\"1564334437844\",\"to\":\"1564334440404\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334450572\",\"type\":\"sl\",\"from\":\"1564334439828\",\"to\":\"1564334441965\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334451684\",\"type\":\"sl\",\"from\":\"1564334440404\",\"to\":\"1564334441965\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334453900\",\"type\":\"sl\",\"from\":\"1564334441965\",\"to\":\"1564334444885\",\"name\":\"\",\"dash\":false,\"Compares\":null}],\"nodes\":[{\"id\":\"1564334430924\",\"name\":\"node_1\",\"type\":\"start round mix\",\"left\":17,\"top\":12,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null},{\"id\":\"1564334435460\",\"name\":\"node_2\",\"type\":\"node\",\"left\":141,\"top\":49,\"width\":104,\"height\":26,\"alt\":true,\"setInfo\":{\"NodeDesignate\":null,\"NodeDesignateData\":null,\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":null,\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"test\",\"UserId\":\"6ba79766-faa0-4259-8139-a4a6d35784e0\",\"Description\":\"\",\"TagedTime\":\"2019-07-29 01:28\",\"NodeConfluenceType\":null,\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334437844\",\"name\":\"會簽入口，設定會簽型別\",\"type\":\"fork\",\"left\":141,\"top\":138,\"width\":104,\"height\":76,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"admin\",\"UserId\":\"49df1602-f5f3-4d52-afb7-3802da619558\",\"Description\":\"\",\"TagedTime\":\"2019-07-29 01:30\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":1,\"ConfluenceNo\":null}},{\"id\":\"1564334439828\",\"name\":\"admin\",\"type\":\"node\",\"left\":23,\"top\":272,\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"SPECIAL_USER\",\"NodeDesignateData\":{\"users\":[\"49df1602-f5f3-4d52-afb7-3802da619558\"],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"admin\",\"UserId\":\"49df1602-f5f3-4d52-afb7-3802da619558\",\"Description\":\"\",\"TagedTime\":\"2019-07-29 01:30\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334440404\",\"name\":\"test\",\"type\":\"node\",\"left\":234,\"top\":265,\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"SPECIAL_USER\",\"NodeDesignateData\":{\"users\":[\"6ba79766-faa0-4259-8139-a4a6d35784e0\"],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":null,\"UserName\":null,\"UserId\":null,\"Description\":null,\"TagedTime\":null,\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334441965\",\"name\":\"預設所有人\",\"type\":\"join\",\"left\":140,\"top\":406,\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"admin\",\"UserId\":\"49df1602-f5f3-4d52-afb7-3802da619558\",\"Description\":\"\",\"TagedTime\":\"2019-07-29 01:30\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334444885\",\"name\":\"node_7\",\"type\":\"end round\",\"left\":351,\"top\":420,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null}],\"areas\":[]}', '73819920-f085-4003-8874-4361b6461c92', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"1\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:26:45', '00000000-0000-0000-0000-000000000000', 'System', 0, '', 1, '', NULL);
INSERT INTO `flowinstance` VALUES ('0ae5abe6-f571-4e08-b264-667dc27c5025', '', '1564334583446', '帶複雜表單的2019-07-29 01:23:03', '1564334557205', 2, 'node_2', '1564334555981', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":66,\"top\":46,\"type\":\"start round mix\",\"id\":\"1564334555981\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":50,\"top\":145,\"type\":\"node\",\"id\":\"1564334557205\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"node_3\",\"left\":56,\"top\":206,\"type\":\"node\",\"id\":\"1564334557764\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"node_4\",\"left\":66,\"top\":294,\"type\":\"end round\",\"id\":\"1564334559716\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334555981\",\"to\":\"1564334557205\",\"id\":\"1564334561500\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334557205\",\"to\":\"1564334557764\",\"id\":\"1564334562229\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334557764\",\"to\":\"1564334559716\",\"id\":\"1564334563268\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":8}', '989bd1f3-29f0-43cd-ad01-b55654907dbb', 'FrmLeaveReq', '{\"id\":\"\",\"userName\":\"李玉寶\",\"requestType\":\"事假\",\"startDate\":\"2019-07-08T16:00:00.000Z\",\"startTime\":\"2019-07-28T17:23:14.000Z\",\"endDate\":\"2019-07-24T16:00:00.000Z\",\"endTime\":\"2019-07-28T17:23:18.000Z\",\"requestComment\":\"太累了，就是想休息一下\",\"attachment\":\"\",\"files\":[],\"extendInfo\":\"\"}', 1, '', '', '8faff4e5-b729-44d2-ac26-e899a228f63d', '', 0, '2019-07-29 01:23:57', '00000000-0000-0000-0000-000000000000', 'System', 0, '這種結構只能企業版使用', 0, '1', NULL);
INSERT INTO `flowinstance` VALUES ('0ee22872-f120-4c5a-84ec-7f4e36bd0141', '', '1564334742060', '帶分支條件的請假2019-07-29 01:25:44', '1564334139783', 4, 'node_2', '1564334156607', '{\"title\":\"newFlow_1\",\"initNum\":16,\"lines\":[{\"id\":\"1564334158551\",\"type\":\"sl\",\"from\":\"1564334138399\",\"to\":\"1564334153687\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334159304\",\"type\":\"sl\",\"from\":\"1564334153687\",\"to\":\"1564334154471\",\"name\":\"\",\"dash\":false,\"Compares\":[{\"Operation\":\"<\",\"FieldName\":\"DAYS\",\"FieldType\":null,\"Value\":\"3\"}]},{\"id\":\"1564334160383\",\"type\":\"sl\",\"from\":\"1564334153687\",\"to\":\"1564334155295\",\"name\":\"\",\"dash\":false,\"Compares\":[{\"Operation\":\">=\",\"FieldName\":\"DAYS\",\"FieldType\":null,\"Value\":\"3\"}]},{\"id\":\"1564334161911\",\"type\":\"sl\",\"from\":\"1564334154471\",\"to\":\"1564334156607\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334163959\",\"type\":\"sl\",\"from\":\"1564334155295\",\"to\":\"1564334156607\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334165255\",\"type\":\"sl\",\"from\":\"1564334156607\",\"to\":\"1564334139783\",\"name\":\"\",\"dash\":false,\"Compares\":null}],\"nodes\":[{\"id\":\"1564334138399\",\"name\":\"node_1\",\"type\":\"start round mix\",\"left\":44,\"top\":27,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null},{\"id\":\"1564334139783\",\"name\":\"node_2\",\"type\":\"end round\",\"left\":50,\"top\":295,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null},{\"id\":\"1564334153687\",\"name\":\"所有人可以審批\",\"type\":\"node\",\"left\":163,\"top\":43,\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"超級管理員\",\"UserId\":\"00000000-0000-0000-0000-000000000000\",\"Description\":\"\",\"TagedTime\":\"2019-07-29 01:26\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334154471\",\"name\":\"小於3的test可以審批\",\"type\":\"node\",\"left\":23,\"top\":141,\"width\":167,\"height\":76,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"SPECIAL_USER\",\"NodeDesignateData\":{\"users\":[\"6ba79766-faa0-4259-8139-a4a6d35784e0\"],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"test\",\"UserId\":\"6ba79766-faa0-4259-8139-a4a6d35784e0\",\"Description\":\"\",\"TagedTime\":\"2019-07-29 01:28\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334155295\",\"name\":\"大於3的admin可以審批\",\"type\":\"node\",\"left\":288,\"top\":146,\"width\":143,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"SPECIAL_USER\",\"NodeDesignateData\":{\"users\":[\"49df1602-f5f3-4d52-afb7-3802da619558\"],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":null,\"UserName\":null,\"UserId\":null,\"Description\":null,\"TagedTime\":null,\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334156607\",\"name\":\"預設\",\"type\":\"node\",\"left\":171,\"top\":291,\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"admin\",\"UserId\":\"49df1602-f5f3-4d52-afb7-3802da619558\",\"Description\":\"\",\"TagedTime\":\"2019-07-29 01:30\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}}],\"areas\":[]}', 'bfd4f0f9-6f61-4af9-977e-cbcf7c30dd35', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"1\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:25:56', '00000000-0000-0000-0000-000000000000', 'System', 0, '這個時執行完成的', 1, '', NULL);
INSERT INTO `flowinstance` VALUES ('20be4e87-0e9e-467c-9011-3c6ccd650931', '', '1564334643592', '會簽2019-07-29 01:24:05', '1564334435460', 2, 'node_2', '1564334430924', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":17,\"top\":12,\"type\":\"start round mix\",\"id\":\"1564334430924\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":141,\"top\":49,\"type\":\"node\",\"id\":\"1564334435460\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"會簽入口，設定會簽型別\",\"left\":141,\"top\":138,\"type\":\"fork\",\"id\":\"1564334437844\",\"width\":104,\"height\":76,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"admin\",\"left\":23,\"top\":272,\"type\":\"node\",\"id\":\"1564334439828\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"49df1602-f5f3-4d52-afb7-3802da619558\"],\"roles\":[]}}},{\"name\":\"test\",\"left\":234,\"top\":265,\"type\":\"node\",\"id\":\"1564334440404\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"6ba79766-faa0-4259-8139-a4a6d35784e0\"],\"roles\":[]}}},{\"name\":\"預設所有人\",\"left\":140,\"top\":406,\"type\":\"join\",\"id\":\"1564334441965\",\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"node_7\",\"left\":351,\"top\":420,\"type\":\"end round\",\"id\":\"1564334444885\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334430924\",\"to\":\"1564334435460\",\"id\":\"1564334446774\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334435460\",\"to\":\"1564334437844\",\"id\":\"1564334447796\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334437844\",\"to\":\"1564334439828\",\"id\":\"1564334448572\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334437844\",\"to\":\"1564334440404\",\"id\":\"1564334449628\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334439828\",\"to\":\"1564334441965\",\"id\":\"1564334450572\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334440404\",\"to\":\"1564334441965\",\"id\":\"1564334451684\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334441965\",\"to\":\"1564334444885\",\"id\":\"1564334453900\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":16}', '73819920-f085-4003-8874-4361b6461c92', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"3\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:24:14', '00000000-0000-0000-0000-000000000000', 'System', 0, '', 0, '1', NULL);
INSERT INTO `flowinstance` VALUES ('61959fe9-377a-4e6c-9f5d-6b7018a80bca', '', '1564334700493', '帶分支條件的請假2019-07-29 01:25:02', '1564334154471', 2, '小於3的test可以審批', '1564334153687', '{\"title\":\"newFlow_1\",\"initNum\":16,\"lines\":[{\"id\":\"1564334158551\",\"type\":\"sl\",\"from\":\"1564334138399\",\"to\":\"1564334153687\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334159304\",\"type\":\"sl\",\"from\":\"1564334153687\",\"to\":\"1564334154471\",\"name\":\"\",\"dash\":false,\"Compares\":[{\"Operation\":\"<\",\"FieldName\":\"DAYS\",\"FieldType\":null,\"Value\":\"3\"}]},{\"id\":\"1564334160383\",\"type\":\"sl\",\"from\":\"1564334153687\",\"to\":\"1564334155295\",\"name\":\"\",\"dash\":false,\"Compares\":[{\"Operation\":\">=\",\"FieldName\":\"DAYS\",\"FieldType\":null,\"Value\":\"3\"}]},{\"id\":\"1564334161911\",\"type\":\"sl\",\"from\":\"1564334154471\",\"to\":\"1564334156607\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334163959\",\"type\":\"sl\",\"from\":\"1564334155295\",\"to\":\"1564334156607\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334165255\",\"type\":\"sl\",\"from\":\"1564334156607\",\"to\":\"1564334139783\",\"name\":\"\",\"dash\":false,\"Compares\":null}],\"nodes\":[{\"id\":\"1564334138399\",\"name\":\"node_1\",\"type\":\"start round mix\",\"left\":44,\"top\":27,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null},{\"id\":\"1564334139783\",\"name\":\"node_2\",\"type\":\"end round\",\"left\":50,\"top\":295,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null},{\"id\":\"1564334153687\",\"name\":\"所有人可以審批\",\"type\":\"node\",\"left\":163,\"top\":43,\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"test\",\"UserId\":\"6ba79766-faa0-4259-8139-a4a6d35784e0\",\"Description\":\"\",\"TagedTime\":\"2019-07-29 01:29\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334154471\",\"name\":\"小於3的test可以審批\",\"type\":\"node\",\"left\":23,\"top\":141,\"width\":167,\"height\":76,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"SPECIAL_USER\",\"NodeDesignateData\":{\"users\":[\"6ba79766-faa0-4259-8139-a4a6d35784e0\"],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":null,\"UserName\":null,\"UserId\":null,\"Description\":null,\"TagedTime\":null,\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334155295\",\"name\":\"大於3的admin可以審批\",\"type\":\"node\",\"left\":288,\"top\":146,\"width\":143,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"SPECIAL_USER\",\"NodeDesignateData\":{\"users\":[\"49df1602-f5f3-4d52-afb7-3802da619558\"],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":null,\"UserName\":null,\"UserId\":null,\"Description\":null,\"TagedTime\":null,\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334156607\",\"name\":\"預設\",\"type\":\"node\",\"left\":171,\"top\":291,\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":null,\"UserName\":null,\"UserId\":null,\"Description\":null,\"TagedTime\":null,\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}}],\"areas\":[]}', 'bfd4f0f9-6f61-4af9-977e-cbcf7c30dd35', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"1\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:25:16', '00000000-0000-0000-0000-000000000000', 'System', 0, '這是個天數比較少的分支', 0, '6ba79766-faa0-4259-8139-a4a6d35784e0', NULL);
INSERT INTO `flowinstance` VALUES ('7a1fb1a4-06a6-49d5-a311-b988aed776e1', '', '1564334976909', 'admin的會簽2019-07-29 01:29:39', '1564334435460', 2, 'node_2', '1564334430924', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":17,\"top\":12,\"type\":\"start round mix\",\"id\":\"1564334430924\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":141,\"top\":49,\"type\":\"node\",\"id\":\"1564334435460\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"會簽入口，設定會簽型別\",\"left\":141,\"top\":138,\"type\":\"fork\",\"id\":\"1564334437844\",\"width\":104,\"height\":76,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"admin\",\"left\":23,\"top\":272,\"type\":\"node\",\"id\":\"1564334439828\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"49df1602-f5f3-4d52-afb7-3802da619558\"],\"roles\":[]}}},{\"name\":\"test\",\"left\":234,\"top\":265,\"type\":\"node\",\"id\":\"1564334440404\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"6ba79766-faa0-4259-8139-a4a6d35784e0\"],\"roles\":[]}}},{\"name\":\"預設所有人\",\"left\":140,\"top\":406,\"type\":\"join\",\"id\":\"1564334441965\",\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"node_7\",\"left\":351,\"top\":420,\"type\":\"end round\",\"id\":\"1564334444885\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334430924\",\"to\":\"1564334435460\",\"id\":\"1564334446774\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334435460\",\"to\":\"1564334437844\",\"id\":\"1564334447796\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334437844\",\"to\":\"1564334439828\",\"id\":\"1564334448572\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334437844\",\"to\":\"1564334440404\",\"id\":\"1564334449628\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334439828\",\"to\":\"1564334441965\",\"id\":\"1564334450572\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334440404\",\"to\":\"1564334441965\",\"id\":\"1564334451684\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334441965\",\"to\":\"1564334444885\",\"id\":\"1564334453900\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":16}', '73819920-f085-4003-8874-4361b6461c92', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"1\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:29:47', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin', 0, '', 0, '1', NULL);
INSERT INTO `flowinstance` VALUES ('7c8ffe55-13fd-4236-9816-63eb7e22aa68', '', '1572350961242', '按角色執行2019-10-29 20:09:25', '1564334332325', 2, '管理員', '1564334327861', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":99,\"top\":32,\"type\":\"start round mix\",\"id\":\"1564334327861\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":70,\"top\":295,\"type\":\"end round\",\"id\":\"1564334330157\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"管理員\",\"left\":43,\"top\":131,\"type\":\"node\",\"id\":\"1564334332325\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_ROLE\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[\"09ee2ffa-7463-4938-ae0b-1cb4e80c7c13\"]}}},{\"name\":\"測試人員\",\"left\":185,\"top\":226,\"type\":\"node\",\"id\":\"1564334333133\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_ROLE\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[\"0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d\"]}}}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334327861\",\"to\":\"1564334332325\",\"id\":\"1564334335789\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334332325\",\"to\":\"1564334333133\",\"id\":\"1564334336629\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334333133\",\"to\":\"1564334330157\",\"id\":\"1564334337805\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":9}', '0b21f59c-7809-4275-acb4-8e8c08e0167e', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"5\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-10-29 20:10:45', '00000000-0000-0000-0000-000000000000', 'System', 0, '預約好突然', 0, '49df1602-f5f3-4d52-afb7-3802da619558,1df68dfd-3b6d-4491-872f-00a0fc6c5a64', NULL);
INSERT INTO `flowinstance` VALUES ('88156170-41a6-45d1-99dc-40dc37a82bc9', '', '1573007376219', '按角色執行2019-11-06 10:31:28', '1564334332325', 2, '管理員', '1564334327861', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":99,\"top\":32,\"type\":\"start round mix\",\"id\":\"1564334327861\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":70,\"top\":295,\"type\":\"end round\",\"id\":\"1564334330157\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"管理員\",\"left\":43,\"top\":131,\"type\":\"node\",\"id\":\"1564334332325\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_ROLE\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[\"09ee2ffa-7463-4938-ae0b-1cb4e80c7c13\"]}}},{\"name\":\"測試人員\",\"left\":185,\"top\":226,\"type\":\"node\",\"id\":\"1564334333133\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_ROLE\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[\"0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d\"]}}}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334327861\",\"to\":\"1564334332325\",\"id\":\"1564334335789\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334332325\",\"to\":\"1564334333133\",\"id\":\"1564334336629\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334333133\",\"to\":\"1564334330157\",\"id\":\"1564334337805\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":9}', '0b21f59c-7809-4275-acb4-8e8c08e0167e', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"1\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-11-06 10:31:35', '00000000-0000-0000-0000-000000000000', 'System', 0, '', 0, '1df68dfd-3b6d-4491-872f-00a0fc6c5a64,49df1602-f5f3-4d52-afb7-3802da619558', NULL);
INSERT INTO `flowinstance` VALUES ('b918eb3a-0fd4-4df9-a3a3-0bbf2aa5746d', '', '1564334869743', 'test的普通請假2019-07-29 01:27:53', '1564334038904', 4, 'node_4', '1564334036152', '{\"title\":\"newFlow_1\",\"initNum\":9,\"lines\":[{\"id\":\"1564334041040\",\"type\":\"sl\",\"from\":\"1564334032785\",\"to\":\"1564334035352\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334041720\",\"type\":\"sl\",\"from\":\"1564334035352\",\"to\":\"1564334036152\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334042927\",\"type\":\"sl\",\"from\":\"1564334036152\",\"to\":\"1564334038904\",\"name\":\"\",\"dash\":false,\"Compares\":null}],\"nodes\":[{\"id\":\"1564334032785\",\"name\":\"node_1\",\"type\":\"start round mix\",\"left\":19,\"top\":36,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null},{\"id\":\"1564334035352\",\"name\":\"所有人可以審批\",\"type\":\"node\",\"left\":133,\"top\":50,\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"http://xxxx.com/api/workflow/callback\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"超級管理員\",\"UserId\":\"00000000-0000-0000-0000-000000000000\",\"Description\":\"\",\"TagedTime\":\"2019-10-29 14:44\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334036152\",\"name\":\"所有人可以審批\",\"type\":\"node\",\"left\":139,\"top\":123,\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":1,\"UserName\":\"超級管理員\",\"UserId\":\"00000000-0000-0000-0000-000000000000\",\"Description\":\"\",\"TagedTime\":\"2019-10-29 14:44\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334038904\",\"name\":\"node_4\",\"type\":\"end round\",\"left\":47,\"top\":193,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null}],\"areas\":[]}', '61806396-9498-492b-bc22-9f9e95a389bc', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"1\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:28:05', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', 0, '', 1, '', NULL);
INSERT INTO `flowinstance` VALUES ('be9b74cf-2e74-40f3-9ebf-3508f6e79bde', '', '1564334669608', '帶分支條件的請假（很多天數）', '1564334153687', 2, '所有人可以審批', '1564334138399', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":44,\"top\":27,\"type\":\"start round mix\",\"id\":\"1564334138399\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":50,\"top\":295,\"type\":\"end round\",\"id\":\"1564334139783\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"所有人可以審批\",\"left\":163,\"top\":43,\"type\":\"node\",\"id\":\"1564334153687\",\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"小於3的test可以審批\",\"left\":23,\"top\":141,\"type\":\"node\",\"id\":\"1564334154471\",\"width\":167,\"height\":76,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"6ba79766-faa0-4259-8139-a4a6d35784e0\"],\"roles\":[]}}},{\"name\":\"大於3的admin可以審批\",\"left\":288,\"top\":146,\"type\":\"node\",\"id\":\"1564334155295\",\"width\":143,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"49df1602-f5f3-4d52-afb7-3802da619558\"],\"roles\":[]}}},{\"name\":\"預設\",\"left\":171,\"top\":291,\"type\":\"node\",\"id\":\"1564334156607\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334138399\",\"to\":\"1564334153687\",\"id\":\"1564334158551\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334153687\",\"to\":\"1564334154471\",\"id\":\"1564334159304\",\"name\":\"\",\"dash\":false,\"alt\":true,\"Compares\":[{\"FieldName\":\"DAYS\",\"Operation\":\"<\",\"Value\":\"3\"}]},{\"type\":\"sl\",\"from\":\"1564334153687\",\"to\":\"1564334155295\",\"id\":\"1564334160383\",\"name\":\"\",\"dash\":false,\"alt\":true,\"Compares\":[{\"FieldName\":\"DAYS\",\"Operation\":\">=\",\"Value\":\"3\"}]},{\"type\":\"sl\",\"from\":\"1564334154471\",\"to\":\"1564334156607\",\"id\":\"1564334161911\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334155295\",\"to\":\"1564334156607\",\"id\":\"1564334163959\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334156607\",\"to\":\"1564334139783\",\"id\":\"1564334165255\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":16}', 'bfd4f0f9-6f61-4af9-977e-cbcf7c30dd35', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"5\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:24:52', '00000000-0000-0000-0000-000000000000', 'System', 0, '', 0, '1', NULL);
INSERT INTO `flowinstance` VALUES ('d4f8d2b9-6374-4c10-8d3c-1ca540bc309b', '', '1572341191142', '帶複雜表單的2019-10-29 17:26:42', '1564334557205', 2, 'node_2', '1564334555981', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":66,\"top\":46,\"type\":\"start round mix\",\"id\":\"1564334555981\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":50,\"top\":145,\"type\":\"node\",\"id\":\"1564334557205\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"node_3\",\"left\":56,\"top\":206,\"type\":\"node\",\"id\":\"1564334557764\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"node_4\",\"left\":66,\"top\":294,\"type\":\"end round\",\"id\":\"1564334559716\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334555981\",\"to\":\"1564334557205\",\"id\":\"1564334561500\",\"name\":\"\",\"dash\":false},{\"type\":\"sl\",\"from\":\"1564334557205\",\"to\":\"1564334557764\",\"id\":\"1564334562229\",\"name\":\"\",\"dash\":false},{\"type\":\"sl\",\"from\":\"1564334557764\",\"to\":\"1564334559716\",\"id\":\"1564334563268\",\"name\":\"\",\"dash\":false}],\"areas\":[],\"initNum\":8}', '989bd1f3-29f0-43cd-ad01-b55654907dbb', 'FrmLeaveReq', '{\"id\":\"\",\"userName\":\"1\",\"requestType\":\"病假\",\"startDate\":\"2019-10-07T16:00:00.000Z\",\"startTime\":\"2019-10-29T09:26:52.000Z\",\"endDate\":\"2019-10-27T16:00:00.000Z\",\"endTime\":\"2019-10-29T09:26:54.000Z\",\"requestComment\":\"111\",\"attachment\":\"\",\"files\":[],\"extendInfo\":\"\"}', 1, '', '', '8faff4e5-b729-44d2-ac26-e899a228f63d', '', 0, '2019-10-29 17:27:06', '00000000-0000-0000-0000-000000000000', 'System', 0, '11', 0, '1', NULL);
INSERT INTO `flowinstance` VALUES ('df6df6b5-53f7-4db4-931b-12e3352ef413', '', '1564334658879', '按角色執行2019-07-29 01:24:21', '1564334332325', 2, '管理員', '1564334327861', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":99,\"top\":32,\"type\":\"start round mix\",\"id\":\"1564334327861\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":70,\"top\":295,\"type\":\"end round\",\"id\":\"1564334330157\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"管理員\",\"left\":43,\"top\":131,\"type\":\"node\",\"id\":\"1564334332325\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_ROLE\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[\"09ee2ffa-7463-4938-ae0b-1cb4e80c7c13\"]}}},{\"name\":\"測試人員\",\"left\":185,\"top\":226,\"type\":\"node\",\"id\":\"1564334333133\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_ROLE\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[\"0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d\"]}}}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334327861\",\"to\":\"1564334332325\",\"id\":\"1564334335789\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334332325\",\"to\":\"1564334333133\",\"id\":\"1564334336629\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334333133\",\"to\":\"1564334330157\",\"id\":\"1564334337805\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":9}', '0b21f59c-7809-4275-acb4-8e8c08e0167e', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"1\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:24:26', '00000000-0000-0000-0000-000000000000', 'System', 0, '', 0, '49df1602-f5f3-4d52-afb7-3802da619558', NULL);
INSERT INTO `flowinstance` VALUES ('ee589689-3ae0-4037-abec-ba70e566da16', '', '1564334720434', '普通的請假2019-07-29 01:25:24', '1564334035352', 2, '所有人可以審批', '1564334032785', '{\"title\":\"newFlow_1\",\"initNum\":9,\"lines\":[{\"id\":\"1564334041040\",\"type\":\"sl\",\"from\":\"1564334032785\",\"to\":\"1564334035352\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334041720\",\"type\":\"sl\",\"from\":\"1564334035352\",\"to\":\"1564334036152\",\"name\":\"\",\"dash\":false,\"Compares\":null},{\"id\":\"1564334042927\",\"type\":\"sl\",\"from\":\"1564334036152\",\"to\":\"1564334038904\",\"name\":\"\",\"dash\":false,\"Compares\":null}],\"nodes\":[{\"id\":\"1564334032785\",\"name\":\"node_1\",\"type\":\"start round mix\",\"left\":19,\"top\":36,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null},{\"id\":\"1564334035352\",\"name\":\"所有人可以審批\",\"type\":\"node\",\"left\":133,\"top\":50,\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"http://xxxx.com/api/workflow/callback\",\"NodeRejectType\":null,\"Taged\":2,\"UserName\":\"test\",\"UserId\":\"6ba79766-faa0-4259-8139-a4a6d35784e0\",\"Description\":\"最近有很多事情要處理\",\"TagedTime\":\"2019-07-29 01:28\",\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334036152\",\"name\":\"所有人可以審批\",\"type\":\"node\",\"left\":139,\"top\":123,\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeDesignate\":\"ALL_USER\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":null},\"NodeCode\":null,\"NodeName\":null,\"ThirdPartyUrl\":\"\",\"NodeRejectType\":null,\"Taged\":null,\"UserName\":null,\"UserId\":null,\"Description\":null,\"TagedTime\":null,\"NodeConfluenceType\":\"all\",\"ConfluenceOk\":null,\"ConfluenceNo\":null}},{\"id\":\"1564334038904\",\"name\":\"node_4\",\"type\":\"end round\",\"left\":47,\"top\":193,\"width\":26,\"height\":26,\"alt\":true,\"setInfo\":null}],\"areas\":[]}', '61806396-9498-492b-bc22-9f9e95a389bc', '', '{\"REASON\":\"身體原因\",\"DAYS\":\"1\",\"CUSTOME_NAME\":\"玉寶\"}', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', 'ef89f96a-af33-407c-b02e-897faf46ecf0', '', 0, '2019-07-29 01:25:30', '00000000-0000-0000-0000-000000000000', 'System', 0, '', 3, '1', NULL);

-- ----------------------------
-- Table structure for flowinstanceoperationhistory
-- ----------------------------
DROP TABLE IF EXISTS `flowinstanceoperationhistory`;
CREATE TABLE `flowinstanceoperationhistory`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主鍵Id',
  `InstanceId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '實例程序Id',
  `Content` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '操作內容',
  `CreateDate` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者主鍵',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '工作流實例操作記錄' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of flowinstanceoperationhistory
-- ----------------------------
INSERT INTO `flowinstanceoperationhistory` VALUES ('07ebabd9-7880-4d9a-b365-4a1dc608a82a', 'be9b74cf-2e74-40f3-9ebf-3508f6e79bde', '【建立】超級管理員建立了一個流程程序【1564334669608/帶分支條件的請假（很多天數）】', '2019-07-29 01:24:52', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('0b39f449-3369-41d7-b053-00487c2fafbe', 'ee589689-3ae0-4037-abec-ba70e566da16', '【建立】超級管理員建立了一個流程程序【1564334720434/普通的請假2019-07-29 01:25:24】', '2019-07-29 01:25:30', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('1ec9b89e-d909-430a-bb0f-2fcc2351d103', '88156170-41a6-45d1-99dc-40dc37a82bc9', '【建立】超級管理員建立了一個流程程序【1573007376219/按角色執行2019-11-06 10:31:28】', '2019-11-06 10:31:35', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('1fa6c074-8ec0-4a5a-8c39-2dc62d0140eb', '0ae5abe6-f571-4e08-b264-667dc27c5025', '【建立】超級管理員建立了一個流程程序【1564334583446/帶複雜表單的2019-07-29 01:23:03】', '2019-07-29 01:23:58', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('250181cb-f242-47cf-bc16-fcc307443727', '034ad4f0-95e6-40bf-b3c5-38bd60b542d9', '【建立】超級管理員建立了一個流程程序【1564334796391/會簽2019-07-29 01:26:40】', '2019-07-29 01:26:45', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('299d30e1-41d2-4f9f-a330-593fc7b87c20', 'b918eb3a-0fd4-4df9-a3a3-0bbf2aa5746d', '【建立】test建立了一個流程程序【1564334869743/test的普通請假2019-07-29 01:27:53】', '2019-07-29 01:28:05', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstanceoperationhistory` VALUES ('318f827b-316d-4230-841b-990b0e1aab37', 'df6df6b5-53f7-4db4-931b-12e3352ef413', '【建立】超級管理員建立了一個流程程序【1564334658879/按角色執行2019-07-29 01:24:21】', '2019-07-29 01:24:26', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('3d49913b-e389-4c7d-9f35-237e3abafa58', '034ad4f0-95e6-40bf-b3c5-38bd60b542d9', '【admin】【2019-07-29 01:30】同意,備註：', '2019-07-29 01:30:46', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin');
INSERT INTO `flowinstanceoperationhistory` VALUES ('41aac141-92c6-400d-a58f-3950b1f05e44', '7c8ffe55-13fd-4236-9816-63eb7e22aa68', '【建立】超級管理員建立了一個流程程序【1572350961242/按角色執行2019-10-29 20:09:25】', '2019-10-29 20:10:45', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('41dc5606-9b46-4a2f-9a99-b7d439327cc9', '0ee22872-f120-4c5a-84ec-7f4e36bd0141', '【預設】【2019-07-29 01:30】同意,備註：', '2019-07-29 01:30:13', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin');
INSERT INTO `flowinstanceoperationhistory` VALUES ('4564baf4-2f5a-4268-82ae-bb587c1a7a64', 'ee589689-3ae0-4037-abec-ba70e566da16', '【所有人可以審批】【2019-07-29 01:28】不同意,備註：最近有很多事情要處理', '2019-07-29 01:28:55', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstanceoperationhistory` VALUES ('624ed4bf-b2c1-4624-82f5-415ebffeecdb', 'd4f8d2b9-6374-4c10-8d3c-1ca540bc309b', '【建立】超級管理員建立了一個流程程序【1572341191142/帶複雜表單的2019-10-29 17:26:42】', '2019-10-29 17:27:06', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('81d18fa5-f843-4d29-bf08-1423ed7df968', '0ee22872-f120-4c5a-84ec-7f4e36bd0141', '【小於3的test可以審批】【2019-07-29 01:28】同意,備註：', '2019-07-29 01:28:31', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstanceoperationhistory` VALUES ('92b7c75f-3dd3-4cdb-96ef-09d393005d85', 'b918eb3a-0fd4-4df9-a3a3-0bbf2aa5746d', '【所有人可以審批】【2019-10-29 14:44】同意,備註：', '2019-10-29 14:44:20', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('97643f81-40b4-4941-8cd9-ec35b517da5b', '20be4e87-0e9e-467c-9011-3c6ccd650931', '【建立】超級管理員建立了一個流程程序【1564334643592/會簽2019-07-29 01:24:05】', '2019-07-29 01:24:14', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('9c375436-d2a1-4edd-9123-737ec337f2a4', '034ad4f0-95e6-40bf-b3c5-38bd60b542d9', '【admin】【2019-07-29 01:30】同意,備註：', '2019-07-29 01:30:30', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin');
INSERT INTO `flowinstanceoperationhistory` VALUES ('b2594853-41a7-4c4f-bcd1-3fdf63036e9b', '0ee22872-f120-4c5a-84ec-7f4e36bd0141', '【所有人可以審批】【2019-07-29 01:26】同意,備註：', '2019-07-29 01:26:15', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('b304569d-e14a-4411-ad10-780bf5eaf3a0', '0ee22872-f120-4c5a-84ec-7f4e36bd0141', '【建立】超級管理員建立了一個流程程序【1564334742060/帶分支條件的請假2019-07-29 01:25:44】', '2019-07-29 01:25:56', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('de782bfd-1320-4c6e-9e18-f7c92ad64173', '61959fe9-377a-4e6c-9f5d-6b7018a80bca', '【所有人可以審批】【2019-07-29 01:29】同意,備註：', '2019-07-29 01:29:14', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstanceoperationhistory` VALUES ('e633903e-4969-46eb-b194-c7de5c27cb8d', '034ad4f0-95e6-40bf-b3c5-38bd60b542d9', '【node_2】【2019-07-29 01:28】同意,備註：', '2019-07-29 01:28:22', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstanceoperationhistory` VALUES ('ecd380ab-3f22-4a8b-a341-4a8ff70eefff', '61959fe9-377a-4e6c-9f5d-6b7018a80bca', '【建立】超級管理員建立了一個流程程序【1564334700493/帶分支條件的請假2019-07-29 01:25:02】', '2019-07-29 01:25:16', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('ee6147cc-f897-4284-b295-8e20b7c94dd0', 'b918eb3a-0fd4-4df9-a3a3-0bbf2aa5746d', '【所有人可以審批】【2019-10-29 14:44】同意,備註：', '2019-10-29 14:44:24', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstanceoperationhistory` VALUES ('efa37871-2d37-4bae-8e0d-5bf98ff44241', '7a1fb1a4-06a6-49d5-a311-b988aed776e1', '【建立】admin建立了一個流程程序【1564334976909/admin的會簽2019-07-29 01:29:39】', '2019-07-29 01:29:47', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin');

-- ----------------------------
-- Table structure for flowinstancetransitionhistory
-- ----------------------------
DROP TABLE IF EXISTS `flowinstancetransitionhistory`;
CREATE TABLE `flowinstancetransitionhistory`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主鍵Id',
  `InstanceId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '實例Id',
  `FromNodeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '開始節點Id',
  `FromNodeType` int(11) DEFAULT NULL COMMENT '開始節點型別',
  `FromNodeName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '開始節點名稱',
  `ToNodeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '結束節點Id',
  `ToNodeType` int(11) DEFAULT NULL COMMENT '結束節點型別',
  `ToNodeName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '結束節點名稱',
  `TransitionSate` int(11) NOT NULL COMMENT '轉化狀態',
  `IsFinish` int(11) NOT NULL COMMENT '是否結束',
  `CreateDate` datetime(0) NOT NULL COMMENT '轉化時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '操作人Id',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '操作人名稱',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '工作流實例流轉歷史記錄' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of flowinstancetransitionhistory
-- ----------------------------
INSERT INTO `flowinstancetransitionhistory` VALUES ('0a8aff1c-572b-4db4-9906-a3954a1d0288', '034ad4f0-95e6-40bf-b3c5-38bd60b542d9', '1564334435460', 2, 'node_2', '1564334437844', 0, '會簽入口，設定會簽型別', 0, 0, '2019-07-29 01:28:22', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstancetransitionhistory` VALUES ('0b11504f-9231-4cdb-862a-4d4546b9a4bd', '0ae5abe6-f571-4e08-b264-667dc27c5025', '1564334555981', 3, 'node_1', '1564334557205', 2, 'node_2', 0, 0, '2019-07-29 01:23:58', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('10efe1e8-6424-4d88-bc30-8b6722002e56', '0ee22872-f120-4c5a-84ec-7f4e36bd0141', '1564334153687', 2, '所有人可以審批', '1564334154471', 2, '小於3的test可以審批', 0, 0, '2019-07-29 01:26:15', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('121c3968-8532-43ae-b46a-dcae0973567a', 'b918eb3a-0fd4-4df9-a3a3-0bbf2aa5746d', '1564334032785', 3, 'node_1', '1564334035352', 2, '所有人可以審批', 0, 0, '2019-07-29 01:28:05', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstancetransitionhistory` VALUES ('19eada42-ade5-4cb1-a65b-a5d75243fe10', '034ad4f0-95e6-40bf-b3c5-38bd60b542d9', '1564334437844', 0, '會簽入口，設定會簽型別', '1564334444885', 4, 'node_7', 0, 1, '2019-07-29 01:30:46', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin');
INSERT INTO `flowinstancetransitionhistory` VALUES ('1c4166e6-b981-465b-8feb-a5ff2c0fbebe', '88156170-41a6-45d1-99dc-40dc37a82bc9', '1564334327861', 3, 'node_1', '1564334332325', 2, '管理員', 0, 0, '2019-11-06 10:31:35', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('3ac494f7-66c9-4d77-a86d-bfe93d4e1bd2', 'df6df6b5-53f7-4db4-931b-12e3352ef413', '1564334327861', 3, 'node_1', '1564334332325', 2, '管理員', 0, 0, '2019-07-29 01:24:26', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('3c9db424-34b8-43cb-b571-ca8a3102fa78', '034ad4f0-95e6-40bf-b3c5-38bd60b542d9', '1564334430924', 3, 'node_1', '1564334435460', 2, 'node_2', 0, 0, '2019-07-29 01:26:45', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('41eee5d1-e98b-46f0-99d6-fa35781059e3', 'b918eb3a-0fd4-4df9-a3a3-0bbf2aa5746d', '1564334036152', 2, '所有人可以審批', '1564334038904', 4, 'node_4', 0, 1, '2019-10-29 14:44:24', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('7951ef7e-7457-4d31-b661-3e7c57cbac3a', 'd4f8d2b9-6374-4c10-8d3c-1ca540bc309b', '1564334555981', 3, 'node_1', '1564334557205', 2, 'node_2', 0, 0, '2019-10-29 17:27:06', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('8fc96020-e719-4c5c-bc2f-88ad8b8361ad', 'b918eb3a-0fd4-4df9-a3a3-0bbf2aa5746d', '1564334035352', 2, '所有人可以審批', '1564334036152', 2, '所有人可以審批', 0, 0, '2019-10-29 14:44:20', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('9ed0cdc3-0f57-4381-bb86-f41537556832', '61959fe9-377a-4e6c-9f5d-6b7018a80bca', '1564334153687', 2, '所有人可以審批', '1564334154471', 2, '小於3的test可以審批', 0, 0, '2019-07-29 01:29:14', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstancetransitionhistory` VALUES ('b53cd6a4-0aa9-4de5-83e8-3966423e537a', '20be4e87-0e9e-467c-9011-3c6ccd650931', '1564334430924', 3, 'node_1', '1564334435460', 2, 'node_2', 0, 0, '2019-07-29 01:24:14', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('b7770b94-16ad-49cb-b2f8-b94ed032388a', '7a1fb1a4-06a6-49d5-a311-b988aed776e1', '1564334430924', 3, 'node_1', '1564334435460', 2, 'node_2', 0, 0, '2019-07-29 01:29:47', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin');
INSERT INTO `flowinstancetransitionhistory` VALUES ('c13213e0-af27-4665-b8bc-4c73a7f2df23', '7c8ffe55-13fd-4236-9816-63eb7e22aa68', '1564334327861', 3, 'node_1', '1564334332325', 2, '管理員', 0, 0, '2019-10-29 20:10:45', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('c2128257-6b49-43a5-ac93-7b00d2e1b342', '0ee22872-f120-4c5a-84ec-7f4e36bd0141', '1564334138399', 3, 'node_1', '1564334153687', 2, '所有人可以審批', 0, 0, '2019-07-29 01:25:56', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('ca236899-b327-4e8b-85d4-8668c9ae5d89', 'ee589689-3ae0-4037-abec-ba70e566da16', '1564334032785', 3, 'node_1', '1564334035352', 2, '所有人可以審批', 0, 0, '2019-07-29 01:25:30', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('d2c558c2-4f31-4dea-8f2e-5fa3ac9748a0', '0ee22872-f120-4c5a-84ec-7f4e36bd0141', '1564334154471', 2, '小於3的test可以審批', '1564334156607', 2, '預設', 0, 0, '2019-07-29 01:28:31', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test');
INSERT INTO `flowinstancetransitionhistory` VALUES ('e22a49a2-5065-47f2-ba95-79d7174a308e', '0ee22872-f120-4c5a-84ec-7f4e36bd0141', '1564334156607', 2, '預設', '1564334139783', 4, 'node_2', 0, 1, '2019-07-29 01:30:13', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin');
INSERT INTO `flowinstancetransitionhistory` VALUES ('e34b5d5e-aae4-4de0-9b31-6bd514ffe92f', 'be9b74cf-2e74-40f3-9ebf-3508f6e79bde', '1564334138399', 3, 'node_1', '1564334153687', 2, '所有人可以審批', 0, 0, '2019-07-29 01:24:52', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `flowinstancetransitionhistory` VALUES ('f7f86afc-be9d-4521-b346-3e36355758b0', '61959fe9-377a-4e6c-9f5d-6b7018a80bca', '1564334138399', 3, 'node_1', '1564334153687', 2, '所有人可以審批', 0, 0, '2019-07-29 01:25:16', '00000000-0000-0000-0000-000000000000', '超級管理員');

-- ----------------------------
-- Table structure for flowscheme
-- ----------------------------
DROP TABLE IF EXISTS `flowscheme`;
CREATE TABLE `flowscheme`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主鍵Id',
  `SchemeCode` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '流程編號',
  `SchemeName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '流程名稱',
  `SchemeType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '流程分類',
  `SchemeVersion` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '流程內容版本',
  `SchemeCanUser` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '流程模板使用者',
  `SchemeContent` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '流程內容',
  `FrmId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '表單ID',
  `FrmType` int(11) NOT NULL COMMENT '表單型別',
  `AuthorizeType` int(11) NOT NULL COMMENT '模板許可權型別：0完全公開,1指定部門/人員',
  `SortCode` int(11) NOT NULL COMMENT '排序碼',
  `DeleteMark` int(11) NOT NULL COMMENT '刪除標記',
  `Disabled` int(11) NOT NULL COMMENT '有效',
  `Description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '備註',
  `CreateDate` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者主鍵',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者',
  `ModifyDate` datetime(0) DEFAULT NULL COMMENT '修改時間',
  `ModifyUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '修改使用者主鍵',
  `ModifyUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '修改使用者',
  `OrgId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬部門',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '工作流模板資訊表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of flowscheme
-- ----------------------------
INSERT INTO `flowscheme` VALUES ('0b21f59c-7809-4275-acb4-8e8c08e0167e', '1564334009729', '按角色執行', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":99,\"top\":32,\"type\":\"start round mix\",\"id\":\"1564334327861\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":70,\"top\":295,\"type\":\"end round\",\"id\":\"1564334330157\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"管理員\",\"left\":43,\"top\":131,\"type\":\"node\",\"id\":\"1564334332325\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_ROLE\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[\"09ee2ffa-7463-4938-ae0b-1cb4e80c7c13\"]}}},{\"name\":\"測試人員\",\"left\":185,\"top\":226,\"type\":\"node\",\"id\":\"1564334333133\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_ROLE\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[\"0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d\"]}}}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334327861\",\"to\":\"1564334332325\",\"id\":\"1564334335789\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334332325\",\"to\":\"1564334333133\",\"id\":\"1564334336629\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334333133\",\"to\":\"1564334330157\",\"id\":\"1564334337805\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":9}', 'ef89f96a-af33-407c-b02e-897faf46ecf0', 0, 0, 0, 0, 0, '節點按指定的角色執行而不是指定的人', '2019-07-29 01:19:25', '', '', '2019-07-29 01:19:25', '', '', NULL);
INSERT INTO `flowscheme` VALUES ('1648a05b-013c-4dd0-8ecb-5695d08fb8f4', '1584630870659', '【研發小組】測試申請', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":44,\"top\":49,\"type\":\"start round mix\",\"id\":\"1584630893821\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":58,\"top\":120,\"type\":\"node\",\"id\":\"1584630895194\",\"width\":104,\"height\":26,\"alt\":true,\"setInfo\":{\"NodeName\":\"node_2\",\"NodeCode\":\"node_2\",\"NodeRejectType\":\"0\",\"NodeDesignate\":\"ALL_USER\",\"NodeConfluenceType\":\"all\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":[]}}},{\"name\":\"node_3\",\"left\":42,\"top\":219,\"type\":\"end round\",\"id\":\"1584630896886\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1584630893821\",\"to\":\"1584630895194\",\"id\":\"1584630898567\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1584630895194\",\"to\":\"1584630896886\",\"id\":\"1584630899588\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":7}', '0411376a-18fd-4f52-bffb-22ae0d3fa21d', 0, 0, 1, 0, 0, '只有【test3】賬號或可以看到【研發小組】的【管理員】才能看到', '2020-03-19 23:15:03', '229f3a49-ab27-49ce-b383-9f10ca23a9d5', 'test3', '2020-03-19 23:15:03', '', '', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b');
INSERT INTO `flowscheme` VALUES ('61806396-9498-492b-bc22-9f9e95a389bc', '1564334009729', '普通的請假', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":19,\"top\":36,\"type\":\"start round mix\",\"id\":\"1564334032785\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"所有人可以審批\",\"left\":133,\"top\":50,\"type\":\"node\",\"id\":\"1564334035352\",\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"http://xxxx.com/api/workflow/callback\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"所有人可以審批\",\"left\":139,\"top\":123,\"type\":\"node\",\"id\":\"1564334036152\",\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"node_4\",\"left\":47,\"top\":193,\"type\":\"end round\",\"id\":\"1564334038904\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334032785\",\"to\":\"1564334035352\",\"id\":\"1564334041040\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334035352\",\"to\":\"1564334036152\",\"id\":\"1564334041720\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334036152\",\"to\":\"1564334038904\",\"id\":\"1564334042927\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":9}', 'ef89f96a-af33-407c-b02e-897faf46ecf0', 0, 0, 0, 0, 0, '非常簡單的請假流程', '2019-07-29 01:14:48', '', '', '2019-07-29 01:14:48', '', '', NULL);
INSERT INTO `flowscheme` VALUES ('73819920-f085-4003-8874-4361b6461c92', '1564334009729', '會簽', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":17,\"top\":12,\"type\":\"start round mix\",\"id\":\"1564334430924\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":141,\"top\":49,\"type\":\"node\",\"id\":\"1564334435460\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"會簽入口，設定會簽型別\",\"left\":141,\"top\":138,\"type\":\"fork\",\"id\":\"1564334437844\",\"width\":104,\"height\":76,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"admin\",\"left\":23,\"top\":272,\"type\":\"node\",\"id\":\"1564334439828\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"49df1602-f5f3-4d52-afb7-3802da619558\"],\"roles\":[]}}},{\"name\":\"test\",\"left\":234,\"top\":265,\"type\":\"node\",\"id\":\"1564334440404\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"6ba79766-faa0-4259-8139-a4a6d35784e0\"],\"roles\":[]}}},{\"name\":\"預設所有人\",\"left\":140,\"top\":406,\"type\":\"join\",\"id\":\"1564334441965\",\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"node_7\",\"left\":351,\"top\":420,\"type\":\"end round\",\"id\":\"1564334444885\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334430924\",\"to\":\"1564334435460\",\"id\":\"1564334446774\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334435460\",\"to\":\"1564334437844\",\"id\":\"1564334447796\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334437844\",\"to\":\"1564334439828\",\"id\":\"1564334448572\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334437844\",\"to\":\"1564334440404\",\"id\":\"1564334449628\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334439828\",\"to\":\"1564334441965\",\"id\":\"1564334450572\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334440404\",\"to\":\"1564334441965\",\"id\":\"1564334451684\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334441965\",\"to\":\"1564334444885\",\"id\":\"1564334453900\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":16}', 'ef89f96a-af33-407c-b02e-897faf46ecf0', 0, 0, 0, 0, 0, '需要多人審批的流程，比如需要多人全部批準該步驟才能通過，或至少有一個通過', '2019-07-29 01:22:03', '', '', '2019-07-29 01:22:03', '', '', NULL);
INSERT INTO `flowscheme` VALUES ('7831e5d0-0ecf-4539-99bc-cd7ecfc8f88f', '1584630806811', '【研發小組】愛好調研', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":47,\"top\":23,\"type\":\"start round mix\",\"id\":\"1584630842462\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":74,\"top\":102,\"type\":\"node\",\"id\":\"1584630843608\",\"width\":104,\"height\":26,\"alt\":true,\"setInfo\":{\"NodeName\":\"node_2\",\"NodeCode\":\"node_2\",\"NodeRejectType\":\"0\",\"NodeDesignate\":\"ALL_USER\",\"NodeConfluenceType\":\"all\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":[]}}},{\"name\":\"node_3\",\"left\":41,\"top\":179,\"type\":\"end round\",\"id\":\"1584630845368\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1584630842462\",\"to\":\"1584630843608\",\"id\":\"1584630846980\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1584630843608\",\"to\":\"1584630845368\",\"id\":\"1584630847962\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":7}', '0411376a-18fd-4f52-bffb-22ae0d3fa21d', 0, 0, 1, 0, 0, '只有【test】賬號或可以看到【研發小組】的【管理員】才能看到', '2020-03-19 23:14:14', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2020-03-19 23:14:14', '', '', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b');
INSERT INTO `flowscheme` VALUES ('989bd1f3-29f0-43cd-ad01-b55654907dbb', '1564334009729', '帶複雜表單的', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":66,\"top\":46,\"type\":\"start round mix\",\"id\":\"1564334555981\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":50,\"top\":145,\"type\":\"node\",\"id\":\"1564334557205\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"node_3\",\"left\":56,\"top\":206,\"type\":\"node\",\"id\":\"1564334557764\",\"width\":104,\"height\":26,\"alt\":true},{\"name\":\"node_4\",\"left\":66,\"top\":294,\"type\":\"end round\",\"id\":\"1564334559716\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334555981\",\"to\":\"1564334557205\",\"id\":\"1564334561500\",\"name\":\"\",\"dash\":false},{\"type\":\"sl\",\"from\":\"1564334557205\",\"to\":\"1564334557764\",\"id\":\"1564334562229\",\"name\":\"\",\"dash\":false},{\"type\":\"sl\",\"from\":\"1564334557764\",\"to\":\"1564334559716\",\"id\":\"1564334563268\",\"name\":\"\",\"dash\":false}],\"areas\":[],\"initNum\":8}', '8faff4e5-b729-44d2-ac26-e899a228f63d', 1, 0, 0, 0, 0, '這是一個帶有複雜表單的流程，比如需要上傳檔案', '2019-07-29 01:22:45', '', '', '2019-10-29 17:25:20', '', '', NULL);
INSERT INTO `flowscheme` VALUES ('bfd4f0f9-6f61-4af9-977e-cbcf7c30dd35', '1564334009729', '帶分支條件的請假', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":44,\"top\":27,\"type\":\"start round mix\",\"id\":\"1564334138399\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":50,\"top\":295,\"type\":\"end round\",\"id\":\"1564334139783\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"所有人可以審批\",\"left\":163,\"top\":43,\"type\":\"node\",\"id\":\"1564334153687\",\"width\":104,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}},{\"name\":\"小於3的test可以審批\",\"left\":23,\"top\":141,\"type\":\"node\",\"id\":\"1564334154471\",\"width\":167,\"height\":76,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"6ba79766-faa0-4259-8139-a4a6d35784e0\"],\"roles\":[]}}},{\"name\":\"大於3的admin可以審批\",\"left\":288,\"top\":146,\"type\":\"node\",\"id\":\"1564334155295\",\"width\":143,\"height\":56,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"SPECIAL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[\"49df1602-f5f3-4d52-afb7-3802da619558\"],\"roles\":[]}}},{\"name\":\"預設\",\"left\":171,\"top\":291,\"type\":\"node\",\"id\":\"1564334156607\",\"width\":104,\"height\":36,\"alt\":true,\"setInfo\":{\"NodeConfluenceType\":\"all\",\"NodeDesignate\":\"ALL_USER\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[]}}}],\"lines\":[{\"type\":\"sl\",\"from\":\"1564334138399\",\"to\":\"1564334153687\",\"id\":\"1564334158551\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334153687\",\"to\":\"1564334154471\",\"id\":\"1564334159304\",\"name\":\"\",\"dash\":false,\"alt\":true,\"Compares\":[{\"FieldName\":\"DAYS\",\"Operation\":\"<\",\"Value\":\"3\"}]},{\"type\":\"sl\",\"from\":\"1564334153687\",\"to\":\"1564334155295\",\"id\":\"1564334160383\",\"name\":\"\",\"dash\":false,\"alt\":true,\"Compares\":[{\"FieldName\":\"DAYS\",\"Operation\":\">=\",\"Value\":\"3\"}]},{\"type\":\"sl\",\"from\":\"1564334154471\",\"to\":\"1564334156607\",\"id\":\"1564334161911\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334155295\",\"to\":\"1564334156607\",\"id\":\"1564334163959\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1564334156607\",\"to\":\"1564334139783\",\"id\":\"1564334165255\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":16}', 'ef89f96a-af33-407c-b02e-897faf46ecf0', 0, 0, 0, 0, 0, '在連線線上可以設定分支條件', '2019-07-29 01:17:46', '', '', '2019-07-29 01:17:46', '', '', NULL);
INSERT INTO `flowscheme` VALUES ('f11b7ef6-6da4-4cef-9e71-5e4e1454f30a', '1584630699021', '【研發小組】考覈表', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":116,\"top\":70,\"type\":\"start round mix\",\"id\":\"1584630766237\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":118,\"top\":148,\"type\":\"node\",\"id\":\"1584630767445\",\"width\":104,\"height\":26,\"alt\":true,\"setInfo\":{\"NodeName\":\"node_2\",\"NodeCode\":\"node_2\",\"NodeRejectType\":\"0\",\"NodeDesignate\":\"ALL_USER\",\"NodeConfluenceType\":\"all\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":[]}}},{\"name\":\"node_3\",\"left\":69,\"top\":223,\"type\":\"end round\",\"id\":\"1584630769587\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1584630766237\",\"to\":\"1584630767445\",\"id\":\"1584630772227\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1584630767445\",\"to\":\"1584630769587\",\"id\":\"1584630773305\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":7}', '0411376a-18fd-4f52-bffb-22ae0d3fa21d', 0, 0, 1, 0, 0, '只有可以看到【研發小組】的【管理員】才能看到', '2020-03-19 23:13:03', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin', '2020-03-19 23:13:03', '', '', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b');
INSERT INTO `flowscheme` VALUES ('fb1f3cac-a259-4969-9171-addbe22ab102', '1584631233711', '【研發小組】高層彙報', '', '', '', '{\"title\":\"newFlow_1\",\"nodes\":[{\"name\":\"node_1\",\"left\":52,\"top\":43,\"type\":\"start round mix\",\"id\":\"1584631275414\",\"width\":26,\"height\":26,\"alt\":true},{\"name\":\"node_2\",\"left\":57,\"top\":113,\"type\":\"node\",\"id\":\"1584631276803\",\"width\":104,\"height\":26,\"alt\":true,\"setInfo\":{\"NodeName\":\"node_2\",\"NodeCode\":\"node_2\",\"NodeRejectType\":\"0\",\"NodeDesignate\":\"ALL_USER\",\"NodeConfluenceType\":\"all\",\"ThirdPartyUrl\":\"\",\"NodeDesignateData\":{\"users\":[],\"roles\":[],\"orgs\":[]}}},{\"name\":\"node_3\",\"left\":60,\"top\":192,\"type\":\"end round\",\"id\":\"1584631278737\",\"width\":26,\"height\":26,\"alt\":true}],\"lines\":[{\"type\":\"sl\",\"from\":\"1584631275414\",\"to\":\"1584631276803\",\"id\":\"1584631280569\",\"name\":\"\",\"dash\":false,\"alt\":true},{\"type\":\"sl\",\"from\":\"1584631276803\",\"to\":\"1584631278737\",\"id\":\"1584631281701\",\"name\":\"\",\"dash\":false,\"alt\":true}],\"areas\":[],\"initNum\":7}', '0411376a-18fd-4f52-bffb-22ae0d3fa21d', 0, 0, 1, 0, 0, '只有可以看到【研發小組】的【管理員】才能看到', '2020-03-19 23:21:43', '49df1602-f5f3-4d52-afb7-3802da619558', 'admin', '2020-03-19 23:21:43', '', '', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b');

-- ----------------------------
-- Table structure for form
-- ----------------------------
DROP TABLE IF EXISTS `form`;
CREATE TABLE `form`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '表單模板Id',
  `Name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '表單名稱',
  `FrmType` int(11) NOT NULL COMMENT '表單型別，0：預設動態表單；1：Web自定義表單',
  `WebId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '系統頁面標識，當表單型別為用Web自定義的表單時，需要標識載入哪個頁面',
  `Fields` int(11) NOT NULL COMMENT '欄位個數',
  `ContentData` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '表單中的控制元件屬性描述',
  `ContentParse` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '表單控制元件位置模板',
  `Content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '表單原html模板未經處理的',
  `SortCode` int(11) NOT NULL COMMENT '排序碼',
  `DeleteMark` int(11) NOT NULL COMMENT '刪除標記',
  `DbName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '資料庫名稱',
  `Disabled` int(11) NOT NULL COMMENT '有效',
  `Description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '備註',
  `CreateDate` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者主鍵',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者',
  `ModifyDate` datetime(0) DEFAULT NULL COMMENT '修改時間',
  `ModifyUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '修改使用者主鍵',
  `ModifyUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '修改使用者',
  `OrgId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬部門',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '表單模板表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of form
-- ----------------------------
INSERT INTO `form` VALUES ('0411376a-18fd-4f52-bffb-22ae0d3fa21d', '【研發小組】新人報到', 0, '', 0, '[{\"type\":\"text\",\"name\":\"USERNAME\",\"title\":\"USERNAME\",\"value\":\"\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"USERNAME\\\" value=\\\"\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p>你的姓名：{USERNAME}</p>', '<p>你的姓名：<input name=\"leipiNewField\" type=\"text\" title=\"USERNAME\" value=\"\" leipiplugins=\"text\" orghide=\"0\" orgalign=\"left\" orgwidth=\"150\" orgtype=\"text\" style=\"text-align: left; width: 150px;\"/></p>', 1, 0, NULL, 0, '這個表單只有【研發小組】許可權的人可以看到', '2020-03-18 22:56:02', '', '', '2020-03-18 22:56:44', '', '', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b');
INSERT INTO `form` VALUES ('318bb233-c9df-4374-9937-e55b71fbcf99', '【西南片區】報道', 0, '', 0, '[{\"type\":\"text\",\"name\":\"USERNAME\",\"title\":\"USERNAME\",\"value\":\"\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"USERNAME\\\" value=\\\"\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p>{USERNAME}，歡迎來到西南大區</p>', '<p><input name=\"leipiNewField\" type=\"text\" title=\"USERNAME\" value=\"\" leipiplugins=\"text\" orghide=\"0\" orgalign=\"left\" orgwidth=\"150\" orgtype=\"text\" style=\"text-align: left; width: 150px;\"/>，歡迎來到西南大區</p>', 1, 0, NULL, 0, '只有可以訪問【西南片區】的使用者可以看到', '2020-03-18 22:58:44', '', '', '2020-03-18 22:58:44', '', '', '60620558-89a2-4b28-8637-52f514773725');
INSERT INTO `form` VALUES ('8faff4e5-b729-44d2-ac26-e899a228f63d', '系統內建的複雜請假條表單', 1, 'FrmLeaveReq', 0, '', '', '', 0, 0, '', 0, '企業版內建的複雜請假條表單', '2019-07-29 01:03:36', '', '', '2019-07-29 01:03:36', '', '', NULL);
INSERT INTO `form` VALUES ('b08bb00f-e1df-44f8-904f-58ee5b1f4eb4', '領料單', 0, '', 0, '[{\"leipiplugins\":\"select\",\"name\":\"TOOLS\",\"title\":\"TOOLS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"電腦,平板,手機,簽字筆\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"TOOLS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"電腦\\\" selected=\\\"selected\\\">電腦</option><option value=\\\"平板\\\">平板</option><option value=\\\"手機\\\">手機</option><option value=\\\"簽字筆\\\">簽字筆</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"NUMBERS\",\"title\":\"NUMBERS\",\"value\":\"1\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"int\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"NUMBERS\\\" value=\\\"1\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"int\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"name\":\"APPLY_REASON\",\"title\":\"APPLY_REASON\",\"leipiplugins\":\"textarea\",\"value\":\"\",\"orgrich\":\"0\",\"orgfontsize\":\"\",\"orgwidth\":\"300\",\"orgheight\":\"80\",\"style\":\"width:300px;height:80px;\",\"content\":\"<textarea title=\\\"APPLY_REASON\\\" name=\\\"leipiNewField\\\" leipiplugins=\\\"textarea\\\" value=\\\"\\\" orgrich=\\\"0\\\" orgfontsize=\\\"\\\" orgwidth=\\\"300\\\" orgheight=\\\"80\\\" style=\\\"width:300px;height:80px;\\\"></textarea>\"},{\"leipiplugins\":\"checkboxs\",\"name\":\"\",\"title\":\"NEEDRETURN\",\"parse_name\":\"checkboxs_0\",\"value\":\"歸還,無需歸還\",\"content\":\"<span leipiplugins=\\\"checkboxs\\\"  title=\\\"NEEDRETURN\\\"><input type=\\\"checkbox\\\" name=\\\"leipiNewField\\\" value=\\\"歸還\\\"  checked=\\\"checked\\\"/>歸還&nbsp;<input type=\\\"checkbox\\\" name=\\\"leipiNewField\\\" value=\\\"無需歸還\\\"  />無需歸還&nbsp;</span>\",\"options\":[{\"name\":\"leipiNewField\",\"value\":\"歸還\",\"checked\":\"checked\",\"type\":\"checkbox\"},{\"name\":\"leipiNewField\",\"value\":\"無需歸還\",\"type\":\"checkbox\"}]}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">領料單</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><table data-sort=\"sortDisabled\"><tbody><tr class=\"firstRow\"><td width=\"534\" valign=\"top\" style=\"word-break: break-all;\"><span style=\"font-size: 24px;\">名目</span></td><td width=\"534\" valign=\"top\" style=\"word-break: break-all;\"><span style=\"font-size: 24px;\">數量</span></td><td width=\"534\" valign=\"top\" style=\"word-break: break-all;\"><span style=\"font-size: 24px;\">說明</span></td></tr><tr><td width=\"534\" valign=\"top\">{TOOLS}</td><td width=\"534\" valign=\"top\">{NUMBERS}</td><td width=\"534\" valign=\"top\">{APPLY_REASON}</td></tr><tr><td valign=\"top\" rowspan=\"1\" colspan=\"3\" style=\"word-break: break-all;\">{checkboxs_0}</td></tr></tbody></table><p style=\"text-align: center;\"><br/></p>', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">領料單</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><table data-sort=\"sortDisabled\"><tbody><tr class=\"firstRow\"><td width=\"534\" valign=\"top\" style=\"word-break: break-all;\"><span style=\"font-size: 24px;\">名目</span></td><td width=\"534\" valign=\"top\" style=\"word-break: break-all;\"><span style=\"font-size: 24px;\">數量</span></td><td width=\"534\" valign=\"top\" style=\"word-break: break-all;\"><span style=\"font-size: 24px;\">說明</span></td></tr><tr><td width=\"534\" valign=\"top\">{|-<span leipiplugins=\"select\"><select name=\"leipiNewField\" title=\"TOOLS\" leipiplugins=\"select\" size=\"1\" orgwidth=\"150\" style=\"width: 150px;\"><option value=\"電腦\" selected=\"selected\">電腦</option><option value=\"平板\">平板</option><option value=\"手機\">手機</option><option value=\"簽字筆\">簽字筆</option></select>&nbsp;&nbsp;</span>-|}</td><td width=\"534\" valign=\"top\"><input name=\"leipiNewField\" type=\"text\" title=\"NUMBERS\" value=\"1\" leipiplugins=\"text\" orghide=\"0\" orgalign=\"left\" orgwidth=\"150\" orgtype=\"int\" style=\"text-align: left; width: 150px;\"/></td><td width=\"534\" valign=\"top\"><textarea title=\"APPLY_REASON\" name=\"leipiNewField\" leipiplugins=\"textarea\" value=\"\" orgrich=\"0\" orgfontsize=\"\" orgwidth=\"300\" orgheight=\"80\" style=\"width:300px;height:80px;\"></textarea></td></tr><tr><td valign=\"top\" rowspan=\"1\" colspan=\"3\" style=\"word-break: break-all;\">{|-<span leipiplugins=\"checkboxs\"  title=\"NEEDRETURN\"><input type=\"checkbox\" name=\"leipiNewField\" value=\"歸還\"  checked=\"checked\"/>歸還&nbsp;<input type=\"checkbox\" name=\"leipiNewField\" value=\"無需歸還\"  />無需歸還&nbsp;</span>-|}</td></tr></tbody></table><p style=\"text-align: center;\"><br/></p>', 0, 0, '', 0, '帶有選擇框文字框覈取方塊等的領料單據', '2019-07-29 01:13:02', '', '', '2019-07-29 01:13:02', '', '', NULL);
INSERT INTO `form` VALUES ('ef89f96a-af33-407c-b02e-897faf46ecf0', '請假條表單', 0, '', 0, '[{\"type\":\"text\",\"name\":\"REASON\",\"title\":\"REASON\",\"value\":\"身體原因\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"REASON\\\" value=\\\"身體原因\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"},{\"leipiplugins\":\"select\",\"name\":\"DAYS\",\"title\":\"DAYS\",\"size\":\"1\",\"orgwidth\":\"150\",\"style\":\"width: 150px;\",\"value\":\"1,3,5,10\",\"selected\":\"selected\",\"content\":\"<span leipiplugins=\\\"select\\\"><select name=\\\"leipiNewField\\\" title=\\\"DAYS\\\" leipiplugins=\\\"select\\\" size=\\\"1\\\" orgwidth=\\\"150\\\" style=\\\"width: 150px;\\\"><option value=\\\"1\\\" selected=\\\"selected\\\">1</option><option value=\\\"3\\\">3</option><option value=\\\"5\\\">5</option><option value=\\\"10\\\">10</option></select>&nbsp;&nbsp;</span>\"},{\"type\":\"text\",\"name\":\"CUSTOME_NAME\",\"title\":\"CUSTOME_NAME\",\"value\":\"玉寶\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"CUSTOME_NAME\\\" value=\\\"玉寶\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因{REASON}，本人想請假{DAYS}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：{CUSTOME_NAME}</p>', '<p style=\"text-align: center;\"><span style=\"font-size: 36px;\">請假條</span></p><p><span style=\"font-size: 36px;\"><br/></span></p><p style=\"text-align: center;\">因<input name=\"leipiNewField\" type=\"text\" title=\"REASON\" value=\"身體原因\" leipiplugins=\"text\" orghide=\"0\" orgalign=\"left\" orgwidth=\"150\" orgtype=\"text\" style=\"text-align: left; width: 150px;\"/>，本人想請假{|-<span leipiplugins=\"select\"><select name=\"leipiNewField\" title=\"DAYS\" leipiplugins=\"select\" size=\"1\" orgwidth=\"150\" style=\"width: 150px;\"><option value=\"1\" selected=\"selected\">1</option><option value=\"3\">3</option><option value=\"5\">5</option><option value=\"10\">10</option></select>&nbsp;&nbsp;</span>-|}天，望領導批準！</p><p><br/></p><p style=\"text-align: center;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;謝謝！</p><p><br/></p><p style=\"text-align: right;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 申請人：<input name=\"leipiNewField\" type=\"text\" title=\"CUSTOME_NAME\" value=\"玉寶\" leipiplugins=\"text\" orghide=\"0\" orgalign=\"left\" orgwidth=\"150\" orgtype=\"text\" style=\"text-align: left; width: 150px;\"/></p>', 0, 0, '', 0, '帶有選擇框文字框的請假條', '2019-07-29 01:07:03', '', '', '2019-07-29 01:07:03', '', '', NULL);
INSERT INTO `form` VALUES ('febe218d-21a6-44b6-b7ce-b83e73556ad9', '審批流程', 0, 'FrmLeaveReq', 0, '[{\"type\":\"text\",\"name\":\"姓名\",\"title\":\"姓名\",\"value\":\"\",\"leipiplugins\":\"text\",\"orghide\":\"0\",\"orgalign\":\"left\",\"orgwidth\":\"150\",\"orgtype\":\"text\",\"style\":\"text-align: left; width: 150px;\",\"content\":\"<input name=\\\"leipiNewField\\\" type=\\\"text\\\" title=\\\"姓名\\\" value=\\\"\\\" leipiplugins=\\\"text\\\" orghide=\\\"0\\\" orgalign=\\\"left\\\" orgwidth=\\\"150\\\" orgtype=\\\"text\\\" style=\\\"text-align: left; width: 150px;\\\"/>\"}]', '<p>{姓名}</p>', '<p><input name=\"leipiNewField\" type=\"text\" title=\"姓名\" value=\"\" leipiplugins=\"text\" orghide=\"0\" orgalign=\"left\" orgwidth=\"150\" orgtype=\"text\" style=\"text-align: left; width: 150px;\"/></p>', 0, 0, '', 0, '', '2019-10-29 13:57:35', '', '', '2019-10-29 13:57:35', '', '', NULL);

-- ----------------------------
-- Table structure for frmleavereq
-- ----------------------------
DROP TABLE IF EXISTS `frmleavereq`;
CREATE TABLE `frmleavereq`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ID',
  `UserName` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '請假人姓名',
  `RequestType` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '請假分類，病假，事假，公休等',
  `StartDate` date NOT NULL COMMENT '開始日期',
  `StartTime` datetime(0) DEFAULT NULL COMMENT '開始時間',
  `EndDate` date NOT NULL COMMENT '結束日期',
  `EndTime` datetime(0) DEFAULT NULL COMMENT '結束時間',
  `RequestComment` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '請假說明',
  `Attachment` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '附件，用於提交病假證據等',
  `CreateDate` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者主鍵',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立使用者',
  `FlowInstanceId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬流程ID',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '模擬一個自定頁面的表單，該數據會關聯到流程實例FrmData，可用於複雜頁面的設計及後期的數據分析' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of frmleavereq
-- ----------------------------
INSERT INTO `frmleavereq` VALUES ('06307008-1dd9-48ad-a516-bcf4714cc9a7', '1', '病假', '2019-10-07', '2019-10-29 09:26:52', '2019-10-27', '2019-10-29 09:26:54', '111', '', '2019-10-29 17:27:06', '', '', 'd4f8d2b9-6374-4c10-8d3c-1ca540bc309b');
INSERT INTO `frmleavereq` VALUES ('59b5b72f-b8fb-44d4-bb24-319d02b2ab80', '李玉寶', '事假', '2019-07-08', '2019-07-28 17:23:14', '2019-07-24', '2019-07-28 17:23:18', '太累了，就是想休息一下', '', '2019-07-29 01:23:58', '', '', '0ae5abe6-f571-4e08-b264-667dc27c5025');

-- ----------------------------
-- Table structure for module
-- ----------------------------
DROP TABLE IF EXISTS `module`;
CREATE TABLE `module`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '功能模組流水號',
  `CascadeId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '節點語義ID',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '功能模組名稱',
  `Url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主頁面URL',
  `HotKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '熱鍵',
  `IsLeaf` tinyint(4) NOT NULL COMMENT '是否葉子節點',
  `IsAutoExpand` tinyint(4) NOT NULL COMMENT '是否自動展開',
  `IconName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '節點圖示檔名稱',
  `Status` int(11) NOT NULL COMMENT '當前狀態',
  `ParentName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '父節點名稱',
  `Vector` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '向量圖示',
  `SortNo` int(11) NOT NULL COMMENT '排序號',
  `ParentId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '父節點流水號',
  `Code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `IsSys` tinyint(4) NOT NULL COMMENT '是否為系統模組',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '功能模組表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of module
-- ----------------------------
INSERT INTO `module` VALUES ('0031262c-689c-4b96-bae2-2c9d67076ade', '.0.1.9.', '流程設計', '/flowSchemes/index', '', 0, 0, 'layui-icon-engine', 0, '基礎配置', '', 6, '7580672f-a390-4bb6-982d-9a4570cb5199', 'FlowScheme', 1);
INSERT INTO `module` VALUES ('069475e3-c997-487a-9f29-e6a864c5c1d4', '.0.2.', '流程中心', '/', '', 0, 0, 'layui-icon-senior', 0, '根節點', '', 3, NULL, NULL, 1);
INSERT INTO `module` VALUES ('15a3a401-e8eb-4d8b-9035-ecd5f53ed0c9', '.0.4.', '倉儲中心', '/', '', 0, 0, '', 0, '根節點', '', 2, NULL, '', 0);
INSERT INTO `module` VALUES ('37bb9414-19a0-4223-9056-71f8c758a930', '.0.2.5.', '已處理流程', '/flowinstances/disposed', '', 0, 0, 'layui-icon-ok-circle', 0, '流程中心', '', 3, '069475e3-c997-487a-9f29-e6a864c5c1d4', 'FlowInstanceDisposed', 1);
INSERT INTO `module` VALUES ('4abafc83-c8f5-452f-9882-e113a86e7a3e', '.0.2.6.', '待處理流程', '/flowinstances/wait', '', 0, 0, 'layui-icon-help', 0, '流程中心', '', 1, '069475e3-c997-487a-9f29-e6a864c5c1d4', 'FlowInstanceWait', 1);
INSERT INTO `module` VALUES ('6a9e1346-0c01-44d2-8eb1-f929fdab542a', '.0.1.10.', '部門管理', '/OrgManager/Index', '', 0, 0, 'layui-icon-group', 0, '基礎配置', '', 4, '7580672f-a390-4bb6-982d-9a4570cb5199', 'Org', 1);
INSERT INTO `module` VALUES ('7580672f-a390-4bb6-982d-9a4570cb5199', '.0.1.', '基礎配置', ' /', '', 0, 0, 'layui-icon-set-fill', 0, '根節點', '', 1, NULL, NULL, 1);
INSERT INTO `module` VALUES ('7bc7e527-478d-49fd-868d-5f31951586f5', '.0.3.1.', '系統日誌', '/SysLogs/Index', '', 0, 0, 'layui-icon-theme', 0, '訊息日誌', '', 1, 'b19bce90-5508-43b6-93ed-cd9ff9e356a9', 'SysLog', 1);
INSERT INTO `module` VALUES ('7bc7e527-478d-49fd-868d-5f31951586f6', '.0.3.2.', '我的訊息', '/SysMessages/Index', '', 0, 0, 'layui-icon-theme', 0, '訊息日誌', '', 2, 'b19bce90-5508-43b6-93ed-cd9ff9e356a9', 'SysMessage', 1);
INSERT INTO `module` VALUES ('907a24c6-3c95-4073-8f90-ea7ec42c63f7', '.0.1.19.', '定時任務', '/OpenJobs/Index', '', 0, 0, 'layui-icon-time', 0, '基礎配置', '', 2, '7580672f-a390-4bb6-982d-9a4570cb5199', 'OpenJob', 1);
INSERT INTO `module` VALUES ('92b00259-2d15-43e7-9321-adffb29e8bf2', '.0.1.11.', '表單設計', '/forms/index', '', 0, 0, 'layui-icon-theme', 0, '基礎配置', '', 5, '7580672f-a390-4bb6-982d-9a4570cb5199', 'Form', 1);
INSERT INTO `module` VALUES ('9486ff22-b696-4d7f-8093-8a3e53c45453', '.0.2.7.', '我的流程', '/flowInstances/Index', '', 0, 0, 'layui-icon-share', 0, '流程中心', '', 2, '069475e3-c997-487a-9f29-e6a864c5c1d4', 'FlowInstance', 1);
INSERT INTO `module` VALUES ('98a949e8-8704-40a7-b9a1-c0e8801e4057', '.0.4.1.', '入庫訂單', '/wmsinboundordertbls/index', '', 0, 0, '', 0, '倉儲中心', '', 1, '15a3a401-e8eb-4d8b-9035-ecd5f53ed0c9', 'WmsInboundOrderTbl', 0);
INSERT INTO `module` VALUES ('9a87c0fa-9172-42a1-9505-7492433dcb8e', '.0.1.16.', '數據許可權', '/dataprivilegerules/index', '', 0, 0, 'layui-icon-auz', 0, '基礎配置', '', 1, '7580672f-a390-4bb6-982d-9a4570cb5199', 'DataPrivilegeRule', 0);
INSERT INTO `module` VALUES ('a94d5648-c2a9-405e-ba6f-f1602ec9b807', '.0.1.17.', '字典分類', '/Categories/Index', '', 0, 0, '', 0, '基礎配置', '', 7, '7580672f-a390-4bb6-982d-9a4570cb5199', 'Category', 0);
INSERT INTO `module` VALUES ('b19bce90-5508-43b6-93ed-cd9ff9e356a9', '.0.3.', '訊息日誌', ' /', '', 0, 0, 'layui-icon-set-fill', 0, '根節點', '', 4, NULL, NULL, 1);
INSERT INTO `module` VALUES ('bc80478d-0547-4437-9cff-be4b40144bdf', '.0.1.13.', '模組管理', '/ModuleManager/Index', '', 0, 0, 'layui-icon-tabs', 0, '基礎配置', '', 1, '7580672f-a390-4bb6-982d-9a4570cb5199', 'Module', 1);
INSERT INTO `module` VALUES ('bedb41a2-f310-4775-af99-01be08adda93', '.0.1.14.', '角色管理', '/RoleManager/Index', '', 0, 0, 'layui-icon-user', 0, '基礎配置', '', 2, '7580672f-a390-4bb6-982d-9a4570cb5199', 'Role', 1);
INSERT INTO `module` VALUES ('e8dc5db6-4fc4-4795-a1cc-681cbcceec91', '.0.1.3.', '資源管理', '/Resources/Index', '', 0, 0, 'layui-icon-cellphone', 0, '基礎配置', '', 8, '7580672f-a390-4bb6-982d-9a4570cb5199', 'Resource', 0);
INSERT INTO `module` VALUES ('ef386d5d-cd58-43c0-a4ab-80afd0dbcd6c', '.0.1.15.', '使用者管理', '/UserManager/Index', '', 0, 0, 'layui-icon-friends', 0, '基礎配置', '', 3, '7580672f-a390-4bb6-982d-9a4570cb5199', 'User', 1);

-- ----------------------------
-- Table structure for moduleelement
-- ----------------------------
DROP TABLE IF EXISTS `moduleelement`;
CREATE TABLE `moduleelement`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '流水號',
  `DomId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'DOM ID',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名稱',
  `Attr` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '元素附加屬性',
  `Script` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '元素呼叫指令碼',
  `Icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '元素圖示',
  `Class` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '元素樣式',
  `Remark` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '備註',
  `Sort` int(11) NOT NULL COMMENT '排序欄位',
  `ModuleId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '功能模組Id',
  `TypeName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類名稱',
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類ID',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '模組元素表(需要許可權控制的按鈕)' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of moduleelement
-- ----------------------------
INSERT INTO `moduleelement` VALUES ('054e9699-7828-4b8b-a28b-d7ae45ed3306', 'btnEdit', '編輯', '', '', 'layui-icon-edit', 'layui-btn-normal', '', 2, '98a949e8-8704-40a7-b9a1-c0e8801e4057', '', '');
INSERT INTO `moduleelement` VALUES ('06fe4738-b4f4-4ecf-b9da-07dd3bb26cb3', 'btnDel', '撤銷訂單', '', '', 'layui-icon-delete', 'layui-btn-danger', '', 3, '98a949e8-8704-40a7-b9a1-c0e8801e4057', '', '');
INSERT INTO `moduleelement` VALUES ('0d25438e-1436-48e0-aedf-0f1690693281', 'btnRoleAccessUser', '新增角色使用者', '', 'assignRoleUser(this)', 'layui-icon-search', 'layui-btn-normal', '新增角色使用者', 4, 'bedb41a2-f310-4775-af99-01be08adda93', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('0d25438e-1436-48e0-aedf-0f1690693282', 'btnAccessModule', '為角色分配模組', '', 'assignRoleModule(this)', 'layui-icon-search', 'layui-btn-normal', '為角色分配模組', 4, 'bedb41a2-f310-4775-af99-01be08adda93', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('13617796-049c-4ae4-a62b-1ca84002b273', 'btnDelCategory', '刪除分類', '', '', 'layui-icon-delete', 'layui-btn-danger', '', 0, 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', '', '');
INSERT INTO `moduleelement` VALUES ('15a4f88c-4fae-4cab-ba2f-0cbd2cca8736', 'btnAssignReource', '為角色分配資源', '', 'openRoleReourceAccess(this)', 'layui-icon-search', 'layui-btn-normal', '為角色分配資源', 3, 'bedb41a2-f310-4775-af99-01be08adda93', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('17ae4fd4-ab4e-439e-ba1d-2a53b46d112b', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '', 2, '0031262c-689c-4b96-bae2-2c9d67076ade', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('18cc3217-28a6-49b2-9a20-080230065984', 'btnEdit', '編輯', '', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '', 1, '0031262c-689c-4b96-bae2-2c9d67076ade', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('1a473afd-cbd4-41e9-9471-81f9435aaabe', 'btnEdit', '編輯', ' ', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '編輯分類', 2, 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('1c870438-4260-43a5-8996-a6e1dc8bbf6a', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增部門', 0, '6a9e1346-0c01-44d2-8eb1-f929fdab542a', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('1c870438-4260-43a5-8996-a6e1dc8bbf6b', 'btnAssignOrgUser', '分配使用者', '', 'assignOrgUser(this)', 'layui-icon-add-1', 'layui-btn-normal', '分配使用者', 0, '6a9e1346-0c01-44d2-8eb1-f929fdab542a', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('1c9acc3e-a40d-4d07-b495-6e60eb9b71b9', 'btnEdit', '編輯', '', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '編輯角色', 1, 'bedb41a2-f310-4775-af99-01be08adda93', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('2d595a2a-5de5-479e-a331-b53c799a6b10', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增分類', 1, 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('2d595a2a-5de5-479e-a331-b53c799a6b11', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增定時任務', 1, '907a24c6-3c95-4073-8f90-ea7ec42c63f7', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('2feefce1-e3d8-42ac-b811-2352679628da', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '刪除用戶', 2, 'ef386d5d-cd58-43c0-a4ab-80afd0dbcd6c', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('2feefce1-e3d8-42ac-b811-2352679628dd', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '刪除定時任務', 3, '907a24c6-3c95-4073-8f90-ea7ec42c63f7', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('34730f5a-d307-457b-9041-5f7de30abfa9', 'btnEdit', '編輯', '', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '編輯使用者', 1, 'ef386d5d-cd58-43c0-a4ab-80afd0dbcd6c', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('34730f5a-d307-457b-9041-5f7de30abfaa', 'btnEdit', '編輯', '', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '編輯定時任務', 2, '907a24c6-3c95-4073-8f90-ea7ec42c63f7', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('362d1eda-c85e-4b14-a80a-b923291e08de', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增', 0, 'f0f06b8f-0a86-487c-8b0e-0a12573ccd46', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('38109ca0-32ec-44bd-a243-017e591b532b', 'btnEditStock', '編輯', ' ', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '編輯進出庫', 0, '89c3bfbe-246f-4112-8eb1-b6789da54202', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('3dc0ec4d-bf86-4bae-9ec0-1d6c2403fb99', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '', 1, '92b00259-2d15-43e7-9321-adffb29e8bf2', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('44075557-496e-4dde-bb75-7b69f51ab4fe', 'btnEdit', '編輯', '', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '編輯模組', 2, 'bc80478d-0547-4437-9cff-be4b40144bdf', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('4bfa8ea0-6b0d-426f-8687-b654575ca780', 'btnEdit', '編輯', '', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '編輯資源', 2, 'e8dc5db6-4fc4-4795-a1cc-681cbcceec91', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('4f2737db-633f-4946-8a71-b08b9885f151', 'btnEdit', '編輯', '', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '', 2, '92b00259-2d15-43e7-9321-adffb29e8bf2', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('50c9df24-b233-42cb-9a0d-4ce158c75f86', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增用戶', 0, 'ef386d5d-cd58-43c0-a4ab-80afd0dbcd6c', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('584c7a3b-d28a-47b4-8648-7797d05d83d1', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '', 3, '9486ff22-b696-4d7f-8093-8a3e53c45453', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('5ed1681c-13d2-4c87-8675-a8d95c0b40ae', 'btnAddMenu', '新增菜單', '', 'assignButton()', 'layui-icon-add-1', 'layui-btn-normal', '為模組分配按鈕', 4, 'bc80478d-0547-4437-9cff-be4b40144bdf', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('5ed1681c-13d2-4c87-8676-a8d95c0b40ae', 'btnEditMenu', '編輯菜單', '', '', 'layui-icon-add-1', 'layui-btn-normal', '編輯菜單', 5, 'bc80478d-0547-4437-9cff-be4b40144bdf', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('5ed1681c-13d2-4c87-8677-a8d95c0b40ae', 'btnDelMenu', '刪除菜單', '', '', 'layui-icon-delete', 'layui-btn-danger', '', 6, 'bc80478d-0547-4437-9cff-be4b40144bdf', '', '');
INSERT INTO `moduleelement` VALUES ('645b40ac-4223-44a7-aab4-66eb56cf9864', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增角色', 0, 'bedb41a2-f310-4775-af99-01be08adda93', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('68484265-7802-4f06-b024-33e8b2f2edcf', 'btnAdd', '新的申請', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '申請物品', 0, '9486ff22-b696-4d7f-8093-8a3e53c45453', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('68fc793f-069f-43e1-a012-42ac2d7c585c', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '刪除角色', 2, 'bedb41a2-f310-4775-af99-01be08adda93', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('6c814946-db5c-48bd-84dd-b1c38196ad74', 'btnAdd', '新增模版', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '', 0, '0031262c-689c-4b96-bae2-2c9d67076ade', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('6db928fe-93df-460f-9472-8bb0b6cae52c', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增進出庫', 0, '89c3bfbe-246f-4112-8eb1-b6789da54202', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('79dcd3eb-3aaf-4e08-83c9-713d8ff446fe', 'btnVerification', '處理', '', 'verificationForm()', 'layui-icon-triangle-r', 'layui-btn-normal', '', 1, '4abafc83-c8f5-452f-9882-e113a86e7a3e', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('7b2b1ffb-398b-4f7b-83da-8f484e1bcea0', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '刪除部門', 2, '6a9e1346-0c01-44d2-8eb1-f929fdab542a', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('7f071c63-1620-4486-9264-5806b2e63218', 'btnAccessRole', '為使用者分配角色', '', 'openUserRoleAccess(this)', 'layui-icon-search', 'layui-btn-normal', '為使用者分配角色', 5, 'ef386d5d-cd58-43c0-a4ab-80afd0dbcd6c', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('816b12b3-e916-446d-a2fa-329cfd13c831', 'btnDetail', '進度詳情', '', '', 'layui-icon-search', 'layui-btn-normal', '', 4, '9486ff22-b696-4d7f-8093-8a3e53c45453', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('81ce1abe-209d-4e4c-a8d2-efbc6a3b45ba', 'btnAdd', '新增', '', '', 'layui-icon-add-1', 'layui-btn-normal', '', 1, '9a87c0fa-9172-42a1-9505-7492433dcb8e', '', '');
INSERT INTO `moduleelement` VALUES ('826b12b3-e916-446d-a2fa-329cfd13c831', 'btnDetail', '進度詳情', '', '', 'layui-icon-search', 'layui-btn-normal', '', 2, '4abafc83-c8f5-452f-9882-e113a86e7a3e', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('84694ea5-d6e1-4a65-8a59-7b5b779688d4', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增模組', 1, 'bc80478d-0547-4437-9cff-be4b40144bdf', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('84e38920-f6e5-499c-bf52-a3c6f8499ff7', 'btnDel', '刪除', ' ', 'del()', 'layui-icon-delete', 'layui-btn-danger', '刪除分類', 3, 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('8966b04f-8e26-4046-8b03-0c64f9f833dd', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '', 3, '92b00259-2d15-43e7-9321-adffb29e8bf2', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('95c2dde0-f2a7-4474-8aa7-c7eaa7c4c87f', 'btnDel', '刪除', '', '', 'layui-icon-delete', 'layui-btn-danger', '', 1, '9a87c0fa-9172-42a1-9505-7492433dcb8e', '', '');
INSERT INTO `moduleelement` VALUES ('9c96e485-84a6-45f0-b6a7-f01dab94b0c6', 'btnPreview', '預覽', '', 'preview()', 'layui-icon-search', 'layui-btn-normal', '', 4, '92b00259-2d15-43e7-9321-adffb29e8bf2', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('9e2c6754-f258-4b14-96a0-b9d981196a65', 'btnAdd', '新增', '', 'add()', 'layui-icon-add-1', 'layui-btn-normal', '新增資源', 0, 'e8dc5db6-4fc4-4795-a1cc-681cbcceec91', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('a7eea5dc-3b10-4550-9cf3-0dba9b9fc32c', 'btnAddCategory', '新增分類', '', '', 'layui-icon-add-1', 'layui-btn-normal', '', 0, 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', '', '');
INSERT INTO `moduleelement` VALUES ('b3e23ebc-0ff2-41b3-bff0-fd5e93f6828a', 'btnDetail', '檢視詳情', '', '', 'layui-icon-search', 'layui-btn-normal', '', 0, '37bb9414-19a0-4223-9056-71f8c758a930', '', '');
INSERT INTO `moduleelement` VALUES ('c35d8f5b-0d38-4f31-84f9-39e476eeab08', 'btnAdd', '新訂單', '', '', 'layui-icon-add-1', 'layui-btn-normal', '', 1, '98a949e8-8704-40a7-b9a1-c0e8801e4057', '', '');
INSERT INTO `moduleelement` VALUES ('c3d7b478-21e9-4c1e-b866-a3c80be7909b', 'btnRefresh', '重新整理', '', 'refresh()', 'layui-icon-refresh', 'layui-btn-normal', '重新整理分類', 0, 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('c4c1acbb-9cbf-4b1e-9cc0-ccf5ff544ec2', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '刪除進出庫', 0, '89c3bfbe-246f-4112-8eb1-b6789da54202', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('c7d7daf0-3669-4a22-8bed-b092617deb9c', 'btnDel', '刪除', '', 'del()', 'layui-icon-delete', 'layui-btn-danger', '刪除資源', 3, 'e8dc5db6-4fc4-4795-a1cc-681cbcceec91', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('d1ba6a72-ba14-44c0-baba-46d0ad96fe8a', 'btnRefresh', '重新整理', '', 'refresh()', 'layui-icon-refresh', 'layui-btn-normal', '重新整理使用者', 3, 'ef386d5d-cd58-43c0-a4ab-80afd0dbcd6c', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('d352c8ee-3dff-4d28-a0de-903ae68f2533', 'btnPreview', '預覽', '', 'preview()', 'layui-icon-cellphone', 'layui-btn-normal', '', 3, '0031262c-689c-4b96-bae2-2c9d67076ade', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('daddf3b9-71b5-45ac-b85d-5a11c522f2f4', 'btnDel', '刪除', ' ', 'del()', 'layui-icon-delete', 'layui-btn-danger', '刪除模組', 3, 'bc80478d-0547-4437-9cff-be4b40144bdf', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('ef42721f-d223-4a00-a1d9-80b81121f21a', 'btnEdit', '編輯', ' ', 'edit()', 'layui-icon-edit', 'layui-btn-normal', '編輯部門', 1, '6a9e1346-0c01-44d2-8eb1-f929fdab542a', NULL, NULL);
INSERT INTO `moduleelement` VALUES ('f8dde22a-2a37-47c4-8e67-70fb3af5303e', 'btnRefresh', '重新整理', '', 'refresh()', 'layui-icon-refresh', 'layui-btn-normal', '重新整理部門', 3, '6a9e1346-0c01-44d2-8eb1-f929fdab542a', NULL, NULL);

-- ----------------------------
-- Table structure for openjob
-- ----------------------------
DROP TABLE IF EXISTS `openjob`;
CREATE TABLE `openjob`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Id',
  `JobName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任務名稱',
  `RunCount` int(11) NOT NULL DEFAULT 0 COMMENT '任務執行次數',
  `ErrorCount` int(11) NOT NULL DEFAULT 0 COMMENT '異常次數',
  `NextRunTime` datetime(0) DEFAULT NULL COMMENT '下次執行時間',
  `LastRunTime` datetime(0) DEFAULT NULL COMMENT '最後一次執行時間',
  `LastErrorTime` datetime(0) DEFAULT NULL COMMENT '最後一次失敗時間',
  `JobType` int(11) NOT NULL DEFAULT 0 COMMENT '任務執行方式0：本地任務；1：外部接口任務',
  `JobCall` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任務地址',
  `JobCallParams` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '任務參數，JSON格式',
  `Cron` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'CRON表達式',
  `Status` int(11) NOT NULL DEFAULT 0 COMMENT '任務執行狀態（0：停止，1：正在執行，2：暫停）',
  `Remark` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '備註',
  `CreateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人ID',
  `CreateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人',
  `UpdateTime` datetime(0) DEFAULT NULL COMMENT '最後更新時間',
  `UpdateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人ID',
  `UpdateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人',
  `OrgId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬部門',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '定時任務' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of openjob
-- ----------------------------
INSERT INTO `openjob` VALUES ('f40fe48d-71a4-4f47-b324-6178d97abfb9', '定時日誌任務', 0, 0, '2020-04-25 12:16:20', '2020-04-25 12:16:20', '2020-04-25 12:16:20', 0, 'OpenAuth.App.Jobs.SysLogJob', 'null', '0/10 * * * * ?', 0, '這是個每10秒執行一次的任務，可以在系統日誌中檢視執行結果', '2020-04-25 12:16:20', '00000000-0000-0000-0000-000000000000', '超級管理員', '2020-04-25 19:31:38', '00000000-0000-0000-0000-000000000000', '超級管理員', '');

-- ----------------------------
-- Table structure for org
-- ----------------------------
DROP TABLE IF EXISTS `org`;
CREATE TABLE `org`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '流水號',
  `CascadeId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '節點語義ID',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '組織名稱',
  `HotKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '熱鍵',
  `ParentName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '父節點名稱',
  `IsLeaf` tinyint(4) NOT NULL COMMENT '是否葉子節點',
  `IsAutoExpand` tinyint(4) NOT NULL COMMENT '是否自動展開',
  `IconName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '節點圖示檔名稱',
  `Status` int(11) NOT NULL COMMENT '當前狀態',
  `BizCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '業務對照碼',
  `CustomCode` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '自定義擴充套件碼',
  `CreateTime` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateId` int(11) NOT NULL COMMENT '建立人ID',
  `SortNo` int(11) NOT NULL COMMENT '排序號',
  `ParentId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '父節點流水號',
  `TypeName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類名稱',
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類ID',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '組織表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of org
-- ----------------------------
INSERT INTO `org` VALUES ('08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', '.0.1.4.1.', '研發小組', '', '匯豐軟體部', 0, 0, '', 0, '0', '', '2016-10-14 11:40:31', 0, 1, '86449128-d5ac-44bf-b999-f7735b7458fd', NULL, NULL);
INSERT INTO `org` VALUES ('182dac38-64a0-414c-990c-7c9b7558a367', '.0.4.', '中部片區', '', '根節點', 0, 0, '', 0, '', '', '2019-10-31 21:52:38', 0, 0, NULL, '', '');
INSERT INTO `org` VALUES ('1b965fff-3dcd-42ff-9624-2c8eb4f9b1c6', '.0.5.1.', '廣州營銷中心', '', '華南片區', 0, 0, '', 0, '', '', '2019-10-31 21:56:39', 0, 0, '8e31553c-cab8-4eb3-90b5-5f8ff1d21801', '', '');
INSERT INTO `org` VALUES ('2089637b-403d-4d4d-91ff-c8a554973f96', '.0.4.1.', '海外市場部', '', '中部片區', 0, 0, '', 0, '', '', '2019-10-31 21:53:54', 0, 0, '182dac38-64a0-414c-990c-7c9b7558a367', '', '');
INSERT INTO `org` VALUES ('3d2ad14c-2c56-4a90-a2db-6bde26b0b8b3', '.0.3.1.', '成都營銷中心', '', '西南片區', 0, 0, '', 0, '', '', '2019-10-31 21:55:42', 0, 0, '60620558-89a2-4b28-8637-52f514773725', '', '');
INSERT INTO `org` VALUES ('4a3920f1-1470-477e-97ec-0996eb83b638', '.0.1.6.', '市場2部', '', '總部大區', 0, 0, '', 0, '', '', '2019-10-31 21:55:07', 0, 0, '543a9fcf-4770-4fd9-865f-030e562be238', '', '');
INSERT INTO `org` VALUES ('543a9fcf-4770-4fd9-865f-030e562be238', '.0.1.', '總部大區', '', '根節點', 0, 0, '', 0, '0', '', '2016-10-14 11:37:13', 0, 0, NULL, NULL, NULL);
INSERT INTO `org` VALUES ('60620558-89a2-4b28-8637-52f514773725', '.0.3.', '西南片區', '', '根節點', 0, 0, '', 0, '', '', '2019-10-31 21:52:30', 0, 0, NULL, '', '');
INSERT INTO `org` VALUES ('66386671-0494-4e83-8346-fbcf73283f7b', '.0.2.', '華東片區', '', '根節點', 0, 0, '', 0, '', '', '2019-10-31 21:52:19', 0, 0, NULL, '', '');
INSERT INTO `org` VALUES ('8047e605-c54a-48bd-81da-daa9c1fc9091', '.0.4.2.', '鄭州營銷中心', '', '中部片區', 0, 0, '', 0, '', '', '2019-10-31 21:54:50', 0, 0, '182dac38-64a0-414c-990c-7c9b7558a367', '', '');
INSERT INTO `org` VALUES ('86449128-d5ac-44bf-b999-f7735b7458fd', '.0.1.4.', '軟體部', '', '總部大區', 0, 0, '', 1, '0', '', '2016-05-26 15:11:03', 0, 1, '543a9fcf-4770-4fd9-865f-030e562be238', NULL, NULL);
INSERT INTO `org` VALUES ('8e31553c-cab8-4eb3-90b5-5f8ff1d21801', '.0.5.', '華南片區', '', '根節點', 0, 0, '', 0, '', '', '2019-10-31 21:52:55', 0, 0, NULL, '', '');
INSERT INTO `org` VALUES ('9cd918bf-28bc-44de-8e07-23cacbb67f42', '.0.1.7.', '總經辦', '', '總部大區', 0, 0, '', 0, '', '', '2019-10-31 21:57:40', 0, 0, '543a9fcf-4770-4fd9-865f-030e562be238', '', '');
INSERT INTO `org` VALUES ('b2083488-64e5-44cc-b8f4-929ffa6f2f72', '.0.2.1.', '上海VIP中心', '', '華東片區', 0, 0, '', 0, '', '', '2019-10-31 21:56:25', 0, 0, '66386671-0494-4e83-8346-fbcf73283f7b', '', '');
INSERT INTO `org` VALUES ('c36e43df-3a99-45da-80d9-3ac5d24f4014', '.0.1.5.', '市場1部', '', '總部大區', 0, 0, '', 0, '0', '', '2016-05-26 15:10:40', 0, 1, '543a9fcf-4770-4fd9-865f-030e562be238', NULL, NULL);
INSERT INTO `org` VALUES ('c455d009-12d7-4c78-953f-264f0ca67a3d', '.0.6.1.', '天津營銷中心', '', '華北片區', 0, 0, '', 0, '', '', '2019-10-31 21:56:54', 0, 0, 'eed8756d-587b-46de-96c7-0a400e3d80fa', '', '');
INSERT INTO `org` VALUES ('ced1b2f0-4b53-44b8-9c42-a5d607ccc9c9', '.0.1.8.', '上市辦', '', '總部大區', 0, 0, '', 0, '', '', '2019-10-31 21:57:53', 0, 0, '543a9fcf-4770-4fd9-865f-030e562be238', '', '');
INSERT INTO `org` VALUES ('df442c27-68a0-428e-a309-cba23a994a9d', '.0.3.2.', '重慶營銷中心', '', '西南片區', 0, 0, '', 0, '', '', '2019-10-31 21:56:06', 0, 0, '60620558-89a2-4b28-8637-52f514773725', '', '');
INSERT INTO `org` VALUES ('eed8756d-587b-46de-96c7-0a400e3d80fa', '.0.6.', '華北片區', '', '根節點', 0, 0, '', 0, '', '', '2019-10-31 21:53:04', 0, 0, NULL, '', '');

-- ----------------------------
-- Table structure for relevance
-- ----------------------------
DROP TABLE IF EXISTS `relevance`;
CREATE TABLE `relevance`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '流水號',
  `Description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '描述',
  `Key` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '對映標識',
  `Status` int(11) NOT NULL COMMENT '狀態',
  `OperateTime` datetime(0) NOT NULL COMMENT '授權時間',
  `OperatorId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '授權人',
  `FirstId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '第一個表主鍵ID',
  `SecondId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '第二個表主鍵ID',
  `ThirdId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '第三個表主鍵ID',
  `ExtendInfo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '擴充套件資訊',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '多對多關係集中對映' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of relevance
-- ----------------------------
INSERT INTO `relevance` VALUES ('00ae6b5c-21fa-4dc9-8ca4-7df669253255', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'c3d7b478-21e9-4c1e-b866-a3c80be7909b', '', '');
INSERT INTO `relevance` VALUES ('01ba383d-fe81-473a-84a1-f64ce8a5aae5', '', 'UserOrg', 0, '2019-10-31 21:50:42', '', '229f3a49-ab27-49ce-b383-9f10ca23a9d5', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', '', '');
INSERT INTO `relevance` VALUES ('026ffa48-8cdf-4452-9ac7-b1b55e58e02a', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'c35d8f5b-0d38-4f31-84f9-39e476eeab08', '', '');
INSERT INTO `relevance` VALUES ('032e20b6-7273-49f9-9b84-0040323114c0', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'CreateUserId', '');
INSERT INTO `relevance` VALUES ('03b55a9e-a44f-44fa-9383-4117bf8aba60', '', 'RoleResource', 0, '2018-09-12 00:15:54', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'XXX_DELETEACCOUNT', NULL, NULL);
INSERT INTO `relevance` VALUES ('03be9b5e-38b0-4525-8431-b26d35ce6ce3', '', 'UserElement', 0, '2016-09-07 15:30:43', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '816b12b3-e916-446d-a2fa-329cfd13c831', NULL, NULL);
INSERT INTO `relevance` VALUES ('054a8347-a62c-4e62-b9b2-0b2d14e9ff94', '', 'RoleModule', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '7580672f-a390-4bb6-982d-9a4570cb5199', '', '');
INSERT INTO `relevance` VALUES ('06dfd97d-17e0-42b8-bde7-40006d8c8eb2', '', 'UserElement', 0, '2018-04-06 14:50:37', '', '49df1602-f5f3-4d52-afb7-3802da619558', '584c7a3b-d28a-47b4-8648-7797d05d83d1', NULL, NULL);
INSERT INTO `relevance` VALUES ('06f4c4a2-faa8-4bad-9184-50ceb517f30b', '', 'ProcessUser', 0, '2016-09-08 16:48:14', '0', '10cc09fb-d469-41e5-ae3f-fdd805a4bd4c', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', NULL, NULL);
INSERT INTO `relevance` VALUES ('077e24ab-4c48-4a5e-bfa9-90ea00449136', '', 'RoleOrg', 0, '2018-09-12 00:08:47', '', '3e761e88-ddf7-4a62-b219-9a315b4564f2', '86449128-d5ac-44bf-b999-f7735b7458fd', NULL, NULL);
INSERT INTO `relevance` VALUES ('08ff97f7-17fc-4072-b29a-287135898ece', '', 'RoleResource', 0, '2016-09-04 23:20:22', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'fdf3aac3-4507-40ad-aa2f-d7f0459de252', NULL, NULL);
INSERT INTO `relevance` VALUES ('0b3d3a9b-8a96-43d4-918c-fa7e3ea5f5ca', '', 'RoleOrg', 0, '2018-09-12 00:08:37', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('0fd5b371-b010-4846-8833-95cc1e813a32', '', 'UserElement', 0, '2016-09-07 15:31:16', '0', 'ea25646b-964b-4d41-ab03-d8964e1494fb', '68484265-7802-4f06-b024-33e8b2f2edcf', NULL, NULL);
INSERT INTO `relevance` VALUES ('10669494-70e2-4583-b5fd-191d7219b792', '', 'RoleDataProperty', 0, '2019-11-23 00:51:40', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'Resource', 'AppId', '');
INSERT INTO `relevance` VALUES ('109dcd85-9f50-4b7b-8615-c107496986ba', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'b3e23ebc-0ff2-41b3-bff0-fd5e93f6828a', '', '');
INSERT INTO `relevance` VALUES ('10a76196-ba0c-4294-bb8f-dcd063eb4aab', '', 'UserOrg', 0, '2017-10-12 09:13:38', '', '3eacdedd-e93a-4816-b49c-99ba3d5323c2', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('10e58d75-dec1-4b85-882f-9dac79ad1210', '', 'RoleResource', 0, '2016-10-21 18:08:13', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', 'ec99f670-0eca-465c-9f64-d4d5dc510b83', NULL, NULL);
INSERT INTO `relevance` VALUES ('120d7a5d-203c-4261-95f5-0125757fb386', '', 'UserElement', 0, '2016-10-20 17:01:01', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '7f071c63-1620-4486-9264-5806b2e63218', NULL, NULL);
INSERT INTO `relevance` VALUES ('12f282b5-e87f-416e-8a7c-f9830d115b9a', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'UpdateUserId', '');
INSERT INTO `relevance` VALUES ('13433400-a32c-4539-b988-8b417c09bc0e', '', 'UserModule', 0, '2016-09-07 15:30:07', '0', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', '9486ff22-b696-4d7f-8093-8a3e53c45453', NULL, NULL);
INSERT INTO `relevance` VALUES ('13612a4c-b20c-4bd0-a2cd-0ae47576364d', '', 'UserElement', 0, '2016-10-20 16:34:12', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', 'c7d7daf0-3669-4a22-8bed-b092617deb9c', NULL, NULL);
INSERT INTO `relevance` VALUES ('148e317e-dacf-44b4-b3b8-7f68af74acdd', '', 'RoleModule', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '069475e3-c997-487a-9f29-e6a864c5c1d4', '', '');
INSERT INTO `relevance` VALUES ('1490edd4-9bd3-4e71-bfa4-56f6558c1d3f', '', 'UserElement', 0, '2018-04-06 09:48:24', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '79dcd3eb-3aaf-4e08-83c9-713d8ff446fe', NULL, NULL);
INSERT INTO `relevance` VALUES ('15705855-3e8d-4404-98f4-59af683f20ce', '', 'RoleModule', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '98a949e8-8704-40a7-b9a1-c0e8801e4057', '', '');
INSERT INTO `relevance` VALUES ('15e66b55-cdce-47a1-9c08-21d5525524e8', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '0031262c-689c-4b96-bae2-2c9d67076ade', '', '');
INSERT INTO `relevance` VALUES ('16154fc4-d18e-44a3-bcf2-5539b168aba7', '', 'RoleElement', 0, '2016-10-24 17:25:15', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '18cc3217-28a6-49b2-9a20-080230065984', NULL, NULL);
INSERT INTO `relevance` VALUES ('1740ff26-a4d0-44cc-9fab-a0105c2c60b6', '', 'UserOrg', 0, '2017-10-12 13:59:49', '', '63c9c82a-e0d3-4bde-bbd2-057cda2f5283', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('18389d29-c82d-4181-8ea0-1440ca1c2093', '', 'RoleElement', 0, '2020-03-19 22:31:02', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', '9e2c6754-f258-4b14-96a0-b9d981196a65', '', '');
INSERT INTO `relevance` VALUES ('183905f3-620c-4995-aead-1e80c5899517', '', 'RoleDataProperty', 0, '2019-11-23 00:19:30', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'Category', 'Id', '');
INSERT INTO `relevance` VALUES ('1873ed85-a88a-4236-bd40-2c416aa2576c', '', 'RoleModule', 0, '2016-09-02 17:03:39', '0', '211e12c7-e466-496e-8d26-0660a38e24cc', '7580672f-a390-4bb6-982d-9a4570cb5199', NULL, NULL);
INSERT INTO `relevance` VALUES ('18aa904d-6625-430d-9475-ec84d8c8e605', '', 'RoleModule', 0, '2020-03-19 22:31:02', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'e8dc5db6-4fc4-4795-a1cc-681cbcceec91', '', '');
INSERT INTO `relevance` VALUES ('19c9621c-3d23-46b7-a841-54d5c82ec8e8', '', 'UserOrg', 0, '2016-09-02 13:56:53', '0', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('1aaa04f0-bd9f-44a0-8bc2-3f7a74684c42', '', 'RoleDataProperty', 0, '2019-11-23 00:19:30', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'Category', 'DtCode', '');
INSERT INTO `relevance` VALUES ('1acec4c4-0136-4e2b-a839-8676dbd6594a', '', 'ProcessUser', 0, '2016-09-14 11:38:23', '0', '6c6afe3c-349c-4198-8710-cf19c90f3afd', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', NULL, NULL);
INSERT INTO `relevance` VALUES ('1ced1564-2fea-4c04-8aea-f071fa5bb293', '', 'UserModule', 0, '2016-09-05 16:24:55', '0', 'ea25646b-964b-4d41-ab03-d8964e1494fb', '069475e3-c997-487a-9f29-e6a864c5c1d4', NULL, NULL);
INSERT INTO `relevance` VALUES ('1cf19b35-e2c2-436f-99b9-03ac2b232cc6', '', 'RoleElement', 0, '2016-09-04 23:21:04', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '44075557-496e-4dde-bb75-7b69f51ab4fe', NULL, NULL);
INSERT INTO `relevance` VALUES ('1dca9a35-06e8-4275-8902-13c619880357', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'ScheduledInboundTime', '');
INSERT INTO `relevance` VALUES ('1e84dafd-3f4d-4b13-a738-2cf0c98e2351', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'AppId', '');
INSERT INTO `relevance` VALUES ('1fb6b802-2a1f-49a8-b2fa-c5d223a8538c', '', 'RoleDataProperty', 0, '2019-11-23 00:51:40', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'Resource', 'UpdateTime', '');
INSERT INTO `relevance` VALUES ('2014027e-0cff-41cf-974b-56126d6eaa9a', '', 'RoleElement', 0, '2016-09-05 09:22:11', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', 'c4c1acbb-9cbf-4b1e-9cc0-ccf5ff544ec2', NULL, NULL);
INSERT INTO `relevance` VALUES ('224fa0b0-cdd6-47cf-89c5-45ad2a64bfd5', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'OrderType', '');
INSERT INTO `relevance` VALUES ('23339fa0-94f4-4d35-a775-bda84d152841', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '069475e3-c997-487a-9f29-e6a864c5c1d4', '', '');
INSERT INTO `relevance` VALUES ('242e9543-3343-41d4-8816-15ffeeaef551', '', 'UserElement', 0, '2016-09-07 15:31:16', '0', 'ea25646b-964b-4d41-ab03-d8964e1494fb', '584c7a3b-d28a-47b4-8648-7797d05d83d1', NULL, NULL);
INSERT INTO `relevance` VALUES ('27c4d50c-32da-4dbc-88a1-84b343cdd649', '', 'UserElement', 0, '2016-10-20 17:01:00', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '6839a297-350b-4215-b680-4e5dfdae5615', NULL, NULL);
INSERT INTO `relevance` VALUES ('29b06cd6-af0c-4c63-9aba-e5431c5d62ec', '', 'UserOrg', 0, '2017-10-12 09:13:38', '', '3eacdedd-e93a-4816-b49c-99ba3d5323c2', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('2a36a2b7-41aa-4190-b88c-75d44a56ad6e', '', 'UserModule', 0, '2017-02-06 00:14:18', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '92b00259-2d15-43e7-9321-adffb29e8bf2', NULL, NULL);
INSERT INTO `relevance` VALUES ('2a8a790f-0b9a-4ab3-8e4f-aae4bfddc609', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'PurchaseNo', '');
INSERT INTO `relevance` VALUES ('2bb3fddb-0f51-442e-8dbf-236beb47d8a6', '', 'RoleOrg', 0, '2018-04-14 13:16:45', '', '77e6d0c3-f9e1-4933-92c3-c1c6eef75593', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('2c67ac44-5b67-4942-b457-2212e9a5dbf9', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'e8dc5db6-4fc4-4795-a1cc-681cbcceec91', '', '');
INSERT INTO `relevance` VALUES ('2ca288a6-d222-4328-951e-c01c3e77a0c7', '', 'RoleElement', 0, '2016-09-04 23:21:00', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '7f071c63-1620-4486-9264-5806b2e63218', NULL, NULL);
INSERT INTO `relevance` VALUES ('2d0fcc88-a7c0-4d33-8a08-1d688e9dde83', '', 'RoleModule', 0, '2016-09-02 17:03:39', '0', '211e12c7-e466-496e-8d26-0660a38e24cc', 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', NULL, NULL);
INSERT INTO `relevance` VALUES ('2d15e438-cc3a-41e9-9b13-325bfd5c804a', '', 'RoleElement', 0, '2016-09-04 23:21:09', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '84e38920-f6e5-499c-bf52-a3c6f8499ff7', NULL, NULL);
INSERT INTO `relevance` VALUES ('2e1d286c-b771-43b0-947e-eeab185cc014', '', 'RoleModule', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '4abafc83-c8f5-452f-9882-e113a86e7a3e', '', '');
INSERT INTO `relevance` VALUES ('2ebff9a4-b2d5-4a35-a7dd-2cfa2f5b0522', '', 'ProcessUser', 0, '2016-09-07 17:33:39', '0', '52cc7933-a045-4dcc-8c17-1b618bfa772b', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', NULL, NULL);
INSERT INTO `relevance` VALUES ('30c82d18-7892-4e5f-9aee-e4f483a858c2', '', 'UserModule', 0, '2016-09-05 16:24:55', '0', 'ea25646b-964b-4d41-ab03-d8964e1494fb', '9486ff22-b696-4d7f-8093-8a3e53c45453', NULL, NULL);
INSERT INTO `relevance` VALUES ('3225a4dc-c988-410c-8bcd-9afbccbafc09', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '584c7a3b-d28a-47b4-8648-7797d05d83d1', '', '');
INSERT INTO `relevance` VALUES ('332a373c-f485-4f85-9af9-7792f7462bf1', '', 'RoleModule', 0, '2016-09-02 17:03:47', '0', '648b04c4-4ac2-4d69-bef6-07081ef27871', '89c3bfbe-246f-4112-8eb1-b6789da54202', NULL, NULL);
INSERT INTO `relevance` VALUES ('333771cf-7eab-4d57-988a-8bd934575558', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'OwnerId', '');
INSERT INTO `relevance` VALUES ('336b16ba-8313-4cb3-87d7-4370ff175c14', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'Resource', 'Id', '');
INSERT INTO `relevance` VALUES ('33fa12d8-8e48-4d1c-9c84-50f533b682ec', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'CreateTime', '');
INSERT INTO `relevance` VALUES ('340c60fe-8b95-474c-aa04-9197903998d2', '', 'RoleModule', 0, '2016-09-04 23:20:34', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '7580672f-a390-4bb6-982d-9a4570cb5199', NULL, NULL);
INSERT INTO `relevance` VALUES ('361feb63-bde2-49c7-86ec-6df3ec6f0fe3', '', 'RoleElement', 0, '2016-09-04 23:21:13', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '1c870438-4260-43a5-8996-a6e1dc8bbf6a', NULL, NULL);
INSERT INTO `relevance` VALUES ('388f792e-dbd1-40a1-8374-9339e7e60d9e', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'UpdateTime', '');
INSERT INTO `relevance` VALUES ('3905b8a3-ed7e-4fe0-9e6d-747f6bc79235', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'TypeName', '');
INSERT INTO `relevance` VALUES ('392dc41e-7186-4efb-a8e5-b5317e4122fb', '', 'RoleResource', 0, '2018-09-10 12:54:14', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'OPENAUTH_DELETEACCOUNT', NULL, NULL);
INSERT INTO `relevance` VALUES ('3931d5b7-dde2-4530-bb2d-79b73f76e19b', '', 'RoleDataProperty', 0, '2019-11-23 00:19:30', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'Category', 'Name', '');
INSERT INTO `relevance` VALUES ('3aa0cdcb-ec57-420e-b1b0-eb4d77b8a8d5', '', 'UserOrg', 0, '2020-03-19 21:20:04', '', '49df1602-f5f3-4d52-afb7-3802da619558', '86449128-d5ac-44bf-b999-f7735b7458fd', '', '');
INSERT INTO `relevance` VALUES ('3b4845a5-d7a2-4da7-b95c-43ad03980fda', '', 'UserOrg', 0, '2020-03-19 21:20:04', '', '49df1602-f5f3-4d52-afb7-3802da619558', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', '', '');
INSERT INTO `relevance` VALUES ('3bcaab20-e096-480e-a9bb-0fdb70686714', '', 'RoleElement', 0, '2016-09-04 23:21:00', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'cf7388be-2677-427c-ad78-8f00f1062b96', NULL, NULL);
INSERT INTO `relevance` VALUES ('3de0359b-6331-4dc7-a00e-751f71dbadb5', '', 'ProcessUser', 0, '2016-09-28 09:23:30', '0', '68295d2a-4dfd-4c5e-81e3-9c787e2603bc', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', NULL, NULL);
INSERT INTO `relevance` VALUES ('4190f00a-11a0-4814-849b-cc5232fa4dd4', '', 'RoleResource', 0, '2018-09-12 00:15:54', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'OPENAUTH_DELETEACCOUNT', NULL, NULL);
INSERT INTO `relevance` VALUES ('42ba8a59-5493-4e11-b61b-d87000092767', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '4abafc83-c8f5-452f-9882-e113a86e7a3e', '', '');
INSERT INTO `relevance` VALUES ('4459ffd7-446b-456b-aee5-48e67ca000f8', '', 'UserOrg', 0, '2019-10-31 21:51:45', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', '', '');
INSERT INTO `relevance` VALUES ('456ddfed-6607-41e9-9c46-0d4c7c9c38d4', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'Status', '');
INSERT INTO `relevance` VALUES ('45744773-1b85-4913-bc1b-2f00b95a8198', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '9e2c6754-f258-4b14-96a0-b9d981196a65', '', '');
INSERT INTO `relevance` VALUES ('45e97612-46d8-4c36-b89e-ce6572ed7988', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'Id', '');
INSERT INTO `relevance` VALUES ('460d1c98-2a68-43cf-8d38-d40ceb89916f', '', 'UserOrg', 0, '2017-10-12 09:13:38', '', '3eacdedd-e93a-4816-b49c-99ba3d5323c2', '86449128-d5ac-44bf-b999-f7735b7458fd', NULL, NULL);
INSERT INTO `relevance` VALUES ('465b8bc0-b817-410d-849e-55f66b2a3211', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '98a949e8-8704-40a7-b9a1-c0e8801e4057', '', '');
INSERT INTO `relevance` VALUES ('471e98ee-9cc5-4dc7-8762-a452e855dbd5', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'CreateTime', '');
INSERT INTO `relevance` VALUES ('4757bb30-e4bc-4c2d-a824-947ef151d341', '', 'UserRole', 0, '2016-09-07 20:21:16', '0', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', '4980a85b-e3db-4607-bc2c-0baf0140d7df', NULL, NULL);
INSERT INTO `relevance` VALUES ('4ba3982b-f0ae-4f9a-980e-1eaedc3b5f2e', '', 'UserElement', 0, '2016-09-07 17:48:34', '0', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', '584c7a3b-d28a-47b4-8648-7797d05d83d1', NULL, NULL);
INSERT INTO `relevance` VALUES ('4c2fb006-53d6-4041-8cf6-e5d74d788897', '', 'UserModule', 0, '2018-04-06 09:48:19', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '9486ff22-b696-4d7f-8093-8a3e53c45453', NULL, NULL);
INSERT INTO `relevance` VALUES ('4c69794b-9957-4f6b-b0fb-6455fe643565', '', 'UserElement', 0, '2018-04-06 14:50:41', '', '49df1602-f5f3-4d52-afb7-3802da619558', '826b12b3-e916-446d-a2fa-329cfd13c831', NULL, NULL);
INSERT INTO `relevance` VALUES ('4daccce5-cb7b-46aa-8bed-3c85c72436be', '', 'RoleOrg', 0, '2018-09-12 00:08:37', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('4e613188-0387-4d17-a60d-703b4a606d75', '', 'RoleModule', 0, '2016-09-04 23:20:34', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'bc80478d-0547-4437-9cff-be4b40144bdf', NULL, NULL);
INSERT INTO `relevance` VALUES ('4e665304-9f05-410e-b68f-44d45281b788', '', 'RoleOrg', 0, '2018-09-12 00:08:47', '', '3e761e88-ddf7-4a62-b219-9a315b4564f2', 'c36e43df-3a99-45da-80d9-3ac5d24f4014', NULL, NULL);
INSERT INTO `relevance` VALUES ('4e693bbd-8ddb-42af-b888-30885612c154', '', 'UserOrg', 0, '2019-10-31 21:58:43', '', '96f63f9d-e8c8-4258-963e-3327ed7d6f56', '3d2ad14c-2c56-4a90-a2db-6bde26b0b8b3', '', '');
INSERT INTO `relevance` VALUES ('4ec39ee9-9ee9-4aa9-a0db-eb0fdf8d2f00', '', 'UserElement', 0, '2018-04-06 09:48:27', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'b3e23ebc-0ff2-41b3-bff0-fd5e93f6828a', NULL, NULL);
INSERT INTO `relevance` VALUES ('4ee89c07-55e2-4ca6-9ef1-449cfe0a2c3c', '', 'RoleResource', 0, '2018-09-12 00:15:54', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'OPENAUTH_LOGIN', NULL, NULL);
INSERT INTO `relevance` VALUES ('4fde1dc6-9d73-4c7c-9238-28981858c5a6', '', 'RoleModule', 0, '2016-09-05 09:21:56', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '89c3bfbe-246f-4112-8eb1-b6789da54202', NULL, NULL);
INSERT INTO `relevance` VALUES ('5167dbcd-3a32-4ae8-827e-6f381cc58fa2', '', 'RoleElement', 0, '2016-09-04 23:21:00', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'fa816af1-a28d-47b5-9b8b-c46e18f902e9', NULL, NULL);
INSERT INTO `relevance` VALUES ('526d6f39-e75a-402b-8ba6-9bb08731da1e', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'CreateTime', '');
INSERT INTO `relevance` VALUES ('53a4be87-4fa8-415b-97b5-2298ce8b17c8', '', 'UserResource', 0, '2018-04-14 14:38:04', '', '49df1602-f5f3-4d52-afb7-3802da619558', 'XXX_LOGIN', NULL, NULL);
INSERT INTO `relevance` VALUES ('54b2e9b6-1f7c-4a39-92c9-98f58429c1fc', '', 'RoleModule', 0, '2016-09-02 17:03:39', '0', '211e12c7-e466-496e-8d26-0660a38e24cc', 'bc80478d-0547-4437-9cff-be4b40144bdf', NULL, NULL);
INSERT INTO `relevance` VALUES ('55b10ecc-3fb3-4127-b69e-e7a3467d7a1a', '', 'RoleElement', 0, '2016-09-05 09:22:11', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '6db928fe-93df-460f-9472-8bb0b6cae52c', NULL, NULL);
INSERT INTO `relevance` VALUES ('5725ff79-43c6-4778-bbff-131cf364dab6', '', 'UserElement', 0, '2016-10-20 17:01:01', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', 'cf7388be-2677-427c-ad78-8f00f1062b96', NULL, NULL);
INSERT INTO `relevance` VALUES ('575221eb-0e4d-4cfa-9cd8-59607784d43d', '', 'UserRole', 0, '2019-10-31 21:59:41', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '3e761e88-ddf7-4a62-b219-9a315b4564f2', '', '');
INSERT INTO `relevance` VALUES ('5965ae4d-c718-421f-9895-fdf6255a002e', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'ReturnBoxNum', '');
INSERT INTO `relevance` VALUES ('5a20d59c-6ee6-4fe2-98fe-7b35b11026ae', '', 'UserElement', 0, '2016-09-07 15:30:20', '0', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', '68484265-7802-4f06-b024-33e8b2f2edcf', NULL, NULL);
INSERT INTO `relevance` VALUES ('5aa8ae27-e5b1-4f46-9342-73f1ba11c14c', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '826b12b3-e916-446d-a2fa-329cfd13c831', '', '');
INSERT INTO `relevance` VALUES ('5b2d5db8-d603-4be3-add2-c85ef3c53ddc', '', 'UserResource', 0, '2018-04-14 14:38:05', '', '49df1602-f5f3-4d52-afb7-3802da619558', 'OPENAUTH_LOGIN', NULL, NULL);
INSERT INTO `relevance` VALUES ('5ccce632-f8f0-452b-8faf-4a5372004e85', '', 'RoleResource', 0, '2018-09-12 00:15:54', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'XXX_CHECKUSER', NULL, NULL);
INSERT INTO `relevance` VALUES ('5f616264-84f0-42de-a84a-61d11f2f4786', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '4bfa8ea0-6b0d-426f-8687-b654575ca780', '', '');
INSERT INTO `relevance` VALUES ('5f8ac964-c87d-44c0-b780-c4c1382800ea', '', 'RoleElement', 0, '2020-03-19 22:31:02', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', '6c814946-db5c-48bd-84dd-b1c38196ad74', '', '');
INSERT INTO `relevance` VALUES ('620b368a-7b56-4c74-ab85-8bc91d08ddc9', '', 'RoleElement', 0, '2016-09-04 23:20:42', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '1c9acc3e-a40d-4d07-b495-6e60eb9b71b9', NULL, NULL);
INSERT INTO `relevance` VALUES ('635779b1-f223-41f2-b9a4-7f35633008d7', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '18cc3217-28a6-49b2-9a20-080230065984', '', '');
INSERT INTO `relevance` VALUES ('6431a464-6f1f-4ffc-8157-89212b70f09a', '', 'RoleOrg', 0, '2016-09-05 00:00:00', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('64e4f5aa-28ef-4690-9b20-5f0b543964f6', '', 'UserElement', 0, '2016-09-07 15:30:20', '0', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', '816b12b3-e916-446d-a2fa-329cfd13c831', NULL, NULL);
INSERT INTO `relevance` VALUES ('6532f9c1-3067-4952-b008-e766f833050e', '', 'UserRole', 0, '2019-11-23 00:48:41', '', '96f63f9d-e8c8-4258-963e-3327ed7d6f56', '77e6d0c3-f9e1-4933-92c3-c1c6eef75593', '', '');
INSERT INTO `relevance` VALUES ('6552d053-69b3-4ae9-b1f2-497582dcb8aa', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'c7d7daf0-3669-4a22-8bed-b092617deb9c', '', '');
INSERT INTO `relevance` VALUES ('6645b6fb-efcf-4e48-9c13-84f79bc5be34', '', 'RoleOrg', 0, '2018-04-14 13:16:45', '', '77e6d0c3-f9e1-4933-92c3-c1c6eef75593', '86449128-d5ac-44bf-b999-f7735b7458fd', NULL, NULL);
INSERT INTO `relevance` VALUES ('66e25fc5-093d-42ab-85dc-a38f6600889b', '', 'UserOrg', 0, '2016-09-02 13:57:32', '0', 'ea25646b-964b-4d41-ab03-d8964e1494fb', 'c36e43df-3a99-45da-80d9-3ac5d24f4014', NULL, NULL);
INSERT INTO `relevance` VALUES ('68912e65-256e-45b6-b48e-036382598d32', '', 'RoleOrg', 0, '2016-10-17 10:03:49', '0', '2eb423d6-6ad9-4efe-b423-872478a2a434', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('68984a83-ce96-4144-9e23-0e0f2249fb45', '', 'UserOrg', 0, '2019-10-31 21:51:30', '', 'de8be521-f1ec-4483-b124-0be342890507', 'c36e43df-3a99-45da-80d9-3ac5d24f4014', '', '');
INSERT INTO `relevance` VALUES ('6a0d3b61-67d0-4090-a622-08d5643e1af8', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'Name', '');
INSERT INTO `relevance` VALUES ('6a427baa-c54c-4830-a2fe-34e206f471c5', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '2d595a2a-5de5-479e-a331-b53c799a6b10', '', '');
INSERT INTO `relevance` VALUES ('6b9c4789-042c-4f6f-a749-ee68ee87462d', '', 'ProcessUser', 0, '2016-10-27 16:47:52', '0', '054ff054-d8ae-4911-a596-8fb1f66b348f', '3a95e392-07d4-4af3-b30d-140ca93340f5', NULL, NULL);
INSERT INTO `relevance` VALUES ('6d6eb70e-0caf-485f-943c-671be021a588', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'AppName', '');
INSERT INTO `relevance` VALUES ('6da6d662-8cef-47cd-80b3-fa885b2dca7a', '', 'RoleOrg', 0, '2018-04-14 13:16:45', '', '77e6d0c3-f9e1-4933-92c3-c1c6eef75593', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('6db5666b-6f8c-4e83-bada-0b45054bd9a4', '', 'RoleElement', 0, '2016-09-04 23:20:42', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '0d25438e-1436-48e0-aedf-0f1690693282', NULL, NULL);
INSERT INTO `relevance` VALUES ('6fe52499-f800-47ce-96fc-a2b5b43505d5', '', 'UserElement', 0, '2018-04-06 09:48:22', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '584c7a3b-d28a-47b4-8648-7797d05d83d1', NULL, NULL);
INSERT INTO `relevance` VALUES ('7082bc48-535e-4b92-9dc0-c58340a8239d', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'Resource', 'Name', '');
INSERT INTO `relevance` VALUES ('715d017a-68b6-468d-aa3f-32ca4cfd4b9e', '', 'RoleModule', 0, '2016-09-04 23:20:34', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'bedb41a2-f310-4775-af99-01be08adda93', NULL, NULL);
INSERT INTO `relevance` VALUES ('71fa1d0c-1928-4a16-aa94-c92e6f671581', '', 'RoleDataProperty', 0, '2019-11-23 00:51:40', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'Resource', 'AppName', '');
INSERT INTO `relevance` VALUES ('72bf4729-af60-42f5-b0d7-717362ffad7f', '', 'RoleElement', 0, '2016-09-04 23:21:00', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '2feefce1-e3d8-42ac-b811-2352679628da', NULL, NULL);
INSERT INTO `relevance` VALUES ('736141c8-330b-4600-a781-8d0e7cdc01e5', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'SupplierId', '');
INSERT INTO `relevance` VALUES ('736e90f7-3747-472e-816d-dbb7fdf3b0bb', '', 'RoleOrg', 0, '2018-09-12 00:08:42', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('744da0ee-6c57-4bfc-9937-5ab799112996', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '7bc7e527-478d-49fd-868d-5f31951586f5', '', '');
INSERT INTO `relevance` VALUES ('7475b0c3-f204-4f95-a22f-80591fe76bc7', '', 'ProcessUser', 0, '2016-10-31 11:52:39', '0', 'b8bcdf59-1e29-4d97-a364-12ac8e8c5c61', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', NULL, NULL);
INSERT INTO `relevance` VALUES ('75340ad3-fb80-4646-b1de-ba801688ddc2', '', 'RoleElement', 0, '2016-09-04 23:21:04', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '5ed1681c-13d2-4c87-8675-a8d95c0b40ae', NULL, NULL);
INSERT INTO `relevance` VALUES ('759c09ce-f93a-4de7-96fc-cffabc1cd1ac', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'Resource', 'AppName', '');
INSERT INTO `relevance` VALUES ('76a5b31b-f855-416c-b7ce-4b9ff1cdb4bc', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'CreateUserName', '');
INSERT INTO `relevance` VALUES ('76e6629f-764f-4761-afd3-c41e0e9e4310', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '6c814946-db5c-48bd-84dd-b1c38196ad74', '', '');
INSERT INTO `relevance` VALUES ('77824f78-792b-4661-b7d9-653f6e0a443c', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '9c96e485-84a6-45f0-b6a7-f01dab94b0c6', '', '');
INSERT INTO `relevance` VALUES ('77ac794c-9142-443f-b19c-3b9d960c8ba4', '', 'UserOrg', 0, '2019-10-31 21:51:45', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '86449128-d5ac-44bf-b999-f7735b7458fd', '', '');
INSERT INTO `relevance` VALUES ('77bd93da-2c2b-4ba8-bf05-3a1382811a6a', '', 'RoleModule', 0, '2016-09-02 17:03:39', '0', '211e12c7-e466-496e-8d26-0660a38e24cc', 'e8dc5db6-4fc4-4795-a1cc-681cbcceec91', NULL, NULL);
INSERT INTO `relevance` VALUES ('77d25c9e-4773-4f95-8048-8d59398835f6', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '3dc0ec4d-bf86-4bae-9ec0-1d6c2403fb99', '', '');
INSERT INTO `relevance` VALUES ('77eec82a-f713-4584-872c-761fdbcdb456', '', 'UserElement', 0, '2018-04-06 14:50:37', '', '49df1602-f5f3-4d52-afb7-3802da619558', '68484265-7802-4f06-b024-33e8b2f2edcf', NULL, NULL);
INSERT INTO `relevance` VALUES ('77fc08e6-98ae-4d33-b294-bd9fed5b14ed', '', 'UserElement', 0, '2018-04-06 14:50:36', '', '49df1602-f5f3-4d52-afb7-3802da619558', '816b12b3-e916-446d-a2fa-329cfd13c831', NULL, NULL);
INSERT INTO `relevance` VALUES ('797c6e5f-7f3c-4891-89b9-a054e10f6c00', '', 'UserModule', 0, '2018-04-06 09:48:01', '', '49df1602-f5f3-4d52-afb7-3802da619558', '37bb9414-19a0-4223-9056-71f8c758a930', NULL, NULL);
INSERT INTO `relevance` VALUES ('7a22ccfc-5f4a-472b-850b-61b9552d7e67', '', 'UserRole', 0, '2019-11-23 00:48:10', '', '229f3a49-ab27-49ce-b383-9f10ca23a9d5', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', '', '');
INSERT INTO `relevance` VALUES ('7ab6db05-1098-4134-b228-3329792dc6db', '', 'RoleDataProperty', 0, '2019-11-23 00:51:40', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'Resource', 'UpdateUserName', '');
INSERT INTO `relevance` VALUES ('7b177a26-efdd-406b-8873-24f6565b121f', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '054e9699-7828-4b8b-a28b-d7ae45ed3306', '', '');
INSERT INTO `relevance` VALUES ('7c0e613e-2e8e-43e2-93af-cf38bfd56dcb', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'StockId', '');
INSERT INTO `relevance` VALUES ('7d929ccc-4185-41d0-a81f-42fc0f27a85c', '', 'RoleModule', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '15a3a401-e8eb-4d8b-9035-ecd5f53ed0c9', '', '');
INSERT INTO `relevance` VALUES ('7d995d7b-5967-4bd0-a601-180925fe4a77', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '7580672f-a390-4bb6-982d-9a4570cb5199', '', '');
INSERT INTO `relevance` VALUES ('7dcc9577-f27b-429f-8552-d223d4b48617', '', 'UserRole', 0, '2019-10-31 21:59:41', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '', '');
INSERT INTO `relevance` VALUES ('7e54557a-5f1d-494c-90c1-509525dd5c08', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '9486ff22-b696-4d7f-8093-8a3e53c45453', '', '');
INSERT INTO `relevance` VALUES ('7e8ce905-fa6e-490d-9d33-bde6b6529804', '', 'RoleDataProperty', 0, '2019-11-23 00:19:30', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'Category', 'Description', '');
INSERT INTO `relevance` VALUES ('7f25286f-246b-4143-98eb-c3e574fe7455', '', 'ProcessUser', 0, '2016-09-07 17:33:39', '0', '52cc7933-a045-4dcc-8c17-1b618bfa772b', '3a95e392-07d4-4af3-b30d-140ca93340f5', NULL, NULL);
INSERT INTO `relevance` VALUES ('7faeac11-cf1f-40aa-a6ad-2c7768106b9a', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '4f2737db-633f-4946-8a71-b08b9885f151', '', '');
INSERT INTO `relevance` VALUES ('7fd7f976-f10e-44aa-a7ba-7ca40d2e8f90', '', 'RoleOrg', 0, '2016-10-17 10:03:30', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('80310629-5e52-482c-9a0f-5c5bdfabcd9e', '', 'RoleOrg', 0, '2016-09-05 00:00:00', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('832f4a8f-7791-4aa6-bcd2-20dcb6f5ef37', '', 'UserElement', 0, '2016-09-02 14:53:04', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '15a4f88c-4fae-4cab-ba2f-0cbd2cca8736', NULL, NULL);
INSERT INTO `relevance` VALUES ('84a52091-08a0-4a46-b661-3cd206771c29', '', 'RoleModule', 0, '2016-09-04 23:20:34', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '0031262c-689c-4b96-bae2-2c9d67076ade', NULL, NULL);
INSERT INTO `relevance` VALUES ('854e0658-ab8a-4869-b157-9941955acdc6', '', 'RoleElement', 0, '2016-09-04 23:21:09', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '1a473afd-cbd4-41e9-9471-81f9435aaabe', NULL, NULL);
INSERT INTO `relevance` VALUES ('85b5f9e0-a4d2-4224-9488-c0fb98149f0b', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'c3d7b478-21e9-4c1e-b866-a3c80be7909b', '', '');
INSERT INTO `relevance` VALUES ('88a4c966-d042-4a2e-b133-ff7eded1c5de', '', 'RoleElement', 0, '2016-09-04 23:21:13', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '7b2b1ffb-398b-4f7b-83da-8f484e1bcea0', NULL, NULL);
INSERT INTO `relevance` VALUES ('89ea1898-7649-4c3d-ae68-ace9bd9a316b', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', '', '');
INSERT INTO `relevance` VALUES ('8adae84f-6516-4d87-a476-353bc48ae597', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Category', 'Description', '');
INSERT INTO `relevance` VALUES ('8af3581e-257f-4655-bac2-5b5afb85ef88', '', 'UserOrg', 0, '2019-10-31 21:59:08', '', '758a34c7-5a31-438c-bdf7-02fdd846b901', 'b2083488-64e5-44cc-b8f4-929ffa6f2f72', '', '');
INSERT INTO `relevance` VALUES ('8b633f3c-965b-4e35-8496-c364890d7760', '', 'RoleElement', 0, '2016-09-04 23:21:09', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'c3d7b478-21e9-4c1e-b866-a3c80be7909b', NULL, NULL);
INSERT INTO `relevance` VALUES ('8c93cb3c-b535-4ab1-af9e-b3ad50847423', '', 'RoleDataProperty', 0, '2019-11-23 00:51:40', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'Resource', 'Id', '');
INSERT INTO `relevance` VALUES ('8f741d9e-e7f5-4b73-95f4-4b55e0cf6605', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'UpdateUserId', '');
INSERT INTO `relevance` VALUES ('8fa4a52f-9c0a-43c9-9b7e-b378efb4e1df', '', 'RoleResource', 0, '2018-09-10 12:54:14', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'OPENAUTH_LOGIN', NULL, NULL);
INSERT INTO `relevance` VALUES ('90f19c4e-609f-4dc6-84f7-8b936be05568', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Category', 'Name', '');
INSERT INTO `relevance` VALUES ('928e8ddd-b990-471e-983d-f2dac77428d7', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '68484265-7802-4f06-b024-33e8b2f2edcf', '', '');
INSERT INTO `relevance` VALUES ('92b2d699-9875-4978-af79-24c83ff4e212', '', 'UserOrg', 0, '2019-10-31 21:58:43', '', '96f63f9d-e8c8-4258-963e-3327ed7d6f56', 'df442c27-68a0-428e-a309-cba23a994a9d', '', '');
INSERT INTO `relevance` VALUES ('92f0b297-96c1-47d4-84dd-571374431bc0', '', 'RoleElement', 0, '2016-09-04 23:21:04', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '84694ea5-d6e1-4a65-8a59-7b5b779688d4', NULL, NULL);
INSERT INTO `relevance` VALUES ('93bcac7a-0ff1-488c-8d1c-3da7e44cbefc', '', 'RoleElement', 0, '2016-09-04 23:21:00', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'd1ba6a72-ba14-44c0-baba-46d0ad96fe8a', NULL, NULL);
INSERT INTO `relevance` VALUES ('960224e6-5910-472b-a5ef-b2aa9a8b106f', '', 'UserRole', 0, '2016-09-06 17:06:15', '0', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', NULL, NULL);
INSERT INTO `relevance` VALUES ('962b278b-0894-4b36-b1a0-6c5c3d11d4c3', '', 'UserElement', 0, '2018-04-06 14:50:17', '', '49df1602-f5f3-4d52-afb7-3802da619558', 'b3e23ebc-0ff2-41b3-bff0-fd5e93f6828a', NULL, NULL);
INSERT INTO `relevance` VALUES ('965f010b-2fd6-4b34-ba23-3e44c1af2877', '', 'RoleOrg', 0, '2016-09-08 16:19:18', '0', '36094f5d-07e7-40d5-91dc-ff60f98b496a', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('98136fef-6d02-4823-bc12-6e5e619e1275', '', 'UserRole', 0, '2019-10-31 21:59:25', '', '758a34c7-5a31-438c-bdf7-02fdd846b901', '77e6d0c3-f9e1-4933-92c3-c1c6eef75593', '', '');
INSERT INTO `relevance` VALUES ('9a6850d8-fc90-45fe-ab34-cfe0aa1b80ee', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '79dcd3eb-3aaf-4e08-83c9-713d8ff446fe', '', '');
INSERT INTO `relevance` VALUES ('9a7648a6-12ac-4473-82ec-c2c845d9047e', '', 'RoleElement', 0, '2019-11-06 10:31:03', '', '3e761e88-ddf7-4a62-b219-9a315b4564f2', '054e9699-7828-4b8b-a28b-d7ae45ed3306', '', '');
INSERT INTO `relevance` VALUES ('9ad706e3-8e6b-4bc7-a502-371b298ef062', '', 'RoleElement', 0, '2016-09-04 23:21:13', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'ef42721f-d223-4a00-a1d9-80b81121f21a', NULL, NULL);
INSERT INTO `relevance` VALUES ('9ba32bd8-4406-43bf-aac5-0bb0dbd6d228', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'c35d8f5b-0d38-4f31-84f9-39e476eeab08', '', '');
INSERT INTO `relevance` VALUES ('9bff1b59-f0fd-41db-9c55-e3275eccfc88', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'Description', '');
INSERT INTO `relevance` VALUES ('9d568d6d-d78d-47d6-8fb6-b1327cdbe83a', '', 'RoleModule', 0, '2016-09-04 23:20:34', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'a94d5648-c2a9-405e-ba6f-f1602ec9b807', NULL, NULL);
INSERT INTO `relevance` VALUES ('9ded6370-099c-4691-aecd-1ee09542c9d5', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'Disable', '');
INSERT INTO `relevance` VALUES ('9e46a946-6e81-4f61-bcba-21e4f7fac3df', '', 'RoleModule', 0, '2016-09-02 17:03:39', '0', '211e12c7-e466-496e-8d26-0660a38e24cc', 'ef386d5d-cd58-43c0-a4ab-80afd0dbcd6c', NULL, NULL);
INSERT INTO `relevance` VALUES ('9e57e1ff-e9cf-4600-a872-ac85f7845bb0', '', 'RoleOrg', 0, '2018-04-14 13:16:45', '', '77e6d0c3-f9e1-4933-92c3-c1c6eef75593', 'c36e43df-3a99-45da-80d9-3ac5d24f4014', NULL, NULL);
INSERT INTO `relevance` VALUES ('9edc7b81-2b51-4193-8805-6062e596ccdc', '', 'UserOrg', 0, '2016-09-02 13:57:32', '0', 'ea25646b-964b-4d41-ab03-d8964e1494fb', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('9fa50449-5d87-4579-9f1f-9cdcd876976b', '', 'RoleElement', 0, '2016-09-04 23:21:00', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '6839a297-350b-4215-b680-4e5dfdae5615', NULL, NULL);
INSERT INTO `relevance` VALUES ('a051aa08-38da-4b6d-8d90-10b3c2485e4b', '', 'RoleOrg', 0, '2016-09-05 00:00:00', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '543a9fcf-4770-4fd9-865f-030e562be238', NULL, NULL);
INSERT INTO `relevance` VALUES ('a06fe8c6-3f5e-4085-9bbf-e366571a356c', '', 'RoleElement', 0, '2016-09-04 23:21:04', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'daddf3b9-71b5-45ac-b85d-5a11c522f2f4', NULL, NULL);
INSERT INTO `relevance` VALUES ('a0904102-e26a-4bc5-9c95-ed5ef977586b', '', 'RoleModule', 0, '2016-09-02 17:03:39', '0', '211e12c7-e466-496e-8d26-0660a38e24cc', '6a9e1346-0c01-44d2-8eb1-f929fdab542a', NULL, NULL);
INSERT INTO `relevance` VALUES ('a314a714-95f0-46e2-8341-5a29b9b4f321', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'ShipperId', '');
INSERT INTO `relevance` VALUES ('a3876834-411d-4228-b7ba-230c29b76295', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'd352c8ee-3dff-4d28-a0de-903ae68f2533', '', '');
INSERT INTO `relevance` VALUES ('a3c0d154-4bcc-47a4-9c0e-c0a406686167', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '9e2c6754-f258-4b14-96a0-b9d981196a65', '', '');
INSERT INTO `relevance` VALUES ('a5bef7bf-ecdb-4480-ad64-b39a02269607', '', 'UserModule', 0, '2018-04-06 09:48:37', '', '49df1602-f5f3-4d52-afb7-3802da619558', '069475e3-c997-487a-9f29-e6a864c5c1d4', NULL, NULL);
INSERT INTO `relevance` VALUES ('a6c7d18e-129f-4922-94bd-8306d1004480', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'Enable', '');
INSERT INTO `relevance` VALUES ('a8094b46-de5a-40ea-a8ee-69ea905480ef', '', 'RoleModule', 0, '2016-09-05 09:21:56', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '069475e3-c997-487a-9f29-e6a864c5c1d4', NULL, NULL);
INSERT INTO `relevance` VALUES ('a8123b37-ba70-4aab-aef6-1938733b5210', '', 'RoleElement', 0, '2016-09-04 23:20:42', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'c0d8505c-061a-467d-862a-c94f27caa208', NULL, NULL);
INSERT INTO `relevance` VALUES ('a84c4bee-4bf6-4dd7-a0a4-3da64d366535', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'Remark', '');
INSERT INTO `relevance` VALUES ('a9821db0-49bd-49be-a554-afa811c99760', '', 'RoleResource', 0, '2016-09-04 23:20:22', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'ec99f670-0eca-465c-9f64-d4d5dc510b83', NULL, NULL);
INSERT INTO `relevance` VALUES ('aa051096-a23a-431d-9053-bb954f9453a7', '', 'RoleElement', 0, '2016-09-04 23:20:54', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '4bfa8ea0-6b0d-426f-8687-b654575ca780', NULL, NULL);
INSERT INTO `relevance` VALUES ('aac9206e-a77b-421c-9c85-5f202fddeb31', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'TransferType', '');
INSERT INTO `relevance` VALUES ('ab84b111-fb5d-4ddd-99d5-479954d9d521', '', 'RoleOrg', 0, '2016-09-08 16:19:18', '0', '36094f5d-07e7-40d5-91dc-ff60f98b496a', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('ab924ba7-8a74-4804-82b0-ecbbedf4c13e', '', 'RoleElement', 0, '2016-09-05 09:22:11', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '38109ca0-32ec-44bd-a243-017e591b532b', NULL, NULL);
INSERT INTO `relevance` VALUES ('ac184827-9899-4b40-8939-61fe9d2b187c', '', 'UserElement', 0, '2016-09-07 17:48:49', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '584c7a3b-d28a-47b4-8648-7797d05d83d1', NULL, NULL);
INSERT INTO `relevance` VALUES ('acb4d37f-8b45-4a99-b364-99f3881dfcda', '', 'RoleElement', 0, '2016-09-04 23:21:13', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'f8dde22a-2a37-47c4-8e67-70fb3af5303e', NULL, NULL);
INSERT INTO `relevance` VALUES ('acc51898-5335-4903-83b9-4701a782bc4d', '', 'UserElement', 0, '2016-10-20 17:01:02', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', 'fa816af1-a28d-47b5-9b8b-c46e18f902e9', NULL, NULL);
INSERT INTO `relevance` VALUES ('ad267296-5eba-4d59-b821-8148d8cfb3c6', '', 'RoleModule', 0, '2016-09-04 23:20:34', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'e8dc5db6-4fc4-4795-a1cc-681cbcceec91', NULL, NULL);
INSERT INTO `relevance` VALUES ('ad29467e-eeee-494c-ab82-f6be5d2619d5', '', 'RoleElement', 0, '2016-09-04 23:21:00', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '50c9df24-b233-42cb-9a0d-4ce158c75f86', NULL, NULL);
INSERT INTO `relevance` VALUES ('ad30e13e-6b75-48f9-97e3-c723d3e36a28', '', 'RoleResource', 0, '2018-09-12 00:15:54', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'OPENAUTH_MODIFYACCOUNT', NULL, NULL);
INSERT INTO `relevance` VALUES ('ad5bc7a6-e307-4fa8-a4ef-ce9e09f7e21b', '', 'RoleModule', 0, '2016-09-05 09:21:56', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '9486ff22-b696-4d7f-8093-8a3e53c45453', NULL, NULL);
INSERT INTO `relevance` VALUES ('ad905aa6-d3d8-4fe9-99b4-5f8be7891d1e', '', 'RoleResource', 0, '2018-09-12 00:15:54', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'XXX_ADMIN', NULL, NULL);
INSERT INTO `relevance` VALUES ('ae131c5a-084b-4932-9215-cf0f739ee969', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'GoodsType', '');
INSERT INTO `relevance` VALUES ('ae619801-1959-44fd-a75b-a8cca4d559b4', '', 'RoleOrg', 0, '2018-09-12 00:08:37', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '543a9fcf-4770-4fd9-865f-030e562be238', NULL, NULL);
INSERT INTO `relevance` VALUES ('ae95e6e1-ae92-4c2e-b8d8-c32031f35805', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '79dcd3eb-3aaf-4e08-83c9-713d8ff446fe', '', '');
INSERT INTO `relevance` VALUES ('af263192-daa8-4f29-99b9-1efb96e31627', '', 'RoleElement', 0, '2016-09-04 23:20:42', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '645b40ac-4223-44a7-aab4-66eb56cf9864', NULL, NULL);
INSERT INTO `relevance` VALUES ('af47386e-142b-4afc-a42a-1ff138ac377c', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'CreateUserName', '');
INSERT INTO `relevance` VALUES ('b0174f58-3f6c-431a-8bd8-0caba54fd848', '', 'RoleElement', 0, '2019-11-06 10:31:03', '', '77e6d0c3-f9e1-4933-92c3-c1c6eef75593', '054e9699-7828-4b8b-a28b-d7ae45ed3306', '', '');
INSERT INTO `relevance` VALUES ('b08d7763-a725-406f-a7d5-d144f00d716e', '', 'UserOrg', 0, '2016-09-02 13:56:41', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '543a9fcf-4770-4fd9-865f-030e562be238', NULL, NULL);
INSERT INTO `relevance` VALUES ('b241dd3d-2965-44e4-929d-9dacb6444e09', '', 'RoleOrg', 0, '2018-04-14 13:16:45', '', '77e6d0c3-f9e1-4933-92c3-c1c6eef75593', '543a9fcf-4770-4fd9-865f-030e562be238', NULL, NULL);
INSERT INTO `relevance` VALUES ('b246cd89-548c-4471-a43b-6f10b40c26b1', '', 'RoleOrg', 0, '2018-09-12 00:08:42', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('b2490ac0-ba16-48a2-b39d-49f6b87f9387', '', 'UserModule', 0, '2018-04-06 09:48:17', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '069475e3-c997-487a-9f29-e6a864c5c1d4', NULL, NULL);
INSERT INTO `relevance` VALUES ('b2edfee4-f980-4aa5-b547-492d677e0674', '', 'RoleModule', 0, '2016-09-04 23:20:34', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'ef386d5d-cd58-43c0-a4ab-80afd0dbcd6c', NULL, NULL);
INSERT INTO `relevance` VALUES ('b2f1a511-26ac-4b5b-bc3a-b7fc52297b41', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'UpdateUserName', '');
INSERT INTO `relevance` VALUES ('b3245529-7cad-4130-bd2d-ac1129deb2f0', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'UpdateTime', '');
INSERT INTO `relevance` VALUES ('b3b8f695-a179-489b-90b4-7814ab048a69', '', 'UserElement', 0, '2018-04-06 09:48:21', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '816b12b3-e916-446d-a2fa-329cfd13c831', NULL, NULL);
INSERT INTO `relevance` VALUES ('b3cb3391-4ff4-4071-910e-18c46362ab5d', '', 'RoleElement', 0, '2020-03-19 22:31:02', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', '18cc3217-28a6-49b2-9a20-080230065984', '', '');
INSERT INTO `relevance` VALUES ('b4c2a294-125c-4768-9214-cea3ccf39a1c', '', 'RoleOrg', 0, '2018-09-12 00:08:42', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '543a9fcf-4770-4fd9-865f-030e562be238', NULL, NULL);
INSERT INTO `relevance` VALUES ('b51345b9-325c-4a30-b147-5562c93c3ed3', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '816b12b3-e916-446d-a2fa-329cfd13c831', '', '');
INSERT INTO `relevance` VALUES ('b55798b2-6768-4051-8cdc-9da72c73718d', '', 'RoleDataProperty', 0, '2019-11-23 00:51:40', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'Resource', 'Name', '');
INSERT INTO `relevance` VALUES ('b5c0e181-5f32-4a92-846c-24ff6253b6df', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '054e9699-7828-4b8b-a28b-d7ae45ed3306', '', '');
INSERT INTO `relevance` VALUES ('b647148b-21be-42b8-8811-1cb03a6fc349', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'ExternalType', '');
INSERT INTO `relevance` VALUES ('b6712915-5fc8-4271-b651-6b467ec1d8a8', '', 'RoleModule', 0, '2020-03-19 22:31:02', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', '0031262c-689c-4b96-bae2-2c9d67076ade', '', '');
INSERT INTO `relevance` VALUES ('b672a830-c3a5-408b-a746-65608534b24c', '', 'UserModule', 0, '2017-12-15 17:07:05', '', '49df1602-f5f3-4d52-afb7-3802da619558', '9486ff22-b696-4d7f-8093-8a3e53c45453', NULL, NULL);
INSERT INTO `relevance` VALUES ('b918e504-ba39-4be7-8452-76cef09191d3', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '826b12b3-e916-446d-a2fa-329cfd13c831', '', '');
INSERT INTO `relevance` VALUES ('b9e63d17-35c8-4456-abab-8f43a1c99adc', '', 'UserModule', 0, '2018-04-06 09:47:59', '', '49df1602-f5f3-4d52-afb7-3802da619558', '4abafc83-c8f5-452f-9882-e113a86e7a3e', NULL, NULL);
INSERT INTO `relevance` VALUES ('ba5f4663-04e1-4b09-8e84-459507df2aeb', '', 'UserOrg', 0, '2019-10-31 21:50:51', '', '1df68dfd-3b6d-4491-872f-00a0fc6c5a64', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', '', '');
INSERT INTO `relevance` VALUES ('bbca349a-5d29-4cce-9f7e-0d5d4ce65a54', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'OwnerId', '');
INSERT INTO `relevance` VALUES ('bbdc3ea9-3f21-48b0-9d7a-39545d6183d0', '', 'UserElement', 0, '2018-04-06 09:48:25', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '826b12b3-e916-446d-a2fa-329cfd13c831', NULL, NULL);
INSERT INTO `relevance` VALUES ('bc39df48-cbcf-4757-af8c-b023ad195721', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '816b12b3-e916-446d-a2fa-329cfd13c831', '', '');
INSERT INTO `relevance` VALUES ('bc63b763-cdb8-4516-a3c4-fabe74d7dc56', '', 'RoleDataProperty', 0, '2019-11-23 00:19:30', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'Category', 'DtValue', '');
INSERT INTO `relevance` VALUES ('bd783f53-23fa-41f4-8cec-7c61fab52072', '', 'UserOrg', 0, '2018-03-15 09:19:06', '', '0ceff0f8-f848-440c-bc26-d8605ac858cd', '86449128-d5ac-44bf-b999-f7735b7458fd', NULL, NULL);
INSERT INTO `relevance` VALUES ('bda5f089-64d6-4fb8-9012-d7f3ff36902a', '', 'UserOrg', 0, '2017-10-12 13:59:09', '', 'ffd92ed2-5330-4ec2-a42d-6e0e9005db3b', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('be17df2b-a4bb-4080-9d3f-465875a0bd52', '', 'RoleModule', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '9486ff22-b696-4d7f-8093-8a3e53c45453', '', '');
INSERT INTO `relevance` VALUES ('bee6572d-8fb8-4e0e-af15-93aafc989717', '', 'RoleElement', 0, '2016-09-04 23:20:42', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '68fc793f-069f-43e1-a012-42ac2d7c585c', NULL, NULL);
INSERT INTO `relevance` VALUES ('bef744ab-2323-4552-9a09-f529911f8c59', '', 'UserOrg', 0, '2019-10-31 21:58:43', '', '96f63f9d-e8c8-4258-963e-3327ed7d6f56', '60620558-89a2-4b28-8637-52f514773725', '', '');
INSERT INTO `relevance` VALUES ('bfe7d15c-9b35-4735-b9a6-38ee8869b5ec', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'CreateUserId', '');
INSERT INTO `relevance` VALUES ('c14addeb-1812-4a78-9152-1f7115b22d89', '', 'UserRole', 0, '2016-09-05 00:00:47', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', NULL, NULL);
INSERT INTO `relevance` VALUES ('c16e961d-e3b9-4b89-8cd4-de6fd23e4709', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'Status', '');
INSERT INTO `relevance` VALUES ('c25f0741-47bc-48a5-801c-902de87b7ab6', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'CreateUserName', '');
INSERT INTO `relevance` VALUES ('c2d3b7d6-b47d-4bd8-9dc6-d9134d86713f', '', 'RoleOrg', 0, '2016-10-17 10:03:30', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '86449128-d5ac-44bf-b999-f7735b7458fd', NULL, NULL);
INSERT INTO `relevance` VALUES ('c3050d65-d26b-4e46-bece-a212b0cc00ec', '', 'RoleElement', 0, '2016-09-04 23:20:42', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '15a4f88c-4fae-4cab-ba2f-0cbd2cca8736', NULL, NULL);
INSERT INTO `relevance` VALUES ('c3227c77-d60e-4157-9dd3-a8bcdb3af52b', '', 'RoleModule', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'e8dc5db6-4fc4-4795-a1cc-681cbcceec91', '', '');
INSERT INTO `relevance` VALUES ('c4771ac5-3375-4de9-adb8-a603398f0d62', '', 'RoleElement', 0, '2016-09-04 23:21:09', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '2d595a2a-5de5-479e-a331-b53c799a6b10', NULL, NULL);
INSERT INTO `relevance` VALUES ('c50fae2a-b36f-486f-9d53-e58406590101', '', 'ProcessUser', 0, '2016-10-27 16:47:52', '0', '054ff054-d8ae-4911-a596-8fb1f66b348f', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', NULL, NULL);
INSERT INTO `relevance` VALUES ('c58cb482-6ab7-49eb-b5b0-e45424b6e502', '', 'RoleElement', 0, '2016-09-04 23:21:00', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '34730f5a-d307-457b-9041-5f7de30abfa9', NULL, NULL);
INSERT INTO `relevance` VALUES ('c733cfbe-2f71-41e4-92a6-4ff97cf88dc4', '', 'UserModule', 0, '2018-04-06 09:48:19', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '4abafc83-c8f5-452f-9882-e113a86e7a3e', NULL, NULL);
INSERT INTO `relevance` VALUES ('c9099371-8d4e-4f5b-9686-2c60a2c1c641', '', 'ProcessUser', 0, '2016-09-08 16:48:14', '0', '10cc09fb-d469-41e5-ae3f-fdd805a4bd4c', '3a95e392-07d4-4af3-b30d-140ca93340f5', NULL, NULL);
INSERT INTO `relevance` VALUES ('c98b3d02-a76b-4ecc-94a5-cfeffd5e29fb', '', 'RoleModule', 0, '2016-09-02 17:03:39', '0', '211e12c7-e466-496e-8d26-0660a38e24cc', 'bedb41a2-f310-4775-af99-01be08adda93', NULL, NULL);
INSERT INTO `relevance` VALUES ('cd500e9c-7599-42d5-94d8-0234369efd41', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '37bb9414-19a0-4223-9056-71f8c758a930', '', '');
INSERT INTO `relevance` VALUES ('ce7a6891-361e-44a0-b543-e2a7d8ca0fc0', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'GoodsType', '');
INSERT INTO `relevance` VALUES ('d060436e-4eac-4109-a4f2-9e5ffb3f843e', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'PurchaseNo', '');
INSERT INTO `relevance` VALUES ('d1f194c3-3b20-41ee-805b-77c94ee40785', '', 'UserOrg', 0, '2020-03-19 21:20:04', '', '49df1602-f5f3-4d52-afb7-3802da619558', '543a9fcf-4770-4fd9-865f-030e562be238', '', '');
INSERT INTO `relevance` VALUES ('d65f9601-b07e-4c89-8c35-ddc6c3edf3b1', '', 'UserRole', 0, '2019-11-23 00:48:02', '', '1df68dfd-3b6d-4491-872f-00a0fc6c5a64', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', '', '');
INSERT INTO `relevance` VALUES ('d72b9de9-998b-432c-9ccf-d961d386d778', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'b19bce90-5508-43b6-93ed-cd9ff9e356a9', '', '');
INSERT INTO `relevance` VALUES ('d892294d-2a2f-410e-bae9-86be3f6e3674', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'StockId', '');
INSERT INTO `relevance` VALUES ('d967ed9b-a083-4398-954b-ea73edcefa32', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'ExternalNo', '');
INSERT INTO `relevance` VALUES ('da6c0645-0bf9-4ade-9dd3-1b09e91e504c', '', 'RoleElement', 0, '2016-09-05 09:22:07', '0', '4980a85b-e3db-4607-bc2c-0baf0140d7df', '816b12b3-e916-446d-a2fa-329cfd13c831', NULL, NULL);
INSERT INTO `relevance` VALUES ('dbdd5bf2-5910-4644-b087-2f50711840df', '', 'UserRole', 0, '2019-11-23 00:48:35', '', '49df1602-f5f3-4d52-afb7-3802da619558', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '', '');
INSERT INTO `relevance` VALUES ('dc7dd8ef-c8e6-414f-8e97-31774718654c', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'Id', '');
INSERT INTO `relevance` VALUES ('de4205b7-4832-40d4-b6ae-956f7b4997ba', '', 'RoleModule', 0, '2020-03-19 22:31:02', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', '7580672f-a390-4bb6-982d-9a4570cb5199', '', '');
INSERT INTO `relevance` VALUES ('df2d90b3-4e2e-40e9-b406-220009726460', '', 'RoleModule', 0, '2016-09-04 23:20:34', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '6a9e1346-0c01-44d2-8eb1-f929fdab542a', NULL, NULL);
INSERT INTO `relevance` VALUES ('dfd5430b-3422-465a-be79-05a1e06deed2', '', 'RoleElement', 0, '2016-09-04 23:20:54', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', 'c7d7daf0-3669-4a22-8bed-b092617deb9c', NULL, NULL);
INSERT INTO `relevance` VALUES ('e12b77de-b7ce-4f38-b7a3-f3b2d285f33b', '', 'RoleOrg', 0, '2016-10-17 10:03:49', '0', '2eb423d6-6ad9-4efe-b423-872478a2a434', '08f41bf6-4388-4b1e-bd3e-2ff538b44b1b', NULL, NULL);
INSERT INTO `relevance` VALUES ('e28c0dcd-168a-4b60-a514-7b6eb8026709', '', 'RoleOrg', 0, '2016-10-17 10:03:30', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('e4ccd68d-b31b-4d2d-b591-665818a7bd9f', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Category', 'Id', '');
INSERT INTO `relevance` VALUES ('e50d78ae-004d-4f89-95a2-bd5c6327d16c', '', 'RoleModule', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '0031262c-689c-4b96-bae2-2c9d67076ade', '', '');
INSERT INTO `relevance` VALUES ('e619a82e-edfb-4542-94df-0b92850667ad', '', 'RoleResource', 0, '2018-04-14 14:39:56', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'OPENAUTH_MODIFYACCOUNT', NULL, NULL);
INSERT INTO `relevance` VALUES ('e6bd480f-592a-46e0-9f83-2adefb12dca0', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '8966b04f-8e26-4046-8b03-0c64f9f833dd', '', '');
INSERT INTO `relevance` VALUES ('e785147c-f46b-474f-8fad-73b14fa69822', '', 'UserRole', 0, '2016-09-06 17:06:29', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '4980a85b-e3db-4607-bc2c-0baf0140d7df', NULL, NULL);
INSERT INTO `relevance` VALUES ('e84f6b9c-716d-4e94-a1aa-7fd0d1a2e23e', '', 'RoleModule', 0, '2016-09-02 17:03:47', '0', '648b04c4-4ac2-4d69-bef6-07081ef27871', '069475e3-c997-487a-9f29-e6a864c5c1d4', NULL, NULL);
INSERT INTO `relevance` VALUES ('e9cf3d63-6305-46c7-93b4-14053387c62c', '', 'UserModule', 0, '2018-04-06 09:48:18', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '37bb9414-19a0-4223-9056-71f8c758a930', NULL, NULL);
INSERT INTO `relevance` VALUES ('ec72f6ae-09ee-4db9-99a1-bf15c8e35dda', '', 'ProcessUser', 0, '2016-09-14 11:38:23', '0', '6c6afe3c-349c-4198-8710-cf19c90f3afd', '3a95e392-07d4-4af3-b30d-140ca93340f5', NULL, NULL);
INSERT INTO `relevance` VALUES ('ec9c80ce-dbdf-4ba5-9091-82f75392c3b0', '', 'UserElement', 0, '2016-09-07 15:30:43', '0', '3a95e392-07d4-4af3-b30d-140ca93340f5', '68484265-7802-4f06-b024-33e8b2f2edcf', NULL, NULL);
INSERT INTO `relevance` VALUES ('ee1986a0-24cc-4dec-b5f5-68ef959ab650', '', 'UserElement', 0, '2018-04-06 14:50:40', '', '49df1602-f5f3-4d52-afb7-3802da619558', '79dcd3eb-3aaf-4e08-83c9-713d8ff446fe', NULL, NULL);
INSERT INTO `relevance` VALUES ('ee4f39fd-4fbf-4f68-9a70-d6c7d7db9723', '', 'ProcessUser', 0, '2016-10-31 11:52:39', '0', 'b8bcdf59-1e29-4d97-a364-12ac8e8c5c61', '3a95e392-07d4-4af3-b30d-140ca93340f5', NULL, NULL);
INSERT INTO `relevance` VALUES ('eec41fcb-61c0-4e56-a5c0-a9f8be6e6fdc', '', 'UserModule', 0, '2016-09-07 15:30:06', '0', '3b64b643-cb9a-4654-81e4-6dd9b2f8a6f7', '069475e3-c997-487a-9f29-e6a864c5c1d4', NULL, NULL);
INSERT INTO `relevance` VALUES ('ef43a7a6-4a4c-46fe-82d4-1e1055fdac6d', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '17ae4fd4-ab4e-439e-ba1d-2a53b46d112b', '', '');
INSERT INTO `relevance` VALUES ('ef8024e8-dab3-4b85-9952-821a005c1f2b', '', 'RoleDataProperty', 0, '2019-11-23 00:51:40', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'Resource', 'CascadeId', '');
INSERT INTO `relevance` VALUES ('f012d886-f204-4599-a00d-7b9847cc0bb7', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '92b00259-2d15-43e7-9321-adffb29e8bf2', '', '');
INSERT INTO `relevance` VALUES ('f125441c-f28c-4ffa-9183-c8168ab09afb', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Category', 'TypeId', '');
INSERT INTO `relevance` VALUES ('f25d98ff-46bc-48e7-86a0-5eca5e6d98c2', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'UpdateUserName', '');
INSERT INTO `relevance` VALUES ('f3671c95-a33f-4a11-89dd-00d734d4a230', '', 'RoleModule', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '15a3a401-e8eb-4d8b-9035-ecd5f53ed0c9', '', '');
INSERT INTO `relevance` VALUES ('f4ba636a-9002-43e6-93eb-95132a3e68c5', '', 'ProcessUser', 0, '2016-09-28 09:23:30', '0', '68295d2a-4dfd-4c5e-81e3-9c787e2603bc', '3a95e392-07d4-4af3-b30d-140ca93340f5', NULL, NULL);
INSERT INTO `relevance` VALUES ('f579a427-a9ed-4ebe-8411-72e8e6abd01d', '', 'UserElement', 0, '2016-09-05 16:25:26', '0', 'ea25646b-964b-4d41-ab03-d8964e1494fb', '816b12b3-e916-446d-a2fa-329cfd13c831', NULL, NULL);
INSERT INTO `relevance` VALUES ('f61ee29b-7988-404d-b692-5a8f667684be', '', 'UserElement', 0, '2018-04-06 09:48:23', '', '6ba79766-faa0-4259-8139-a4a6d35784e0', '68484265-7802-4f06-b024-33e8b2f2edcf', NULL, NULL);
INSERT INTO `relevance` VALUES ('f6367ca1-0486-46a4-b9c6-65c00936a516', '', 'RoleElement', 0, '2016-09-04 23:20:54', '0', 'db309d88-fd21-4b81-a4d9-ae6276a1d813', '9e2c6754-f258-4b14-96a0-b9d981196a65', NULL, NULL);
INSERT INTO `relevance` VALUES ('f671f582-9111-4000-aadd-660449d0d4b0', '', 'RoleResource', 0, '2018-09-12 00:15:54', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'XXX_LOGIN', NULL, NULL);
INSERT INTO `relevance` VALUES ('f714b860-447e-4d22-a206-1b545cc98fbb', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'InBondedArea', '');
INSERT INTO `relevance` VALUES ('f8d157b4-12e3-4488-9e4c-b9670e11b4c6', '', 'RoleDataProperty', 0, '2019-11-23 01:05:44', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'WmsInboundOrderTbl', 'UpdateUserName', '');
INSERT INTO `relevance` VALUES ('f8e65a18-a86a-47b1-be87-c437ba5e5fd9', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'Id', '');
INSERT INTO `relevance` VALUES ('fa52d20f-204d-4cdd-a1e5-5b7faaac4cd7', '', 'RoleDataProperty', 0, '2019-11-23 00:51:40', '', 'd27ae3cf-135f-4d57-93a6-2120ddf98650', 'Resource', 'CreateUserName', '');
INSERT INTO `relevance` VALUES ('fa7c4d39-b31a-4668-8716-d40a62aa722b', '', 'UserOrg', 0, '2017-10-12 13:59:49', '', '63c9c82a-e0d3-4bde-bbd2-057cda2f5283', '990cb229-cc18-41f3-8e2b-13f0f0110798', NULL, NULL);
INSERT INTO `relevance` VALUES ('fa955d08-fe15-42d2-ae39-98e22e4f9b50', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'WmsInboundOrderTbl', 'OrderType', '');
INSERT INTO `relevance` VALUES ('fa9ce486-4b1f-4630-bad3-7625744cb8e8', '', 'RoleDataProperty', 0, '2020-03-19 00:17:02', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', 'Resource', 'CascadeId', '');
INSERT INTO `relevance` VALUES ('faf837f2-8ac3-4269-8a1c-b2af432bf7b5', '', 'RoleElement', 0, '2020-03-19 21:23:19', '', '0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', 'a7eea5dc-3b10-4550-9cf3-0dba9b9fc32c', '', '');
INSERT INTO `relevance` VALUES ('fdc16578-e4eb-474d-8cc8-4188693a7c12', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '6c814946-db5c-48bd-84dd-b1c38196ad74', '', '');
INSERT INTO `relevance` VALUES ('feec44e3-3f88-4ac2-a4ad-a5bd3161f1bb', '', 'UserOrg', 0, '2019-10-31 21:59:08', '', '758a34c7-5a31-438c-bdf7-02fdd846b901', '66386671-0494-4e83-8346-fbcf73283f7b', '', '');
INSERT INTO `relevance` VALUES ('fef68b50-ef7f-45a4-8f0e-38e8d8ecaaea', '', 'RoleElement', 0, '2020-03-19 00:16:55', '', '09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '68484265-7802-4f06-b024-33e8b2f2edcf', '', '');

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '資源標識',
  `CascadeId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ' ' COMMENT '節點語義ID',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ' ' COMMENT '名稱',
  `SortNo` int(11) NOT NULL DEFAULT 0 COMMENT '排序號',
  `Description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ' ' COMMENT '描述',
  `ParentName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '父節點名稱',
  `ParentId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '父節點流ID',
  `AppId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '資源所屬應用ID',
  `AppName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬應用名稱',
  `TypeName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類名稱',
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類ID',
  `Disable` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否可用',
  `CreateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人ID',
  `CreateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人',
  `UpdateTime` datetime(0) DEFAULT NULL COMMENT '最後更新時間',
  `UpdateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人ID',
  `UpdateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '資源表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('SYS_DEL_USER', '.0.2.', '刪除使用者', 0, '擁有刪除OpenAuth.Net系統使用者資訊的許可權', '根節點', NULL, '110', 'OpenAuth.Net', NULL, NULL, 0, '2019-11-23 00:27:58', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 00:27:58', '', '');
INSERT INTO `resource` VALUES ('SYS_UPDATE_USER', '.0.1.', '更新使用者資訊', 0, '擁有更新OpenAuth.Net系統使用者資訊的許可權', '根節點', NULL, '110', 'OpenAuth.Net', NULL, NULL, 0, '2019-11-23 00:27:17', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 00:27:12', '', '');
INSERT INTO `resource` VALUES ('SYS_VIEW_USER', '.0.3.', '檢視使用者列表', 0, '檢視OpenAuth.Net使用者列表', '根節點', NULL, '110', 'OpenAuth.Net', NULL, NULL, 0, '2019-11-23 00:44:39', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 00:44:39', '', '');
INSERT INTO `resource` VALUES ('XXX_ADDORDER', '.0.6.', '建立訂單', 0, '在XXX平臺建立訂單', '根節點', NULL, '119', 'XXX管理平臺', NULL, NULL, 0, '2019-11-23 00:53:24', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 00:53:24', '', '');
INSERT INTO `resource` VALUES ('XXX_DEL_LOG', '.0.4.', '刪除XXX平臺日誌', 0, '刪除XXX平臺日誌', '根節點', NULL, '119', 'XXX管理平臺', NULL, NULL, 0, '2019-11-23 00:45:02', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 00:45:02', '', '');
INSERT INTO `resource` VALUES ('XXX_LOGIN', '.0.7.', '登錄', 0, '登錄XXX平臺', '根節點', NULL, '119', 'XXX管理平臺', NULL, NULL, 0, '2019-11-23 00:55:20', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 00:55:20', '', '');
INSERT INTO `resource` VALUES ('XXX_VIEW_USER', '.0.5.', '檢視使用者', 0, '檢視XXX平臺使用者列表', '根節點', NULL, '119', 'XXX管理平臺', NULL, NULL, 0, '2019-11-23 00:53:01', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 00:53:01', '', '');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Id',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名稱',
  `Status` int(11) NOT NULL COMMENT '當前狀態',
  `CreateTime` datetime(0) NOT NULL COMMENT '建立時間',
  `CreateId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立人ID',
  `TypeName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類名稱',
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類ID',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('09ee2ffa-7463-4938-ae0b-1cb4e80c7c13', '管理員', 0, '2018-04-09 22:48:24', '', '', '');
INSERT INTO `role` VALUES ('0a7ebd0c-78d6-4fbc-8fbe-6fc25c3a932d', '測試', 0, '2018-04-09 22:48:29', '', '', '');
INSERT INTO `role` VALUES ('77e6d0c3-f9e1-4933-92c3-c1c6eef75593', '神', 0, '2018-04-14 13:16:45', '', '', '');
INSERT INTO `role` VALUES ('d27ae3cf-135f-4d57-93a6-2120ddf98650', '測試二組', 0, '2019-11-23 00:46:31', '', '', '');

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '數據ID',
  `Name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '產品名稱',
  `Number` int(11) NOT NULL COMMENT '產品數量',
  `Price` decimal(10, 1) NOT NULL COMMENT '產品單價',
  `Status` int(11) NOT NULL COMMENT '出庫/入庫',
  `Viewable` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '可見範圍',
  `User` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作人',
  `Time` datetime(0) NOT NULL COMMENT '操作時間',
  `OrgId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '組織ID',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '出入庫資訊表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for syslog
-- ----------------------------
DROP TABLE IF EXISTS `syslog`;
CREATE TABLE `syslog`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '日誌內容',
  `TypeName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類名稱',
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類ID',
  `Href` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '操作所屬模組地址',
  `CreateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '記錄時間',
  `CreateId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作人ID',
  `CreateName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '操作人',
  `Ip` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '操作機器的IP地址',
  `Result` int(11) NOT NULL DEFAULT 0 COMMENT '操作的結果：0：成功；1：失敗；',
  `Application` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬應用',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系統日誌' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sysmessage
-- ----------------------------
DROP TABLE IF EXISTS `sysmessage`;
CREATE TABLE `sysmessage`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TypeName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `FromId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ToId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FromName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ToName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `FromStatus` int(11) NOT NULL DEFAULT 0 COMMENT '-1:已刪除；0:預設',
  `ToStatus` int(11) NOT NULL DEFAULT 0 COMMENT '-1:已刪除；0:預設未讀；1：已讀',
  `Href` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '點選訊息跳轉的頁面等',
  `Title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CreateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreateId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系統訊息表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for uploadfile
-- ----------------------------
DROP TABLE IF EXISTS `uploadfile`;
CREATE TABLE `uploadfile`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Id',
  `FileName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '檔名稱',
  `FilePath` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '檔案路徑',
  `Description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '描述',
  `FileType` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '檔案型別',
  `FileSize` int(11) DEFAULT NULL COMMENT '檔案大小',
  `Extension` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '副檔名稱',
  `Enable` tinyint(4) NOT NULL COMMENT '是否可用',
  `SortCode` int(11) NOT NULL COMMENT '排序',
  `DeleteMark` tinyint(4) NOT NULL COMMENT '刪除標識',
  `CreateUserId` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '上傳人',
  `CreateUserName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '上傳人姓名',
  `CreateTime` datetime(0) NOT NULL COMMENT '上傳時間',
  `Thumbnail` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '縮圖',
  `BelongApp` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬應用',
  `BelongAppId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '所屬應用ID',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '檔案' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '流水號',
  `Account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '使用者登錄帳號',
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密碼',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '使用者姓名',
  `Sex` int(11) NOT NULL COMMENT '性別',
  `Status` int(11) NOT NULL COMMENT '使用者狀態',
  `BizCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '業務對照碼',
  `CreateTime` datetime(0) NOT NULL COMMENT '經辦時間',
  `CreateId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '建立人',
  `TypeName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類名稱',
  `TypeId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分類ID',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '使用者基本資訊表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0ceff0f8-f848-440c-bc26-d8605ac858cd', 'test5', 'test5', 'test5', 1, 1, '', '2018-03-15 09:19:05', '', '', '');
INSERT INTO `user` VALUES ('1df68dfd-3b6d-4491-872f-00a0fc6c5a64', 'test4', 'test4', 'test4', 1, 1, '', '2017-12-12 14:07:11', '', '', '');
INSERT INTO `user` VALUES ('229f3a49-ab27-49ce-b383-9f10ca23a9d5', 'test3', 'test3', 'test3', 1, 1, '', '2017-12-12 14:07:05', '', '', '');
INSERT INTO `user` VALUES ('49df1602-f5f3-4d52-afb7-3802da619558', 'admin', 'admin', 'admin', 1, 0, '', '2017-12-11 16:18:54', '', '', '');
INSERT INTO `user` VALUES ('6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', 'test', 'test', 1, 0, '', '2017-12-11 16:19:00', '', '', '');
INSERT INTO `user` VALUES ('758a34c7-5a31-438c-bdf7-02fdd846b901', 'test77', 'test77', 'test77', 0, 0, '', '2019-10-31 21:59:08', '00000000-0000-0000-0000-000000000000', '', '');
INSERT INTO `user` VALUES ('96f63f9d-e8c8-4258-963e-3327ed7d6f56', 'test66', 'test66', 'test66', 0, 0, '', '2019-10-31 21:58:43', '00000000-0000-0000-0000-000000000000', '', '');
INSERT INTO `user` VALUES ('de8be521-f1ec-4483-b124-0be342890507', 'test2', 'test2', 'test2', 1, 0, '', '2017-12-11 16:19:06', '', '', '');

-- ----------------------------
-- Table structure for wmsinboundorderdtbl
-- ----------------------------
DROP TABLE IF EXISTS `wmsinboundorderdtbl`;
CREATE TABLE `wmsinboundorderdtbl`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '入庫通知單明細號',
  `OrderId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '入庫通知單號',
  `Price` decimal(18, 6) DEFAULT NULL COMMENT '含稅單價',
  `PriceNoTax` decimal(18, 6) DEFAULT NULL COMMENT '無稅單價',
  `InStockStatus` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否收貨中(0:非收貨中,1:收貨中)',
  `AsnStatus` int(11) NOT NULL DEFAULT 1 COMMENT '到貨狀況(SYS_GOODSARRIVESTATUS)',
  `GoodsId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品編號',
  `GoodsBatch` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品批號',
  `QualityFlg` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '品質(SYS_QUALITYFLAG)',
  `OrderNum` decimal(18, 2) NOT NULL DEFAULT 0.00 COMMENT '通知數量',
  `InNum` decimal(18, 2) NOT NULL DEFAULT 0.00 COMMENT '到貨數量',
  `LeaveNum` decimal(18, 2) NOT NULL DEFAULT 0.00 COMMENT '剩餘數量',
  `HoldNum` decimal(18, 2) NOT NULL DEFAULT 0.00 COMMENT '占用數量',
  `ProdDate` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '生產日期',
  `ExpireDate` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '失效日期',
  `TaxRate` decimal(10, 2) DEFAULT NULL COMMENT '稅率',
  `OwnerId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '貨主編號',
  `Remark` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '備註',
  `CreateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人ID',
  `CreateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人',
  `UpdateTime` datetime(0) DEFAULT NULL COMMENT '最後更新時間',
  `UpdateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人ID',
  `UpdateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人',
  PRIMARY KEY (`Id`, `OrderId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '入庫通知單明細' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wmsinboundorderdtbl
-- ----------------------------
INSERT INTO `wmsinboundorderdtbl` VALUES ('09a939ad-7e40-42f2-b0b3-fa9b74f94897', '20190035RK0001', 77.000000, 73.210000, 0, 0, '', '10045', '', 32.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-06 10:37:38', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:59', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('1e547556-9549-44d5-9da3-c07d98b5943e', '2019102203RK0003', 10.000000, 6.000000, 0, 0, '', '', '', 0.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-07 01:00:35', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:00', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('2ae93007-1490-4e81-b410-957fc08e2371', '2019102203RK0001', 25.000000, 22.500000, 0, 0, '', '100011', '', 0.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-06 10:32:10', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:28:47', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('30eb475b-ed86-4106-88f0-47a5a32ec8aa', 'TEST_002', 10.000000, 10.000000, 0, 1, '', 'CJ-334', '', 10.00, 8.00, 2.00, 0.00, '2019-11-22', '', 0.00, '', '', '2019-11-23 01:26:54', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 01:26:54', '', '');
INSERT INTO `wmsinboundorderdtbl` VALUES ('56b5612c-e048-4650-9710-4b235731d548', '20190035RK0001', 62.000000, 60.230000, 0, 0, '', '133521', '', 10.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-06 10:37:38', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:59', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('5e7d6ef8-351a-4600-849e-3958588161a7', '20190035RK0001', 55.000000, 54.230000, 0, 0, '', 'FK85122', '', 14.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-06 10:37:38', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:59', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('78c0a896-8341-47d4-b6d2-f241cec9fb58', 'TEST_001', 998.500000, 985.000000, 0, 1, '', 'CJ-P-4446', '', 500.00, 500.00, 0.00, 0.00, '2019-11-22', '2020-11-12', 6.00, '', '', '2019-11-23 01:27:49', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 01:29:38', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('95d6d2a8-0e17-426b-97f3-3c8a82bca313', '20190035RK0001', 15.000000, 13.220000, 0, 0, '', '10052', '', 52.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-06 10:37:38', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:59', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('b195386a-4f09-4e31-9d72-8e94526f9419', '2019102203RK0133', 200.000000, 199.000000, 0, 0, '', '', '', 0.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-07 01:24:11', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:24:11', '', '');
INSERT INTO `wmsinboundorderdtbl` VALUES ('ca470c60-9231-4c13-b51b-ad90c39633ae', '2019102203RK0187', 22.220000, 20.000000, 0, 0, '', '', '', 0.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-07 01:03:27', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:48', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('d19df810-5c47-4a32-a3a5-c908da60bf8b', 'TEST_002', 6.670000, 6.000000, 0, 1, '', 'CJ-335', '', 54.00, 54.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-23 01:26:54', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 01:26:54', '', '');
INSERT INTO `wmsinboundorderdtbl` VALUES ('dc0f9da2-0e0e-4dc3-9e59-2b0d51e53211', '2019102203RK0001', 10.000000, 8.000000, 0, 1, '', '100010', '', 0.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-06 10:32:10', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:28:47', '00000000-0000-0000-0000-000000000000', '超級管理員');
INSERT INTO `wmsinboundorderdtbl` VALUES ('fcf051d3-5c00-4617-895f-e45891d975df', '2019102203RK0002', 22.520000, 18.990000, 0, 1, '', '100020', '', 10.00, 0.00, 0.00, 0.00, '', '', 0.00, '', '', '2019-11-06 10:32:45', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:28:53', '00000000-0000-0000-0000-000000000000', '超級管理員');

-- ----------------------------
-- Table structure for wmsinboundordertbl
-- ----------------------------
DROP TABLE IF EXISTS `wmsinboundordertbl`;
CREATE TABLE `wmsinboundordertbl`  (
  `Id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '入庫通知單號',
  `ExternalNo` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '相關單據號',
  `ExternalType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '相關單據型別',
  `Status` int(11) NOT NULL DEFAULT 0 COMMENT '入庫通知單狀態(SYS_INSTCINFORMSTATUS)',
  `OrderType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '入庫型別(SYS_INSTCTYPE)',
  `GoodsType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品類別',
  `PurchaseNo` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '採購單號',
  `StockId` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '倉庫編號',
  `OwnerId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '貨主編號(固定值CQM)',
  `ShipperId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '承運人編號',
  `SupplierId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '供應商編號',
  `ScheduledInboundTime` datetime(0) DEFAULT NULL COMMENT '預定入庫時間',
  `Remark` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '備註',
  `Enable` tinyint(1) NOT NULL DEFAULT 1 COMMENT '有效標誌',
  `TransferType` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '承運方式',
  `InBondedArea` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否入保稅庫(0:否,1:是)',
  `ReturnBoxNum` decimal(8, 0) NOT NULL DEFAULT 0 COMMENT '銷退箱數',
  `CreateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `CreateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人ID',
  `CreateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '建立人',
  `UpdateTime` datetime(0) DEFAULT NULL COMMENT '最後更新時間',
  `UpdateUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人ID',
  `UpdateUserName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最後更新人',
  `OrgId` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '所屬部門',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '入庫通知單（入庫訂單）' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wmsinboundordertbl
-- ----------------------------
INSERT INTO `wmsinboundordertbl` VALUES ('20190035RK0001', '20190035RK0001', '', 1, 'SYS_INBOUNDTYPE_SAMPLE', '不合格', '20190035RK0001', '', '', '', '', '2019-11-20 00:00:00', '', 1, 'SYS_SHIPTYPE_FREIGHT', 1, 0, '2019-11-06 10:33:17', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:59', '00000000-0000-0000-0000-000000000000', '超級管理員', NULL);
INSERT INTO `wmsinboundordertbl` VALUES ('20190035RK0002', '20190035RK0002', '', 0, '樣品入庫', '特殊藥品', '20190035RK0002', '', '', '', '', '2019-11-14 00:00:00', '', 1, 'SYS_SHIPTYPE_FREIGHT', 1, 0, '2019-11-06 10:34:58', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:30:07', '00000000-0000-0000-0000-000000000000', '超級管理員', NULL);
INSERT INTO `wmsinboundordertbl` VALUES ('2019102203RK0001', '2019102203RK0001', '1', 1, '普通入庫', '普通商品', '2019102203RK0001', 'BJ003', 'CDC001', 'SF', 'SF', '2019-10-10 00:00:00', '', 1, 'SYS_SHIPTYPE_FREIGHT', 0, 1, '2019-10-31 21:27:14', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:28:47', '00000000-0000-0000-0000-000000000000', '超級管理員', NULL);
INSERT INTO `wmsinboundordertbl` VALUES ('2019102203RK0002', '2019102203RK0002', '1', 1, '普通入庫', '普通商品', '2019102203RK0002', 'BJ003', 'CDC001', 'SF', 'SF', '2019-10-10 00:00:00', '', 1, 'SYS_SHIPTYPE_NORMAL', 1, 20, '2019-10-31 21:27:14', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:28:53', '00000000-0000-0000-0000-000000000000', '超級管理員', NULL);
INSERT INTO `wmsinboundordertbl` VALUES ('2019102203RK0003', '2019102203RK0003', '1', 1, 'SYS_INBOUNDTYPE_RETURN', '普通商品', '2019102203RK0003', 'BJ003', 'CDC001', 'SF', 'SF', '2019-10-10 00:00:00', '', 1, 'SYS_SHIPTYPE_EMS', 0, 1, '2019-10-31 21:27:14', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:00', '00000000-0000-0000-0000-000000000000', '超級管理員', NULL);
INSERT INTO `wmsinboundordertbl` VALUES ('2019102203RK0133', '2019102203RK0133', '', 0, 'SYS_INBOUNDTYPE_SAMPLE', 'SYS_GOODSTYPE_COMMON', '2019102203RK0133', '', '', '001', '', '2019-11-26 00:00:00', '', 1, 'SYS_SHIPTYPE_EMS', 1, 0, '2019-11-07 01:24:11', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-07 01:24:11', '', '', NULL);
INSERT INTO `wmsinboundordertbl` VALUES ('2019102203RK0187', '2019102203RK0187', '', 1, 'SYS_INBOUNDTYPE_PURCHASE', 'SYS_GOODSTYPE_MEDINSTR', '2019102203RK0187', '', '', '', '', NULL, '', 1, 'SYS_SHIPTYPE_NORMAL', 1, 0, '2019-11-07 01:03:27', '00000000-0000-0000-0000-000000000000', '超級管理員', '2019-11-23 01:29:48', '00000000-0000-0000-0000-000000000000', '超級管理員', NULL);
INSERT INTO `wmsinboundordertbl` VALUES ('TEST_001', 'TEST_001', NULL, 0, 'SYS_INBOUNDTYPE_PURCHASE', 'SYS_GOODSTYPE_BIOLPROD', 'TEST_001', '001', 'BJ02', NULL, NULL, NULL, NULL, 0, 'SYS_SHIPTYPE_NORMAL', 0, 0, '2019-11-23 01:25:08', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 01:29:38', '00000000-0000-0000-0000-000000000000', '超級管理員', NULL);
INSERT INTO `wmsinboundordertbl` VALUES ('TEST_002', 'TEST_002', '', 0, 'SYS_INBOUNDTYPE_PURCHASE', 'SYS_GOODSTYPE_COMMON', 'TEST_002', '002', '', '', '', '2019-11-12 00:00:00', '', 0, 'SYS_SHIPTYPE_EMS', 1, 0, '2019-11-23 01:26:54', '6ba79766-faa0-4259-8139-a4a6d35784e0', 'test', '2019-11-23 01:26:54', '', '', NULL);

SET FOREIGN_KEY_CHECKS = 1;
