// Adapter for 小钢炮
exports.小钢炮 = null;
try{
    function findBlockByNames(names){
        try{ var blocks = Vars.content.blocks(); for(var i=0;i<blocks.size;i++){ var b = blocks.get(i); for(var j=0;j<names.length;j++){ var n = names[j]; if(!n) continue; if(b.name === n) return b; if(b.localizedName && b.localizedName === n) return b; } } }catch(e){}
        return null;
    }
    var candidates = ["太阳系模组-小钢炮","小钢炮","ssm-小钢炮"];
    function init(){ try{ var existing = findBlockByNames(candidates); if(existing){ exports.小钢炮 = existing; print("小钢炮: 使用已注册的方块对象："+(existing.name||existing.localizedName)); } else { exports.小钢炮 = null; print("小钢炮: 未在内容中找到已注册方块，导出为 null（避免重复注册）"); } }catch(e){ print("小钢炮 init 异常: "+e); } }
    if(typeof ClientLoadEvent !== 'undefined' && typeof Events !== 'undefined'){ Events.on(ClientLoadEvent, init); } else init();
}catch(err){ print("小钢炮加载失败: "+err); }