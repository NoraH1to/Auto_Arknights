"ui";
ui.layout(
    <frame>
        <appbar h="auto">
            <toolbar id='toolbar' textSize="24sp" title="设置です"/>
        </appbar>
        <scroll marginTop="56">
            <vertical padding="16">
                <text marginTop="8" textSize="16sp" text="全局间隔操作(毫秒) *推荐>1000："/>
                <input hint='单位:毫秒' id="global_sleep_time"/>
                <text marginTop="8" textSize="16sp" text="检测是否完成关卡的间隔(毫秒) *推荐>30000："/>
                <input hint='单位:毫秒' id="global_sleep_time_inMission"/>
                <text marginTop="8" textSize="16sp" text="滑动等待间隔(毫秒) *推荐>4000："/>
                <input hint='单位:毫秒' id="global_swipe_sleep_time"/>
                <text marginTop="8" textSize="16sp" text="点击容错次数(次数) *推荐>2："/>
                <input hint='单位:次数' id="global_click_count"/>
                <button text="保存" marginTop="16" id="save" style="Widget.AppCompat.Button.Colored"></button>
            </vertical>
        </scroll>
    </frame>
);


/*******************************************************************/
/*------------------------全局设置参数------------------------------*/
/*******************************************************************/


var mStorage = storages.create('settings');
init_text();


/**
 * @description 把设置数据显示出来
 */
function init_text() {
    console.log(mStorage.get('global_sleep_time'));
    console.log(mStorage.get('global_sleep_time_inMission'));
    console.log(mStorage.get('global_swipe_sleep_time'));
    console.log(mStorage.get('global_click_count'));
    // 全局操作间隔
    if (mStorage.contains('global_sleep_time')) {
        ui.global_sleep_time.setText(mStorage.get('global_sleep_time') + '');
    }
    // 关卡内检测是否完成的间隔
    if (mStorage.contains('global_sleep_time_inMission')) {
        ui.global_sleep_time_inMission.setText(mStorage.get('global_sleep_time_inMission') + '');
    }
    // 滑动等待间隔
    if (mStorage.contains('global_swipe_sleep_time')) {
        ui.global_swipe_sleep_time.setText(mStorage.get('global_swipe_sleep_time') + '');
    }
    // 点击容错次数
    if (mStorage.contains('global_click_count')) {
        ui.global_click_count.setText(mStorage.get('global_click_count') + '');
    }
}


/**
 * @description 保存设置
 */
function save_settings() {
    // 全局操作间隔
    mStorage.put('global_sleep_time', parseInt(ui.global_sleep_time.getText()));
    // 关卡内检测是否完成的间隔
    mStorage.put('global_sleep_time_inMission', parseInt(ui.global_sleep_time_inMission.getText()));
    // 滑动等待间隔
    mStorage.put('global_swipe_sleep_time', parseInt(ui.global_swipe_sleep_time.getText()));
    // 点击容错次数
    mStorage.put('global_click_count', parseInt(ui.global_click_count.getText()));
    toast('保存成功');
    exit();
}

// 监听按钮点击保存设置
ui.save.on('click', save_settings);
