var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('collecting');
    }
    if(!creep.memory.upgrading && creep.carry.energy >= creep.carryCapacity*0.5) {
      creep.memory.upgrading = true;
      creep.say('upgrading');
    }

    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
    else {
      spawns = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return ( structure.structureType==STRUCTURE_EXTENSION && structure.energy >0);
        }
      });

      if(spawns.length){
        target = creep.pos.findClosestByRange(spawns)
        if(!(creep.pos.isNearTo(target))){
          creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }else{
          if (target.energy <creep.carryCapacity){
            creep.withdraw(target, RESOURCE_ENERGY, target.energy);
          }
          else{
            creep.withdraw(target, RESOURCE_ENERGY, (creep.carryCapacity - _.sum(creep.carry)));
          }
        }
      }
    }
  }
};

module.exports = roleUpgrader;
