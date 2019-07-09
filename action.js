// 全局sleep时间
const global_sleep_time = 5000;
const global_sleep_time_inMission = 1000 * 60;

// 当前画面位置
var activing = null;
// part1位置
const active_GoGoGo = 'GoGoGo'; // 作战页面
const active_WuZi = 'WuZi';
const active_XinPian = 'XinPian';
// part2位置
const active_XuZhang = 'XuZhang'; // 序章
const active_ZhuXian1 = 'ZhuXian1'; // 主线1
const active_ZhuXian2 = 'ZhuXian2'; // 主线2
const active_ZhuXian3 = 'ZhuXian3'; // 主线3
const active_ZhuXian4 = 'ZhuXian4'; // 主线4
const active_LS = 'LS'; // 经验
const active_CA = 'CA'; // 技能书
const active_SK = 'SK'; // 基建材料
const active_CE = 'CE'; // 龙门币
const active_AP = 'AP'; // 采购凭证
const active_PR_B = 'PR_B'; // 狙击、术士芯片
const active_PR_C = 'PR_C'; // 先锋、辅助芯片
const active_PR_A = 'PR_A'; // 重装、医疗芯片
const active_PR_D = 'PR_D'; // 近卫、特种芯片

// 素材根目录
const img_path = './mySucai';
// 初始化关卡自动化图片素材
const img_mission_start = images.read(img_path + '/mission_control/start.png');
const img_mission_start_confirm = images.read(img_path + '/mission_control/start_confirm.png');
const img_mission_finish = images.read(img_path + '/mission_control/finish.png');

// 菜单操作相关的图片
const img_main_open_menu = images.read(img_path + '/open_main_menu.png');
const img_choose_menu_ZuoZhan = images.read(img_path + '/menu_choose_ZuoZhan.png');

// root操作对象初始化
var ra = null;
var root = false;

/*******************************************************************************/
/*------------------------------------part1------------------------------------*/
/*******************************************************************************/

const img_ZhuXian = images.read(img_path + '/ZuoZhan/zx.png');
const img_WuZi = images.read(img_path + '/ZuoZhan/wz.png');
const img_XinPian = images.read(img_path + '/ZuoZhan/xp.png');
const img_JiaoMie = images.read(img_path + '/ZuoZhan/jm.png');




/*******************************************************************************/
/*------------------------------------part2------------------------------------*/
/*******************************************************************************/

/**
 * Normal
 */
// 主线选择章节图片
const img_XuZhang = images.read(img_path + '/ZuoZhan/ZhuXian/0/in.png');
const img_ZhuXian1 = images.read(img_path + '/ZuoZhan/ZhuXian/1/in.png');
const img_ZhuXian2 = images.read(img_path + '/ZuoZhan/ZhuXian/2/in.png');
const img_ZhuXian3 = images.read(img_path + '/ZuoZhan/ZhuXian/3/in.png');
const img_ZhuXian4 = images.read(img_path + '/ZuoZhan/ZhuXian/4/in.png');
// 物资选择类型
const img_LS = images.read(img_path + '/ZuoZhan/WuZi/LS/in.png');
const img_AP = images.read(img_path + '/ZuoZhan/WuZi/AP/in.png');
const img_CE = images.read(img_path + '/ZuoZhan/WuZi/CE/in.png');
const img_CA = images.read(img_path + '/ZuoZhan/WuZi/CA/in.png');
const img_SK = images.read(img_path + '/ZuoZhan/WuZi/SK/in.png');
// 芯片选择类型
const img_PR_A = images.read (img_path + '/ZuoZhan/XinPian/PR_A/in.png');
const img_PR_B = images.read (img_path + '/ZuoZhan/XinPian/PR_B/in.png');
const img_PR_C = images.read(img_path + '/ZuoZhan/XinPian/PR_C/in.png');
const img_PR_D = images.read(img_path + '/ZuoZhan/XinPian/PR_D/in.png');
// 剿灭选择类型
const img_QieEr = images.read(img_path + '/ZuoZhan/JiaoMie/QieEr.png');
const img_LongMenWai = images.read(img_path + '/ZuoZhan/JiaoMie/LongMenWaiHuan.png');

