// Adapter for 探照灯
exports.探照灯 = null;
try{
    function findBlockByNames(names){
        try{ var blocks = Vars.content.blocks(); for(var i=0;i<blocks.size;i++){ var b = blocks.get(i); for(var j=0;j<names.length;j++){ var n = names[j]; if(!n) continue; if(b.name === n) return b; if(b.localizedName && b.localizedName === n) return b; } } }catch(e){}
        return null;
    }
    var candidates = ["太阳系模组-探照灯","探照灯","ssm-探照灯"];
    function init(){ try{ var existing = findBlockByNames(candidates); if(existing){ exports.探照灯 = existing; print("探照灯: 使用已注册的方块对象："+(existing.name||existing.localizedName)); } else { exports.探照灯 = null; print("探照灯: 未在内容中找到已注册方块，导出为 null（避免重复注册）"); } }catch(e){ print("探照灯 init 异常: "+e); } }
    if(typeof ClientLoadEvent !== 'undefined' && typeof Events !== 'undefined'){ Events.on(ClientLoadEvent, init); } else init();
}catch(err){ print("探照灯加载失败: "+err); }