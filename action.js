// 全局sleep时间
const global_sleep_time = 3500;
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
const img_mission_start = (img_path + '/mission_control/start.png');
const img_mission_start_confirm = (img_path + '/mission_control/start_confirm.png');
const img_mission_finish = (img_path + '/mission_control/finish.png');

// 菜单操作相关的图片
const img_main_open_menu = (img_path + '/open_main_menu.png');
const img_choose_menu_ZuoZhan = (img_path + '/menu_choose_ZuoZhan.png');

// root操作对象初始化
var ra = null;
var root = false;

/*******************************************************************************/
/*------------------------------------part1------------------------------------*/
/*******************************************************************************/

const img_ZhuXian = (img_path + '/ZuoZhan/zx.png');
const img_WuZi = (img_path + '/ZuoZhan/wz.png');
const img_XinPian = (img_path + '/ZuoZhan/xp.png');
const img_JiaoMie = (img_path + '/ZuoZhan/jm.png');




/*******************************************************************************/
/*------------------------------------part2------------------------------------*/
/*******************************************************************************/

/**
 * Normal
 */
// 主线选择章节图片
const img_XuZhang = (img_path + '/ZuoZhan/ZhuXian/0/in.png');
const img_ZhuXian1 = (img_path + '/ZuoZhan/ZhuXian/1/in.png');
const img_ZhuXian2 = (img_path + '/ZuoZhan/ZhuXian/2/in.png');
const img_ZhuXian3 = (img_path + '/ZuoZhan/ZhuXian/3/in.png');
const img_ZhuXian4 = (img_path + '/ZuoZhan/ZhuXian/4/in.png');
// 物资选择类型
const img_LS = (img_path + '/ZuoZhan/WuZi/LS/in.png');
const img_AP = (img_path + '/ZuoZhan/WuZi/AP/in.png');
const img_CE = (img_path + '/ZuoZhan/WuZi/CE/in.png');
const img_CA = (img_path + '/ZuoZhan/WuZi/CA/in.png');
const img_SK = (img_path + '/ZuoZhan/WuZi/SK/in.png');
// 芯片选择类型
const img_PR_A =  (img_path + '/ZuoZhan/XinPian/PR_A/in.png');
const img_PR_B =  (img_path + '/ZuoZhan/XinPian/PR_B/in.png');
const img_PR_C = (img_path + '/ZuoZhan/XinPian/PR_C/in.png');
const img_PR_D = (img_path + '/ZuoZhan/XinPian/PR_D/in.png');
// 剿灭选择类型
const img_QieEr = (img_path + '/ZuoZhan/JiaoMie/QieEr.png');
const img_LongMenWai = (img_path + '/ZuoZhan/JiaoMie/LongMenWaiHuan.png');

/**
 * Allclear
 */
// 物资全开
const img_LS_allclear = (img_path + '/ZuoZhan/WuZi/LS/in_allclear.png');
const img_AP_allclear = (img_path + '/ZuoZhan/WuZi/AP/in_allclear.png');
const img_CE_allclear = (img_path + '/ZuoZhan/WuZi/CE/in_allclear.png');
const img_CA_allclear = (img_path + '/ZuoZhan/WuZi/CA/in_allclear.png');
const img_SK_allclear = (img_path + '/ZuoZhan/WuZi/SK/in_allclear.png');
// 芯片全开
const img_PR_A_allclear =  (img_path + '/ZuoZhan/XinPian/PR_A/in_allclear.png');
const img_PR_B_allclear =  (img_path + '/ZuoZhan/XinPian/PR_B/in_allclear.png');
const img_PR_C_allclear = (img_path + '/ZuoZhan/XinPian/PR_C/in_allclear.png');
const img_PR_D_allclear = (img_path + '/ZuoZhan/XinPian/PR_D/in_allclear.png');



/*******************************************************************************/
/*------------------------------------part3------------------------------------*/
/*******************************************************************************/

/**
 * CE
 */
const img_CE_1 = (img_path + '/ZuoZhan/WuZi/CE/CE_1.png');
const img_CE_2 = (img_path + '/ZuoZhan/WuZi/CE/CE_2.png');
const img_CE_3 = (img_path + '/ZuoZhan/WuZi/CE/CE_3.png');
const img_CE_4 = (img_path + '/ZuoZhan/WuZi/CE/CE_4.png');
const img_CE_5 = (img_path + '/ZuoZhan/WuZi/CE/CE_5.png');

/**
 * AP
 */
const img_AP_1 = (img_path + '/ZuoZhan/WuZi/AP/AP_1.png');
const img_AP_2 = (img_path + '/ZuoZhan/WuZi/AP/AP_2.png');
const img_AP_3 = (img_path + '/ZuoZhan/WuZi/AP/AP_3.png');
const img_AP_4 = (img_path + '/ZuoZhan/WuZi/AP/AP_4.png');
const img_AP_5 = (img_path + '/ZuoZhan/WuZi/AP/AP_5.png');