/**
 * Allclear
 */
// 物资全开
const img_LS_allclear = images.read(img_path + '/ZuoZhan/WuZi/LS/in_allclear.png');
const img_AP_allclear = images.read(img_path + '/ZuoZhan/WuZi/AP/in_allclear.png');
const img_CE_allclear = images.read(img_path + '/ZuoZhan/WuZi/CE/in_allclear.png');
const img_CA_allclear = images.read(img_path + '/ZuoZhan/WuZi/CA/in_allclear.png');
const img_SK_allclear = images.read(img_path + '/ZuoZhan/WuZi/SK/in_allclear.png');
// 芯片全开
const img_PR_A_allclear = images.read (img_path + '/ZuoZhan/XinPian/PR_A/in_allclear.png');
const img_PR_B_allclear = images.read (img_path + '/ZuoZhan/XinPian/PR_B/in_allclear.png');
const img_PR_C_allclear = images.read(img_path + '/ZuoZhan/XinPian/PR_C/in_allclear.png');
const img_PR_D_allclear = images.read(img_path + '/ZuoZhan/XinPian/PR_D/in_allclear.png');



/*******************************************************************************/
/*------------------------------------part3------------------------------------*/
/*******************************************************************************/

/**
 * CE
 */
const img_CE_1 = images.read(img_path + '/ZuoZhan/WuZi/CE/CE_1.png');
const img_CE_2 = images.read(img_path + '/ZuoZhan/WuZi/CE/CE_2.png');
const img_CE_3 = images.read(img_path + '/ZuoZhan/WuZi/CE/CE_3.png');
const img_CE_4 = images.read(img_path + '/ZuoZhan/WuZi/CE/CE_4.png');
const img_CE_5 = images.read(img_path + '/ZuoZhan/WuZi/CE/CE_5.png');

/**
 * AP
 */
const img_AP_1 = images.read(img_path + '/ZuoZhan/WuZi/AP/AP_1.png');
const img_AP_2 = images.read(img_path + '/ZuoZhan/WuZi/AP/AP_2.png');
const img_AP_3 = images.read(img_path + '/ZuoZhan/WuZi/AP/AP_3.png');
const img_AP_4 = images.read(img_path + '/ZuoZhan/WuZi/AP/AP_4.png');
const img_AP_5 = images.read(img_path + '/ZuoZhan/WuZi/AP/AP_5.png');

/**
 * CA
 */
const img_CA_1 = images.read(img_path + '/ZuoZhan/WuZi/CA/CA_1.png');
const img_CA_2 = images.read(img_path + '/ZuoZhan/WuZi/CA/CA_2.png');
const img_CA_3 = images.read(img_path + '/ZuoZhan/WuZi/CA/CA_3.png');
const img_CA_4 = images.read(img_path + '/ZuoZhan/WuZi/CA/CA_4.png');
const img_CA_5 = images.read(img_path + '/ZuoZhan/WuZi/CA/CA_5.png');

/**
 * LS
 */
const img_LS_1 = images.read(img_path + '/ZuoZhan/WuZi/LS/LS_1.png');
const img_LS_2 = images.read(img_path + '/ZuoZhan/WuZi/LS/LS_2.png');
const img_LS_3 = images.read(img_path + '/ZuoZhan/WuZi/LS/LS_3.png');
const img_LS_4 = images.read(img_path + '/ZuoZhan/WuZi/LS/LS_4.png');
const img_LS_5 = images.read(img_path + '/ZuoZhan/WuZi/LS/LS_5.png');

/**
 * SK
 */
const img_SK_1 = images.read(img_path + '/ZuoZhan/WuZi/SK/SK_1.png');
const img_SK_2 = images.read(img_path + '/ZuoZhan/WuZi/SK/SK_2.png');
const img_SK_3 = images.read(img_path + '/ZuoZhan/WuZi/SK/SK_3.png');
const img_SK_4 = images.read(img_path + '/ZuoZhan/WuZi/SK/SK_4.png');
const img_SK_5 = images.read(img_path + '/ZuoZhan/WuZi/SK/SK_5.png');

/**
 * PR_A
 */
