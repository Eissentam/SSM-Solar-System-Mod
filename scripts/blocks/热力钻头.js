// 默认导出为 null，内容加载完成后再设置真实引用
exports.热力钻头 = null;

try{
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

    var candidates = ["太阳系模组-热力钻头", "热力钻头", "ssm-热力钻头"];

    function init(){
        try{
            var existing = findBlockByNames(candidates);
            if(existing){
                exports.热力钻头 = existing;
                print("热力钻头: 使用已注册的方块对象：" + (existing.name || existing.localizedName));
            } else {
                exports.热力钻头 = null;
                print("热力钻头: 未在内容中找到已注册方块，导出为 null（避免重复注册）");
            }
        }catch(e){ print("热力钻头 init 异常: "+e); }
    }

    if(typeof ClientLoadEvent !== 'undefined' && typeof Events !== 'undefined'){
        Events.on(ClientLoadEvent, init);
    } else {
        // Fallback: 尝试立即初始化（某些环境如 desktop.jar 会立即可用）
        init();
    }

} catch (err) {
    print("热力钻头加载失败: " + err);
}