/**
 * CA
 */
const img_CA_1 = (img_path + '/ZuoZhan/WuZi/CA/CA_1.png');
const img_CA_2 = (img_path + '/ZuoZhan/WuZi/CA/CA_2.png');
const img_CA_3 = (img_path + '/ZuoZhan/WuZi/CA/CA_3.png');
const img_CA_4 = (img_path + '/ZuoZhan/WuZi/CA/CA_4.png');
const img_CA_5 = (img_path + '/ZuoZhan/WuZi/CA/CA_5.png');

/**
 * LS
 */
const img_LS_1 = (img_path + '/ZuoZhan/WuZi/LS/LS_1.png');
const img_LS_2 = (img_path + '/ZuoZhan/WuZi/LS/LS_2.png');
const img_LS_3 = (img_path + '/ZuoZhan/WuZi/LS/LS_3.png');
const img_LS_4 = (img_path + '/ZuoZhan/WuZi/LS/LS_4.png');
const img_LS_5 = (img_path + '/ZuoZhan/WuZi/LS/LS_5.png');

/**
 * SK
 */
const img_SK_1 = (img_path + '/ZuoZhan/WuZi/SK/SK_1.png');
const img_SK_2 = (img_path + '/ZuoZhan/WuZi/SK/SK_2.png');
const img_SK_3 = (img_path + '/ZuoZhan/WuZi/SK/SK_3.png');
const img_SK_4 = (img_path + '/ZuoZhan/WuZi/SK/SK_4.png');
const img_SK_5 = (img_path + '/ZuoZhan/WuZi/SK/SK_5.png');

/**
 * PR_A
 */
const img_PR_A_1 = (img_path + '/ZuoZhan/XinPian/PR_A/PR_A_1.png');
const img_PR_A_2 = (img_path + '/ZuoZhan/XinPian/PR_A/PR_A_2.png');

/**
 * PR_B
 */
const img_PR_B_1 = (img_path + '/ZuoZhan/XinPian/PR_B/PR_B_1.png');
const img_PR_B_2 = (img_path + '/ZuoZhan/XinPian/PR_B/PR_B_2.png');

/**
 * PR_C
 */
const img_PR_C_1 = (img_path + '/ZuoZhan/XinPian/PR_C/PR_C_1.png');
const img_PR_C_2 = (img_path + '/ZuoZhan/XinPian/PR_C/PR_C_2.png');

/**
 * PR_D
 */
const img_PR_D_1 = (img_path + '/ZuoZhan/XinPian/PR_D/PR_D_1.png');
const img_PR_D_2 = (img_path + '/ZuoZhan/XinPian/PR_D/PR_D_2.png');

/**
 * 第一章
 */
const img_1_7 = (img_path + '/ZuoZhan/ZhuXian/1/1_7.png');

/**
 * 第三章
 */
const img_3_2 = (img_path + '/ZuoZhan/ZhuXian/3/3_2.png');
const img_3_8 = (img_path + '/ZuoZhan/ZhuXian/3/3_8.png');

/**
 * 第四章
 */
const img_4_2 = (img_path + '/ZuoZhan/ZhuXian/4/4_2.png');
const img_4_4 = (img_path + '/ZuoZhan/ZhuXian/4/4_4.png');
const img_4_5 = (img_path + '/ZuoZhan/ZhuXian/4/4_5.png');
const img_4_6 = (img_path + '/ZuoZhan/ZhuXian/4/4_6.png');
const img_4_7 = (img_path + '/ZuoZhan/ZhuXian/4/4_7.png');
const img_4_8 = (img_path + '/ZuoZhan/ZhuXian/4/4_8.png');
const img_4_9 = (img_path + '/ZuoZhan/ZhuXian/4/4_9.png');
const img_4_10 = (img_path + '/ZuoZhan/ZhuXian/4/4_10.png');

/**
 * 第五章
 */
const img_5_2 = (img_path + '/ZuoZhan/ZhuXian/5/5_2.png');
const img_5_5 = (img_path + '/ZuoZhan/ZhuXian/5/5_5.png');



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
    if (root && (ra != null)) {
        console.log('root_click：'+ x + ', ' + y);
        ra.press(device.width - y,  x, random(40, 60)); // root的点击是个天坑，x轴和y轴不会随着屏幕旋转而旋转，所以暂时就先不用了，等autojs更新
        mSleep(500);
    } else {
        console.log('normal_click：'+ x + ', ' + y);
        click(x, y);
    }
}


/**
 * @description 在一定事件区间随机休眠
 * @param {number} time
 */
