cc.Class({
    extends: cc.Component,

    properties: {
        damage: 0,
        speed: 1,
        attackRange: 0,
        price: 25,

    },

   init(coordinates){
    this.coordinates = coordinates
   },
});
