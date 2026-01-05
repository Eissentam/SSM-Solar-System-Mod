try{

    MapResizeDialog.minSize = 1.5;
    MapResizeDialog.maxSize = 6.5;
    require('辅助/超代核心');
    require('辅助/远征一号');
    require('辅助/前哨核心');
    require('辅助/时间控制');
    require('辅助/缩放强化');
    require('辅助/材料颜色');
    //require('辅助/替换背景');
    require('辅助/资源显示');
    require("blocks/远征一号");
    require("base/ssmitem");
    require("planet/mars");
    require("planet/earth");
    require("marstechTree");
    
    Events.on(ClientLoadEvent, cons(e => {
    var dialog = new BaseDialog("[yellow]太阳系模组信息栏");
    dialog.cont.image(Core.atlas.find("太阳系模组-logo")).row();;
    dialog.buttons.defaults().size(210, 64);
    dialog.buttons.button("@close", run(() => {
        dialog.hide();
    })).size(210, 64);
    dialog.cont.pane((() => {
        var table = new Table();   
         table.add("[yellow]欢迎游玩本模组 \n本模组英文名为Solar System Mod,简称SSM\n[blue]本模组由Eissentam（代码/决定永久停更（会死灰复燃吗?）），睿智梓菜（编剧/总策划//已退出工作室），小马哥（贴图//已退出工作室）钍糯米（贴图/已退出工作室）大饭猫猫（测试/已退出工作室）小初（贴图/已退出工作室）小朱哥（策划//已退出工作室），共同开发，\n[red]模组开发初期就只有Eissentam一人负责脚本和贴图（纯纯电子垃圾）如觉侮眼，请另玩高模\n[red]本模组因在开发初期时借鉴了饱和火力部分贴图和Json如觉不妥请联系删除或修改\n[grey]／／实际上都是用的弃用贴图\n最后一次更新时间：25/2/2023 \n [blue]模组QQ群:[green]774757128\n下滑还有剧情\n背景音乐分别为：［Fallback］friskmegalovania（决意）（bysiroa）\nxpart/xpart2\n   JasonHuang-冬之花（交响乐版shortver）\n\n[blue]更新日志可以在模组简介里查看").left().growX().wrap().width(600).maxWidth(1000).pad(4).labelAlign(Align.left);
        table.row();
table.button("[yellow]工作室招收", run(() => {
    var dialog2 = new BaseDialog("[yellow]招收各路大佬");
    var table = new Table();
    dialog2.cont.image(Core.atlas.find("太阳系模组-二维码")).row();;
    dialog2.buttons.defaults().size(210, 64);
    dialog2.buttons.button("@close", run(() => {
        dialog2.hide();
    })).size(210, 64);
       dialog2.show();
    })).size(210, 64).row();
table.button("[red]关于火星剧情", run(() => {
    var dialog2 = new BaseDialog("[red]剧情介绍");
    var table = new Table();
	
	var t = new Table();
	t.add("[red]剧情正在开发（招策划中）");
    dialog2.cont.add(new ScrollPane(t)).size(500, 900).row();
    dialog2.buttons.defaults().size(210, 64);
    dialog2.buttons.button("@close", run(() => {
        dialog2.hide();
    })).size(210, 64);
       dialog2.show();
    })).size(210, 64);
    table.button("[red]小[yellow]彩[blue]蛋", run(() => {
   var dialog2 = new BaseDialog("114514");
   var table = new Table();
   var e = new Table();
   e.add("-CH₃这是甲基\n-CH₂CH₃这是乙基\n-C叮咚 这是叮咚基");
   dialog2.cont.add(new ScrollPane(e)).size(500, 900).row();
    dialog2.buttons.defaults().size(210, 64);
   dialog2.buttons.button("@close", run(() => {
        dialog2.hide();
    })).size(210, 64);
       dialog2.show();
    })).size(210, 64);
    return table;
    
    })()).grow().center().maxWidth(620);
    dialog.show();
}));

} catch (err) {
    print("致命错误！主函数加载失败！: " + err +"请确认不是自身mod冲突后，再联系开发者修复");
}
