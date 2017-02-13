var structureTower={
  /**param {Tower} tower**/
  run:function(tower){
    var targets= tower.room.find(FIND_STRUCTURES,
    {filter:function(structure){
      return (structure.structureType==STRUCTURE_ROAD &&structure.energy<structure.energyCapacity*0.75)
    }});
    if(targets.length){
      target =tower.pos.findClosestByRange(targets);
      tower.repair(target);
    }
  }
};
module.exports=structureTower;
