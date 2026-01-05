try{
    // 优先尝试在已注册内容中查找单位，避免与 JSON 重复注册
    function findUnitByNames(names){
        try{
            var units = Vars.content.units();
            for(var i=0;i<units.size;i++){
                var u = units.get(i);
                for(var j=0;j<names.length;j++){
                    var n = names[j];
                    if(!n) continue;
                    if(u.name === n) return u;
                    if(u.localizedName && u.localizedName === n) return u;
                }
            }
        }catch(e){}
        return null;
    }

    var candidates = ["delta","德尔塔","德爾塔"];
    var existing = findUnitByNames(candidates);
    if(existing){
        exports.德尔塔 = existing;
        print("德尔塔: 使用已注册的单位对象：" + (existing.name || existing.localizedName));
    } else {
        const MarsResources = require("mars-resources");

        const 德尔塔 = extend(FlyingUnit, "delta", {
            speed: 2.4,
            drag: 0.1,
            accel: 0.05,
            rotateSpeed: 6,
            hitSize: 6,
            ammoCapacity: 400,
            flying: true,
            canHeal: true,
            itemCapacity: 40,
            buildSpeed: 1.5,
            mineSpeed: 1.2,
            mineTier: 6,
            health: 600,
            faceTarget: false,
            armor: 5,
            alternate: false,
            ammoType: (MarsResources && MarsResources.熔岩矿) || Items.blastCompound,

            isCounted: false,
            alwaysUnlocked: true,
            logicControllable: false,

            init(){ this.super$init(); },
            draw(){ this.super$draw(); },
            update(){ this.super$update(); },
            killed(){ this.super$killed(); Fx.unitExplosion.at(this.x, this.y); },
            controlled(){ this.super$controlled(); },
            released(){ this.super$released(); }
        });

        德尔塔.localizedName = "德尔塔";
        德尔塔.description = "保护远征一号核心的专用防御单位";

        德尔塔.abilities.add(new ForceFieldAbility({
            reload: 10, radius: 20, angle: 280, width: 15, max: 8000, regen: 50, cooldown: 100, angleOffset: 270
        }));

        德尔塔.weapons.add(new Weapon("蓝瑟1", {
            reload: 25, x: 0, y: -5, rotate: true, mirror: false, rotateSpeed: 9, shootSound: Sounds.railgun,
            bullet: extend(LaserBulletType, { collidesAir: true, damage: 95, speed: 0, lifetime: 24, smokeEffect: Fx.none, width: 6, length: 250, hitEffect: Fx.explosion, despawnEffect: Fx.none, colors: [Color.valueOf("E98E4250"), Color.valueOf("E98E42FF"), Color.valueOf("E98E4260")] })
        }));

        exports.德尔塔 = 德尔塔;
    }
} catch(err){
    print("德尔塔 加载失败: " + err);
}