function mSleep(time) {
    sleep(random(time * 0.8, time * 1.2));
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
function click_by_img(img_beclick_path, outside, index) {
    // 尝试次数
    var count = 0;
    // 根据传入路径初始化图片
    var img_beclick = images.read(img_beclick_path);
    // 找3次找不到就失败
    while (count < 3) {
        console.log(img_beclick_path + "count" + count);
        // 在当前画面找
        console.log('img_beclick:' + img_beclick);
        var device_screen = images.captureScreen()
        console.log('device_screen:' + device_screen) // console.log log
        var result_point = null;
        var result_list = images.matchTemplate(device_screen, img_beclick, {
            threshold: 0.9
        })
        mSleep(2000);
        // 如果匹配到多个点，选最好的，选错了我也懒得管了wdnmd
        if (result_list.best() != null) {
            result_point = result_list.best().point;
        }
        console.log('result_point:' + result_point) // console.log log
        if (result_point != null) {
            // 随机点击有效位置
            if (outside) {
                mClick(result_point.x - random(50, 80), result_point.y - random(50, 80))
            } else {
                mClick(result_point.x + random(1, img_beclick.width), result_point.y + random(1, img_beclick.height))
            }
            // 释放图片资源
            img_beclick.recycle();
            return true
        }
        count++;
        mSleep(2000);   
    }
    // 释放图片资源
    img_beclick.recycle();
    return false
}


/**
 * @description 向右滑动（显示左侧内容）
 * @param {string} orientation
 */
function mSwipe(orientation) {
    console.log('滑动方向:%s', orientation);
    // 起始点
    var y_start = random(device.width * 0.3, device.width * 0.7);
    var x_start = random(device.height * 0.1, device.height * 0.5);
    // 结束点
    var y_end = y_start + random(-device.width * 0.1, device.width * 0.1);
    var x_end = x_start + random(device.height * 0.25, device.height * 0.35);
    // 判断滑动方向
    switch(orientation){
        case 'left':
            console.log('起始点:%d, %d  结束点:%d, %d', x_end, y_end, x_start, y_start);
            swipe(x_end, y_end, x_start, y_start, random(1800, 2000));
            break;
        case 'right':
            console.log('起始点:%d, %d  结束点:%d, %d', x_start, y_start, x_end, y_end);
            swipe(x_start, y_start, x_end, y_end, random(1800, 2000));
            break;
    }
    console.log('滑动结束');
}


/**
 * @description 滑动复位到最左侧
 */
function swipeReturn() {
    console.log('正在滑动复位..');
    for(var i = 0; i < 5; i++) {
        mSwipe('right');
        sleep(global_sleep_time);
    }
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
        mSleep(global_sleep_time);
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
    var swipe_count = 0;
    console.log('stepIn_1');
    // 如果首次找不到，就复位到最左侧
    if (click_by_img(eval('img_'+str), false)){
        console.log('stepIn_2');
        return true;
    } else {
        console.log('stepIn_3');
        swipeReturn();
        // 找不到就往左滑动一次，5次机会
        while(swipe_count < 5) {
            if (click_by_img(eval('img_'+str), false)){
                return true;
            }
            mSwipe('left')
            swipe_count++;
        }
    }
    console.log('stepIn_4');
    return false;
}


/**
 * @description 开始行动事件
 * @returns {boolean} 是否成功
 */
function mission_start() {
    if (click_by_img(img_mission_start)) {
        mSleep(global_sleep_time);
        if (click_by_img(img_mission_start_confirm)) {
            mSleep(global_sleep_time_inMission);
            while (!click_by_img(img_mission_finish, true)) {
                mSleep(global_sleep_time_inMission);
            }
            mSleep(global_sleep_time);
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
    // 事件循环次数
    var count = item['count_value'];
    // 是否用root点击
    // root = newroot;
    // if (root && (ra == null)) {
    //     var mthread = threads.start(function() {
    //         ra = new RootAutomator();
    //     });
    //     mthread.join();
    // }
    // TODO: root暂时不用了，问题多
    // to作战界面
    while (!to_GoGoGo()) {
        toast('请进入作战页面');
        mSleep(global_sleep_time);
    }
    mSleep(global_sleep_time);
    // to normal part1
    console.log('step1');
    if (to_where(item['part1_value'])) {
        mSleep(global_sleep_time);
        // to normal part2
        console.log('step2');
        if (to_where(item['part2_value'])) {
            mSleep(global_sleep_time);
            console.log('step3');
            // 判断剿灭特殊情况
            if (item['part1_value'] == 'JiaoMie') {
                // 开始作战
                while (count > 0) {
                    mission_start();
                    count--;
                }
                return true;
            }
            // to normal part3
            if (to_where(item['part3_value'])) {
                mSleep(global_sleep_time);
                // 开始作战
                while (count > 0) {
                    mission_start();
                    count--;
                }
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
        mSleep(global_sleep_time);
        if (to_where(part1)) {
            mSleep(global_sleep_time);

            to_where(part2);
            mSleep(global_sleep_time);
            
            to_where(part3);
            mSleep(global_sleep_time);
        }
    }
    mission_start();
    exit();
}