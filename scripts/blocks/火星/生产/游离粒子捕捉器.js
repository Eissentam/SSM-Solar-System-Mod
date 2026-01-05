// Adapter for 游离粒子捕捉器
exports.游离粒子捕捉器 = null;
try{
    function findBlockByNames(names){
        try{ var blocks = Vars.content.blocks(); for(var i=0;i<blocks.size;i++){ var b = blocks.get(i); for(var j=0;j<names.length;j++){ var n = names[j]; if(!n) continue; if(b.name === n) return b; if(b.localizedName && b.localizedName === n) return b; } } }catch(e){}
        return null;
    }
    var candidates = ["太阳系模组-游离粒子捕捉器","游离粒子捕捉器","ssm-游离粒子捕捉器"];
    function init(){ try{ var existing = findBlockByNames(candidates); if(existing){ exports.游离粒子捕捉器 = existing; print("游离粒子捕捉器: 使用已注册的方块对象："+(existing.name||existing.localizedName)); } else { exports.游离粒子捕捉器 = null; print("游离粒子捕捉器: 未在内容中找到已注册方块，导出为 null（避免重复注册）"); } }catch(e){ print("游离粒子捕捉器 init 异常: "+e); } }
    if(typeof ClientLoadEvent !== 'undefined' && typeof Events !== 'undefined'){ Events.on(ClientLoadEvent, init); } else init();
}catch(err){ print("游离粒子捕捉器加载失败: "+err); }