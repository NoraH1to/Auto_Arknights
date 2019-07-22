// 读取设置
var mStorage = storages.create('settings');
function global_sleep_time() {
    return parseInt(mStorage.get('global_sleep_time'));
}
function global_sleep_time_inMission() {
    return parseInt(mStorage.get('global_sleep_time_inMission'));
}
function global_swipe_sleep_time() {
    return parseInt(mStorage.get('global_swipe_sleep_time'));
}
function global_click_count() {
    return parseInt(mStorage.get('global_click_count'));
}


// root操作对象初始化
var ra = null;
var root = false;

// 预先载入json配置
var imgPath_Json = null;
if (files.exists('/sdcard/Auto_Arknights/imgPath.json')) {
    imgPath_Json = JSON.parse(files.read('/sdcard/Auto_Arknights/imgPath.json'));
    console.log('图片配置载入成功');
} else {
    console.log('找不到图片配置！');
}


/*******************************************************************************/
/*------------------------------------细节实现---------------- -----------------*/
/*******************************************************************************/


/**
 * @description 根据name从配置中获取设备的图片地址
 * @param {string} name
 * @returns {*} 成功返回地址，失败返回false
 */
function getLocalImgPath(name) {
    var path = '';
    if (imgPath_Json != null) {
        path = imgPath_Json['data'][name]['device_path'];
        console.log('获取图片地址成功: %s', path);
        return path;
    }
    console.log('获取图片地址失败');
    return false
}


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
 * @description 根据图片素材点击位置
 * @param {images} img_beclick 准备要点击的图片
 * @param {boolean} outside 是否点击图片周边
 * @param {number} jindu 查找精度
 * @returns {boolean} 是否成功
 */
function click_by_img(img_beclick_path, outside, jindu) {
    // 尝试次数
    var count = 0;
    // 根据传入路径初始化图片
    var img_beclick = images.read(img_beclick_path);
    // 找多次找不到就失败
    while (count < global_click_count()) {
        console.log(img_beclick_path + "count" + count);
        // 在当前画面找
        console.log('img_beclick:' + img_beclick);
        var device_screen = images.captureScreen()
        console.log('device_screen:' + device_screen) // console.log log
        var result_point = null;
        var result_list = images.matchTemplate(device_screen, img_beclick, {
            threshold: jindu
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
 * @description 滑动
 * @param {string} orientation 反向
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
        sleep(global_swipe_sleep_time());
    }
}


/**
 * @description 打开跳转菜单
 * @returns {boolean} 是否成功
 */
function open_main_menu() {
    return click_by_img(getLocalImgPath('img_main_open_menu'), false,  0.8);
}


/**
 * @description 选择菜单的作战选项
 * @returns {boolean} 是否成功
 */
function choose_ZuoZhan() {
    return click_by_img(getLocalImgPath('img_choose_menu_ZuoZhan'), false, 0.8);
}


/**
 * @description 跳转到作战页面
 * @returns {boolean} 是否成功
 */
function to_GoGoGo() {
    if (open_main_menu()) {
        console.log('open_menu success!!!');
        mSleep(global_sleep_time());
        if (choose_ZuoZhan()) {
            return true;
        }
    }
    console.log('open_menu fail!!!');
    return false;
}


/**
 * @description 根据类值选择点击图片
 * @param {string} str 去哪
 * @param {number} jindu 查找图片的精度
 * @returns {boolean} 是否成功
 */
function to_where(str, jindu) {
    var swipe_count = 0;
    console.log('stepIn_1');
    // 如果首次找不到，就复位到最左侧
    if (click_by_img(getLocalImgPath('img_'+str), false, jindu)){
        console.log('stepIn_2');
        return true;
    } else {
        console.log('stepIn_3');
        swipeReturn();
        // 找不到就往左滑动一次，5次机会
        while(swipe_count < 5) {
            if (click_by_img(getLocalImgPath('img_'+str), false, jindu)){
                return true;
            }
            mSwipe('left')
            sleep(global_swipe_sleep_time());
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
    if (click_by_img(getLocalImgPath('img_mission_start'), false, 0.8)) {
        mSleep(global_sleep_time());
        if (click_by_img(getLocalImgPath('img_mission_start_confirm'), false, 0.8)) {
            mSleep(global_sleep_time_inMission());
            while (!click_by_img(getLocalImgPath('img_mission_finish'), true, 0.8)) {
                mSleep(global_sleep_time_inMission());
            }
            mSleep(global_sleep_time());
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
action.start = function(item) {
    // 事件循环次数
    var count = item['count_value'];
    // to作战界面
    while (!to_GoGoGo()) {
        toast('请进入作战页面');
        mSleep(global_sleep_time());
    }
    mSleep(global_sleep_time());
    // to normal part1
    console.log('step1');
    if (to_where(item['part1_value']), 0.8) {
        mSleep(global_sleep_time());
        // to normal part2
        console.log('step2');
        if (to_where(item['part2_value']), 0.8) {
            mSleep(global_sleep_time());
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
            if (to_where(item['part3_value']), 0.9) {
                mSleep(global_sleep_time());
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