const img_PR_A_1 = images.read(img_path + '/ZuoZhan/XinPian/PR_A/PR_A_1.png');
const img_PR_A_2 = images.read(img_path + '/ZuoZhan/XinPian/PR_A/PR_A_2.png');

/**
 * PR_B
 */
const img_PR_B_1 = images.read(img_path + '/ZuoZhan/XinPian/PR_B/PR_B_1.png');
const img_PR_B_2 = images.read(img_path + '/ZuoZhan/XinPian/PR_B/PR_B_2.png');

/**
 * PR_C
 */
const img_PR_C_1 = images.read(img_path + '/ZuoZhan/XinPian/PR_C/PR_C_1.png');
const img_PR_C_2 = images.read(img_path + '/ZuoZhan/XinPian/PR_C/PR_C_2.png');

/**
 * PR_D
 */
const img_PR_D_1 = images.read(img_path + '/ZuoZhan/XinPian/PR_D/PR_D_1.png');
const img_PR_D_2 = images.read(img_path + '/ZuoZhan/XinPian/PR_D/PR_D_2.png');

/*******************************************************************************/
/*------------------------------------细节实现---------------- -----------------*/
/*******************************************************************************/



/**
 * @description 释放资源
 */
function recycle_all() {
    if (ra != null) {
        ra.exit();
    }
    img_mission_start.recycle();
    img_mission_start_confirm.recycle();
    img_mission_finish.recycle();
    img_main_open_menu.recycle();
    img_choose_menu_ZuoZhan.recycle();
    img_ZhuXian.recycle();
    img_WuZi.recycle();
    img_XinPian.recycle();
    img_JiaoMie.recycle();
    img_XuZhang.recycle();
    img_ZhuXian1.recycle();
    img_ZhuXian2.recycle();
    img_ZhuXian3.recycle();
    img_ZhuXian4.recycle();
    img_LS.recycle();
    img_AP.recycle();
    img_CE.recycle();
    img_CA.recycle();
    img_SK.recycle();
    img_LS_allclear.recycle();
    img_AP_allclear.recycle();
    img_CE_allclear.recycle();
    img_CA_allclear.recycle();
    img_SK_allclear.recycle();
    img_PR_A.recycle();
    img_PR_B.recycle();
    img_PR_C.recycle();
    img_PR_D.recycle();
    img_PR_A_allclear.recycle();
    img_PR_B_allclear.recycle();
    img_PR_C_allclear.recycle();
    img_PR_D_allclear.recycle();
    img_CE_1.recycle();
    img_CE_2.recycle();
    img_CE_3.recycle();
    img_CE_4.recycle();
    img_CE_5.recycle();
    img_QieEr.recycle();
    img_LongMenWai.recycle();
    img_AP_1.recycle();
    img_AP_2.recycle();
    img_AP_3.recycle();
    img_AP_4.recycle();
    img_AP_5.recycle();
    img_CA_1.recycle();
    img_CA_2.recycle();
    img_CA_3.recycle();
    img_CA_4.recycle();
    img_CA_5.recycle();
    img_LS_1.recycle();
    img_LS_2.recycle();
    img_LS_3.recycle();
    img_LS_4.recycle();
    img_LS_5.recycle();
    img_SK_1.recycle();
    img_SK_2.recycle();
    img_SK_3.recycle();
    img_SK_4.recycle();
    img_SK_5.recycle();
    img_PR_A_1.recycle();
    img_PR_A_2.recycle();
    img_PR_B_1.recycle();
    img_PR_B_2.recycle();
    img_PR_C_1.recycle();
    img_PR_C_2.recycle();
    img_PR_D_1.recycle();
    img_PR_D_2.recycle();
}
// 结束的时候释放资源
events.observeKey();
events.on('exit', recycle_all);


/**
 * @description 根据是否root选择点击方式
 * @param {int} x
 * @param {int} y
 */
function mClick(x, y) {
    if (root) {
        ra.press(x, y, 20)
    } else {
        click(x, y)
    }
}


/**
 * @description 输出现在的界面
 */
function toast_activing() {
    console.log('现在的界面是：' + activing);
}


/**
 * @description 根据图片素材点击位置
 * @param {images} img_beclick 准备要点击的图片
 * @param {boolean} outside 是否点击图片周边
 * @returns {boolean} 是否成功
 */
