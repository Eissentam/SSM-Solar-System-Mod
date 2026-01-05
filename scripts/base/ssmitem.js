// Solar System Mod (SSM)
try{
const SSMItemsModule = (function() {
    'use strict';
    
    const itemsRegistry = {};
    
    function registerSSMItem(config) {
        // 手动构建配置对象
        var itemConfig = {
            localizedName: config.name,
            description: config.description,
            cost: config.cost || 1,
            color: Color.valueOf(config.color),
            alwaysUnlocked: config.alwaysUnlocked || false,
            hardness: config.hardness || 1,
            radioactivity: config.radioactivity || 0,
            explosiveness: config.explosiveness || 0,
            flammability: config.flammability || 0
        };
        
        var SSMItem = extend(Item, config.name, itemConfig);
        
        itemsRegistry[config.name] = SSMItem;
        return SSMItem;
    }
    
    // 初始化所有SSM物品
    function initSSMItems() {
        // 银
        registerSSMItem({
            name: "银",
            description: "一种常见的金属元素",
            cost: 1,
            color: "B0B9C0FF",
            alwaysUnlocked: false,
            hardness: 1
        });
        
        // 稀土
        registerSSMItem({
            name: "稀土",
            description: "稀土(Rare Earth),是化学周期表中镧系元素和钪、钇共十七种金属元素的总称",
            cost: 1,
            color: "414548FF",
            radioactivity: 2
        });
        
        // 熔岩矿
        registerSSMItem({
            name: "熔岩矿",
            description: "拥有超高温度的岩浆块",
            cost: 1,
            color: "FF9448FF",
            flammability: 1
        });
        
        // 锂
        registerSSMItem({
            name: "锂",
            description: "用于原子反应堆、制轻合金及电池等",
            cost: 1,
            color: "C8C8C8FF"
        });
        
        // 土钢
        registerSSMItem({
            name: "土钢",
            description: "火星上的新元素，经过多种矿物一起加工后得到精炼钢，用途广泛。",
            cost: 1,
            color: "EC9532FF",
            hardness: 2
        });
    }
    
    // 执行初始化
    initSSMItems();
    
    return itemsRegistry;
})();
    print("Item加载成功")
}catch(err){
    print("Item加载失败"+err);
}