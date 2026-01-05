try {
    const mars = require("planet/mars");
    const MarsBlocks = require("mars-resources");

    // 延迟构建：在 ClientLoadEvent 时或回退为立即执行
    function buildMarsTech(){
        try {
            var TT = (typeof TechTree !== "undefined") ? TechTree : (typeof Java !== "undefined" ? Java.type("mindustry.content.TechTree") : null);
            if (!TT) throw "无法获取 TechTree。";

            // Helper: find block by mod+name or name, fallback to provided export
            function findBlock(modName, name, fallback){
                try{
                    if(typeof Java !== "undefined"){
                        var ContentType = Java.type("mindustry.ctype.ContentType");
                        var b = Vars.content.getByName(ContentType.block, modName + "-" + name);
                        if(b) return b;
                        b = Vars.content.getByName(ContentType.block, name);
                        if(b) return b;
                    }
                }catch(e){}

                try{
                    var blocks = Vars.content.blocks();
                    for(var i=0;i<blocks.size;i++){
                        var b = blocks.get(i);
                        if(!b) continue;
                        if(b.name === (modName + "-" + name) || b.name === name) return b;
                        if(b.localizedName && b.localizedName === name) return b;
                    }
                }catch(e){}

                return fallback || null;
            }

            var javaContent = findBlock("太阳系模组", "远征一号", (typeof MarsBlocks !== "undefined"?MarsBlocks.远征一号:undefined));
            // Helper: determine if an object is an UnlockableContent / Block
            function isUnlockable(v){
                try{
                    if(v==null) return false;
                    if(typeof Java !== "undefined"){
                        var UC = Java.type("mindustry.ctype.UnlockableContent");
                        try{ if(typeof UC.isInstance === "function") return UC.isInstance(v); }catch(e){}
                        try{ if(UC.class && typeof UC.class.isInstance === "function") return UC.class.isInstance(v); }catch(e){}
                    }
                }catch(e){}
                try{
                    if(typeof v === "object"){
                        // broader heuristic: common properties for blocks/units/items
                        if(v.name || v.localizedName) return true;
                        if(v.build || v.requirements || v.research) return true;
                        if(v.size || v.buildCost || v.health || v.outputs || v.itemCapacity) return true;
                    }
                }catch(e){}
                return false;
            }
            if(!javaContent){
                print("未能找到远征一号方块，尝试列出可能的候选项（localizedName 中包含 '远征' 的方块）：");
                try{ Vars.content.blocks().each(function(b){ if(b && b.localizedName && String(b.localizedName).indexOf("远征")>-1) print((b.name||b.__name||"unknown")+" / "+b.localizedName); }); }catch(e){}
                throw "未能找到远征一号方块。";
            }


            var steelDrill = findBlock("太阳系模组", "热力钻头", MarsBlocks.热力钻头);
            var refinery = findBlock("太阳系模组", "精炼钢厂", MarsBlocks.精炼钢厂);
            var particleTrap = findBlock("太阳系模组", "游离粒子捕捉器", MarsBlocks.游离粒子捕捉器);
            var solar = findBlock("太阳系模组", "太阳能板", MarsBlocks.太阳能板);
            var microwave = findBlock("太阳系模组", "微波发电机", MarsBlocks.微波发电机);
            var fusion = findBlock("太阳系模组", "核聚变反应堆", MarsBlocks.核聚变反应堆);
            var conveyor = findBlock("太阳系模组", "土钢传送带", MarsBlocks.土钢传送带);
            var router = findBlock("太阳系模组", "土钢路由器", MarsBlocks.土钢路由器);
            var wall = findBlock("太阳系模组", "土钢墙", MarsBlocks.土钢墙);
            var cannon = findBlock("太阳系模组", "小钢炮", MarsBlocks.小钢炮);

            mars.techTree = TT.nodeRoot("火星科技", javaContent, false, function () {
                if(isUnlockable(steelDrill)){
                    TT.nodeProduce(steelDrill, function(){});
                }else{ print("跳过：steelDrill 不是 UnlockableContent -> "+(steelDrill? (steelDrill.getClass?steelDrill.getClass().getName():typeof steelDrill):"null")); }

                if(isUnlockable(refinery)){
                    TT.nodeProduce(refinery, function(){ if(isUnlockable(particleTrap)) TT.nodeProduce(particleTrap, function(){}); });
                }else{ print("跳过：refinery 不是 UnlockableContent -> "+(refinery? (refinery.getClass?refinery.getClass().getName():typeof refinery):"null")); }

                if(isUnlockable(solar)){
                    TT.nodeProduce(solar, function(){ if(isUnlockable(microwave)) TT.nodeProduce(microwave, function(){ if(isUnlockable(fusion)) TT.nodeProduce(fusion, function(){}); }); });
                }else{ print("跳过：solar 不是 UnlockableContent -> "+(solar? (solar.getClass?solar.getClass().getName():typeof solar):"null")); }

                if(isUnlockable(conveyor)){
                    TT.nodeProduce(conveyor, function(){ if(isUnlockable(router)) TT.nodeProduce(router, function(){ if(isUnlockable(wall)) TT.nodeProduce(wall, function(){ if(isUnlockable(cannon)) TT.nodeProduce(cannon, function(){}); }); }); });
                }else{ print("跳过：conveyor 不是 UnlockableContent -> "+(conveyor? (conveyor.getClass?conveyor.getClass().getName():typeof conveyor):"null")); }
            });

        } catch (e) {
            print("火星科技树构建异常: " + e);
        }
    }

    if(typeof ClientLoadEvent !== 'undefined' && typeof Events !== 'undefined'){
        Events.on(ClientLoadEvent, buildMarsTech);
    } else {
        try{ buildMarsTech(); }catch(e){}
    }

    exports.marsTechTree = mars.techTree;
} catch (err) {
    print("火星模块加载失败: " + err);
}
