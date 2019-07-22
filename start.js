"ui";
ui.layout(
    <frame>
        <appbar h="auto">
            <toolbar id='toolbar' textSize="24sp" title="Auto_Arknightsです"/>
        </appbar>
        <scroll marginTop="56">
            <vertical h="*">
                <vertical padding="16" h="*">
                    <Switch id="autoService" text="无障碍服务" textSize="15sp"/>
                    <View marginTop="16" h="1" w="*" bg="#e1e1e1"/>
                    <text marginTop="16" text="事件："/>
                    <CheckBox id="isAllClear" text="是否活动状态" textSize="15sp"/>
                    <horizontal w="*" gravity="center">
                        <button text="SELECT 1" layout_weight="1" id="sp1" style="Widget.AppCompat.Button.Borderless.Colored"/>
                        <button text="SELECT 2" layout_weight="1" id="sp2" style="Widget.AppCompat.Button.Borderless.Colored"/>
                        <button text="SELECT 3" layout_weight="1" id="sp3" style="Widget.AppCompat.Button.Borderless.Colored"/>
                        <button text="次数" layout_weight="1" id="sp4" style="Widget.AppCompat.Button.Borderless.Colored"/>
                    </horizontal>
                    <button layout_weight="1" style="Widget.AppCompat.Button.Colored" id="addButton" text="添加事件"></button>
                    <View marginTop="16" h="1" w="*" bg="#e1e1e1"/>
                    <text marginTop="16" text="事件列表，长按可删除："/>
                    <list h="350" id="todoList" paddingTop="4" paddingBottom="4">
                        <card w="*" h="auto" cardElevation="2dp" cardCornerRadius="2dp" margin="4" foreground="?selectableItemBackground">
                            <horizontal w="*" h="48" gravity='center'>
                                <View id='action_list_bg' bg="#2196f3" h="*" w="8"/>
                                <text id='part1_text' padding='4' layout_weight='1' gravity='center' w="auto" h="auto" text="{{part1}}"></text>
                                <text id='part2_text' padding='4' layout_weight='1' gravity='center' w="auto" h="auto" text="{{part2}}"></text>
                                <text id='part3_text' padding='4' layout_weight='1' gravity='center' w="auto" h="auto" text="{{part3}}"></text>
                                <text id='part4_text' padding='4' layout_weight='1' gravity='center' w="auto" h="auto" text="{{count}}"></text>
                            </horizontal>
                        </card>
                    </list>
                    <View marginTop="16" h="1" w="*" bg="#e1e1e1"/>
                    <horizontal marginTop="16" w="*" gravity="center">
                        <button layout_weight="1" style="Widget.AppCompat.Button.Colored" id="startButton" paddingTop="8" text="开始执行"></button>
                        <button layout_weight="1" style="Widget.AppCompat.Button.Borderless.Colored" id="stopButton" paddingTop="8" color="red" text="停止执行"></button>
                    </horizontal>
                </vertical>
            </vertical>
        </scroll>
    </frame>
);

