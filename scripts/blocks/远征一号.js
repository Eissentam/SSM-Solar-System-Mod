try{
    // 安全查找已注册的方块，不使用 Java.type（兼容 F8 控制台环境）
    function findBlockByNames(names){
        try{
            var blocks = Vars.content.blocks();
            for(var i=0;i<blocks.size;i++){
                var b = blocks.get(i);
                for(var j=0;j<names.length;j++){
                    var n = names[j];
                    if(!n) continue;
                    if(b.name === n) return b;
                    if(b.localizedName && b.localizedName === n) return b;
                }
            }
        }catch(e){ /* ignore */ }
        return null;
    }

    var candidates = ["太阳系模组-远征一号", "远征一号", "ssm-远征一号"];
    // 默认导出为 null，内容加载完成后再设置真实引用
    exports.远征一号 = null;

    function init(){
        try{
            var existing = findBlockByNames(candidates);
            if(existing){
                exports.远征一号 = existing;
                print("远征一号: 使用已注册的方块对象：" + (existing.name || existing.localizedName));
            } else {
                exports.远征一号 = null;
                print("远征一号: 未在内容中找到已注册方块，导出为 null（避免重复注册）");
            }
        }catch(e){ print("远征一号 init 异常: "+e); }
    }

    if(typeof ClientLoadEvent !== 'undefined' && typeof Events !== 'undefined'){
        Events.on(ClientLoadEvent, init);
    } else {
        init();
    }
} catch (err) {
    print("远征一号加载失败: " + err);
}
