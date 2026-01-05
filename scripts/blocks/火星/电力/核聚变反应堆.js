// Adapter for 核聚变反应堆
exports.核聚变反应堆 = null;
try{
    function findBlockByNames(names){
        try{ var blocks = Vars.content.blocks(); for(var i=0;i<blocks.size;i++){ var b = blocks.get(i); for(var j=0;j<names.length;j++){ var n = names[j]; if(!n) continue; if(b.name === n) return b; if(b.localizedName && b.localizedName === n) return b; } } }catch(e){}
        return null;
    }
    var candidates = ["太阳系模组-核聚变反应堆","核聚变反应堆","ssm-核聚变反应堆"];
    function init(){ try{ var existing = findBlockByNames(candidates); if(existing){ exports.核聚变反应堆 = existing; print("核聚变反应堆: 使用已注册的方块对象："+(existing.name||existing.localizedName)); } else { exports.核聚变反应堆 = null; print("核聚变反应堆: 未在内容中找到已注册方块，导出为 null（避免重复注册）"); } }catch(e){ print("核聚变反应堆 init 异常: "+e); } }
    if(typeof ClientLoadEvent !== 'undefined' && typeof Events !== 'undefined'){ Events.on(ClientLoadEvent, init); } else init();
}catch(err){ print("核聚变反应堆加载失败: "+err); }