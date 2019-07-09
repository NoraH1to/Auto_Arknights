



/**
 * 主线类
 */

 // 序章
var XuZhang = {};
XuZhang.name = '序章';
XuZhang.value = 'XuZhang';
XuZhang.list = [];

// 第一章
var ZhuXian1 = {};
ZhuXian1.name = '第一章';
ZhuXian1.value = 'ZhuXian1';
ZhuXian1.list = [];

// 第二章
var ZhuXian2 = {};
ZhuXian2.name = '第二章';
ZhuXian2.value = 'ZhuXian2';
ZhuXian2.list = [];

// 第三章
var ZhuXian3 = {};
ZhuXian3.name = '第三章';
ZhuXian3.value = 'ZhuXian3';
ZhuXian3.list = [];

// 第四章
var ZhuXian4 = {};
ZhuXian4.name = '第四章';
ZhuXian4.value = 'ZhuXian4';
ZhuXian4.list = [];

var ZhuXian = {};
ZhuXian.name = '主线';
ZhuXian.value = 'ZhuXian';
ZhuXian.list = {
    'XuZhang': XuZhang,
    'ZhuXian1': ZhuXian1,
    'ZhuXian2': ZhuXian2,
    'ZhuXian3': ZhuXian3,
    'ZhuXian4': ZhuXian4
};



/**
 * 物资筹备类
 */

 // 经验
var LS = {};
LS.name = '经验';
LS.value = 'LS';
LS.list = [
    'LS_1', 'LS_2', 'LS_3', 'LS_4', 'LS_5'
];

// 技能书
var CA = {};
CA.name = '技能书';
CA.value = 'CA';
CA.list = [
    'CA_1', 'CA_2', 'CA_3', 'CA_4', 'CA_5'
];

// 基建材料
var SK = {};
SK.name = '基建材料';
SK.value = 'SK';
SK.list = [
    'SK_1', 'SK_2', 'SK_3', 'SK_4', 'SK_5'
];

// 龙门币
var CE = {};
CE.name = '龙门币';
CE.value = 'CE';
CE.list = [
    'CE_1', 'CE_2', 'CE_3', 'CE_4', 'CE_5'
];

// 采购凭证
var AP = {};
AP.name = '采购凭证';
AP.value = 'AP';
AP.list = [
    'AP_1', 'AP_2', 'AP_3', 'AP_4', 'AP_5'
];

var WuZi = {};
WuZi.name = '物资筹备';
WuZi.value = 'WuZi';
WuZi.list = {
    'LS': LS,
    'CA': CA,
    'SK': SK,
    'CE': CE,
    'AP': AP
};





/**
 * 芯片搜索类
 */

 // 重装、医疗
var PR_A = {};
PR_A.name = '重装、医疗';
PR_A.value = 'PR_A';
PR_A.list = [
    'PR_A_1', 'PR_A_2'
];

// 狙击、术士
var PR_B = {};
PR_B.name = '狙击、术士';
PR_B.value = 'PR_B';
PR_B.list = [
    'PR_B_1', 'PR_B_2'
];

// 先锋、辅助
var PR_C = {};
PR_C.name = '先锋、辅助';
PR_C.value = 'PR_C';
PR_C.list = [
    'PR_C_1', 'PR_C_2'
];

// 近卫、特种
var PR_D = {};
PR_D.name = '近卫、特种';
PR_D.value = 'PR_D';
PR_D.list = [
    'PR_D_1', 'PR_D_2'
];

var XinPian = {};
XinPian.name = '芯片搜索';
XinPian.value = 'XinPian';
XinPian.list = {
    'PR_A': PR_A,
    'PR_B': PR_B,
    'PR_C': PR_C,
    'PR_D': PR_D
};





/**
 * 剿灭作战
 */

// 切尔诺伯格
var QieEr = {};
QieEr.name = '切尔诺伯格';
QieEr.value = 'QieEr';
QieEr.list = [];

// 龙门外环
var LongMenWai = {};
LongMenWai.name = '龙门外环';
LongMenWai.value = 'LongMenWai';
LongMenWai.list = [];

var JiaoMie = {};
JiaoMie.name = '剿灭作战';
JiaoMie.value = 'JiaoMie';
JiaoMie.list = [
    QieEr, LongMenWai
];


/**
 * 活动入口类
 */
var activity = {};
activity.dict = {
    'ZhuXian': ZhuXian, 
    'WuZi': WuZi,
    'XinPian': XinPian,
    'JiaoMie': JiaoMie
};


module.exports = activity; // 只暴露入口类的接口