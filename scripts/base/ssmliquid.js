function newLiquid(name) {
	exports[name] = (() => {
		let myLiquid = extend(Liquid, name, {});
		return myLiquid;
	})();
}
newLiquid("钢液")
newLiquid("银液")
newLiquid("冷却液")
newLiquid("液氦")