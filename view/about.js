"ui";
ui.layout(
    <frame>
        <appbar h="auto">
            <toolbar id='toolbar' textSize="24sp" title="关于です"/>
        </appbar>
        <scroll gravity="center" marginTop="56">
            <vertical gravity="center" w="*">
                <img radius="90" scaleType="centerCrop" h="128" w="128" src="http://norah1to.com:6363/download/?path=/static/images/ku_an.jpg"></img>
                <horizontal marginTop="24" gravity="center">
                    <text textSize="24" gravity="center" text="酷安:"/>
                    <text textSize="24" id="kuan" textStyle="bold" gravity="center" textColor="#1E90FF" text="  @野良人"/>
                </horizontal>
                <horizontal marginTop="24" gravity="center">
                    <text textSize="24" gravity="center" text="QQ:"/>
                    <text textSize="24" id="kuan" textStyle="bold" gravity="center"  text="  834053207"/>
                </horizontal>
                <horizontal marginTop="24" gravity="center">
                    <text id="github" textSize="24" textColor="#1E90FF" gravity="center" text="Github项目跳转"/>
                </horizontal>
            </vertical>
        </scroll>
    </frame>
);

// 监听点击跳转
ui.kuan.click(function(){
    console.log('跳转酷安');
    app.openUrl('http://www.coolapk.com/u/494291');
});
ui.github.click(function(){
    console.log('跳转github');
    app.openUrl('https://github.com/SterbenJ/Auto_Arknights');
});