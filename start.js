"ui";
ui.layout(
    <frame>
        <appbar h="auto">
            <toolbar id='toolbar' textSize="24sp" title="Auto_Arknights"/>
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
    menu.add('更新日志');
    menu.add('注意事项');
    menu.add('疑难杂症');
    menu.add('关于');
});
// 菜单监听
ui.emitter.on('options_item_selected', (e, item)=>{
    switch(item.getTitle()){
        case '更新日志':
            update_log();
            break;
        case '注意事项':
            notice();
            break;
        case '疑难杂症':
            question();
            break;
        case '关于':
            about();
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

// 初始化动作类
var action = null;
// root权限申请
var ra = null;
// threads.start(function() {
//     ra = new RootAutomator();
// });
// TODO: root的api问题过多，暂时不用，等autojs作者更新完善

// 监听回到应用时有无无障碍
ui.emitter.on("resume", function() {
    ui.autoService.checked = auto.service != null;
    events.observeKey();
    // 引入动作类
    if (action == null) {
        action = require('./action.js');
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
/*---------------------------初始化数据工作-------------------------*/
/*******************************************************************/


/**
 * @description 更新日志
 */
function update_log() {
    alert(
        '\n1.3.1:'+
        '\n * 现在可以自律高收益主线关卡了'+
        '\n * 提高了识别准确度'+
        '\n'+
        '\n1.2.0:'+
        '\n * 砍掉了root运行方式（问题太多不好使）'+
        '\n * 可以定义一个关卡的次数，提高效率'+
        '\n'+
        '\n1.1.0:'+
        '\n * 优化判断逻辑，减少失误率'+
        '\n * 图片改为动态加载，减少崩溃概率'+
        '\n'+
        '\n1.0.1:'+
        '\n * 更新了活动素材'+
        '\n'+
        '\n1.0.0:'+
        '\n * 第一版'
    );
}


/**
 * @description 注意事项
 */
function notice() {
    alert(
        '1、必须开启无障碍服务'+
        '\n2、除了剿灭外必须三个选项选满'+
        '\n3、音量上键可以停止所有操作'+
        '\n4、本软件仅供交流学习，任何使用本软件产生的损失作者概不负责'+
        '\n5、因为有些关卡图片长得太像（比如CE-1、2、3、4、5），推荐直接选收益最高的不容易识别错'+
        '\n6、关卡必须至少手动代理一次才能识别到（因为代理过一次后的图标不同了）'
    );
}


/**
 * @description 疑难杂症
 */
function question() {
    alert(
        'Q：一直提示\"请进入作战页面\"？'+
        '\nA：请切换到游戏主界面点击\"作战\"按钮后的那个界面，这个界面脚本才会开始运行。若还是不行，请彻底杀死脚本进程，重新开关脚本的无障碍服务，这是auto.js的bug\n'+
        '\nQ：没有反应？'+
        '\nA：目前已知flyme会出现各种用不了的情况，我也不知道为啥，其他手机请多次尝试\n'+
        '\n其他问题请酷安私信 @野良人，或者加下关于中的QQ反馈'
    );
}


/**
 * @description 关于
 */
function about() {
    alert(
        '酷安 @野良人'+
        '\n QQ 834053207'+
        '\n 破群 512249283'
    )
}

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

// 引入各种事件的类
var activity = require('./activity.js');

// 三个dialog列表选择
var dialog_list_1 = [];
var dialog_list_1_value = {}
var dialog_list_2 = [];
var dialog_list_2_value = {};
var dialog_list_3 = [];
var dialog_list_3_value = {};

// 初始化第一个dialog列表
for (var value in activity.dict) {
    dialog_list_1.push(activity.dict[value].name);
    dialog_list_1_value[activity.dict[value].name] = activity.dict[value].value;
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
        // 给下一个选项赋予对应的子列表
        for (var value in activity.dict[dialog_list_1_value[name]].list) {
            dialog_list_2.push(activity.dict[dialog_list_1_value[name]].list[value].name)
            dialog_list_2_value[activity.dict[dialog_list_1_value[name]].list[value].name] = activity.dict[dialog_list_1_value[name]].list[value].value;
        }
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
        if (ui.sp1.getText() === '剿灭作战') {
            ui.sp3.setText('无');
            return;
        }
        for (var value of activity.dict[dialog_list_1_value[ui.sp1.getText()]].list[dialog_list_2_value[name]].list) {
            dialog_list_3.push(value)
            dialog_list_3_value[value] = value;
        }
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
                action.start(items[index], !(ra == null));
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
events.onKeyDown('volume_up', stopActivitys);




