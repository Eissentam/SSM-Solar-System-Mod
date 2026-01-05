const 远征一号 = extend(CoreBlock, "远征一号", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
    },
    canBreak(tile) {
        return Vars.state.teams.cores(tile.team()).size > 1;
    },
    canReplace(other) {
        return true;
    },
    canPlaceOn(tile, team, rotation) {
        return Vars.state.teams.cores(team).size < 10;
    }
});

// 确保正确导出
exports.远征一号 = 远征一号;