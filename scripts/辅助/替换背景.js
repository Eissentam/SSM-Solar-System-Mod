importPackage(Packages.mindustry.graphics)

Events.on(EventType.ClientLoadEvent, () => {
const loadren = extend(MenuRenderer, {
    render(){
        Draw.rect(Core.atlas.find("太阳系模组-aa"), Core.graphics.getWidth() / 2, Core.graphics.getHeight() / 2, 2500, 1200);
    }
})

function Class(id) {
	return Seq([id]).get(0)
}

var fi = Class(MenuFragment).getDeclaredField("renderer");
fi.setAccessible(true);
fi.set(Vars.ui.menufrag, loadren);
})