function click_by_img(img_beclick, outside, index) {
    // 在当前画面找
    console.log('img_beclick:' + img_beclick);
    var device_screen = images.captureScreen()
    console.log('device_screen:' + device_screen) // console.log log
    var result_point = null;
    var result_list = images.matchTemplate(device_screen, img_beclick, {
        threshold: 0.8
    })
    // 如果匹配到多个点，选最好的，选错了我也懒得管了wdnmd
    if (result_list.best() != null) {
        result_point = result_list.best().point;
    }
    console.log('result_point:' + result_point) // console.log log
    if (result_point == null) {
        return false
    }
    // 随机点击有效位置
    if (outside) {
        mClick(result_point.x - random(50, 80), result_point.y - random(50, 80))
    } else {
        mClick(result_point.x + random(1, img_beclick.width), result_point.y + random(1, img_beclick.height))
    }
    return true
}


/**
 * @description 打开跳转菜单
 * @returns {boolean} 是否成功
 */
function open_main_menu() {
    return click_by_img(img_main_open_menu, false);
}


/**
 * @description 选择菜单的作战选项
 * @returns {boolean} 是否成功
 */
function choose_ZuoZhan() {
    return click_by_img(img_choose_menu_ZuoZhan, false);
}


/**
 * @description 跳转到作战页面
 * @returns {boolean} 是否成功
 */
function to_GoGoGo() {
    if (open_main_menu()) {
        console.log('open_menu success!!!');
        sleep(global_sleep_time);
        if (choose_ZuoZhan()) {
            activing = active_GoGoGo;
            return true;
        }
    }
    console.log('open_menu fail!!!');
    return false;
}


/**
 * @description 根据类值选择点击图片
 * @param {string} activity.value
 * @returns {boolean} 是否成功
 */
function to_where(str) {
    if (click_by_img(eval('img_'+str), false)){
        return true;
    }
    return false;
}


/**
 * @description 开始行动事件
 * @returns {boolean} 是否成功
 */
function mission_start() {
    if (click_by_img(img_mission_start)) {
        sleep(global_sleep_time);
        if (click_by_img(img_mission_start_confirm)) {
            sleep(global_sleep_time_inMission);
            while (!click_by_img(img_mission_finish, true)) {
                sleep(global_sleep_time_inMission);
            }
            sleep(global_sleep_time);
        }
    }
    return false;
}





/*******************************************************************************/
/*------------------------------------暴露给外的接口----------------------------*/
/*******************************************************************************/


var action = {};
/**
 * @description 入口类
 * @param {*} item 事件列表中的item
 * @returns {boolean} 是否成功
 */
action.start = function(item, newroot) {
    // 是否用root点击
    root = newroot;
    if (root && ra == null) {
        var mthread = threads.start(function() {
            ra = new RootAutomator();
        });
        mthread.join(3000);
    }
    // to作战界面
    while (!to_GoGoGo()) {
        toast('请进入作战页面');
        sleep(global_sleep_time);
    }
    sleep(global_sleep_time);
    // to part1
    if (to_where(item['part1_value'])) {
        sleep(global_sleep_time);
        // to part2
        if (to_where(item['part2_value'])) {
            sleep(global_sleep_time);
            // 判断剿灭特殊情况
            if (item['part1_value'] == 'JiaoMie') {
                mission_start();
                return true;
            }
            // to part3
            if (to_where(item['part3_value'])) {
                sleep(global_sleep_time);
                // 开始作战
                mission_start();
                return true;
            }
        }
    }
    return false;
}
// 暴露
module.exports = action;





/*******************************************************************************/
/*------------------------------------测试-------------------------------------*/
/*******************************************************************************/


/**
 * @description 测试
 */
function test() {
    part1 = 'WuZi';
    part2 = 'CE';
    part3 = 'CE_5';
    if (to_GoGoGo()) {
        sleep(global_sleep_time);
        if (to_where(part1)) {
            sleep(global_sleep_time);

            to_where(part2);
            sleep(global_sleep_time);
            
            to_where(part3);
            sleep(global_sleep_time);
        }
    }
    mission_start();
    exit();
}