//原作者miner
Events.on(ClientLoadEvent, e => {
    Vars.ui.hudGroup.fill(null, table => {
        table.table(null, t => setup(t)).width(240);
        
        table.bottom().left().update(() => {
            let height = 0;
            Vars.control.input.uiGroup.getChildren().each(e => {
                height += e.visible ? e.getPrefHeight() : 0;
            })
            table.translation.set(0, height);
        });
    });
});

function setup(table){
    table.background(Styles.black6);
    
    setupSpeedTable(table);
}

function setupSpeedTable(table){
    let slider = new Slider(-4, 4, 1, false);
    let label = new FLabel("");
    
    let colorSpeedUp = Color.valueOf("ffd59e");
    let colorSpeedDown = Color.valueOf("99ffff");
    
    slider.moved(value => {
        let speed = Math.pow(2, value);
        Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * speed, 3 * speed));
        
        let {text, color} = getTextParams(value);
        label.restart(text);
        label.setColor(color)
    });
    
    slider.setValue(0);
    
    table.add(label).width(64);
    
    table.button(Icon.refresh, Styles.clearNonei, 24, () => {
        slider.setValue(0);
    }).size(64).padLeft(6);
    
    table.add(slider).height(52).growX();
    
    function getTextParams(value){
        let speed = Math.pow(2, Math.abs(value));
    
        let text = "";
        let color = Color.white;
        
        if(value == 0){
            text = "x";
        }else if(value > 0){
            text = "{wave}加速x";
            color = colorSpeedUp;
        }else{
            text = "{shake}减速x";
            color = colorSpeedDown;
        }
                        
        return {text: text + speed, color: color};
    }
}