// 初始化右上角的菜单
ui.emitter.on('create_options_menu', menu=>{
    menu.add('设置');
    menu.add('检测配置文件更新');
    menu.add('检测缺失素材');
    menu.add('清除配置文件');
    menu.add('食用指南');
    menu.add('关于');
});
// 菜单监听
ui.emitter.on('options_item_selected', (e, item)=>{
    switch(item.getTitle()){
        case '设置':
            engines.execScriptFile('./view/settings.js');
            break;
        case '检测配置文件更新':
            threads.start(function(){
                check_config_update();
            });
            break;
        case '检测缺失素材':
            threads.start(function(){
                check_sucai();
            });
            break;
        case '食用指南':
            app.openUrl('http://norah1to.com:6363/help');
            break;
        case '清除配置文件':
            threads.start(function(){
                re_download_all_files();
            });
            break;
        case '关于':
            engines.execScriptFile('./view/about.js');
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

// 初始化动作类
var action = null;
// 初始化本地储存键值对
var mStorage = storages.create('settings');

// 监听回到应用时有无无障碍
ui.emitter.on("resume", function() {
    ui.autoService.checked = auto.service != null;
    if (auto.service != null) {
        events.observeKey();
        // 引入动作类
        if (action == null) {
            action = require('./action.js');
        }
    } else {
        alert('请先开启\"Auto_Arknights\"的无障碍服务')
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
});

// 开启就检测无障碍状态
if (auto.service == null) {
    alert('请先开启\"Auto_Arknights\"的无障碍服务')
    app.startActivity({
        action: "android.settings.ACCESSIBILITY_SETTINGS"
    });
}

// 注册事件监听
if (auto.service != null) {
    events.observeKey();
    // 引入动作类
    action = require('./action.js');
}

/*******************************************************************/
/*---------------------------无障碍相关-----------------------------*/
/*******************************************************************/


ui.autoService.on("check", function(checked) {
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});



/*******************************************************************/
/*---------------------------配置文件检查等-------------------------*/
/*******************************************************************/

check_config();
init_settings();

/**
 * @description 初始化设置
 */
function init_settings() {
    // 全局操作间隔
    if (!mStorage.contains('global_sleep_time')) {
        mStorage.put('global_sleep_time', 1000);
    }
    // 关卡内检测是否完成的间隔
    if (!mStorage.contains('global_sleep_time_inMission')) {
        mStorage.put('global_sleep_time_inMission', 40000);
    }
    // 滑动等待间隔
    if (!mStorage.contains('global_swipe_sleep_time')) {
        mStorage.put('global_swipe_sleep_time', 4500);
    }
    // 点击容错次数
    if (!mStorage.contains('global_click_count')) {
        mStorage.put('global_click_count', 2);
    }
}


/**
 * @description 检查是否有配置文件
 */
function check_config() {
    if (files.exists('/sdcard/Auto_Arknights/activity.json') && files.exists('/sdcard/Auto_Arknights/imgPath.json')) {
        check_config_update();
    } else {
        download_config('缺少配置文件');
    }
}



/**
 * @description 根据配置文件检查素材完整性
 */
function check_sucai() {
    // 判断配置文件是否存在
    if (files.exists('/sdcard/Auto_Arknights/imgPath.json')) {
        // 需要下载的列表
        var download_list = [];
        // 读取配置文件的数据
        var Json_Obj = JSON.parse(files.read('/sdcard/Auto_Arknights/imgPath.json'))
        Json_Obj = Json_Obj['data'];
        // 进度条dialog
        var dialog = dialogs.build({
            title: '正在检查素材完整性',
            content: '',
            negative: '取消',
            progress: {
                max: Object.keys(Json_Obj).length,
                shwoMinMax: true
            },
            canceledOnTouchOutside: false
        }).on('cancel', function(){
            threads.shutDownAll();
        }).show();
        // 遍历查找是否存在，不存在就加入下载列表
        var mthread = threads.start(function(){
            for (var i in Json_Obj) {
                if (!files.exists(Json_Obj[i]['device_path'])) {
                    download_list.push(Json_Obj[i]);
                }
                dialog.progress += 1;
            }
            console.log('缺失素材数量: %d  即将开始下载', download_list.length);
            toast('缺失素材数量: '+ download_list.length + '  即将开始下载');
            dialog.dismiss();
        });
        mthread.join();
        // 列表不空就开始下载
        if (download_list.length > 0) {
            download_dialog(download_list, '素材');
        } else {
            alert('检查完毕，没有缺失素材')
        }
    } else {
        download_config('缺少配置文件');
    }
}


/**
 * @description 连接服务器检查配置更新
 * @returns {boolean} 是否成功
 */
function check_config_update() {
    if (files.exists('/sdcard/Auto_Arknights/imgPath.json') && files.exists('/sdcard/Auto_Arknights/activity.json')){
        // 获取本地版本
        var local_version = {};
        var Json_Obj = JSON.parse(files.read('/sdcard/Auto_Arknights/activity.json'));
        local_version['activity'] = Json_Obj['version'];
        Json_Obj = JSON.parse(files.read('/sdcard/Auto_Arknights/imgPath.json'));
        local_version['imgPath'] = Json_Obj['version'];
        // 获取服务器版本
        var url = "http://norah1to.com:6363/getVersion";
        var res = http.post(url, {});
        if (res.statusCode == 200) {
            var server_version = JSON.parse(res.body.string());
            if (server_version['activity'] == local_version['activity'] && 
            server_version['imgPath'] == local_version['imgPath']) {
                alert('配置文件无需更新');
            }
            else {
                download_config('配置文件发现更新');
            }
            return true;
        } else {
            return false;
        }
    } else {
        download_config('配置文件缺失');
        return true;
    }
}


/**
 * @description 重新下载全部文件
 */
function re_download_all_files() {
    var mthread = threads.start(function(){
        if (files.removeDir('/sdcard/Auto_Arknights/mySucai')) {
            console.log('删除素材成功');
        }
        if (files.remove('/sdcard/Auto_Arknights/activity.json')) {
            console.log('删除activity.json成功');
        }
        if (files.remove('/sdcard/Auto_Arknights/imgPath.json')) {
            console.log('imgPath.json成功');
        }
        dialog_list_1 = [];
        dialog_list_1_value = {};
        dialog_list_2 = [];
        dialog_list_2_value = {};
        dialog_list_3 = [];
        dialog_list_3_value = {};
    });
    mthread.join();
    download_config('删除所有文件成功');
}


/**
 * @description 下载配置文件
 */
function download_config(title) {
    var info_list = [
        {
            'device_path': '/sdcard/Auto_Arknights/activity.json',
            'server_path': '/static/for_download/activity.json'
        },
        {
            'device_path': '/sdcard/Auto_Arknights/imgPath.json',
            'server_path': '/static/for_download/imgPath.json'
        }
    ];
    confirm_download_dialog(title, info_list, '配置文件');
}


/**
 * @description 配置文件下载的确认dialog
 * @param {string} title dialog的标题
 * @param {string} type 下载类型
 */
function confirm_download_dialog(title, info_list, type) {
    confirm(title, '是否下载？', function(value){
        if (value) {
            stopActivitys();
            download_dialog(info_list, type);
        } else {
            return false;
        }
    });
}


/**
 * @description 下载文件的通用dialog
 * @param {Object} info_list 多条路径信息对象
 * @param {string} type 下载类型
 */
function download_dialog(info_list, type) {
    var success = 0;
    var fail = 0;
    var dialog = dialogs.build({
        title: '正在下载' + type,
        content: '',
        negative: '取消',
        progress: {
            max: info_list.length,
            shwoMinMax: true
        },
        canceledOnTouchOutside: false
    }).on('cancel', function(){
        threads.shutDownAll();
    }).show();
    threads.start(function(){
        // 开启下载线程
        var download_thread = threads.start(function() {
            for (var i in info_list){
                if (download(info_list[i])) {
                    success++;
                } else {
                    fail++;
                }
                dialog.progress += 1;
            }
            dialog.dismiss();
            alert('下载完成, 成功' + success + '个, 失败' + fail + '个');
        });
        download_thread.join();
        // 检查素材
        check_sucai();
    })
}


/**
 * @description 通用的下载方法
 * @param {Object} info_obj 单条路径信息对象
 * @returns {boolean} 是否成功
 */
function download(info_obj, type) {
    var url = "http://norah1to.com:6363/download/?path=" + info_obj['server_path'];
    // 图片的话就用别的方法保存
    if (url.indexOf('.png') != -1) {
        var img = images.load(url);
        if (img != null) {
            console.log('读取图片成功');
            console.log('正在保存图片')
            // 判断路径是否存在
            if (!files.exists(info_obj['device_path'])) {
                console.log('正在创建文件');
                if (files.createWithDirs(info_obj['device_path'])) {
                } else {
                    return false;
                }
            }
            images.save(img, info_obj['device_path'], 'png', 100);
            console.log('图片保存完毕')
            return true;
        } else {
            console.log('读取不到图片');
            return false;
        }
    } else {
        var res = http.post(url, {});
        if (res.statusCode == 200) {
            var Json_str = res.body.string();
            // 判断路径是否存在
            if (!files.exists(info_obj['device_path'])) {
                console.log('正在创建文件');
                if (files.createWithDirs(info_obj['device_path'])) {
                } else {
                    return false;
                }
            }
            console.log("正在复写文件");
            files.write(info_obj['device_path'], Json_str);
            console.log('复写文件成功');
            return true;
        } else {
            return false
        }
    }
}





/*******************************************************************/
/*---------------------------初始化数据工作-------------------------*/
/*******************************************************************/


// 初始化事件列表
var items = [
];
ui.todoList.setDataSource(items);
ui.todoList.on('item_bind', function(itemView, itemHolder){
    itemView.on('click', function(){
        toast('长按可以删除');
    });
    itemView.on('long_click', function(){
        console.log(itemHolder.position);
        items.splice(itemHolder.position, 1);
    });
});

// 三个dialog列表选择
var dialog_list_1 = [];
var dialog_list_1_value = {};
var dialog_list_2 = [];
var dialog_list_2_value = {};
var dialog_list_3 = [];
var dialog_list_3_value = {};

// 预先载入json配置
var activity_Json = null;
init_activity_Json();



/**
 * @description 初始化activity_Json
 */
function init_activity_Json() {
    if (files.exists('/sdcard/Auto_Arknights/activity.json')) {
        if (activity_Json == null){
            activity_Json = JSON.parse(files.read('/sdcard/Auto_Arknights/activity.json'));
            console.log('事件配置载入成功');
        }
    } else {
        console.log('找不到事件配置！');
    }
}



/**
 * @description 初始化一个dialog中的列表
 * @param {list} info_list 配置文件中的数据对象列表
 * @param {string} dialog_list ui显示列表变量string
 * @param {string} dialog_value_list 真值列表变量string
 */
function init_dialog_list(info_list, dialog_list, dialog_value_list) {
    for (var i in info_list) {
        eval(dialog_list).push(info_list[i]['name']);
        eval(dialog_value_list)[info_list[i]['name']] = info_list[i]['value'];
    }
}


/**
 * @description 初始化第一个dialog列表
 */
function init_first_dialog_list() {
    var info_list = activity_Json['data'];
    init_dialog_list(info_list, 'dialog_list_1', 'dialog_list_1_value');
}


/**
 * @description 初始化第二个dialog列表
 */
function init_second_dialog_list() {
    var info_list = activity_Json['data'][dialog_list_1_value[ui.sp1.getText()]]['list'];
    init_dialog_list(info_list, 'dialog_list_2', 'dialog_list_2_value');
}


/**
 * @description 初始化第三个dialog的列表
 */
function init_third_dialog_list() {
    var info_list = activity_Json['data'][dialog_list_1_value[ui.sp1.getText()]]['list'][dialog_list_2_value[ui.sp2.getText()]]['list'];
    init_dialog_list(info_list, 'dialog_list_3', 'dialog_list_3_value');
}


// 初始化第一个dialog列表
if (files.exists('/sdcard/Auto_Arknights/activity.json')){
    init_first_dialog_list();
}

// 特殊状态
var activity_status = null;


/*******************************************************************/
/*---------------------------选择事件监听---------------------------*/
/*******************************************************************/

/**
 * @description dialog构造
 */

// part1 dialog
function build_dialog_1() {
    // 判断是否有配置文件且没有初始化过
    if (files.exists('/sdcard/Auto_Arknights/activity.json') && dialog_list_1.length == 0){
        init_activity_Json();
        init_first_dialog_list();
    }
    dialogs.build({
        items: dialog_list_1,
        itemsSelectMode: "select",
    }).on('item_select', (index, name)=>{
        ui.sp1.setText(name);
        // 重置其他选项
        ui.sp2.setText('SELECT 2');
        ui.sp3.setText('SELECT 3');
        dialog_list_2 = [];
        dialog_list_2_value = {};
        dialog_list_3 = [];
        dialog_list_3_value = {};
        init_second_dialog_list();
    }).show();
}
// part2 dialog
function build_dialog_2() {
    dialogs.build({
        items: dialog_list_2,
        itemsSelectMode: "select",
    }).on('item_select', (index, name)=>{
        ui.sp2.setText(name);
        // 重置其他选项
        ui.sp3.setText('SELECT 3');
        dialog_list_3 = [];
        dialog_list_3_value = {};
        // 给下一个选项赋予对应的子列表
        // 判断剿灭特殊情况
        if (ui.sp1.getText() === '剿灭作战') {
            ui.sp3.setText('无');
            return;
        }
        init_third_dialog_list();
    }).show();
}
// part3 dialog
function build_dialog_3() {
    dialogs.build(({
        items: dialog_list_3,
        itemsSelectMode: 'select',
    })).on('item_select', (index, name)=>{
        ui.sp3.setText(name);
    }).show();
}
// count dialog
function build_count_dialog() {
    dialogs.build(({
        title: '次数',
        inputHint: '次数'
    })).on('input', (input)=>{
        ui.sp4.setText(input);
    }).show();
}


/**
 * @description 更换特殊状态
 * @param {string} status
 */
function changeActivityStatus(status) {
    activity_status = status;
}


/**
 * @description 包装真值，用于区分活动特殊情况
 * @param {string} value
 * @param {string} status
 * @returns {string} 包装好的值
 */
function PackValue(value) {
    if (activity_status == null) {
        return value;
    }
    return value + '_' + activity_status;
}

/**
 * @description 获取当前设置值添加到事件列表
 */
function add_item() {
    items.push({
        'part1': ui.sp1.getText(),
        'part2': PackValue(ui.sp2.getText()),
        'part3': ui.sp3.getText(),
        'count': ui.sp4.getText(),
        'part1_value': dialog_list_1_value[ui.sp1.getText()],
        'part2_value': PackValue(dialog_list_2_value[ui.sp2.getText()]),
        'part3_value': dialog_list_3_value[ui.sp3.getText()],
        'count_value': parseInt(ui.sp4.getText())
    });
    console.log(
        "part1_value:"+dialog_list_1_value[ui.sp1.getText()] + '\n' +
        "part2_value:"+dialog_list_2_value[ui.sp2.getText()] + '\n' +
        "part3_value:"+dialog_list_3_value[ui.sp3.getText()] + '\n'
    )
}



/*******************************************************************/
/*---------------------------事件打包逻辑---------------------------*/
/*******************************************************************/



/**
 * @description 开始执行事件
 * @returns {boolean} 是否执行成功
 */
function startActivitys() {
    // 第一次进来先让他们看看协议嗷
    var mStorage = storages.create('settings');
    if (!mStorage.contains('first')) {
        mStorage.put('first', 'first');
        alert(
            '使用本软件意味着你接受以下协议：\n' + 
            '1：本软件仅供交流学习，造成的损失作者概不负责\n' +
            '2: 软件下载后必须24小时内删除\n' +
            '3: 本软件为开源项目，不得魔改后商用发布(非商业可以)'
        )
    }
    toast('事件开始');
    // 事件列表不能为空
    if (items.length < 1) {
        return false;
    }
    // 请求截图权限并设置截图方向
    var setScreenThread = threads.start(function() {
        if (!requestScreenCapture(true)) {
            console.log("请求截图失败");
            exit();
        }
    })
    // 开启子线程防止ui线程阻塞
    threads.start(function() {
        // 等待请求截图权限
        setScreenThread.join();
        // 遍历事件列表进行事件
        for (var index in items) {
            // 开始事件
            var mThread =  threads.start(function() {
                console.log(items[index].part3_value);
                action.start(items[index]);
            })
            // 等待事件结束
            mThread.join();
        }
        alert('任务完成');
    })
}


/**
 * @description 停止正在执行的事件
 */
function stopActivitys() {
    threads.shutDownAll();
    toast('停止所有事件');
}




/*******************************************************************/
/*---------------------------点击事件监听---------------------------*/
/*******************************************************************/


// 三个选择按钮的点击监听
ui.sp1.on('click', build_dialog_1);
ui.sp2.on('click', build_dialog_2);
ui.sp3.on('click', build_dialog_3);
ui.sp4.on('click', build_count_dialog);
// 活动勾选框
ui.isAllClear.on('click', function(){
    if (ui.isAllClear.checked) {
        changeActivityStatus('allclear');
    } else {
        changeActivityStatus(null);
    }
});
// 添加事件按钮点击监听
ui.addButton.on('click', add_item);
// 事件执行相关按钮
ui.startButton.on('click', startActivitys);
ui.stopButton.on('click', stopActivitys);
events.on('key', function(keyCode, event){
    if (keyCode == keys.volume_up) {
        stopActivitys();
    }
});


